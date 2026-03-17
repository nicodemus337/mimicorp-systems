export default function SystemNotes() {
  return (
    <section className="grid gap-6 rounded-[32px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:grid-cols-3">
      <article className="space-y-3">
        <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">Branches</p>
        <h3 className="font-primary text-[24px] leading-[1.15] tracking-[-0.03em]">
          Primary movements
        </h3>
        <p className="text-[16px] leading-[1.5] text-text/68">
          Second Cutting + VAPG. Ag Lab + Ecological Archive. JoyNet.church.
        </p>
      </article>

      <article className="space-y-3">
        <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">Stems</p>
        <h3 className="font-primary text-[24px] leading-[1.15] tracking-[-0.03em]">
          Operational systems
        </h3>
        <p className="text-[16px] leading-[1.5] text-text/68">
          GLC. TLO. GP Supply. Shady Pines.
        </p>
      </article>

      <article className="space-y-3">
        <p className="text-[12px] uppercase tracking-[0.32em] text-text/48">Fruit</p>
        <h3 className="font-primary text-[24px] leading-[1.15] tracking-[-0.03em]">
          Outputs
        </h3>
        <p className="text-[16px] leading-[1.5] text-text/68">Design. Media. Data.</p>
      </article>
    </section>
  );
}
