import { Locale } from '@/lib/i18n-config';
import { Post } from '@/lib/types';

interface FeedProps {
  lang: Locale;
  posts?: Post[];
}

export default function Feed({ lang, posts = [] }: FeedProps) {
  return (
    <div className="space-y-4">
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold">Social Feed</h2>
        <p className="text-gray-600">Social features coming soon</p>
        {posts.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">{posts.length} posts</p>
        )}
      </div>
    </div>
  );
}
