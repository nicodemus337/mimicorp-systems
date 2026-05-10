export type BookPageType =
  | "cover"
  | "story"
  | "dialogue"
  | "interaction"
  | "caregiver-note";

export type BookAccessibility = {
  dyslexiaFriendly: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  textResize: boolean;
  lowStimulationMode: boolean;
  narration: boolean;
};

export type BookPalette = {
  primary: string;
  secondary: string;
  accent: string;
  warmth: string;
  background: string;
};

export type Protagonist = {
  name: string;
  description: {
    hair: string;
    skinTone: string;
    expression: string;
    shirt: string;
    pants: string;
    shoes: string;
  };
};

export type CoverPage = {
  id: number;
  type: "cover";
  title: string;
  author: string;
  image: string;
};

export type StoryPage = {
  id: number;
  type: "story";
  text: string;
  image: string;
};

export type DialoguePage = {
  id: number;
  type: "dialogue";
  speaker: "beau" | "grownup" | string;
  text: string;
  image: string;
};

export type InteractionPage = {
  id: number;
  type: "interaction";
  prompt: string;
  options: string[];
  image: string;
};

export type CaregiverNotePage = {
  id: number;
  type: "caregiver-note";
  title: string;
  text: string[];
  image: string;
};

export type BookPage =
  | CoverPage
  | StoryPage
  | DialoguePage
  | InteractionPage
  | CaregiverNotePage;

export type Book = {
  slug: string;
  title: string;
  subtitle: string | null;
  author: string;
  ageRange: string;
  theme: string;
  description: string;
  accessibility: BookAccessibility;
  palette: BookPalette;
  protagonist: Protagonist;
  pages: BookPage[];
};
