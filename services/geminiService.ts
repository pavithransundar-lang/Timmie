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
    You are an expert Special Educational Needs (SEN) coordinator creating a "Classroom Support Guide" for teachers.
    
    RULES FOR CONTENT:
    1. **Concise & Powerful**: Use short, punchy, active sentences. Focus on keywords (e.g., "Pause for 10s", "Use visual timer").
    2. **Retain Insight**: Do not dumb it down. Keep the core psychological reasoning but strip the fluff.
    3. **Concrete Examples**: The 'Example' field must be a specific scenario or script (e.g., "Teacher says X, Student does Y").
    4. **Formatting**: Ensure descriptions are 1-2 sentences max.
    
    Avoid generic advice. Focus on the specific needs of an autistic child in a kindergarten setting based on the observation.
  `;

  const prompt = `
    Current Strategies in our guide:
    ${existingStrategies.map(s => `- ${s.title}: ${s.description}`).join('\n')}

    Teacher's New Observation:
    "${observation}"

    Generate 1 or 2 NEW strategies to address this observation.
    Make them DISTINCT from existing ones.
    Ensure they are practical for a busy classroom.
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
              title: { type: Type.STRING, description: "Title of the strategy (2-5 words)." },
              description: { type: Type.STRING, description: "1-2 concise sentences explaining what to do." },
              example: { type: Type.STRING, description: "A specific script or scenario showing the strategy in action." },
              reason: { type: Type.STRING, description: "One concise sentence explaining the psychological benefit." },
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