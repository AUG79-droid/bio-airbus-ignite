import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface VotingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function VotingScreen({ onNext, onBack }: VotingScreenProps) {
  const { teams, voteForTeam } = useBioLab();
  const [votedTeams, setVotedTeams] = useState<Set<number>>(new Set());

  const criteria = [
    {
      title: "Viabilidad técnica",
      desc: "¿Se podría pilotar o analizar en Airbus con un siguiente paso razonable?",
    },
    {
      title: "Originalidad",
      desc: "¿La inspiración natural y la traducción a Airbus aportan una idea interesante?",
    },
    {
      title: "Impacto potencial",
      desc: "¿Puede mejorar eficiencia, sostenibilidad, mantenimiento o rendimiento?",
    },
  ];

  const rankedTeams = useMemo(() => {
    return teams.map((team, index) => ({ team, index }));
  }, [teams]);

  const maxVotes = Math.max(...teams.map((t) => t.votes), 1);

  const handleVote = (index: number) => {
    if (votedTeams.has(index)) return;
    voteForTeam(index);
    setVotedTeams((prev) => new Set(prev).add(index));
  };

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 mb-8"
        >
          <div>
            <span className="biolab-phase mb-4 inline-flex">Fase 07 — Votación</span>
            <h2 className="biolab-section-title mb-3">Ahora elegid la propuesta más prometedora</h2>
            <p className="biolab-subtitle max-w-3xl">
              Este es el <strong>paso 7</strong>. Aquí no se diseña más. Aquí se compara cada propuesta y se decide cuál parece <strong>más sólida</strong>,
              <strong> más original</strong> y <strong>más útil para Airbus</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-7 rounded-sm ${i < votedTeams.size ? "bg-success" : "bg-border"}`}
                />
              ))}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Votos emitidos</div>
              <div className="text-sm font-semibold text-foreground">{votedTeams.size} propuesta(s) valorada(s)</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="biolab-card-dark px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
              <div>
                <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                  Qué tienes que hacer aquí
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Compara las propuestas y da un voto a la que mejor cerraría el workshop
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  Lee cada propuesta como si fueras parte de un comité interno de innovación. No votes la más bonita: vota la que combine mejor
                  <strong> claridad</strong>, <strong>lógica biomimética</strong> y <strong>potencial real de piloto</strong>.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200/90 text-sm leading-7">
                  <strong className="block text-white mb-2">Cómo votar en esta demo</strong>
                  <ul className="space-y-1">
                    <li>• Revisa el título, el reto, el modelo natural y el resumen.</li>
                    <li>• Usa los 3 criterios de la derecha como guía mental.</li>
                    <li>• Pulsa <strong>“Dar 1 voto”</strong> solo en las propuestas que te parezcan realmente defendibles.</li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {criteria.map((criterion, i) => (
                  <div key={criterion.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-2">Criterio {i + 1}</div>
                    <div className="text-white font-semibold mb-2">{criterion.title}</div>
                    <p className="text-sm leading-6 text-slate-300">{criterion.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-5 mb-12">
          {rankedTeams.map(({ team, index }, i) => {
            const voteProgress = maxVotes > 0 ? (team.votes / maxVotes) * 100 : 0;
            const summary =
              team.pitchSummary?.trim() ||
              [team.canvas.problem, team.canvas.solution, team.canvas.benefit].filter(Boolean).join(". ") ||
              "Esta propuesta todavía necesita un resumen más claro antes de la sesión final.";

            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.06 }}
                className="biolab-card"
              >
                <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_.9fr_auto] gap-5 items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-mono font-bold text-white" style={{ background: team.color }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-display text-foreground leading-tight">
                          {team.pitchTitle?.trim() || `Propuesta del equipo ${team.name}`}
                        </h3>
                        <div className="text-sm text-muted-foreground">Equipo {team.name}</div>
                      </div>
                      {votedTeams.has(index) && <span className="biolab-badge">Voto registrado</span>}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 text-xs">
                      {team.challenge && <span className="biolab-badge">Reto: {team.challenge.title}</span>}
                      {team.organism && <span className="biolab-badge">Modelo: {team.organism.name}</span>}
                      {team.organism?.principle && <span className="biolab-badge">Principio: {team.organism.principle}</span>}
                    </div>

                    <p className="text-sm md:text-base leading-7 text-muted-foreground mb-4">{summary}</p>

                    <div className="rounded-2xl border border-border bg-muted/25 p-4">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">Qué deberías valorar al votar</div>
                      <div className="grid md:grid-cols-3 gap-3 text-sm text-foreground">
                        <div><strong>Viabilidad</strong><br /><span className="text-muted-foreground">¿Se entiende un siguiente paso real?</span></div>
                        <div><strong>Originalidad</strong><br /><span className="text-muted-foreground">¿La conexión naturaleza-Airbus tiene sentido?</span></div>
                        <div><strong>Impacto</strong><br /><span className="text-muted-foreground">¿Puede aportar mejora tangible?</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {team.organism?.image ? (
                      <img
                        src={team.organism.image}
                        alt={team.organism.name}
                        className="w-full h-44 object-cover rounded-2xl border border-border shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-44 rounded-2xl border border-border bg-muted" />
                    )}
                    <div className="rounded-2xl border border-border bg-card p-4">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">Marcador actual</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Votos acumulados</span>
                        <strong className="text-2xl font-display text-foreground">{team.votes}</strong>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${voteProgress}%` }}
                          transition={{ duration: 0.45 }}
                          className="h-full rounded-full"
                          style={{ background: team.color }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="xl:w-52 flex xl:block gap-3">
                    <button
                      onClick={() => handleVote(index)}
                      disabled={votedTeams.has(index)}
                      className={`w-full ${votedTeams.has(index) ? "biolab-btn-ghost opacity-70 cursor-not-allowed" : "biolab-btn-primary"}`}
                    >
                      {votedTeams.has(index) ? "Voto emitido" : "Dar 1 voto"}
                    </button>
                    <div className="rounded-2xl border border-border bg-card p-4 text-sm leading-6 text-muted-foreground xl:mt-3">
                      <strong className="block text-foreground mb-1">Consejo</strong>
                      Vota la propuesta que presentarías a una revisión interna sin necesidad de explicar demasiado contexto extra.
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver al pitch</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Ir al paso 8: ver resultados
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
