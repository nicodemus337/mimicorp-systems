"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ALargeSmall,
  Contrast,
  Ear,
  EyeOff,
  Minus,
  Pause,
  Plus,
  Settings
} from "lucide-react";
import {
  accessibilityStorageKey,
  applyReaderSettings,
  clampTextScale,
  defaultReaderSettings,
  type ReaderSettings
} from "@/lib/accessibility";
import { readJsonFromStorage, writeJsonToStorage } from "@/lib/storage";

export type { ReaderSettings } from "@/lib/accessibility";

type AccessibilityPanelProps = {
  onChange?: (settings: ReaderSettings) => void;
};

export function AccessibilityPanel({ onChange }: AccessibilityPanelProps) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<ReaderSettings>(defaultReaderSettings);

  useEffect(() => {
    setSettings(readJsonFromStorage(accessibilityStorageKey, defaultReaderSettings));
  }, []);

  useEffect(() => {
    applyReaderSettings(settings);
    writeJsonToStorage(accessibilityStorageKey, settings);
    onChange?.(settings);
  }, [onChange, settings]);

  const textLabel = useMemo(
    () => `${Math.round(settings.textScale * 100)} percent`,
    [settings.textScale]
  );

  function update<K extends keyof ReaderSettings>(
    key: K,
    value: ReaderSettings[K]
  ) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  return (
    <aside className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-14 min-w-14 items-center justify-center rounded-full bg-ink text-shell shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pond"
        aria-label="Open reading accessibility settings"
        aria-expanded={open}
      >
        <Settings aria-hidden="true" size={22} />
      </button>

      {open ? (
        <div className="contrast-surface absolute bottom-16 right-0 w-[min(22rem,calc(100vw-2rem))] rounded-[1.5rem] border border-ink/10 bg-shell/96 p-4 shadow-soft backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2">
            <ALargeSmall aria-hidden="true" size={18} />
            <h2 className="text-base font-semibold">Reading comfort</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/65 p-3">
              <span className="text-sm font-medium">Text size</span>
              <div className="flex items-center gap-2" aria-label={`Text size ${textLabel}`}>
                <button
                  type="button"
                  className="grid min-h-11 min-w-11 place-items-center rounded-full bg-ink/8"
                  onClick={() =>
                    update("textScale", clampTextScale(settings.textScale - 0.1))
                  }
                  aria-label="Decrease text size"
                >
                  <Minus aria-hidden="true" size={18} />
                </button>
                <span className="w-12 text-center text-xs text-ink/64">{textLabel}</span>
                <button
                  type="button"
                  className="grid min-h-11 min-w-11 place-items-center rounded-full bg-ink/8"
                  onClick={() =>
                    update("textScale", clampTextScale(settings.textScale + 0.1))
                  }
                  aria-label="Increase text size"
                >
                  <Plus aria-hidden="true" size={18} />
                </button>
              </div>
            </div>

            <ToggleRow
              icon={<ALargeSmall aria-hidden="true" size={18} />}
              label="Dyslexia-friendly font"
              checked={settings.dyslexiaFont}
              onChange={(checked) => update("dyslexiaFont", checked)}
            />
            <ToggleRow
              icon={<Contrast aria-hidden="true" size={18} />}
              label="High contrast"
              checked={settings.highContrast}
              onChange={(checked) => update("highContrast", checked)}
            />
            <ToggleRow
              icon={<EyeOff aria-hidden="true" size={18} />}
              label="Reduced stimulation"
              checked={settings.reducedStimulation}
              onChange={(checked) => update("reducedStimulation", checked)}
            />
            <ToggleRow
              icon={<Pause aria-hidden="true" size={18} />}
              label="Reduced motion"
              checked={settings.reducedMotion}
              onChange={(checked) => update("reducedMotion", checked)}
            />
            <ToggleRow
              icon={<Ear aria-hidden="true" size={18} />}
              label="Narration placeholder"
              checked={settings.narration}
              onChange={(checked) => update("narration", checked)}
            />
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function ToggleRow({
  checked,
  icon,
  label,
  onChange
}: {
  checked: boolean;
  icon: ReactNode;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-2xl bg-white/65 p-3 text-sm font-medium">
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-ink"
      />
    </label>
  );
}
