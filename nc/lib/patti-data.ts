/**
 * lib/patti-data.ts
 *
 * Elenco dei patti federativi / protocolli di intesa sottoscritti dalla
 * Confederazione. Per ogni patto, `previewImages` sono le pagine
 * scansionate del documento, in ordine — mettile in:
 *
 *   public/patti/<slug>/1.jpg
 *   public/patti/<slug>/2.jpg
 *   ...
 *
 * Nessun PDF da collegare: la card apre solo l'anteprima sfogliabile.
 */

export interface PattoFederativo {
  slug: string;
  partner: string;
  title: string;
  date: string;
  description: string;
  previewImages: string[];
}

export const PATTI_FEDERATIVI: PattoFederativo[] = [
  {
    slug: "ciu",
    partner: "CIU",
    title: "CIU — Confederazione Italiana di Unione delle Professioni Intellettuali",
    date: "16 maggio 2018",
    description:
      "Protocollo di accordo politico tra CIU ed ES.A.AR.CO.: la Confederazione rinnova la propria adesione alla CIU, con l'obiettivo comune di sviluppare percorsi di formazione professionale continua a beneficio di quadri, professionisti, piccole e microimprese.",
    previewImages: [
      "/patti/pag1.png",
      "/patti/pag2.png",
      "/patti/pag3.png",
    ],
  },
];