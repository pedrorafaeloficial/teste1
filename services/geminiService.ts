import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedFile, ThemeConfig } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateWPThemeCode = async (
  prompt: string, 
  currentConfig: ThemeConfig
): Promise<GeneratedFile[]> => {
  
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const modelId = "gemini-3-flash-preview";

  const systemPrompt = `
    You are an expert WordPress Theme Developer. 
    Your task is to generate the core files for a WordPress theme based on the user's description and configuration.
    
    Current Visual Configuration to respect (if not overridden by prompt):
    - Name: ${currentConfig.name}
    - Primary Color: ${currentConfig.primaryColor}
    - Font: ${currentConfig.fontBody}
    - Layout: ${currentConfig.layout}

    You must return a JSON object containing an array of files. 
    Required files: 
    1. style.css (Include standard WP header comments)
    2. functions.php (Basic setup, enqueue styles)
    3. index.php (Main template loop)
    4. header.php
    5. footer.php
    
    Ensure the code is modern, secure, and functional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `User Prompt: ${prompt}. \n\n Generate the WordPress theme files now.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            files: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  filename: { type: Type.STRING },
                  content: { type: Type.STRING },
                  language: { type: Type.STRING, description: "e.g., php, css" }
                },
                required: ["filename", "content", "language"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    const data = JSON.parse(text);
    return data.files || [];

  } catch (error) {
    console.error("Error generating theme:", error);
    throw error;
  }
};

export const suggestThemeConfig = async (prompt: string): Promise<Partial<ThemeConfig>> => {
  if (!apiKey) return {};
  
  const modelId = "gemini-3-flash-preview";
  
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Analyze this request: "${prompt}". Suggest a color palette and font pairing suitable for a WordPress theme of this nature. Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                primaryColor: { type: Type.STRING, description: "Hex code" },
                secondaryColor: { type: Type.STRING, description: "Hex code" },
                backgroundColor: { type: Type.STRING, description: "Hex code" },
                textColor: { type: Type.STRING, description: "Hex code" },
                fontHeading: { type: Type.STRING, description: "Font family name" },
                fontBody: { type: Type.STRING, description: "Font family name" },
                layout: { type: Type.STRING, enum: ["classic", "modern", "grid"] }
            }
        }
      }
    });
    
    if (response.text) {
        return JSON.parse(response.text) as Partial<ThemeConfig>;
    }
    return {};
  } catch (e) {
      console.error(e);
      return {};
  }
}
