'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { fetchDailyPoll, votePoll } from '@/lib/api';
import { Poll, PollOption } from '@/lib/types';
import { toast } from 'react-hot-toast';

interface DailyPollProps {
  dictionary?: {
    title?: string;
    loading?: string;
    voted?: string;
    votes?: string;
    totalVotes?: string;
    error?: string;
  };
}

export default function DailyPoll({ dictionary = {} }: DailyPollProps) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Default dictionary values
  const dict = {
    title: dictionary.title || 'Daily Poll',
    loading: dictionary.loading || 'Loading poll...',
    voted: dictionary.voted || 'You voted for:',
    votes: dictionary.votes || 'votes',
    totalVotes: dictionary.totalVotes || 'Total votes:',
    error: dictionary.error || 'Failed to load poll',
  };

  useEffect(() => {
    const loadPoll = async () => {
      setIsLoading(true);
      try {
        const pollData = await fetchDailyPoll();
        setPoll(pollData);
        
        // Check if user has already voted (using localStorage)
        const votedPollId = localStorage.getItem('voted_poll_id');
        if (votedPollId === pollData.id) {
          setHasVoted(true);
          const votedOption = localStorage.getItem('voted_option');
          if (votedOption) {
            setSelectedOption(votedOption);
          }
        }
      } catch (error) {
        console.error('Failed to load poll:', error);
        toast.error(dict.error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPoll();
  }, [dict.error]);

  const handleVote = async (optionId: string) => {
    if (hasVoted || !poll) return;

    try {
      // Optimistically update UI
      setSelectedOption(optionId);
      setHasVoted(true);
      
      // Store vote in localStorage
      localStorage.setItem('voted_poll_id', poll.id);
      localStorage.setItem('voted_option', optionId);
      
      toast.success('Vote recorded! 🗳️');

      // Send vote to backend (will fail gracefully if backend is not available)
      try {
        await votePoll(poll.id, optionId);
      } catch (apiError) {
        console.warn('Backend vote recording failed (expected if backend is not deployed):', apiError);
        // We still keep the local vote even if backend fails
      }
    } catch (error) {
      console.error('Failed to vote:', error);
      toast.error('Failed to record vote. Please try again.');
      // Revert optimistic update
      setSelectedOption(null);
      setHasVoted(false);
    }
  };

  const calculatePercentage = (votes: number) => {
    if (!poll || poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!poll) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-md mb-6 border border-green-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">🗳️</span>
        {dict.title}
      </h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
        {poll.question}
      </p>

      <div className="space-y-3">
        {poll.options.map((option: PollOption) => {
          const percentage = calculatePercentage(option.votes);
          const isSelected = selectedOption === option.id;
          const showResults = hasVoted;

          return (
            <motion.button
              key={option.id}
              whileHover={!hasVoted ? { scale: 1.02 } : {}}
              whileTap={!hasVoted ? { scale: 0.98 } : {}}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`
                relative w-full p-4 rounded-xl text-left transition-all duration-300
                ${hasVoted ? 'cursor-default' : 'cursor-pointer hover:shadow-md'}
                ${isSelected 
                  ? 'bg-green-600 text-white ring-2 ring-green-400' 
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
            >
              {/* Progress bar background */}
              {showResults && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`absolute inset-0 rounded-xl ${
                    isSelected 
                      ? 'bg-green-500 opacity-100' 
                      : 'bg-green-100 dark:bg-gray-700 opacity-70'
                  }`}
                />
              )}

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {isSelected && hasVoted && (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="font-semibold">{option.text}</span>
                </div>
                
                {showResults && (
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-sm font-bold">{percentage}%</span>
                    <span className="text-xs opacity-75">
                      ({option.votes} {dict.votes})
                    </span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {hasVoted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center"
        >
          {dict.totalVotes} {poll.totalVotes.toLocaleString()}
        </motion.div>
      )}
    </motion.div>
  );
}
