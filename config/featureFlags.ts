const parseBooleanFlag = (value?: string) => value?.toLowerCase() === 'true';

export const FEATURE_FLAGS = {
  ELECTION_ENABLED:
    (typeof process !== 'undefined' &&
      (parseBooleanFlag(process.env.VITE_ENABLE_ELECTIONS) ||
        parseBooleanFlag(process.env.NEXT_PUBLIC_ENABLE_ELECTIONS))) || false,
};
