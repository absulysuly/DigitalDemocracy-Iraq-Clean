import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// This forces the function to be dynamic and run on the server with access to environment variables.
export const dynamic = 'force-dynamic';

export async function POST() {
  // Ensure the API key is available from environment variables
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable is not set.");
    return NextResponse.json({ error: "API key is not configured." }, { status: 500 });
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // The prompt for generating the social media post
    const prompt = "Write a short, witty, and slightly humorous social media post about daily life, politics, or tea in Iraq. Keep it under 280 characters. The tone should be optimistic and engaging for a young Iraqi audience. Do not use hashtags.";

    // Call the Gemini API to generate content
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    const text = response.text;

    // Return the generated text in the response
    return NextResponse.json({ text });

  } catch (error) {
    console.error("Error in generate-post API route:", error);
    // Return a generic error message to the client
    return NextResponse.json({ error: "Failed to generate post due to an internal server error." }, { status: 500 });
  }
}
