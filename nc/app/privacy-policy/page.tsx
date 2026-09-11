"use client";
import React from "react";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";

/**
 * app/privacy-policy/page.tsx
 *
 * ATTENZIONE: testo generico basato sugli obblighi informativi del GDPR
 * (artt. 13-14 Reg. UE 2016/679). Va rivisto da un legale/DPO prima della
 * pubblicazione: sostituisci i dati tra [PARENTESI QUADRE] con quelli
 * reali della Confederazione e adatta le finalità di trattamento a quanto
 * effettivamente fate sul sito (form di contatto, newsletter, cookie,
 * eventuale area riservata, ecc.).
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Trattamento dei dati"
      title="Privacy Policy"
      updatedAt="10 agosto 2026"
      intro="Questa informativa descrive come ES.A.AR.CO. Confederazione tratta i dati personali di chi visita e utilizza questo sito, in conformità al Regolamento (UE) 2016/679 (GDPR) e alla normativa italiana in materia di protezione dei dati personali."
    >
      <LegalSection title="1. Titolare del trattamento">
        <p>
          Il Titolare del trattamento è ES.A.AR.CO. Confederazione, con sede
          operativa in Via Po, 58 — 88046 Lamezia Terme (CZ), contattabile
          all&apos;indirizzo email{" "}
          <a href="mailto:formazione.certificazione@esaarco.info" className="underline underline-offset-4">
            formazione.certificazione@esaarco.info
          </a>{" "}
          o al numero{" "}
          <a href="tel:0968521173" className="underline underline-offset-4">
            0968/521173
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Tipologie di dati raccolti">
        <p>
          Nell&apos;ambito della normale navigazione del sito possiamo
          raccogliere: dati di navigazione (indirizzo IP, tipo di browser,
          pagine visitate, orari di accesso), dati forniti volontariamente
          tramite form di contatto o richieste (nome, email, telefono,
          messaggio) e dati tecnici relativi ai cookie, disciplinati nella{" "}
          <a href="/cookie-policy" className="underline underline-offset-4">
            Cookie Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="3. Finalità e base giuridica del trattamento">
        <p>I dati raccolti sono trattati per le seguenti finalità:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Rispondere a richieste di informazioni o assistenza (base giuridica: esecuzione di misure precontrattuali/contrattuali);</li>
          <li>Erogare i servizi richiesti (formazione, consulenza, download di materiali) (base giuridica: esecuzione del contratto o consenso);</li>
          <li>Adempiere a obblighi di legge (base giuridica: obbligo legale);</li>
          <li>Con il consenso, finalità statistiche e di miglioramento del sito tramite cookie non necessari.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Modalità e periodo di conservazione">
        <p>
          I dati sono trattati con strumenti informatici e conservati per il
          tempo strettamente necessario alle finalità per cui sono stati
          raccolti, salvo obblighi di legge che impongano una conservazione
          più lunga.
        </p>
      </LegalSection>

      <LegalSection title="5. Comunicazione e diffusione dei dati">
        <p>
          I dati non sono diffusi. Possono essere comunicati a soggetti
          terzi che forniscono servizi strumentali all&apos;attività del
          Titolare (es. hosting, invio email), nominati responsabili del
          trattamento ai sensi dell&apos;art. 28 GDPR, o ad autorità
          pubbliche quando previsto dalla legge.
        </p>
      </LegalSection>

      <LegalSection title="6. Diritti dell'interessato">
        <p>In qualsiasi momento è possibile esercitare, contattando il Titolare, i diritti previsti dagli artt. 15-22 GDPR:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>accesso ai propri dati personali;</li>
          <li>rettifica o cancellazione degli stessi;</li>
          <li>limitazione del trattamento;</li>
          <li>opposizione al trattamento;</li>
          <li>portabilità dei dati;</li>
          <li>revoca del consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.</li>
        </ul>
        <p>
          È inoltre possibile proporre reclamo all&apos;Autorità Garante per
          la protezione dei dati personali (www.garanteprivacy.it).
        </p>
      </LegalSection>

      <LegalSection title="7. Modifiche a questa informativa">
        <p>
          Questa informativa può essere aggiornata periodicamente. La data
          di ultimo aggiornamento è indicata in cima alla pagina.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}