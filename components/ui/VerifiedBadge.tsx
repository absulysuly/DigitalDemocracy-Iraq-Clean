import React from 'react';
import { CheckCircle } from 'lucide-react';

interface VerifiedBadgeProps {
  /**
   * Size of the badge icon
   * @default 20
   */
  size?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Custom color for the icon (light mode)
   */
  lightColor?: string;
  /**
   * Custom color for the icon (dark mode)
   */
  darkColor?: string;
}

/**
 * A reusable verified badge component that displays a checkmark icon
 * Used across the application to indicate verified users, candidates, etc.
 */
export default function VerifiedBadge({ 
  size = 20, 
  className = '',
  lightColor = 'text-green-600',
  darkColor = 'dark:text-green-400'
}: VerifiedBadgeProps) {
  return (
    <CheckCircle 
      className={`flex-shrink-0 ${lightColor} ${darkColor} ${className}`}
      size={size}
      aria-label="Verified"
    />
  );
}
