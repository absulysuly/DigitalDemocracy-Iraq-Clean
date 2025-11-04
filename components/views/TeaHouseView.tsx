'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';
import IraqiHeader from '../ui/IraqiHeader';
import { Mic, MicOff, Zap } from 'lucide-react';

// Base64 encoding/decoding functions
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function decode(base64: string) {
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
function createBlob(data: Float32Array): Blob {
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

type TranscriptEntry = {
    id: number;
    text: string;
    author: 'user' | 'model';
    isFinal: boolean;
};

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export default function TeaHouseView({ dictionary }: { dictionary: any }) {
    const [status, setStatus] = useState<ConnectionStatus>('disconnected');
    const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
    const [isApiKeyMissing, setIsApiKeyMissing] = useState(false);

    const sessionPromise = useRef<Promise<LiveSession> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const sources = useRef<Set<AudioBufferSourceNode>>(new Set()).current;
    let nextStartTime = 0;

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_API_KEY) {
            console.error("Gemini API key is missing. The Tea House feature is disabled.");
            setIsApiKeyMissing(true);
            setStatus('error');
        }
    }, []);

    const handleDisconnect = useCallback(() => {
        if (sessionPromise.current) {
            sessionPromise.current.then(session => session.close());
            sessionPromise.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }
        sources.forEach(source => source.stop());
        sources.clear();
        setStatus('disconnected');
    }, [sources]);

    const connect = async () => {
        if (isApiKeyMissing) return;
        if (sessionPromise.current) return;
        setStatus('connecting');
        
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert('Your browser does not support audio recording.');
                setStatus('error');
                return;
            }
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

            const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY as string });
            // FIX: Cast window to `any` to allow access to vendor-prefixed `webkitAudioContext` for broader browser compatibility.
            const inputAudioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            audioContextRef.current = inputAudioContext;
            
            // FIX: Cast window to `any` to allow access to vendor-prefixed `webkitAudioContext` for broader browser compatibility.
            const outputAudioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

            sessionPromise.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    systemInstruction: 'You are a friendly and knowledgeable host at a digital Iraqi tea house (Diwan). Your goal is to foster positive and engaging conversations about civic life, community, and the future. Keep your responses concise, warm, and encouraging. Your name is Naseem.',
                },
                callbacks: {
                    onopen: () => {
                        setStatus('connected');
                        const source = inputAudioContext.createMediaStreamSource(streamRef.current!);
                        const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromise.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContext.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            const { text, isFinal } = message.serverContent.inputTranscription;
                            setTranscripts(prev => {
                                const last = prev[prev.length - 1];
                                if (last && last.author === 'user' && !last.isFinal) {
                                    return [...prev.slice(0, -1), { ...last, text, isFinal }];
                                }
                                return [...prev, { id: Date.now(), text, author: 'user', isFinal }];
                            });
                        }
                        if (message.serverContent?.outputTranscription) {
                             const { text, isFinal } = message.serverContent.outputTranscription;
                            setTranscripts(prev => {
                                const last = prev[prev.length - 1];
                                if (last && last.author === 'model' && !last.isFinal) {
                                    return [...prev.slice(0, -1), { ...last, text, isFinal }];
                                }
                                return [...prev, { id: Date.now(), text, author: 'model', isFinal }];
                            });
                        }
                        if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
                            const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
                            nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
                            const source = outputAudioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContext.destination);
                            source.addEventListener('ended', () => sources.delete(source));
                            source.start(nextStartTime);
                            nextStartTime = nextStartTime + audioBuffer.duration;
                            sources.add(source);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        setStatus('error');
                        handleDisconnect();
                    },
                    onclose: (e: CloseEvent) => {
                        handleDisconnect();
                    },
                },
            });

        } catch (error) {
            console.error('Failed to start session:', error);
            setStatus('error');
            handleDisconnect();
        }
    };
    
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            handleDisconnect();
        };
    }, [handleDisconnect]);

    const isLive = status === 'connected' || status === 'connecting';

    const statusMap = {
        disconnected: { text: dictionary.page.teahouse.disconnected, color: 'bg-gray-500' },
        connecting: { text: dictionary.page.teahouse.connecting, color: 'bg-yellow-500 animate-pulse' },
        connected: { text: dictionary.page.teahouse.connected, color: 'bg-green-500' },
        error: { text: isApiKeyMissing ? "Service Unavailable" : dictionary.page.teahouse.error, color: 'bg-red-500' },
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <IraqiHeader title={dictionary.page.teahouse.title} subtitle={dictionary.page.teahouse.description} />
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <div className="absolute inset-0 -z-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/30"></div>
                <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${statusMap[status].color}`}></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{statusMap[status].text}</span>
                        </div>
                        {status === 'connected' && <p className="animate-pulse text-sm text-green-600 dark:text-green-400">{dictionary.page.teahouse.speakNow}</p>}
                    </div>

                    <div className="scrollbar-hide mb-6 h-80 space-y-4 overflow-y-auto rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
                        <AnimatePresence>
                        {transcripts.map((entry) => (
                             <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                layout
                                className={`flex ${entry.author === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-xs rounded-2xl px-4 py-2 md:max-w-md ${entry.author === 'user' ? 'rounded-br-none bg-green-100 dark:bg-green-900/50' : 'rounded-bl-none bg-gray-200 dark:bg-gray-700'}`}>
                                    <p className={`text-gray-800 dark:text-gray-200 ${!entry.isFinal ? 'opacity-70' : ''}`}>
                                        {entry.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                    
                    <div className="flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={isLive ? handleDisconnect : connect}
                            className={`flex items-center gap-3 rounded-full px-8 py-4 font-bold text-white transition-all disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none ${
                                isLive ? 'bg-red-600 hover:bg-red-700 shadow-[0_0_20px_theme(colors.red.400)]' : 'bg-green-600 hover:bg-green-700 shadow-lg'
                            }`}
                            animate={isLive ? { scale: [1, 1.05, 1] } : {}}
                            transition={isLive ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                            disabled={status === 'connecting' || isApiKeyMissing}
                        >
                            {isLive ? <MicOff /> : <Mic />}
                            <span>{isLive ? dictionary.page.teahouse.leave : dictionary.page.teahouse.join}</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}