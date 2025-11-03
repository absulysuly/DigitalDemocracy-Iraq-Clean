const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchCandidates() {
  try {
    const response = await fetch(`${API_BASE_URL}/candidates`);
    if (!response.ok) throw new Error('Failed to fetch candidates');
    return response.json();
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return [];
  }
}

export async function fetchCandidate(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}`);
    if (!response.ok) throw new Error('Failed to fetch candidate');
    return response.json();
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return null;
  }
}

// Alias for compatibility
export const fetchCandidateById = fetchCandidate;

export async function fetchGovernorates() {
  try {
    const response = await fetch(`${API_BASE_URL}/governorates`);
    if (!response.ok) throw new Error('Failed to fetch governorates');
    return response.json();
  } catch (error) {
    console.error('Error fetching governorates:', error);
    return [];
  }
}
