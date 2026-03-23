import dynamic from "next/dynamic";

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

const signalFacts = [
  {
    label: "Mode",
    value: "Broadcast thesis",
    detail: "Not a clean brochure. A live signal surface for projects, partners, and proof."
  },
  {
    label: "Primary job",
    value: "Route intent",
    detail: "Move people toward the exact branch they need without flattening the larger system."
  },
  {
    label: "Visual source",
    value: "Glitch mark",
    detail: "RGB offsets, scanlines, hard contrast, and transmission noise now drive the interface."
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
                  Ecological infrastructure transmitted like a signal, not presented like a deck.
                </h1>
                <p className="max-w-2xl text-[17px] leading-[1.75] text-text/72 md:text-[19px]">
                  The site now keys off the animated mark: severe black field, white
                  interruptions, RGB shear, and the feeling of something live on the edge of
                  distortion. The job is still orientation, but the visual language is now built
                  from the logo instead of sitting beside it.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#pathways" className="signal-button signal-button-primary">
                  Enter the system map
                </a>
                <a href="#second-cutting" className="signal-button signal-button-secondary">
                  Open featured listening
                </a>
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
                  <span>Animated identity feed</span>
                  <span>03.77 sec loop</span>
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
                  <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">
                    Signal notes
                  </p>
                  <div className="mt-4 space-y-3 text-[15px] leading-[1.7] text-text/70">
                    <p>Black carries most of the frame so white interruptions feel forceful.</p>
                    <p>RGB fringing adds instability without losing legibility.</p>
                    <p>Horizontal scanlines keep the motion language present even when static.</p>
                  </div>
                </article>

                <article className="signal-card min-h-[180px]">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">
                    System readout
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="signal-readout">
                      <span>Media</span>
                      <span>Second Cutting</span>
                    </div>
                    <div className="signal-readout">
                      <span>Field proof</span>
                      <span>GLC Ranch</span>
                    </div>
                    <div className="signal-readout">
                      <span>Public signal</span>
                      <span>JoyNet</span>
                    </div>
                    <div className="signal-readout">
                      <span>Place access</span>
                      <span>Teche Lake</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="signal-marquee rounded-[28px] px-4 py-3 text-[10px] uppercase tracking-[0.34em] text-text/58 md:px-6">
          Mimicorp Systems / ecological infrastructure / signal routing / partner orientation /
          field evidence / land-based proof / public signal / documentary branch
        </section>

        <section id="pathways" className="signal-panel rounded-[32px] p-6 md:p-8">
          <div className="grid gap-6 border-b border-white/10 pb-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.34em] text-text/48">
                Pathway Switchboard
              </p>
              <h2 className="max-w-2xl font-primary text-[40px] leading-[0.96] tracking-[-0.06em] text-text md:text-[58px]">
                Four direct channels, each framed like an active transmission.
              </h2>
            </div>
            <p className="max-w-2xl text-[16px] leading-[1.7] text-text/68 lg:ml-auto lg:text-right">
              The old homepage tried to summarize everything at once. This version routes by
              intent first so the visual energy of the logo becomes structural, not ornamental.
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
                Second Cutting stays close to the top because it carries the thesis in public.
              </h2>
              <p className="max-w-2xl text-[16px] leading-[1.75] text-text/68">
                If the homepage is a transmission deck, this is the loudest recurring channel.
                It translates field conditions into narrative form without smoothing out the
                rough edges that make those conditions real.
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
              <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">Why it matters</p>
              <p className="mt-4 text-[15px] leading-[1.7] text-text/70">
                It is one of the cleanest bridges between lived conditions and outside
                understanding, which makes it essential for trust, narrative coherence, and
                partner onboarding.
              </p>
            </article>
            <article className="signal-card">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">Next move</p>
              <p className="mt-4 text-[15px] leading-[1.7] text-text/70">
                The current treatment keeps it visible on the homepage while leaving room for a
                deeper archive section later without diluting the new visual identity.
              </p>
            </article>
            <article className="signal-card">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text/42">Visual cue</p>
              <p className="mt-4 text-[15px] leading-[1.7] text-text/70">
                Sharp borders, clipped panels, and high-contrast typography now make the media
                branch feel like part of the same transmission system as the mark itself.
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
