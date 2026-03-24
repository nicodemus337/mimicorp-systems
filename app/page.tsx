import dynamic from "next/dynamic";

import { LayoutContainer } from "@/components/LayoutContainer";
import { MotionWrapper } from "@/components/MotionWrapper";
import { NodeCluster } from "@/components/NodeCluster";

const SystemNotes = dynamic(() => import("@/components/SystemNotes"));

const projectPaths = [
  {
    name: "Second Cutting",
    href: "#second-cutting",
    eyebrow: "Start here",
    description:
      "The quickest way to understand the work through documentary episodes, reporting, and public-facing stories.",
    cta: "Open the listening guide"
  },
  {
    name: "JoyNet",
    href: "https://joynet.church",
    eyebrow: "Public voice",
    description:
      "The clearest path into the values, language, and public-facing side of the broader system.",
    cta: "Visit JoyNet"
  },
  {
    name: "GLC Ranch",
    href: "https://glcranch.com",
    eyebrow: "On-the-ground work",
    description:
      "A practical view of the land, constraints, and field conditions that keep the work grounded.",
    cta: "Visit GLC Ranch"
  },
  {
    name: "Teche Lake Outfitters",
    href: "https://www.techelakeoutfitters.com",
    eyebrow: "Experience in place",
    description:
      "A direct way to understand the place itself through guided movement and firsthand experience.",
    cta: "Visit Teche Lake Outfitters"
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

const signalFacts = [
  {
    label: "What this is",
    value: "An overview",
    detail: "A clear front door into the projects, media, and field work that make up Mimicorp."
  },
  {
    label: "Best first step",
    value: "Start with audio",
    detail: "Second Cutting is the fastest way to understand the thesis before exploring the rest."
  },
  {
    label: "What happens next",
    value: "Follow the branch",
    detail: "Each section below points you toward the part of the system that matches your interest."
  }
];

export default function HomePage() {
  return (
    <LayoutContainer>
      <MotionWrapper className="space-y-8 pb-16 pt-4 md:space-y-10 md:pb-24 md:pt-6">
        <section className="signal-panel relative overflow-hidden rounded-[34px] p-5 md:p-8">
          <div className="signal-noise" />
          <div className="signal-scanlines" />
          <div className="signal-beam" />

          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-text/60">
                <span className="signal-chip">Transmission 01</span>
                <span className="signal-chip">Identity source / live animation</span>
                <span className="signal-chip">Former header removed</span>
              </div>

              <div className="space-y-5">
                <p className="text-[11px] uppercase tracking-[0.4em] text-text/48">
                  Mimicorp Systems
                </p>
                <h1 className="glitch-title max-w-5xl font-primary text-[58px] leading-[0.9] tracking-[-0.08em] text-text sm:text-[78px] md:text-[108px] xl:text-[132px]">
                  Ecological infrastructure, explained through projects, media, and field work.
                </h1>
                <p className="max-w-2xl text-[17px] leading-[1.75] text-text/72 md:text-[19px]">
                  Mimicorp brings together land-based operations, documentary storytelling, and
                  practical systems design. This homepage is meant to help you understand the work
                  quickly, then move straight to the part that matters most to you.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#pathways" className="signal-button signal-button-primary">
                  Explore the main paths
                </a>
                <a href="#second-cutting" className="signal-button signal-button-secondary">
                  Start with featured listening
                </a>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <article className="signal-card signal-card-compact">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-text/42">
                    If you&apos;re new here
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.65] text-text/74">
                    Start with the podcast, then use the pathway cards below to follow your
                    interest.
                  </p>
                </article>
                <article className="signal-card signal-card-compact">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-text/42">
                    If you want proof
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.65] text-text/74">
                    Visit GLC Ranch and the map section to see how the work connects on the ground.
                  </p>
                </article>
                <article className="signal-card signal-card-compact">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-text/42">
                    If you want context
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.65] text-text/74">
                    JoyNet and Teche Lake show the public voice and lived experience around the work.
                  </p>
                </article>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {signalFacts.map((fact) => (
                  <article key={fact.label} className="signal-card">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-text/42">
                      {fact.label}
                    </p>
                    <p className="mt-3 font-primary text-[28px] leading-[1] tracking-[-0.05em] text-text">
                      {fact.value}
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.6] text-text/62">{fact.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-4 xl:pl-4">
              <div className="signal-frame">
                <div className="signal-frame-header">
                  <span>Identity loop</span>
                  <span>Glitch mark</span>
                </div>
                <div className="signal-video-wrap">
                  <video
                    className="signal-video"
                    src="/media/mimicorp-glitch-logo.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label="Animated Mimicorp glitch logo"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                <article className="signal-card min-h-[180px]">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">What to expect</p>
                  <div className="mt-4 space-y-3 text-[15px] leading-[1.7] text-text/70">
                    <p>The page is dark and high-contrast, but the structure is intentionally simple.</p>
                    <p>Each section answers a basic question: what this is, where to start, and what connects to what.</p>
                    <p>The visual identity stays bold without getting in the way of navigation.</p>
                  </div>
                </article>

                <article className="signal-card min-h-[180px]">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">Quick links</p>
                  <div className="mt-4 space-y-4">
                    <div className="signal-readout">
                      <span>Listen</span>
                      <span>Second Cutting</span>
                    </div>
                    <div className="signal-readout">
                      <span>Field work</span>
                      <span>GLC Ranch</span>
                    </div>
                    <div className="signal-readout">
                      <span>Public voice</span>
                      <span>JoyNet</span>
                    </div>
                    <div className="signal-readout">
                      <span>In-person access</span>
                      <span>Teche Lake</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="signal-marquee rounded-[28px] px-4 py-3 text-[10px] uppercase tracking-[0.34em] text-text/58 md:px-6">
          Mimicorp Systems / overview first / clear pathways / field evidence / public stories /
          land-based work / partner context
        </section>

        <section id="pathways" className="signal-panel rounded-[32px] p-6 md:p-8">
          <div className="grid gap-6 border-b border-white/10 pb-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.34em] text-text/48">
                Start Here
              </p>
              <h2 className="max-w-2xl font-primary text-[40px] leading-[0.96] tracking-[-0.06em] text-text md:text-[58px]">
                Four simple ways into the work.
              </h2>
            </div>
            <p className="max-w-2xl text-[16px] leading-[1.7] text-text/68 lg:ml-auto lg:text-right">
              Pick the path that best matches why you&apos;re here. You don&apos;t need to understand
              the whole system before choosing a useful place to begin.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {projectPaths.map((path, index) => (
              <article key={path.name} className="signal-path-card">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-text/42">
                      {path.eyebrow}
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.32em] text-text/34">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-primary text-[34px] leading-[0.96] tracking-[-0.05em] text-text">
                    {path.name}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-text/68">{path.description}</p>
                </div>

                <a
                  href={path.href}
                  target={path.href.startsWith("http") ? "_blank" : undefined}
                  rel={path.href.startsWith("http") ? "noreferrer" : undefined}
                  className="signal-button signal-button-secondary mt-6"
                >
                  {path.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="second-cutting"
          className="signal-panel rounded-[32px] p-6 md:p-8 xl:grid xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] xl:gap-6"
        >
          <div className="space-y-6 border-b border-white/10 pb-6 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.34em] text-text/48">
                Featured listening
              </p>
              <h2 className="max-w-3xl font-primary text-[40px] leading-[0.96] tracking-[-0.06em] text-text md:text-[58px]">
                Second Cutting is still the clearest entry point for most visitors.
              </h2>
              <p className="max-w-2xl text-[16px] leading-[1.75] text-text/68">
                It translates field conditions, practical constraints, and long-term thinking into
                a format people can absorb quickly. If you only click one thing on this page, this
                is the best place to start.
              </p>
            </div>

            <article className="signal-card">
              <p className="text-[10px] uppercase tracking-[0.32em] text-text/42">
                Current spotlight
              </p>
              <h3 className="mt-4 font-primary text-[42px] leading-[0.95] tracking-[-0.06em] text-text">
                Time Changes the Math
              </h3>
              <p className="mt-3 text-[12px] uppercase tracking-[0.24em] text-text/46">
                Episode 05 / Dr Shannon Gonsoulin
              </p>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-text/70">
                A conversation about how time changes the economics, biology, and expectations
                of agricultural systems, and why slow realities often break fast assumptions.
              </p>
            </article>

            <div className="flex flex-wrap gap-3">
              {listeningLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="signal-button signal-button-primary"
                >
                  Listen on {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:mt-0">
            <article className="signal-card">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">Why start here</p>
              <p className="mt-4 text-[15px] leading-[1.7] text-text/70">
                It gives new visitors context fast, without requiring them to read a long strategy
                explanation first.
              </p>
            </article>
            <article className="signal-card">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">What you&apos;ll get</p>
              <p className="mt-4 text-[15px] leading-[1.7] text-text/70">
                A grounded explanation of the work through conversation, reporting, and specific
                examples.
              </p>
            </article>
            <article className="signal-card">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">After that</p>
              <p className="mt-4 text-[15px] leading-[1.7] text-text/70">
                Use the map below to see how the media branch connects to operations, design, and
                evidence.
              </p>
            </article>
          </div>
        </section>

        <NodeCluster />

        <SystemNotes />
      </MotionWrapper>
    </LayoutContainer>
  );
}
