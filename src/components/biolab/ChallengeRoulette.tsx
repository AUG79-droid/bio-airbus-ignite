import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { CHALLENGES } from "@/data/biolab-data";

interface ChallengeRouletteProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ChallengeRoulette({ onNext, onBack }: ChallengeRouletteProps) {
  const { setTeamChallenge, activeTeam } = useBioLab();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(false);

  const spin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelected(false);

    let count = 0;
    const totalSteps = 20 + Math.floor(Math.random() * 10);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CHALLENGES.length);
      count++;
      if (count >= totalSteps) {
        clearInterval(interval);
        setIsSpinning(false);
        setSelected(true);
      }
    }, 80 + count * 8);
  }, [isSpinning]);

  const challenge = CHALLENGES[currentIndex];

  const handleConfirm = () => {
    setTeamChallenge(challenge);
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-16">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-badge mb-4 inline-block">Paso 2</span>
          <h2 className="biolab-section-title mb-4">Descubre tu reto</h2>
          <p className="biolab-subtitle">
            {activeTeam ? `Equipo ${activeTeam.name}: ` : ""}Gira la ruleta para obtener un reto Airbus real
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`biolab-card mb-8 py-12 ${isSpinning ? "border-accent" : selected ? "ring-2 ring-accent" : ""}`}
            >
              <div className="text-5xl mb-4">{challenge.icon}</div>
              <h3 className="text-2xl font-bold font-display text-foreground mb-3">{challenge.title}</h3>
              <p className="text-muted-foreground mb-3 leading-relaxed px-4">{challenge.description}</p>
              <span className="biolab-badge">{challenge.area}</span>
            </motion.div>
          </AnimatePresence>

          {!selected ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={spin}
              disabled={isSpinning}
              className="biolab-btn-accent text-xl px-12 py-5"
            >
              {isSpinning ? "Girando..." : "🎯 Girar ruleta"}
            </motion.button>
          ) : (
            <div className="flex justify-center gap-4">
              <button onClick={spin} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors font-medium">
                Girar de nuevo
              </button>
              <button onClick={handleConfirm} className="biolab-btn-primary">
                Aceptar reto →
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <button onClick={onBack} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors font-medium">← Volver</button>
        </div>
      </div>
    </div>
  );
}
