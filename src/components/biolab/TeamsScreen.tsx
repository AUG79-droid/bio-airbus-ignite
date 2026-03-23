import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { TEAM_COLORS } from "@/data/biolab-data";

interface TeamsScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function TeamsScreen({ onNext, onBack }: TeamsScreenProps) {
  const { teams, addTeam, removeTeam, setActiveTeam, activeTeamIndex } = useBioLab();
  const [newName, setNewName] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);

  const handleAdd = () => {
    if (newName.trim()) {
      addTeam(newName.trim(), selectedColor);
      setNewName("");
      setSelectedColor((selectedColor + 1) % TEAM_COLORS.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-16">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-badge mb-4 inline-block">Paso 1</span>
          <h2 className="biolab-section-title mb-4">Forma tu equipo</h2>
          <p className="biolab-subtitle">Crea equipos de 3-5 personas para la sesión</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="biolab-card mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder="Nombre del equipo..."
                className="flex-1 px-5 py-4 rounded-xl bg-secondary border border-border text-foreground text-lg font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button onClick={handleAdd} className="biolab-btn-primary shrink-0">
                + Añadir
              </button>
            </div>
            <div className="flex gap-3 mt-4">
              {TEAM_COLORS.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(i)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${i === selectedColor ? "border-foreground scale-110" : "border-transparent"}`}
                  style={{ background: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {teams.map((team, i) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`biolab-card mb-4 cursor-pointer transition-all ${i === activeTeamIndex ? "ring-2 ring-primary" : ""}`}
                onClick={() => setActiveTeam(i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full" style={{ background: team.color }} />
                    <div>
                      <h3 className="text-lg font-semibold font-display text-foreground">{team.name}</h3>
                      {i === activeTeamIndex && <span className="text-xs text-muted-foreground">Equipo activo</span>}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeTeam(i); }}
                    className="text-muted-foreground hover:text-destructive transition-colors text-xl px-2"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {teams.length === 0 && (
            <p className="text-center text-muted-foreground py-8">Aún no hay equipos. ¡Crea el primero!</p>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={onBack} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors font-medium">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary" disabled={teams.length === 0}>
            Descubrir reto →
          </button>
        </div>
      </div>
    </div>
  );
}
