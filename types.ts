export enum Tone {
  PROFESSIONAL = 'Professional',
  FRIENDLY = 'Friendly',
  BOLD = 'Bold',
  LUXURY = 'Luxury',
  MINIMALIST = 'Minimalist'
}

export type ColorTheme = 'indigo' | 'blue' | 'emerald' | 'rose' | 'amber' | 'violet';

export interface ProductInput {
  name: string;
  audience: string;
  problem: string;
  features: string;
  tone: Tone;
  colorTheme: ColorTheme;
}

export interface GeneratedSection {
  id: string;
  title: string;
  content: any;
  isEditing: boolean;
}

export interface LandingPageCopy {
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problem: {
    headline: string;
    description: string;
    painPoints: string[];
  };
  solution: {
    headline: string;
    description: string;
  };
  features: {
    headline: string;
    items: { title: string; description: string }[];
  };
  howItWorks: {
    headline: string;
    steps: { title: string; description: string }[];
  };
  socialProof: {
    headline: string;
    testimonials: { name: string; role: string; quote: string }[];
  };
  faq: {
    headline: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    headline: string;
    subheadline: string;
    buttonText: string;
  };
}

export interface User {
  id: string;
  username: string;
  password?: string; // In a real app, never store raw passwords. This is a mock.
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  input: ProductInput;
  copy: LandingPageCopy | null;
}
