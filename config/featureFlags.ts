const env = typeof process !== 'undefined' ? process.env : undefined;

const parseTrue = (value?: string) => (value ?? '').toLowerCase() === 'true';

export const FEATURE_FLAGS = {
  ELECTION_ENABLED:
    parseTrue(env?.NEXT_PUBLIC_ENABLE_ELECTIONS) ||
    parseTrue(env?.VITE_ENABLE_ELECTIONS) ||
    false,
};
