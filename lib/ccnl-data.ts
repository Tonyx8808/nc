/**
 * lib/ccnl-data.ts
 *
 * Elenco dei CCNL scaricabili dalla pagina CCNL.
 * Ogni voce corrisponde a un file da caricare in `public/download/`.
 *
 * `file` è il percorso pubblico del PDF: se lo carichi come
 * `public/download/ccnl-acconciatura-estetica-tricologia.pdf`, il valore
 * resta `/download/ccnl-acconciatura-estetica-tricologia.pdf` (la cartella
 * `public` non va scritta nel percorso).
 */

export interface Ccnl {
  slug: string;
  title: string;
  description: string;
  file: string;
}

export const CCNL_LIST: Ccnl[] = [
  {
    slug: "acconciatura-estetica-tricologia",
    title:
      "CCNL per i dipendenti dalle imprese di acconciatura, estetica, tricologia non curativa, tatuaggio, piercing e centri benessere",
    description:
      "Contratto collettivo per il settore acconciatura, estetica e centri benessere.",
    file: "/ccnl/ccnl-acconciatura-estetica-tricologia.pdf",
  },
  {
    slug: "comunicatori-impresa",
    title: "CCNL per i dipendenti delle PMI operanti nel settore comunicatori d'impresa",
    description:
      "Contratto collettivo per le PMI del settore della comunicazione d'impresa.",
    file: "/ccnl/ccnl-comunicatori-impresa.pdf",
  },
  {
    slug: "consorzi-agrari",
    title: "CCNL per i dipendenti dei consorzi agrari",
    description:
      "Contratto collettivo per i dipendenti operanti nei consorzi agrari.",
    file: "/ccnl/ccnl-consorzi-agrari.pdf",
  },
  {
    slug: "consorzi-bonifica",
    title: "CCNL per i dipendenti dai consorzi di bonifica e di miglioramento fondiario",
    description:
      "Contratto collettivo per i consorzi di bonifica e miglioramento fondiario.",
    file: "/ccnl/ccnl-consorzi-bonifica.pdf",
  },
  {
    slug: "cooperative-consorzi-agricoli",
    title: "CCNL per i dipendenti delle cooperative e dei consorzi agricoli",
    description:
      "Contratto collettivo per le cooperative e i consorzi agricoli.",
    file: "/ccnl/ccnl-cooperative-consorzi-agricoli.pdf",
  },
  {
    slug: "sistemazione-idraulico-forestale",
    title: "CCNL per i dipendenti addetti alle attività di sistemazione idraulico forestale e idraulico agraria",
    description:
      "Contratto collettivo per le attività di sistemazione idraulico forestale e agraria.",
    file: "/ccnl/ccnl-sistemazione-idraulico-forestale.pdf",
  },
  {
    slug: "impiegati-agricoli",
    title: "CCNL per gli impiegati agricoli",
    description:
      "Contratto collettivo per gli impiegati del settore agricolo.",
    file: "/ccnl/ccnl-impiegati-agricoli.pdf",
  },
  {
    slug: "operai-agricoli-florovivaisti",
    title: "CCNL per gli operai agricoli e florovivaisti",
    description:
      "Contratto collettivo per gli operai agricoli e florovivaisti.",
    file: "/ccnl/ccnl-operai-agricoli-florovivaisti.pdf",
  },
  {
    slug: "autoscuole-consulenza-automobilistica",
    title: "CCNL per i dipendenti dalle autoscuole e dagli studi di consulenza automobilistica",
    description:
      "Contratto collettivo per autoscuole e studi di consulenza automobilistica.",
    file: "/ccnl/ccnl-autoscuole-consulenza-automobilistica.pdf",
  },
  {
    slug: "spedizione-autotrasporto-logistica",
    title: "CCNL per i dipendenti da imprese di spedizione, autotrasporto merci e logistica",
    description:
      "Contratto collettivo per il settore spedizione, autotrasporto merci e logistica.",
    file: "/ccnl/ccnl-spedizione-autotrasporto-logistica.pdf",
  },
];