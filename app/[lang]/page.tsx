
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n-config";
import SocialFeedView from "@/components/views/SocialFeedView";

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <SocialFeedView />
  );
}
