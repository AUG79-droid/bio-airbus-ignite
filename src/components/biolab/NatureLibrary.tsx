import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="biolab-phase mb-5 inline-flex">Fase 03 — Exploración</span>
          <h2 className="biolab-section-title mb-3">Catálogo de estrategias naturales</h2>
          <p className="biolab-subtitle max-w-xl mx-auto">
            Selecciona el organismo cuya estrategia conecte mejor con tu reto
          </p>
        </motion.div>

        {/* Active challenge reminder */}
        {activeTeam?.challenge && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto mb-8">
            <div className="biolab-card flex items-center gap-4 py-4 px-5 border-primary/15">
              <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="biolab-label block">Reto asignado</span>
                <span className="text-sm font-semibold text-foreground">{activeTeam.challenge.title}</span>
              </div>
              <span className="biolab-badge shrink-0">{activeTeam.challenge.area}</span>
            </div>
          </motion.div>
        )}

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {ORGANISMS.map((org, i) => {
            const isExpanded = expandedId === org.id;
            const isSelected = selectedId === org.id;
            return (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`biolab-card-interactive ${isSelected ? "ring-2 ring-primary border-primary/30" : ""}`}
                onClick={() => setExpandedId(isExpanded ? null : org.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Organism icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl ${
                    isSelected ? "bg-primary/10" : "bg-muted"
                  }`}>
                    {org.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold font-display text-foreground">{org.name}</h3>
                      <span className="font-mono text-[10px] text-muted-foreground">#{org.id.toUpperCase()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{org.strategy}</p>
                    <span className="biolab-badge text-[11px]">{org.principle}</span>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="flex items-start gap-2 mb-4">
                              <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              <p className="text-sm text-muted-foreground leading-relaxed">{org.fact}</p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleSelect(org); }}
                              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                              }`}
                            >
                              {isSelected ? "✓ Seleccionado" : "Seleccionar organismo"}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary" disabled={!selectedId}>
            Conectar ideas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
