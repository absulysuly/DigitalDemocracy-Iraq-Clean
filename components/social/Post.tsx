'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import CommentThread from './CommentThread';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS, type Locale } from 'date-fns/locale';
import { likePost } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Post } from '@/lib/types'; // Using the new, correct Post type

interface PostProps {
    post: Post;
    lang: string;
}

export default function PostComponent({ post, lang }: PostProps) { // Renamed component
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    // Optimistic UI update
    const originalLiked = liked;
    const originalLikeCount = likeCount;

    setLiked(!originalLiked);
    setLikeCount(prev => originalLiked ? prev - 1 : prev + 1);

    try {
      // Make the API call to the backend
      await likePost(post.id);
    } catch (error) {
      console.error("Failed to like post. Reverting.", error);
      // If the API call fails, revert the changes
      setLiked(originalLiked);
      setLikeCount(originalLikeCount);
      toast.error("Couldn't like post. Please try again.");
    }
  };

  const localeMap: { [key: string]: Locale } = {
    ar: ar,
    en: enUS,
    ku: enUS // Fallback to English for Kurdish as date-fns doesn't have ku locale
  };

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {post.author.name}
              </h3>
              {post.author.verified && (
                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 15.41L5.17 12l1.41-1.41L10.59 14.59 17.41 7.76l1.41 1.41L10.59 17.41z"/>
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true, locale: localeMap[lang] })}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="w-full max-h-96 object-cover"
        />
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{likeCount.toLocaleString()} likes</span>
          <span>{post.comments} comments · {post.shares} shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-around">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition w-1/3 justify-center ${
            liked 
              ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label={liked ? 'Unlike post' : 'Like post'}
        >
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          <span className="font-medium">Like</span>
        </motion.button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 justify-center"
          aria-expanded={showComments}
        >
          <MessageCircle size={20} />
          <span className="font-medium">Comment</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 justify-center">
          <Share2 size={20} />
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentThread postId={post.id} lang={lang} />
      )}
    </article>
  );
}
