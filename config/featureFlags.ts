const env = typeof process !== 'undefined' ? process.env : undefined;

export const FEATURE_FLAGS = {
  ELECTION_ENABLED:
    (env?.NEXT_PUBLIC_ENABLE_ELECTIONS || env?.VITE_ENABLE_ELECTIONS || false),
};
