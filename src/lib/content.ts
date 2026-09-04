export const siteConfig = {
  name: "School Academy",
  tagline: "Tremplin vers l'excellence",
  description:
    "École privée marocaine du préscolaire au lycée, centre agréé Cambridge Assessment English. School Academy prépare chaque élève à comprendre et à bâtir le monde de demain.",
  url: "https://www.schoolacademy.ma",
  email: "contact@schoolacademy.ma",
  year: "2026/2027",
  locale: "fr_MA",
  social: {
    facebook: "https://www.facebook.com/schoolacademyofficiel/",
    instagram: "https://www.instagram.com/schoolacademy_eljadida/",
    youtube: "https://www.youtube.com/channel/UCL_GLvGCWhMe-vXywkw2szg",
  },
  portalUrl: "https://www.myconnect.school/?ecole=11816199",
  address: "Angle rue 32, Bd Jabran Khalil Jabran, 24 000 El Jadida",
  phones: ["05 23 34 34 96", "05 23 34 34 97", "06 61 84 76 65"],
  mapUrl:
    "https://www.google.com/maps?q=School+Academy,33.2325126,-8.5302678&z=16&output=embed",
  mapLink:
    "https://www.google.com/maps/place/School+Academy/@33.2325171,-8.5280791,17z/data=!3m1!4b1!4m5!3m4!1s0xda91e80579034f1:0x52803a1b9695df4d!8m2!3d33.2325126!4d-8.5302678",
};

