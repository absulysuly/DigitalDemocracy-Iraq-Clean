import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * Icon to display before the button text
   */
  iconBefore?: React.ReactNode;
  /**
   * Icon to display after the button text
   */
  iconAfter?: React.ReactNode;
  /**
   * Full width button
   */
  fullWidth?: boolean;
}

const variantStyles = {
  primary: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-400',
  outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 disabled:border-gray-400 disabled:text-gray-400',
  ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 disabled:text-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * A reusable button component with various styles and states
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconBefore,
  iconAfter,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        flex items-center justify-center gap-2 
        font-semibold rounded-lg 
        transition-colors duration-200
        disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size={16} color="border-current" />
          {children}
        </>
      ) : (
        <>
          {iconBefore && <span className="flex-shrink-0">{iconBefore}</span>}
          {children}
          {iconAfter && <span className="flex-shrink-0">{iconAfter}</span>}
        </>
      )}
    </button>
  );
}
