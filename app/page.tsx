import { LayoutContainer } from "@/components/LayoutContainer";
import { MotionWrapper } from "@/components/MotionWrapper";

const engineSteps = [
  {
    step: "01",
    title: "Observe",
    summary:
      "Capture real-world inputs most systems ignore. Field notes, operational friction, and environmental signals."
  },
  {
    step: "02",
    title: "Structure",
    summary:
      "Turn raw inputs into usable systems. Workflows, infrastructure, and decision logic."
  },
  {
    step: "03",
    title: "Distribute",
    summary:
      "Deploy the system outward. Media, commerce, and communication aligned to the operation."
  },
  {
    step: "04",
    title: "Compound",
    summary:
      "Build feedback loops. The system improves itself through use, increasing efficiency and output over time."
  }
] as const;

const pathways = [
  {
    name: "Land",
    hook: "For ranches, farms, and land-based operations.",
    detail:
      "Build direct-to-consumer infrastructure, operational visibility, and data-informed decision systems.",
    href: "https://glcranch.com",
    external: true,
    outcome: "A working system that connects land to revenue and narrative."
  },
  {
    name: "Business",
    hook: "For local businesses and physical operations.",
    detail:
      "Build internal workflows, customer pathways, and digital plus physical integration.",
    href: "/nodes/services/",
    external: false,
    outcome: "A business that runs with clarity, not chaos."
  },
  {
    name: "Media",
    hook: "For podcasts, brands, and distribution platforms.",
    detail:
      "Build content pipelines, narrative systems, and multi-platform distribution.",
    href: "/nodes/second-cutting/",
    external: false,
    outcome: "Media that functions as infrastructure, not noise."
  },
  {
    name: "Experimental",
    hook: "For archive, theory, and system exploration.",
    detail:
      "Build conceptual frameworks, data archives, and long-term system models.",
    href: "/research/staging-the-state.html",
    external: false,
    outcome: "New systems that do not exist yet, but will."
  }
] as const;

const deployments = [
  {
    name: "Gonsoulin Land & Cattle",
    label: "System deployed / Land",
    summary:
      "Direct-to-consumer beef system integrating production, media, and sales.",
    href: "https://glcranch.com",
    external: true
  },
  {
    name: "GP Supply & Lumber",
    label: "System deployed / Business",
    summary:
      "Legacy retail operation restructured with modern systems and customer flow.",
    href: "/nodes/services/",
    external: false
  },
  {
    name: "Second Cutting",
    label: "System deployed / Media",
    summary:
      "Media system documenting land, people, and process tied directly to real-world operations.",
    href: "/nodes/second-cutting/",
    external: false
  }
] as const;

