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
    strategy: "Forma del pico que penetra el agua sin generar onda de choque, minimizando resistencia.",
    principle: "Optimización de forma",
    image: "🐦",
    fact: "El Shinkansen japonés copió la forma de su pico para reducir el ruido sónico al entrar en túneles.",
  },
  {
    id: "o2",
    name: "Termitero",
    strategy: "Sistema de ventilación pasiva que mantiene temperatura constante sin energía externa.",
    principle: "Termorregulación pasiva",
    image: "🏗️",
    fact: "El Eastgate Centre en Zimbabwe usa este principio y consume un 90% menos de energía en climatización.",
  },
  {
    id: "o3",
    name: "Huesos de ave",
    strategy: "Estructura hueca con refuerzos internos que maximiza resistencia con mínimo peso.",
    principle: "Estructura jerárquica",
    image: "🦴",
    fact: "Los huesos de un albatros pesan solo el 5% de su masa corporal pero soportan fuerzas extremas en vuelo.",
  },
  {
    id: "o4",
    name: "Piel de tiburón",
    strategy: "Microdentículos dérmicos que reducen la fricción y evitan la acumulación de organismos.",
    principle: "Reducción de fricción",
    image: "🦈",
    fact: "Los trajes de natación inspirados en piel de tiburón fueron prohibidos en competición por la ventaja que daban.",
  },
  {
    id: "o5",
    name: "Tela de araña",
    strategy: "Seda con resistencia tensil superior al acero y capacidad de absorber impactos.",
    principle: "Resistencia y flexibilidad",
    image: "🕷️",
    fact: "La seda de araña es 5 veces más resistente que el acero del mismo diámetro.",
  },
  {
    id: "o6",
    name: "Gecko",
    strategy: "Adhesión reversible mediante fuerzas de van der Waals, sin sustancias químicas.",
    principle: "Adhesión sin residuos",
    image: "🦎",
    fact: "Un gecko puede soportar su propio peso colgando de un solo dedo.",
  },
  {
    id: "o7",
    name: "Hoja de loto",
    strategy: "Superficie superhidrófoba con microestructuras que repelen agua y suciedad.",
    principle: "Autolimpieza",
    image: "🪷",
    fact: "Las gotas de agua recogen partículas de suciedad al rodar, limpiando la superficie sin esfuerzo.",
  },
  {
    id: "o8",
    name: "Cardumen de peces",
    strategy: "Coordinación colectiva sin líder central, optimizando movimiento del grupo.",
    principle: "Inteligencia distribuida",
    image: "🐟",
    fact: "Un cardumen de miles de peces cambia de dirección en milisegundos sin colisiones.",
  },
  {
    id: "o9",
    name: "Nácar (madreperla)",
    strategy: "Capas alternas de material duro y blando que desvían y absorben grietas.",
    principle: "Resistencia a fractura",
    image: "🐚",
    fact: "El nácar es 3.000 veces más resistente a la fractura que el mineral del que está compuesto.",
  },
  {
    id: "o10",
    name: "Murciélago",
    strategy: "Ecolocación ultrasónica para navegación y detección de obstáculos en oscuridad.",
    principle: "Detección no invasiva",
    image: "🦇",
    fact: "Los murciélagos procesan ecos con una precisión de milímetros volando a alta velocidad.",
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
