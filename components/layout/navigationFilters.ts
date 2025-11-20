export type FilterableNavLink = { id?: string; href?: string; label?: string };

const ELECTION_ROUTE_SEGMENTS = [
  'election',
  'candidate',
  'governorate',
  'stats',
  'analytics',
  'poll',
  'vote',
];

const isElectionNavigationItem = ({ id, href, label }: FilterableNavLink) => {
  const haystack = `${id ?? ''} ${href ?? ''} ${label ?? ''}`.toLowerCase();
  return ELECTION_ROUTE_SEGMENTS.some((segment) => haystack.includes(segment));
};

export const shouldDisplayNavigationItem = (
  item: FilterableNavLink,
  electionEnabled: boolean
) => {
  if (electionEnabled) return true;
  return !isElectionNavigationItem(item);
};
