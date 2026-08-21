"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

/**
 * components/accessibility/accessibility-context.tsx
 *
 * Stato globale del pannello di accessibilità. Le impostazioni si
 * salvano in localStorage e si applicano come classi su <html> — le
 * regole CSS corrispondenti sono in styles/accessibility.css.
 *
 * Da montare in app/layout.tsx, avvolgendo tutto il resto:
 *
 *   <AccessibilityProvider>
 *     <Header />
 *     {children}
 *     <Footer />
 *     <AccessibilityPanel />
 *   </AccessibilityProvider>
 */

export interface AccessibilitySettings {
  fontScale: number;
  highContrast: boolean;
  grayscale: boolean;
  dyslexiaFont: boolean;
  underlineLinks: boolean;
  textSpacing: boolean;
  highlightHeadings: boolean;
  reduceMotion: boolean;
  largeCursor: boolean;
}

export type AccessibilityToggleKey = Exclude<keyof AccessibilitySettings, "fontScale">;

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontScale: 1,
  highContrast: false,
  grayscale: false,
  dyslexiaFont: false,
  underlineLinks: false,
  textSpacing: false,
  highlightHeadings: false,
  reduceMotion: false,
  largeCursor: false,
};

const STORAGE_KEY = "esaarco-a11y-settings";
export const MIN_FONT_SCALE = 0.85;
export const MAX_FONT_SCALE = 1.5;
const FONT_STEP = 0.1;

// Chiave impostazione → classe applicata su <html> (vedi accessibility.css)
const CLASS_MAP: Record<AccessibilityToggleKey, string> = {
  highContrast: "a11y-contrast",
  grayscale: "a11y-grayscale",
  dyslexiaFont: "a11y-dyslexia",
  underlineLinks: "a11y-underline-links",
  textSpacing: "a11y-text-spacing",
  highlightHeadings: "a11y-highlight-headings",
  reduceMotion: "a11y-reduce-motion",
  largeCursor: "a11y-large-cursor",
};

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  toggle: (key: AccessibilityToggleKey) => void;
  reset: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function loadSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  // Legge le preferenze salvate solo lato client, dopo il primo render
  // (evita mismatch di idratazione tra server e browser).
  useEffect(() => {
    setSettings(loadSettings());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontScale * 100}%`;

    (Object.keys(CLASS_MAP) as AccessibilityToggleKey[]).forEach((key) => {
      root.classList.toggle(CLASS_MAP[key], settings[key]);
    });

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // localStorage non disponibile: le preferenze restano solo per
      // questa sessione, non è bloccante.
    }
  }, [settings, hydrated]);

  const increaseFontScale = useCallback(() => {
    setSettings((s) => ({
      ...s,
      fontScale: Math.min(MAX_FONT_SCALE, Math.round((s.fontScale + FONT_STEP) * 100) / 100),
    }));
  }, []);

  const decreaseFontScale = useCallback(() => {
    setSettings((s) => ({
      ...s,
      fontScale: Math.max(MIN_FONT_SCALE, Math.round((s.fontScale - FONT_STEP) * 100) / 100),
    }));
  }, []);

  const toggle = useCallback((key: AccessibilityToggleKey) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  return (
    <AccessibilityContext.Provider
      value={{ settings, increaseFontScale, decreaseFontScale, toggle, reset }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error("useAccessibility deve essere usato dentro <AccessibilityProvider>");
  }
  return ctx;
}