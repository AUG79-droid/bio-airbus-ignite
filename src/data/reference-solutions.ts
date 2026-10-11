import type { CanvasData } from "./biolab-data";

/**
 * Educational benchmark examples, one for each Airbus challenge.
 * They are hypotheses for comparison, not engineering approvals, certified designs,
 * documented Airbus programmes or proof of environmental benefits.
 */
export type ReferenceSolution = {
  recommendedModel: string;
  mechanism: string;
  caution: string;
  explanation: string;
  answer: CanvasData;
  check: string[];
};

export const referenceSolutions: Record<string, ReferenceSolution> = {
  c1: {
    recommendedModel: "Huesos de aves",
    mechanism: "Distribución del material mediante geometrías internas aligeradas y refuerzos según la trayectoria de cargas.",
    caution: "Una estructura biológica no equivale automáticamente a una pieza aeronáutica certificable. La rigidez, la fatiga, la fabricación y la inspeccionabilidad mandan.",
    explanation: "La analogía es razonable porque reto y mecanismo tratan de masa y resistencia estructural, aunque el beneficio depende de las cargas y de los requisitos reales.",
    answer: {
      problem: "Reducir la masa de un soporte secundario del fuselaje manteniendo la rigidez requerida, la resistencia a cargas y la inspeccionabilidad, con una geometría y unas interfaces definidas.",
      organism: "Los huesos de aves combinan paredes resistentes, cavidades y refuerzos internos que distribuyen las cargas sin llenar todo el volumen de material.",
      principle: "Situar material en las zonas que transmiten esfuerzos y aligerar regiones menos solicitadas sin perder estabilidad ni resistencia.",
      solution: "Estudiar un soporte aeronáutico con nervaduras internas optimizadas a partir de una envolvente e interfaces existentes. La propuesta estaría sujeta a cargas, materiales, fabricación, mantenimiento y requisitos de aprobación.",
      benefit: "Hipótesis: reducir la masa del soporte manteniendo márgenes de resistencia y rigidez frente a la solución de referencia; comprobar también coste y fabricabilidad.",
      implementation: "Modelar las cargas y restricciones y comparar por elementos finitos la geometría original con varias alternativas aligeradas. Después fabricar probetas para ensayos estructurales y de fatiga."
    },
    check: ["¿Se identifica qué pieza y qué cargas se estudian?", "¿La distribución de material explica la reducción de masa?", "¿Se incluyen resistencia, fatiga y fabricación?", "¿Se especifica cómo comparar masa y resultados de ensayo?"]
  },
  c2: {
    recommendedModel: "Martín pescador",
    mechanism: "Perfilado de geometría para reducir perturbaciones de flujo y resistencia en condiciones concretas.",
    caution: "La penetración de un pico en agua no prueba mejoras en superficies sometidas a aire: las escalas y regímenes de flujo son distintos.",
    explanation: "Es una inspiración geométrica para formular hipótesis aerodinámicas, no una traducción directa de la forma del animal al avión.",
    answer: {
      problem: "Evaluar la resistencia aerodinámica de un elemento secundario externo del avión en un régimen de operación definido, sin comprometer estabilidad, seguridad ni mantenimiento.",
      organism: "La geometría del pico del martín pescador puede inspirar perfiles que gestionan cómo se desplaza un fluido alrededor de una superficie.",
      principle: "Ajustar la geometría para controlar la distribución de presiones y la separación del flujo bajo las condiciones relevantes.",
      solution: "Explorar variantes de perfil en una carena o elemento externo no crítico, conservando las interfaces y verificando su compatibilidad con el entorno de operación.",
      benefit: "Hipótesis: menor arrastre del elemento frente al diseño actual. No atribuir reducción de combustible sin cálculos de misión y datos verificados.",
      implementation: "Ejecutar simulaciones de dinámica de fluidos en las mismas condiciones para ambas geometrías, seguidas de ensayos de túnel de viento y revisión de requisitos de integración."
    },
    check: ["¿Se define el elemento aeronáutico y el régimen de vuelo?", "¿El efecto se explica por el flujo y no por el parecido visual?", "¿Se reconocen las diferencias entre agua y aire?", "¿Existe una comparación cuantificable de arrastre?"]
  },
  c3: {
    recommendedModel: "Termitero",
    mechanism: "Distribución y movimiento del aire favorecidos por geometría e intercambios térmicos.",
    caution: "Las condiciones de un termitero no se trasladan sin más a una fábrica. La ventilación de seguridad, calidad del aire y protección contra incendios son requisitos previos.",
    explanation: "Resulta razonable estudiar estrategias de flujo y ventilación, pero el ahorro energético debe comprobarse y nunca suponerse.",
    answer: {
      problem: "Reducir energía de climatización y ventilación en una zona industrial concreta sin alterar condiciones de trabajo, calidad del aire ni requisitos de proceso.",
      organism: "La configuración interna de los termiteros puede guiar el estudio de movimientos de aire asociados a su geometría y a diferencias de temperatura.",
      principle: "Gestionar trayectorias de ventilación y gradientes térmicos para reducir pérdidas innecesarias de energía.",
      solution: "Analizar modificaciones no invasivas de compuertas, conductos o estrategias de control en una zona piloto de planta, compatibles con extracción local y seguridad.",
      benefit: "Hipótesis: menor consumo de equipos de ventilación a iguales condiciones de ocupación y calidad del aire; no confundir simulaciones con ahorro verificado.",
      implementation: "Registrar consumo, temperatura, caudal y calidad del aire en una línea base; simular alternativas y realizar un ensayo controlado con los mismos criterios operativos."
    },
    check: ["¿Se identifica una zona y una demanda energética real?", "¿Se explica el recorrido del aire?", "¿Se mantienen requisitos de seguridad y calidad del aire?", "¿Se compara consumo antes y después con variables controladas?"]
  },
  c4: {
    recommendedModel: "Martín pescador",
    mechanism: "Reducción de perturbaciones del flujo que pueden originar ruido aerodinámico en elementos delimitados.",
    caution: "El ruido de cabina puede ser estructural, mecánico o aerodinámico. Esta analogía solo sirve si antes se identifica una fuente de ruido relacionada con el flujo.",
    explanation: "Puede orientar una hipótesis sobre ruido de ventilación o entrada de aire, pero no resolver genéricamente todo el ruido en cabina.",
    answer: {
      problem: "Reducir el ruido aerodinámico asociado a un conducto o salida de ventilación de cabina, una vez identificada la fuente mediante mediciones.",
      organism: "El perfil del pico del martín pescador inspira una aproximación a la transición geométrica suave y al control de perturbaciones de un fluido.",
      principle: "Optimizar transiciones y curvas para reducir zonas de separación del flujo que puedan contribuir al ruido.",
      solution: "Proponer variaciones de geometría para un tramo de conducto de ventilación manteniendo caudal, presión, seguridad y compatibilidad con el diseño certificado.",
      benefit: "Hipótesis: menor ruido del tramo ensayado, sin penalizar la ventilación ni el consumo del sistema. No afirmar una disminución global del ruido de cabina.",
      implementation: "Medir primero el espectro acústico y confirmar la fuente; comparar prototipos de conductos al mismo caudal mediante ensayo de presión y nivel sonoro."
    },
    check: ["¿Se ha identificado una fuente de ruido concreta?", "¿El mecanismo natural se relaciona con esa fuente?", "¿Se preserva el caudal y la presión admisible?", "¿Se propone una medición acústica comparativa?"]
  },
  c5: {
    recommendedModel: "Nácar",
    mechanism: "Arquitecturas en capas e interfaces que desvían o frenan grietas.",
    caution: "Tenacidad a la fractura y resistencia a fatiga no son equivalentes. Una buena respuesta debe validar la propagación de grietas bajo cargas cíclicas.",
    explanation: "Es una analogía pertinente para estudiar tolerancia al daño, sujeta a ensayos específicos de fatiga.",
    answer: {
      problem: "Estudiar el crecimiento de grietas por cargas cíclicas en un componente definido, manteniendo prestaciones mecánicas y controles de fabricación.",
      organism: "El nácar presenta capas e interfaces con mecanismos que pueden desviar grietas y disipar energía durante el daño.",
      principle: "Diseñar interfaces o arquitecturas que modifiquen la trayectoria y energía de propagación de grietas.",
      solution: "Explorar cupones multicapa con orientación e interfaces controladas, sin proponer su instalación directa en una estructura primaria.",
      benefit: "Hipótesis: menor tasa de propagación de grieta y mejor tolerancia al daño a igualdad de masa y condiciones; requiere pruebas y no garantiza más vida útil.",
      implementation: "Comparar probetas de referencia y propuestas con ensayos de crecimiento de grietas bajo cargas cíclicas, además de revisar fabricación y sensibilidad a defectos."
    },
    check: ["¿Se diferencia fatiga de tenacidad?", "¿Se especifica la arquitectura de capas?", "¿Se consideran masa, defectos y fabricación?", "¿Hay ensayo de crecimiento de grieta bajo carga cíclica?"]
  },
  c6: {
    recommendedModel: "Banco de peces",
    mechanism: "Coordinación descentralizada con reglas de información local y respuesta rápida a cambios.",
    caution: "La analogía no sustituye la trazabilidad, planificación aprobada ni la responsabilidad de decisión en logística de repuestos.",
    explanation: "La referencia natural encaja con la coordinación de múltiples nodos, no con copiar literalmente el movimiento de peces.",
    answer: {
      problem: "Reducir tiempos de localización y transferencia de repuestos entre centros de servicio cuando la información de existencias está fragmentada.",
      organism: "Los bancos de peces coordinan movimientos mediante respuestas locales a señales de su entorno, sin una dirección central de cada individuo.",
      principle: "Coordinar nodos usando señales compartidas y reglas de priorización consistentes, con supervisión y trazabilidad.",
      solution: "Estudiar un sistema de alerta y recomendación entre almacenes para redirigir piezas compatibles, con validación de configuración, estado y autorizaciones.",
      benefit: "Hipótesis: menor tiempo medio de respuesta y menos traslados urgentes innecesarios sin empeorar disponibilidad, coste o trazabilidad.",
      implementation: "Ensayar con datos históricos anonimizados un modelo de recomendaciones y compararlo con el proceso actual, midiendo tiempo de respuesta, errores y expediciones."
    },
    check: ["¿Se delimita el proceso logístico?", "¿La coordinación se traduce a una regla operativa?", "¿Se protegen compatibilidad y trazabilidad?", "¿Se comparan tiempos y errores frente a una línea base?"]
  },
  c7: {
    recommendedModel: "Murciélago",
    mechanism: "Detección de discontinuidades a partir de señales acústicas emitidas y sus respuestas; analogía con técnicas ultrasónicas existentes.",
    caution: "La ecolocalización no descubre una técnica novedosa por sí sola. Los ultrasonidos ya se usan en inspección no destructiva y requieren procedimientos cualificados.",
    explanation: "La conexión tiene sentido por el mecanismo de emisión y recepción de ondas. Una piel de tiburón, en cambio, se asocia a fricción y adhesión: no justifica directamente detectar defectos internos.",
    answer: {
      problem: "Mejorar la localización y caracterización de discontinuidades en una zona del fuselaje durante una inspección no destructiva, manteniendo detectabilidad y requisitos del método.",
      organism: "El murciélago emite señales y analiza los ecos recibidos para obtener información del entorno. La analogía funcional es la interacción entre una señal y un reflector o discontinuidad.",
      principle: "Emitir una señal controlada, medir su respuesta y usar variaciones de tiempo y amplitud para inferir posición o características de una discontinuidad.",
      solution: "Estudiar mejoras de cobertura y tratamiento de datos para una inspección ultrasónica ya cualificada, sin asumir que el enfoque natural sustituye el procedimiento existente.",
      benefit: "Hipótesis: mejor repetibilidad o menor tiempo de interpretación con detectabilidad equivalente; no afirmar reducción de tiempo sin datos comparativos.",
      implementation: "Evaluar piezas patrón con defectos conocidos usando el procedimiento actual y una configuración experimental, comparando probabilidad de detección, falsos positivos y tiempo."
    },
    check: ["¿Se define el defecto y la zona inspeccionada?", "¿El organismo aporta un mecanismo de detección y no solo una analogía?", "¿Se conserva la cualificación del ensayo no destructivo?", "¿Se miden detectabilidad, falsos positivos y tiempo?"]
  },
  c8: {
    recommendedModel: "Termitero",
    mechanism: "Geometría del flujo de aire y gestión de gradientes térmicos.",
    caution: "No se puede reemplazar sin más el sistema de control ambiental de una aeronave por ventilación pasiva. Presurización, temperatura, caudal, seguridad y certificación son esenciales.",
    explanation: "La inspiración puede orientar geometrías y distribución del aire, siempre integradas en un sistema aeronáutico controlado.",
    answer: {
      problem: "Estudiar cómo reducir pérdidas de presión y mejorar la distribución del aire en un tramo de ventilación de cabina sin alterar los caudales ni el confort requerido.",
      organism: "La geometría interna de los termiteros y los gradientes térmicos pueden sugerir estrategias para dirigir el aire mediante recorridos y secciones.",
      principle: "Optimizar la geometría de canales y las trayectorias de flujo para distribuir aire con menores pérdidas.",
      solution: "Diseñar y analizar variantes de conductos o difusores inspiradas en la estrategia de ventilación, integrables en un sistema ambiental activo y controlado.",
      benefit: "Hipótesis: menor pérdida de presión para el mismo caudal y distribución térmica aceptable; no atribuir ahorros reales ni mejoras de calidad del aire sin mediciones.",
      implementation: "Comparar configuraciones de referencia y propuestas mediante simulación de fluidos y ensayo de caudal, presión, temperatura, ruido y posibles puntos de mantenimiento."
    },
    check: ["¿Se especifica qué parte de la ventilación se modifica?", "¿Se explica el mecanismo de flujo?", "¿Se respetan control ambiental y requisitos aeronáuticos?", "¿Se mide pérdida de carga y distribución a igual caudal?"]
  },
};

export const referenceLabels: { key: keyof CanvasData; label: string }[] = [
  { key: "problem", label: "01 · Problema" },
  { key: "organism", label: "02 · Modelo natural" },
  { key: "principle", label: "03 · Principio funcional" },
  { key: "solution", label: "04 · Propuesta técnica" },
  { key: "benefit", label: "05 · Mejora esperada" },
  { key: "implementation", label: "06 · Validación" },
];
