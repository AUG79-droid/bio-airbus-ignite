import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface MatchingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function MatchingScreen({ onNext, onBack }: MatchingScreenProps) {
  const { activeTeam } = useBioLab();

  if (!activeTeam) return null;

  const items = [
    {
      label: "Reto Airbus",
      icon: activeTeam.challenge?.icon ?? "❓",
      title: activeTeam.challenge?.title ?? "Sin asignar",
      description: activeTeam.challenge?.description ?? "",
      color: "hsl(var(--primary))",
    },
    {
      label: "Organismo",
      icon: activeTeam.organism?.image ?? "❓",
      title: activeTeam.organism?.name ?? "Sin seleccionar",
      description: activeTeam.organism?.strategy ?? "",
      color: "hsl(var(--accent))",
    },
    {
      label: "Principio biomimético",
      icon: "🧬",
      title: activeTeam.organism?.principle ?? "Sin seleccionar",
      description: activeTeam.organism ? `Basado en la estrategia de ${activeTeam.organism.name}` : "",
      color: "hsl(160, 50%, 35%)",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center py-16">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-badge mb-4 inline-block">Paso 4</span>
          <h2 className="biolab-section-title mb-4">Tu combinación biomimética</h2>
          <p className="biolab-subtitle max-w-2xl mx-auto">
            Equipo <strong style={{ color: activeTeam.color }}>{activeTeam.name}</strong>: esta es la conexión entre reto, naturaleza y principio
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch gap-6 mb-12">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex-1"
              >
                <div className="biolab-card h-full text-center py-8">
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
                    style={{ background: `${item.color}15`, border: `2px solid ${item.color}30` }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{item.label}</span>
                  <h3 className="text-xl font-bold font-display text-foreground mt-2 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {i < items.length - 1 && (
                  <div className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                    <span className="text-2xl text-muted-foreground">→</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="biolab-card text-center py-8 border-accent/30"
            style={{ background: "linear-gradient(135deg, hsl(var(--accent) / 0.05), hsl(var(--primary) / 0.05))" }}
          >
            <h3 className="text-lg font-semibold font-display text-foreground mb-2">🧠 Pregunta guía</h3>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              ¿Cómo podríamos aplicar la estrategia de <strong className="text-foreground">{activeTeam.organism?.name ?? "..."}</strong> ({activeTeam.organism?.principle ?? "..."}) para <strong className="text-foreground">{activeTeam.challenge?.title?.toLowerCase() ?? "..."}</strong>?
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={onBack} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors font-medium">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Diseñar solución →
          </button>
        </div>
      </div>
    </div>
  );
}
