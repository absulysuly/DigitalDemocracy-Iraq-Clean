import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CandidateCard from '../CandidateCard';
import { Candidate } from '@/lib/types';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

const mockCandidate: Candidate = {
  id: '1',
  name: 'John Doe',
  name_ar: 'جون دو',
  photo: '/test-photo.jpg',
  party: 'Test Party',
  governorate: 'Test Governorate',
  gender: 'male',
  verified: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const mockDictionary = {
  candidate: {
    male: 'Male',
    female: 'Female',
  },
};

describe('CandidateCard Component', () => {
  it('renders candidate name in English', () => {
    render(
      <CandidateCard 
        candidate={mockCandidate} 
        dictionary={mockDictionary} 
        lang="en" 
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders candidate name in Arabic when lang is ar', () => {
    render(
      <CandidateCard 
        candidate={mockCandidate} 
        dictionary={mockDictionary} 
        lang="ar" 
      />
    );
    
    expect(screen.getByText('جون دو')).toBeInTheDocument();
  });

  it('renders candidate party', () => {
    render(
      <CandidateCard 
        candidate={mockCandidate} 
        dictionary={mockDictionary} 
        lang="en" 
      />
    );
    
    expect(screen.getByText('Test Party')).toBeInTheDocument();
  });

  it('renders candidate governorate', () => {
    render(
      <CandidateCard 
        candidate={mockCandidate} 
        dictionary={mockDictionary} 
        lang="en" 
      />
    );
    
    expect(screen.getByText('Test Governorate')).toBeInTheDocument();
  });

  it('shows verified badge when candidate is verified', () => {
    render(
      <CandidateCard 
        candidate={mockCandidate} 
        dictionary={mockDictionary} 
        lang="en" 
      />
    );
    
    expect(screen.getByLabelText('Verified')).toBeInTheDocument();
  });

  it('does not show verified badge when candidate is not verified', () => {
    const unverifiedCandidate = { ...mockCandidate, verified: false };
    render(
      <CandidateCard 
        candidate={unverifiedCandidate} 
        dictionary={mockDictionary} 
        lang="en" 
      />
    );
    
    expect(screen.queryByLabelText('Verified')).not.toBeInTheDocument();
  });

  it('renders as a link to candidate detail page', () => {
    const { container } = render(
      <CandidateCard 
        candidate={mockCandidate} 
        dictionary={mockDictionary} 
        lang="en" 
      />
    );
    
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/en/candidates/1');
  });

  it('renders candidate image with correct alt text', () => {
    render(
      <CandidateCard 
        candidate={mockCandidate} 
        dictionary={mockDictionary} 
        lang="en" 
      />
    );
    
    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();
  });

  it('uses fallback avatar when no photo provided', () => {
    const candidateNoPhoto = { ...mockCandidate, photo: undefined };
    render(
      <CandidateCard 
        candidate={candidateNoPhoto} 
        dictionary={mockDictionary} 
        lang="en" 
      />
    );
    
    const image = screen.getByAltText('John Doe');
    expect(image).toHaveAttribute('src');
  });

  it('applies hover styles', () => {
    const { container } = render(
      <CandidateCard 
        candidate={mockCandidate} 
        dictionary={mockDictionary} 
        lang="en" 
      />
    );
    
    const card = container.querySelector('.hover\\:shadow-lg');
    expect(card).toBeInTheDocument();
  });
});
