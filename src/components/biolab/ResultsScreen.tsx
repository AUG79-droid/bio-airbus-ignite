import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface ResultsScreenProps {
  onRestart: () => void;
}

export default function ResultsScreen({ onRestart }: ResultsScreenProps) {
  const { teams } = useBioLab();
  const sorted = [...teams].sort((a, b) => b.votes - a.votes);
  const maxVotes = sorted[0]?.votes ?? 0;

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen flex flex-col justify-center py-16">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-6xl mb-6"
          >
            🏆
          </motion.div>
          <h2 className="biolab-section-title mb-4">Resultados</h2>
          <p className="biolab-subtitle">Las ideas que más han inspirado a los equipos</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6 mb-16">
          {sorted.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className={`biolab-card ${i === 0 ? "ring-2 ring-accent" : ""}`}
            >
              <div className="flex items-center gap-5">
                <div className="text-4xl">{medals[i] ?? `#${i + 1}`}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-display text-foreground">
                    {team.pitchTitle || team.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">Equipo {team.name}</p>
                  {team.pitchSummary && (
                    <p className="text-foreground/70 mt-2 text-sm leading-relaxed">{team.pitchSummary}</p>
                  )}
                </div>
                <div className="text-center shrink-0">
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: team.color }}
                    >
                      <span className="text-2xl font-bold font-display" style={{ color: "white" }}>{team.votes}</span>
                    </div>
                    {maxVotes > 0 && (
                      <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(team.votes / maxVotes) * 100}%` }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{ background: team.color }}
                        />
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground mt-1 block">votos</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">¡Gracias por participar en BioLab Airbus!</p>
          <button onClick={onRestart} className="biolab-btn-primary">
            🔄 Nueva sesión
          </button>
        </div>
      </div>
    </div>
  );
}
