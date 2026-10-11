import { useState } from "react";
import type { TeamData } from "@/data/biolab-data";
import { referenceLabels, referenceSolutions } from "@/data/reference-solutions";

type Props = { teams: TeamData[] };

export default function ReferenceComparison({ teams }: Props) {
  const [assessments, setAssessments] = useState<Record<string, boolean[]>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (teamId: string, criterion: number) => {
    setAssessments((current) => {
      const next = [...(current[teamId] ?? [false, false, false, false])];
      next[criterion] = !next[criterion];
      return { ...current, [teamId]: next };
    });
  };

  return (
    <section className="max-w-6xl mx-auto biolab-card mb-8" aria-label="Comparación final con soluciones de referencia">
      <span className="biolab-phase mb-4 inline-flex">Aprendizaje final · comparación</span>
      <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
        Compara vuestro trabajo con una solución de referencia
      </h2>
      <p className="text-base md:text-lg text-foreground leading-8 mb-3">
        Ahora sí puedes comparar <strong>lo que escribió tu equipo</strong> con una respuesta
        orientativa para el <strong>mismo reto Airbus</strong>. Lee los seis apartados, identifica
        qué has explicado bien y qué falta para que la idea sea defendible.
      </p>
      <p className="text-base text-muted-foreground leading-7 mb-7">
        Las referencias son <strong>ejemplos formativos de hipótesis técnicas</strong>, no respuestas
        únicas, diseños autorizados ni resultados de ensayos. Puedes proponer otro modelo natural:
        lo importante es justificar el mecanismo y plantear una validación contrastable.
        No se califica automáticamente la calidad de lo que escribiste.
      </p>

      <div className="space-y-5">
        {teams.map((team, index) => {
          const reference = team.challenge ? referenceSolutions[team.challenge.id] : undefined;
          const ticks = assessments[team.id] ?? [false, false, false, false];
          const count = ticks.filter(Boolean).length;
          return (
            <details key={team.id} className="rounded-2xl border border-border bg-background/70 p-4 md:p-6" open={expanded[team.id] ?? (index === 0)}>
              <summary
                className="cursor-pointer text-lg font-bold text-primary leading-7"
                onClick={(event) => {
                  event.preventDefault();
                  setExpanded((previous) => ({ ...previous, [team.id]: !(previous[team.id] ?? (index === 0)) }));
                }}
              >
                Equipo {team.name} · {team.challenge?.title ?? "Reto sin definir"} — ver comparación
              </summary>
              {!reference ? (
                <p className="mt-5 text-base text-muted-foreground">No hay referencia definida para este reto. Es necesario revisarlo con una persona experta.</p>
              ) : (
                <div className="mt-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                      <span className="biolab-label block mb-2">Modelo elegido por vuestro equipo</span>
                      <p className="font-semibold text-lg text-foreground">{team.organism?.name ?? "No seleccionado"}</p>
                      <p className="text-base text-muted-foreground mt-2">Esta elección debe justificarse en vuestra propuesta.</p>
                    </div>
                    <div className="rounded-xl bg-white border border-border p-4">
                      <span className="biolab-label block mb-2">Modelo natural de referencia</span>
                      <p className="font-semibold text-lg text-foreground">{reference.recommendedModel}</p>
                      <p className="text-base text-muted-foreground mt-2">{reference.mechanism}</p>
                    </div>
                  </div>
                  {team.organism?.name !== reference.recommendedModel && (
                    <p className="rounded-xl border border-amber-400 bg-amber-50 p-4 text-base text-amber-950 leading-7 mb-5">
                      <strong>El modelo de referencia es distinto al vuestro.</strong> No significa automáticamente
                      que vuestra elección esté mal. Debéis demostrar qué función permite
                      resolver el reto. Si esa relación no puede justificarse, revisad el modelo.
                    </p>
                  )}
                  <p className="text-base leading-7 text-foreground mb-3"><strong>Por qué esta referencia tiene sentido:</strong> {reference.explanation}</p>
                  <p className="text-base leading-7 text-foreground mb-6"><strong>Límites que no se pueden ignorar:</strong> {reference.caution}</p>
                  <div className="space-y-4">
                    {referenceLabels.map(({ key, label }) => (
                      <div key={key} className="rounded-xl border border-border overflow-hidden">
                        <h3 className="bg-muted/70 text-foreground font-bold px-4 py-3 text-base">{label}</h3>
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="p-4 bg-white md:border-r border-b md:border-b-0 border-border min-w-0">
                            <p className="font-semibold text-primary mb-2">Vuestra respuesta</p>
                            <p className="text-base text-foreground leading-7 whitespace-pre-wrap break-words">{team.canvas[key] || "No hay respuesta"}</p>
                          </div>
                          <div className="p-4 bg-slate-50 min-w-0">
                            <p className="font-semibold text-emerald-800 mb-2">Ejemplo de referencia razonado</p>
                            <p className="text-base text-slate-900 leading-7">{reference.answer[key]}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-primary/25 bg-white p-5 mt-6">
                    <h3 className="font-bold text-xl mb-2">Comprobación del equipo: ¿qué hemos logrado?</h3>
                    <p className="text-base leading-7 text-muted-foreground mb-4">
                      Responded tras comparar los dos textos. Marcad una casilla solo si
                      vuestra respuesta contiene una explicación concreta que la justifique.
                    </p>
                    <div className="space-y-3">
                      {reference.check.map((question, idx) => (
                        <label key={question} className="flex items-start gap-3 rounded-lg bg-muted/40 p-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(ticks[idx])}
                            onChange={() => toggle(team.id, idx)}
                            className="h-5 w-5 mt-1 accent-primary shrink-0"
                          />
                          <span className="text-base leading-7 text-foreground">{question}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="text-lg font-semibold">{count}/4 criterios marcados por el equipo</p>
                      <p className="text-base text-muted-foreground leading-7 mt-1">
                        {count === 4
                          ? "Habéis identificado los cuatro criterios en vuestra propuesta. Comprobad su evidencia: no supone validación técnica."
                          : `Quedan ${4 - count} criterios sin marcar. Revisad el lienzo o anotad qué información y ensayos necesitaríais para completarlos.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </details>
          );
        })}
      </div>
      <p className="mt-5 text-sm md:text-base text-muted-foreground leading-7">
        Resultado pedagógico: lo valioso es detectar si el mecanismo es pertinente y qué
        experimento permitiría poner a prueba la idea. Si la combinación no tiene justificación,
        la decisión correcta puede ser descartarla o elegir otra inspiración.
      </p>
    </section>
  );
}
