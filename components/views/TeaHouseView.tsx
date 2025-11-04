
'use client';
import IraqiHeader from '../ui/IraqiHeader';
import { Mic } from 'lucide-react';

export default function TeaHouseView({ dictionary }: { dictionary: any }) {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <IraqiHeader title={dictionary.page.teahouse.title} subtitle={dictionary.page.teahouse.description} />
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <div className="absolute inset-0 -z-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/30"></div>
                <div className="relative z-10 flex h-96 flex-col items-center justify-center text-center">
                    <div className="rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900/50">
                        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Feature Under Review</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            The live voice chat feature is currently being updated to ensure a secure and reliable connection.
                            This requires a new server-side setup to protect API keys and manage real-time audio.
                            Thank you for your patience!
                        </p>
                    </div>
                    <div className="mt-8">
                        <button
                            disabled
                            className="flex cursor-not-allowed items-center gap-3 rounded-full bg-gray-400 px-8 py-4 font-bold text-white shadow-lg transition-all"
                        >
                            <Mic />
                            <span>{dictionary.page.teahouse.join}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
