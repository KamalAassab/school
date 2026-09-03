export const siteConfig = {
  name: "School Academy",
  tagline: "Tremplin vers l'excellence",
  description:
    "École privée marocaine du préscolaire au lycée, centre agréé Cambridge Assessment English. School Academy prépare chaque élève à comprendre et à bâtir le monde de demain.",
  url: "https://www.schoolacademy.ma",
  email: "contact@schoolacademy.ma",
  year: "2025/2026",
  locale: "fr_MA",
};

export const mainNav = [
  { label: "Présentation", href: "/presentation" },
  { label: "Pédagogie", href: "/pedagogie" },
  {
    label: "Vie scolaire",
    href: "/vie-scolaire",
    children: [
      {
        label: "Espace scolaire",
        href: "/vie-scolaire",
        description: "Cantine, BCD, théâtre, laboratoires et fournitures.",
      },
      {
        label: "Activités & loisirs",
        href: "/activites",
        description: "Clubs, sorties, carnavals et journées thématiques.",
      },
    ],
  },
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
      { label: "Activités & loisirs", href: "/activites" },
    ],
  },
  {
    title: "École",
    links: [
      { label: "Cambridge Assessment", href: "/cambridge" },
      { label: "Recrutement", href: "/recrutement" },
      { label: "Contact", href: "/contact" },
      { label: "Inscription 2025/2026", href: "/inscription" },
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
      "Un premier pas rassurant dans l'apprentissage : éveil sensoriel, langage, autonomie et socialisation dans un cadre chaleureux et sécurisant.",
    highlights: [
      "Éveil sensoriel et psychomoteur",
      "Premiers repères en langue arabe, française et anglaise",
      "Ateliers créatifs et jeux structurés",
    ],
  },
  {
    slug: "primaire",
    label: "Cycle Primaire",
    short: "Primaire",
    age: "6 – 11 ans",
    description:
      "Les fondamentaux consolidés — lecture, écriture, calcul — et une ouverture précoce aux langues et au numérique pour construire une base solide.",
    highlights: [
      "Maîtrise des fondamentaux (lecture, écriture, calcul)",
      "Apprentissage renforcé de l'anglais dès le plus jeune âge",
      "Premiers pas dans les outils numériques (TICE)",
    ],
  },
  {
    slug: "college",
    label: "Cycle Collège",
    short: "Collège",
    age: "12 – 14 ans",
    description:
      "Approfondissement des disciplines, méthodologie de travail et premiers choix d'orientation, accompagnés par une équipe pédagogique présente.",
    highlights: [
      "Approfondissement disciplinaire par matière",
      "Méthodologie de travail et autonomie",
      "Préparation aux certifications Cambridge (KET, PET)",
    ],
  },
  {
    slug: "lycee",
    label: "Cycle Lycée",
    short: "Lycée",
    age: "15 – 18 ans",
    description:
      "Préparation aux examens et à l'enseignement supérieur, avec un accompagnement à l'orientation pensé pour chaque projet d'élève.",
    highlights: [
      "Préparation intensive aux examens nationaux",
      "Accompagnement à l'orientation post-bac",
      "Ouverture internationale et jumelages",
    ],
  },
] as const;

export const pedagogieSections = [
  {
    id: "tice",
    title: "TICE",
    subtitle: "Technologies de l'information et de la communication",
    text: "L'intégration du numérique dans les apprentissages donne aux élèves les outils et les réflexes dont ils auront besoin dans un monde en perpétuelle mutation technologique.",
  },
  {
    id: "orientation",
    title: "Orientation",
    subtitle: "Un accompagnement construit dans la durée",
    text: "De la découverte des filières à la construction d'un projet personnel, l'équipe pédagogique accompagne chaque élève dans ses choix d'orientation.",
  },
  {
    id: "projet",
    title: "Projet d'établissement",
    subtitle: "Des objectifs pédagogiques et civiques partagés",
    text: "Le projet d'établissement vise l'atteinte d'objectifs pédagogiques et civiques, en mobilisant toute la communauté éducative autour d'une ambition commune : donner à chaque élève les moyens de réussir et de s'épanouir.",
  },
  {
    id: "jumelage",
    title: "Jumelage à l'international",
    subtitle: "Ouvrir les élèves sur le monde",
    text: "Des partenariats internationaux qui permettent aux élèves de confronter leurs acquis, de pratiquer les langues et de s'ouvrir à d'autres cultures.",
  },
  {
    id: "rencontres",
    title: "Rencontre parents / profs",
    subtitle: "Un dialogue régulier et transparent",
    text: "Des rencontres organisées tout au long de l'année pour assurer un suivi personnalisé et un dialogue continu entre les familles et l'équipe pédagogique.",
  },
] as const;

