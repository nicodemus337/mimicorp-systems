export type InteractionOption = {
  id: string;
  label: string;
};

export type EmotionalPrompt = {
  question: string;
  options: InteractionOption[];
  reflection?: string;
};

export type StoryPage = {
  id: number;
  text: string;
  image: string | null;
  alt?: string;
  interaction?: EmotionalPrompt | null;
  sensoryCue?: string;
};

export type AccessibilityFeature = {
  title: string;
  description: string;
};

export type Book = {
  slug: string;
  title: string;
  author: string;
  deck: string;
  synopsis: string;
  coverImage: string;
  emotionalGoals: string[];
  caregiverNote: string;
  accessibilityFeatures: AccessibilityFeature[];
  storyPages: StoryPage[];
};
