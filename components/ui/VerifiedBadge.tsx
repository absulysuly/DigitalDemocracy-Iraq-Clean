import { CheckCircle } from 'lucide-react';

interface VerifiedBadgeProps {
  className?: string;
  size?: number;
}

export default function VerifiedBadge({ className, size = 16 }: VerifiedBadgeProps) {
  return (
    <CheckCircle
      className={className}
      size={size}
      fill="currentColor"
    />
  );
}
