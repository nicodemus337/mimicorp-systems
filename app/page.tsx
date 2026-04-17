import { LayoutContainer } from "@/components/LayoutContainer";
import { MotionWrapper } from "@/components/MotionWrapper";

const engineSteps = [
  {
    step: "01",
    title: "Observe",
    summary:
      "Field notes, land data, constraints, and real-world inputs establish what is actually happening."
  },
  {
    step: "02",
    title: "Structure",
    summary:
      "We turn observations into workflows, operating systems, infrastructure, and decision-making logic."
  },
  {
    step: "03",
    title: "Distribute",
    summary:
      "Media, commerce, and narrative distribute the system so people can understand it, use it, and buy into it."
  },
  {
    step: "04",
    title: "Compound",
    summary:
      "Feedback loops, measured outcomes, and revenue let the system improve instead of resetting every cycle."
  }
] as const;

const pathways = [
  {
    name: "Land",
    hook: "For ranches, agricultural operations, and place-based projects.",
    detail:
      "Ranching, agriculture, ecology, stewardship, logistics, and on-the-ground operational design.",
    href: "https://glcranch.com",
    external: true
  },
  {
    name: "Business",
    hook: "For companies that need a cleaner operating system.",
    detail:
      "Local businesses, utility infrastructure, offers, workflows, handoffs, and operational cleanup.",
    href: "/nodes/services/",
    external: false
  },
  {
    name: "Media",
    hook: "For stories that need structure, trust, and release.",
    detail:
      "Podcasts, documentary systems, narrative architecture, and distribution built to move attention into action.",
    href: "/nodes/second-cutting/",
    external: false
  },
  {
    name: "Experimental",
    hook: "For strange ideas worth testing before they scale.",
    detail:
      "Archives, research, conceptual prototypes, and experimental infrastructure for ideas still becoming operational.",
    href: "/research/staging-the-state.html",
    external: false
  }
] as const;

const deployments = [
  {
    name: "Gonsoulin Land & Cattle",
    label: "System deployed / Land",
    summary:
      "Operating ground for testing stewardship, sequencing, labor, and real-world agricultural constraints.",
    href: "https://glcranch.com",
    external: true
  },
  {
    name: "GP Supply & Lumber",
    label: "System deployed / Business",
    summary:
      "Utility-facing business logic focused on infrastructure, materials flow, and practical regional demand.",
    href: "/nodes/services/",
    external: false
  },
  {
    name: "Second Cutting",
    label: "System deployed / Media",
    summary:
      "A documentary distribution system that turns field intelligence into public narrative and partner signal.",
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
              We build systems that turn land, data, and media into revenue.
            </h1>
            <p className="home-hero__mechanism">
              Mimicorp builds integrated operational systems for rural enterprise, infrastructure,
              and media.
            </p>
            <a href="#conversion" className="home-button home-button--primary">
              Book a 15 minute systems call
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
              <p className="definition-card__label">What we deploy</p>
              <ul className="definition-card__list">
                <li>Observation systems</li>
                <li>Operational infrastructure</li>
                <li>Distribution and feedback loops</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="how-it-works-title">
          <div className="home-section__intro">
            <p className="home-kicker">How It Works</p>
            <h2 id="how-it-works-title" className="home-section__title">
              The engine is direct.
            </h2>
            <p className="home-section__body">
              Observe. Structure. Distribute. Compound. Each phase exists to move the system into
              operation.
            </p>
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
            <p className="home-kicker">Pathways</p>
            <h2 id="pathways-title" className="home-section__title">
              Four application pathways.
            </h2>
            <p className="home-section__body">
              Choose the operating context, then go deeper.
            </p>
          </div>

          <div className="pathway-grid">
            {pathways.map((pathway) => (
              <article key={pathway.name} className="pathway-card">
                <p className="pathway-card__label">{pathway.name}</p>
                <p className="pathway-card__hook">{pathway.hook}</p>
                <p className="pathway-card__detail">{pathway.detail}</p>
                <a
                  href={pathway.href}
                  className="home-button home-button--secondary"
                  target={pathway.external ? "_blank" : undefined}
                  rel={pathway.external ? "noreferrer" : undefined}
                >
                  Open pathway
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="deployments-title">
          <div className="home-section__intro">
            <p className="home-kicker">Live Systems</p>
            <h2 id="deployments-title" className="home-section__title">
              Systems deployed in the field.
            </h2>
            <p className="home-section__body">
              These are active deployments, not portfolio pieces.
            </p>
          </div>

          <div className="deployment-grid">
            {deployments.map((deployment) => (
              <article key={deployment.name} className="deployment-card">
                <p className="deployment-card__label">{deployment.label}</p>
                <h3 className="deployment-card__title">{deployment.name}</h3>
                <p className="deployment-card__summary">{deployment.summary}</p>
                <a
                  href={deployment.href}
                  className="home-button home-button--secondary"
                  target={deployment.external ? "_blank" : undefined}
                  rel={deployment.external ? "noreferrer" : undefined}
                >
                  View system
                </a>
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
            <p className="philosophy-grid__item">Belief gives direction.</p>
            <p className="philosophy-grid__item">Movement produces proof.</p>
            <p className="philosophy-grid__item">Systems turn both into durable revenue.</p>
          </div>
        </section>

        <section id="conversion" className="conversion-panel" aria-labelledby="conversion-title">
          <div className="conversion-panel__copy">
            <p className="home-kicker">Start Here</p>
            <h2 id="conversion-title" className="home-section__title">
              Ready to deploy a system?
            </h2>
            <p className="conversion-panel__body">
              Bring the bottleneck, the deployment target, or the opportunity. We’ll identify the
              right pathway and define the next move.
            </p>
          </div>

          <div className="conversion-panel__action">
            <p className="conversion-panel__note">
              15 minutes. Paid. Waived if we move into a larger engagement.
            </p>
            <div className="conversion-panel__buttons">
              <a href="/nodes/book-time/" className="home-button home-button--primary">
                Book a systems call
              </a>
              <a href="/nodes/contact/" className="home-button home-button--secondary">
                Start a project
              </a>
            </div>
          </div>
        </section>
      </MotionWrapper>
    </LayoutContainer>
  );
}
