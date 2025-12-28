import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ProductInput, LandingPageCopy } from "../types";

// Check if API Key exists.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Export status check for UI
export const isApiConfigured = () => !!process.env.API_KEY;

const landingPageSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hero: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        subheadline: { type: Type.STRING },
        ctaPrimary: { type: Type.STRING },
        ctaSecondary: { type: Type.STRING },
      },
      required: ["headline", "subheadline", "ctaPrimary", "ctaSecondary"],
    },
    problem: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        description: { type: Type.STRING },
        painPoints: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ["headline", "description", "painPoints"],
    },
    solution: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        description: { type: Type.STRING },
      },
      required: ["headline", "description"],
    },
    features: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        items: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["title", "description"],
          },
        },
      },
      required: ["headline", "items"],
    },
    howItWorks: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        steps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["title", "description"],
          },
        },
      },
      required: ["headline", "steps"],
    },
    socialProof: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        testimonials: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              role: { type: Type.STRING },
              quote: { type: Type.STRING },
            },
            required: ["name", "role", "quote"],
          },
        },
      },
      required: ["headline", "testimonials"],
    },
    faq: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        items: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING },
            },
            required: ["question", "answer"],
          },
        },
      },
      required: ["headline", "items"],
    },
    cta: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING },
        subheadline: { type: Type.STRING },
        buttonText: { type: Type.STRING },
      },
      required: ["headline", "subheadline", "buttonText"],
    },
  },
  required: ["hero", "problem", "solution", "features", "howItWorks", "socialProof", "faq", "cta"],
};

export const generateLandingPageCopy = async (input: ProductInput): Promise<LandingPageCopy> => {
  if (!isApiConfigured()) {
    console.warn("No API Key found.");
    throw new Error("API Key is missing. Please configure GEMINI_API_KEY in your environment variables.");
  }

  const prompt = `
    You are an expert conversion copywriter.
    Create a high-converting landing page structure and copy for the following product:
    
    Product Name: ${input.name}
    Target Audience: ${input.audience}
    Problem Solved: ${input.problem}
    Desired Tone: ${input.tone}

    Instructions:
    1. Infer 3 key product features that solve the user's problem effectively.
    2. The copy should be benefit-driven, concise, and persuasive. Avoid fluff.
    3. IMPORTANT: The "problem" section must contain EXACTLY 3 distinct pain points.
    4. IMPORTANT: The "features" section must contain EXACTLY 3 items.
    5. IMPORTANT: The "socialProof" section must contain EXACTLY 3 testimonials.
    6. Include a FAQ section with 3-5 relevant questions and answers.
    7. Structure the response exactly according to the provided JSON schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: landingPageSchema,
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as LandingPageCopy;
  } catch (error) {
    console.error("Error generating landing page copy:", error);
    throw error;
  }
};

export const regenerateSection = async (sectionName: string, currentContent: any, input: ProductInput): Promise<any> => {
  if (!isApiConfigured()) {
     throw new Error("API Key is missing.");
  }

  const prompt = `
    Rewrite the following ${sectionName} section for ${input.name}.
    Current Content: ${JSON.stringify(currentContent)}
    Tone: ${input.tone}
    
    Make it punchier and more conversion focused.
    Return ONLY valid JSON matching the structure of the input content.
  `;

  try {
     const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Regeneration failed", e);
    return currentContent;
  }
};