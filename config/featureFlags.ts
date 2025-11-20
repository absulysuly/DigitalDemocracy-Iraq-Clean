export const FEATURE_FLAGS = {
  ELECTION_ENABLED: (typeof process !== 'undefined' && process.env.VITE_ENABLE_ELECTIONS === 'true') || false,
};
