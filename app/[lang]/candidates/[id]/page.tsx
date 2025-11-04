import { notFound } from 'next/navigation';
import Feed from '@/components/social/Feed';
import { fetchCandidateById } from '@/lib/api';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { Locale } from '@/lib/i18n-config';
import { GoogleGenAI, Type } from '@google/genai';

/**
 * Generates dynamic, AI-powered social media posts for a candidate profile.
 * @param candidate - The candidate object.
 * @param lang - The current locale.
 * @returns A promise that resolves to an array of Post objects.
 */
async function generateCandidatePosts(
  candidate: Awaited<ReturnType<typeof fetchCandidateById>>, 
  lang: Locale
): Promise<Post[]> {
  if (!process.env.API_KEY) {
    console.error("API key is not configured for post generation.");
    return fallbackPosts(candidate, lang);
  }
  
  if (!candidate) {
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Generate 2 realistic social media posts for an Iraqi political candidate named ${candidate.name} from the ${candidate.party} party, running in ${candidate.governorate}.
The posts should be optimistic and engaging for a young Iraqi audience. The tone should be professional yet approachable. One post can be about a local issue or recent event in their governorate, and another can be a general message of unity or progress.
Do not use hashtags. The language of the posts should be ${lang === 'ar' ? 'Arabic' : (lang === 'ku' ? 'Kurdish' : 'English')}.
Return the response as a JSON array of objects, where each object has a 'content' (string) and an optional 'image_prompt' (string) key. The image_prompt should be a simple phrase in English for generating a background image, like 'A bustling market in Baghdad' or 'Children playing football in a field'.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: {
                type: Type.STRING,
                description: "The text content of the social media post."
              },
              image_prompt: {
                type: Type.STRING,
                description: "A brief, descriptive English prompt to generate a relevant image for the post."
              }
            },
            required: ['content']
          }
        }
      }
    });

    const responseText = response.text || '[]';
    const generatedData = JSON.parse(responseText) as { content: string, image_prompt?: string }[];
    
    return generatedData.map((postData, index) => ({
      id: `gen-post-${candidate.id}-${index}`,
      author: { 
        name: candidate.name, 
        avatar: candidate.photo || `https://avatar.iran.liara.run/public/${candidate.gender === 'female' ? 'girl' : 'boy'}?username=${candidate.id}`, 
        verified: true 
      },
      content: postData.content,
      likes: Math.floor(Math.random() * 3000) + 500,
      comments: Math.floor(Math.random() * 500) + 50,
      shares: Math.floor(Math.random() * 200) + 20,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * (index + 1) * 24),
      image: postData.image_prompt ? `https://picsum.photos/seed/${encodeURIComponent(postData.image_prompt)}/800/400` : undefined,
    }));
  } catch (error) {
    console.error("Error generating candidate posts:", error);
    return fallbackPosts(candidate, lang);
  }
}

/**
 * Fallback posts if AI generation fails
 */
function fallbackPosts(
  candidate: Awaited<ReturnType<typeof fetchCandidateById>>,
  lang: Locale
): Post[] {
  if (!candidate) return [];
  
  return [
    {
      id: 'post-c1',
      author: { 
        name: candidate.name, 
        avatar: candidate.photo || `https://avatar.iran.liara.run/public/${candidate.gender === 'female' ? 'girl' : 'boy'}?username=${candidate.id}`, 
        verified: true 
      },
      content: 'Thank you for your support! Together we can build a better future for our governorate.',
      likes: 2500,
      comments: 312,
      shares: 102,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      image: 'https://picsum.photos/seed/campaign-rally/800/400'
    },
    {
      id: 'post-c2',
      author: { 
        name: candidate.name, 
        avatar: candidate.photo || `https://avatar.iran.liara.run/public/${candidate.gender === 'female' ? 'girl' : 'boy'}?username=${candidate.id}`, 
        verified: true 
      },
      content: 'Today I visited the local market to speak with vendors and hear their concerns. It is vital that we support our small businesses.',
      likes: 1800,
      comments: 240,
      shares: 88,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    }
  ];
}

export default async function CandidatePage({ 
  params 
}: { 
  params: { id: string; lang: Locale } 
}) {
  const candidate = await fetchCandidateById(params.id);
  if (!candidate) notFound();

  // Generate posts for the candidate using AI
  const candidatePosts = await generateCandidatePosts(candidate, params.lang);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Cover Photo */}
      <div className="relative h-64 bg-gradient-to-br from-iraq-red via-white to-iraq-green">
        <div className="absolute inset-0 bg-black/30">
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto px-4 -mt-20">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <Image
              src={candidate.photo || `https://avatar.iran.liara.run/public/${candidate.gender === 'female' ? 'girl' : 'boy'}?username=${candidate.id}`}
              alt={candidate.name}
              width={160}
              height={160}
              className="w-40 h-40 rounded-full border-8 border-white dark:border-gray-800 object-cover shadow-2xl"
            />

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {params.lang === 'ar' && candidate.name_ar ? candidate.name_ar : candidate.name}
                </h1>
                <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 15.41L5.17 12l1.41-1.41L10.59 14.59 17.41 7.76l1.41 1.41L10.59 17.41z"/>
                </svg>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {candidate.party} · {candidate.governorate}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="px-6 py-3 bg-gradient-to-r from-iraq-red to-iraq-green text-white font-semibold rounded-full hover:shadow-lg transition">
                  Support Campaign
                </button>
                <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  Follow
                </button>
                <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  Message
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-6 justify-center md:justify-start">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2K</p>
                  <p className="text-sm text-gray-500">Supporters</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">89</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">4.5K</p>
                  <p className="text-sm text-gray-500">Engagements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-4">
            <div className="flex gap-8 overflow-x-auto scrollbar-hide">
              <button className="px-4 py-2 font-semibold text-iraq-red border-b-4 border-iraq-red">
                Posts
              </button>
              <button className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900">
                About
              </button>
              <button className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900">
                Policy
              </button>
              <button className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900">
                Q&A
              </button>
            </div>
          </div>
        </div>

        {/* Candidate's Posts Feed */}
        <div className="mt-8">
          <Feed lang={params.lang} posts={candidatePosts} />
        </div>
      </div>
    </div>
  );
}
