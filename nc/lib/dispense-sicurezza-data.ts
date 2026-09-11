/**
 * lib/dispense-sicurezza-data.ts
 *
 * Elenco delle dispense scaricabili sull'area "Sicurezza sul Lavoro".
 * Ogni voce corrisponde a un file che dovrai caricare in
 * `public/dispense-sicurezza/`.
 *
 * `file` è il percorso pubblico del PDF: se lo carichi come
 * `public/dispense-sicurezza/antincendio.pdf`, il valore resta
 * `/dispense-sicurezza/antincendio.pdf` (la cartella `public` non va
 * scritta nel percorso).
 */

export interface Dispensa {
  slug: string;
  title: string;
  description: string;
  file: string;
}

export const DISPENSE_SICUREZZA: Dispensa[] = [
  {
    slug: "stress-lavoro-correlato",
    title: "Stress Lavoro Correlato",
    description:
      "Nozioni sulla valutazione e gestione del rischio da stress lavoro-correlato nei luoghi di lavoro.",
    file: "/dispense-sicurezza/stress-lavoro-correlato.pdf", 
  },
  {
    slug: "vibrazioni-meccaniche",
    title: "Vibrazioni Meccaniche",
    description:
      "Rischi legati all'esposizione a vibrazioni meccaniche e misure di prevenzione previste dalla normativa.",
    file: "/dispense-sicurezza/vibrazioni-meccaniche.pdf", 
  },
  {
    slug: "sicurezza-nella-scuola",
    title: "Sicurezza nella Scuola",
    description:
      "Principi di sicurezza applicati agli ambienti scolastici, per personale docente e non docente.",
    file: "/dispense-sicurezza/sicurezza-nella-scuola.pdf", 
  },
  {
    slug: "antincendio",
    title: "Antincendio",
    description:
      "Formazione sulla prevenzione incendi, sull'uso degli estintori e sulle procedure di evacuazione.",
    file: "/dispense-sicurezza/antincendio.pdf", 
  },
  {
    slug: "videoterminali",
    title: "Videoterminali",
    description:
      "Rischi ergonomici e posturali legati all'uso prolungato dei videoterminali sul posto di lavoro.",
    file: "/dispense-sicurezza/videoterminali.pdf", 
  },
  {
    slug: "rischio-specifico",
    title: "Rischio Specifico",
    description:
      "Formazione sui rischi specifici legati alla mansione svolta, come previsto dall'accordo Stato-Regioni.",
    file: "/dispense-sicurezza/rischio-specifico.pdf", 
  },
  {
    slug: "rischio-amianto",
    title: "Rischio Amianto",
    description:
      "Normativa e procedure di sicurezza per la gestione del rischio da esposizione all'amianto.",
    file: "/dispense-sicurezza/rischio-amianto.pdf", 
  },
  {
    slug: "primo-soccorso",
    title: "Primo Soccorso",
    description:
      "Tecniche di primo intervento e gestione delle emergenze sanitarie in ambito lavorativo.",
    file: "/dispense-sicurezza/primo-soccorso.pdf", 
  },
  {
    slug: "corso-preposto",
    title: "Corso Preposto",
    description:
      "Formazione obbligatoria per la figura del preposto: compiti, responsabilità e vigilanza sulla sicurezza.",
    file: "/dispense-sicurezza/corso-preposto.pdf", 
  },
  {
    slug: "dpi",
    title: "DPI",
    description:
      "Uso corretto, manutenzione e obblighi normativi relativi ai dispositivi di protezione individuale.",
    file: "/dispense-sicurezza/dpi.pdf", 
  },
  {
    slug: "allergeni-alimentari",
    title: "Allergeni Alimentari",
    description:
      "Normativa e gestione degli allergeni nella somministrazione e preparazione di alimenti.",
    file: "/dispense-sicurezza/allergeni-alimentari.pdf", 
  },
  {
    slug: "spazi-confinati",
    title: "Spazi Confinati",
    description:
      "Procedure di sicurezza per l'accesso e il lavoro in ambienti sospetti di inquinamento o confinati.",
    file: "/dispense-sicurezza/spazi-confinati.pdf", 
  },
  {
    slug: "recupero-infortunato",
    title: "Recupero dell'infortunato",
    description:
      "Tecniche e procedure per il recupero in sicurezza di un lavoratore infortunato in quota o in spazi confinati.",
    file: "/dispense-sicurezza/recupero-infortunato.pdf", 
  },
  {
    slug: "rls",
    title: "R.L.S.",
    description:
      "Formazione per il Rappresentante dei Lavoratori per la Sicurezza: ruolo, compiti e prerogative.",
    file: "/dispense-sicurezza/rls.pdf", 
  },
  {
    slug: "rischi-di-cantiere",
    title: "Rischi di Cantiere",
    description:
      "Individuazione e gestione dei principali rischi presenti nei cantieri temporanei o mobili.",
    file: "/dispense-sicurezza/rischi-di-cantiere.pdf", 
  },
  {
    slug: "fitosanitari",
    title: "Fitosanitari",
    description:
      "Formazione per l'utilizzo, la manipolazione e lo stoccaggio in sicurezza dei prodotti fitosanitari.",
    file: "/dispense-sicurezza/fitosanitari.pdf", 
  },
  {
    slug: "ponteggi",
    title: "Ponteggi",
    description:
      "Formazione per il montaggio, smontaggio e trasformazione di ponteggi in sicurezza.",
    file: "/dispense-sicurezza/ponteggi.pdf", 
  },
  {
    slug: "lavori-in-quota",
    title: "Lavori in Quota",
    description:
      "Procedure e dispositivi di sicurezza per l'esecuzione di lavori in quota.",
    file: "/dispense-sicurezza/lavori-in-quota.pdf", 
  },
  {
    slug: "corso-alimentaristi",
    title: "Corso Alimentaristi",
    description:
      "Formazione obbligatoria in materia di igiene alimentare per chi opera nel settore alimentare.",
    file: "/dispense-sicurezza/corso-alimentaristi.pdf", 
  },
  {
    slug: "preposto-di-cantiere",
    title: "Preposto di Cantiere",
    description:
      "Formazione specifica per il ruolo di preposto all'interno dei cantieri edili.",
    file: "/dispense-sicurezza/preposto-di-cantiere.pdf",
  },
  
  {
    slug: "formazione-base-lavoratori",
    title: "Formazione Base Lavoratori",
    description:
      "Modulo di formazione generale obbligatoria per tutti i lavoratori, ai sensi dell'accordo Stato-Regioni.",
    file: "/dispense-sicurezza/formazione-base-lavoratori.pdf", 
  },
  {
    slug: "attrezzature-da-cantiere",
    title: "Attrezzature da Cantiere",
    description:
      "Uso in sicurezza delle principali attrezzature e macchine impiegate nei cantieri edili.",
    file: "/dispense-sicurezza/attrezzature-da-cantiere.pdf",
  },
  {
    slug: "aggiornamento-logistica",
    title: "Aggiornamento Logistica",
    description:
      "Corso di aggiornamento per operatori del settore logistico e della movimentazione merci.",
    file: "/dispense-sicurezza/aggiornamento-logistica.pdf",
  },
  {
    slug: "addetti-carrelli-elevatori",
    title: "Addetti carichi con carrelli elevatori",
    description:
      "Formazione per la conduzione in sicurezza dei carrelli elevatori semoventi con conducente a bordo.",
    file: "/dispense-sicurezza/addetti-carrelli-elevatori.pdf",
  },
];