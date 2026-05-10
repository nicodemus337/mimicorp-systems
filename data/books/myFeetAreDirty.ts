import type { Book } from "@/types/book";

export const myFeetAreDirty: Book = {
  slug: "my-feet-are-dirty",
  title: "My Feet Are Dirty",
  subtitle: null,
  author: "Amelia Cronan",
  ageRange: "Ages 3-7",
  theme: "Sensory awareness, emotional regulation, self-advocacy",
  description:
    "A gentle interactive story about recognizing sensory discomfort, naming feelings, and asking for help.",
  accessibility: {
    dyslexiaFriendly: true,
    reducedMotion: true,
    highContrast: true,
    textResize: true,
    lowStimulationMode: true,
    narration: false
  },
  palette: {
    primary: "#6FA8DC",
    secondary: "#8B5E3C",
    accent: "#E74C3C",
    warmth: "#F4D35E",
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
      title: "My Feet Are Dirty",
      author: "Amelia Cronan",
      image: "/books/my-feet-are-dirty/cover.png"
    },
    {
      id: 2,
      type: "story",
      text: "Sometimes something feels wrong, even when we don't know why.",
      image: "/books/my-feet-are-dirty/page-02.png"
    },
    {
      id: 3,
      type: "story",
      text: "Beau loved playing outside.",
      image: "/books/my-feet-are-dirty/page-03.png"
    },
    {
      id: 4,
      type: "story",
      text: "He ran. He jumped. He explored.",
      image: "/books/my-feet-are-dirty/page-04.png"
    },
    {
      id: 5,
      type: "story",
      text: "He stomped in the dirt.",
      image: "/books/my-feet-are-dirty/page-05.png"
    },
    {
      id: 6,
      type: "story",
      text: "He dug with his toes.",
      image: "/books/my-feet-are-dirty/page-06.png"
    },
    {
      id: 7,
      type: "story",
      text: "Then something changed.",
      image: "/books/my-feet-are-dirty/page-07.png"
    },
    {
      id: 8,
      type: "story",
      text: "His feet felt... strange.",
      image: "/books/my-feet-are-dirty/page-08.png"
    },
    {
      id: 9,
      type: "interaction",
      prompt: "How do you think Beau feels?",
      options: ["Itchy", "Yucky", "Uncomfortable", "Frustrated"],
      image: "/books/my-feet-are-dirty/page-09.png"
    },
    {
      id: 10,
      type: "story",
      text: "Beau didn't know what to say.",
      image: "/books/my-feet-are-dirty/page-10.png"
    },
    {
      id: 11,
      type: "story",
      text: "His body felt squirmy.",
      image: "/books/my-feet-are-dirty/page-11.png"
    },
    {
      id: 12,
      type: "story",
      text: "His smile disappeared.",
      image: "/books/my-feet-are-dirty/page-12.png"
    },
    {
      id: 13,
      type: "story",
      text: "Sometimes uncomfortable feelings can make us feel upset.",
      image: "/books/my-feet-are-dirty/page-13.png"
    },
    {
      id: 14,
      type: "story",
      text: "A grown-up noticed Beau was having a hard time.",
      image: "/books/my-feet-are-dirty/page-14.png"
    },
    {
      id: 15,
      type: "dialogue",
      speaker: "grownup",
      text: "What's wrong, Beau?",
      image: "/books/my-feet-are-dirty/page-15.png"
    },
    {
      id: 16,
      type: "story",
      text: "Beau looked down.",
      image: "/books/my-feet-are-dirty/page-16.png"
    },
    {
      id: 17,
      type: "dialogue",
      speaker: "beau",
      text: "My feet are dirty.",
      image: "/books/my-feet-are-dirty/page-17.png"
    },
    {
      id: 18,
      type: "story",
      text: "Now the grown-up understood.",
      image: "/books/my-feet-are-dirty/page-18.png"
    },
    {
      id: 19,
      type: "story",
      text: "Warm water helped. Clean feet helped. Beau felt better.",
      image: "/books/my-feet-are-dirty/page-19.png"
    },
    {
      id: 20,
      type: "interaction",
      prompt: "What helps YOUR body feel better?",
      options: ["Washing", "Quiet time", "A hug", "Clean clothes"],
      image: "/books/my-feet-are-dirty/page-20.png"
    },
    {
      id: 21,
      type: "story",
      text: "When our bodies feel uncomfortable, we can ask for help.",
      image: "/books/my-feet-are-dirty/page-21.png"
    },
    {
      id: 22,
      type: "caregiver-note",
      title: "Caregiver Note",
      text: [
        "Children sometimes experience sensory discomfort before they can explain what feels wrong.",
        "This story helps children practice noticing body sensations, naming uncomfortable feelings, and asking for help."
      ],
      image: "/books/my-feet-are-dirty/page-22.png"
    }
  ]
};

export const books = [myFeetAreDirty] as const;
