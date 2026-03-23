import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

const SCREEN_LABELS = [
  "Inicio", "Guía", "Equipos", "Reto", "Biblioteca",
  "Matching", "Canvas", "Pitch", "Votación", "Resultados"
];

export default function BioLabNav() {
  const { currentScreen, setScreen, activeTeam } = useBioLab();

  // Don't show nav on welcome screen
  if (currentScreen === 0) return null;

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border"
    >
      <div className="biolab-container flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-foreground text-lg">BioLab</span>
          <span className="text-gradient-accent font-display font-bold text-lg">Airbus</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {SCREEN_LABELS.slice(1).map((label, i) => {
            const screenIndex = i + 1;
            const isActive = currentScreen === screenIndex;
            const isPast = currentScreen > screenIndex;
            return (
              <button
                key={label}
                onClick={() => setScreen(screenIndex)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isPast
                    ? "text-primary hover:bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {activeTeam && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: activeTeam.color }} />
            <span className="text-sm font-medium text-foreground">{activeTeam.name}</span>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
