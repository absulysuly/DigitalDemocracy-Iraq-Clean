
/**
 * Generates a social media post by calling our internal API route.
 * The prompt is tailored to create content that is witty, culturally relevant to Iraq,
 * and suitable for a young audience.
 * @param topic An optional topic for the generated post.
 * @returns A promise that resolves to the generated post content as a string.
 */
export const generateSocialPost = async (topic?: string): Promise<string> => {
    try {
        const response = await fetch('/api/generate-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
            console.error("Error generating social post:", response.statusText);
            const errorData = await response.json().catch(() => null);
            if (errorData && errorData.error) {
                console.error("API Error detail:", errorData.error);
            }
            return "Couldn't generate a post right now. Try again in a moment!";
        }

        const data = await response.json();
        return data.text || "Received an empty response from the AI. Please try again.";

    } catch (error) {
        console.error("Error calling generate-post API:", error);
        return "Couldn't generate a post right now. Try again in a moment!";
    }
};
