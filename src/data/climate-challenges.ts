import { EXTRA_CLIMATE, expansionReferences, expansionSources } from "./resilience-expansion";
import type { Challenge } from "./biolab-data";
import type { ReferenceSolution } from "./reference-solutions";
// Fictional educational exercises, not real aircraft performance or approved engineering.
export const CLIMATE_CHALLENGES: Challenge[] = [
  {
    "id": "c9",
    "icon": "🌡️",
    "title": "Proteger equipos ante calor extremo",
    "area": "Ingeniería térmica e In-Service",
    "description": "Ante episodios hipotéticos de calor más prolongados, explora la protección de una carcasa experimental no crítica. Conserva función, seguridad y acceso al mantenimiento."
  },
  {
    "id": "c10",
    "icon": "🌬️",
    "title": "Reducir acumulación de polvo y comprobar durabilidad",
    "area": "Materiales y mantenimiento",
    "description": "Ante cambios hipotéticos de exposición a polvo, plantea una superficie autolimpiante para una probeta no crítica. Evalúa por separado acumulación, limpieza y abrasión."
  },
  {
    "id": "c11",
    "icon": "⛈️",
    "title": "Limitar daños de impacto ante granizo",
    "area": "Materiales y durabilidad",
    "description": "Ante una exposición futura hipotética a granizo, explora una arquitectura multicapa en una probeta de panel no crítico. No extrapoles a resistencia de aeronaves frente a tormentas."
  }
  ...EXTRA_CLIMATE,
];
export const climateReferenceSolutions: Record<string, ReferenceSolution> = {
  ...expansionReferences,
  "c9": {
    "recommendedModel": "Termitero",
    "mechanism": "En ciertas especies, las oscilaciones térmicas diarias impulsan la ventilación.",
    "caution": "La ventilación pasiva no garantiza refrigeración con aire exterior caliente ni sustituye controles térmicos o cualificación.",
    "explanation": "El objetivo es reducir exposición térmica futura, no solo ahorrar energía.",
    "answer": {
      "problem": "Comparar una carcasa experimental no crítica con su referencia durante un episodio térmico hipotético, conservando función y acceso.",
      "organism": "Algunos termiteros aprovechan diferencias térmicas para mover aire e intercambiar gases.",
      "principle": "Gestionar intercambios térmicos y flujo; identificar cuándo el gradiente no es favorable.",
      "solution": "Proponer una variante experimental y compararla con la referencia en condiciones equivalentes, sin modificar una aeronave real.",
      "benefit": "Hipótesis: menor exposición térmica. Medir temperatura máxima y tiempo fuera del criterio de ensayo; considerar masa y energía.",
      "implementation": "Ingeniería térmica, Sistemas y Mantenimiento deben definir exposición y criterios, comparar muestras y documentar resultados adversos y evidencias pendientes."
    },
    "check": [
      "¿Identifica amenaza futura, exposición y consecuencia?",
      "¿Justifica el mecanismo térmico y sus límites?",
      "¿Compara función y exposición equivalentes?",
      "¿Define indicadores térmicos y compromisos de masa y seguridad?",
      "¿Identifica ensayos, responsables y evidencias pendientes?"
    ]
  },
  "c10": {
    "recommendedModel": "Hoja de loto",
    "mechanism": "La microestructura y química superficial favorecen la repelencia al agua y la retirada de ciertos contaminantes por gotas.",
    "caution": "Repelencia al agua no implica repelencia al polvo seco ni resistencia a abrasión. Una textura puede deteriorarse.",
    "explanation": "La acumulación y el desgaste son resultados distintos que requieren evidencias diferentes.",
    "answer": {
      "problem": "Comparar retención de partículas y durabilidad de una superficie experimental bajo exposición futura hipotética, preservando su función.",
      "organism": "La superficie jerárquica de la hoja y sus ceras facilitan el arrastre de ciertas partículas por gotas.",
      "principle": "Explorar baja adhesión y autolimpieza en condiciones definidas, sin equipararlas con resistencia mecánica.",
      "solution": "Proponer una probeta tratada y compararla con la referencia mediante ensayos separados de deposición, limpieza y abrasión.",
      "benefit": "Hipótesis: menos partículas retenidas o menor esfuerzo de limpieza. Medir masa por superficie y pérdida de propiedades tras desgaste; la durabilidad podría empeorar.",
      "implementation": "Materiales, Mantenimiento y Calidad deben definir partículas, condiciones y criterios; revisar degradación, compatibilidad, residuos y repetibilidad."
    },
    "check": [
      "¿Distingue deposición y abrasión?",
      "¿Explica por qué el efecto loto no garantiza repelencia al polvo seco?",
      "¿Existe referencia con exposición equivalente?",
      "¿Mide limpieza y pérdida de propiedades por separado?",
      "¿Considera efectos adversos, incertidumbre y revisión técnica?"
    ]
  },
  "c11": {
    "recommendedModel": "Nácar",
    "mechanism": "Capas minerales e interfaces orgánicas pueden desviar grietas y disipar energía.",
    "caution": "Una arquitectura multicapa no garantiza resistencia a impacto; puede introducir delaminación, masa o problemas de inspección. El granizo no representa todas las amenazas de tormenta.",
    "explanation": "Se estudia un único modo de daño. Las tendencias regionales de granizo requieren evaluación específica.",
    "answer": {
      "problem": "Comparar probetas no críticas con la misma función y criterios bajo exposición de impacto definida por especialistas.",
      "organism": "El nácar combina capas minerales e interfaces orgánicas que permiten desviar grietas y disipar energía.",
      "principle": "Explorar interfaces que limiten la propagación del daño sin confundir tenacidad con resistencia universal a impacto.",
      "solution": "Proponer una probeta multicapa y estudiar el daño frente a una referencia en condiciones comparables, sin modificar estructuras aeronáuticas reales.",
      "benefit": "Hipótesis: menor extensión de daño bajo el ensayo. Evaluar masa superficial, inspección y reparación; no reclamar protección frente a tormentas.",
      "implementation": "Materiales, Estructuras y Calidad deben definir criterios, inspección y ensayos, y registrar incertidumbre y modos de fallo antes de decidir nuevas investigaciones."
    },
    "check": [
      "¿Limita el problema al granizo y una función concreta?",
      "¿Explica el mecanismo sin prometer resistencia universal?",
      "¿Compara probetas con criterios equivalentes?",
      "¿Considera daño residual, masa, inspección y reparación?",
      "¿Identifica pruebas y límites de extrapolación?"
    ]
  }
};
export const climateSources: Record<string,string> = {
  ...expansionSources,
  "c9": "https://pubmed.ncbi.nlm.nih.gov/26316023/",
  "c10": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10753341/",
  "c11": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5090675/"
};
