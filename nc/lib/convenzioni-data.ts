/**
 * lib/convenzioni-data.ts
 *
 * Elenco delle convenzioni sottoscritte tra INPS ed ES.A.AR.CO. Stesso
 * schema di lib/patti-data.ts. `previewImages` sono le pagine scansionate
 * del documento, in ordine — mettile in:
 *
 *   public/convenzioni/<slug>/1.jpg
 *   public/convenzioni/<slug>/2.jpg
 *   ...
 *
 * Se una convenzione non ha ancora scansioni, lascia l'array vuoto: la
 * card mostrerà comunque testo e data, con un placeholder al posto
 * dell'anteprima.
 */

export interface ConvenzioneInps {
  slug: string;
  partner: string;
  title: string;
  date: string;
  description: string;
  previewImages: string[];
}

export const CONVENZIONI_INPS: ConvenzioneInps[] = [
  {
    slug: "convenzione-inps-2015",
    partner: "INPS",
    title: "Convenzione INPS — Circolare n. 47",
    date: "18 febbraio 2015",
    description:
      "La Confederazione ES.A.AR.CO. ha sottoscritto una convenzione con INPS Nazionale (Circolare n. 47) per la riscossione dei contributi di assistenza contrattuale, ai sensi della legge 4 giugno 1973 n. 311. All'ES.A.AR.CO. è attribuito il codice di nuova istituzione \"W310\".",
    previewImages: [
      "/inps/pag1.png",
      "/inps/pag2-3.png",
      "/inps/pag4-5.png",
      "/inps/pag6-7.png",
      "/inps/pag8-9.png",
      "/inps/pag10.png",
    ],
  },
];