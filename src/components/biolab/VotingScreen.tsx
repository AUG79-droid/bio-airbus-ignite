import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface VotingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function VotingScreen({ onNext, onBack }: VotingScreenProps) {
  const { teams, activeTeamIndex, voteForTeam } = useBioLab();
  const [votedTeams, setVotedTeams] = useState<Set<number>>(new Set());

  const totalVotes = useMemo(() => teams.reduce((sum, team) => sum + team.votes, 0), [teams]);
  const hasCompetitiveVoting = teams.length > 1;
  const maxVotes = Math.max(...teams.map((t) => t.votes), 1);

  const handleVote = (index: number) => {
    if (votedTeams.has(index)) return;
    voteForTeam(index);
    setVotedTeams((prev) => new Set(prev).add(index));
  };

  if (!hasCompetitiveVoting) {
    const team = teams[0];

    return (
      <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
        <div className="biolab-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <span className="biolab-phase mb-5 inline-flex">Fase 07 — Cierre de propuesta</span>
            <h2 className="biolab-section-title mb-3">Aquí no hay una “respuesta correcta”</h2>
            <p className="biolab-subtitle max-w-3xl mx-auto">
              Como en esta sesión solo hay <strong>un equipo</strong>, esta pantalla no sirve para competir. Sirve para hacer una <strong>revisión rápida</strong> antes de cerrar la sesión.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mb-8">
            <div className="biolab-card-dark px-6 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
                <div>
                  <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                    Qué significa este resultado
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                    Esta no es la idea “correcta”. Es la propuesta que vuestro equipo ha construido.
                  </h3>
                  <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                    En BioLab Airbus no se busca acertar una única solución. Se busca generar una propuesta <strong>coherente</strong>, <strong>defendible</strong> y con un <strong>siguiente paso razonable</strong>.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Antes de cerrar, comprobad esto</span>
                    <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                      <li>• ¿La propuesta responde de verdad al reto Airbus?</li>
                      <li>• ¿La inspiración natural encaja con lo que proponéis?</li>
                      <li>• ¿Queda claro cuál sería el primer piloto o validación?</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Equipo</span>
                    <p className="text-lg font-semibold text-white">{team?.name || "Equipo"}</p>
                    <p className="text-sm text-slate-300 mt-1">1 propuesta generada · sin comparación competitiva</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Reto</span>
                    <p className="text-sm text-slate-200/85 leading-6">{team?.challenge?.title || "Sin reto asignado"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Modelo natural</span>
                    <p className="text-sm text-slate-200/85 leading-6">{team?.organism?.name || "Sin modelo elegido"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4">
            <button onClick={onBack} className="biolab-btn-ghost">← Volver al pitch</button>
            <button onClick={onNext} className="biolab-btn-primary">
              Ir al paso 8: ver cierre de sesión
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 mb-8">
          <div>
            <span className="biolab-phase mb-5 inline-flex">Fase 07 — Votación</span>
            <h2 className="biolab-section-title mb-3">Ahora elegid la propuesta más prometedora</h2>
            <p className="biolab-subtitle max-w-3xl">
              Esto no es un examen. Aquí comparáis las propuestas y decidís cuál parece más <strong>sólida</strong>, más <strong>original</strong> y más <strong>útil para Airbus</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-2.5 h-7 rounded-sm ${i < Math.min(totalVotes, 3) ? "bg-success" : "bg-border"}`} />
              ))}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Votos emitidos</div>
              <div className="text-sm font-semibold text-foreground">{totalVotes} propuesta(s) valorada(s)</div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mb-8">
          <div className="biolab-card-dark px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
              <div>
                <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                  Qué tienes que hacer aquí
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Compara las propuestas y da un voto a la que mejor cerraría el workshop
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  Lee cada propuesta como si fueras parte de un comité interno de innovación. No votes la más bonita: vota la que combine mejor <strong>claridad</strong>, <strong>lógica biomimética</strong> y <strong>potencial real de piloto</strong>.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Cómo votar en esta demo</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• Revisa el título, el reto, el modelo natural y el resumen.</li>
                    <li>• Usa los 3 criterios de la derecha como guía mental.</li>
                    <li>• Pulsa <strong>“Dar 1 voto”</strong> solo en las propuestas que te parezcan realmente defendibles.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
                {[
                  ["Criterio 1", "Viabilidad técnica", "¿Se podría pilotar o analizar en Airbus con un siguiente paso razonable?"],
                  ["Criterio 2", "Originalidad", "¿La inspiración natural y la traducción a Airbus aportan una idea interesante?"],
                  ["Criterio 3", "Impacto potencial", "¿Puede mejorar eficiencia, sostenibilidad, mantenimiento o rendimiento?"],
                ].map(([step, title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">{step}</span>
                    <p className="text-white font-semibold mb-2">{title}</p>
                    <p className="text-sm text-slate-200/75 leading-6">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-5 mb-12">
          {teams.map((team, i) => {
            const ownTeam = i === activeTeamIndex;
            const alreadyVoted = votedTeams.has(i);

            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="biolab-card"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_170px_120px] gap-4 items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-white" style={{ background: team.color }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-display text-foreground">{team.pitchTitle || `Propuesta del equipo ${team.name}`}</h3>
                        <p className="text-sm text-muted-foreground">Equipo {team.name}</p>
                      </div>
                      {ownTeam && <span className="biolab-badge">Tu equipo</span>}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3 text-xs">
                      {team.challenge && <span className="biolab-badge">Reto: {team.challenge.title}</span>}
                      {team.organism && <span className="biolab-badge">Modelo: {team.organism.name}</span>}
                      {team.organism?.principle && <span className="biolab-badge">Principio: {team.organism.principle}</span>}
                    </div>

                    <p className="text-sm text-muted-foreground leading-7 mb-4">
                      {team.pitchSummary || "Esta propuesta todavía necesita un resumen más claro antes de la sesión final."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-border bg-muted/40 p-3">
                        <span className="biolab-label block mb-1">Qué deberías valorar al votar</span>
                        <p className="text-xs text-muted-foreground leading-5"><strong>Viabilidad</strong><br />¿Se entiende un siguiente paso real?</p>
                      </div>
                      <div className="rounded-xl border border-border bg-muted/40 p-3">
                        <span className="biolab-label block mb-1">Originalidad</span>
                        <p className="text-xs text-muted-foreground leading-5">¿La conexión naturaleza-Airbus tiene sentido y merece revisarse?</p>
                      </div>
                      <div className="rounded-xl border border-border bg-muted/40 p-3">
                        <span className="biolab-label block mb-1">Impacto</span>
                        <p className="text-xs text-muted-foreground leading-5">¿Puede aportar mejora tangible?</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-border bg-muted/30">
                    {team.organism?.image ? (
                      <img src={team.organism.image} alt={team.organism.name} className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">Sin imagen</div>
                    )}
                    <div className="p-3 border-t border-border">
                      <span className="biolab-label block mb-1">Marcador actual</span>
                      <p className="text-sm text-muted-foreground">Votos acumulados</p>
                      <p className="text-2xl font-display font-bold text-foreground mt-1">{team.votes}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleVote(i)}
                      disabled={ownTeam || alreadyVoted}
                      className={`w-full ${ownTeam || alreadyVoted ? "biolab-btn-ghost opacity-60 cursor-not-allowed" : "biolab-btn-primary"}`}
                    >
                      {ownTeam ? "No votar" : alreadyVoted ? "Voto emitido" : "Dar 1 voto"}
                    </button>
                    <div className="rounded-xl border border-border bg-muted/40 p-3">
                      <span className="biolab-label block mb-1">Consejo</span>
                      <p className="text-xs text-muted-foreground leading-5">
                        Vota la propuesta que presentarías a una revisión interna sin necesidad de explicar demasiado contexto extra.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver al pitch</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Ir al paso 8: ver resultados
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
