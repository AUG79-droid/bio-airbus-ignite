import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { CanvasData } from "@/data/biolab-data";

interface BioCanvasScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const CANVAS_FIELDS: {
  key: keyof CanvasData;
  label: string;
  sublabel: string;
  helper: string;
  placeholder: string;
  span?: boolean;
}[] = [
  {
    key: "problem",
    label: "01 — Define el problema Airbus",
    sublabel: "¿Qué reto concreto vas a resolver?",
    helper: "Describe el problema en términos técnicos específicos. Evita las afirmaciones genéricas.",
    placeholder:
      "Ejemplo: La cabina necesita una ventilación y un control térmico más eficientes para reducir el consumo energético y mantener el confort sin aumentar la complejidad del sistema.",
  },
  {
    key: "organism",
    label: "02 — Explica el modelo natural",
    sublabel: "¿Qué organismo o sistema natural has seleccionado?",
    helper: "Describe qué hace en la naturaleza y por qué resulta relevante para este reto.",
    placeholder:
      "Ejemplo: El termitero regula la temperatura y la ventilación mediante flujos de aire pasivos, sin climatización continua.",
  },
  {
    key: "principle",
    label: "03 — Formula el principio que vas a emular",
    sublabel: "¿Qué mecanismo funcional vas a transferir?",
    helper: "No copies la forma: identifica la lógica funcional que hay detrás.",
    placeholder:
      "Ejemplo: Utilizar circulación pasiva, gradientes térmicos y entradas y salidas de aire optimizadas para estabilizar la temperatura con menos energía.",
  },
  {
    key: "solution",
    label: "04 — Tradúcelo en una solución Airbus",
    sublabel: "¿Cómo se convierte en una propuesta real?",
    helper: "Aplica la idea a una pieza, sistema, área o proceso concreto del contexto Airbus.",
    placeholder:
      "Ejemplo: Diseñar una arquitectura de ventilación de cabina inspirada en termiteros, con entradas y salidas pasivas optimizadas para reducir la demanda del sistema activo.",
    span: true,
  },
  {
    key: "benefit",
    label: "05 — Impacto esperado",
    sublabel: "¿Qué mejora aportaría?",
    helper: "Considera eficiencia, peso, energía, mantenimiento, confort, robustez o coste.",
    placeholder:
      "Ejemplo: Menor consumo energético, mejor distribución térmica y menor dependencia de la climatización activa durante determinadas fases operativas.",
  },
  {
    key: "implementation",
    label: "06 — Próximo paso",
    sublabel: "¿Qué validarías primero?",
    helper: "No planifiques todo el proyecto: céntrate en el primer paso útil de validación.",
    placeholder:
      "Ejemplo: Modelizar el flujo de aire mediante CFD y comparar una configuración convencional con una alternativa inspirada en termiteros.",
  },
];

function cleanSentence(text?: string) {
  return (text || "").trim().replace(/\s+/g, " ").replace(/[.]$/, "");
}

function buildExamples(challenge?: { title?: string; description?: string }, organism?: { name?: string; strategy?: string; principle?: string }) {
  const challengeTitle = challenge?.title || "el reto Airbus seleccionado";
  const challengeDescription = cleanSentence(challenge?.description) || "abordar una necesidad técnica específica";
  const organismName = organism?.name || "el modelo natural seleccionado";
  const organismStrategy = cleanSentence(organism?.strategy) || "realiza esta función de forma eficiente en la naturaleza";
  const principle = cleanSentence(organism?.principle) || "un principio biomimético útil";

  return {
    problem: `El equipo quiere abordar ${challengeTitle.toLowerCase()} en el contexto Airbus. El problema concreto consiste en ${challengeDescription.toLowerCase()} mediante una solución técnicamente viable que no añada complejidad innecesaria.`,
    organism: `${organismName} resulta relevante porque ${organismStrategy.toLowerCase()}. Es una referencia útil porque realiza con eficiencia una función comparable al reto Airbus.`,
    principle: `El principio que queremos emular es ${principle.toLowerCase()}. No copiamos la forma del organismo: transferimos la lógica funcional que utiliza para resolver el problema.`,
    solution: `Proponemos traducir ${principle.toLowerCase()} en una solución Airbus para ${challengeTitle.toLowerCase()}. La idea consiste en diseñar una propuesta técnica inspirada en ${organismName.toLowerCase()} que mejore el rendimiento del sistema sin aumentar significativamente el peso, el consumo energético ni el mantenimiento.`,
    benefit: `El impacto esperado es mejorar el rendimiento en ${challengeTitle.toLowerCase()}, reducir ineficiencias operativas y aportar una base técnica más sólida para futuros ensayos o pilotos.`,
    implementation: `Un próximo paso razonable sería realizar una validación inicial: una simulación, una maqueta funcional o un análisis comparativo entre la solución actual y una alternativa inspirada en ${organismName.toLowerCase()}.`,
  } satisfies Record<keyof CanvasData, string>;
}

