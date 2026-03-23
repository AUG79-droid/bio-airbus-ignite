import { useState } from "react";
import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { ORGANISMS, Organism } from "@/data/biolab-data";

interface NatureLibraryProps {
  onNext: () => void;
  onBack: () => void;
}

export default function NatureLibrary({ onNext, onBack }: NatureLibraryProps) {
  const { setTeamOrganism, activeTeam } = useBioLab();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(activeTeam?.organism?.id ?? null);

  const handleSelect = (org: Organism) => {
    setSelectedId(org.id);
    setTeamOrganism(org);
  };

  return (
    <div className="min-h-screen flex flex-col py-16">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-badge mb-4 inline-block">Paso 3</span>
          <h2 className="biolab-section-title mb-4">Biblioteca de la naturaleza</h2>
          <p className="biolab-subtitle max-w-2xl mx-auto">
            Explora estrategias que la evolución ha perfeccionado durante millones de años
          </p>
        </motion.div>

        {activeTeam?.challenge && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto mb-8">
            <div className="biolab-card border-accent/30 bg-accent/5">
              <p className="text-sm text-muted-foreground mb-1">Tu reto asignado:</p>
              <p className="font-semibold font-display text-foreground">
                {activeTeam.challenge.icon} {activeTeam.challenge.title}
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {ORGANISMS.map((org, i) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`biolab-card cursor-pointer ${selectedId === org.id ? "ring-2 ring-primary border-primary" : ""}`}
              onClick={() => setExpandedId(expandedId === org.id ? null : org.id)}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{org.image}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-display text-foreground">{org.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{org.strategy}</p>
                  <span className="biolab-badge mt-2 text-xs">{org.principle}</span>
                  {expandedId === org.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground italic">💡 {org.fact}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSelect(org); }}
                        className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedId === org.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"}`}
                      >
                        {selectedId === org.id ? "✓ Seleccionado" : "Elegir organismo"}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors font-medium">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary" disabled={!selectedId}>
            Conectar ideas →
          </button>
        </div>
      </div>
    </div>
  );
}
