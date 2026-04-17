export type BranchCard = {
  label: string;
  value: string;
};

export type BranchModule = {
  title: string;
  body: string;
};

export type BranchDeployment = {
  name: string;
  body: string;
};

export type BranchAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type BranchPageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  position: string;
  cards: BranchCard[];
  mandate: string;
  modules: BranchModule[];
  revenueLines: string[];
  deployments: BranchDeployment[];
  proof: string;
  actions: BranchAction[];
};

export const branchPages: BranchPageContent[] = [
  {
    slug: "land-systems",
    title: "Land Systems",
    eyebrow: "Domain / Land",
    intro:
      "Land systems connect real-world operations to visibility, distribution, and revenue.",
    position:
      "This domain exists to make land-based work operationally legible, commercially viable, and structurally durable.",
    cards: [
      { label: "Core input", value: "Land, labor, seasonality" },
      { label: "Primary output", value: "Revenue + operational clarity" },
      { label: "Deployment type", value: "Ranch, farm, ecological operation" }
    ],
    mandate:
      "Mimicorp uses land systems to turn physical operations into functioning commercial systems. The work starts with conditions on the ground, then builds the infrastructure required to make those conditions productive.",
    modules: [
      {
        title: "Observation",
        body:
          "Field notes, production realities, customer demand, and ecological constraints become the base layer."
      },
      {
        title: "Structure",
        body:
          "Direct-to-consumer flows, operating procedures, reporting systems, and decision frameworks are built around those inputs."
      },
      {
        title: "Distribution",
        body:
          "Sales, communication, and media are aligned to the operation so the work can move beyond the property line."
      }
    ],
    revenueLines: [
      "Direct-to-consumer product sales",
      "Operational efficiency gains",
      "Brand and narrative leverage tied to real production",
      "Long-term land intelligence that compounds"
    ],
    deployments: [
      {
        name: "Gonsoulin Land & Cattle",
        body:
          "A direct-to-consumer beef system integrating production, media, and sales."
      }
    ],
    proof:
      "Land systems only matter if the operation becomes clearer, more durable, and more profitable in the real world.",
    actions: [
      { label: "Visit GLC Ranch", href: "https://glcranch.com", external: true },
      { label: "Contact Mimicorp", href: "/#contact" }
    ]
  },
  {
    slug: "business-systems",
    title: "Business Systems",
    eyebrow: "Domain / Business",
    intro:
      "Business systems organize fragmented operations into clear workflows, customer movement, and working infrastructure.",
    position:
      "This domain exists to replace chaos with systems that can hold daily operations, growth, and handoffs.",
    cards: [
      { label: "Core input", value: "Team, customers, process gaps" },
      { label: "Primary output", value: "Clarity + throughput" },
      { label: "Deployment type", value: "Retail, service, utility business" }
    ],
    mandate:
      "Mimicorp uses business systems to clean up how work moves through an organization. The goal is not more activity. The goal is a structure that lets the business perform consistently.",
    modules: [
      {
        title: "Internal workflow",
        body:
          "Map how information, people, and work currently move, then rebuild the sequence where it is breaking."
      },
      {
        title: "Customer path",
        body:
          "Clarify how customers discover, enter, buy, and return so the business stops leaking attention and demand."
      },
      {
        title: "Operational infrastructure",
        body:
          "Build the forms, systems, interfaces, and coordination logic that let the business carry more weight."
      }
    ],
    revenueLines: [
      "Higher throughput from clearer workflow",
      "Better conversion through cleaner customer flow",
      "Reduced operational drag",
      "A business structure that can scale without panic"
    ],
    deployments: [
      {
        name: "GP Supply & Lumber",
        body:
          "A legacy retail operation restructured with modern systems and customer flow."
      }
    ],
    proof:
      "Business systems work when the operation stops depending on improvisation and starts producing repeatable performance.",
    actions: [
      { label: "Review Services", href: "/nodes/services/" },
      { label: "Contact Mimicorp", href: "/#contact" }
    ]
  },
  {
    slug: "media-systems",
    title: "Media Systems",
    eyebrow: "Domain / Media",
    intro:
      "Media systems turn operations into narrative infrastructure that builds attention, trust, and distribution.",
    position:
      "This domain exists to make media functional inside the system, not decorative around it.",
    cards: [
      { label: "Core input", value: "Observation, voice, process" },
      { label: "Primary output", value: "Attention + distribution" },
      { label: "Deployment type", value: "Podcast, brand, publishing system" }
    ],
    mandate:
      "Mimicorp uses media systems to translate operations into public signal. The objective is to build media that expands the system's reach while staying tied to real work.",
    modules: [
      {
        title: "Narrative structure",
        body:
          "Define what the system is saying, why it matters, and how the message stays coherent over time."
      },
      {
        title: "Production pipeline",
        body:
          "Build the capture, editing, release, and archive logic required to publish consistently."
      },
      {
        title: "Distribution logic",
        body:
          "Deploy media across platforms in ways that support revenue, trust, and system visibility."
      }
    ],
    revenueLines: [
      "Audience growth tied to real operations",
      "Brand lift with structural credibility",
      "Content pipelines that support sales and partnerships",
      "Distribution assets that compound"
    ],
    deployments: [
      {
        name: "Second Cutting",
        body:
          "A media system documenting land, people, and process while staying tied to real-world operations."
      }
    ],
    proof:
      "Media systems are successful when they amplify operations instead of distracting from them.",
    actions: [
      { label: "Open Second Cutting", href: "/second-cutting" },
      {
        label: "Listen on Apple Podcasts",
        href: "https://podcasts.apple.com/us/podcast/boots-on-the-ground/id1865905475?i=1000760968746",
        external: true
      }
    ]
  },
  {
    slug: "research-lab",
    title: "Research Lab",
    eyebrow: "Domain / Research",
    intro:
      "The research domain develops frameworks, archives, and conceptual systems before they enter broader deployment.",
    position:
      "This domain exists to test structures early, preserve intelligence, and develop new systems that can later become operational.",
    cards: [
      { label: "Core input", value: "Theory, notes, archive material" },
      { label: "Primary output", value: "Models + system intelligence" },
      { label: "Deployment type", value: "Archive, concept, long-range build" }
    ],
    mandate:
      "Mimicorp uses research systems to keep thought rigorous and cumulative. The work here becomes future infrastructure, not just documentation.",
    modules: [
      {
        title: "Frameworks",
        body:
          "Develop conceptual models that can hold operational complexity before it is packaged into a public-facing system."
      },
      {
        title: "Archives",
        body:
          "Preserve records, notes, and evolving intelligence so information compounds instead of dispersing."
      },
      {
        title: "Prototype logic",
        body:
          "Use research to test future deployments before they become expensive or public."
      }
    ],
    revenueLines: [
      "Future deployment intelligence",
      "Stronger strategic positioning",
      "Long-term archive value",
      "New systems that can later become products or operations"
    ],
    deployments: [
      {
        name: "Staging the State",
        body:
          "A research structure demonstrating how ideas, archives, and long-view system thinking can be organized and deployed."
      }
    ],
    proof:
      "Research matters when it produces future operating leverage instead of remaining isolated theory.",
    actions: [
      { label: "Open Research Archive", href: "/research/staging-the-state.html" },
      { label: "Contact Mimicorp", href: "/#contact" }
    ]
  }
];

export const branchPagesBySlug = Object.fromEntries(
  branchPages.map((branch) => [branch.slug, branch])
) as Record<string, BranchPageContent>;
