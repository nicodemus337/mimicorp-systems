import { LayoutContainer } from "@/components/LayoutContainer";
import { MotionWrapper } from "@/components/MotionWrapper";

const domains = [
  {
    name: "Land",
    stem: "Operating ground",
    description:
      "Land keeps the system honest by forcing every idea through weather, labor, timing, and living conditions.",
    example:
      "Example: Gonsoulin Land & Cattle gives Mimicorp a real environment for testing stewardship, sequencing, and infrastructure decisions."
  },
  {
    name: "Media",
    stem: "Public narrative",
    description:
      "Media turns field conditions into language people can understand, trust, and act on.",
    example:
      "Example: Second Cutting translates ranch realities into documentary episodes that make the wider system legible fast."
  },
  {
    name: "Technology",
    stem: "Operational infrastructure",
    description:
      "Technology gives projects the forms, websites, and automations that let the work move cleanly once the direction is clear.",
    example:
      "Example: Mimicorp builds digital systems, intake flows, and lightweight infrastructure that reduce drag behind the scenes."
  }
] as const;

const proofs = [
  {
    title: "Gonsoulin Land & Cattle",
    type: "Stem / Land",
    summary:
      "A working ranch that anchors the thesis in real constraints instead of concept alone.",
    outcome:
      "The work is tested against grass, animals, labor, and timing before it becomes a story, tool, or plan.",
    href: "https://glcranch.com",
    cta: "Visit GLC Ranch",
    external: true
  },
  {
    title: "Second Cutting",
    type: "Fruit / Media",
    summary:
      "A documentary podcast that explains how land, animals, food, and people move together.",
    outcome:
      "It gives first-time listeners a clear entry point into Mimicorp without asking them to decode the entire system.",
    href: "/second-cutting",
    cta: "Open Second Cutting",
    external: false
  },
  {
    title: "System Builds",
    type: "Fruit / Technology",
    summary:
      "Websites, forms, scheduling flows, and operational cleanup for projects that need clearer infrastructure.",
    outcome:
      "The result is less administrative drag, better handoffs, and a system that can actually carry the work forward.",
    href: "/nodes/services/",
    cta: "View services",
    external: false
  }
] as const;

const heroLines = [
  "Mimicorp builds land, media, and technical systems that move real work forward.",
  "It connects operating ground, public narrative, and infrastructure so projects can be understood, trusted, and built.",
  "You can see it in Gonsoulin Land & Cattle, Second Cutting, and the systems that support the work."
] as const;

export default function HomePage() {
  return (
    <LayoutContainer>
      <MotionWrapper className="homepage-flow pb-20 pt-6 md:pb-28 md:pt-8">
        <section className="home-hero" aria-labelledby="home-hero-title">
          <div className="home-hero__copy">
            <p className="home-kicker">Mimicorp Systems</p>
            <h1 id="home-hero-title" className="home-hero__title">
              {heroLines[0]}
            </h1>
            <p className="home-hero__mechanism">{heroLines[1]}</p>
            <p className="home-hero__proof">{heroLines[2]}</p>
            <a href="#entry-point" className="home-button home-button--primary">
              Start a project
            </a>
          </div>

          <div className="system-mark" aria-hidden="true">
            <div className="system-mark__orbital" />
            <div className="system-mark__core">
              <span className="system-mark__label system-mark__label--core">System</span>
              <span className="system-mark__trunk" />
              <span className="system-mark__branch system-mark__branch--left" />
              <span className="system-mark__branch system-mark__branch--right" />
              <span className="system-mark__fruit system-mark__fruit--top" />
              <span className="system-mark__fruit system-mark__fruit--left" />
              <span className="system-mark__fruit system-mark__fruit--right" />
            </div>
            <div className="system-mark__legend">
              <span>Branches: land, media, technology</span>
              <span>Stems: projects</span>
              <span>Fruit: outputs</span>
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="system-explanation-title">
          <div className="home-section__intro">
            <p className="home-kicker">How It Works</p>
            <h2 id="system-explanation-title" className="home-section__title">
              Mimicorp is a system with three working branches.
            </h2>
            <p className="home-section__body">
              Each branch does a distinct job, but they only make sense as one structure.
            </p>
          </div>

          <div className="branch-grid">
            {domains.map((domain) => (
              <article key={domain.name} className="branch-card">
                <p className="branch-card__stem">{domain.stem}</p>
                <h3 className="branch-card__title">{domain.name}</h3>
                <p className="branch-card__description">{domain.description}</p>
                <p className="branch-card__example">{domain.example}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="proof-title">
          <div className="home-section__intro">
            <p className="home-kicker">Real Outputs</p>
            <h2 id="proof-title" className="home-section__title">
              The work shows up in projects, not claims.
            </h2>
          </div>

          <div className="proof-grid">
            {proofs.map((proof) => (
              <article key={proof.title} className="proof-card">
                <div className="proof-card__head">
                  <p className="proof-card__type">{proof.type}</p>
                  <h3 className="proof-card__title">{proof.title}</h3>
                </div>
                <p className="proof-card__summary">{proof.summary}</p>
                <p className="proof-card__outcome">{proof.outcome}</p>
                <a
                  href={proof.href}
                  className="home-button home-button--secondary"
                  target={proof.external ? "_blank" : undefined}
                  rel={proof.external ? "noreferrer" : undefined}
                >
                  {proof.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section home-section--principle" aria-labelledby="principle-title">
          <p className="home-kicker">Operating Principle</p>
          <h2 id="principle-title" className="home-section__title">
            Engines fueled by belief + movement
          </h2>
          <p className="home-section__body">
            Belief gives the work direction. Movement gives it proof. Mimicorp exists to keep both
            in the same machine.
          </p>
        </section>

        <section id="entry-point" className="entry-panel" aria-labelledby="entry-point-title">
          <div className="entry-panel__copy">
            <p className="home-kicker">Entry Point</p>
            <h2 id="entry-point-title" className="home-section__title">
              Start with a 15-minute systems call.
            </h2>
            <p className="entry-panel__body">
              Bring the project, constraint, or messy starting point. The call is paid, and the
              fee is waived if the project proceeds.
            </p>
          </div>

          <a href="/nodes/book-time/" className="home-button home-button--primary">
            Book the systems call
          </a>
        </section>
      </MotionWrapper>
    </LayoutContainer>
  );
}
