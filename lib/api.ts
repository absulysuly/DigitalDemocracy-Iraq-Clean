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
import { fetchPosts } from '@/lib/api';
import LoadingPalm from '@/components/ui/LoadingPalm';

// Mock current user
const currentUser: User = {
    name: 'You',
    avatar: 'https://i.pravatar.cc/48?u=current_user',
    verified: false,
};

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
        setIsLoading(true);
        try {
            const fetchedPosts = await fetchPosts();
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
            toast.error("Could not load the feed. Please try again later.");
            setPosts([]); // Set to empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    loadPosts();
  }, []);

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
        {isLoading ? (
            <div className="flex flex-col items-center justify-center pt-16">
                <LoadingPalm />
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{dictionary.homeFeed.loading}</p>
            </div>
        ) : (
            <Feed lang={lang} posts={posts} />
        )}
      </div>
    </div>
  );
}
