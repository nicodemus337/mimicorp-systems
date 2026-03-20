import dynamic from "next/dynamic";
import Image from "next/image";
import logoMark from "@/assets/logo.png";

import { LayoutContainer } from "@/components/LayoutContainer";
import { MotionWrapper } from "@/components/MotionWrapper";
import { NodeCluster } from "@/components/NodeCluster";

const SystemNotes = dynamic(() => import("@/components/SystemNotes"));

const projectPaths = [
  {
    name: "Second Cutting",
    href: "#second-cutting",
    eyebrow: "Listen now",
    description:
      "Documentary podcast episodes, field reporting, and the clearest entry point into the wider Mimicorp system.",
    cta: "Go to listening section"
  },
  {
    name: "JoyNet",
    href: "https://joynet.church",
    eyebrow: "Public signal",
    description:
      "Values, voice, and cultural legitimacy made legible in public. A direct path into the JoyNet branch.",
    cta: "Visit joynet.church"
  },
  {
    name: "GLC Ranch",
    href: "https://glcranch.com",
    eyebrow: "Operating ground",
    description:
      "Working ranch conditions, constraints, and proof. The land-based reality behind the thesis.",
    cta: "Visit glcranch.com"
  },
  {
    name: "Teche Lake Outfitters",
    href: "https://www.techelakeoutfitters.com",
    eyebrow: "Access system",
    description:
      "A route into place through direct encounter, guided movement, and lived landscape experience.",
    cta: "Visit techelakeoutfitters.com"
  }
];

