"use client";

import { useMemo, useState } from "react";

type ProjectPath = {
  name: string;
  href: string;
  eyebrow: string;
  description: string;
  cta: string;
};

type SortLens = {
  id: string;
  label: string;
  prompt: string;
  recommendation: string;
  supportingPath: string;
  summary: string;
  nextStep: string;
};

type PathwaySorterProps = {
  projectPaths: ProjectPath[];
};

const sortLenses: SortLens[] = [
  {
    id: "orientation",
    label: "I need the overview",
    prompt: "I want the fastest explanation before I decide where to go deeper.",
    recommendation: "Second Cutting",
    supportingPath: "JoyNet",
    summary:
      "Start with the documentary branch so the larger Mimicorp thesis lands in plain language first.",
    nextStep:
      "After that, JoyNet adds the public voice and values framing around the work."
  },
  {
    id: "proof",
    label: "I want proof",
    prompt: "Show me the field reality and the operational constraints first.",
    recommendation: "GLC Ranch",
    supportingPath: "Second Cutting",
    summary:
      "Begin with the land-based operating context where the bigger ideas are tested against weather, timing, and real work.",
    nextStep:
      "Then use Second Cutting to hear how those conditions get translated into a public-facing story."
  },
  {
    id: "context",
    label: "I want the worldview",
    prompt: "I care most about the values, language, and public-facing side of this.",
    recommendation: "JoyNet",
    supportingPath: "Second Cutting",
    summary:
      "Go to JoyNet first if you want the human and cultural register before the operational detail.",
    nextStep:
      "Afterward, Second Cutting gives you a grounded narrative bridge back into the wider system."
  },
  {
    id: "place",
    label: "I want direct experience",
    prompt: "I understand places best by moving through them, not just reading about them.",
    recommendation: "Teche Lake Outfitters",
    supportingPath: "GLC Ranch",
    summary:
      "Start with the place-based doorway if you want to encounter the landscape more directly.",
    nextStep:
      "Then look at GLC Ranch to connect that encounter back to the field conditions shaping the work."
  }
];

export function PathwaySorter({ projectPaths }: PathwaySorterProps) {
  const [selectedLensId, setSelectedLensId] = useState(sortLenses[0].id);

  const selectedLens = useMemo(
    () => sortLenses.find((lens) => lens.id === selectedLensId) ?? sortLenses[0],
    [selectedLensId]
  );

  const recommendedPath = projectPaths.find((path) => path.name === selectedLens.recommendation);
  const supportingPath = projectPaths.find((path) => path.name === selectedLens.supportingPath);

  if (!recommendedPath || !supportingPath) {
    return null;
  }

  return (
    <section className="signal-panel rounded-[32px] p-6 md:p-8">
      <div className="grid gap-6 border-b border-white/10 pb-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:items-end">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.34em] text-text/48">First Visit</p>
          <h2 className="max-w-2xl font-primary text-[40px] leading-[0.96] tracking-[-0.06em] text-text md:text-[58px]">
            Sort yourself before you browse.
          </h2>
        </div>

        <p className="max-w-2xl text-[16px] leading-[1.7] text-text/68 xl:ml-auto xl:text-right">
          If the full Mimicorp system feels like a lot on first contact, that&apos;s normal. Pick
          the sentence that sounds most like you and the page will point you to the cleanest way
          in.
        </p>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)]">
        <div className="grid gap-3">
          {sortLenses.map((lens, index) => {
            const isActive = lens.id === selectedLens.id;

            return (
              <button
                key={lens.id}
                type="button"
                onClick={() => setSelectedLensId(lens.id)}
                className={`path-sort-option text-left ${isActive ? "path-sort-option-active" : ""}`}
                aria-pressed={isActive}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-text/42">
                      0{index + 1} / {lens.label}
                    </p>
                    <p className="max-w-xl text-[16px] leading-[1.65] text-text/74">
                      {lens.prompt}
                    </p>
                  </div>
                  <span className="path-sort-pill">{isActive ? "Selected" : "Choose"}</span>
                </div>
              </button>
            );
          })}
        </div>

        <article className="path-sort-result">
          <div className="flex flex-wrap items-center gap-2">
            <span className="path-sort-pill path-sort-pill-solid">Recommended first move</span>
            <span className="path-sort-pill">No full system download required</span>
          </div>

          <div className="mt-5 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-text/46">
              Best match for this visit
            </p>
            <h3 className="font-primary text-[40px] leading-[0.95] tracking-[-0.06em] text-text">
              {recommendedPath.name}
            </h3>
            <p className="max-w-2xl text-[16px] leading-[1.75] text-text/72">
              {selectedLens.summary}
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="signal-card">
              <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">Start here</p>
              <p className="mt-3 text-[16px] leading-[1.65] text-text/82">
                {recommendedPath.description}
              </p>
            </div>
            <div className="signal-card">
              <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">Then branch</p>
              <p className="mt-3 text-[16px] leading-[1.65] text-text/82">{selectedLens.nextStep}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={recommendedPath.href} className="signal-button signal-button-primary">
              {recommendedPath.cta}
            </a>
            <a href={supportingPath.href} className="signal-button signal-button-secondary">
              Then explore {supportingPath.name}
            </a>
          </div>

          <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 md:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">Why this works</p>
              <p className="mt-3 text-[14px] leading-[1.6] text-text/70">
                It narrows the system to one intelligible doorway.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">What to skip</p>
              <p className="mt-3 text-[14px] leading-[1.6] text-text/70">
                You do not need the map or every concept before taking a first step.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">Use the map later</p>
              <p className="mt-3 text-[14px] leading-[1.6] text-text/70">
                The system map makes more sense after one branch already feels familiar.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
