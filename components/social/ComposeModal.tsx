'use client';

import { X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { getCurrentUser } from '@/lib/mockData';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost?: (content: string, image?: string) => void;
}

export default function ComposeModal({ isOpen, onClose, onPost }: ComposeModalProps) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const currentUser = getCurrentUser();

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (content.trim()) {
      onPost?.(content, imageUrl || undefined);
      setContent('');
      setImageUrl('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create Post
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* User info */}
          <div className="flex items-center gap-3 mb-4">
            {currentUser.avatar ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {currentUser.name[0]}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {currentUser.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentUser.governorate}
              </p>
            </div>
          </div>

          {/* Text area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full min-h-[120px] p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white placeholder-gray-400"
            autoFocus
          />

          {/* Image URL input (simplified for MVP) */}
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <ImageIcon size={16} />
              <span>Image URL (optional)</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>

          {/* Image preview */}
          {imageUrl && (
            <div className="mt-4 relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
