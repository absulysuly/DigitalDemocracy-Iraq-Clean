'use client';

import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import Image from 'next/image';
import { MockPost, formatTimeAgo } from '@/lib/mockData';
import { useState } from 'react';

interface PostCardProps {
  post: MockPost;
}

export default function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(post.hasLiked || false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          {post.user.avatar ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={post.user.avatar}
                alt={post.user.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {post.user.name[0]}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white truncate">
              {post.user.name}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin size={14} className="flex-shrink-0" />
              <span>{post.governorate}</span>
              <span>•</span>
              <span>{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-3">
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </div>

      {/* Image */}
      {post.image && (
        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-900">
          <Image
            src={post.image}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 group transition ${
              hasLiked
                ? 'text-red-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart
              size={20}
              className={hasLiked ? 'fill-current' : ''}
            />
            <span className="text-sm font-medium">{likes}</span>
          </button>

          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-500 transition group">
            <MessageCircle size={20} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 transition group ml-auto">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