export default function HomePage() {
  return (
    <LayoutContainer>
      <MotionWrapper className="homepage-flow pb-20 pt-6 md:pb-28 md:pt-8">
        <section className="home-hero" aria-labelledby="home-hero-title">
          <div className="home-hero__copy">
            <p className="home-kicker">Mimicorp Systems</p>
            <h1 id="home-hero-title" className="home-hero__title">
              We build systems that turn land, data, and media into operations.
            </h1>
            <p className="home-hero__mechanism">
              Infrastructure for modern rural enterprise.
            </p>
            <p className="home-hero__support">
              From field notes to functioning systems, deployed in the real world.
            </p>
            <a href="#conversion" className="home-button home-button--primary">
              Start a system
            </a>
          </div>

          <div className="engine-panel" aria-label="Mimicorp engine">
            <div className="engine-panel__header">
              <span>Engine</span>
              <span>Observe to compound</span>
            </div>

            <div className="engine-panel__track">
              {engineSteps.map((step) => (
                <article key={step.title} className="engine-step">
                  <p className="engine-step__index">{step.step}</p>
                  <div className="engine-step__body">
                    <h2 className="engine-step__title">{step.title}</h2>
                    <p className="engine-step__summary">{step.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="what-this-is-title">
          <div className="home-section__intro">
            <p className="home-kicker">What This Is</p>
            <h2 id="what-this-is-title" className="home-section__title">
              Mimicorp is a systems company.
            </h2>
          </div>

          <div className="definition-grid">
            <div className="definition-card definition-card--primary">
              <p className="definition-card__statement">
                We build integrated operational systems across land, data, and media.
              </p>
              <div className="definition-card__flow" aria-hidden="true">
                <span>land</span>
                <span>people</span>
                <span>work</span>
                <span>information</span>
              </div>
            </div>

            <div className="definition-card">
              <p className="definition-card__label">Not this</p>
              <ul className="definition-card__list">
                <li>Not an agency</li>
                <li>Not a content studio</li>
                <li>Not traditional consulting</li>
              </ul>
            </div>

            <div className="definition-card">
              <p className="definition-card__label">What we do</p>
              <p className="definition-card__body">
                We take what already exists: land, people, work, and information, then structure
                it into systems that produce revenue, communicate clearly, and improve over time.
              </p>
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="how-it-works-title">
          <div className="home-section__intro">
            <p className="home-kicker">How It Works</p>
            <h2 id="how-it-works-title" className="home-section__title">
              Every system follows the same engine.
            </h2>
            <p className="home-section__body">
              This is not theory. This is how systems are built, deployed, and scaled.
            </p>
          </div>

          <div className="engine-strip" aria-hidden="true">
            {engineSteps.map((step) => (
              <div key={step.title} className="engine-strip__node">
                <span className="engine-strip__index">{step.step}</span>
                <span className="engine-strip__title">{step.title}</span>
              </div>
            ))}
          </div>

          <div className="backbone-grid">
            {engineSteps.map((step) => (
              <article key={step.title} className="backbone-card">
                <p className="backbone-card__index">{step.step}</p>
                <h3 className="backbone-card__title">{step.title}</h3>
                <p className="backbone-card__body">{step.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="pathways-title">
          <div className="home-section__intro">
            <p className="home-kicker">Application Pathways</p>
            <h2 id="pathways-title" className="home-section__title">
              Mimicorp systems are deployed across four domains.
            </h2>
          </div>

          <div className="pathway-grid">
            {pathways.map((pathway) => (
              <article key={pathway.name} className="pathway-card">
                <p className="pathway-card__label">{pathway.name} Systems</p>
                <p className="pathway-card__hook">{pathway.hook}</p>
                <p className="pathway-card__detail">{pathway.detail}</p>
                <p className="pathway-card__outcome">
                  <span>Outcome:</span> {pathway.outcome}
                </p>
                <p className="pathway-card__reference">
                  Reference:{" "}
                  <a
                    href={pathway.href}
                    target={pathway.external ? "_blank" : undefined}
                    rel={pathway.external ? "noreferrer" : undefined}
                  >
                    {pathway.name === "Experimental" ? "Research archive" : `${pathway.name} system`}
                  </a>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="deployments-title">
          <div className="home-section__intro">
            <p className="home-kicker">Deployed Systems</p>
            <h2 id="deployments-title" className="home-section__title">
              These are not concepts. They are live systems.
            </h2>
            <p className="home-section__body">
              Each system is built to function, not just exist.
            </p>
          </div>

          <div className="deployment-grid">
            {deployments.map((deployment) => (
              <article key={deployment.name} className="deployment-card">
                <p className="deployment-card__label">{deployment.label}</p>
                <h3 className="deployment-card__title">{deployment.name}</h3>
                <p className="deployment-card__summary">{deployment.summary}</p>
                <p className="deployment-card__status">Status: live</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section home-section--philosophy" aria-labelledby="philosophy-title">
          <div className="home-section__intro">
            <p className="home-kicker">Philosophy</p>
            <h2 id="philosophy-title" className="home-section__title">
              Engines fueled by belief + movement
            </h2>
          </div>

          <div className="philosophy-grid">
            <p className="philosophy-grid__item">Belief defines direction.</p>
            <p className="philosophy-grid__item">Movement creates output.</p>
            <p className="philosophy-grid__item">Systems require both.</p>
          </div>
        </section>

        <section id="conversion" className="conversion-panel" aria-labelledby="conversion-title">
          <div className="conversion-panel__copy">
            <p className="home-kicker">Start Here</p>
            <h2 id="conversion-title" className="home-section__title">
              You need a system.
            </h2>
            <div className="conversion-panel__list">
              <p>If you have land that is not fully working,</p>
              <p>a business that feels fragmented,</p>
              <p>or media that is not producing results,</p>
            </div>
            <p className="conversion-panel__body">
              then you do not need more ideas.
            </p>
            <p className="conversion-panel__body conversion-panel__body--strong">
              You need a system.
            </p>
          </div>

          <div className="conversion-panel__action">
            <a href="/nodes/contact/" className="home-button home-button--primary">
              Start a system
            </a>
          </div>
        </section>
      </MotionWrapper>
    </LayoutContainer>
  );
}
