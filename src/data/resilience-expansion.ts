import type { Challenge, Organism } from "./biolab-data";
import type { ReferenceSolution } from "./reference-solutions";
export const EXTRA_CLIMATE: Challenge[] = [
  {
    "id": "c12",
    "icon": "☀️",
    "title": "Protección frente a radiación solar",
    "area": "Ingeniería térmica",
    "description": "Un equipo experimental no crítico está expuesto a episodios de calor y radiación solar más intensos. Investiga una superficie que limite la carga térmica sin cambiar la función."
  },
  {
    "id": "c13",
    "icon": "🌪️",
    "title": "Resistencia a erosión por partículas",
    "area": "Materiales y durabilidad",
    "description": "Un escenario futuro hipotético plantea mayor exposición a partículas abrasivas. Estudia el desgaste de una probeta no crítica, diferenciándolo de la acumulación de polvo."
  },
  {
    "id": "c14",
    "icon": "💧",
    "title": "Respuesta a ciclos de humedad",
    "area": "Materiales e instalaciones",
    "description": "Un equipo de ensayo sufre cambios hipotéticos de humedad y ciclos de secado. Explora un indicador pasivo experimental para detectar exposición, sin sustituir sensores certificados."
  },
  {
    "id": "c15",
    "icon": "❄️",
    "title": "Protección térmica en entornos fríos",
    "area": "Infraestructura y energía",
    "description": "Un equipo auxiliar no crítico debe soportar un escenario frío hipotético con ciclos de humedad y deshielo. El contexto ártico exige considerar variabilidad, no asumir que el clima se enfría."
  }
];
export const STRATEGIC_CHALLENGES: Challenge[] = [
  {
    "id": "r1",
    "icon": "🕸️",
    "title": "Redundancia sin dependencias ocultas",
    "area": "Compras y cadena de suministro",
    "description": "Una red ficticia de suministros pierde un proveedor. Diseña una comparación de rutas alternativas, verificando que no compartan la misma dependencia crítica."
  },
  {
    "id": "r2",
    "icon": "🌱",
    "title": "Limitar daño y facilitar reparación",
    "area": "Ingeniería de materiales e In-Service",
    "description": "Una capa protectora experimental no crítica sufre daños superficiales repetidos. Explora mecanismos de sellado y recuperación sin asumir restauración estructural."
  },
  {
    "id": "r3",
    "icon": "🔄",
    "title": "Coordinación ante interrupciones",
    "area": "Operaciones y logística",
    "description": "Un flujo logístico ficticio pierde acceso a un recurso. Explora coordinación distribuida, manteniendo responsabilidad y trazabilidad de las decisiones."
  },
  {
    "id": "r4",
    "icon": "🧩",
    "title": "Diseño reversible y longevidad",
    "area": "Ingeniería e In-Service",
    "description": "Un conjunto experimental no crítico contiene una pieza que debe sustituirse periódicamente. Explora una unión reversible para evitar reemplazar el conjunto completo."
  }
];
export const expansionReferences: Record<string,ReferenceSolution> = {
  "c12": {
    "recommendedModel": "Hormiga plateada del Sáhara",
    "mechanism": "Sus pelos especializados reflejan parte de la radiación solar y favorecen la emisión térmica infrarroja.",
    "caution": "La respuesta depende del espectro, orientación, entorno y degradación; no garantiza refrigeración.",
    "explanation": "Un equipo experimental no crítico está expuesto a episodios de calor y radiación solar más intensos. Investiga una superficie que limite la carga térmica sin cambiar la función.",
    "answer": {
      "problem": "Comparar la temperatura y carga térmica de una muestra expuesta a radiación equivalente.",
      "organism": "Sus pelos especializados reflejan parte de la radiación solar y favorecen la emisión térmica infrarroja.",
      "principle": "Reflexión solar y emisión térmica",
      "solution": "Estudiar una superficie experimental con respuesta óptica selectiva, no modificar un producto real.",
      "benefit": "Medir temperatura, absorción y emisión, y comprobar masa, envejecimiento y limpieza.",
      "implementation": "Ingeniería térmica y Materiales: comparar muestras bajo exposición controlada y repetir tras envejecimiento."
    },
    "check": [
      "¿Delimita amenaza o interrupción, exposición, vulnerabilidad y consecuencia?",
      "¿Explica el mecanismo biológico y reconoce sus límites?",
      "¿Define una comparación con función y condiciones equivalentes?",
      "¿Identifica indicadores, contrapartidas y posibles resultados desfavorables?",
      "¿Propone ensayos, responsables y criterios para aceptar o rechazar la hipótesis?"
    ]
  },
  "c13": {
    "recommendedModel": "Escorpión del desierto",
    "mechanism": "La geometría de su superficie ha inspirado investigaciones sobre erosión por arena.",
    "caution": "El resultado depende del material, la trayectoria de partículas y las condiciones; una textura no es universalmente resistente.",
    "explanation": "Un escenario futuro hipotético plantea mayor exposición a partículas abrasivas. Estudia el desgaste de una probeta no crítica, diferenciándolo de la acumulación de polvo.",
    "answer": {
      "problem": "Comparar el deterioro de muestras con la misma función y exposición definida por especialistas.",
      "organism": "La geometría de su superficie ha inspirado investigaciones sobre erosión por arena.",
      "principle": "Gestión del impacto de partículas",
      "solution": "Explorar texturas en probetas y comprobar su desgaste frente a una referencia lisa.",
      "benefit": "Medir pérdida de masa y propiedades superficiales; evaluar limpieza, inspección y fabricación.",
      "implementation": "Materiales y Calidad: definir exposición representativa, ensayos y criterios; registrar efectos adversos."
    },
    "check": [
      "¿Delimita amenaza o interrupción, exposición, vulnerabilidad y consecuencia?",
      "¿Explica el mecanismo biológico y reconoce sus límites?",
      "¿Define una comparación con función y condiciones equivalentes?",
      "¿Identifica indicadores, contrapartidas y posibles resultados desfavorables?",
      "¿Propone ensayos, responsables y criterios para aceptar o rechazar la hipótesis?"
    ]
  },
  "c14": {
    "recommendedModel": "Piña de conífera",
    "mechanism": "Las capas de las escamas cambian de dimensiones de forma desigual con la humedad, provocando movimiento.",
    "caution": "Humedad no equivale a lluvia o condensación; la respuesta puede ser lenta, irreversible o dependiente de temperatura.",
    "explanation": "Un equipo de ensayo sufre cambios hipotéticos de humedad y ciclos de secado. Explora un indicador pasivo experimental para detectar exposición, sin sustituir sensores certificados.",
    "answer": {
      "problem": "Detectar cambios de humedad en una carcasa experimental no crítica antes de que la exposición prolongada pueda degradar sus materiales, sin sustituir el sensor de referencia.",
      "organism": "Las capas de las escamas cambian de dimensiones de forma desigual con la humedad, provocando movimiento.",
      "principle": "Unir dos capas con distinta expansión higroscópica para que la absorción o pérdida de humedad produzca una curvatura observable.",
      "solution": "Fabricar una tira experimental de dos capas con distinta sensibilidad a la humedad y fijarla por un extremo. El extremo libre desplaza una marca sobre una escala visual de exposición. Calibrarla frente a un higrómetro en una cámara de ensayo; no utilizarla como alarma de seguridad ni instalarla en una aeronave.",
      "benefit": "Hipótesis: obtener una señal visual de exposición sin alimentación propia. Medir tiempo de respuesta, repetibilidad, histéresis y falsas indicaciones; comprobar si temperatura, envejecimiento o condensación alteran la señal.",
      "implementation": "Materiales e Instrumentación: someter varias tiras a ciclos controlados de humedad y secado en una cámara, registrar curvatura y humedad de referencia a distintas temperaturas y repetir tras envejecimiento. Fijar previamente tolerancia y tiempo máximo de respuesta; descartar el concepto si no los cumple."
    },
    "check": [
      "¿Delimita amenaza o interrupción, exposición, vulnerabilidad y consecuencia?",
      "¿Explica el mecanismo biológico y reconoce sus límites?",
      "¿Define una comparación con función y condiciones equivalentes?",
      "¿Identifica indicadores, contrapartidas y posibles resultados desfavorables?",
      "¿Propone ensayos, responsables y criterios para aceptar o rechazar la hipótesis?"
    ]
  },
  "c15": {
    "recommendedModel": "Plumas de pingüino",
    "mechanism": "La microestructura de las plumas contribuye al aislamiento del recubrimiento.",
    "caution": "El aislamiento puede perder eficacia al humedecerse y no resuelve por sí solo hielo, combustible ni seguridad energética.",
    "explanation": "Un equipo auxiliar no crítico debe soportar un escenario frío hipotético con ciclos de humedad y deshielo. El contexto ártico exige considerar variabilidad, no asumir que el clima se enfría.",
    "answer": {
      "problem": "Comparar pérdidas térmicas de un equipo experimental bajo condiciones frías equivalentes.",
      "organism": "La microestructura de las plumas contribuye al aislamiento del recubrimiento.",
      "principle": "Aislamiento mediante estructura y aire retenido",
      "solution": "Estudiar una capa aislante en probetas con el mismo espacio y función de referencia.",
      "benefit": "Medir flujo térmico y comportamiento húmedo; considerar masa, mantenimiento y seguridad.",
      "implementation": "Ingeniería térmica e Instalaciones: definir ciclos frío-humedad y comparar muestras secas y húmedas."
    },
    "check": [
      "¿Delimita amenaza o interrupción, exposición, vulnerabilidad y consecuencia?",
      "¿Explica el mecanismo biológico y reconoce sus límites?",
      "¿Define una comparación con función y condiciones equivalentes?",
      "¿Identifica indicadores, contrapartidas y posibles resultados desfavorables?",
      "¿Propone ensayos, responsables y criterios para aceptar o rechazar la hipótesis?"
    ]
  },
  "r1": {
    "recommendedModel": "Physarum polycephalum",
    "mechanism": "Este moho mucilaginoso reorganiza redes de transporte entre fuentes de alimento; se ha estudiado su eficiencia y tolerancia a fallos.",
    "caution": "Una red biológica no acredita independencia de proveedores, calidad, capacidad ni plazos.",
    "explanation": "Una red ficticia de suministros pierde un proveedor. Diseña una comparación de rutas alternativas, verificando que no compartan la misma dependencia crítica.",
    "answer": {
      "problem": "Comparar una red ficticia concentrada con alternativas independientes para una misma necesidad de suministro.",
      "organism": "Este moho mucilaginoso reorganiza redes de transporte entre fuentes de alimento; se ha estudiado su eficiencia y tolerancia a fallos.",
      "principle": "Redes adaptativas y redundancia",
      "solution": "Dibujar una red genérica y comparar su conectividad al retirar un nodo o una dependencia compartida.",
      "benefit": "Medir nodos sin ruta alternativa, tiempo de recuperación estimado y coste de redundancia sin atribuir beneficios reales.",
      "implementation": "Compras, Calidad y Logística: verificar dependencia común, cualificación y capacidad en un ejercicio de mesa."
    },
    "check": [
      "¿Delimita amenaza o interrupción, exposición, vulnerabilidad y consecuencia?",
      "¿Explica el mecanismo biológico y reconoce sus límites?",
      "¿Define una comparación con función y condiciones equivalentes?",
      "¿Identifica indicadores, contrapartidas y posibles resultados desfavorables?",
      "¿Propone ensayos, responsables y criterios para aceptar o rechazar la hipótesis?"
    ]
  },
  "r2": {
    "recommendedModel": "Sellado de heridas en plantas",
    "mechanism": "Algunas plantas sellan heridas mediante exudados o cambios mecánicos; la reparación posterior puede ser distinta.",
    "caution": "Sellar una grieta no demuestra restauración de resistencia o aeronavegabilidad; puede ocultar daños.",
    "explanation": "Una capa protectora experimental no crítica sufre daños superficiales repetidos. Explora mecanismos de sellado y recuperación sin asumir restauración estructural.",
    "answer": {
      "problem": "Comparar un recubrimiento experimental con su referencia tras daño superficial definido.",
      "organism": "Algunas plantas sellan heridas mediante exudados o cambios mecánicos; la reparación posterior puede ser distinta.",
      "principle": "Autosellado y reparación funcional",
      "solution": "Explorar un concepto de autosellado de probetas y verificar si recupera la función de barrera.",
      "benefit": "Medir recuperación de barrera, repetibilidad, inspección y coste; no inferir extensión de vida.",
      "implementation": "Materiales, Mantenimiento y Calidad: comprobar daño residual y criterios de rechazo con ensayos."
    },
    "check": [
      "¿Delimita amenaza o interrupción, exposición, vulnerabilidad y consecuencia?",
      "¿Explica el mecanismo biológico y reconoce sus límites?",
      "¿Define una comparación con función y condiciones equivalentes?",
      "¿Identifica indicadores, contrapartidas y posibles resultados desfavorables?",
      "¿Propone ensayos, responsables y criterios para aceptar o rechazar la hipótesis?"
    ]
  },
  "r3": {
    "recommendedModel": "Banco de peces",
    "mechanism": "Los individuos pueden responder a vecinos y generar coordinación colectiva sin un mando central único.",
    "caution": "La analogía no justifica eliminar autoridad, seguridad o control de cambios; el modelo no predice disponibilidad.",
    "explanation": "Un flujo logístico ficticio pierde acceso a un recurso. Explora coordinación distribuida, manteniendo responsabilidad y trazabilidad de las decisiones.",
    "answer": {
      "problem": "Comparar un flujo ficticio dependiente de un único punto de información con uno que conserve alternativas.",
      "organism": "Los individuos pueden responder a vecinos y generar coordinación colectiva sin un mando central único.",
      "principle": "Coordinación local y respuesta colectiva",
      "solution": "Plantear un ejercicio de coordinación con reglas claras, escalación y registro de decisiones.",
      "benefit": "Medir tareas bloqueadas, tiempo hasta decisión, errores y carga de coordinación.",
      "implementation": "Operaciones y Logística: hacer una prueba de mesa con interrupciones equivalentes y revisión de responsabilidades."
    },
    "check": [
      "¿Delimita amenaza o interrupción, exposición, vulnerabilidad y consecuencia?",
      "¿Explica el mecanismo biológico y reconoce sus límites?",
      "¿Define una comparación con función y condiciones equivalentes?",
      "¿Identifica indicadores, contrapartidas y posibles resultados desfavorables?",
      "¿Propone ensayos, responsables y criterios para aceptar o rechazar la hipótesis?"
    ]
  },
  "r4": {
    "recommendedModel": "Geco",
    "mechanism": "La microestructura de sus dedos permite adhesión reversible mediante interacciones superficiales.",
    "caution": "La adhesión biológica no prueba capacidad de carga, durabilidad, seguridad ni compatibilidad de una unión aeronáutica.",
    "explanation": "Un conjunto experimental no crítico contiene una pieza que debe sustituirse periódicamente. Explora una unión reversible para evitar reemplazar el conjunto completo.",
    "answer": {
      "problem": "Comparar un conjunto de ensayo con acceso limitado frente a una alternativa desmontable de función equivalente.",
      "organism": "La microestructura de sus dedos permite adhesión reversible mediante interacciones superficiales.",
      "principle": "Estudiar la adhesión reversible para desacoplar la función de fijación de la sustitución del conjunto y comprobar su repetibilidad.",
      "solution": "Investigar un concepto de fijación reversible en banco, preservando interfaces y requisitos de inspección.",
      "benefit": "Medir tiempo de desmontaje, daños y repetibilidad; estudiar masa y mantenimiento.",
      "implementation": "Ingeniería y Mantenimiento: verificar criterios mecánicos, ciclos de uso y condiciones de rechazo en laboratorio."
    },
    "check": [
      "¿Delimita amenaza o interrupción, exposición, vulnerabilidad y consecuencia?",
      "¿Explica el mecanismo biológico y reconoce sus límites?",
      "¿Define una comparación con función y condiciones equivalentes?",
      "¿Identifica indicadores, contrapartidas y posibles resultados desfavorables?",
      "¿Propone ensayos, responsables y criterios para aceptar o rechazar la hipótesis?"
    ]
  }
};
export const expansionSources: Record<string,string> = {
  "c12": "https://pubmed.ncbi.nlm.nih.gov/26089358/",
  "c13": "https://pubmed.ncbi.nlm.nih.gov/22208552/",
  "c14": "https://pubmed.ncbi.nlm.nih.gov/19570796/",
  "c15": "https://pubmed.ncbi.nlm.nih.gov/31005607/",
  "r1": "https://pubmed.ncbi.nlm.nih.gov/20093467/",
  "r2": "https://pubmed.ncbi.nlm.nih.gov/31105211/",
  "r3": "https://pubmed.ncbi.nlm.nih.gov/22065759/",
  "r4": "https://doi.org/10.1038/35015073"
};
export const EXTRA_MODELS: Organism[] = [
  {
    "id": "o11",
    "name": "Hormiga plateada del Sáhara",
    "strategy": "Sus pelos especializados reflejan parte de la radiación solar y favorecen la emisión térmica infrarroja.",
    "principle": "Reflexión solar y emisión térmica",
    "fact": "La respuesta depende del espectro, orientación, entorno y degradación; no garantiza refrigeración.",
    "image": "o11-photo.jpg"
  },
  {
    "id": "o12",
    "name": "Escorpión del desierto",
    "strategy": "La geometría de su superficie ha inspirado investigaciones sobre erosión por arena.",
    "principle": "Gestión del impacto de partículas",
    "fact": "El resultado depende del material, la trayectoria de partículas y las condiciones; una textura no es universalmente resistente.",
    "image": "o12-photo.jpg"
  },
  {
    "id": "o13",
    "name": "Piña de conífera",
    "strategy": "Las capas de las escamas cambian de dimensiones de forma desigual con la humedad, provocando movimiento.",
    "principle": "Respuesta higroscópica diferencial",
    "fact": "Humedad no equivale a lluvia o condensación; la respuesta puede ser lenta, irreversible o dependiente de temperatura.",
    "image": "o13-photo.jpg"
  },
  {
    "id": "o14",
    "name": "Plumas de pingüino",
    "strategy": "La microestructura de las plumas contribuye al aislamiento del recubrimiento.",
    "principle": "Aislamiento mediante estructura y aire retenido",
    "fact": "El aislamiento puede perder eficacia al humedecerse y no resuelve por sí solo hielo, combustible ni seguridad energética.",
    "image": "o14-photo.jpg"
  },
  {
    "id": "o15",
    "name": "Physarum polycephalum",
    "strategy": "Este moho mucilaginoso reorganiza redes de transporte entre fuentes de alimento; se ha estudiado su eficiencia y tolerancia a fallos.",
    "principle": "Redes adaptativas y redundancia",
    "fact": "Una red biológica no acredita independencia de proveedores, calidad, capacidad ni plazos.",
    "image": "o15-photo.jpg"
  },
  {
    "id": "o16",
    "name": "Sellado de heridas en plantas",
    "strategy": "Algunas plantas sellan heridas mediante exudados o cambios mecánicos; la reparación posterior puede ser distinta.",
    "principle": "Autosellado y reparación funcional",
    "fact": "Sellar una grieta no demuestra restauración de resistencia o aeronavegabilidad; puede ocultar daños.",
    "image": "o16-photo.jpg"
  }
].map(o=>({...o,image:import.meta.env.BASE_URL+"images/nature/"+o.image}));
export const challengeTrack = (id?: string) => id && STRATEGIC_CHALLENGES.some(c=>c.id===id) ? "resilience" : id && /^(c9|c10|c11|c12|c13|c14|c15)$/.test(id) ? "climate" : "general";
export type Track = "general" | "climate" | "resilience";
