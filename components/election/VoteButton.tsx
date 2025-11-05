
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { toast } from 'react-hot-toast';
import { CheckCircle2 } from 'lucide-react';

interface VoteButtonProps {
  candidateId: string;
  candidateName?: string;
  variant?: 'default' | 'compact';
}

export default function VoteButton({ 
  candidateId, 
  candidateName = 'this candidate',
  variant = 'default' 
}: VoteButtonProps) {
  const [hasVoted, setHasVoted] = useState(() => {
    // Check if user has already voted for this candidate
    if (typeof window !== 'undefined') {
      const votedCandidateId = localStorage.getItem('voted_candidate_id');
      return votedCandidateId === candidateId;
    }
    return false;
  });
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (hasVoted || isVoting) return;

    setIsVoting(true);

    try {
      // Store vote locally (in a real app, this would be sent to backend)
      localStorage.setItem('voted_candidate_id', candidateId);
      localStorage.setItem('voted_at', new Date().toISOString());
      
      // Trigger Iraqi flag colored confetti
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#CE1126', '#FFFFFF', '#000000', '#007A3D']
      });

      setHasVoted(true);
      toast.success(`Vote cast for ${candidateName}! 🗳️`, {
        duration: 4000,
        icon: '✅',
      });

      // In a real app, send the vote to the backend
      // await voteForCandidate(candidateId);
      console.log(`Voted for candidate: ${candidateId} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Failed to cast vote:', error);
      toast.error('Failed to cast vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  if (hasVoted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          flex items-center justify-center gap-2 
          bg-green-100 dark:bg-green-900 
          text-green-800 dark:text-green-200 
          font-semibold rounded-full
          ${variant === 'compact' ? 'px-4 py-2 text-sm' : 'px-8 py-4'}
        `}
      >
        <CheckCircle2 className={variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'} />
        Vote Cast ✓
      </motion.div>
    );
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleVote}
      disabled={isVoting}
      className={`
        bg-gradient-to-r from-red-600 via-white to-green-600 
        text-gray-900 font-bold rounded-full shadow-lg 
        hover:shadow-xl transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        border-2 border-gray-200 dark:border-gray-700
        ${variant === 'compact' ? 'px-6 py-2 text-sm' : 'px-8 py-4 text-base'}
      `}
    >
      {isVoting ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          Casting Vote...
        </span>
      ) : (
        `Cast Your Vote 🗳️`
      )}
    </motion.button>
  );
}
