import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  /**
   * URL of the avatar image
   */
  src: string;
  /**
   * Alt text for the avatar
   */
  alt: string;
  /**
   * Size of the avatar in pixels
   * @default 48
   */
  size?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show a verified badge
   */
  verified?: boolean;
}

/**
 * A reusable avatar component with optional verified badge
 * Handles image optimization through Next.js Image component
 */
export default function Avatar({
  src,
  alt,
  size = 48,
  className = '',
  verified = false
}: AvatarProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
      {verified && (
        <div 
          className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-gray-800 rounded-full p-0.5"
          aria-label="Verified user"
        >
          <svg
            className="w-3.5 h-3.5 text-green-600 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
