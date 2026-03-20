export async function loadFieldNotes() {
  const response = await fetch("./data/field-notes.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Unable to load field notes.");
  }

  return response.json();
}

export function createFieldNotesController({ notes, onEmit, target, documentRef }) {
  let cursor = 0;
  let timer = 0;
  let floatingCount = 0;

  function renderFeed() {
    const visible = [0, 1, 2].map((offset) => notes[(cursor + offset) % notes.length]);
    target.innerHTML = visible
      .map(
        (note) => `
          <article class="note-row">
            <span>${note.timestamp} / ${note.label}</span>
            <span>${note.text}</span>
          </article>
        `
      )
      .join("");
  }

  function emitFloating(note) {
    const element = documentRef.createElement("article");
    const side = floatingCount % 2 === 0 ? "left" : "right";
    const top = 18 + (floatingCount % 4) * 14;

    floatingCount += 1;
    element.className = "floating-note";
    element.style.top = `${top}%`;
    element.style[side] = "24px";
    element.innerHTML = `<span>${note.label}</span><p>${note.text}</p>`;
    documentRef.body.appendChild(element);

    window.setTimeout(() => element.remove(), 8200);
  }

  function tick() {
    const note = notes[cursor % notes.length];
    cursor += 1;
    renderFeed();
    emitFloating(note);
    onEmit(note);
    timer = window.setTimeout(tick, 4600);
  }

  renderFeed();
  timer = window.setTimeout(tick, 2400);

  return {
    destroy() {
      window.clearTimeout(timer);
    }
  };
}
