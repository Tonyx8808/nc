"use client";
import React from "react";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "@/components/cookie-consent";
import { cn } from "@/lib/utils";

const BLUE = "#29A9E1";
const MONO = "font-mono";

/**
 * app/cookie-policy/page.tsx
 *
 * ATTENZIONE: testo generico. Aggiorna l'elenco dei cookie effettivamente
 * impostati dal sito (nome, finalità, durata, terze parti — es. se in
 * futuro aggiungi Google Analytics o pixel di marketing, vanno elencati
 * qui) prima della pubblicazione.
 */
export default function CookiePolicyPage() {
  const openPreferences = () => {
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
  };

  return (
    <LegalLayout
      eyebrow="Cookie"
      title="Cookie Policy"
      updatedAt="10 agosto 2026"
      intro="Questa pagina descrive i cookie utilizzati da questo sito e come gestire le tue preferenze."
    >
      <LegalSection title="1. Cosa sono i cookie">
        <p>
          I cookie sono piccoli file di testo che i siti visitati inviano al
          dispositivo dell&apos;utente, dove vengono memorizzati per essere
          poi ritrasmessi agli stessi siti alla visita successiva. Servono a
          far funzionare correttamente il sito, a renderlo più sicuro, a
          garantire una migliore esperienza di navigazione e, con il tuo
          consenso, a fini statistici o di marketing.
        </p>
      </LegalSection>

      <LegalSection title="2. Gestisci le tue preferenze">
        <p>
          Puoi modificare in qualsiasi momento le categorie di cookie che
          hai autorizzato:
        </p>
        <button
          type="button"
          onClick={openPreferences}
          className={cn(MONO, "mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02]")}
          style={{ backgroundColor: BLUE }}
        >
          Gestisci preferenze cookie
        </button>
      </LegalSection>

      <LegalSection title="3. Cookie necessari">
        <p>
          Indispensabili per il funzionamento del sito: consentono, ad
          esempio, di ricordare le preferenze cookie già espresse. Non
          richiedono consenso e non possono essere disattivati.
        </p>
      </LegalSection>

      <LegalSection title="4. Cookie di statistica">
        <p>
          Se autorizzati, raccolgono informazioni in forma aggregata e
          anonima su come il sito viene utilizzato, per aiutarci a
          migliorarlo. Vengono impostati solo previo consenso.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookie di marketing">
        <p>
          Se autorizzati, possono essere utilizzati per mostrare contenuti
          e comunicazioni più pertinenti agli interessi dell&apos;utente.
          Vengono impostati solo previo consenso.
        </p>
      </LegalSection>

      <LegalSection title="6. Come disabilitare i cookie dal browser">
        <p>
          Oltre alle preferenze impostabili su questo sito, è possibile
          gestire o eliminare i cookie direttamente dalle impostazioni del
          proprio browser. Disabilitare i cookie necessari potrebbe
          compromettere il corretto funzionamento del sito.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}