const listeningLinks = [
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/second-cutting/id1865905475?i=1000752307523"
  },
  {
    label: "Spotify",
    href: "https://creators.spotify.com/pod/profile/second-cutting/episodes/Time-Changes-the-Math-e3fp4no"
  }
];

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

          <div className="relative space-y-8">
            <div className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-black/30 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-sm bg-white/95 p-1">
                  <Image
                    src={logoMark}
                    alt="Mimicorp mark"
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <p className="hidden max-w-md text-right text-[11px] uppercase tracking-[0.28em] text-text/42 md:block">
                Thesis surface / live system
              </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.18fr)] xl:items-start">
              <div className="space-y-4 xl:pt-4">
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

                <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-text/42">
                    Go Directly To
                  </p>
                  <div className="mt-4 space-y-3">
                    {projectPaths.map((path) => (
                      <a
                        key={path.name}
                        href={path.href}
                        target={path.href.startsWith("http") ? "_blank" : undefined}
                        rel={path.href.startsWith("http") ? "noreferrer" : undefined}
                        className="block rounded-[18px] border border-white/8 bg-white/[0.02] px-4 py-3 transition-colors duration-200 hover:border-[#dce7c8]/30 hover:bg-[#dce7c8]/6"
                      >
                        <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                          {path.eyebrow}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-4">
                          <p className="font-primary text-[24px] leading-none tracking-[-0.04em] text-text">
                            {path.name}
                          </p>
                          <span className="text-[10px] uppercase tracking-[0.24em] text-text/44">
                            Open
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8 xl:text-right">
                <div className="space-y-4 xl:ml-auto xl:max-w-4xl">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-text/46">
                    Mimicorp systems
                  </p>
                  <h1 className="font-primary text-[56px] leading-[0.96] tracking-[-0.07em] text-text sm:text-[72px] md:text-[96px] xl:text-[120px]">
                    The hub for ecological infrastructure, field research, and working landscape projects
                  </h1>
                  <p className="text-[17px] leading-[1.6] text-text/72 sm:text-[18px] xl:ml-auto xl:max-w-2xl">
                    Mimicorp is where the larger system becomes navigable: listen to Second
                    Cutting, move into JoyNet, Teche Lake Outfitters, and GLC Ranch, and follow
                    the field research that will eventually sit behind subscriber access.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <a
                    href="#pathways"
                    className="rounded-full border border-[#dce7c8]/24 bg-[#dce7c8]/10 px-5 py-3 text-center text-[11px] uppercase tracking-[0.28em] text-[#e5eed6] transition-colors duration-200 hover:bg-[#dce7c8]/16"
                  >
                    Explore Pathways
                  </a>
                  <a
                    href="#field-notes"
                    className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-[11px] uppercase tracking-[0.28em] text-text/72 transition-colors duration-200 hover:border-white/18 hover:bg-white/[0.06]"
                  >
                    Log In For Field Note Access
                  </a>
                </div>

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

                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-3">
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
          </div>
        </section>

        <section
          id="pathways"
          className="grid gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.24)] backdrop-blur-sm md:p-8"
        >
          <div className="flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">
                Destination Paths
              </p>
              <h2 className="max-w-2xl font-primary text-[36px] leading-[1.02] tracking-[-0.05em] text-text md:text-[52px]">
                Clear routes into the live projects around Mimicorp
              </h2>
            </div>
            <p className="max-w-xl text-[16px] leading-[1.6] text-text/66 md:text-right">
              The homepage should behave like a switchboard. These are the most important
              places to go next depending on whether someone wants media, place, public signal,
              or operating proof.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {projectPaths.map((path) => (
              <article
                key={path.name}
                className="flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">
                    {path.eyebrow}
                  </p>
                  <h3 className="font-primary text-[30px] leading-[1.02] tracking-[-0.04em] text-text">
                    {path.name}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-text/68">{path.description}</p>
                </div>
                <a
                  href={path.href}
                  target={path.href.startsWith("http") ? "_blank" : undefined}
                  rel={path.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-5 inline-flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-text/72 transition-colors duration-200 hover:border-[#dce7c8]/24 hover:bg-[#dce7c8]/8"
                >
                  <span>{path.cta}</span>
                  <span>Open</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="second-cutting"
          className="grid gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.24)] backdrop-blur-sm md:p-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
        >
          <div className="space-y-5">
            <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">
              Featured Listening
            </p>
            <h2 className="max-w-lg font-primary text-[40px] leading-[1.02] tracking-[-0.05em] text-text md:text-[58px]">
              Second Cutting should be one click away
            </h2>
            <p className="max-w-xl text-[16px] leading-[1.65] text-text/68">
              This branch is one of the clearest ways into the Mimicorp world, so the
              listening path needs to be obvious. The featured episode is surfaced here first,
              with direct links out to the actual platforms.
            </p>
            <div className="flex flex-wrap gap-3">
              {listeningLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#dce7c8]/24 bg-[#dce7c8]/10 px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-[#e5eed6] transition-colors duration-200 hover:bg-[#dce7c8]/16"
                >
                  Listen on {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
            <article className="rounded-[28px] border border-white/10 bg-black/20 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">Latest featured episode</p>
              <h3 className="mt-3 font-primary text-[34px] leading-[1.02] tracking-[-0.04em] text-text">
                Time Changes the Math
              </h3>
              <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-text/46">
                Episode 05 / Dr Shannon Gonsoulin
              </p>
              <p className="mt-4 text-[16px] leading-[1.65] text-text/68">
                A conversation about how time changes the economics, biology, and
                expectations of agricultural systems.
              </p>
            </article>

            <div className="grid gap-4">
              <article className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">Why it matters</p>
                <p className="mt-3 text-[15px] leading-[1.6] text-text/70">
                  Second Cutting translates field conditions into story, signal, and
                  partner understanding without flattening the land into a pitch.
                </p>
              </article>
              <article className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">Next step</p>
                <p className="mt-3 text-[15px] leading-[1.6] text-text/70">
                  We can turn this into a dedicated archive page in the Next app so people can
                  browse episodes without leaving the site first.
                </p>
              </article>
            </div>
          </div>
        </section>

        <NodeCluster />

        <SystemNotes />
      </MotionWrapper>
    </LayoutContainer>
  );
}
