export type FilterableNavLink = {
  id: string;
  href: string;
  label: string;
};

const BLOCKED_KEYWORDS = ['election', 'dashboard', 'analytics', 'candidates', 'governorates', 'stats'];

export const filterElectionNavLinks = <T extends FilterableNavLink>(
  links: T[],
  electionEnabled: boolean,
): T[] => {
  if (electionEnabled) return links;

  return links.filter((link) => {
    const haystack = `${link.id} ${link.href} ${link.label}`.toLowerCase();
    return !BLOCKED_KEYWORDS.some((keyword) => haystack.includes(keyword));
  });
};
