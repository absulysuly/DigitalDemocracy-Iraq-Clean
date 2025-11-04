import { GoogleGenerativeAI } from "@google/generative-ai";

// The API_KEY is expected to be set in the environment variables.
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Initialize the GoogleGenerativeAI client only if the API key is available.
const ai = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * Generates a social media post using the Gemini API.
 * The prompt is tailored to create content that is witty, culturally relevant to Iraq,
 * and suitable for a young audience.
 * @returns A promise that resolves to the generated post content as a string.
 */
export const generateSocialPost = async (): Promise<string> => {
    if (!ai) {
        console.warn("NEXT_PUBLIC_API_KEY for Gemini is not set. AI features are disabled.");
        return "AI is currently unavailable. Please try again later.";
    }

    try {
        const prompt = "Write a short, witty, and slightly humorous social media post about daily life, politics, or tea in Iraq. Keep it under 280 characters. The tone should be optimistic and engaging for a young Iraqi audience. Do not use hashtags.";

        const model = ai.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        return response.text();
    } catch (error) {
        console.error("Error generating social post:", error);
        return "Couldn't generate a post right now. Try again in a moment!";
    }
};