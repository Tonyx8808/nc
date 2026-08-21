/**
 * lib/iscritti-data.ts
 *
 * Riepilogo nazionale iscritti alla Confederazione ES.A.AR.CO.
 * Fonte: riepilogo generale iscritti al 31/12/2017.
 */

export interface DatoIscritti {
  label: string;
  value: number;
}

export const ISCRITTI_AGGIORNATO_AL = "31/12/2017";

export const ISCRITTI_TOTALE = 113254;

export const ISCRITTI_PER_CATEGORIA: DatoIscritti[] = [
  { label: "Edilizia", value: 26755 },
  { label: "Agricoltura", value: 17703 },
  { label: "PMI", value: 14160 },
  { label: "Commercio", value: 10900 },
  { label: "Trasporti", value: 8031 },
  { label: "Servizi", value: 7429 },
  { label: "Sanità", value: 6160 },
  { label: "Ag. Interinali", value: 5112 },
  { label: "Chimica", value: 4106 },
  { label: "Ristorazione", value: 3334 },
  { label: "Studi professionali", value: 3047 },
  { label: "Informatica", value: 1692 },
  { label: "Installazione impianti", value: 1833 },
  { label: "Scuola e formazione", value: 1131 },
  { label: "Vigilanza", value: 926 },
  { label: "Turismo", value: 661 },
  { label: "Servizi finanziari", value: 274 },
];

export const ISCRITTI_PER_REGIONE: DatoIscritti[] = [
  { label: "Campania", value: 16594 },
  { label: "Lombardia", value: 16355 },
  { label: "Sicilia", value: 12260 },
  { label: "Lazio", value: 11405 },
  { label: "Calabria", value: 9609 },
  { label: "Puglia", value: 7849 },
  { label: "Emilia Romagna", value: 5575 },
  { label: "Veneto", value: 5561 },
  { label: "Abruzzo", value: 5162 },
  { label: "Sardegna", value: 4812 },
  { label: "Toscana", value: 4468 },
  { label: "Piemonte", value: 3583 },
  { label: "Basilicata", value: 3204 },
  { label: "Umbria", value: 1216 },
  { label: "Friuli Venezia Giulia", value: 1368 },
  { label: "Marche", value: 1376 },
  { label: "Molise", value: 974 },
  { label: "Trentino Alto Adige", value: 667 },
  { label: "Liguria", value: 1099 },
  { label: "Valle d'Aosta", value: 117 },
];