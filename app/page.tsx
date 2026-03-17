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
          <div className="absolute right-[-6%] top-[-14%] h-40 w-40 rounded-full border border-white/8 bg-white/[0.02] blur-2xl" />

          <div className="relative space-y-8">
            <div className="flex flex-col gap-3 border-b border-white/8 pb-4 md:flex-row md:items-center md:justify-between">
              <p className="text-[11px] uppercase tracking-[0.34em] text-text/46">
                Survey header / live system
              </p>
              <p className="max-w-md text-[12px] uppercase tracking-[0.22em] text-text/38 md:text-right">
                A logging surface for branches, stems, outputs, and field conditions
              </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] xl:items-end">
              <div className="space-y-5">
                <div className="grid gap-2 text-[11px] uppercase tracking-[0.24em] text-text/42 sm:grid-cols-3">
                  <div className="rounded-[18px] border border-white/10 bg-black/20 px-3 py-2">
                    Survey mode / active
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-black/20 px-3 py-2">
                    Log state / collecting
                  </div>
                  <div className="rounded-[18px] border border-[#dce7c8]/20 bg-[#dce7c8]/8 px-3 py-2 text-[#e5eed6]">
                    Drift check / live
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#dce7c8]/20 bg-[#dce7c8]/8 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#e5eed6]">
                    Ecological systems
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-text/54">
                    Field logic
                  </span>
                </div>

                <h1 className="max-w-4xl font-primary text-[56px] leading-[0.96] tracking-[-0.07em] text-text sm:text-[72px] md:text-[96px] xl:text-[120px]">
                  mimicorp.systems
                </h1>

                <p className="max-w-xl text-[17px] leading-[1.6] text-text/72 sm:text-[18px]">
                  A living structure of branches, stems, and fruit. Nothing here is a
                  page. It is a working surface for what the land reports back, and for
                  keeping downstream decisions aligned with observation.
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  <article className="hero-metric rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                      Read depth
                    </p>
                    <p className="mt-2 font-primary text-[30px] leading-none tracking-[-0.05em] text-text">
                      03
                    </p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-text/52">
                      branch layers in active read
                    </p>
                  </article>

                  <article className="hero-metric rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                      Capture state
                    </p>
                    <p className="mt-2 font-primary text-[30px] leading-none tracking-[-0.05em] text-[#e2eccf]">
                      81%
                    </p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-text/52">
                      field signal retained
                    </p>
                  </article>

                  <article className="hero-metric rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                      Drift check
                    </p>
                    <p className="mt-2 font-primary text-[30px] leading-none tracking-[-0.05em] text-text">
                      LOW
                    </p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-text/52">
                      observation inside tolerance
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
                    ecological logging
                  </p>
                </article>

                <article className="hero-stat-card rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                    Read method
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.45] text-text/76">
                    node composition
                  </p>
                </article>

                <article className="hero-stat-card rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                    Output condition
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.45] text-text/76">
                    continuously revised
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
