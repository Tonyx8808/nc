/**
 * lib/download-data.ts
 *
 * Elenco dei documenti/modulistica scaricabili dalla pagina Download.
 * Ogni voce corrisponde a un file da caricare in `public/download/`.
 *
 * `file` è il percorso pubblico del documento: se lo carichi come
 * `public/download/registro-presenze-esaarco.doc`, il valore resta
 * `/download/registro-presenze-esaarco.doc` (la cartella `public` non va
 * scritta nel percorso).
 *
 * ATTENZIONE: non tutti i documenti sono PDF — alcuni sono .doc/.xls/.xlsx
 * originali. Il campo `file` riflette l'estensione reale del file caricato.
 */

export interface DownloadDoc {
  slug: string;
  title: string;
  description: string;
  file: string;
}

export const DOWNLOAD_DOCS: DownloadDoc[] = [
  {
    slug: "verbale-accertamento",
    title: "Verbale di accertamento ESAARCO",
    description:
      "Modulo per la verbalizzazione degli accertamenti effettuati dalla Confederazione.",
    file: "/download/verbale-accertamento-esaarco.zip",
  },
  {
    slug: "valutazione-docenti-partecipanti",
    title: "Valutazione docenti/partecipanti",
    description:
      "Scheda di valutazione a fine corso, da compilare a cura di docenti e partecipanti.",
    file: "/download/valutazione-docenti-partecipanti.zip",
  },
  {
    slug: "test-itinere-ente",
    title: "Test in itinere Ente",
    description:
      "Test di verifica intermedia da somministrare durante lo svolgimento del percorso formativo.",
    file: "/download/test-itinere-ente.zip",
  },
  {
    slug: "test-ex-post-ente",
    title: "Test ex post Ente",
    description:
      "Test di verifica finale da somministrare al termine del percorso formativo.",
    file: "/download/test-ex-post-ente.zip",
  },
  {
    slug: "registro-presenze",
    title: "Registro presenze ES.A.AR.CO.",
    description:
      "Registro ufficiale per la rilevazione delle presenze ai corsi.",
    file: "/download/registro-presenze-esaarco.zip",
  },
  {
    slug: "delibera-assistente-poltrona",
    title: "Delibera corso Assistente alla poltrona",
    description:
      "Delibera con le specifiche del corso Assistente alla poltrona con accreditamento regionale.",
    file: "/download/delibera-assistente-poltrona.zip",
  },
  {
    slug: "competenze-assistente-poltrona",
    title: "Competenze e articolazione didattica — Assistente alla poltrona",
    description:
      "Documento con le competenze in uscita e l'articolazione didattica del corso Assistente alla poltrona.",
    file: "/download/competenze-articolazione-assistente-poltrona.zip",
  },
  {
    slug: "guida-pratica-servizi",
    title: "Guida pratica ai servizi ES.A.AR.CO.",
    description:
      "Guida pratica ai servizi offerti dalla Confederazione, pensata per associati e sedi territoriali.",
    file: "/download/guida-pratica-servizi-esaarco.zip",
  },
];