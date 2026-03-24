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
          <span className="biolab-phase mb-5 inline-flex">Fase 04 — Conexión</span>
          <h2 className="biolab-section-title mb-3">Ahora une reto, naturaleza y principio</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            Este paso no es para adivinar nada. Es para dejar clara la <strong>idea guía</strong> con la que vuestro equipo va a entrar al canvas.
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
                  Qué tienes que hacer aquí
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Convertir vuestra elección en una frase de trabajo clara
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  Ya habéis elegido un <strong>reto Airbus</strong> y un <strong>modelo natural</strong>. Ahora la app os enseña la conexión entre ambos para que entendáis <strong>qué principio vais a trasladar</strong> antes de abrir el canvas.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Qué debes comprobar</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• Que el modelo natural realmente encaja con el reto que vais a resolver.</li>
                    <li>• Que entendéis cuál es el <strong>principio biomimético</strong> que os interesa copiar.</li>
                    <li>• Que la pregunta guía os parece útil para empezar a diseñar una solución Airbus.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 1</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Mira los tres bloques de abajo: <strong>reto</strong>, <strong>modelo</strong> y <strong>principio</strong>.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 2</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Lee la <strong>pregunta guía</strong>. Esa es la pregunta que vuestro equipo debe empezar a responder.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 3</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Si la conexión tiene sentido, pulsa el botón azul para pasar al canvas y convertirla en propuesta.
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
                  <span className="biolab-label block mb-3">Conexión elegida por tu equipo</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
                    {challenge?.title ?? "Reto sin asignar"}
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <span className="biolab-label block mb-2">Reto Airbus</span>
                      <p className="font-semibold text-foreground">{challenge?.title ?? "Sin asignar"}</p>
                      <p className="text-sm text-muted-foreground mt-1">{challenge?.description ?? ""}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <span className="biolab-label block mb-2">Modelo natural elegido</span>
                      <p className="font-semibold text-foreground">{organism?.name ?? "Sin seleccionar"}</p>
                      <p className="text-sm text-muted-foreground mt-1">{organism?.strategy ?? ""}</p>
                    </div>

                    <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                      <span className="biolab-label block mb-2">Principio biomimético que vais a trasladar</span>
                      <p className="text-lg font-bold font-display text-foreground">{principle ?? "Sin seleccionar"}</p>
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
                  Pregunta guía de vuestro equipo
                </span>
                <p className="text-lg md:text-xl leading-8 text-slate-100">
                  ¿Cómo podríamos aplicar el principio de <strong style={{ color: "hsl(45, 95%, 65%)" }}>{principle?.toLowerCase() ?? "..."}</strong>,
                  observado en <strong>{organism?.name ?? "..."}</strong>, para resolver el reto de <strong>{challenge?.title?.toLowerCase() ?? "..."}</strong> en Airbus?
                </p>
              </motion.div>

              <div className="biolab-card">
                <span className="biolab-label block mb-3">Qué haces después de esta pantalla</span>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>1. Abres el canvas.</p>
                  <p>2. Describes el problema en lenguaje Airbus.</p>
                  <p>3. Traducís el principio natural a una solución concreta.</p>
                  <p>4. Preparáis un pitch corto para presentarlo y votarlo.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver a modelos naturales</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Ir al paso 5: abrir canvas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
