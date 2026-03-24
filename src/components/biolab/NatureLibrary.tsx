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

  const selectedOrganism = ORGANISMS.find((org) => org.id === selectedId);

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <span className="biolab-phase mb-5 inline-flex">Fase 03 — Exploración</span>
          <h2 className="biolab-section-title mb-3">Elige el modelo natural que más te ayude</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            Aquí no tienes que acertar una respuesta. Tienes que escoger <strong>un modelo de la naturaleza</strong> que te sirva para inspirar la solución de tu reto Airbus.
          </p>
        </motion.div>

        {activeTeam?.challenge && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto mb-6">
            <div className="biolab-card flex items-center gap-4 py-4 px-5 border-primary/15">
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="biolab-label block">Reto que vais a resolver</span>
                <span className="text-base font-semibold text-foreground">{activeTeam.challenge.title}</span>
                <p className="text-sm text-muted-foreground mt-1">{activeTeam.challenge.description}</p>
              </div>
              <span className="biolab-badge shrink-0">{activeTeam.challenge.area}</span>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mb-8">
          <div className="biolab-card-dark px-6 py-5">
            <div className="flex flex-wrap items-start gap-6">
              <div className="min-w-[180px]">
                <span className="biolab-label block mb-2" style={{ color: "hsl(45, 95%, 65%)" }}>Qué tienes que hacer aquí</span>
                <p className="text-sm leading-6" style={{ color: "hsl(210, 15%, 78%)" }}>
                  Mira las fotos, lee la estrategia y elige <strong>solo un modelo natural</strong> para tu equipo.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 1</span>
                  <p className="text-sm text-muted-foreground">Revisa 2 o 3 tarjetas y piensa qué función de la naturaleza se parece más a tu reto.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 2</span>
                  <p className="text-sm text-muted-foreground">Pulsa <strong>“Elegir este modelo”</strong> en la tarjeta que mejor encaje.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 3</span>
                  <p className="text-sm text-muted-foreground">Cuando lo tengas claro, pulsa el botón azul de abajo para pasar al siguiente paso.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {selectedOrganism && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mb-8">
            <div className="biolab-card flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-primary/25 ring-1 ring-primary/15">
              <div>
                <span className="biolab-label block mb-1">Modelo ya elegido para tu equipo</span>
                <p className="text-base font-semibold text-foreground">{selectedOrganism.name}</p>
                <p className="text-sm text-muted-foreground">Ahora ya puedes pulsar <strong>“Ir al paso 4”</strong>.</p>
              </div>
              <button onClick={onNext} className="biolab-btn-primary">
                Ir al paso 4
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </button>
            </div>
          </motion.div>
        )}

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {ORGANISMS.map((org, i) => {
            const isExpanded = expandedId === org.id;
            const isSelected = selectedId === org.id;
            return (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`biolab-card-interactive overflow-hidden ${isSelected ? "ring-2 ring-primary border-primary/40 shadow-lg shadow-primary/10" : ""}`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold font-display text-foreground">{org.name}</h3>
                        <span className="font-mono text-[10px] text-muted-foreground">#{org.id.toUpperCase()}</span>
                      </div>
                      <span className="biolab-badge text-[11px]">{org.principle}</span>
                    </div>
                    {isSelected && <span className="biolab-badge">Elegido</span>}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{org.strategy}</p>

                  <div className="rounded-xl bg-muted/50 border border-border p-3 mb-4">
                    <span className="biolab-label block mb-1">Cómo puede ayudarte</span>
                    <p className="text-sm text-foreground/90 leading-relaxed">{org.fact}</p>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl border border-primary/15 bg-primary/5 p-3 mb-4">
                          <span className="biolab-label block mb-1">Pista para decidir</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            No busques un animal “parecido” a Airbus. Busca una <strong>función</strong> que se parezca al problema que quieres resolver.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleSelect(org)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {isSelected ? "✓ Modelo elegido" : "Elegir este modelo"}
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : org.id)}
                      className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-border bg-background hover:bg-muted transition-colors"
                    >
                      {isExpanded ? "Ocultar ayuda" : "Ver ayuda para decidir"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary" disabled={!selectedId}>
            Ir al paso 4: conectar reto y principio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
