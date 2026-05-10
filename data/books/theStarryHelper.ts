import type { Book } from "@/types/book";

export const theStarryHelper: Book = {
  slug: "the-starry-helper",
  title: "The Starry Helper",
  subtitle: null,
  author: "Amelia Cronan",
  ageRange: "Ages 3-7",
  theme: "Friendship, feelings, co-regulation, asking for help",
  description:
    "A gentle interactive story about friendship, feelings, and finding help when we need it.",
  emotionalGoals: [
    "Notice when a feeling becomes too big to hold alone",
    "Practice asking for help with simple words",
    "Learn that support can be calm, kind, and nearby",
    "Build confidence returning to rest after a hard moment"
  ],
  caregiverNote: {
    preview:
      "Children often need connection before they can problem-solve. This story supports a calm pattern: notice the feeling, name one need, and invite help without pressure.",
    script: "I am here. Your feeling is big. Would you like quiet, a hand, or help finding words?"
  },
  accessibility: {
    dyslexiaFriendly: true,
    reducedMotion: true,
    highContrast: true,
    textResize: true,
    lowStimulationMode: true,
    narration: false
  },
  palette: {
    primary: "#1D4F91",
    secondary: "#203A5F",
    accent: "#E74C3C",
    warmth: "#F4C84B",
    background: "#FDFCF8"
  },
  protagonist: {
    name: "Beau",
    description: {
      hair: "curly brown hair",
      skinTone: "warm medium skin tone",
      expression: "signature joyful smile",
      shirt: "blue shirt",
      pants: "yellow pants",
      shoes: "red shoes"
    }
  },
  pages: [
    {
      id: 1,
      type: "cover",
      title: "The Starry Helper",
      author: "Amelia Cronan",
      image: "/books/the-starry-helper/cover.png"
    },
    {
      id: 2,
      type: "story",
      text: "At bedtime, Beau looked out at the sky.",
      image: "/books/the-starry-helper/page-02.png"
    },
    {
      id: 3,
      type: "story",
      text: "The stars were tiny lights, blinking softly above the rooftops.",
      image: "/books/the-starry-helper/page-03.png"
    },
    {
      id: 4,
      type: "story",
      text: "One star seemed brighter than the rest.",
      image: "/books/the-starry-helper/page-04.png"
    },
    {
      id: 5,
      type: "dialogue",
      speaker: "beau",
      text: "Hello up there.",
      image: "/books/the-starry-helper/page-05.png"
    },
    {
      id: 6,
      type: "dialogue",
      speaker: "star",
      text: "Hello down there.",
      image: "/books/the-starry-helper/page-06.png"
    },
    {
      id: 7,
      type: "story",
      text: "Beau smiled, but his chest still felt busy.",
      image: "/books/the-starry-helper/page-07.png"
    },
    {
      id: 8,
      type: "interaction",
      prompt: "How might Beau's chest feel?",
      options: ["Fluttery", "Heavy", "Tight", "Full"],
      image: "/books/the-starry-helper/page-08.png"
    },
    {
      id: 9,
      type: "story",
      text: "Sometimes feelings sparkle. Sometimes they storm.",
      image: "/books/the-starry-helper/page-09.png"
    },
    {
      id: 10,
      type: "dialogue",
      speaker: "star",
      text: "You do not have to hold the whole sky by yourself.",
      image: "/books/the-starry-helper/page-10.png"
    },
    {
      id: 11,
      type: "story",
      text: "Beau put one hand on his heart and one hand on the grass.",
      image: "/books/the-starry-helper/page-11.png"
    },
    {
      id: 12,
      type: "interaction",
      prompt: "What kind of help could Beau ask for?",
      options: ["A quiet minute", "A hand to hold", "Help with words", "Someone close"],
      image: "/books/the-starry-helper/page-12.png"
    },
    {
      id: 13,
      type: "dialogue",
      speaker: "beau",
      text: "Can you stay while I feel this?",
      image: "/books/the-starry-helper/page-13.png"
    },
    {
      id: 14,
      type: "dialogue",
      speaker: "star",
      text: "I can stay. Helpers do not need to hurry.",
      image: "/books/the-starry-helper/page-14.png"
    },
    {
      id: 15,
      type: "story",
      text: "The night grew softer. Beau's breath found a slow little rhythm.",
      image: "/books/the-starry-helper/page-15.png"
    },
    {
      id: 16,
      type: "story",
      text: "The big feeling did not disappear all at once. It became small enough to share.",
      image: "/books/the-starry-helper/page-16.png"
    },
    {
      id: 17,
      type: "interaction",
      prompt: "Who can be a helper when feelings are big?",
      options: ["A caregiver", "A friend", "A teacher", "My own brave words"],
      image: "/books/the-starry-helper/page-17.png"
    },
    {
      id: 18,
      type: "story",
      text: "Beau waved goodnight to the starry helper.",
      image: "/books/the-starry-helper/page-18.png"
    },
    {
      id: 19,
      type: "story",
      text: "Some help shines. Some help listens. Some help sits beside us until we are ready.",
      image: "/books/the-starry-helper/page-19.png"
    },
    {
      id: 20,
      type: "caregiver-note",
      title: "Caregiver Note",
      text: [
        "When children feel overwhelmed, a calm helper can become an anchor before any lesson or solution is possible.",
        "Try naming the feeling, offering one or two forms of support, and staying close while the child finds their next words."
      ],
      image: "/books/the-starry-helper/page-20.png"
    }
  ]
};
