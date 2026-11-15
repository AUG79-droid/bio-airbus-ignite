import { CHALLENGES, ORGANISMS, TEAM_COLORS, type TeamData } from "@/data/biolab-data";

/**
 * Caso ficticio y exclusivamente didáctico para recorrer todo el taller sin
 * introducir respuestas. Ninguna magnitud es un resultado validado de Airbus.
 */
export function createDemoTeam(): TeamData {
  const challenge = CHALLENGES.find((item) => item.id === "c1");
  const organism = ORGANISMS.find((item) => item.id === "o3");
  if (!challenge || !organism) {
    throw new Error("El caso de demostración requiere el reto c1 y el modelo o3.");
  }

  return {
    id: "demo-bioestructura-aves-2026",
    name: "Equipo Bioestructura · DEMO",
    color: TEAM_COLORS[0].value,
    challenge,
    organism,
    canvas: {
      problem: "En un soporte estructural secundario de referencia, cada kilogramo cuenta. Queremos explorar cómo reducir la masa manteniendo los requisitos de rigidez y resistencia, sin asumir ninguna modificación real de un avión ni comprometer la seguridad.",
      organism: "Los huesos de las aves combinan una envolvente resistente, cavidades internas y refuerzos orientados según las solicitaciones. Esa arquitectura consigue una buena relación entre carga soportada y cantidad de material, aunque no es directamente trasladable a una aeronave.",
      principle: "Concentrar material en las trayectorias principales de carga y crear vacíos o refuerzos internos donde el análisis lo permita. La idea biomimética es una estructura jerárquica y optimizada, no reproducir literalmente la geometría de un hueso.",
      solution: "Diseñar de forma conceptual un soporte aeronáutico secundario con una arquitectura interna de nervaduras y celdas, inspirada en la distribución del material en los huesos de aves. Comparar esta geometría con una pieza convencional usando el mismo material y condiciones de carga.",
      benefit: "Hipótesis pendiente de comprobar: reducir masa para una rigidez objetivo equivalente. No se ha demostrado ningún porcentaje de ahorro, beneficio climático ni ventaja económica. La fatiga, el coste de fabricación, la reparabilidad y el impacto de ciclo de vida podrían cambiar la conclusión.",
      implementation: "Primero, definir una pieza base, requisitos y casos de carga. Después, modelar tres variantes y evaluar por elementos finitos masa, rigidez, pandeo y concentraciones de tensión. Si los resultados son prometedores, fabricar probetas, ensayar resistencia y fatiga y realizar revisión de fabricación, seguridad, certificación y ciclo de vida antes de decidir.",
    },
    pitchTitle: "Bioestructura ligera inspirada en los huesos de aves",
    pitchSummary: "Partimos del reto de reducir la masa de un soporte estructural secundario sin perder prestaciones. Observamos que los huesos de las aves distribuyen el material mediante una arquitectura interna jerárquica. Proponemos estudiar un soporte con celdas y nervaduras optimizadas y compararlo con un diseño convencional. El beneficio es todavía una hipótesis: primero comprobaríamos masa, rigidez y resistencia mediante simulación, y después fatiga, fabricación e impacto de ciclo de vida. Es un concepto didáctico, no una solución técnica aprobada por Airbus.",
    votes: 0,
  };
}
