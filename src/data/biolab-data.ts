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

const natureImage = (fileName: string) =>
  `${import.meta.env.BASE_URL}images/nature/${fileName}`;

export const CHALLENGES: Challenge[] = [
  {
    id: "c1",
    title: "Reducir el peso estructural",
    description: "Reducir el peso de los componentes estructurales del fuselaje sin comprometer su resistencia ni la seguridad.",
    area: "Ingeniería estructural",
    icon: "⚖️",
  },
  {
    id: "c2",
    title: "Mejorar la aerodinámica",
    description: "Optimizar las superficies aerodinámicas para reducir la resistencia y el consumo de combustible.",
    area: "Aerodinámica",
    icon: "🌊",
  },
  {
    id: "c3",
    title: "Mejorar la eficiencia energética en planta",
    description: "Reducir el consumo energético de las líneas de montaje y de los procesos de fabricación.",
    area: "Operaciones industriales",
    icon: "⚡",
  },
  {
    id: "c4",
    title: "Reducir el ruido en cabina",
    description: "Disminuir el ruido percibido durante el vuelo para mejorar el confort.",
    area: "Confort de cabina",
    icon: "🔇",
  },
  {
    id: "c5",
    title: "Mejorar la resistencia a fatiga de los materiales",
    description: "Prolongar la vida útil de componentes sometidos a ciclos repetidos de presurización y vibración.",
    area: "Materiales avanzados",
    icon: "🔩",
  },
  {
    id: "c6",
    title: "Optimizar la logística de repuestos",
    description: "Optimizar la cadena de suministro de repuestos para reducir los tiempos de indisponibilidad.",
    area: "Cadena de suministro",
    icon: "📦",
  },
  {
    id: "c7",
    title: "Agilizar la inspección del fuselaje",
    description: "Acelerar y mejorar los procesos de inspección no destructiva del fuselaje.",
    area: "Mantenimiento",
    icon: "🔍",
  },
  {
    id: "c8",
    title: "Mejorar la ventilación de cabina",
    description: "Mejorar el flujo de aire para aumentar la calidad del aire y la eficiencia térmica.",
    area: "Sistemas de cabina",
    icon: "💨",
  },
];

export const ORGANISMS: Organism[] = [
  {
    id: "o1",
    name: "Martín pescador",
    strategy: "La forma de su pico penetra en el agua con una alteración mínima, reduciendo la resistencia y las turbulencias.",
    principle: "Optimización de la forma",
    image: natureImage("kingfisher.jpg"),
    fact: "Es un buen modelo cuando el reto exige reducir fricción, resistencia, ruido o pérdidas de energía durante el movimiento a través de un fluido.",
  },
  {
    id: "o2",
    name: "Termitero",
    strategy: "Su estructura regula la temperatura y la ventilación de forma pasiva, sin depender de climatización continua.",
    principle: "Termorregulación pasiva",
    image: natureImage("termite-mound.jpg"),
    fact: "Resulta especialmente relevante para retos de ventilación, temperatura, uso de energía, confort térmico o diseño pasivo.",
  },
  {
    id: "o3",
    name: "Huesos de aves",
    strategy: "Combinan cavidades y refuerzos internos para lograr una excelente relación entre resistencia y peso.",
    principle: "Estructura jerárquica",
    image: natureImage("bird-bone.jpg"),
    fact: "Es útil cuando se necesita aligerar estructuras, piezas o soportes sin comprometer la robustez ni la seguridad.",
  },
  {
    id: "o4",
    name: "Piel de tiburón",
    strategy: "La microtextura de su superficie reduce la fricción y dificulta la adhesión de partículas u organismos.",
    principle: "Reducción de la fricción",
    image: natureImage("shark.jpg"),
    fact: "Puede inspirar superficies con menor fricción, menos suciedad y menor acumulación no deseada.",
  },
  {
    id: "o5",
    name: "Tela de araña",
    strategy: "Su red distribuye cargas y absorbe impactos combinando resistencia, elasticidad y una cantidad mínima de material.",
    principle: "Resistencia y flexibilidad",
    image: natureImage("spider-web.jpg"),
    fact: "Conviene considerarla cuando el reto requiere absorber energía, distribuir cargas o aumentar la flexibilidad sin sacrificar resistencia.",
  },
  {
    id: "o6",
    name: "Geco",
    strategy: "Se adhiere a las superficies de forma reversible y precisa sin dejar residuos permanentes.",
    principle: "Adhesión sin residuos",
    image: natureImage("gecko.jpg"),
    fact: "Es un buen modelo para fijaciones temporales, agarre controlado, mantenimiento limpio o uniones reversibles.",
  },
  {
    id: "o7",
    name: "Hoja de loto",
    strategy: "Su superficie repele el agua y la suciedad mediante microestructuras que generan un efecto autolimpiante.",
    principle: "Autolimpieza",
    image: natureImage("lotus-leaf.jpg"),
    fact: "Puede aplicarse cuando el problema está relacionado con limpieza, repelencia, mantenimiento de superficies o reducción de la adhesión.",
  },
  {
    id: "o8",
    name: "Banco de peces",
    strategy: "Miles de individuos se coordinan sin un líder central, reaccionando con rapidez y optimizando el movimiento colectivo.",
    principle: "Inteligencia distribuida",
    image: natureImage("fish-school.jpg"),
    fact: "Puede inspirar la coordinación logística, la gestión de flujos, los sistemas distribuidos o la toma de decisiones descentralizada.",
  },
  {
    id: "o9",
    name: "Nácar",
    strategy: "Sus capas duras y blandas alternas frenan la propagación de grietas y aumentan la tenacidad.",
    principle: "Resistencia a la fractura",
    image: natureImage("nacre.jpg"),
    fact: "Es útil cuando se necesita resistencia a las grietas, durabilidad, absorción de daños o materiales multicapa.",
  },
  {
    id: "o10",
    name: "Murciélago",
    strategy: "Detecta obstáculos y se orienta con precisión mediante ecolocalización, incluso en entornos complejos y con poca visibilidad.",
    principle: "Detección no invasiva",
    image: natureImage("bat.jpg"),
    fact: "Es aplicable a retos de inspección, detección temprana, navegación, monitorización o mantenimiento no invasivo.",
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
  { number: 1, title: "Formar equipos", description: "Crea un equipo de entre 3 y 5 personas o únete a uno" },
  { number: 2, title: "Descubrir el reto", description: "Gira la ruleta para recibir un reto del contexto Airbus" },
  { number: 3, title: "Explorar la naturaleza", description: "Descubre organismos y estrategias naturales" },
  { number: 4, title: "Conectar las ideas", description: "Relaciona el reto, el organismo y el principio biomimético" },
  { number: 5, title: "Diseñar la solución", description: "Completa el lienzo de biomímesis de tu equipo" },
  { number: 6, title: "Presentar y evaluar", description: "Expón la idea y evalúa las propuestas más sólidas" },
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
    id: `team-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    color: TEAM_COLORS[colorIndex % TEAM_COLORS.length].value,
    canvas: createEmptyCanvas(),
    pitchTitle: "",
    pitchSummary: "",
    votes: 0,
  };
}
