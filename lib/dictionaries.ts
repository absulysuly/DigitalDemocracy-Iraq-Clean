export const dictionaries = {
  en: () => import('./dictionaries/en.json').then(module => module.default),
  ar: () => import('./dictionaries/ar.json').then(module => module.default),
  ku: () => import('./dictionaries/ku.json').then(module => module.default),
}

export const getDictionary = async (locale: string) => {
  const dict = dictionaries as { [key: string]: () => Promise<any> };
  return dict[locale] ? dict[locale]() : dictionaries.en()
}
