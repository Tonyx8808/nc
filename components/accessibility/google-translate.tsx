"use client";
import React, { useEffect } from "react";

/**
 * components/accessibility/google-translate.tsx
 *
 * Widget "Google Website Translator", usato solo come motore di
 * traduzione: la sua interfaccia visibile viene nascosta via CSS (vedi
 * accessibility.css) e viene pilotato in modo invisibile dal dropdown
 * lingua nel pannello di accessibilità, tramite translatePageTo().
 *
 * ATTENZIONE — limite noto: questo widget traduce sostituendo il testo
 * direttamente nel DOM. Su siti React (come questo) può, in rari casi,
 * entrare in conflitto con il re-render di React se una sezione tradotta
 * viene ri-renderizzata (es. cambio tab, apertura di un accordion) mentre
 * la traduzione è attiva, causando un errore a console del tipo "Failed
 * to execute removeChild". Se noti pagine che si bloccano o si svuotano
 * dopo aver tradotto e poi interagito con la pagina, è quello il
 * meccanismo: la soluzione più sicura in quel caso è "Ripristina
 * italiano" (che ricarica la pagina) prima di navigare o interagire con
 * componenti animati mentre la traduzione è attiva.
 *
 * Da montare una sola volta in app/layout.tsx, dentro <AccessibilityProvider>:
 *   <GoogleTranslateLoader />
 */

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (options: Record<string, unknown>, elementId: string) => unknown;
      };
    };
  }
}

const SCRIPT_ID = "google-translate-script";

export function GoogleTranslateLoader() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    window.googleTranslateElementInit = () => {
      if (!window.google) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "it",
          includedLanguages: "it,en,fr,es,de,ar,zh-CN,ru",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_element" className="a11y-google-translate-hidden" />;
}

/**
 * Cambia la lingua della pagina pilotando il <select> interno creato dal
 * widget Google Translate (classe .goog-te-combo). Il widget lo crea in
 * modo asincrono dopo il caricamento dello script, quindi si riprova per
 * qualche secondo se non è ancora pronto.
 *
 * langCode: "it" per tornare all'italiano originale, altrimenti un codice
 * lingua incluso in includedLanguages sopra (es. "en", "fr", "es"...).
 */
export function translatePageTo(langCode: string) {
  if (langCode === "it") {
    // Il modo più affidabile per tornare al testo originale è ricaricare:
    // Google Translate non offre un "undo" pulito lato DOM.
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return;
  }

  let attempts = 0;
  const tryTranslate = () => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
      return;
    }
    attempts += 1;
    if (attempts < 20) {
      setTimeout(tryTranslate, 250);
    }
  };
  tryTranslate();
}