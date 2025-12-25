import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ProductInput, LandingPageCopy } from "../types";

// MOCK DATA FOR DEMO/FALLBACK MODE
const MOCK_DATA: LandingPageCopy = {
  hero: {
    headline: "Boost Your Startup's Growth with AI-Powered Marketing",
    subheadline: "Stop guessing what works. Our advanced algorithms analyze market trends to generate campaigns that convert 3x better than traditional methods.",
    ctaPrimary: "Start Free Trial",
    ctaSecondary: "View Demo"
  },
  problem: {
    headline: "Marketing is expensive, slow, and unpredictable",
    description: "Most startups burn through their runway testing channels that don't work, wasting thousands of dollars and months of time on trial and error.",
    painPoints: [
      "Wasting budget on low-converting ads",
      "No clear attribution for leads",
      "Spending hours on manual data analysis"
    ]
  },
  solution: {
    headline: "Precision targeting on autopilot",
    description: "Our platform connects to your existing data sources and automatically identifies your most profitable customer segments, then deploys optimized campaigns instantly."
  },
  features: {
    headline: "Everything you need to scale",
    items: [
      { title: "Auto-Optimization", description: "Algorithms adjust bids and copy in real-time." },
      { title: "Predictive Analytics", description: "Forecast revenue with 94% accuracy." },
      { title: "Cross-Channel Hub", description: "Manage FB, LinkedIn, and Google ads in one place." }
    ]
  },
  howItWorks: {
    headline: "From setup to scale in 3 steps",
    steps: [
      { title: "Connect Data", description: "Link your CRM and ad accounts securely." },
      { title: "Define Goals", description: "Tell the AI your CPA and growth targets." },
      { title: "Launch & Learn", description: "Approve generated campaigns and watch them perform." }
    ]
  },
  socialProof: {
    headline: "Trusted by 500+ fast-growing teams",
    testimonials: [
      { name: "Alex Rivera", role: "CMO, TechFlow", quote: "We doubled our ROAS in the first month. The AI found audiences we never thought to target." },
      { name: "Jamie Lin", role: "Founder, SaaSCale", quote: "Finally, a tool that actually saves me time. It's like having a data scientist on the team." },
      { name: "Sam Jenkins", role: "Head of Growth, FinStart", quote: "The predictive modeling is scary good. It knew our seasonal dip before we did." }
    ]
  },
  faq: {
    headline: "Common Questions",
    items: [
      { question: "Do I need technical skills?", answer: "No, the platform is designed for non-technical marketers." },
      { question: "What platforms do you support?", answer: "We support Meta, Google, LinkedIn, and TikTok Ads." },
      { question: "Is there a free trial?", answer: "Yes, 14 days full access, no credit card required." }
    ]
  },
  cta: {
    headline: "Ready to stop burning cash?",
    subheadline: "Join the top 1% of data-driven marketers today.",
    buttonText: "Get Started Now"
  }
};

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
  // FALLBACK: If no API key is present, return mock data immediately.
  if (!isApiConfigured()) {
    console.warn("No API Key found. Returning mock data.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_DATA;
  }

  const prompt = `
    You are an expert conversion copywriter.
    Create a high-converting landing page structure and copy for the following product:
    
    Product Name: ${input.name}
    Target Audience: ${input.audience}
    Problem Solved: ${input.problem}
    Key Features: ${input.features}
    Desired Tone: ${input.tone}

    The copy should be benefit-driven, concise, and persuasive. Avoid fluff.
    Include a FAQ section with 3-5 relevant questions and answers.
    Structure the response exactly according to the provided JSON schema.
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
  // FALLBACK: If no API key, just return the current content (no regeneration).
  if (!isApiConfigured()) {
    console.warn("No API Key found. Cannot regenerate.");
    return currentContent;
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