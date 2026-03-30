export type BranchSection = {
  title: string;
  body: string;
};

export type BranchAction = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
};

export type BranchHighlight = {
  label: string;
  value: string;
  detail: string;
};

export type BranchPageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  pathLabel: string;
  chips: string[];
  featuredLabel: string;
  featuredTitle: string;
  featuredBody: string;
  purpose: BranchSection[];
  highlights: BranchHighlight[];
  nextSteps: string[];
  actions: BranchAction[];
};

export const branchPages: BranchPageContent[] = [
  {
    slug: "second-cutting",
    title: "Second Cutting",
    eyebrow: "Documentary Branch",
    intro:
      "A documentary podcast that turns field conditions, agricultural realities, and long-view thinking into public-facing stories people can actually follow.",
    pathLabel: "Best first stop for new visitors",
    chips: ["Podcast", "Field Reporting", "Public Narrative"],
    featuredLabel: "Current spotlight",
    featuredTitle: "The Meadow is the Pharmacy, Part 2",
    featuredBody:
      "A continuation of the meadow pharmacy conversation, following how ecological conditions move through animals, land, and human life as one connected system.",
    purpose: [
      {
        title: "What it is",
        body:
          "Second Cutting is the clearest introduction to Mimicorp because it explains the work in a human format. Instead of starting with strategy language, it starts with voice, conversation, and lived experience."
      },
      {
        title: "Why it matters",
        body:
          "This branch helps people understand the landscape, the people working within it, and the constraints shaping real decisions. It builds trust because it stays close to actual conditions instead of abstract positioning."
      },
      {
        title: "How it fits the system",
        body:
          "Within Mimicorp, Second Cutting carries the public narrative layer. It gives partners, listeners, and future collaborators a way to understand the work before they encounter the more technical branches."
      }
    ],
    highlights: [
      {
        label: "Best for",
        value: "Orientation",
        detail: "The fastest route for someone who is new to the work."
      },
      {
        label: "Primary output",
        value: "Episodes",
        detail: "Audio conversations and reporting grounded in the field."
      },
      {
        label: "Main job",
        value: "Build context",
        detail: "Translate complex work into stories people can follow."
      }
    ],
    nextSteps: [
      "Listen to the current featured episode first.",
      "Use the homepage map afterward to see how the media branch connects to operations, design, and data.",
      "Return to the homepage if you want to branch into the ranch, public voice, or place-based experience."
    ],
    actions: [
      {
        label: "Listen on Apple Podcasts",
        href: "https://podcasts.apple.com/us/podcast/second-cutting/id1865905475?i=1000758078662",
        external: true,
        variant: "primary"
      },
      {
        label: "Listen on Spotify",
        href: "https://open.spotify.com/episode/4SY1lU1XjGKHAAVbSGMvHT?si=R3ET1KIVTyCOtQX-kXCB2g",
        external: true,
        variant: "secondary"
      }
    ]
  },
  {
    slug: "joynet",
    title: "JoyNet",
    eyebrow: "Public Voice",
    intro:
      "A public-facing branch for values, language, and cultural meaning. It gives the broader Mimicorp system a human register instead of leaving the work as operations alone.",
    pathLabel: "Best for people looking for values and worldview",
    chips: ["Publishing", "Culture", "Public Signal"],
    featuredLabel: "Why it exists",
    featuredTitle: "A public voice around the work",
    featuredBody:
      "JoyNet helps translate the emotional, cultural, and philosophical texture around the system. It makes space for doubt, belief, meaning, and the wider language people use to understand place.",
    purpose: [
      {
        title: "What it is",
        body:
          "JoyNet is where the wider public voice of the system becomes legible. It is less about logistics and more about the ideas, values, and framing that make the work feel human."
      },
      {
        title: "Why it matters",
        body:
          "Projects need more than execution. They need language people can recognize and trust. JoyNet helps shape that layer so the work has cultural coherence, not just operational competence."
      },
      {
        title: "How it fits the system",
        body:
          "Within Mimicorp, JoyNet supports trust, alignment, and public interpretation. It sits close to media and design because those branches carry the message outward."
      }
    ],
    highlights: [
      {
        label: "Best for",
        value: "Context",
        detail: "Useful when someone wants the values and worldview around the work."
      },
      {
        label: "Primary output",
        value: "Language",
        detail: "Essays, framing, and public-facing expression."
      },
      {
        label: "Main job",
        value: "Build trust",
        detail: "Give the system a voice people can understand and relate to."
      }
    ],
    nextSteps: [
      "Visit the public site to explore the current voice and publishing surface.",
      "Use this branch when you want more than a technical explanation of Mimicorp.",
      "Move from JoyNet into the homepage map if you want to see how public voice connects to media and design."
    ],
    actions: [
      {
        label: "Visit JoyNet",
        href: "https://joynet.church",
        external: true,
        variant: "primary"
      },
      {
        label: "Back to Mimicorp homepage",
        href: "/",
        variant: "secondary"
      }
    ]
  },
  {
    slug: "glc-ranch",
    title: "GLC Ranch",
    eyebrow: "Operating Ground",
    intro:
      "The land-based working context behind the thesis. This is where constraints, timing, labor, and proof stay real enough to test every bigger claim.",
    pathLabel: "Best for people who want the field reality",
    chips: ["Operations", "Ranch", "Field Proof"],
    featuredLabel: "Role in the system",
    featuredTitle: "The ground truth branch",
    featuredBody:
      "GLC Ranch keeps the larger Mimicorp system accountable to what the land is actually asking for. It is where theory runs into weather, timing, animals, labor, and the sequence of real work.",
    purpose: [
      {
        title: "What it is",
        body:
          "GLC Ranch is the operating ground that anchors the broader system. It is not a concept layer. It is where work gets tested against practical conditions."
      },
      {
        title: "Why it matters",
        body:
          "Without a branch like this, the rest of the system could drift toward aesthetics or abstraction. GLC provides the constraints that make the larger thesis honest."
      },
      {
        title: "How it fits the system",
        body:
          "This branch feeds media, data, and design with reality. It supplies observations, operational proof, and concrete sequencing so other outputs stay connected to actual land-based conditions."
      }
    ],
    highlights: [
      {
        label: "Best for",
        value: "Proof",
        detail: "The strongest branch for understanding how the ideas hold up in practice."
      },
      {
        label: "Primary output",
        value: "Conditions",
        detail: "Real observations, operational limits, and sequencing logic."
      },
      {
        label: "Main job",
        value: "Keep it honest",
        detail: "Ground the larger system in lived field reality."
      }
    ],
    nextSteps: [
      "Visit the ranch site if you want the operating context directly.",
      "Come back to the Mimicorp map to see how ranch conditions connect outward into media, archive, and design.",
      "Use this branch when you want proof before philosophy."
    ],
    actions: [
      {
        label: "Visit GLC Ranch",
        href: "https://glcranch.com",
        external: true,
        variant: "primary"
      },
      {
        label: "Return to homepage map",
        href: "/#pathways",
        variant: "secondary"
      }
    ]
  },
  {
    slug: "teche-lake",
    title: "Teche Lake Outfitters",
    eyebrow: "Experience In Place",
    intro:
      "A place-based branch that lets people encounter the landscape directly through guided movement and firsthand experience instead of only reading about it from a distance.",
    pathLabel: "Best for people who want direct experience",
    chips: ["Landscape", "Guided Access", "Encounter"],
    featuredLabel: "Why it matters",
    featuredTitle: "Understanding through presence",
    featuredBody:
      "Teche Lake Outfitters gives the larger system an experiential doorway. It helps people meet the place itself, which changes how they understand stewardship, ecology, and what needs protecting.",
    purpose: [
      {
        title: "What it is",
        body:
          "This branch creates direct access to landscape through guided experiences. It brings people into contact with the environment instead of leaving them with a secondhand summary."
      },
      {
        title: "Why it matters",
        body:
          "Some understanding only arrives in person. Teche Lake builds that bridge by turning place into a lived encounter rather than an abstract idea."
      },
      {
        title: "How it fits the system",
        body:
          "Within Mimicorp, this branch supports public access and embodied understanding. It complements the media and public voice branches by giving people a direct relationship to the landscape."
      }
    ],
    highlights: [
      {
        label: "Best for",
        value: "Experience",
        detail: "The clearest route for someone who wants to meet the place directly."
      },
      {
        label: "Primary output",
        value: "Guided access",
        detail: "Shared movement, lived landscape, and practical encounter."
      },
      {
        label: "Main job",
        value: "Create contact",
        detail: "Move people from concept into firsthand experience."
      }
    ],
    nextSteps: [
      "Visit the outfitter site to explore the current offering.",
      "Use this branch when you want to understand place through encounter rather than explanation alone.",
      "Return to the Mimicorp homepage when you want to connect that experience back to the wider system."
    ],
    actions: [
      {
        label: "Visit Teche Lake Outfitters",
        href: "https://www.techelakeoutfitters.com",
        external: true,
        variant: "primary"
      },
      {
        label: "Back to homepage",
        href: "/",
        variant: "secondary"
      }
    ]
  }
];

export const branchPagesBySlug = Object.fromEntries(
  branchPages.map((branch) => [branch.slug, branch])
) as Record<string, BranchPageContent>;
