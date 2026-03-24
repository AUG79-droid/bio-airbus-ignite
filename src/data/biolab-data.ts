export interface Challenge {
  id: string;
  title: string;
  description: string;
  area: string;
  icon: string;
}

export interface Organism {
  id: string;
  name: string;
  strategy: string;
  principle: string;
  image: string;
  fact: string;
}

export interface CanvasData {
  problem: string;
  organism: string;
  principle: string;
  solution: string;
  benefit: string;
  implementation: string;
}

export interface TeamData {
  id: string;
  name: string;
  color: string;
  challenge?: Challenge;
  organism?: Organism;
  canvas: CanvasData;
  pitchTitle: string;
  pitchSummary: string;
  votes: number;
}

export const CHALLENGES: Challenge[] = [
  {
    id: "c1",
    title: "Reducir peso estructural",
    description: "Reducir el peso de componentes estructurales del fuselaje sin comprometer resistencia ni seguridad.",
    area: "Ingeniería de estructuras",
    icon: "⚖️",
  },
  {
    id: "c2",
    title: "Mejorar aerodinámica",
    description: "Optimizar las superficies aerodinámicas para reducir la resistencia al avance y el consumo de combustible.",
    area: "Aerodinámica",
    icon: "🌊",
  },
  {
    id: "c3",
    title: "Eficiencia energética en planta",
    description: "Reducir el consumo energético de las líneas de montaje y los procesos de fabricación.",
    area: "Operaciones industriales",
    icon: "⚡",
  },
  {
    id: "c4",
    title: "Reducir ruido en cabina",
    description: "Disminuir el nivel de ruido percibido por pasajeros durante el vuelo, mejorando confort.",
    area: "Confort de cabina",
    icon: "🔇",
  },
  {
    id: "c5",
    title: "Resistencia a fatiga de materiales",
    description: "Aumentar la vida útil de componentes sometidos a ciclos repetidos de presurización y vibración.",
    area: "Materiales avanzados",
    icon: "🔩",
  },
  {
    id: "c6",
    title: "Logística de repuestos",
    description: "Optimizar la cadena de suministro de piezas de repuesto para reducir tiempos de inactividad.",
    area: "Supply Chain",
    icon: "📦",
  },
  {
    id: "c7",
    title: "Inspección rápida de fuselaje",
    description: "Acelerar y mejorar los procesos de inspección no destructiva del fuselaje.",
    area: "Mantenimiento",
    icon: "🔍",
  },
  {
    id: "c8",
    title: "Ventilación de cabina",
    description: "Mejorar la circulación de aire en cabina para mayor calidad del aire y eficiencia térmica.",
    area: "Sistemas de cabina",
    icon: "💨",
  },
];