export default function BioCanvasScreen({ onNext, onBack }: BioCanvasScreenProps) {
  const { activeTeam, updateCanvas } = useBioLab();
  if (!activeTeam) return null;

  const completedFields = CANVAS_FIELDS.filter((f) => activeTeam.canvas[f.key].trim().length > 0).length;
  const canContinue = completedFields === CANVAS_FIELDS.length;
  const challenge = activeTeam.challenge;
  const organism = activeTeam.organism;
  const examples = buildExamples(challenge, organism);

  const injectExample = (key: keyof CanvasData) => {
    if (!activeTeam.canvas[key].trim()) {
      updateCanvas(key, examples[key]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 mb-8"
        >
          <div>
            <span className="biolab-phase mb-4 inline-flex">Etapa 05 — Diseño</span>
            <h2 className="biolab-section-title mb-3">Convierte ahora tu idea en una propuesta</h2>
            <p className="biolab-subtitle max-w-3xl">
              Este es el paso 5 de 6. Define <strong>qué problema vas a resolver</strong>, <strong>qué principio natural vas a emular</strong> y <strong>cómo lo traducirás al contexto Airbus</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex gap-1.5">
              {CANVAS_FIELDS.map((f) => (
                <div
                  key={f.key}
                  className={`w-2.5 h-7 rounded-sm ${activeTeam.canvas[f.key].trim() ? "bg-success" : "bg-border"}`}
                />
              ))}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Bloques completados</div>
              <div className="text-sm font-semibold text-foreground">{completedFields}/{CANVAS_FIELDS.length}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="biolab-card-dark px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
              <div>
                <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                  Qué debes hacer aquí
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Construye tu propuesta con lógica Airbus, no con afirmaciones vagas
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  Has seleccionado un <strong>reto</strong> y un <strong>modelo natural</strong>. Redacta ahora una propuesta que otras personas puedan comprender, defender y presentar. No busques la perfección: empieza por los tres primeros bloques y después concreta la solución.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Orden recomendado</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• Empieza por <strong>01 Problema</strong>, <strong>02 Modelo biológico</strong> y <strong>03 Principio</strong>.</li>
                    <li>• Continúa con <strong>04 Solución propuesta</strong>, el apartado más importante.</li>
                    <li>• Termina con <strong>05 Impacto esperado</strong> y <strong>06 Próximo paso</strong>.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 1</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Comprueba que el <strong>reto</strong>, el <strong>modelo natural</strong> y el <strong>principio</strong> encajan entre sí.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 2</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Si te bloqueas, utiliza los <strong>ejemplos iniciales</strong> inferiores y adáptalos a tu caso.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 3</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Cuando los seis bloques estén suficientemente claros, utiliza el botón azul para pasar a la <strong>presentación</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_340px] gap-5 items-stretch">
            <div className="biolab-card p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <span className="biolab-label block mb-2">Reto que vas a resolver</span>
                  <h4 className="text-lg font-semibold font-display text-foreground mb-2">{challenge?.title ?? "—"}</h4>
                  <p className="text-sm text-muted-foreground leading-6">{challenge?.description ?? "—"}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <span className="biolab-label block mb-2">Modelo natural seleccionado</span>
                  <h4 className="text-lg font-semibold font-display text-foreground mb-3">{organism?.name ?? "—"}</h4>
                  <p className="text-sm text-muted-foreground leading-6">{organism?.strategy ?? "—"}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <span className="biolab-label block mb-2">Principio que vas a transferir</span>
                  <h4 className="text-lg font-semibold font-display text-foreground mb-2">{organism?.principle ?? "—"}</h4>
                  <p className="text-sm text-muted-foreground leading-6">Este es el mecanismo funcional que ahora convertirás en una solución aplicable al contexto Airbus.</p>
                </div>
              </div>
            </div>

            <div className="biolab-card overflow-hidden p-0">
              {organism?.image ? (
                <img
                  src={organism.image}
                  alt={organism.name}
                  className="w-full h-full min-h-[240px] object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="min-h-[240px] flex items-center justify-center text-muted-foreground">Sin imagen</div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mb-8">
          <div className="biolab-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <span className="biolab-label block mb-2">Ejemplos iniciales para desbloquear el lienzo</span>
                <h3 className="text-xl font-display font-bold text-foreground">No los copies literalmente: adáptalos a tu caso</h3>
              </div>
              <div className="text-sm text-muted-foreground max-w-xl">
                Se generan a partir de tu <strong>reto Airbus</strong>, el <strong>modelo natural seleccionado</strong> y el <strong>principio biomimético</strong>.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {CANVAS_FIELDS.map((field) => (
                <div key={field.key} className="rounded-2xl border border-border bg-background/70 p-4 flex flex-col gap-3">
                  <div>
                    <h4 className="text-sm font-semibold font-display text-foreground">{field.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{field.sublabel}</p>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{examples[field.key]}</p>
                  <button
                    type="button"
                    onClick={() => injectExample(field.key)}
                    className="biolab-btn-ghost self-start"
                  >
                    Utilizar este ejemplo inicial
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mb-8">
          <div className="biolab-rubric">
            <div>
              <span className="biolab-label block mb-2">Control de calidad</span>
              <h3 className="text-lg font-display font-bold text-foreground">Un concepto sólido debe superar cuatro comprobaciones</h3>
            </div>
            {[
              ["Específico", "Un problema técnico delimitado"],
              ["Causal", "El mecanismo explica el efecto"],
              ["Sujeto a restricciones", "Considera seguridad, masa y operaciones"],
              ["Verificable", "Un primer experimento medible"],
            ].map(([title, text]) => (
              <div key={title} className="biolab-rubric-item"><strong>{title}</strong><span>{text}</span></div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {CANVAS_FIELDS.map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`biolab-card ${field.span ? "md:col-span-2" : ""}`}
            >
              <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="text-sm font-semibold font-display text-foreground">{field.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{field.sublabel}</p>
                </div>
                <button
                  type="button"
                  onClick={() => injectExample(field.key)}
                  className="biolab-btn-ghost"
                >
                  Insertar ejemplo
                </button>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/60 px-3 py-2 mb-3">
                <p className="text-xs text-muted-foreground leading-5">{field.helper}</p>
              </div>
              <textarea
                value={activeTeam.canvas[field.key]}
                onChange={(e) => updateCanvas(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={field.span ? 5 : 4}
                className="biolab-input resize-none text-sm leading-relaxed"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver a la conexión</button>
          <button onClick={onNext} className="biolab-btn-primary" disabled={!canContinue} title={!canContinue ? "Completa los seis bloques del lienzo para continuar" : undefined}>
            Ir al paso 6: preparar la presentación
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
          {!canContinue && <p className="w-full text-center text-xs text-muted-foreground">Completa {CANVAS_FIELDS.length - completedFields} {CANVAS_FIELDS.length - completedFields === 1 ? "bloque pendiente" : "bloques pendientes"} del lienzo para desbloquear la presentación.</p>}
        </div>
      </div>
    </div>
  );
}
