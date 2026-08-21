/**
 * lib/dispense-data.ts
 *
 * Elenco delle dispense scaricabili. Ogni voce corrisponde a un file che
 * dovrai caricare in `public/dispense/`.
 *
 * `file` è il percorso pubblico del PDF: se lo carichi come
 * `public/dispense/tecnico-suono.pdf`, il valore resta `/dispense/tecnico-suono.pdf`
 * (la cartella `public` non va scritta nel percorso).
 */

export interface Dispensa {
  slug: string;
  title: string;
  description: string;
  file: string;
}

export const DISPENSE: Dispensa[] = [
  {
    slug: "agente-immobiliare",
    title: "Agente immobiliare",
    description:
      "Percorso formativo per la figura professionale dell'agente immobiliare: normativa, mediazione e gestione delle compravendite.",
    file: "/dispense/agente-immobiliare.pdf",
  },
  {
    slug: "coordinatore-amministrativo",
    title: "Coordinatore amministrativo",
    description:
      "Materiali per la gestione e il coordinamento amministrativo di strutture e servizi.",
    file: "/dispense/coordinatore-amministrativo.pdf",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Strategie e strumenti di marketing digitale: posizionamento, campagne online e analisi dei risultati.",
    file: "/dispense/digital-marketing.pdf",
  },
  {
    slug: "addetto-giardinaggio",
    title: "Addetto al giardinaggio",
    description:
      "Nozioni tecniche e pratiche per la cura del verde, la potatura e la manutenzione dei giardini.",
    file: "/dispense/addetto-giardinaggio.pdf",
  },
  {
    slug: "alfabetizzazione-digitale",
    title: "Alfabetizzazione digitale",
    description:
      "Competenze digitali di base per un utilizzo consapevole e sicuro degli strumenti informatici.",
    file: "/dispense/alfabetizzazione-digitale.pdf",
  },
  {
    slug: "c2",
    title: "Dispensa Inglese livello C2",
    description:
      "Materiale didattico avanzato di lingua inglese per il livello C2 del QCER.",
    file: "/dispense/c2.pdf",
  },
  {
    slug: "edu-comp",
    title: "Edu-Comp",
    description:
      "Percorso formativo per la figura professionale operante in ambito educativo e comunitario.",
    file: "/dispense/edu-comp.pdf",
  },
  {
    slug: "informatica-giuridica-cybercrime",
    title: "Informatica giuridica e cybercrime",
    description:
      "Nozioni di diritto dell'informatica, tutela dei dati personali e prevenzione dei reati informatici.",
    file: "/dispense/informatica-giuridica-cybercrime.pdf",
  },
  {
    slug: "inglese",
    title: "Dispensa inglese",
    description:
      "Materiale didattico introduttivo di lingua inglese per chi parte da zero.",
    file: "/dispense/inglese.pdf",
  },
  {
    slug: "osa",
    title: "Dispensa OSA",
    description:
      "Percorso per l'operatore socio-assistenziale (OSA): cura e assistenza alla persona.",
    file: "/dispense/osa.pdf",
  },
  {
    slug: "oss",
    title: "Dispensa OSS",
    description:
      "Formazione per l'operatore socio-sanitario (OSS): assistenza alla persona in ambito sanitario e sociale.",
    file: "/dispense/oss.pdf",
  },
  {
    slug: "grafica-computerizzata",
    title: "Grafica computerizzata",
    description:
      "Introduzione alla grafica computerizzata: strumenti, tecniche e principi di composizione visiva.",
    file: "/dispense/grafica-computerizzata.pdf",
  },
  {
    slug: "haccp",
    title: "HACCP",
    description:
      "Formazione obbligatoria in materia di sicurezza alimentare e sistema di autocontrollo HACCP.",
    file: "/dispense/haccp.pdf",
  },
  {
    slug: "informatica-generale",
    title: "Informatica generale",
    description:
      "Nozioni di base sui componenti hardware, i software e il funzionamento dei sistemi informatici.",
    file: "/dispense/informatica-generale.pdf",
  },
  {
    slug: "operatore-amministrativo-contabile",
    title: "Operatore amministrativo contabile",
    description:
      "Formazione per la gestione della contabilità aziendale e delle procedure amministrative.",
    file: "/dispense/operatore-amministrativo-contabile.pdf",
  },
  {
    slug: "opi",
    title: "Dispensa OPI",
    description:
      "Formazione per l'operatore addetto all'assistenza infermieristica di base (OPI).",
    file: "/dispense/opi.pdf",
  },
  {
    slug: "receptionist",
    title: "Receptionist",
    description:
      "Percorso formativo per la figura professionale di receptionist in strutture ricettive e organizzative.",
    file: "/dispense/receptionist.pdf",
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    description:
      "Strategie, strumenti e best practice per la gestione dei social media e della comunicazione digitale.",
    file: "/dispense/social-media-manager.pdf",
  },
  {
    slug: "storia-internet-digitalizzazione",
    title: "Storia di internet e la digitalizzazione",
    description:
      "Percorso storico sull'evoluzione di internet e sul processo di digitalizzazione della società.",
    file: "/dispense/storia-internet-digitalizzazione.pdf",
  },
  {
    slug: "tecnico-audio",
    title: "Tecnico audio",
    description:
      "Competenze tecniche per l'allestimento, il funzionamento e la manutenzione di impianti audio.",
    file: "/dispense/tecnico-audio.pdf",
  },
  {
    slug: "tecnico-luci",
    title: "Tecnico luci",
    description:
      "Competenze tecniche per la progettazione e la gestione degli impianti di illuminazione live ed eventi.",
    file: "/dispense/tecnico-luci.pdf",
  },
];