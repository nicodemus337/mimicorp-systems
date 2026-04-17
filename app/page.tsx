import Link from "next/link";

const systemSteps = [
  {
    label: "Observe",
    body: "Capture real-world inputs most systems ignore."
  },
  {
    label: "Structure",
    body: "Turn inputs into workflows, infrastructure, and logic."
  },
  {
    label: "Deploy",
    body: "Connect systems to media, commerce, and output."
  },
  {
    label: "Compound",
    body: "Create feedback loops that improve performance over time."
  }
] as const;

const applications = [
  {
    title: "Land Systems",
    body: "Connect production, data, and revenue into a working system.",
    href: "/land-systems"
  },
  {
    title: "Business Systems",
    body: "Structure operations and customer flow for clarity and output.",
    href: "/business-systems"
  },
  {
    title: "Media Systems",
    body: "Turn content into infrastructure that drives real outcomes.",
    href: "/media-systems"
  },
  {
    title: "Experimental",
    body: "Develop new system models and long-term frameworks.",
    href: "/research-lab"
  }
] as const;

const deployments = [
  {
    title: "Gonsoulin Land & Cattle",
    body: "Direct-to-consumer beef system integrating production, media, and sales."
  },
  {
    title: "GP Supply & Lumber",
    body: "Legacy retail restructured into a modern operational system."
  },
  {
    title: "Second Cutting",
    body: "Media system tied directly to land, people, and production."
  }
] as const;

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero container">
        <p className="eyebrow">Mimicorp Systems</p>
        <h1>WE BUILD OPERATING SYSTEMS FOR REAL-WORLD BUSINESSES</h1>
        <p>Land. Business. Media. Structured into systems that produce results.</p>
        <Link href="#contact" className="cta">
          Start a system
        </Link>
      </section>

      <section className="section container">
        <h2>Most operations are running on effort, not systems.</h2>
        <p>
          Data exists but is not used. Marketing is disconnected from reality. Work happens, but
          nothing compounds.
        </p>
      </section>

      <section className="section container" id="system">
        <h2>The System</h2>

        <div className="grid">
          {systemSteps.map((step) => (
            <div key={step.label} className="system-step">
              <div className="label">{step.label}</div>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" id="domains">
        <h2>Where This Applies</h2>

        <div className="grid">
          {applications.map((item) => (
            <Link key={item.title} href={item.href} className="pathway">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container" id="deployments">
        <h2>Deployed Systems</h2>

        <div className="grid">
          {deployments.map((item) => (
            <div key={item.title} className="deployment">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2>Why Mimicorp</h2>
        <p>
          Most systems are designed from the outside. These are built from within.
        </p>
      </section>

      <section className="container footer" id="contact">
        <h2>You do not need more ideas. You need a system.</h2>
        <Link href="/nodes/contact/" className="cta">
          Start a system
        </Link>
      </section>
    </main>
  );
}
