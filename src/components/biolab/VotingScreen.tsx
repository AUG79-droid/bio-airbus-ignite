import { useState } from "react";
import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface VotingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function VotingScreen({ onNext, onBack }: VotingScreenProps) {
  const { teams, voteForTeam } = useBioLab();
  const [votedTeams, setVotedTeams] = useState<Set<number>>(new Set());

  const handleVote = (index: number) => {
    voteForTeam(index);
    setVotedTeams((prev) => new Set(prev).add(index));
  };

  const maxVotes = Math.max(...teams.map((t) => t.votes), 1);

  return (
    <div className="min-h-screen flex flex-col py-20">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-phase mb-5 inline-flex">Fase 06b — Evaluación</span>
          <h2 className="biolab-section-title mb-3">Votación de propuestas</h2>
          <p className="biolab-subtitle max-w-xl mx-auto">
            Evalúa cada propuesta por su viabilidad técnica, originalidad y potencial de impacto
          </p>
        </motion.div>

        {/* Voting criteria reminder */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="max-w-3xl mx-auto mb-10">
          <div className="flex flex-wrap justify-center gap-4">
            {["Viabilidad técnica", "Originalidad", "Impacto potencial"].map((criterion, i) => (
              <div key={criterion} className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
                <span className="w-5 h-5 rounded-md bg-primary/8 text-primary flex items-center justify-center text-xs font-mono font-bold">{i + 1}</span>
                <span className="text-sm text-foreground font-medium">{criterion}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          {teams.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="biolab-card"
            >
              <div className="flex items-start gap-5">
                {/* Team identifier */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-mono font-bold"
                    style={{ background: team.color, color: "white" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold font-display text-foreground mb-0.5">
                    {team.pitchTitle || team.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-muted-foreground">Equipo {team.name}</span>
                    {team.challenge && (
                      <>
                        <span className="text-border">·</span>
                        <span className="biolab-badge text-[10px]">{team.challenge.area}</span>
                      </>
                    )}
                  </div>
                  {team.pitchSummary && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">{team.pitchSummary}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {team.challenge && <span>{team.challenge.title}</span>}
                    {team.organism && (
                      <>
                        <span className="text-border">→</span>
                        <span>{team.organism.name}</span>
                        <span className="text-border">→</span>
                        <span>{team.organism.principle}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Vote area */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(i)}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all border ${
                      votedTeams.has(i)
                        ? "bg-success/10 border-success/30 text-success"
                        : "bg-muted border-border text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </motion.button>
                  <span className="text-lg font-display font-bold text-foreground">{team.votes}</span>
                </div>
              </div>

              {/* Vote bar */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(team.votes / maxVotes) * 100}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-full"
                    style={{ background: team.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Ver resultados
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
