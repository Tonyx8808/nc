"use client";
import React from "react";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";

/**
 * app/termini-e-condizioni/page.tsx
 *
 * ATTENZIONE: testo generico. Va rivisto da un legale prima della
 * pubblicazione, in particolare foro competente e limitazioni di
 * responsabilità relative ai servizi formativi effettivamente erogati.
 */
export default function TerminiECondizioniPage() {
  return (
    <LegalLayout
      eyebrow="Condizioni d'uso"
      title="Termini e Condizioni"
      updatedAt="10 agosto 2026"
      intro="L'accesso e l'utilizzo di questo sito implicano l'accettazione dei termini e delle condizioni descritti in questa pagina."
    >
      <LegalSection title="1. Oggetto">
        <p>
          Questo sito è gestito da ES.A.AR.CO. Confederazione e fornisce
          informazioni sulle attività, i servizi formativi, la modulistica
          e i materiali didattici messi a disposizione della Confederazione
          e dei suoi iscritti.
        </p>
      </LegalSection>

      <LegalSection title="2. Accesso e utilizzo del sito">
        <p>
          L&apos;utente si impegna a utilizzare il sito in modo lecito,
          corretto e conforme a queste condizioni, astenendosi da qualsiasi
          uso che possa danneggiare, disabilitare o compromettere il
          funzionamento del sito o l&apos;esperienza degli altri utenti.
        </p>
      </LegalSection>

      <LegalSection title="3. Proprietà intellettuale">
        <p>
          Il nome, il logo e i contenuti pubblicati su questo sito (testi,
          immagini, materiali didattici, modulistica) sono di proprietà di
          ES.A.AR.CO. Confederazione o dei rispettivi autori/licenzianti e
          sono protetti dalla normativa vigente in materia di proprietà
          intellettuale. È vietata la riproduzione, distribuzione o
          modifica non autorizzata dei contenuti.
        </p>
      </LegalSection>

      <LegalSection title="4. Materiali scaricabili">
        <p>
          Dispense, moduli e altri documenti resi disponibili per il
          download sono destinati esclusivamente all&apos;uso personale o
          didattico da parte degli iscritti e dei destinatari dei percorsi
          formativi, salvo diversa indicazione.
        </p>
      </LegalSection>

      <LegalSection title="5. Limitazione di responsabilità">
        <p>
          ES.A.AR.CO. Confederazione si impegna a garantire l&apos;accuratezza
          delle informazioni pubblicate sul sito, ma non garantisce
          l&apos;assenza di errori o omissioni e non risponde di eventuali
          danni derivanti dall&apos;uso o dall&apos;impossibilità di
          utilizzare il sito o i contenuti in esso pubblicati, salvo i
          limiti previsti dalla legge.
        </p>
      </LegalSection>

      <LegalSection title="6. Link a siti terzi">
        <p>
          Il sito può contenere collegamenti a siti di terze parti (es.
          enti convenzionati, atenei partner). ES.A.AR.CO. Confederazione
          non è responsabile dei contenuti o delle pratiche sulla privacy
          di tali siti esterni.
        </p>
      </LegalSection>

      <LegalSection title="7. Modifiche ai termini">
        <p>
          ES.A.AR.CO. Confederazione si riserva il diritto di modificare in
          qualsiasi momento questi Termini e Condizioni. Le modifiche sono
          efficaci dalla data di pubblicazione sul sito.
        </p>
      </LegalSection>

      <LegalSection title="8. Legge applicabile e foro competente">
        <p>
          Questi Termini e Condizioni sono regolati dalla legge italiana.
          Per qualsiasi controversia relativa all&apos;uso del sito sarà
          competente il foro del luogo in cui ha sede il Titolare, salvo
          diversa previsione inderogabile di legge a tutela del consumatore.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}