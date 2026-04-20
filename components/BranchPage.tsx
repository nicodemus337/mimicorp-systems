import Link from "next/link";

import type { BranchPageContent } from "@/lib/branch-content";

type BranchPageProps = {
  branch: BranchPageContent;
};

export function BranchPage({ branch }: BranchPageProps) {
  return (
    <main className="page page--system">
      <section className="hero container domain-hero-panel">
        <div className="domain-hero-panel__intro">
          <p className="eyebrow">{branch.eyebrow}</p>
          <h1>{branch.title}</h1>
          <p>{branch.intro}</p>
        </div>

        <div className="domain-hero-panel__status">
          <div className="status-chip">Mission briefing</div>
          <p>{branch.position}</p>
        </div>

        <div className="domain-stats">
          {branch.cards.map((card) => (
            <div key={card.label} className="domain-stat-card">
              <span className="domain-stat-card__label">{card.label}</span>
              <strong>{card.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section container system-panel">
        <p className="section-kicker">Objective</p>
        <h2>What This Domain Does</h2>
        <p>{branch.mandate}</p>
      </section>

      <section className="section container system-panel">
        <p className="section-kicker">Loadout</p>
        <h2>Core Structure</h2>

        <div className="grid">
          {branch.modules.map((module, index) => (
            <div key={module.title} className="system-step system-step--card">
              <div className="system-step__index">{String(index + 1).padStart(2, "0")}</div>
              <div className="label">{module.title}</div>
              <p>{module.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container system-panel">
        <p className="section-kicker">Rewards</p>
        <h2>Revenue Logic</h2>

        <div className="stack">
          {branch.revenueLines.map((line, index) => (
            <div key={line} className="simple-row simple-row--mission">
              <span className="simple-row__index">{String(index + 1).padStart(2, "0")}</span>
              <p>{line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container system-panel">
        <p className="section-kicker">Deployments</p>
        <h2>Deployments</h2>

        <div className="grid">
          {branch.deployments.map((deployment) => (
            <div key={deployment.name} className="deployment deployment--card">
              <h3>{deployment.name}</h3>
              <p>{deployment.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container system-panel">
        <p className="section-kicker">Win Condition</p>
        <h2>Proof</h2>
        <p>{branch.proof}</p>
      </section>

      <section className="container footer system-panel system-panel--cta">
        <p className="section-kicker">Next Move</p>
        <h2>Deploy this system in a real operation.</h2>
        <div className="footer-actions">
          {branch.actions.map((action) =>
            action.external ? (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className="cta"
              >
                {action.label}
              </a>
            ) : (
              <Link key={action.label} href={action.href} className="cta">
                {action.label}
              </Link>
            )
          )}
        </div>
      </section>
    </main>
  );
}
