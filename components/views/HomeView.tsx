
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import Feed from "@/components/social/Feed";
import { Locale } from '@/lib/i18n-config';
import { Post, User } from '@/lib/types';
import { motion } from 'framer-motion';
import { Send, Sparkles, ImagePlus, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateSocialPost } from '@/services/geminiService';
import { fetchPosts, createPost } from '@/lib/api';
import SkeletonPostCard from '@/components/SkeletonPostCard';
import DailyPoll from '../social/DailyPoll';

// Mock current user
const currentUser: User = {
    // FIX: Added missing 'id' and 'email' properties to satisfy the User type.
    id: 'current_user',
    email: 'you@example.com',
    name: 'You',
    avatar: 'https://i.pravatar.cc/48?u=current_user',
    verified: false,
};

// Sub-component for creating new posts
function ComposeCard({ onCreatePost, dictionary }: { onCreatePost: (content: string, image?: File | null) => Promise<void>, dictionary: any }) {
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatingTopic, setGeneratingTopic] = useState<string | null>(null);
    const [isPosting, setIsPosting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim() && !isPosting) {
            setIsPosting(true);
            await onCreatePost(content, imageFile);
            setContent('');
            setImagePreview(null);
            setImageFile(null);
            setIsPosting(false);
        }
    };

    const handleGenerate = async (topic?: string) => {
        setGeneratingTopic(topic || 'general');
        setIsGenerating(true);
        try {
            const generatedContent = await generateSocialPost(topic);
            setContent(generatedContent);
        } catch (error) {
            toast.error("Failed to generate post.");
        } finally {
            setIsGenerating(false);
            setGeneratingTopic(null);
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        // Reset file input value to allow selecting the same file again
        e.target.value = '';
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    }

    const topics = [
        { key: 'politics', label: 'Politics' },
        { key: 'daily_life', label: 'Daily Life' },
        { key: 'culture', label: 'Culture' }
    ];

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
                        placeholder={dictionary.placeholder || "What's on your mind?"}
                        className="w-full h-24 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        aria-label="Create a new post"
                        disabled={isPosting}
                    />
                </div>
                {imagePreview && (
                    <div className="mt-4 relative w-32">
                        <img src={imagePreview} alt="Selected preview" className="rounded-lg object-cover w-32 h-32" />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1"
                            aria-label="Remove image"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
                <div className="flex justify-between items-center mt-2 flex-wrap gap-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                         <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isGenerating || isPosting}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 font-semibold rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition"
                            aria-label="Add an image"
                        >
                            <ImagePlus size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleGenerate()}
                            disabled={isGenerating || isPosting}
                            className="flex items-center gap-2 px-4 py-2 text-green-700 font-semibold rounded-lg disabled:opacity-50 hover:bg-green-50 dark:text-green-400 dark:hover:bg-gray-700 transition"
                            aria-label="Generate a post with AI"
                        >
                            {isGenerating && generatingTopic === 'general' ? (
                                <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-green-500"></div>
                            ) : (
                                <Sparkles size={16} />
                            )}
                            <span>{isGenerating && generatingTopic === 'general' ? (dictionary.generating || 'Generating...') : (dictionary.generateWithAI || 'Generate with AI')}</span>
                        </button>
                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-600 hidden sm:block"></div>
                        {topics.map(topic => (
                            <button
                                key={topic.key}
                                type="button"
                                onClick={() => handleGenerate(topic.label)}
                                disabled={isGenerating || isPosting}
                                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition"
                                aria-label={`Generate a post about ${topic.label}`}
                            >
                                {isGenerating && generatingTopic === topic.label ? (
                                    <div className="w-3 h-3 border-2 border-dashed rounded-full animate-spin border-gray-500 mx-auto"></div>
                                ) : (
                                   topic.label 
                                )}
                            </button>
                        ))}
                    </div>
                    <button
                        type="submit"
                        disabled={!content.trim() || isPosting}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition"
                    >
                        {isPosting ? (
                            <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-white"></div>
                        ) : (
                            <Send size={16} />
                        )}
                        <span>{isPosting ? 'Posting...' : (dictionary.post || 'Post')}</span>
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

  // Defensive check for dictionary prop to avoid crashes on hydration errors.
  const composeDictionary = dictionary?.compose || {};
  const pollDictionary = dictionary?.dailyPoll || {};

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

  const handleCreatePost = async (content: string, imageFile?: File | null) => {
    let imageUrl: string | undefined = undefined;
    if (imageFile) {
      // Create a local URL for the optimistic UI update
      imageUrl = URL.createObjectURL(imageFile);
    }
    
    // Optimistic UI update
    const optimisticPost: Post = {
        id: `temp-${Date.now()}`, // Temporary ID
        author: currentUser,
        content,
        image: imageUrl,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: new Date(),
    };

    setPosts(prevPosts => [optimisticPost, ...prevPosts]);
    
    try {
        let imageBase64: string | undefined = undefined;
        if (imageFile) {
            // Convert file to base64 to send to the mock API
            imageBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });
        }
        
        // API call to persist the post
        const newPost = await createPost(content, imageBase64);
        // Replace the temporary post with the real one from the server
        setPosts(prevPosts =>
            prevPosts.map(p => (p.id === optimisticPost.id ? newPost : p))
        );
        toast.success('Your post has been published!');
    } catch (error) {
        console.error("Failed to create post:", error);
        toast.error("Could not publish your post. Please try again.");
        // Revert the optimistic update on failure
        setPosts(prevPosts => prevPosts.filter(p => p.id !== optimisticPost.id));
    } finally {
      // Revoke the object URL to avoid memory leaks
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    }
  };

  return (
    <div {...handlers} className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <DailyPoll dictionary={pollDictionary} />
        <ComposeCard onCreatePost={handleCreatePost} dictionary={composeDictionary} />
        {isLoading ? (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => <SkeletonPostCard key={i} />)}
            </div>
        ) : (
            <Feed lang={lang} posts={posts} />
        )}
      </div>
    </div>
  );
}
