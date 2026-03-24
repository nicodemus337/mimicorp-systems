import { fieldNotes } from "@/lib/field-notes";

export default function SystemNotes() {
  return (
    <section
      id="field-notes"
      className="relative overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.34)] backdrop-blur-sm md:p-8"
    >
      <div className="field-notes-haze" />

      <div className="relative grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">
              Next Phase / Field Notes
            </p>
            <h2 className="max-w-lg font-primary text-[36px] leading-[1.02] tracking-[-0.05em] text-text md:text-[48px]">
              Field Notes is the next layer planned for the site.
            </h2>
            <p className="max-w-md text-[16px] leading-[1.6] text-text/70">
              It is designed to become the evidence layer: a structured record of what was
              observed, where it happened, and why it matters. The goal is to make the field
              reality easier to understand and easier to act on.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#"
                className="rounded-full border border-white/14 bg-white/[0.92] px-5 py-3 text-center text-[11px] uppercase tracking-[0.28em] text-black transition-colors duration-200 hover:bg-white"
              >
                Log In For Field Note Access
              </a>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-[11px] uppercase tracking-[0.28em] text-text/52">
                Subscriber preview / coming online
              </span>
            </div>
          </div>

          <div className="space-y-5 rounded-[28px] border border-white/10 bg-black/30 p-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-text/76">
                Upcoming module
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-text/52">
                Time / place / condition
              </span>
            </div>

            <p className="max-w-lg font-accent text-[28px] leading-[1.14] text-text/84">
              This preview shows how Field Notes can turn observations into usable evidence.
            </p>

            <div className="space-y-3 text-[16px] leading-[1.65] text-text/70">
              <p>Not as mood. Not as marketing. As observations that can support decisions.</p>
              <p>
                A late leaf-out. Soil holding moisture longer than expected. Insects arriving
                earlier, or not at all. Animal behavior that does not match the season.
              </p>
              <p>
                Individually, these signals can be dismissed. Recorded over time, they become a
                practical basis for deciding where intervention is needed, what should be built,
                and how support should be structured.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <article className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                Evidence retention
              </p>
              <p className="mt-3 text-[15px] leading-[1.5] text-text/74">
                Every event leaves a trace. Field Notes is meant to preserve those traces so
                decisions can be made against reality rather than memory.
              </p>
            </article>

            <article className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                Decision support
              </p>
              <p className="mt-3 text-[15px] leading-[1.5] text-text/74">
                What looks minor is often just unresolved. This system is being designed to turn
                observations into useful inputs for financing, stewardship, and build sequencing.
              </p>
            </article>

            <article className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-text/42">
                Partner alignment
              </p>
              <p className="mt-3 text-[15px] leading-[1.5] text-text/74">
                Shared evidence helps everyone stay aligned. Without it, the story can drift away
                from the conditions on the ground.
              </p>
            </article>
          </div>

          <div className="space-y-3 border-t border-white/8 pt-5 text-[15px] leading-[1.65] text-text/68">
            <p>
              In the next phase, each entry will be anchored to time, place, and condition, not
              just interpretation. That is how ecological claims become operational.
            </p>
            <p>
              Over time, it is meant to become a working record of reality: a basis for partner
              trust, project prioritization, and infrastructure design tied to actual conditions.
            </p>
            <p className="text-text/84">This is the next layer of the Mimicorp thesis.</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-[18px] top-0 w-px bg-gradient-to-b from-white/0 via-white/18 to-white/0 md:left-6" />

          <div className="space-y-4">
            {fieldNotes.map((note) => (
              <article
                key={note.id}
                className="field-note-card relative ml-9 rounded-[26px] border border-white/12 bg-[rgba(8,12,9,0.78)] p-5 md:ml-12 md:p-6"
              >
                <div className="absolute left-[-22px] top-7 h-3 w-3 rounded-full border border-white/35 bg-[#c7d2b1] shadow-[0_0_16px_rgba(199,210,177,0.45)] md:left-[-30px]" />

                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-text/76">
                      {note.recordId}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-text/52">
                      {note.status}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-text/52">
                      {note.date}
                    </span>
                  </div>

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

                    <div className="grid gap-3 md:min-w-[240px]">
                      <div className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                          {note.metricLabel}
                        </p>
                        <p className="mt-2 font-primary text-[28px] leading-none tracking-[-0.04em] text-text">
                          {note.metricValue}
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-3">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                          Condition
                        </p>
                        <p className="mt-2 text-[13px] uppercase tracking-[0.16em] text-text/60">
                          {note.condition}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="field-note-grid grid gap-3 border-t border-white/8 pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                        Observed signal
                      </p>
                      <p className="mt-3 max-w-2xl text-[14px] uppercase tracking-[0.14em] text-text/56">
                        {note.signal}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                        Field entry
                      </p>
                      <p className="mt-3 max-w-2xl font-accent text-[27px] leading-[1.12] text-text/80">
                        {note.excerpt}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-text/42">
                        Infrastructure implication
                      </p>
                      <p className="mt-3 text-[14px] leading-[1.5] text-text/78">
                        {note.implication}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
