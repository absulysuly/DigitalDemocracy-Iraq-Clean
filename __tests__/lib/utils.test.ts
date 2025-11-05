import { cn } from '@/lib/utils';

describe('Utils - cn function', () => {
  it('merges class names correctly', () => {
    const result = cn('px-2 py-1', 'bg-red-500');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
    expect(result).toContain('bg-red-500');
  });

  it('handles undefined and null values', () => {
    const result = cn('px-2', undefined, null, 'py-1');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
  });

  it('handles conditional classes that are false', () => {
    const isActive = false;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('base-class');
    expect(result).not.toContain('active-class');
  });

  it('resolves tailwind conflicts correctly', () => {
    // tailwind-merge should resolve conflicts by using the last value
    const result = cn('px-2', 'px-4');
    expect(result).toContain('px-4');
    expect(result).not.toContain('px-2');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles array inputs', () => {
    const result = cn(['px-2', 'py-1'], 'bg-red-500');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
    expect(result).toContain('bg-red-500');
  });
});
