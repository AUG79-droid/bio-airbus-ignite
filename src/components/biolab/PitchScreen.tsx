import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface PitchScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PitchScreen({ onNext, onBack }: PitchScreenProps) {
  const { activeTeam, updatePitch } = useBioLab();

  if (!activeTeam) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center py-16">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-badge mb-4 inline-block">Paso 6a</span>
          <h2 className="biolab-section-title mb-4">Prepara tu pitch</h2>
          <p className="biolab-subtitle">
            Equipo <strong style={{ color: activeTeam.color }}>{activeTeam.name}</strong>: resume tu idea para presentarla
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Resumen visual */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="biolab-card mb-6 border-primary/20"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.03), hsl(var(--accent) / 0.03))" }}
          >
            <h3 className="font-semibold font-display text-foreground mb-4">📋 Resumen de tu canvas</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">Reto:</span> <span className="text-foreground font-medium">{activeTeam.challenge?.title ?? "—"}</span></div>
              <div><span className="text-muted-foreground">Inspiración:</span> <span className="text-foreground font-medium">{activeTeam.organism?.name ?? "—"}</span></div>
              <div><span className="text-muted-foreground">Solución:</span> <span className="text-foreground font-medium">{activeTeam.canvas.solution || "—"}</span></div>
              <div><span className="text-muted-foreground">Beneficio:</span> <span className="text-foreground font-medium">{activeTeam.canvas.benefit || "—"}</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="biolab-card mb-6">
            <label className="block font-semibold font-display text-foreground mb-2">🏷️ Nombre de tu idea</label>
            <input
              type="text"
              value={activeTeam.pitchTitle}
              onChange={(e) => updatePitch(e.target.value, activeTeam.pitchSummary)}
              placeholder="Un nombre memorable para tu propuesta..."
              className="w-full bg-secondary/50 border border-border rounded-xl px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="biolab-card mb-8">
            <label className="block font-semibold font-display text-foreground mb-2">🎤 Elevator pitch (30 segundos)</label>
            <textarea
              value={activeTeam.pitchSummary}
              onChange={(e) => updatePitch(activeTeam.pitchTitle, e.target.value)}
              placeholder="Inspirados en [organismo], proponemos [solución] para [reto] porque..."
              rows={5}
              className="w-full bg-secondary/50 border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-body"
            />
          </motion.div>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors font-medium">← Volver</button>
          <button onClick={onNext} className="biolab-btn-accent">
            Ir a votación →
          </button>
        </div>
      </div>
    </div>
  );
}
