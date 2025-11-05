import React from 'react';

interface LoadingSpinnerProps {
  /**
   * Size of the spinner in pixels
   * @default 16
   */
  size?: number;
  /**
   * Border width of the spinner
   * @default 2
   */
  borderWidth?: number;
  /**
   * Color of the spinner
   * @default 'border-green-500'
   */
  color?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * A reusable loading spinner component
 * Used for loading states throughout the application
 */
export default function LoadingSpinner({
  size = 16,
  borderWidth = 2,
  color = 'border-green-500',
  className = ''
}: LoadingSpinnerProps) {
  return (
    <div
      className={`rounded-full animate-spin ${color} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${borderWidth}px`,
        borderStyle: 'dashed',
      }}
      role="status"
      aria-label="Loading"
    />
  );
}
