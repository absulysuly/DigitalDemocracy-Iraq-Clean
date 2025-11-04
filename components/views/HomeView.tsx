'use client';
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import Feed from "@/components/social/Feed";
import { Locale } from '@/lib/i18n-config';
import { Post, User } from '@/lib/types';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateSocialPost } from '@/services/geminiService';

// Mock current user
const currentUser: User = {
    name: 'You',
    avatar: 'https://i.pravatar.cc/48?u=current_user',
    verified: false,
};

// Initial mock posts to show functionality
const initialPosts: Post[] = [
    {
        id: 'post-1',
        author: { name: 'Iraqi News', avatar: 'https://i.pravatar.cc/48?u=news', verified: true },
        content: 'Election day is approaching! Make sure you are registered to vote and have a plan to get to the polls. Your voice matters.',
        likes: 1200,
        comments: 153,
        shares: 45,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        image: 'https://picsum.photos/seed/election-day/800/400'
    },
    {
        id: 'post-2',
        author: { name: 'Community Organizer', avatar: 'https://i.pravatar.cc/48?u=organizer', verified: false },
        content: 'We are organizing a local town hall next week to discuss key issues with candidates. All are welcome to attend and participate in the discussion.',
        likes: 450,
        comments: 62,
        shares: 12,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    }
];

// Sub-component for creating new posts
function ComposeCard({ onCreatePost, dictionary }: { onCreatePost: (content: string) => void, dictionary: any }) {
    const [content, setContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onCreatePost(content);
            setContent('');
            toast.success('Your post has been published!');
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const generatedContent = await generateSocialPost();
            setContent(generatedContent);
        } catch (error) {
            toast.error("Failed to generate post.");
        } finally {
            setIsGenerating(false);
        }
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md mb-6"
        >
            <form onSubmit={handleSubmit}>
                <div className="flex items-start gap-4">
                    <img src={currentUser.avatar} alt="Your avatar" className="w-12 h-12 rounded-full" />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={dictionary.placeholder}
                        className="w-full h-24 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        aria-label="Create a new post"
                    />
                </div>
                <div className="flex justify-between items-center mt-2">
                    <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-4 py-2 text-green-700 font-semibold rounded-lg disabled:opacity-50 hover:bg-green-50 dark:text-green-400 dark:hover:bg-gray-700 transition"
                    >
                        {isGenerating ? (
                            <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-green-500"></div>
                        ) : (
                            <Sparkles size={16} />
                        )}
                        <span>{isGenerating ? dictionary.generating : dictionary.generateWithAI}</span>
                    </button>
                    <button
                        type="submit"
                        disabled={!content.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition"
                    >
                        <Send size={16} />
                        <span>{dictionary.post}</span>
                    </button>
                </div>
            </form>
        </motion.div>
    );
}


export default function HomeView({ lang, dictionary }: { lang: Locale; dictionary: any }) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handlers = useSwipeable({
    onSwipedLeft: () => router.push(`/${lang}/discover`),
    onSwipedRight: () => router.push(`/${lang}/profile`),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const handleCreatePost = (content: string) => {
      const newPost: Post = {
          id: `post-${Date.now()}`,
          author: currentUser,
          content,
          likes: 0,
          comments: 0,
          shares: 0,
          timestamp: new Date(),
      };
      setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div {...handlers} className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <ComposeCard onCreatePost={handleCreatePost} dictionary={dictionary.compose} />
        <Feed lang={lang} posts={posts} />
      </div>
    </div>
  );
}
