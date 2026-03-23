import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface PitchScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PitchScreen({ onNext, onBack }: PitchScreenProps) {
  const { activeTeam, updatePitch } = useBioLab();
  if (!activeTeam) return null;

  const canvasPreview = [
    { label: "Reto", value: activeTeam.challenge?.title },
    { label: "Modelo biológico", value: activeTeam.organism?.name },
    { label: "Principio", value: activeTeam.organism?.principle },
    { label: "Solución", value: activeTeam.canvas.solution },
    { label: "Impacto", value: activeTeam.canvas.benefit },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-phase mb-5 inline-flex">Fase 06a — Presentación</span>
          <h2 className="biolab-section-title mb-3">Pitch final</h2>
          <p className="biolab-subtitle">
            Equipo <strong className="text-foreground">{activeTeam.name}</strong> — Sintetiza tu propuesta en un pitch de 60 segundos
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Canvas summary sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="biolab-card h-full">
              <h3 className="biolab-label mb-4">Resumen del canvas</h3>
              <div className="space-y-4">
                {canvasPreview.map((item) => (
                  <div key={item.label}>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">{item.label}</span>
                    <p className="text-sm text-foreground mt-0.5 leading-relaxed">{item.value || "—"}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pitch form */}
          <div className="md:col-span-3 space-y-5">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="biolab-card">
              <label className="biolab-label block mb-3">Nombre de la propuesta</label>
              <input
                type="text"
                value={activeTeam.pitchTitle}
                onChange={(e) => updatePitch(e.target.value, activeTeam.pitchSummary)}
                placeholder="Un nombre técnico y memorable"
                className="biolab-input text-lg font-display font-semibold"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="biolab-card">
              <div className="flex items-center justify-between mb-3">
                <label className="biolab-label">Elevator pitch</label>
                <span className="font-mono text-[10px] text-muted-foreground">~60 segundos</span>
              </div>
              <textarea
                value={activeTeam.pitchSummary}
                onChange={(e) => updatePitch(activeTeam.pitchTitle, e.target.value)}
                placeholder={"Hemos observado que [organismo] resuelve [problema natural] mediante [principio]. Proponemos aplicar este principio a [reto Airbus] desarrollando [solución concreta], lo que permitiría [beneficio cuantificable]. El primer paso sería [acción de validación]."}
                rows={7}
                className="biolab-input resize-none text-sm leading-relaxed"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="biolab-card-dark py-4 px-5"
            >
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(45, 95%, 60%)" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 15%, 65%)" }}>
                  <strong style={{ color: "hsl(210, 15%, 85%)" }}>Estructura recomendada:</strong> Problema → Inspiración natural → Principio abstracto → Solución técnica → Impacto medible → Siguiente paso
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver al canvas</button>
          <button onClick={onNext} className="biolab-btn-accent">
            Abrir votación
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