export const mainNav = [
  { label: "Présentation", href: "/presentation" },
  { label: "Pédagogie", href: "/pedagogie" },
  { label: "Vie scolaire", href: "/vie-scolaire" },
  { label: "Cambridge", href: "/cambridge" },
  { label: "Recrutement", href: "/recrutement" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  {
    title: "Présentation",
    links: [
      { label: "Mot des fondateurs", href: "/presentation#fondateurs" },
      { label: "Missions et valeurs", href: "/presentation#missions" },
      { label: "Concept", href: "/presentation#concept" },
      { label: "Charte", href: "/presentation#charte" },
    ],
  },
  {
    title: "Pédagogie",
    links: [
      { label: "TICE", href: "/pedagogie#tice" },
      { label: "Orientation", href: "/pedagogie#orientation" },
      { label: "Cycles d'enseignement", href: "/pedagogie#cycles" },
      { label: "Projet d'établissement", href: "/pedagogie#projet" },
      { label: "Jumelage international", href: "/pedagogie#jumelage" },
    ],
  },
  {
    title: "Vie scolaire",
    links: [
      { label: "Ma cantine", href: "/vie-scolaire#cantine" },
      { label: "BCD", href: "/vie-scolaire#bcd" },
      { label: "Associations sportives", href: "/vie-scolaire#sport" },
      { label: "Fournitures scolaires", href: "/vie-scolaire#fournitures" },
      { label: "Activités & loisirs", href: "/vie-scolaire#activites" },
    ],
  },
  {
    title: "École",
    links: [
      { label: "Cambridge Assessment", href: "/cambridge" },
      { label: "Recrutement", href: "/recrutement" },
      { label: "Contact", href: "/contact" },
      { label: "Inscription 2026/2027", href: "/inscription" },
      { label: "Espace parents (ENT)", href: "https://www.myconnect.school/?ecole=11816199" },
    ],
  },
] as const;

export const cycles = [
  {
    slug: "prescolaire",
    label: "Cycle Préscolaire",
    short: "Préscolaire",
    age: "3 – 5 ans",
    description:
      "Communément appelé « la Maternelle », le préscolaire est le premier contact de l'enfant avec l'école : il y découvre un monde interactif aux côtés de nouveaux camarades, éducatrices, espaces et activités à connotation ludique, à travers les niveaux Petite, Moyenne et Grande sections.",
    highlights: [
      "Petite, Moyenne et Grande sections",
      "Éveil sensoriel, langage et psychomotricité",
      "Premiers repères en français, arabe et anglais",
    ],
  },
  {
    slug: "primaire",
    label: "Cycle Primaire",
    short: "Primaire",
    age: "6 – 11 ans",
    description:
      "Composé de six niveaux, le cycle primaire confronte l'apprenant à un véritable système d'évaluation (test diagnostique, contrôles continus et suivi pédagogique rapproché) pour consolider les fondamentaux et accompagner les familles à chaque étape.",
    highlights: [
      "6 niveaux, de CE1 à CE6",
      "Test diagnostique et suivi pédagogique continu",
      "Renforcement précoce de l'anglais et du numérique",
    ],
  },
  {
    slug: "college",
    label: "Cycle Collège",
    short: "Collège",
    age: "12 – 14 ans",
    description:
      "Passage déterminant du cursus, le collège prend en compte les transformations physiques et cognitives de l'adolescent. Chaque matière y est enseignée par un professeur spécialisé, dans un programme à coefficients qui exige un suivi méthodique, à l'école comme à la maison.",
    highlights: [
      "Enseignement CIOF habilité par le MEN",
      "Un professeur spécialisé par matière",
      "Séances d'orientation en fin de cycle",
    ],
  },
  {
    slug: "lycee",
    label: "Cycle Lycée",
    short: "Lycée",
    age: "15 – 18 ans",
    description:
      "Orienté vers l'acquisition des savoirs nécessaires au passage des examens nationaux, le cycle Lycée conjugue travail régulier et pics d'efforts ciblés sur les périodes d'examen, avec des séances d'orientation et de réorientation et des visites d'écoles supérieures.",
    highlights: [
      "Enseignement BIOF habilité par le MEN",
      "Branches Sciences Math, Sc. Exp. et Économie",
      "Visites d'écoles supérieures et réorientation",
    ],
  },
] as const;

export type CycleScheduleRow = {
  label: string;
  hours: (number | string)[];
};

export type CycleSchedule = {
  subjects: string[];
  levels: CycleScheduleRow[];
};

export const cycleSchedules: Record<string, CycleSchedule> = {
  prescolaire: {
    subjects: [
      "Français",
      "Anglais",
      "Arabe",
      "E.I",
      "Art. P",
      "Théâtre",
      "TM",
      "Sport",
      "Psychomotricité",
      "Total H/N",
    ],
    levels: [
      { label: "Petite Section", hours: [22, 2, "-", 1, 1, 1, 1, 2, 2, 32] },
      { label: "Moyenne Section", hours: [10, 3, 10, 2, 1, 1, 1, 2, 2, 32] },
      { label: "Grande Section", hours: [10, 3, 10, 2, 1, 1, 1, 2, 2, 32] },
    ],
  },
  primaire: {
    subjects: [
      "Français",
      "Arabe",
      "Anglais",
      "Maths",
      "Ev/SVT",
      "E.I",
      "Théâtre",
      "Sport",
      "Art. P",
      "Info",
      "Total H/N",
    ],
    levels: [
      { label: "CE1", hours: [9, 9, 3, 7, 2, 1, 1, 2, 1, 1, 32] },
      { label: "CE2", hours: [9, 9, 3, 7, 2, 1, 1, 2, 1, 1, 32] },
      { label: "CE3", hours: [9, 9, 3, 7, 2, 1, 1, 2, 1, 1, 32] },
      { label: "CE4", hours: [9, 9, 3, 7, 2, 1, 1, 2, 1, 1, 32] },
      { label: "CE5", hours: [9, 9, 3, 7, 2, 1, 1, 2, 1, 1, 32] },
      { label: "CE6", hours: [9, 9, 3, 7, 2, 1, 1, 2, 1, 1, 32] },
    ],
  },
  college: {
    subjects: [
      "Français",
      "Arabe",
      "Anglais",
      "E.I",
      "HG",
      "Maths",
      "SVT",
      "PC",
      "Info",
      "Art. P",
      "Sport",
      "Total H/N",
    ],
    levels: [
      { label: "1ASC", hours: [6, 5, 3, 2, 3, 6, 4, 3, 2, 1, 2, 37] },
      { label: "2ASC", hours: [6, 5, 3, 2, 3, 6, 4, 3, 2, 1, 2, 37] },
      { label: "3ASC", hours: [6, 5, 3, 2, 3, 6, 4, 3, 2, 1, 2, 37] },
    ],
  },
  lycee: {
    subjects: [
      "Français",
      "Arabe",
      "Anglais",
      "E.I",
      "HG",
      "Maths",
      "PC",
      "SVT",
      "Info",
      "Philo.",
      "Sport",
      "Eco",
      "Total H/N",
    ],
    levels: [
      { label: "TC", hours: [6, 2, 4, 2, 2, 6, 4, 4, 2, 2, 2, "-", 36] },
      { label: "1Bac S.M", hours: [6, 2, 4, 2, 2, 8, 6, 2, "-", 2, 2, "-", 36] },
      { label: "1Bac S.Ex", hours: [6, 2, 4, 2, 2, 6, 6, 4, "-", 2, 2, "-", 36] },
      { label: "1Bac S.Eco", hours: [6, 2, 4, 2, 2, 4, "-", "-", 1, 2, 2, 11, 36] },
      { label: "2Bac S.M", hours: [6, 2, 4, 2, "-", 8, 6, 4, "-", 2, 2, "-", 36] },
      { label: "2Bac S.Ph", hours: [6, 2, 4, 2, "-", 6, 6, 6, "-", 2, 2, "-", 36] },
      { label: "2Bac S.Eco", hours: [4, 2, 4, 2, 2, 4, "-", "-", 1, 2, 2, 13, 36] },
    ],
  },
};

export const pedagogieSections = [
  {
    id: "tice",
    title: "TICE",
    subtitle: "Technologies de l'information et de la communication",
    text: "School Academy se veut un établissement précurseur en matière de Technologies de l'Information et de la Communication pour l'Enseignement (TICE). Toutes les classes sont équipées de Tableaux Blancs Interactifs (TBI) de marque premium. Et ce n'est qu'un début : un plan de restructuration du cycle maternelle est actuellement à l'étude pour l'acquisition de tables interactives et de cartables numériques (sous forme de tablettes) pour les cycles supérieurs.",
  },
  {
    id: "orientation",
    title: "Orientation",
    subtitle: "Un accompagnement construit dans la durée",
    text: "Notre établissement accompagne ses élèves tout au long de leur scolarité. Dès la 3ème année collégiale, des rencontres sont organisées entre élèves, parents, inspecteurs et conseillers d'orientation, un suivi qui se poursuit au lycée, en Tronc Commun puis en 1ère et 2ème année Baccalauréat. Au lycée, seules les branches scientifiques (Sciences Mathématiques, Sciences Expérimentales option Physique-Chimie) et technique (Économie) sont proposées.",
  },
  {
    id: "projet",
    title: "Projet d'établissement",
    subtitle: "Multiplicité, diversité, construction",
    text: "Le projet d'établissement vise l'atteinte d'objectifs pédagogiques et civiques, en mobilisant toute la communauté éducative autour d'une ambition commune : donner à chaque élève les moyens de réussir et de s'épanouir.",
  },
  {
    id: "jumelage",
    title: "Jumelage à l'international",
    subtitle: "Ouvrir les élèves sur le monde",
    text: "School Academy est fière de porter les couleurs du Maroc à l'international. Un jumelage a été noué avec l'établissement Ernest Gabard, à Jurançon près de Pau (France), à travers lequel les deux établissements mènent des échanges culturels et éducatifs. Le processus se concrétise par le voyage de nos élèves au sein de l'établissement partenaire, pour un séjour éducatif, ludique et linguistique accompagné par des cadres de leur établissement.",
  },
  {
    id: "rencontres",
    title: "Rencontre parents / profs",
    subtitle: "Un dialogue régulier et transparent",
    text: "La communication est la base d'une bonne relation entre parents, établissement et professeurs. Après l'évaluation diagnostique, une rencontre parents-professeurs est organisée pour discuter de la méthodologie adaptée à l'année scolaire. Les parents restent par ailleurs libres de prendre rendez-vous à tout moment pour échanger plus longuement sur les difficultés rencontrées par leur enfant.",
  },
] as const;

export const projetQuote = {
  text: "« L'école est un lieu de réussite et d'épanouissement pour tous ; un lieu d'éveil à l'envie et au plaisir d'apprendre, à la curiosité intellectuelle, à l'ouverture d'esprit, un lieu où il soit possible d'apprendre et d'enseigner dans de bonnes conditions ; un lieu permettant de former des citoyens. »",
  source:
    "Extrait de la loi d'orientation et de programmation pour la refondation de l'école de la République française",
};

export const projetConcepts = [
  {
    id: "multiplicite",
    title: "Multiplicité",
    text: "La multiplicité des espaces que notre établissement peut offrir : grâce à son grand espace, plusieurs salles et lieux spécialisés répondent à toutes les envies périscolaires qui contribuent au développement de nos enfants.",
    items: [
      "Salles de classe équipées de tableaux interactifs",
      "Laboratoires scientifiques",
      "Laboratoires de préparation",
      "Centre médiathèque",
      "Salles d'éveil et de réflexologie",
      "Salles d'activités préscolaires",
      "Terrain de basket / hand / volley-ball",
      "Terrain de football",
      "Piscine chauffée",
      "Espace danse / gymnastique",
      "Tatami de judo / aïkido",
      "Murs d'escalade",
      "Mosquée",
      "Salle de théâtre / musique",
      "Cantine / réfectoire",
    ],
  },
  {
    id: "diversite",
    title: "Diversité",
    text: "La diversification des méthodes d'enseignement fait partie de notre stratégie : à la méthode classique s'ajoutent des outils didactiques modernes, les tableaux interactifs présents dans toutes les classes, l'enseignement par l'environnement (qui confronte les enfants à leur environnement extérieur) et le Serious Game, une animation ludique du cours particulièrement appréciée des élèves.",
    items: [],
  },
  {
    id: "construction",
    title: "Construction",
    text: "La construction de la personne de l'enfant est au cœur de nos intérêts. Au-delà de la transmission d'un savoir, il s'agit d'édifier une personnalité : posture, prestance, confiance en soi, politesse, franc-parler, culture générale, fluidité du langage.",
    items: [],
  },
] as const;

export const projetAxes = [
  {
    title: "La vie de l'enfant, à l'école et à l'extérieur",
    text: "Favoriser l'environnement macro de l'enfant : un cadre propice à l'apprentissage, un flux d'information constant avec les parents, une exposition régulée aux milieux à risque et un équilibre entre travail, jeux, repos et réflexion.",
  },
  {
    title: "Amélioration constante des résultats",
    text: "Une progression régulière du préscolaire au lycée, des objectifs quantifiés et un suivi méthodique de la validation des compétences acquises.",
  },
  {
    title: "Prévention et remédiation",
    text: "Prendre en compte le rythme de chaque élève, accompagner son parcours et apporter un accompagnement personnalisé et préventif face aux difficultés rencontrées.",
  },
  {
    title: "Développer toutes les souches",
    text: "Cultures, arts, sport et vie sociale : développer les capacités et le potentiel de chaque enfant, éveiller sa fibre artistique et sa contribution civique.",
  },
] as const;

export const espaceScolaire = [
  {
    id: "cantine",
    title: "Ma Cantine",
    text: "Fière de son expérience en restauration collective, l'établissement place le respect des normes HACCP à la tête de ses priorités et ne collabore qu'avec des fournisseurs agréés et certifiés par les services d'hygiène. L'équipe est régulièrement testée et les plats prélevés en échantillon pour analyse, aux côtés d'un équipement de cuisine professionnel nettoyé quotidiennement, un « sans faute » sanitaire maintenu depuis toujours.",
    facts: [
      { label: "Capacité d'accueil", value: "450 élèves / service" },
      { label: "Organisation", value: "Cycles de 45 minutes" },
      { label: "Encadrement", value: "Professeurs et administration présents" },
    ],
    image: "/images/cantine.png",
  },
  {
    id: "bcd",
    title: "BCD",
    text: "La Bibliothèque-Centre de Documentation est un espace où nos élèves partagent des moments de lecture, de recherche, d'étude complémentaire ou de préparation de présentations et de projets de classe. Équipée d'un tableau interactif, de manuels, romans, ouvrages et ressources numériques, elle est accessible à tous les élèves selon leur emploi du temps ou leurs heures creuses.",
    image: "/images/bcd.webp",
  },
  {
    id: "theatre",
    title: "Mon théâtre",
    text: "School Academy dispose d'un théâtre bâti selon des normes audiovisuelles et acoustiques, avec une scène, des coulisses, une régie technique et une salle de 140 places, extensible si nécessaire. Matière d'éveil à part entière du programme, le théâtre permet aux élèves de se défouler, de prendre la parole en public et d'améliorer leur élocution.",
    image: "/images/theatre.webp",
  },
  {
    id: "laboratoires",
    title: "Laboratoires de préparation",
    text: "En complément des laboratoires scientifiques où nos élèves suivent les cours et réalisent leurs expériences, l'établissement dispose, conformément aux normes de sécurité, de laboratoires de préparation : un espace pensé pour que nos professeurs préparent leurs expériences en amont de leur rencontre avec les élèves.",
    image: "/images/laboratoire.webp",
  },
  {
    id: "sport",
    title: "Associations sportives",
    text: "Au-delà des apprentissages scolaires, School Academy se veut une seconde adresse pour ses élèves, où les activités sportives extrascolaires se pratiquent gratuitement après les cours, au sein même de l'établissement et encadrées par leurs propres professeurs. Football (gazon artificiel), basketball, volleyball et handball (terrain Tarket), natation (piscine couverte chauffée de plus de 300 m³), acrogym, aïkido (tatami en mousse) et escalade (mur de 20 m² pour 6,3 m de hauteur) sont au programme.",
    image: "/images/piscine.webp",
  },
  {
    id: "fournitures",
    title: "Mes fournitures scolaires",
    text: "Notre établissement travaille avec les plus grandes maisons d'édition du royaume, elles-mêmes en partenariat avec les organismes internationaux les plus réputés du secteur.",
  },
] as const;

export const fournituresSuppliers = [
  { name: "Librairie IQRAE", url: "https://m.facebook.com/people/Librairie-IQRAE/100080470773255" },
  { name: "PAP AMSTERDAM", url: "https://www.facebook.com/PAPAMSTERDAM" },
] as const;

export const fournituresLevels = [
  { label: "Petite Section", file: "petite-section" },
  { label: "Moyenne Section", file: "moyenne-section" },
  { label: "Grande Section", file: "grande-section" },
  { label: "CE1", file: "ce1" },
  { label: "CE2", file: "ce2" },
  { label: "CE3", file: "ce3" },
  { label: "CE4", file: "ce4" },
  { label: "CE5", file: "ce5" },
  { label: "CE6", file: "ce6" },
  { label: "1ère CIOF", file: "1ere-ciof" },
  { label: "2ème CIOF", file: "2eme-ciof" },
  { label: "3ème CIOF", file: "3eme-ciof" },
  { label: "Tronc Commun", file: "tronc-commun" },
  { label: "1ère Bac Sc Éco", file: "1bac-sc-eco" },
  { label: "1ère Bac Sc Exp", file: "1bac-sc-exp" },
  { label: "1ère Bac Sc Maths", file: "1bac-sc-maths" },
  { label: "2ème Bac Sc Éco", file: "2bac-sc-eco" },
  { label: "2ème Bac Sc Maths A", file: "2bac-sc-maths" },
  { label: "2ème Bac Sc Physique", file: "2bac-sc-physique" },
] as const;

export const niveauxScolaires = fournituresLevels.map((l) => l.label);

export const filieresLycee = [
  "Sciences Mathématiques",
  "Sciences Expérimentales",
  "Économie",
] as const;

export const affiliationsTuteur = ["Père", "Mère", "Tuteur légal", "Autre"] as const;

export const activites = [
  {
    title: "Clubs sportifs",
    text: "Football, basketball, arts martiaux et plus encore : des clubs encadrés qui prolongent l'apprentissage au-delà de la salle de classe.",
  },
  {
    title: "Sorties scolaires",
    text: "Des sorties pédagogiques qui ancrent les apprentissages dans le réel et élargissent l'horizon culturel des élèves.",
  },
  {
    title: "Carnaval / Kermesse",
    text: "Des temps forts festifs et fédérateurs, pensés pour réunir élèves, familles et équipe pédagogique.",
  },
  {
    title: "Fêtes religieuses",
    text: "La célébration des repères religieux et culturels qui rythment l'année, dans le respect des traditions.",
  },
  {
    title: "Parrainage et soutien",
    text: "Des dispositifs d'entraide entre élèves qui renforcent la solidarité et l'esprit de communauté.",
  },
  {
    title: "Activités thématiques",
    text: "Des projets pédagogiques ponctuels qui explorent un thème en profondeur, de façon transversale et collaborative.",
  },
  {
    title: "Visites et activités ludiques",
    text: "Apprendre en s'amusant, à travers des visites et ateliers pensés pour chaque tranche d'âge.",
  },
  {
    title: "Journées nationales et internationales",
    text: "La célébration des grandes dates nationales et internationales, pour cultiver la mémoire collective et l'ouverture au monde.",
  },
  {
    title: "Donation",
    text: "Des actions solidaires portées par l'école pour sensibiliser les élèves à l'engagement citoyen.",
  },
] as const;

export const cambridgeLevels = [
  {
    code: "YLE Starters",
    audience: "6 – 8 ans",
    text: "Le premier des trois examens Cambridge English: YLE. Il encourage l'enfant à apprendre l'anglais écrit et parlé de tous les jours, dès le plus jeune âge, et à développer une attitude positive envers les tests de langue.",
    details:
      "Généralement âgés de 7 à 8 ans, les enfants ont suivi environ 100 heures de cours d'anglais. Il leur est demandé de connaître les couleurs, de répondre à des questions simples sur eux-mêmes et d'écrire de courtes réponses.",
    duration: "45 minutes",
    sections: [
      { label: "Listening", time: "20 min" },
      { label: "Reading & Writing", time: "20 min" },
      { label: "Speaking", time: "3 – 5 min" },
    ],
    image: "/images/cambridge/starters.webp",
  },
  {
    code: "YLE Movers",
    audience: "7 – 10 ans",
    text: "Le second des trois examens Cambridge English: YLE, niveau A1 du Cadre européen commun. Il encourage l'enfant à communiquer en anglais dans des situations de la vie réelle.",
    details:
      "Généralement âgés de 8 à 11 ans, les enfants ont étudié environ 175 heures de cours d'anglais. Il leur est demandé de comprendre des instructions basiques, de remplir une fiche d'informations personnelles et de reconnaître des mots simples à l'oral comme à l'écrit.",
    duration: "60 minutes",
    sections: [
      { label: "Listening", time: "25 min" },
      { label: "Reading & Writing", time: "30 min" },
      { label: "Speaking", time: "5 – 7 min" },
    ],
    image: "/images/cambridge/movers.webp",
  },
  {
    code: "YLE Flyers",
    audience: "8 – 12 ans",
    text: "Le plus élevé des trois examens Cambridge English: YLE, niveau A2 du Cadre européen commun. Il démontre la maîtrise de l'anglais écrit et parlé de tous les jours à un niveau élémentaire.",
    details:
      "Généralement âgés de 9 à 12 ans, les enfants ont étudié l'anglais pendant deux à trois ans, soit environ 250 heures de cours. Il leur est demandé d'expliquer des différences entre deux images, de raconter une courte histoire et d'utiliser des phrases au passé.",
    duration: "75 minutes",
    sections: [
      { label: "Listening", time: "25 min" },
      { label: "Reading & Writing", time: "40 min" },
      { label: "Speaking", time: "7 – 9 min" },
    ],
    image: "/images/cambridge/flyers.webp",
  },
  {
    code: "KET",
    audience: "Key English Test",
    text: "L'examen qui teste le niveau général le plus élémentaire (niveau A2 du Cadre européen commun). Sa réussite montre une bonne base pour utiliser l'anglais dans des situations simples.",
    details:
      "Dans sa version KET for Schools, les thèmes sont adaptés aux centres d'intérêt des élèves du secondaire. Il est demandé de poser et répondre à des questions personnelles, de comprendre des annonces énoncées lentement et d'exprimer une opinion sur un contenu lu ou entendu.",
    duration: "≈ 2h10",
    sections: [
      { label: "Reading & Writing", time: "1h10 · 50 %" },
      { label: "Listening", time: "30 min · 25 %" },
      { label: "Speaking", time: "8 – 10 min · 25 %" },
    ],
    image: "/images/cambridge/ket.webp",
  },
  {
    code: "PET",
    audience: "Preliminary English Test",
    text: "Un niveau intermédiaire (B1 du Cadre européen commun) qui démontre la capacité à communiquer en anglais dans les situations pratiques de la vie quotidienne, d'excellentes bases pour un futur diplôme professionnel.",
    details:
      "Dans sa version PET for Schools, les thèmes sont adaptés aux centres d'intérêt des élèves du secondaire. Il est demandé d'exprimer ses goûts et préférences, de comprendre des annonces orales et écrites et de rédiger une lettre personnelle ou de prendre des notes.",
    duration: "≈ 2h30",
    sections: [
      { label: "Reading & Writing", time: "1h30 · 50 %" },
      { label: "Listening", time: "30 min · 25 %" },
      { label: "Speaking", time: "10 – 12 min · 25 %" },
    ],
    image: "/images/cambridge/pet.webp",
  },
] as const;

export const recrutementDomains = [
  {
    title: "Administration",
    text: "Rejoindre les équipes qui font vivre l'établissement au quotidien, de la vie scolaire à la gestion administrative.",
  },
  {
    title: "Cycle maternelle",
    text: "Enseignants et éducateurs passionnés par le tout premier éveil des enfants.",
  },
  {
    title: "Cycle primaire",
    text: "Professeurs des écoles engagés dans la construction des savoirs fondamentaux.",
  },
  {
    title: "Cycle collège",
    text: "Enseignants spécialisés, prêts à accompagner les élèves dans l'approfondissement disciplinaire.",
  },
  {
    title: "Cycle lycée",
    text: "Professeurs experts, engagés dans la réussite aux examens et l'orientation post-bac.",
  },
] as const;

export const presentationSections = {
  fondateurs: {
    title: "Mot du directeur & des fondateurs",
    text: "Fonder School Academy, c'est avant tout porter une conviction : celle qu'une région comme celle d'El Jadida et de la province d'Abda-Doukkala mérite un établissement à la hauteur des ambitions de ses familles. Depuis notre premier jour, nous avons voulu bâtir plus qu'une école, un lieu où l'exigence académique se conjugue avec la bienveillance, où l'ouverture sur le monde commence dès la maternelle et où chaque enfant est accompagné, individuellement, jusqu'au baccalauréat. Cette conviction, nous la traduisons chaque jour dans nos classes, nos équipes et nos projets : un centre agréé Cambridge Assessment English, un jumelage international, des infrastructures pensées pour l'épanouissement autant que pour l'apprentissage. Nous mesurons la responsabilité qui nous est confiée et nous y répondons avec constance, humilité et détermination.",
  },
  missions: {
    title: "Missions et valeurs de l'établissement",
    text: "Pour préparer nos enfants au monde extérieur, School Academy se fait entourer de spécialistes en sciences de l'éducation et des ressources humaines, au service de six engagements.",
  },
  concept: {
    title: "Concept",
    text: "Nos enfants constituent la locomotive future qui aura pour but de tirer notre pays vers l'avant. Afin d'y parvenir, ils devront être armés d'outils tant pédagogiques que didactiques.",
  },
  charte: {
    title: "Charte",
    text: "Le principe du « triangle équilatéral » englobe les acteurs de l'action pédagogique : l'élève, les parents et l'établissement (enseignants et direction pédagogique). La charte ci-après définit le périmètre d'obligations auxquelles ils adhèrent tous.",
  },
} as const;

export const conceptIntro = [
  "Nos enfants constituent la locomotive future qui aura pour but de tirer notre pays vers l'avant. Afin d'y parvenir, ils devront être armés d'outils tant pédagogiques que didactiques.",
  "School Academy se veut un environnement à disposition de nos enfants, offrant un spectre de connaissances et de savoirs leur permettant de développer leur plein potentiel.",
] as const;

export const conceptOrientation =
  "School Academy œuvre à travers l'ensemble de ses ressources (infrastructure, personnel administratif, corps professoral) pour accompagner nos enfants et faciliter au maximum la maîtrise et l'application des concepts académiques. Nos démarches administratives, pédagogiques et pratiques sont toutes construites autour de nos enfants, pour leur offrir un environnement équilibré et un épanouissement total.";

export const conceptRessourcesHumaines = [
  {
    title: "Vos enseignants",
    text: "Les enseignants ne sont pas seulement des médiateurs entre une maison d'édition et des élèves qu'il s'agirait de faire apprendre par cœur. Animés par la passion de leur métier, leur mission est de développer le potentiel de chaque élève à travers leur expérience, des guides éducatifs et les nouvelles technologies d'enseignement. Au sein de notre établissement, le rapport d'autorité entre professeur et élève laisse place à une relation fondée sur le respect, la communication bilatérale et l'apprentissage continu.",
  },
  {
    title: "Vos administrateurs",
    text: "Avec un champ de compétences couvrant l'ensemble des fonctions d'un établissement éducatif, les administrateurs de School Academy disposent d'une longue expérience en gestion éducative, ressources humaines et organisation d'événements et d'activités périscolaires.",
  },
] as const;

export const conceptTechniciens = [
  {
    title: "Techniciennes de surface",
    text: "Responsables de la propreté et de l'hygiène des locaux, formées et conditionnées par des normes d'hygiène strictes pour assurer à tout moment un environnement irréprochable.",
  },
  {
    title: "Transporteurs",
    text: "Chargés de raccompagner nos enfants, leur conduite est régie par des instructions fermes de l'établissement, avec un équipement de transport conforme aux normes du ministère de l'équipement et du transport comme à celles de l'éducation nationale.",
  },
  {
    title: "Personnel de cuisine",
    text: "Formé selon un conditionnement rigoureux, le personnel de cuisine est intransigeant sur la propreté des aliments et des locaux. School Academy vise la certification HACCP, pour la sérénité de tous les parents.",
  },
] as const;

export const charteIntro =
  "Le principe du « triangle équilatéral » englobe les acteurs de l'action pédagogique, à savoir : l'élève, les parents et l'établissement (enseignants et direction pédagogique). La charte pédagogique ci-après définit le périmètre d'obligations auxquelles adhèrent ses participants.";

export const charteActeurs = [
  {
    id: "enseignants",
    title: "Les enseignants",
    intro:
      "Ils constituent le fer de lance de notre établissement et doivent être représentatifs d'un modèle en tous points. Ils doivent :",
    points: [
      "Adopter un code vestimentaire décent",
      "Être ponctuels",
      "Participer aux réunions organisées par le comité de décision si leur présence est sollicitée",
      "Procurer à l'élève un environnement propice à son apprentissage et à son développement personnel",
      "Prôner des valeurs et des principes basés sur le respect, l'égalité, la tolérance et le partage",
      "Respecter les attributions des acteurs pédagogiques et administratifs",
      "Instaurer l'égalité des chances et traiter les élèves de manière égale",
      "Travailler avec éthique en gardant le secret professionnel et en développant la notion d'appartenance à l'établissement",
      "Être responsables du matériel et de l'équipement de l'établissement",
      "Faire preuve de professionnalisme et de conscience professionnelle avec autrui",
      "Prendre en compte la personne de l'élève et faire preuve de justice à son égard",
      "Maintenir un suivi des élèves selon des critères tels que la santé, le rendement scolaire et le comportement",
      "Développer l'autodidactie de l'élève",
    ],
  },
  {
    id: "direction",
    title: "La direction pédagogique",
    intro:
      "Élément de supervision directe des enseignants, elle endosse une responsabilité et des obligations majeures. Elle doit notamment :",
    points: [
      "Créer des conditions de travail favorables aux enseignants",
      "Évaluer le rendement des enseignants en faisant appel aux inspecteurs d'encadrement pédagogique",
      "Superviser les rencontres pédagogiques parents-professeurs et répondre au mieux aux sujets du jour",
      "Fournir à l'enseignant toute information susceptible de mieux cerner l'enfant et l'aider dans ses démarches de parrainage et de soutien",
      "Être à l'écoute des demandes pédagogiques exprimées par les élèves et les enseignants",
      "Instaurer une cellule d'écoute pour recenser les difficultés des élèves et des enseignants",
      "Appliquer les mesures disciplinaires à l'encontre des élèves via un conseil de discipline",
      "Se concerter avec les partenaires pédagogiques pour résoudre tout problème survenu",
      "Veiller à l'application quotidienne des procédures et guides instaurés",
      "Veiller à la convocation systématique des parents en cas de faute inquiétante",
      "Veiller au contrôle des carnets de liaison et en rendre compte aux enseignants et aux parents",
      "Établir des mémos et circulaires pour transmettre les informations relatives aux élèves, enseignants et parents",
    ],
  },
  {
    id: "eleve",
    title: "L'élève",
    intro:
      "Étant la raison même de la fonction éducative et de la fondation de notre établissement, il est le centre d'intérêt autour duquel gravitent les maillons du système éducatif. Il lui revient de :",
    points: [
      "Respecter et adopter un code vestimentaire décent",
      "Être à l'écoute des enseignants et du personnel tant administratif que pédagogique",
      "Respecter à la lettre le règlement intérieur de l'établissement",
      "Adopter un comportement exemplaire : assiduité, pas de retards ou d'absences non justifiées, implication dans la propreté de l'établissement et soin du matériel",
      "Entretenir avec ses camarades, ses professeurs et l'administration des rapports basés sur le respect, l'ouverture et la bienveillance",
      "Informer les parents via les dispositifs établis par l'établissement",
      "Viser l'excellence et non la médiocrité",
      "Participer activement aux activités périscolaires",
      "S'auto-évaluer dans le but d'améliorer ses compétences",
    ],
  },
  {
    id: "parents",
    title: "Les parents",
    intro:
      "Partenaires et compléments indissociables de notre établissement, leur intervention est essentielle dans la constitution et la formation de nos enfants. Ils veillent, en toute bienveillance, à :",
    points: [
      "Promouvoir des valeurs et principes moraux",
      "Procurer des conditions propices au développement de l'enfant au sein du foyer familial",
      "Apprendre aux enfants la gestion de leur temps",
      "Éviter leur exposition à toute violence physique ou morale",
      "Éviter toute humiliation et mettre en avant leurs compétences",
      "Développer leur sens de l'autonomie et leur autodidactie",
      "Instaurer des aides pédagogiques en concordance avec celles de l'établissement",
      "Respecter le règlement instauré par l'établissement et préserver la dignité de tout le personnel qui y travaille",
      "Transmettre à la direction pédagogique toute information susceptible de mieux anticiper les besoins de l'enfant",
      "Contrôler le carnet de liaison et répondre aux correspondances de l'établissement",
      "Participer aux activités périscolaires avec leurs enfants",
    ],
  },
] as const;

export const valeurs = [
  {
    text: "Prodiguer à nos enfants un enseignement de qualité basé sur l'ouverture de l'esprit, la soif de la connaissance et l'autodidactie afin de les préparer au monde extérieur.",
  },
  {
    text: "Inculquer des valeurs et des principes moraux pour appuyer la construction de leur personnalité.",
  },
  {
    text: "Développer un esprit critique mais constructif pour une perception non biaisée et intègre de la société actuelle.",
  },
  {
    text: "Structurer nos enfants dans leurs démarches en instaurant des guides méthodiques et scientifiques, tout en valorisant leurs penchants artistiques et littéraires.",
  },
  {
    text: "Fournir un équipement technologique à jour (tableaux interactifs, tablettes tactiles, tables et livres interactifs) avec les nouvelles méthodes d'enseignement.",
  },
  {
    text: "Associer un programme sportif riche et varié pour promouvoir leur graine de champion.",
  },
] as const;

export const inscriptionSteps = [
  {
    title: "Prise de contact",
    text: "Vous nous écrivez ou remplissez le formulaire de contact en précisant le cycle concerné.",
  },
  {
    title: "Constitution du dossier",
    text: "Notre équipe vous communique la liste complète et à jour des pièces à fournir.",
  },
  {
    title: "Rencontre & évaluation",
    text: "Un temps d'échange avec l'équipe pédagogique, adapté à l'âge de votre enfant.",
  },
  {
    title: "Confirmation d'inscription",
    text: "Une fois le dossier validé, la place de votre enfant est confirmée pour l'année 2026/2027.",
  },
] as const;

export const inscriptionDocuments = [
  "Dossier scolaire de l'année précédente",
  "Copie du livret de famille ou de l'acte de naissance",
  "Photos d'identité récentes",
  "Copie du carnet de vaccination",
] as const;
