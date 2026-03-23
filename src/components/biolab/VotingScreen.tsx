import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface VotingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function VotingScreen({ onNext, onBack }: VotingScreenProps) {
  const { teams, voteForTeam } = useBioLab();

  return (
    <div className="min-h-screen flex flex-col justify-center py-16">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-badge mb-4 inline-block">Paso 6b</span>
          <h2 className="biolab-section-title mb-4">¡Hora de votar!</h2>
          <p className="biolab-subtitle max-w-2xl mx-auto">
            Escucha los pitches y vota por las ideas que más te inspiren
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6 mb-12">
          {teams.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="biolab-card"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: team.color }}>
                  <span className="text-2xl font-bold font-display" style={{ color: "white" }}>{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold font-display text-foreground">{team.pitchTitle || team.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Equipo {team.name}</p>
                  {team.pitchSummary && (
                    <p className="text-foreground/80 mt-2 leading-relaxed">{team.pitchSummary}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <span>{team.challenge?.icon} {team.challenge?.title}</span>
                    <span>•</span>
                    <span>{team.organism?.image} {team.organism?.name}</span>
                  </div>
                </div>
                <div className="text-center shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => voteForTeam(i)}
                    className="w-16 h-16 rounded-2xl bg-accent/10 hover:bg-accent/20 text-accent text-2xl flex items-center justify-center transition-colors border border-accent/20"
                  >
                    👍
                  </motion.button>
                  <span className="text-lg font-bold font-display text-foreground mt-1 block">{team.votes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors font-medium">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Ver resultados →
          </button>
        </div>
      </div>
    </div>
  );
}