export const espaceScolaire = [
  {
    id: "cantine",
    title: "Ma Cantine",
    text: "Fière de son expérience en restauration collective, l'établissement place le respect des normes HACCP à la tête de ses priorités et ne collabore qu'avec des fournisseurs agréés et certifiés par les services d'hygiène. L'équipe est régulièrement testée et les plats prélevés en échantillon pour analyse, aux côtés d'un équipement de cuisine professionnel nettoyé quotidiennement — un « sans faute » sanitaire maintenu depuis toujours.",
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
    text: "La Bibliothèque-Centre de Documentation met à disposition des élèves un fonds riche et actualisé pour nourrir la lecture, la recherche documentaire et le goût d'apprendre en autonomie.",
  },
  {
    id: "theatre",
    title: "Mon théâtre",
    text: "Un espace scénique dédié à l'expression artistique, aux représentations et aux ateliers qui donnent confiance en soi et cultivent la créativité des élèves.",
  },
  {
    id: "laboratoires",
    title: "Laboratoires de préparation",
    text: "Des laboratoires équipés pour les sciences expérimentales, où la théorie prend vie à travers l'observation et la manipulation encadrées.",
  },
  {
    id: "sport",
    title: "Associations sportives",
    text: "Un programme sportif varié qui encourage l'esprit d'équipe, la discipline et le dépassement de soi, au sein d'infrastructures dédiées.",
  },
  {
    id: "fournitures",
    title: "Mes fournitures scolaires",
    text: "Un accompagnement des familles pour simplifier la préparation de la rentrée, avec des listes claires et une organisation pensée pour chaque cycle.",
  },
] as const;

export const activites = [
  {
    title: "Clubs sportifs",
    text: "Football, basketball, arts martiaux et plus encore — des clubs encadrés qui prolongent l'apprentissage au-delà de la salle de classe.",
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
    text: "La toute première étape du parcours Cambridge English, pour découvrir l'anglais en douceur et avec confiance.",
  },
  {
    code: "YLE Movers",
    audience: "7 – 10 ans",
    text: "Une progression naturelle qui consolide le vocabulaire courant et les structures de base.",
  },
  {
    code: "YLE Flyers",
    audience: "8 – 12 ans",
    text: "Le niveau le plus avancé du parcours Young Learners, préparatoire aux examens généraux.",
  },
  {
    code: "KET",
    audience: "Key English Test",
    text: "Une certification internationale qui valide un niveau d'anglais pratique pour la vie courante.",
  },
  {
    code: "PET",
    audience: "Preliminary English Test",
    text: "Un niveau intermédiaire reconnu, ouvrant la voie vers les certifications Cambridge supérieures.",
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
    text: "Comme parents, nous savons bien que le choix d'un bon établissement scolaire est devenu crucial pour préparer les enfants d'aujourd'hui à comprendre et à bâtir le monde de demain, et à s'y épanouir. À l'heure où le numérique efface les frontières et renforce la globalisation, ils doivent pouvoir communiquer dans plusieurs langues et acquérir des « savoir-faire » de haut niveau.",
  },
  missions: {
    title: "Missions et valeurs",
    text: "Nos enfants constituent la locomotive future qui aura pour but de tirer notre pays vers l'avant. Afin d'y parvenir, ils doivent être armés d'outils tant pédagogiques que didactiques. School Academy se veut un environnement offrant un large spectre de connaissances et de savoirs, au service de leur réussite.",
  },
  concept: {
    title: "Concept",
    text: "Un établissement pensé du préscolaire au lycée, pour accompagner chaque élève dans la continuité, avec une exigence académique constante et une attention particulière portée à l'ouverture linguistique et culturelle.",
  },
  charte: {
    title: "Charte",
    text: "Un cadre de valeurs partagé qui guide chaque décision pédagogique et chaque relation avec les familles, du premier accueil jusqu'au baccalauréat.",
  },
} as const;

export const valeurs = [
  { title: "Exigence", text: "Un niveau académique soutenu, à chaque cycle." },
  { title: "Bienveillance", text: "Un cadre sécurisant où chaque élève trouve sa place." },
  { title: "Respect", text: "Des relations fondées sur l'écoute et la considération." },
  { title: "Ouverture", text: "Aux langues, aux cultures et aux autres." },
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
    text: "Une fois le dossier validé, la place de votre enfant est confirmée pour l'année 2025/2026.",
  },
] as const;

export const inscriptionDocuments = [
  "Dossier scolaire de l'année précédente",
  "Copie du livret de famille ou de l'acte de naissance",
  "Photos d'identité récentes",
  "Copie du carnet de vaccination",
] as const;

export const chartePoints = [
  "Exigence académique constante à chaque cycle",
  "Accompagnement individualisé de chaque élève",
  "Ouverture linguistique et culturelle affirmée",
  "Cadre bienveillant et sécurisant au quotidien",
  "Dialogue permanent avec les familles",
] as const;
