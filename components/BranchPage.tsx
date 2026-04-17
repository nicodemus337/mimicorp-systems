import Link from "next/link";

import type { BranchPageContent } from "@/lib/branch-content";

type BranchPageProps = {
  branch: BranchPageContent;
};

export function BranchPage({ branch }: BranchPageProps) {
  return (
    <main className="page">
      <section className="hero container">
        <p className="eyebrow">{branch.eyebrow}</p>
        <h1>{branch.title}</h1>
        <p>{branch.intro}</p>
      </section>

      <section className="section container">
        <h2>What This Domain Does</h2>
        <p>{branch.mandate}</p>
      </section>

      <section className="section container">
        <h2>Core Structure</h2>

        <div className="grid">
          {branch.modules.map((module) => (
            <div key={module.title} className="system-step">
              <div className="label">{module.title}</div>
              <p>{module.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2>Revenue Logic</h2>

        <div className="stack">
          {branch.revenueLines.map((line) => (
            <div key={line} className="simple-row">
              <p>{line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2>Deployments</h2>

        <div className="grid">
          {branch.deployments.map((deployment) => (
            <div key={deployment.name} className="deployment">
              <h3>{deployment.name}</h3>
              <p>{deployment.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2>Proof</h2>
        <p>{branch.proof}</p>
      </section>

      <section className="container footer">
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
