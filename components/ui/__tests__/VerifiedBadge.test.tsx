import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VerifiedBadge from '../VerifiedBadge';

describe('VerifiedBadge Component', () => {
  it('renders without crashing', () => {
    render(<VerifiedBadge />);
    const badge = screen.getByLabelText('Verified');
    expect(badge).toBeInTheDocument();
  });

  it('applies default size of 20', () => {
    const { container } = render(<VerifiedBadge />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
  });

  it('applies custom size', () => {
    const { container } = render(<VerifiedBadge size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('applies custom className', () => {
    const { container } = render(<VerifiedBadge className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });

  it('applies default colors', () => {
    const { container } = render(<VerifiedBadge />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-green-600');
    expect(svg).toHaveClass('dark:text-green-400');
  });

  it('applies custom colors', () => {
    const { container } = render(
      <VerifiedBadge lightColor="text-blue-600" darkColor="dark:text-blue-400" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-blue-600');
    expect(svg).toHaveClass('dark:text-blue-400');
  });
});
