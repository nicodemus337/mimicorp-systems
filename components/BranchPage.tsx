import Link from "next/link";

import type { BranchPageContent } from "@/lib/branch-content";

import { LayoutContainer } from "@/components/LayoutContainer";
import { MotionWrapper } from "@/components/MotionWrapper";

type BranchPageProps = {
  branch: BranchPageContent;
};

export function BranchPage({ branch }: BranchPageProps) {
  return (
    <LayoutContainer>
      <MotionWrapper className="space-y-8 pb-16 pt-4 md:space-y-10 md:pb-24 md:pt-6">
        <section className="signal-panel relative overflow-hidden rounded-[34px] p-5 md:p-8">
          <div className="signal-noise" />
          <div className="signal-scanlines" />
          <div className="signal-beam" />

          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-text/60">
                <span className="signal-chip">{branch.eyebrow}</span>
                <span className="signal-chip">{branch.pathLabel}</span>
              </div>

              <div className="space-y-5">
                <p className="text-[11px] uppercase tracking-[0.4em] text-text/48">
                  Mimicorp Systems / {branch.title}
                </p>
                <h1 className="glitch-title max-w-4xl font-primary text-[52px] leading-[0.92] tracking-[-0.08em] text-text sm:text-[72px] md:text-[94px] xl:text-[112px]">
                  {branch.title}
                </h1>
                <p className="max-w-2xl text-[17px] leading-[1.75] text-text/72 md:text-[19px]">
                  {branch.intro}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {branch.actions.map((action) =>
                  action.external ? (
                    <a
                      key={action.label}
                      href={action.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`signal-button ${
                        action.variant === "secondary"
                          ? "signal-button-secondary"
                          : "signal-button-primary"
                      }`}
                    >
                      {action.label}
                    </a>
                  ) : (
                    <Link
                      key={action.label}
                      href={action.href}
                      className={`signal-button ${
                        action.variant === "secondary"
                          ? "signal-button-secondary"
                          : "signal-button-primary"
                      }`}
                    >
                      {action.label}
                    </Link>
                  )
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {branch.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-text/70"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <article className="signal-card min-h-[220px]">
                <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">
                  {branch.featuredLabel}
                </p>
                <h2 className="mt-4 font-primary text-[38px] leading-[0.96] tracking-[-0.05em] text-text">
                  {branch.featuredTitle}
                </h2>
                <p className="mt-4 text-[16px] leading-[1.7] text-text/70">
                  {branch.featuredBody}
                </p>
              </article>

              <article className="signal-card min-h-[220px]">
                <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">How to use this page</p>
                <div className="mt-4 space-y-3 text-[15px] leading-[1.7] text-text/70">
                  <p>Start with the overview cards to understand the branch quickly.</p>
                  <p>Use the highlights to see what this branch is best for.</p>
                  <p>Follow the action buttons when you&apos;re ready to move into the live destination.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="signal-marquee rounded-[28px] px-4 py-3 text-[10px] uppercase tracking-[0.34em] text-text/58 md:px-6">
          Mimicorp Systems / {branch.title} / clearer context / stronger destination / next action
        </section>

        <section className="signal-panel rounded-[32px] p-6 md:p-8">
          <div className="grid gap-6 border-b border-white/10 pb-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.34em] text-text/48">Overview</p>
              <h2 className="max-w-3xl font-primary text-[38px] leading-[0.98] tracking-[-0.06em] text-text md:text-[54px]">
                What this branch is doing inside the larger system.
              </h2>
            </div>
            <p className="max-w-2xl text-[16px] leading-[1.7] text-text/68 lg:ml-auto lg:text-right">
              These sections are meant to answer the basics quickly: what this is, why it matters,
              and how it connects back to Mimicorp as a whole.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {branch.purpose.map((section) => (
              <article key={section.title} className="signal-card h-full">
                <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">
                  {section.title}
                </p>
                <p className="mt-4 text-[16px] leading-[1.7] text-text/72">{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="signal-panel rounded-[32px] p-6 md:p-8">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.34em] text-text/48">Highlights</p>
              <h2 className="font-primary text-[38px] leading-[0.98] tracking-[-0.06em] text-text md:text-[50px]">
                A quick read on what this branch is best at.
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {branch.highlights.map((highlight) => (
                <article key={highlight.label} className="signal-card">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">
                    {highlight.label}
                  </p>
                  <p className="mt-3 font-primary text-[32px] leading-[1] tracking-[-0.05em] text-text">
                    {highlight.value}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.6] text-text/68">
                    {highlight.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="signal-panel rounded-[32px] p-6 md:p-8">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.34em] text-text/48">Next steps</p>
              <h2 className="font-primary text-[36px] leading-[1] tracking-[-0.05em] text-text">
                Where to go from here.
              </h2>
            </div>

            <div className="mt-6 space-y-3">
              {branch.nextSteps.map((step, index) => (
                <article key={step} className="signal-card signal-card-compact">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">
                    Step 0{index + 1}
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.65] text-text/72">{step}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </MotionWrapper>
    </LayoutContainer>
  );
}