export const ORGANISMS: Organism[] = [
  {
    id: "o1",
    name: "Martín pescador",
    strategy: "La forma de su pico penetra el agua con mínima perturbación, reduciendo resistencia y turbulencia.",
    principle: "Optimización de forma",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Common_kingfisher_(3).jpg",
    fact: "Úsalo si tu reto consiste en reducir fricción, arrastre, ruido o pérdidas al atravesar un fluido.",
  },
  {
    id: "o2",
    name: "Termitero",
    strategy: "Su estructura regula temperatura y ventilación de forma pasiva, sin depender de climatización continua.",
    principle: "Termorregulación pasiva",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/A_termite_mound.jpg",
    fact: "Encaja muy bien con retos de ventilación, temperatura, consumo energético, confort térmico o diseño pasivo.",
  },
  {
    id: "o3",
    name: "Huesos de ave",
    strategy: "Combinan cavidades y refuerzos internos para lograr una relación muy alta entre ligereza y resistencia.",
    principle: "Estructura jerárquica",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bone_(254_02)_Bird_bone_cross-section.jpg",
    fact: "Es útil cuando buscas aligerar estructuras, piezas o soportes sin comprometer robustez ni seguridad.",
  },
  {
    id: "o4",
    name: "Piel de tiburón",
    strategy: "Su microtextura superficial reduce fricción y dificulta que otras partículas o organismos se adhieran.",
    principle: "Reducción de fricción",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/White_shark.jpg",
    fact: "Puede inspirar superficies con menos rozamiento, menos suciedad o menos acumulación no deseada.",
  },
  {
    id: "o5",
    name: "Tela de araña",
    strategy: "Su red distribuye cargas y absorbe impactos combinando resistencia, elasticidad y mínimo material.",
    principle: "Resistencia y flexibilidad",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Spider_web_with_dew_drops03.jpg",
    fact: "Piensa en ella si tu reto necesita absorber energía, repartir cargas o ganar flexibilidad sin perder resistencia.",
  },
  {
    id: "o6",
    name: "Gecko",
    strategy: "Se adhiere a superficies de forma reversible, precisa y sin dejar residuos permanentes.",
    principle: "Adhesión sin residuos",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gecko.jpg",
    fact: "Es un buen modelo si buscas fijación temporal, agarre controlado, mantenimiento limpio o unión reversible.",
  },
  {
    id: "o7",
    name: "Hoja de loto",
    strategy: "Su superficie repele agua y suciedad gracias a microestructuras que favorecen el efecto autolimpiante.",
    principle: "Autolimpieza",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lotus_Leaf_(5780807588).jpg",
    fact: "Aplícalo cuando el problema tenga que ver con limpieza, repelencia, mantenimiento superficial o reducción de adherencias.",
  },
  {
    id: "o8",
    name: "Cardumen de peces",
    strategy: "Miles de individuos se coordinan sin un líder central, reaccionando rápido y optimizando movimiento colectivo.",
    principle: "Inteligencia distribuida",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fish_school_(Unsplash).jpg",
    fact: "Te sirve para pensar en coordinación logística, movimiento de flujos, sistemas distribuidos o decisiones descentralizadas.",
  },
  {
    id: "o9",
    name: "Nácar",
    strategy: "Sus capas alternas de material duro y blando frenan la propagación de grietas y mejoran la tenacidad.",
    principle: "Resistencia a fractura",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Abalone_nacre.JPG",
    fact: "Es un modelo útil si buscas resistencia a grietas, durabilidad, absorción de daño o materiales multicapa.",
  },
  {
    id: "o10",
    name: "Murciélago",
    strategy: "Detecta obstáculos y navega con precisión usando ecolocación, incluso en entornos complejos y con poca visibilidad.",
    principle: "Detección no invasiva",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/A_Bat.jpg",
    fact: "Úsalo para retos de inspección, detección temprana, navegación, monitorización o mantenimiento no invasivo.",
  },
];

export const TEAM_COLORS = [
  { name: "Esmeralda", value: "hsl(160, 70%, 22%)" },
  { name: "Ámbar", value: "hsl(38, 92%, 50%)" },
  { name: "Océano", value: "hsl(210, 70%, 40%)" },
  { name: "Coral", value: "hsl(10, 75%, 55%)" },
  { name: "Violeta", value: "hsl(270, 60%, 45%)" },
  { name: "Bosque", value: "hsl(140, 50%, 35%)" },
];

export const STEPS = [
  { number: 1, title: "Formar equipos", description: "Crea o únete a un equipo de 3-5 personas" },
  { number: 2, title: "Descubrir el reto", description: "Gira la ruleta para obtener un reto Airbus real" },
  { number: 3, title: "Explorar la naturaleza", description: "Conoce organismos y estrategias naturales" },
  { number: 4, title: "Conectar ideas", description: "Vincula reto, organismo y principio biomimético" },
  { number: 5, title: "Diseñar la solución", description: "Completa el canvas biomimético de tu equipo" },
  { number: 6, title: "Pitch y votación", description: "Presenta tu idea y vota las mejores" },
];

export function createEmptyCanvas(): CanvasData {
  return {
    problem: "",
    organism: "",
    principle: "",
    solution: "",
    benefit: "",
    implementation: "",
  };
}

export function createTeam(name: string, colorIndex: number): TeamData {
  return {
    id: `team-${Date.now()}`,
    name,
    color: TEAM_COLORS[colorIndex % TEAM_COLORS.length].value,
    canvas: createEmptyCanvas(),
    pitchTitle: "",
    pitchSummary: "",
    votes: 0,
  };
}
