import axios from 'axios';

// Railway Backend URL - 7,769 Iraqi Candidates
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://digitaldemocracy-iraq-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Candidate Interface
export interface Candidate {
  id: number;
  name: string;
  nameArabic?: string;
  nameKurdish?: string;
  age: number;
  gender: string;
  education: string;
  occupation: string;
  party: string;
  partyArabic?: string;
  partyKurdish?: string;
  constituency: string;
  constituencyArabic?: string;
  constituencyKurdish?: string;
  province: string;
  provinceArabic?: string;
  provinceKurdish?: string;
  biography?: string;
  biographyArabic?: string;
  biographyKurdish?: string;
  photo?: string;
  manifestoUrl?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

// Stats Interface
export interface Stats {
  totalCandidates: number;
  byProvince: Record<string, number>;
  byParty: Record<string, number>;
  byGender: Record<string, number>;
  byEducation: Record<string, number>;
}

// Filter Parameters
export interface CandidateFilters {
  search?: string;
  province?: string;
  party?: string;
  gender?: string;
  constituency?: string;
  page?: number;
  limit?: number;
}

// API Functions
export const candidatesAPI = {
  // Get all candidates with filters
  getCandidates: async (filters: CandidateFilters = {}) => {
    try {
      const response = await api.get('/api/candidates', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      throw error;
    }
  },

  // Get single candidate by ID
  getCandidateById: async (id: number | string) => {
    try {
      const response = await api.get(`/api/candidates/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching candidate ${id}:`, error);
      throw error;
    }
  },

  // Get statistics
  getStats: async (): Promise<Stats> => {
    try {
      const response = await api.get('/api/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Get provinces list
  getProvinces: async () => {
    try {
      const response = await api.get('/api/provinces');
      return response.data;
    } catch (error) {
      console.error('Error fetching provinces:', error);
      throw error;
    }
  },

  // Get parties list
  getParties: async () => {
    try {
      const response = await api.get('/api/parties');
      return response.data;
    } catch (error) {
      console.error('Error fetching parties:', error);
      throw error;
    }
  },

  // Search candidates
  searchCandidates: async (query: string) => {
    try {
      const response = await api.get('/api/candidates/search', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching candidates:', error);
      throw error;
    }
  },
};

export default api;
