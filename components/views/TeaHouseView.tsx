

'use client';
import { useState, useRef, useEffect } from 'react';
import IraqiHeader from '../ui/IraqiHeader';
import { Mic, Loader2, PhoneOff } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type LiveSession = any;
type LiveServerMessage = any;
type GenAIBlob = any;

const Modality = {
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
  TEXT: 'TEXT'
} as const;

// Audio helper functions
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): GenAIBlob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
}


export default function TeaHouseView({ dictionary }: { dictionary: any }) {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false); 
    const [transcript, setTranscript] = useState<{ speaker: 'user' | 'model' | 'system', text: string }[]>([]);
    const transcriptEndRef = useRef<HTMLDivElement | null>(null);
    
    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const outputNodeRef = useRef<GainNode | null>(null);
    const nextStartTimeRef = useRef<number>(0); 
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

    const currentInputTranscriptionRef = useRef('');
    const currentOutputTranscriptionRef = useRef('');

    const scrollToBottom = () => {
        transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [transcript]);
    
    const cleanup = () => {
        if (scriptProcessorRef.current && inputAudioContextRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if(sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close());
            sessionPromiseRef.current = null;
        }
        sourcesRef.current.forEach(source => {
            try { source.stop(); } catch (e) {}
        });
        sourcesRef.current.clear();
        nextStartTimeRef.current = 0;
        
        inputAudioContextRef.current?.close().catch(console.error);
        outputAudioContextRef.current?.close().catch(console.error);

        setIsConnected(false);
        setIsConnecting(false);
    };
    
    useEffect(() => {
        return () => cleanup();
    }, []);

    const handleDisconnect = () => {
        cleanup();
        setTranscript(prev => [...prev, { speaker: 'system', text: 'Disconnected from Tea House.' }]);
    };

    const handleConnect = async () => {
        if (!process.env.API_KEY) {
            setTranscript([{ speaker: 'system', text: 'Error: API Key is not configured.' }]);
            return;
        }

        setIsConnecting(true);
        setTranscript([{ speaker: 'system', text: 'Connecting to the Tea House...' }]);
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

            // FIX: Cast window to `any` to allow access to the vendor-prefixed `webkitAudioContext` for older Safari browser compatibility.
            inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            // FIX: Cast window to `any` to allow access to the vendor-prefixed `webkitAudioContext` for older Safari browser compatibility.
            outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            outputNodeRef.current = outputAudioContextRef.current.createGain();
            outputNodeRef.current.connect(outputAudioContextRef.current.destination);

            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        setIsConnecting(false);
                        setIsConnected(true);
                        setTranscript(prev => [...prev, { speaker: 'system', text: 'You are now connected. Start speaking to Naseem.' }]);
                        
                        const source = inputAudioContextRef.current!.createMediaStreamSource(streamRef.current!);
                        const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromiseRef.current!.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContextRef.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.outputTranscription) {
                            currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
                        } else if (message.serverContent?.inputTranscription) {
                            currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
                        }

                        if (message.serverContent?.turnComplete) {
                            const fullInput = currentInputTranscriptionRef.current.trim();
                            const fullOutput = currentOutputTranscriptionRef.current.trim();
                            
                            setTranscript(prev => {
                                let newTranscript = [...prev];
                                const lastMessage = newTranscript[newTranscript.length - 1];
                                // Avoid adding empty messages
                                if (lastMessage?.speaker === 'system' && /connecting|connected/i.test(lastMessage.text)) {
                                     newTranscript = [];
                                }
                                if (fullInput) newTranscript.push({ speaker: 'user', text: fullInput });
                                if (fullOutput) newTranscript.push({ speaker: 'model', text: fullOutput });
                                return newTranscript;
                            });
                            
                            currentInputTranscriptionRef.current = '';
                            currentOutputTranscriptionRef.current = '';
                        }
                        
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio) {
                            const audioCtx = outputAudioContextRef.current!;
                            const outputNode = outputNodeRef.current!;
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
                            
                            const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, 24000, 1);
                            
                            const source = audioCtx.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputNode);
                            source.addEventListener('ended', () => {
                                sourcesRef.current.delete(source);
                            });

                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            sourcesRef.current.add(source);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Connection error:', e);
                        setTranscript(prev => [...prev, { speaker: 'system', text: 'Connection error. Please try again.' }]);
                        cleanup();
                    },
                    onclose: (e: CloseEvent) => {
                        console.log('Connection closed.');
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO as any],
                    outputAudioTranscription: {},
                    inputAudioTranscription: {},
                    systemInstruction: 'You are Naseem, a friendly and welcoming host in a digital Iraqi tea house. Engage users in warm, interesting conversation about daily life, culture, and positive topics in Iraq. Keep your responses relatively short and conversational.',
                },
            });
        } catch (error) {
            console.error('Failed to start session', error);
            setTranscript([{ speaker: 'system', text: 'Could not connect. Please check microphone permissions and try again.' }]);
            cleanup();
        }
    };


    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <IraqiHeader title={dictionary.page.teahouse.title} subtitle={dictionary.page.teahouse.description} />
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <div className="absolute inset-0 -z-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/30"></div>
                
                <div className="relative z-10 h-96 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                        {transcript.map((entry, index) => (
                            <div key={index} className={`flex items-end gap-2 ${entry.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {entry.speaker === 'model' && <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 text-center flex items-center justify-center text-lg">☕</div>}
                                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                                    entry.speaker === 'user' ? 'bg-green-600 text-white rounded-br-none' :
                                    entry.speaker === 'model' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none' :
                                    'bg-transparent text-gray-500 text-sm italic text-center w-full'
                                }`}>
                                    <p className="text-sm leading-relaxed">{entry.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={transcriptEndRef} />
                    </div>

                    <div className="flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        {!isConnected && (
                             <button
                                onClick={handleConnect}
                                disabled={isConnecting}
                                className="flex items-center gap-3 rounded-full bg-green-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isConnecting ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        <span>Connecting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Mic />
                                        <span>{dictionary.page.teahouse.join}</span>
                                    </>
                                )}
                            </button>
                        )}

                        {isConnected && (
                             <button
                                onClick={handleDisconnect}
                                className="flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-red-700"
                            >
                                <PhoneOff />
                                <span>Leave Tea House</span>
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
