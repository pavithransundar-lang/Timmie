import { GoogleGenAI, Type } from "@google/genai";
import { Strategy } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNewStrategy = async (
  observation: string,
  existingStrategies: Strategy[]
): Promise<Strategy[]> => {
  
  const model = "gemini-2.5-flash";

  const systemInstruction = `
    You are an expert Special Education Needs (SEN) coordinator specializing in Autism Spectrum Disorder (ASD). 
    Your goal is to create positive, non-punitive, and practical strategies for teachers in a visual, easy-to-read format.
    
    You will be given an observation of a child's behavior (Timmie).
    You must generate 1 or 2 NEW strategies based on this observation.
    
    The tone should be:
    - Supportive and empathetic.
    - Action-oriented for the teacher.
    - "Warning" free language.
    
    Structure requirements for each strategy:
    1. Title: Short, catchy, and descriptive (2-5 words).
    2. Description: The core instruction of WHAT to do.
    3. Example: A specific, concrete scenario showing the strategy in action. This helps teachers visualize it.
    4. Why it helps: The neurological/behavioral reasoning.
    5. Icon: Choose the most appropriate icon.
  `;

  const prompt = `
    Current Strategies being used:
    ${existingStrategies.map(s => `- ${s.title}: ${s.description}`).join('\n')}

    New Observation/Teacher Concern:
    "${observation}"

    Please suggest 1 or 2 new strategies to address this specific observation. 
    Focus on providing a very clear "Example" scenario that a teacher can visualize.
    Ensure they are distinct from the current strategies.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              example: { type: Type.STRING, description: "A concrete scenario showing the strategy in action." },
              reason: { type: Type.STRING },
              icon: { type: Type.STRING, enum: ['clock', 'eye', 'message', 'wind', 'check', 'alert', 'heart'] }
            },
            required: ['title', 'description', 'example', 'reason', 'icon']
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    const newStrategies = JSON.parse(text);
    
    // Add IDs to the new strategies
    return newStrategies.map((s: any) => ({
      ...s,
      id: Math.random().toString(36).substr(2, 9)
    }));

  } catch (error) {
    console.error("Error generating strategies:", error);
    throw new Error("Failed to generate strategies. Please try again.");
  }
};