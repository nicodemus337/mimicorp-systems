import { fieldNotes } from "@/lib/field-notes";

export default function SystemNotes() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.28)] backdrop-blur-sm md:p-8">
      <div className="field-notes-haze" />

      <div className="relative grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">
              Field Notes
            </p>
            <h2 className="max-w-lg font-primary text-[36px] leading-[1.02] tracking-[-0.05em] text-text md:text-[48px]">
              Ecological readings folded into the wireframe
            </h2>
            <p className="max-w-md text-[16px] leading-[1.6] text-text/70">
              Instead of treating context as caption, the system can carry observation as
              part of its structure. Each note works like a specimen tag: partial,
              situated, and precise enough to change how the network is read.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <article className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                Branch use
              </p>
              <p className="mt-3 text-[15px] leading-[1.5] text-text/74">
                Attach notes to primary movements so each branch accumulates climate,
                timing, and sensory evidence.
              </p>
            </article>

            <article className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                Visual logic
              </p>
              <p className="mt-3 text-[15px] leading-[1.5] text-text/74">
                Use clipped measurements, observed fragments, and marginal labels rather
                than long paragraphs.
              </p>
            </article>

            <article className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                Narrative effect
              </p>
              <p className="mt-3 text-[15px] leading-[1.5] text-text/74">
                Let data feel lived in. The site becomes less like a sitemap and more
                like an active survey.
              </p>
            </article>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-[18px] top-0 w-px bg-gradient-to-b from-white/0 via-white/18 to-white/0 md:left-6" />

          <div className="space-y-4">
            {fieldNotes.map((note) => (
              <article
                key={note.id}
                className="field-note-card relative ml-9 rounded-[26px] border border-white/12 bg-[rgba(8,12,9,0.7)] p-5 md:ml-12 md:p-6"
              >
                <div className="absolute left-[-22px] top-7 h-3 w-3 rounded-full border border-white/35 bg-[#c7d2b1] shadow-[0_0_16px_rgba(199,210,177,0.45)] md:left-[-30px]" />

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-text/42">
                      {note.index}
                    </p>
                    <h3 className="font-primary text-[28px] leading-[1.05] tracking-[-0.04em] text-text">
                      {note.node}
                    </h3>
                    <p className="text-[13px] uppercase tracking-[0.18em] text-text/46">
                      {note.timestamp} / {note.habitat}
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 md:min-w-[160px]">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                      {note.metricLabel}
                    </p>
                    <p className="mt-2 font-primary text-[28px] leading-none tracking-[-0.04em] text-text">
                      {note.metricValue}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-[15px] uppercase tracking-[0.14em] text-text/52">
                  {note.signal}
                </p>

                <p className="mt-5 max-w-2xl font-accent text-[27px] leading-[1.12] text-text/80">
                  {note.excerpt}
                </p>

                <p className="mt-5 border-t border-white/8 pt-4 text-[14px] leading-[1.5] text-[#d8e1c6]">
                  {note.implication}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
