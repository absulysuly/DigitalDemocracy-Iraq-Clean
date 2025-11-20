export type FilterableNavLink = { id?: string; href?: string; label?: string };
const BLOCKED_KEYWORDS = ['election','dashboard','analytics','candidates','governorates','stats'];
export const shouldDisplayNavigationItem = (item: FilterableNavLink, electionEnabled: boolean) => {
  if (electionEnabled) return true;
  const haystack = `${item.id ?? ''} ${item.href ?? ''} ${item.label ?? ''}`.toLowerCase();
  return !BLOCKED_KEYWORDS.some(k => haystack.includes(k));
};
