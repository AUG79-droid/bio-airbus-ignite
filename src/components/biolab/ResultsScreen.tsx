import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface ResultsScreenProps {
  onRestart: () => void;
}

export default function ResultsScreen({ onRestart }: ResultsScreenProps) {
  const { teams } = useBioLab();
  const sorted = [...teams].sort((a, b) => b.votes - a.votes);
  const maxVotes = sorted[0]?.votes ?? 1;

  return (
    <div className="min-h-screen flex flex-col py-20">
      <div className="biolab-container">
        {/* Hero result header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="biolab-phase mb-5 inline-flex">Resultados finales</span>
          <h2 className="biolab-section-title mb-3">Ranking de propuestas</h2>
          <p className="biolab-subtitle">Clasificación por votos de los participantes</p>
        </motion.div>

        {/* Winner highlight */}
        {sorted.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto mb-10"
          >
            <div className="biolab-card-dark text-center py-10 px-8 relative overflow-hidden">
              {/* Subtle accent border top */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--gradient-accent)" }} />

              <span className="biolab-label block mb-2" style={{ color: "hsl(45, 95%, 60%)" }}>Propuesta ganadora</span>
              <h3 className="text-3xl md:text-4xl font-bold font-display mb-3" style={{ color: "hsl(0, 0%, 98%)" }}>
                {sorted[0].pitchTitle || sorted[0].name}
              </h3>
              <p className="text-sm mb-4" style={{ color: "hsl(210, 15%, 55%)" }}>
                Equipo {sorted[0].name}
              </p>
              {sorted[0].pitchSummary && (
                <p className="text-base leading-relaxed max-w-lg mx-auto mb-6" style={{ color: "hsl(210, 15%, 70%)" }}>
                  {sorted[0].pitchSummary}
                </p>
              )}
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <span className="block text-3xl font-display font-bold" style={{ color: "hsl(45, 95%, 60%)" }}>{sorted[0].votes}</span>
                  <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>votos</span>
                </div>
                {sorted[0].challenge && (
                  <div className="text-center">
                    <span className="block text-sm font-medium" style={{ color: "hsl(210, 15%, 80%)" }}>{sorted[0].challenge.title}</span>
                    <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>reto</span>
                  </div>
                )}
                {sorted[0].organism && (
                  <div className="text-center">
                    <span className="block text-sm font-medium" style={{ color: "hsl(210, 15%, 80%)" }}>{sorted[0].organism.name}</span>
                    <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>modelo</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Remaining rankings */}
        <div className="max-w-3xl mx-auto space-y-3 mb-16">
          {sorted.slice(1).map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="biolab-card"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-lg font-bold text-muted-foreground w-8 text-center">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <div className="w-3 h-8 rounded-sm" style={{ background: team.color }} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold font-display text-foreground">
                    {team.pitchTitle || team.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">Equipo {team.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${maxVotes > 0 ? (team.votes / maxVotes) * 100 : 0}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
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
