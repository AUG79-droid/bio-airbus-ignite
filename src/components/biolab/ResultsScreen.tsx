import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface ResultsScreenProps {
  onRestart: () => void;
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

  if (!hasMeaningfulRanking) {
    return (
      <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
        <div className="biolab-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="biolab-phase mb-5 inline-flex">Resultados finales</span>
            <h2 className="biolab-section-title mb-3">Cierre de la sesión</h2>
            <p className="biolab-subtitle max-w-3xl mx-auto">
              {singleTeamMode
                ? "Como en esta demo solo había un equipo, aquí no hay una propuesta “ganadora”. Lo que ves es la propuesta que habéis generado durante la sesión."
                : "Aún no hay votos suficientes para hablar de ranking. Lo importante aquí es revisar la propuesta construida y decidir si merece un piloto o una iteración."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto mb-10">
            <div className="biolab-card-dark px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
                <div>
                  <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                    Qué significa este resultado
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
                    No es la propuesta correcta. Es la propuesta que ha salido de vuestro workshop.
                  </h3>
                  <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-6">
                    En biomímesis aplicada no suele existir una única respuesta válida. Lo importante es que la idea conecte bien <strong>reto Airbus</strong>, <strong>modelo natural</strong>, <strong>principio copiado</strong> y <strong>siguiente paso</strong>.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Cómo leer esta pantalla</span>
                    <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                      <li>• Si solo había un equipo, esto es un <strong>cierre de sesión</strong>, no una clasificación.</li>
                      <li>• Si no se emitieron votos, no hay “ganadora”; solo hay una propuesta pendiente de revisión.</li>
                      <li>• El siguiente valor está en decidir si merece un <strong>piloto</strong>, una mejora o una nueva iteración.</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <span className="biolab-label block mb-3">Propuesta resultante</span>
                  <h4 className="text-2xl font-display font-bold text-white mb-3">{topTeam.pitchTitle || topTeam.name}</h4>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="biolab-label block mb-1">Reto Airbus</span>
                      <p className="text-slate-200/85">{topTeam.challenge?.title || "Sin reto"}</p>
                    </div>
                    <div>
                      <span className="biolab-label block mb-1">Modelo natural</span>
                      <p className="text-slate-200/85">{topTeam.organism?.name || "Sin modelo"}</p>
                    </div>
                    <div>
                      <span className="biolab-label block mb-1">Principio</span>
                      <p className="text-slate-200/85">{topTeam.organism?.principle || "Sin principio"}</p>
                    </div>
                    <div>
                      <span className="biolab-label block mb-1">Solución propuesta</span>
                      <p className="text-slate-200/85">{topTeam.canvas.solution || "Aún sin completar"}</p>
                    </div>
                    <div>
                      <span className="biolab-label block mb-1">Impacto esperado</span>
                      <p className="text-slate-200/85">{topTeam.canvas.benefit || "Aún sin completar"}</p>
                    </div>
                    <div>
                      <span className="biolab-label block mb-1">Siguiente paso</span>
                      <p className="text-slate-200/85">{topTeam.canvas.implementation || "Aún sin completar"}</p>
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
          <span className="biolab-phase mb-5 inline-flex">Resultados finales</span>
          <h2 className="biolab-section-title mb-3">Propuesta más votada</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            Esto no significa “respuesta correcta”. Significa que el grupo ha considerado esta propuesta la <strong>más prometedora</strong> para seguir explorándola.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto mb-10">
          <div className="biolab-card-dark text-center py-10 px-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--gradient-accent)" }} />
            <span className="biolab-label block mb-2" style={{ color: "hsl(45, 95%, 60%)" }}>Propuesta más votada</span>
            <h3 className="text-3xl md:text-4xl font-bold font-display mb-3 text-white">{topTeam.pitchTitle || topTeam.name}</h3>
            <p className="text-sm mb-5 text-slate-300">Equipo {topTeam.name}</p>
            {topTeam.pitchSummary && (
              <p className="text-base leading-relaxed max-w-2xl mx-auto mb-6 text-slate-200/85">{topTeam.pitchSummary}</p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div>
                <span className="block text-3xl font-display font-bold" style={{ color: "hsl(45, 95%, 60%)" }}>{topTeam.votes}</span>
                <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>votos</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-100">{topTeam.challenge?.title || "Sin reto"}</span>
                <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>reto</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-100">{topTeam.organism?.name || "Sin modelo"}</span>
                <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>modelo</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-3 mb-16">
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
                  <h3 className="text-base font-semibold font-display text-foreground">{team.pitchTitle || team.name}</h3>
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
