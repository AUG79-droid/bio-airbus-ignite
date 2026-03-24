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
    sublabel: "Qué reto concreto vais a resolver",
    helper: "Escribid el problema en lenguaje técnico y específico. Nada de frases genéricas.",
    placeholder:
      "Ejemplo: La cabina requiere ventilación y control térmico más eficientes para reducir consumo energético y mantener confort sin aumentar complejidad del sistema.",
  },
  {
    key: "organism",
    label: "02 — Explica el modelo natural",
    sublabel: "Qué organismo o sistema natural habéis elegido",
    helper: "Describid qué hace en la naturaleza y por qué os interesa para este reto.",
    placeholder:
      "Ejemplo: El termitero regula la temperatura y la ventilación mediante circulación pasiva de aire, sin climatización continua.",
  },
  {
    key: "principle",
    label: "03 — Formula el principio a copiar",
    sublabel: "Qué mecanismo funcional queréis trasladar",
    helper: "Aquí no copiáis la forma, sino la lógica funcional que hay detrás.",
    placeholder:
      "Ejemplo: Usar circulación pasiva, gradientes térmicos y entradas/salidas de aire para estabilizar temperatura con menos energía.",
  },
  {
    key: "solution",
    label: "04 — Tradúcelo a una solución Airbus",
    sublabel: "Cómo se convierte en una propuesta real",
    helper: "Aquí aterrizáis la idea en Airbus: pieza, sistema, zona o proceso concreto.",
    placeholder:
      "Ejemplo: Diseñar una arquitectura de ventilación de cabina inspirada en termiteros, con entradas y salidas pasivas optimizadas para reducir la demanda del sistema activo.",
    span: true,
  },
  {
    key: "benefit",
    label: "05 — Impacto esperado",
    sublabel: "Qué mejora aportaría",
    helper: "Pensad en eficiencia, peso, energía, mantenimiento, confort, robustez o coste.",
    placeholder:
      "Ejemplo: Menor consumo energético, mejor distribución térmica y menor dependencia de climatización activa en determinadas fases de operación.",
  },
  {
    key: "implementation",
    label: "06 — Siguiente paso",
    sublabel: "Qué validaríais primero",
    helper: "No penséis en el proyecto completo: solo en el primer paso útil para validarlo.",
    placeholder:
      "Ejemplo: Modelizar el flujo de aire en simulación CFD y comparar una configuración convencional con otra inspirada en termiteros.",
  },
];

export default function BioCanvasScreen({ onNext, onBack }: BioCanvasScreenProps) {
  const { activeTeam, updateCanvas } = useBioLab();
  if (!activeTeam) return null;

  const completedFields = CANVAS_FIELDS.filter((f) => activeTeam.canvas[f.key].trim().length > 0).length;
  const challenge = activeTeam.challenge;
  const organism = activeTeam.organism;

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 mb-8"
        >
          <div>
            <span className="biolab-phase mb-4 inline-flex">Fase 05 — Diseño</span>
            <h2 className="biolab-section-title mb-3">Ahora convertid vuestra idea en propuesta</h2>
            <p className="biolab-subtitle max-w-3xl">
              Este es el paso 5 de 6. Aquí dejáis por escrito <strong>qué problema vais a resolver</strong>, <strong>qué principio natural vais a copiar</strong> y <strong>cómo se traducirá a Airbus</strong>.
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
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Bloques completos</div>
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
                  Qué tienes que hacer aquí
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Rellenar vuestra propuesta con lógica Airbus, no con frases vagas
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  Ya habéis elegido un <strong>reto</strong> y un <strong>modelo natural</strong>. Ahora toca escribir una propuesta que se pueda entender, defender y presentar. No intentéis rellenarlo perfecto: empezad por los tres primeros bloques y luego aterrizad la solución.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Orden recomendado</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• Primero rellenad <strong>01 Problema</strong>, <strong>02 Modelo biológico</strong> y <strong>03 Principio</strong>.</li>
                    <li>• Después pasad a <strong>04 Solución propuesta</strong>, que es la parte más importante.</li>
                    <li>• Cerrad con <strong>05 Impacto esperado</strong> y <strong>06 Siguiente paso</strong>.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 1</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Aseguraos de que el <strong>reto</strong>, el <strong>modelo natural</strong> y el <strong>principio</strong> encajan entre sí.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 2</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Escribid la solución como si tuvierais que explicársela a alguien de Airbus en menos de un minuto.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 3</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Cuando tengáis los 6 bloques razonablemente claros, pulsad el botón azul para pasar al <strong>pitch</strong>.
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
                  <span className="biolab-label block mb-2">Reto que vais a resolver</span>
                  <h4 className="text-lg font-semibold font-display text-foreground mb-2">{challenge?.title ?? "—"}</h4>
                  <p className="text-sm text-muted-foreground leading-6">{challenge?.description ?? "—"}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <span className="biolab-label block mb-2">Modelo natural elegido</span>
                  <h4 className="text-lg font-semibold font-display text-foreground mb-3">{organism?.name ?? "—"}</h4>
                  <p className="text-sm text-muted-foreground leading-6">{organism?.strategy ?? "—"}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <span className="biolab-label block mb-2">Principio que vais a trasladar</span>
                  <h4 className="text-lg font-semibold font-display text-foreground mb-2">{organism?.principle ?? "—"}</h4>
                  <p className="text-sm text-muted-foreground leading-6">Ese es el mecanismo funcional que ahora debéis convertir en solución Airbus.</p>
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

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {CANVAS_FIELDS.map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`biolab-card ${field.span ? "md:col-span-2" : ""}`}
            >
              <div className="mb-3">
                <h3 className="text-sm font-semibold font-display text-foreground">{field.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{field.sublabel}</p>
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
          <button onClick={onBack} className="biolab-btn-ghost">← Volver a conexión</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Ir al paso 6: preparar pitch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
