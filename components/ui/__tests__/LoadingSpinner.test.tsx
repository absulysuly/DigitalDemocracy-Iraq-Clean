import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders without crashing', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('has accessibility label', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByLabelText('Loading');
    expect(spinner).toBeInTheDocument();
  });

  it('applies default size of 16px', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveStyle({ width: '16px', height: '16px' });
  });

  it('applies custom size', () => {
    const { container } = render(<LoadingSpinner size={32} />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveStyle({ width: '32px', height: '32px' });
  });

  it('applies default border width', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveStyle({ borderWidth: '2px' });
  });

  it('applies custom border width', () => {
    const { container } = render(<LoadingSpinner borderWidth={4} />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveStyle({ borderWidth: '4px' });
  });

  it('applies default color class', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass('border-green-500');
  });

  it('applies custom color class', () => {
    const { container } = render(<LoadingSpinner color="border-blue-500" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass('border-blue-500');
  });

  it('has animation class', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass('animate-spin');
  });
});
