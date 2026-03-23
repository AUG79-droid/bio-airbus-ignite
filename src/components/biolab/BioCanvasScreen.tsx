import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { CanvasData } from "@/data/biolab-data";

interface BioCanvasScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const CANVAS_FIELDS: { key: keyof CanvasData; label: string; placeholder: string; icon: string }[] = [
  { key: "problem", label: "Problema", placeholder: "¿Qué problema específico intentas resolver?", icon: "🎯" },
  { key: "organism", label: "Inspiración natural", placeholder: "¿Qué organismo o estrategia te inspira?", icon: "🌿" },
  { key: "principle", label: "Principio biomimético", placeholder: "¿Qué principio de la naturaleza aplicas?", icon: "🧬" },
  { key: "solution", label: "Solución propuesta", placeholder: "Describe tu solución inspirada en la naturaleza", icon: "💡" },
  { key: "benefit", label: "Beneficio esperado", placeholder: "¿Qué mejora concreta aporta?", icon: "📈" },
  { key: "implementation", label: "Primer paso", placeholder: "¿Cómo empezarías a probarlo?", icon: "🚀" },
];

export default function BioCanvasScreen({ onNext, onBack }: BioCanvasScreenProps) {
  const { activeTeam, updateCanvas } = useBioLab();

  if (!activeTeam) return null;

  return (
    <div className="min-h-screen flex flex-col py-16">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-badge mb-4 inline-block">Paso 5</span>
          <h2 className="biolab-section-title mb-4">Canvas biomimético</h2>
          <p className="biolab-subtitle">
            Equipo <strong style={{ color: activeTeam.color }}>{activeTeam.name}</strong>: desarrolla tu idea paso a paso
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {CANVAS_FIELDS.map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`biolab-card ${field.key === "solution" ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{field.icon}</span>
                <h3 className="font-semibold font-display text-foreground">{field.label}</h3>
              </div>
              <textarea
                value={activeTeam.canvas[field.key]}
                onChange={(e) => updateCanvas(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={field.key === "solution" ? 4 : 3}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-body"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors font-medium">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Preparar pitch →
          </button>
        </div>
      </div>
    </div>
  );
}
