import { motion } from "framer-motion";
import { STEPS } from "@/data/biolab-data";

interface HowItWorksScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function HowItWorksScreen({ onNext, onBack }: HowItWorksScreenProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="biolab-phase mb-5 inline-flex">Cómo funciona</span>
          <h2 className="biolab-section-title mb-4">Qué vas a hacer en esta sesión</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            La dinámica dura pocos pasos: trabajas en equipo, recibes un reto Airbus, exploras estrategias naturales y sales con una propuesta lista para presentar y votar.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="biolab-card group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono font-semibold shrink-0 bg-primary/8 text-primary border border-primary/15">
                  {String(step.number).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-base font-semibold font-display text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto rounded-2xl border border-primary/15 bg-primary/5 p-5 mb-12">
          <h3 className="text-base font-semibold text-foreground mb-2">Resultado esperado</h3>
          <p className="text-sm leading-7 text-muted-foreground">
            Al final de la sesión, cada equipo tendrá un <strong className="text-foreground">reto Airbus definido</strong>, un <strong className="text-foreground">modelo natural elegido</strong>, el <strong className="text-foreground">principio biomimético identificado</strong> y una <strong className="text-foreground">idea aplicable</strong> lista para presentar en un pitch breve.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Formar equipos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
