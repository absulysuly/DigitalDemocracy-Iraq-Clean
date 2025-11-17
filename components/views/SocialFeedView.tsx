'use client';

import { useState } from 'react';
import { PenSquare } from 'lucide-react';
import PostCard from '@/components/social/PostCard';
import ComposeModal from '@/components/social/ComposeModal';
import GovernorateSelector from '@/components/shared/GovernorateSelector';
import { getPostsByGovernorate } from '@/lib/mockData';

export default function SocialFeedView() {
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('All');
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const posts = getPostsByGovernorate(selectedGovernorate === 'All' ? undefined : selectedGovernorate);

  const handleCreatePost = (content: string, image?: string) => {
    console.log('New post:', { content, image });
    // TODO: Will be connected to API when backend is ready
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4 pb-20 md:pb-4">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Governorate Filter */}
        <div className="mb-6">
          <GovernorateSelector
            selected={selectedGovernorate}
            onChange={setSelectedGovernorate}
          />
        </div>

        {/* Compose Button */}
        <button
          onClick={() => setIsComposeOpen(true)}
          className="w-full mb-6 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-xl p-4 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl transition"
        >
          <PenSquare size={20} />
          <span>Create Post</span>
        </button>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No posts in {selectedGovernorate === 'All' ? 'your feed' : selectedGovernorate} yet
              </p>
            </div>
          )}
        </div>

        {/* Compose Modal */}
        <ComposeModal
          isOpen={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
          onPost={handleCreatePost}
        />
      </div>
    </div>
  );
}
