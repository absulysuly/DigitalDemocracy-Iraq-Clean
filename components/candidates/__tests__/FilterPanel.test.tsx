import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterPanel from '../FilterPanel';
import { Governorate } from '@/lib/types';

// Mock next/navigation hooks
const mockReplace = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => '/en/candidates',
  useSearchParams: () => mockSearchParams,
}));

const mockGovernorates: Governorate[] = [
  {
    id: '1',
    name: 'Baghdad',
    name_ar: 'بغداد',
    name_ku: 'بەغدا',
    region: 'central',
  },
  {
    id: '2',
    name: 'Basra',
    name_ar: 'البصرة',
    name_ku: 'بەسرە',
    region: 'south',
  },
];

const mockDictionary = {
  filters: {
    searchByName: 'Search by Name',
    searchPlaceholder: 'Enter candidate name...',
    filterByGovernorate: 'Filter by Governorate',
    allGovernorates: 'All Governorates',
    filterByGender: 'Filter by Gender',
    allGenders: 'All Genders',
  },
  candidate: {
    male: 'Male',
    female: 'Female',
  },
};

describe('FilterPanel Component', () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it('renders search input', () => {
    render(
      <FilterPanel 
        governorates={mockGovernorates} 
        dictionary={mockDictionary} 
      />
    );
    
    expect(screen.getByLabelText('Search by Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter candidate name...')).toBeInTheDocument();
  });

  it('renders governorate filter', () => {
    render(
      <FilterPanel 
        governorates={mockGovernorates} 
        dictionary={mockDictionary} 
      />
    );
    
    expect(screen.getByLabelText('Filter by Governorate')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'All Governorates' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Baghdad' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Basra' })).toBeInTheDocument();
  });

  it('renders gender filter', () => {
    render(
      <FilterPanel 
        governorates={mockGovernorates} 
        dictionary={mockDictionary} 
      />
    );
    
    expect(screen.getByLabelText('Filter by Gender')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'All Genders' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Female' })).toBeInTheDocument();
  });

  it('debounces search input', async () => {
    render(
      <FilterPanel 
        governorates={mockGovernorates} 
        dictionary={mockDictionary} 
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Enter candidate name...');
    
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    // Should not call immediately
    expect(mockReplace).not.toHaveBeenCalled();
    
    // Should call after debounce delay
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalled();
    }, { timeout: 500 });
  });

  it('updates URL on governorate change', () => {
    render(
      <FilterPanel 
        governorates={mockGovernorates} 
        dictionary={mockDictionary} 
      />
    );
    
    const governorateSelect = screen.getByLabelText('Filter by Governorate');
    fireEvent.change(governorateSelect, { target: { value: 'Baghdad' } });
    
    expect(mockReplace).toHaveBeenCalled();
  });

  it('updates URL on gender change', () => {
    render(
      <FilterPanel 
        governorates={mockGovernorates} 
        dictionary={mockDictionary} 
      />
    );
    
    const genderSelect = screen.getByLabelText('Filter by Gender');
    fireEvent.change(genderSelect, { target: { value: 'male' } });
    
    expect(mockReplace).toHaveBeenCalled();
  });

  it('resets page to 1 when filters change', () => {
    render(
      <FilterPanel 
        governorates={mockGovernorates} 
        dictionary={mockDictionary} 
      />
    );
    
    const governorateSelect = screen.getByLabelText('Filter by Governorate');
    fireEvent.change(governorateSelect, { target: { value: 'Baghdad' } });
    
    expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining('page=1'));
  });

  it('has sticky positioning', () => {
    const { container } = render(
      <FilterPanel 
        governorates={mockGovernorates} 
        dictionary={mockDictionary} 
      />
    );
    
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('sticky');
  });
});
