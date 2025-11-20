const ELECTION_KEYWORDS = ['election', 'dashboard', 'analytics', 'candidates', 'governorates', 'stats'];

export type NavFilterTarget = {
  id?: string;
  label?: string;
  href?: string;
};

export function shouldShowNavItem(target: NavFilterTarget, electionEnabled = true): boolean {
  if (electionEnabled) return true;
  const haystack = `${target.id ?? ''} ${target.label ?? ''} ${target.href ?? ''}`.toLowerCase();
  return !ELECTION_KEYWORDS.some((keyword) => haystack.includes(keyword));
}
