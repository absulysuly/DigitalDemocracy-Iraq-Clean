
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n-config";
import HomeView from "@/components/views/HomeView";

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  
  return (
    <HomeView lang={lang} dictionary={dictionary} />
  );
}
