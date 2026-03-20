import dynamic from "next/dynamic";

import { LayoutContainer } from "@/components/LayoutContainer";
import { MotionWrapper } from "@/components/MotionWrapper";
import { NodeCluster } from "@/components/NodeCluster";

const SystemNotes = dynamic(() => import("@/components/SystemNotes"));

export default function HomePage() {
  return (
    <LayoutContainer>
      <MotionWrapper className="space-y-12 pb-16 pt-6 md:space-y-16 md:pb-24 md:pt-10">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_32px_120px_rgba(0,0,0,0.24)] backdrop-blur-sm md:p-8">
          <div className="hero-grid" />
          <div className="hero-aura hero-aura-primary" />
          <div className="hero-aura hero-aura-secondary" />
          <div className="hero-scanline" />
          <div className="absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="hero-orb" />

          <div className="relative space-y-8">
            <div className="hero-kicker border-b border-white/8 pb-4">
              <p className="hero-kicker-label text-[11px] uppercase tracking-[0.34em] text-text/46">
                Thesis surface / live system
              </p>
              <p className="hero-kicker-copy text-[12px] uppercase tracking-[0.22em] text-text/38 md:text-right">
                Capital, partners, and operating systems aligned around ecological infrastructure
              </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] xl:items-end">
              <div className="space-y-5">
                <div className="grid gap-2 text-[11px] uppercase tracking-[0.24em] text-text/42 sm:grid-cols-3">
                  <div className="rounded-[18px] border border-white/10 bg-black/20 px-3 py-2">
                    Thesis mode / active
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-black/20 px-3 py-2">
                    Capital stack / assembling
                  </div>
                  <div className="rounded-[18px] border border-[#dce7c8]/20 bg-[#dce7c8]/8 px-3 py-2 text-[#e5eed6]">
                    Build pipeline / live
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#dce7c8]/20 bg-[#dce7c8]/8 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#e5eed6]">
                    Ecological infrastructure
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-text/54">
                    Capital formation
                  </span>
                </div>

                <h1 className="max-w-4xl font-primary text-[56px] leading-[0.96] tracking-[-0.07em] text-text sm:text-[72px] md:text-[96px] xl:text-[120px]">
                  mimicorp.systems
                </h1>

                <p className="max-w-xl text-[17px] leading-[1.6] text-text/72 sm:text-[18px]">
                  Mimicorp is a systems lab built to attract capital and partners for
                  the design, financing, and construction of ecological infrastructure.
                  This site functions as the thesis: it shows how observation, media,
                  strategy, and operating systems compound into real projects on real
                  land.
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  <article className="hero-metric rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                      Core claim
                    </p>
                    <p className="mt-2 font-primary text-[30px] leading-none tracking-[-0.05em] text-text">
                      BUILD
                    </p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-text/52">
                      ecological infrastructure, not just content
                    </p>
                  </article>

                  <article className="hero-metric rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                      Capital logic
                    </p>
                    <p className="mt-2 font-primary text-[30px] leading-none tracking-[-0.05em] text-[#e2eccf]">
                      ALIGN
                    </p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-text/52">
                      funders, operators, and land-based evidence
                    </p>
                  </article>

                  <article className="hero-metric rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                      Partner role
                    </p>
                    <p className="mt-2 font-primary text-[30px] leading-none tracking-[-0.05em] text-text">
                      JOIN
                    </p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-text/52">
                      bring capital, capability, or site access
                    </p>
                  </article>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <article className="hero-stat-card rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                    Primary use
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.45] text-text/76">
                    attract and organize ecological investment
                  </p>
                </article>

                <article className="hero-stat-card rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                    Read method
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.45] text-text/76">
                    thesis through nodes, evidence, and outputs
                  </p>
                </article>

                <article className="hero-stat-card rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                    Output condition
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.45] text-text/76">
                    partnerships shaped into buildable systems
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <NodeCluster />

        <SystemNotes />
      </MotionWrapper>
    </LayoutContainer>
  );
}
