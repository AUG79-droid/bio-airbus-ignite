import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface ResultsScreenProps {
  onRestart: () => void;
}

function hasText(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

function makeTitle(team: any) {
  if (hasText(team.pitchTitle)) return team.pitchTitle.trim();

  const challenge = team.challenge?.title?.trim();
  const organism = team.organism?.name?.trim();

  if (challenge && organism) {
    return `${challenge} inspirada en ${organism.toLowerCase()}`;
  }

  if (challenge) return `Propuesta para ${challenge.toLowerCase()}`;
  if (organism) return `Idea inspirada en ${organism.toLowerCase()}`;
  return team.name || "Propuesta del equipo";
}

function fallbackText(value: string | undefined, fallback: string) {
  return hasText(value) ? value!.trim() : fallback;
}

function completeness(team: any) {
  const fields = [
    team.challenge?.title,
    team.organism?.name,
    team.organism?.principle,
    team.canvas?.solution,
    team.canvas?.benefit,
    team.canvas?.implementation,
  ];

  return fields.filter((f) => hasText(f)).length;
}

export default function ResultsScreen({ onRestart }: ResultsScreenProps) {
  const { teams } = useBioLab();
  const sorted = [...teams].sort((a, b) => b.votes - a.votes);
  const totalVotes = sorted.reduce((sum, team) => sum + team.votes, 0);
  const maxVotes = sorted[0]?.votes ?? 0;
  const singleTeamMode = sorted.length <= 1;
  const hasMeaningfulRanking = sorted.length > 1 && totalVotes > 0;
  const topTeam = sorted[0];

  if (!topTeam) return null;

  const topTitle = makeTitle(topTeam);
  const topCompletion = completeness(topTeam);

  if (!hasMeaningfulRanking) {
    return (
      <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
        <div className="biolab-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="biolab-phase mb-5 inline-flex">Fase 08 — Cierre</span>
            <h2 className="biolab-section-title mb-3">Qué sale de este workshop</h2>
            <p className="biolab-subtitle max-w-3xl mx-auto">
              {singleTeamMode
                ? "Como aquí solo había un equipo, esta pantalla no muestra una ganadora. Muestra la propuesta que habéis construido durante la sesión y el nivel de madurez con el que termina."
                : "Todavía no hay votos suficientes para hablar de ranking. Aquí se resume la propuesta que habéis generado y qué partes conviene reforzar antes de presentarla fuera del workshop."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto mb-10">
            <div className="biolab-card-dark px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 items-start">
                <div>
                  <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                    Cómo leer este cierre
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-4 leading-tight">
                    No busca decir si la idea es correcta. Busca dejar claro qué habéis definido y qué falta por concretar.
                  </h3>
                  <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-6">
                    En biomímesis aplicada rara vez hay una única respuesta válida. El valor real está en que la propuesta conecte bien <strong>reto Airbus</strong>, <strong>modelo natural</strong>, <strong>principio biomimético</strong> y <strong>siguiente paso verificable</strong>.
                  </p>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-4">
                    <span className="biolab-label block mb-2">Lectura recomendada</span>
                    <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                      <li>• Si solo había un equipo, esto es un <strong>cierre de sesión</strong>, no una clasificación.</li>
                      <li>• Si no se emitieron votos, no hay “ganadora”; hay una <strong>propuesta en su nivel actual de madurez</strong>.</li>
                      <li>• El siguiente valor está en decidir si merece un <strong>piloto</strong>, una mejora o una nueva iteración.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Nivel de avance alcanzado</span>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className={`w-2.5 h-9 rounded-sm ${i < topCompletion ? "bg-success" : "bg-white/10"}`} />
                        ))}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{topCompletion}/6 bloques bien definidos</p>
                        <p className="text-sm text-slate-300">Cuanto más cerca esté de 6, más presentable estará la propuesta fuera del workshop.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <span className="biolab-label block mb-3">Propuesta resultante</span>
                  <h4 className="text-2xl font-display font-bold text-white mb-4">{topTitle}</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Reto Airbus</span>
                      <p className="text-slate-100 font-medium">{fallbackText(topTeam.challenge?.title, "Reto pendiente de concretar")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Modelo natural</span>
                      <p className="text-slate-100 font-medium">{fallbackText(topTeam.organism?.name, "Modelo natural pendiente")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Principio</span>
                      <p className="text-slate-100 font-medium">{fallbackText(topTeam.organism?.principle, "Principio aún no traducido")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Estado</span>
                      <p className="text-slate-100 font-medium">{topCompletion >= 5 ? "Bastante madura para revisión" : topCompletion >= 3 ? "Tiene base, pero necesita trabajo" : "Todavía muy preliminar"}</p>
                    </div>
                  </div>

                  {topTeam.organism?.image && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-4">
                      <img src={topTeam.organism.image} alt={topTeam.organism.name} className="w-full h-44 object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}

                  <div className="space-y-3 text-sm">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Solución propuesta</span>
                      <p className="text-slate-200/85 leading-7">{fallbackText(topTeam.canvas.solution, "Aquí todavía no habéis dejado una solución cerrada. La lógica del workshop está montada, pero conviene aterrizar una propuesta técnica más concreta.")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Impacto esperado</span>
                      <p className="text-slate-200/85 leading-7">{fallbackText(topTeam.canvas.benefit, "El impacto esperado aún no está cuantificado. El siguiente paso sería estimar qué mejora operativa, técnica o ambiental podría aportar.")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Siguiente paso</span>
                      <p className="text-slate-200/85 leading-7">{fallbackText(topTeam.canvas.implementation, "Todavía no habéis definido la validación inmediata. Lo lógico sería concretar un piloto, prototipo o análisis inicial para revisar la idea.")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-6">Sesión BioLab Airbus finalizada</p>
            <button onClick={onRestart} className="biolab-btn-ghost">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Nueva sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="biolab-phase mb-5 inline-flex">Fase 08 — Resultados</span>
          <h2 className="biolab-section-title mb-3">Propuesta más votada</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            Esto no significa “respuesta correcta”. Significa que el grupo ha considerado esta propuesta la <strong>más prometedora</strong> para seguir explorándola en Airbus.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto mb-10">
          <div className="biolab-card-dark py-10 px-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--gradient-accent)" }} />
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <span className="biolab-label block mb-2" style={{ color: "hsl(45, 95%, 60%)" }}>Propuesta más votada</span>
                <h3 className="text-3xl md:text-4xl font-bold font-display mb-3 text-white">{topTitle}</h3>
                <p className="text-sm mb-5 text-slate-300">Equipo {topTeam.name}</p>
                <p className="text-base leading-relaxed max-w-2xl mb-6 text-slate-200/85">
                  {fallbackText(
                    topTeam.pitchSummary,
                    "La propuesta ha resultado la más votada, aunque aún necesita un resumen ejecutivo más pulido para presentarse fuera del workshop."
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-8 text-center">
                  <div>
                    <span className="block text-3xl font-display font-bold" style={{ color: "hsl(45, 95%, 60%)" }}>{topTeam.votes}</span>
                    <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>votos</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-slate-100">{fallbackText(topTeam.challenge?.title, "Sin reto")}</span>
                    <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>reto</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-slate-100">{fallbackText(topTeam.organism?.name, "Sin modelo")}</span>
                    <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>modelo</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                {topTeam.organism?.image ? (
                  <img src={topTeam.organism.image} alt={topTeam.organism.name} className="w-full h-64 object-cover rounded-2xl" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-64 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 text-sm">
                    Sin imagen disponible
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-3 mb-16">
          {sorted.slice(1).map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="biolab-card"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-lg font-bold text-muted-foreground w-8 text-center">{String(i + 2).padStart(2, "0")}</span>
                <div className="w-3 h-8 rounded-sm" style={{ background: team.color }} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold font-display text-foreground">{makeTitle(team)}</h3>
                  <span className="text-xs text-muted-foreground">Equipo {team.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${maxVotes > 0 ? (team.votes / maxVotes) * 100 : 0}%` }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                      className="h-full rounded-full"
                      style={{ background: team.color }}
                    />
                  </div>
                  <span className="font-display font-bold text-foreground text-lg w-8 text-right">{team.votes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">Sesión BioLab Airbus finalizada</p>
          <button onClick={onRestart} className="biolab-btn-ghost">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Nueva sesión
          </button>
        </div>
      </div>
    </div>
  );
}
