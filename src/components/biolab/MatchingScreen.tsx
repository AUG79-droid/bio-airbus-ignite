import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface MatchingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function MatchingScreen({ onNext, onBack }: MatchingScreenProps) {
  const { activeTeam } = useBioLab();
  if (!activeTeam) return null;

  const challenge = activeTeam.challenge;
  const organism = activeTeam.organism;
  const principle = activeTeam.organism?.principle;

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="biolab-phase mb-5 inline-flex">Etapa 04 — Conexión</span>
          <h2 className="biolab-section-title mb-3">Conecta el reto, la naturaleza y el principio</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            Este paso no consiste en adivinar. Establece la <strong>idea guía</strong> que tu equipo llevará al lienzo.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="biolab-card-dark px-6 py-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
              <div>
                <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                  Qué debes hacer aquí
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Convierte tu selección en una formulación de trabajo clara
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  Has seleccionado un <strong>reto Airbus</strong> y un <strong>modelo natural</strong>. La aplicación muestra ahora la conexión entre ambos para que comprendas <strong>qué principio vas a transferir</strong> antes de abrir el lienzo.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Qué debes comprobar</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• El modelo natural encaja realmente con el reto que estás abordando.</li>
                    <li>• Comprendes el <strong>principio biomimético</strong> que quieres emular.</li>
                    <li>• La pregunta guía sirve para comenzar a diseñar una solución aplicable al contexto Airbus.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 1</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Revisa los tres bloques inferiores: <strong>reto</strong>, <strong>modelo</strong> y <strong>principio</strong>.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 2</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Lee la <strong>pregunta guía</strong>. Es la pregunta que tu equipo debe empezar a responder.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 3</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Si la conexión tiene sentido, utiliza el botón azul para abrir el lienzo y convertirla en una propuesta.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6"
          >
            <div className="biolab-card p-0 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-0 h-full">
                <div className="p-6 md:p-7">
                  <span className="biolab-label block mb-3">Conexión seleccionada por tu equipo</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
                    {challenge?.title ?? "No hay ningún reto asignado"}
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <span className="biolab-label block mb-2">Reto Airbus</span>
                      <p className="font-semibold text-foreground">{challenge?.title ?? "No asignado"}</p>
                      <p className="text-sm text-muted-foreground mt-1">{challenge?.description ?? ""}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <span className="biolab-label block mb-2">Modelo natural seleccionado</span>
                      <p className="font-semibold text-foreground">{organism?.name ?? "No seleccionado"}</p>
                      <p className="text-sm text-muted-foreground mt-1">{organism?.strategy ?? ""}</p>
                    </div>

                    <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                      <span className="biolab-label block mb-2">Principio biomimético que vas a transferir</span>
                      <p className="text-lg font-bold font-display text-foreground">{principle ?? "No seleccionado"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/40 border-t md:border-t-0 md:border-l border-border p-4 md:p-5 flex flex-col">
                  <span className="biolab-label block mb-3">Modelo visual</span>
                  <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3] mb-4">
                    {organism?.image ? (
                      <img
                        src={organism.image}
                        alt={organism.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 mt-auto">
                    <span className="biolab-label block mb-2">Cuándo tiene sentido esta elección</span>
                    <p className="text-sm text-muted-foreground leading-7">{organism?.fact ?? ""}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="biolab-card-dark px-6 py-6"
              >
                <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                  Pregunta guía de tu equipo
                </span>
                <p className="text-lg md:text-xl leading-8 text-slate-100">
                  ¿Cómo podríamos aplicar el principio de <strong style={{ color: "hsl(45, 95%, 65%)" }}>{principle?.toLowerCase() ?? "..."}</strong>,
                  observado en <strong>{organism?.name ?? "..."}</strong>, para abordar el reto de <strong>{challenge?.title?.toLowerCase() ?? "..."}</strong> en el contexto Airbus?
                </p>
              </motion.div>

              <div className="biolab-card">
                <span className="biolab-label block mb-3">Qué ocurre después de esta pantalla</span>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>1. Abrir el lienzo.</p>
                  <p>2. Describir el problema en términos Airbus.</p>
                  <p>3. Traducir el principio natural en una solución concreta.</p>
                  <p>4. Preparar una presentación breve para exponerla y evaluarla.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="biolab-card"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="lg:max-w-xs">
                <span className="biolab-label block mb-2">Cápsula de aprendizaje</span>
                <h3 className="text-xl font-display font-bold text-foreground">Copia la lógica, no la apariencia</h3>
              </div>
              <div className="biolab-transfer-chain flex-1" aria-label="Secuencia de traducción biomimética">
                {[
                  ["1", "Función", "¿Qué debe mejorar?"],
                  ["2", "Estrategia biológica", "¿Cómo lo hace la naturaleza?"],
                  ["3", "Principio de diseño", "¿Qué lógica puede transferirse?"],
                  ["4", "Aplicación", "¿Dónde y cómo podría funcionar?"],
                ].map(([number, title, text]) => (
                  <div key={number} className="biolab-transfer-step">
                    <span>{number}</span><div><strong>{title}</strong><small>{text}</small></div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground leading-6">
              Un simple parecido no es biomímesis. La propuesta debe explicar un mecanismo causal y reconocer que todavía requiere ingeniería, análisis de ciclo de vida y validación.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver a los modelos naturales</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Ir al paso 5: abrir el lienzo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
