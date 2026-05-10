import type { Book } from "@/types/books";

export const myFeetAreDirty: Book = {
  slug: "my-feet-are-dirty",
  title: "My Feet Are Dirty",
  author: "Amelia Cronan",
  deck: "A calm interactive webbook about sensory overwhelm, words for big feelings, and asking for help.",
  synopsis:
    "Beau loves playing outside after rain, until the feeling of dirt on his feet becomes too much. With a quiet helper nearby, Beau learns to notice the sensation, name it clearly, choose support, and return to play when his body is ready.",
  coverImage: "/assets/images/my-feet-are-dirty-cover.png",
  emotionalGoals: [
    "Name sensory discomfort without shame",
    "Practice simple body-based language",
    "Build confidence asking for support",
    "Normalize pausing before returning to play"
  ],
  caregiverNote:
    "When a child's body says too much, begin with the body. Name the sensation, offer one simple choice, and stay close without rushing the feeling away.",
  accessibilityFeatures: [
    {
      title: "Reduced stimulation mode",
      description: "Softens visual layers and removes decorative motion for sensitive readers."
    },
    {
      title: "Readable typography",
      description: "Adjustable text size and a dyslexia-friendly font option support different reading needs."
    },
    {
      title: "Multiple navigation paths",
      description: "Large touch targets, keyboard arrows, swipe gestures, restart, and home navigation are supported."
    },
    {
      title: "Motion preference respect",
      description: "Transitions honor system and in-reader reduced motion preferences."
    }
  ],
  storyPages: [
    {
      id: 1,
      text: "Beau loved playing outside after rain.",
      image: "/assets/images/my-feet-are-dirty-cover.png",
      alt: "Cover art for My Feet Are Dirty showing Beau in a calm outdoor scene.",
      sensoryCue: "fresh air"
    },
    {
      id: 2,
      text: "The grass was shiny. The air smelled green. The mud made little moons around every step.",
      image: null,
      sensoryCue: "wet grass"
    },
    {
      id: 3,
      text: "Then Beau looked down. There was dirt on one toe. Then two toes. Then all the toes.",
      image: null,
      interaction: {
        question: "How might Beau's body feel?",
        options: [
          { id: "itchy", label: "itchy" },
          { id: "sticky", label: "sticky" },
          { id: "yucky", label: "yucky" },
          { id: "frustrated", label: "frustrated" }
        ],
        reflection: "All of those feelings can be real in one small body."
      }
    },
    {
      id: 4,
      text: "It was not a big problem to the grown-ups. But it was a big feeling in Beau's body.",
      image: null,
      sensoryCue: "scratchy, sticky, wrong"
    },
    {
      id: 5,
      text: "Beau's hands got tight. Beau's eyes got hot. The words went hiding.",
      image: null,
      interaction: {
        question: "What could help when words hide?",
        options: [
          { id: "pause", label: "pause" },
          { id: "point", label: "point" },
          { id: "breathe", label: "breathe" },
          { id: "stay-close", label: "stay close" }
        ],
        reflection: "A quiet pause can make room for the next word."
      }
    },
    {
      id: 6,
      text: "Mimi sat nearby and made a quiet beep. Not a hurry beep. A here-with-you beep.",
      image: null,
      sensoryCue: "quiet support"
    },
    {
      id: 7,
      text: "Mimi held up one small hand. First, we notice, Mimi said. My feet feel dirty.",
      image: null
    },
    {
      id: 8,
      text: "Beau tried the words. My feet feel dirty. The feeling was still there, but the words made a little door.",
      image: null,
      interaction: {
        question: "Which words could Beau use?",
        options: [
          { id: "dirty", label: "my feet feel dirty" },
          { id: "towel", label: "I need a towel" },
          { id: "help", label: "please help me" }
        ],
        reflection: "Clear words can be small and still work."
      }
    },
    {
      id: 9,
      text: "Next, we ask, Mimi said. Can I wash them? Can I have a towel? Can someone stay close?",
      image: null
    },
    {
      id: 10,
      text: "Beau chose the towel. One toe. Pause. Another toe. Pause. The world came back one small clean place at a time.",
      image: null,
      sensoryCue: "soft towel"
    },
    {
      id: 11,
      text: "When Beau was ready, the yard was still there. The rain smell. The grass shine. The little moons in the mud.",
      image: null
    },
    {
      id: 12,
      text: "Beau did not have to love dirty feet. Beau did not have to pretend. Beau could notice, ask, pause, and try again.",
      image: null,
      interaction: {
        question: "What did Beau practice?",
        options: [
          { id: "notice", label: "notice" },
          { id: "ask", label: "ask" },
          { id: "pause", label: "pause" },
          { id: "try-again", label: "try again" }
        ],
        reflection: "That is a brave plan for a big feeling."
      }
    }
  ]
};

export const books = [myFeetAreDirty] as const;
