"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import fruitfulBrain from "@/assets/fruitfulbrain.png";

const menuOptions = [
  {
    title: "Land Systems",
    body: "Production, distribution, and revenue wired into one system.",
    href: "/land-systems"
  },
  {
    title: "Business Systems",
    body: "Operations, customer flow, and infrastructure built to compound.",
    href: "/business-systems"
  },
  {
    title: "Media Systems",
    body: "Narrative, publishing, and distribution turned into output.",
    href: "/media-systems"
  },
  {
    title: "Research Lab",
    body: "Frameworks, archives, and experiments for future systems.",
    href: "/research-lab"
  },
  {
    title: "Contact",
    body: "Book time or start a system build.",
    href: "/nodes/contact/"
  }
] as const;

export default function HomePage() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className={`landing-shell${hasEntered ? " landing-shell--entered" : ""}`}>
      <section className={`landing-screen${hasEntered ? " landing-screen--hidden" : ""}`}>
        <div className="landing-screen__inner">
          <Image
            src={fruitfulBrain}
            alt="Fruitful Brain logo"
            className="landing-logo"
            priority
          />

          <button type="button" className="landing-start" onClick={() => setHasEntered(true)}>
            Start
          </button>
        </div>
      </section>

      <section className={`game-menu${hasEntered ? " game-menu--active" : ""}`}>
        <div className="game-menu__header">
          <p className="game-menu__label">Fruitful Brain</p>
          <h1>Choose where to enter.</h1>
        </div>

        <div className="game-menu__grid">
          {menuOptions.map((option, index) => (
            <Link key={option.title} href={option.href} className="game-menu__card">
              <span className="game-menu__index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{option.title}</h2>
                <p>{option.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
