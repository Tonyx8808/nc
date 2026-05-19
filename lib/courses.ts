export type CourseKey =
  | "eipass-it"
  | "inglese-qcer"
  | "orientamento-cfu"
  | "animatore-digitale"
  | "corso-lim"
  | "corso-tablet"
  | "cybercrimes"
  | "didattica-digitale-integrata"
  | "eipass-7-moduli"
  | "eipass-dpo"
  | "eipass-progressive"
  | "eipass-sanita-digitale"
  | "informatica-giuridica"
  | "it-security"
  | "social-media-manager";

export const courseCatalog: Record<
  CourseKey,
  { title: string; description: string; price: string; category: string }
> = {
  "eipass-it": {
    title: "EIPASS Certificazione IT",
    description: "Corso di competenze digitali riconosciuto per il mondo del lavoro e la scuola.",
    category: "Informatica e Competenze Digitali",
    price: "€ 129,00",
  },
  "inglese-qcer": {
    title: "Corsi di Lingua Inglese B1 - B2 - C1 - C2",
    description: "Percorso di lingua inglese con più varianti per tutti i livelli QCER.",
    category: "Lingue Straniere",
    price: "€ 300,00",
  },
  "orientamento-cfu": {
    title: "Orientamento CFU & Piano Studi",
    description: "Analisi del piano di studi e supporto alla convalida CFU per le università partner.",
    category: "Orientamento & Valutazione CFU",
    price: "€ 99,00",
  },
  "animatore-digitale": {
    title: "Animatore Digitale 4.0",
    description: "Formazione per le competenze digitali e l'animazione multimediale.",
    category: "Informatica e Competenze Digitali",
    price: "€ 129,00",
  },
  "corso-lim": {
    title: "Corso LIM",
    description: "Formazione per l'uso della lavagna interattiva multimediale nella didattica.",
    category: "Informatica e Competenze Digitali",
    price: "€ 129,00",
  },
  "corso-tablet": {
    title: "Corso Tablet",
    description: "Uso del tablet come strumento digitale per la didattica e il lavoro.",
    category: "Informatica e Competenze Digitali",
    price: "€ 129,00",
  },
  "cybercrimes": {
    title: "Cybercrimes",
    description: "Introduzione alla sicurezza informatica e alle principali minacce digitali.",
    category: "Informatica e Competenze Digitali",
    price: "€ 129,00",
  },
  "didattica-digitale-integrata": {
    title: "Didattica Digitale Integrata",
    description: "Strategie per integrare strumenti digitali nei percorsi formativi.",
    category: "Informatica e Competenze Digitali",
    price: "€ 129,00",
  },
  "eipass-7-moduli": {
    title: "EIPASS 7 Moduli",
    description: "Certificazione EIPASS completa in 7 moduli per competenze digitali trasversali.",
    category: "Informatica e Competenze Digitali",
    price: "€ 244,00",
  },
  "eipass-dpo": {
    title: "EIPASS DPO",
    description: "Formazione per il ruolo di Data Protection Officer.",
    category: "Informatica e Competenze Digitali",
    price: "€ 244,00",
  },
  "eipass-progressive": {
    title: "EIPASS Progressive",
    description: "Percorso EIPASS progressivo per avanzare nelle competenze digitali.",
    category: "Informatica e Competenze Digitali",
    price: "€ 244,00",
  },
  "eipass-sanita-digitale": {
    title: "EIPASS Sanità Digitale",
    description: "Competenze digitali specifiche per il settore sanitario.",
    category: "Informatica e Competenze Digitali",
    price: "€ 244,00",
  },
  "informatica-giuridica": {
    title: "Informatica Giuridica",
    description: "Formazione sulle applicazioni digitali in ambito giuridico.",
    category: "Informatica e Competenze Digitali",
    price: "€ 129,00",
  },
  "it-security": {
    title: "IT Security Personale ATA",
    description: "Sicurezza informatica per il personale ATA e l'ambiente scolastico.",
    category: "Informatica e Competenze Digitali",
    price: "€ 129,00",
  },
  "social-media-manager": {
    title: "Social Media Manager",
    description: "Formazione per gestire professionalmente i canali social.",
    category: "Informatica e Competenze Digitali",
    price: "€ 129,00",
  },
};
