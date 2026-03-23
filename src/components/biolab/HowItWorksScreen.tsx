import { motion } from "framer-motion";
import { STEPS } from "@/data/biolab-data";

interface HowItWorksScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HowItWorksScreen({ onNext, onBack }: HowItWorksScreenProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-16">
      <div className="biolab-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="biolab-badge mb-4 inline-block">Guía rápida</span>
          <h2 className="biolab-section-title mb-4">¿Cómo funciona?</h2>
          <p className="biolab-subtitle max-w-2xl mx-auto">
            Seis pasos para transformar inspiración natural en innovación aeronáutica
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {STEPS.map((step) => (
            <motion.div key={step.number} variants={item} className="biolab-card group">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold font-display shrink-0"
                  style={{ background: "var(--gradient-nature)", color: "hsl(var(--primary-foreground))" }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-display text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors font-medium">
            ← Volver
          </button>
          <button onClick={onNext} className="biolab-btn-primary">
            Formar equipos →
          </button>
        </div>
      </div>
    </div>
  );
}
