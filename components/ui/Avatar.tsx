import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
}

export default function Avatar({ src, alt = 'Avatar', size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  const sizeClass = typeof size === 'number' ? '' : sizeClasses[size];
  const sizeStyle = typeof size === 'number' ? { width: size, height: size } : {};

  return (
    <div
      className={cn('rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700', sizeClass, className)}
      style={sizeStyle}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
          <svg className="h-2/3 w-2/3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}
