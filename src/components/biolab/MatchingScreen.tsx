import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface MatchingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function MatchingScreen({ onNext, onBack }: MatchingScreenProps) {
  const { activeTeam } = useBioLab();
  if (!activeTeam) return null;

  const connections = [
    {
      label: "Reto industrial",
      ref: activeTeam.challenge?.id?.toUpperCase() ?? "—",
      title: activeTeam.challenge?.title ?? "Sin asignar",
      detail: activeTeam.challenge?.area ?? "",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
    },
    {
      label: "Modelo biológico",
      ref: activeTeam.organism?.id?.toUpperCase() ?? "—",
      title: activeTeam.organism?.name ?? "Sin seleccionar",
      detail: activeTeam.organism?.strategy ?? "",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
      ),
    },
    {
      label: "Principio biomimético",
      ref: "PBM",
      title: activeTeam.organism?.principle ?? "Sin seleccionar",
      detail: activeTeam.organism ? `Derivado de ${activeTeam.organism.name}` : "",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-phase mb-5 inline-flex">Fase 04 — Conexión</span>
          <h2 className="biolab-section-title mb-3">Triángulo biomimético</h2>
          <p className="biolab-subtitle max-w-xl mx-auto">
            La intersección entre reto, naturaleza y principio que guiará vuestra solución
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Connection cards with connectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {connections.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="biolab-card text-center"
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-primary/8 text-primary border border-primary/15">
                  {item.icon}
                </div>
                <span className="biolab-label block mb-1">{item.label}</span>
                <span className="font-mono text-[10px] text-muted-foreground/60 block mb-3">REF-{item.ref}</span>
                <h3 className="text-lg font-bold font-display text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Guiding question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="biolab-card-dark text-center py-8 px-8"
          >
            <span className="biolab-label block mb-4" style={{ color: "hsl(45, 95%, 60%)" }}>Pregunta guía</span>
            <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: "hsl(210, 15%, 80%)" }}>
              ¿Cómo podríamos aplicar el principio de{" "}
              <strong style={{ color: "hsl(45, 95%, 65%)" }}>{activeTeam.organism?.principle?.toLowerCase() ?? "..."}</strong>
              , observado en <strong style={{ color: "hsl(0, 0%, 95%)" }}>{activeTeam.organism?.name ?? "..."}</strong>
              , para{" "}
              <strong style={{ color: "hsl(0, 0%, 95%)" }}>{activeTeam.challenge?.title?.toLowerCase() ?? "..."}</strong>
              {" "}en Airbus?
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Abrir canvas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
