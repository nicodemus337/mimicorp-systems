export type ReaderSettings = {
  textScale: number;
  dyslexiaFont: boolean;
  highContrast: boolean;
  reducedStimulation: boolean;
  reducedMotion: boolean;
  narration: boolean;
};

export const accessibilityStorageKey = "mimicorp-books-accessibility";

export const defaultReaderSettings: ReaderSettings = {
  textScale: 1,
  dyslexiaFont: false,
  highContrast: false,
  reducedStimulation: false,
  reducedMotion: false,
  narration: false
};

export function clampTextScale(value: number) {
  return Math.min(1.45, Math.max(0.9, Number(value.toFixed(2))));
}

export function applyReaderSettings(settings: ReaderSettings) {
  document.documentElement.style.setProperty(
    "--reader-text-scale",
    String(settings.textScale)
  );
  document.body.classList.toggle("dyslexia-font", settings.dyslexiaFont);
  document.body.classList.toggle("high-contrast", settings.highContrast);
  document.body.classList.toggle(
    "reduced-stimulation",
    settings.reducedStimulation
  );
  document.body.classList.toggle("reader-reduced-motion", settings.reducedMotion);
}
