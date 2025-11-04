/**
 * Generates a social media post by calling the backend API.
 * @param topic - An optional topic for the post.
 * @returns The generated post content as a string.
 */
export async function generateSocialPost(topic?: string): Promise<string> {
  try {
    const response = await fetch('/api/generate-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to generate post.' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.text) {
        throw new Error("No content generated.");
    }

    return data.text;
  } catch (error) {
    console.error('Error generating social post:', error);
    // Re-throw the error to be caught by the calling component
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('An unknown error occurred while generating the post.');
  }
}
