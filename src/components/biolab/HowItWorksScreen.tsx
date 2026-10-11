import { motion } from "framer-motion";
import { STEPS } from "@/data/biolab-data";

const BIOMIMICRY_RULES = [
  {
    number: "A",
    title: "Define la función",
    text: "Formula qué debe conseguir el diseño —reducir resistencia, distribuir cargas o detectar daños— antes de buscar un organismo.",
  },
  {
    number: "B",
    title: "Abstrae el mecanismo",
    text: "Describe cómo funciona el sistema biológico sin limitarte a copiar su forma visible ni a nombrar al organismo.",
  },
  {
    number: "C",
    title: "Traduce con restricciones",
    text: "Adapta el principio a realidades aeronáuticas como seguridad, certificación, masa, materiales, mantenimiento y fabricabilidad.",
  },
  {
    number: "D",
    title: "Comprueba antes de afirmar impactos",
    text: "Trata la idea como una hipótesis. Define evidencias, criterios de comparación y un primer paso de validación antes de atribuir beneficios.",
  },
];

interface HowItWorksScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function HowItWorksScreen({ onNext, onBack }: HowItWorksScreenProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="biolab-phase mb-5 inline-flex">Cómo funciona</span>
          <h2 className="biolab-section-title mb-4">Qué vas a hacer durante la sesión</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            El ejercicio sigue una ruta sencilla: trabajar en equipo, recibir un reto Airbus, explorar estrategias naturales y desarrollar una propuesta preparada para presentarla y evaluarla.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="biolab-card group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono font-semibold shrink-0 bg-primary/8 text-primary border border-primary/15">
                  {String(step.number).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-base font-semibold font-display text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto biolab-card-dark mb-8">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-7 items-start">
            <div>
              <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>Teoría esencial</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Cuatro reglas para una biomímesis rigurosa</h3>
              <p className="text-sm md:text-base text-slate-300 leading-7">
                Una idea inspirada en la naturaleza solo resulta útil cuando el equipo explica el vínculo causal entre la estrategia biológica y su aplicación técnica.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {BIOMIMICRY_RULES.map((rule) => (
                <div key={rule.number} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="h-7 w-7 rounded-lg grid place-items-center bg-accent text-accent-foreground text-xs font-mono font-bold">{rule.number}</span>
                    <h4 className="font-display font-semibold text-white">{rule.title}</h4>
                  </div>
                  <p className="text-sm text-slate-300 leading-6">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto biolab-card mb-8">
          <span className="biolab-label block mb-2">Un ejemplo trabajado para entender el juego</span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
            Ejemplo: estudiar una ventilación de cabina más eficiente a partir de la estrategia de un termitero
          </h3>
          <p className="text-base leading-7 text-muted-foreground mb-5">
            Este es <strong>un ejemplo independiente</strong>, no una respuesta para copiar ni una tecnología
            aprobada. En el juego crearás tus propias respuestas según el reto y el modelo que selecciones.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["01 · Problema", "Estudiar cómo reducir las pérdidas de carga de los conductos de ventilación sin perjudicar caudales, confort ni requisitos de seguridad."],
              ["02 · Naturaleza", "Los termiteros emplean geometría e intercambios de aire relacionados con diferencias térmicas para regular condiciones internas."],
              ["03 · Principio", "Estudiar cómo la geometría de los canales puede guiar el flujo y gestionar las pérdidas de presión."],
              ["04 · Propuesta", "Investigar configuraciones de conductos inspiradas en esa estrategia, integradas en el sistema de ventilación aeronáutico; no sustituir el sistema por ventilación pasiva."],
              ["05 · Beneficio hipotético", "Comprobar si disminuyen las pérdidas de carga y la demanda de energía sin cambiar el caudal requerido."],
              ["06 · Primera prueba", "Comparar mediante simulación y ensayo una geometría convencional y otra propuesta al mismo caudal, midiendo presión, energía y distribución del aire."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-xl border border-border bg-muted/30 p-4">
                <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                <p className="text-sm md:text-base text-muted-foreground leading-7">{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-base leading-7 font-semibold text-foreground">
            Tu tarea real será elaborar una hipótesis de este tipo. La aplicación no escribe la propuesta
            por ti, y completar los campos no equivale a validar su viabilidad.
          </p>
        </motion.section>

        <div className="max-w-3xl mx-auto rounded-2xl border border-primary/15 bg-primary/5 p-5 mb-12">
          <h3 className="text-base font-semibold text-foreground mb-2">Resultado esperado</h3>
          <p className="text-sm leading-7 text-muted-foreground">
            Al terminar la sesión, cada equipo tendrá un <strong className="text-foreground">reto Airbus claramente definido</strong>, un <strong className="text-foreground">modelo natural seleccionado</strong>, un <strong className="text-foreground">principio biomimético identificado</strong>, una <strong className="text-foreground">hipótesis de aplicación sujeta a restricciones</strong> y un <strong className="text-foreground">primer paso de validación</strong> listo para revisar.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Formar los equipos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
