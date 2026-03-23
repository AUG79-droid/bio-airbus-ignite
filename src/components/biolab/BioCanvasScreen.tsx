import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { CanvasData } from "@/data/biolab-data";

interface BioCanvasScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const CANVAS_FIELDS: { key: keyof CanvasData; label: string; sublabel: string; placeholder: string; span?: boolean }[] = [
  { key: "problem", label: "01 — Problema", sublabel: "Definición del reto específico", placeholder: "¿Qué problema concreto de Airbus estáis abordando? Describidlo con precisión técnica." },
  { key: "organism", label: "02 — Modelo biológico", sublabel: "Organismo o sistema natural de referencia", placeholder: "¿Qué organismo habéis elegido y qué hace exactamente?" },
  { key: "principle", label: "03 — Principio biomimético", sublabel: "Mecanismo funcional abstracto", placeholder: "¿Qué principio subyacente de la naturaleza estáis abstrayendo?" },
  { key: "solution", label: "04 — Solución propuesta", sublabel: "Traducción técnica del principio natural", placeholder: "Describid cómo se traduciría el principio biológico en una solución técnica aplicable a Airbus. Sed específicos.", span: true },
  { key: "benefit", label: "05 — Impacto esperado", sublabel: "Beneficio cuantificable o cualitativo", placeholder: "¿Qué mejora concreta aportaría? (reducción de peso %, ahorro energético, tiempo...)" },
  { key: "implementation", label: "06 — Siguiente paso", sublabel: "Acción de validación inmediata", placeholder: "¿Cuál sería el primer experimento, prototipo o análisis para validar esta idea?" },
];

export default function BioCanvasScreen({ onNext, onBack }: BioCanvasScreenProps) {
  const { activeTeam, updateCanvas } = useBioLab();
  if (!activeTeam) return null;

  const completedFields = CANVAS_FIELDS.filter((f) => activeTeam.canvas[f.key].trim().length > 0).length;

  return (
    <div className="min-h-screen flex flex-col py-20">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <span className="biolab-phase mb-4 inline-flex">Fase 05 — Diseño</span>
            <h2 className="biolab-section-title mb-2">Canvas biomimético</h2>
            <p className="biolab-subtitle text-base">
              Equipo <strong className="text-foreground">{activeTeam.name}</strong> — Estructura vuestra propuesta
            </p>
          </div>
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
            <div className="flex gap-1">
              {CANVAS_FIELDS.map((f, i) => (
                <div key={f.key} className={`w-2 h-6 rounded-sm ${activeTeam.canvas[f.key].trim() ? "bg-success" : "bg-border"}`} />
              ))}
            </div>
            <span className="text-sm font-mono text-muted-foreground">{completedFields}/{CANVAS_FIELDS.length}</span>
          </div>
        </motion.div>

        {/* Context bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="text-muted-foreground">Reto:</span>
              <span className="font-medium text-foreground">{activeTeam.challenge?.title ?? "—"}</span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <span className="text-lg leading-none">{activeTeam.organism?.image}</span>
              <span className="text-muted-foreground">Organismo:</span>
              <span className="font-medium text-foreground">{activeTeam.organism?.name ?? "—"}</span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              <span className="text-muted-foreground">Principio:</span>
              <span className="font-medium text-foreground">{activeTeam.organism?.principle ?? "—"}</span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {CANVAS_FIELDS.map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`biolab-card ${field.span ? "md:col-span-2" : ""}`}
            >
              <div className="mb-3">
                <h3 className="text-sm font-semibold font-display text-foreground">{field.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{field.sublabel}</p>
              </div>
              <textarea
                value={activeTeam.canvas[field.key]}
                onChange={(e) => updateCanvas(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={field.span ? 4 : 3}
                className="biolab-input resize-none text-sm leading-relaxed"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Preparar pitch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
