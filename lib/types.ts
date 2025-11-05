export interface User {
  name: string;
  avatar: string;
  verified?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export interface FactCheckResult {
  verdict: string;
  reasoning: string;
  disclaimer: string;
}


export interface Candidate {
  id: string;                    // UUID
  name: string;                  // Full name
  name_ar?: string;              // Arabic name (optional)
  name_ku?: string;              // Kurdish name (optional)
  photo?: string;                // URL to photo
  bio?: string;                  // Biography
  bio_ar?: string;               // Arabic bio
  bio_ku?: string;               // Kurdish bio
  party: string;                 // Party name
  governorate: string;           // Governorate name
  age?: number;                  // Candidate age
  gender?: 'male' | 'female';   // Gender
  education?: string;            // Education background
  experience?: string;           // Political experience
  platform?: string;             // Campaign platform
  verified?: boolean;            // Whether the candidate is verified
  created_at: string;            // ISO timestamp
  updated_at: string;            // ISO timestamp
}

export interface PaginatedCandidates {
    data: Candidate[];
    total: number;
    page: number;
    limit: number;
}

export interface Governorate {
  id: string;
  name: string;
  name_ar: string;
  name_ku: string;
  population?: number;
  region: 'north' | 'south' | 'central' | 'kurdistan';
}

export interface Party {
  id: string;
  name: string;
  name_ar: string;
  name_ku: string;
  logo?: string;
  ideology?: string;
  founded?: number;
}

export interface Stats {
  total_candidates: number;
  total_parties: number;
  total_governorates: number;
  last_updated: string;
  gender_distribution: {
      Male: number;
      Female: number;
  };
  candidates_per_governorate: {
      governorate_name: string;
      candidate_count: number;
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
