import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { CanvasData, isCanvasEntryReady, isLegacyCanvasExample, MIN_CANVAS_CHARS } from "@/data/biolab-data";

interface BioCanvasScreenProps {
  onNext: () => void;
  onBack: () => void;
}

type FieldGuide = {
  key: keyof CanvasData;
  short: string;
  title: string;
  question: string;
  explain: string;
  thinkAbout: string[];
  placeholder: string;
};

const GUIDES: FieldGuide[] = [
  {
    key: "problem", short: "Problema",
    title: "Define el problema Airbus",
    question: "¿Qué necesitas mejorar exactamente y en qué parte de la operación?",
    explain: "No tienes que inventar una solución todavía. Describe la situación que quieres cambiar y sus límites.",
    thinkAbout: [
      "¿Qué equipo, proceso o componente está afectado?",
      "¿Qué dificultad concreta existe hoy?",
      "¿Cómo sabrías que se ha producido una mejora?",
    ],
    placeholder: "Escribe con tus palabras el problema concreto, dónde ocurre y qué quieres conseguir.",
  },
  {
    key: "organism", short: "Modelo natural",
    title: "Explica cómo funciona el modelo natural",
    question: "¿Qué hace este organismo y cómo lo consigue?",
    explain: "Describe el mecanismo observable en la naturaleza, no simplemente su nombre o apariencia.",
    thinkAbout: [
      "¿Qué función realiza?",
      "¿Qué estructura o comportamiento la hace posible?",
      "¿Qué evidencia necesitarías para confirmar cómo funciona?",
    ],
    placeholder: "Explica la función del organismo y el mecanismo que te interesa estudiar.",
  },
  {
    key: "principle", short: "Principio",
    title: "Extrae un principio funcional",
    question: "¿Qué regla de funcionamiento podrías trasladar a ingeniería?",
    explain: "Traduce la estrategia natural a una función técnica. La semejanza visual no basta.",
    thinkAbout: [
      "¿Qué causa el efecto observado en la naturaleza?",
      "¿Sirve ese mecanismo para el reto elegido? ¿Por qué?",
      "¿Qué aspecto NO sería trasladable al contexto aeronáutico?",
    ],
    placeholder: "Redacta el principio en términos de función, mecanismo y efecto esperado.",
  },
  {
    key: "solution", short: "Solución",
    title: "Propón una aplicación concreta en Airbus",
    question: "¿Qué cambiarías en un componente, herramienta o proceso y por qué ayudaría?",
    explain: "Esta es la parte central. Conecta el problema con el mecanismo y formula una hipótesis técnica, todavía no un resultado demostrado.",
    thinkAbout: [
      "¿Dónde se aplicaría y qué se modificaría?",
      "¿Cómo produciría el principio natural la mejora que buscas?",
      "¿Qué restricciones de seguridad, peso, materiales, certificación o mantenimiento existen?",
    ],
    placeholder: "Proponemos modificar [componente/proceso] mediante [mecanismo], porque [relación técnica]. Antes habría que comprobar [restricción].",
  },
  {
    key: "benefit", short: "Mejora esperada",
    title: "Identifica qué mejora esperas comprobar",
    question: "¿Qué resultado esperarías obtener si tu idea funciona?",
    explain: "Habla de una mejora hipotética, nunca de un ahorro o beneficio ya conseguido sin datos.",
    thinkAbout: [
      "¿Qué indicador compararías con la solución actual?",
      "¿Qué contrapartidas o efectos no deseados podrían aparecer?",
      "¿Qué datos te faltan para cuantificar la mejora?",
    ],
    placeholder: "La hipótesis es mejorar [indicador] frente a [situación actual], sujeto a comprobar [riesgo o condición].",
  },
  {
    key: "implementation", short: "Primera prueba",
    title: "Define una primera prueba de viabilidad",
    question: "¿Qué ensayo o análisis permitiría saber si la propuesta merece avanzar?",
    explain: "No es un plan de implantación industrial. Elige una comprobación inicial que pueda confirmar o descartar tu hipótesis.",
    thinkAbout: [
      "¿Harías primero un ensayo de laboratorio, simulación o prueba comparativa?",
      "¿Qué variable medirías y frente a qué referencia?",
      "¿Qué resultado haría que descartaras o revisaras la propuesta?",
    ],
    placeholder: "Primero compararíamos [alternativa] con [referencia] mediante [prueba], midiendo [indicador y criterio].",
  },
];

export default function BioCanvasScreen({ onNext, onBack }: BioCanvasScreenProps) {
  const { activeTeam, updateCanvas, setScreen, setGuideSubstep } = useBioLab();
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => setGuideSubstep(activeIndex), [activeIndex, setGuideSubstep]);
  if (!activeTeam) return null;

  const challenge = activeTeam.challenge;
  const organism = activeTeam.organism;
  const current = GUIDES[activeIndex];
  const answer = activeTeam.canvas[current.key];
  const count = GUIDES.filter((guide) => isCanvasEntryReady(guide.key, activeTeam.canvas[guide.key])).length;
  const canContinue = count === GUIDES.length;
  const isLegacy = isLegacyCanvasExample(current.key, answer);
  const isReady = isCanvasEntryReady(current.key, answer);
  const suspectPair = challenge?.id === "c7" && organism?.id === "o4";

  return (
    <div className="min-h-screen py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-6"
        >
          <span className="biolab-phase mb-4 inline-flex">Etapa 05 de 06 · Diseña tu solución</span>
          <h1 className="biolab-section-title mb-3">Ahora te toca crear la propuesta</h1>
          <p className="biolab-subtitle max-w-4xl">
            Tu misión es explicar <strong>cómo una estrategia de la naturaleza podría resolver
            un problema real del contexto Airbus</strong>. Completarás seis apartados, uno a uno,
            con tus propias respuestas. No hay una solución automática ni una respuesta correcta predefinida.
          </p>
        </motion.header>

        <section className="max-w-6xl mx-auto biolab-card-dark mb-6" aria-label="Instrucciones del lienzo">
          <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-3">
            ¿Qué tengo que hacer en esta pantalla?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-100 leading-7">
            <p><strong className="text-amber-300">1. Lee</strong> el reto y el modelo natural que elegiste.</p>
            <p><strong className="text-amber-300">2. Escribe</strong> una respuesta propia en cada apartado. Las pistas no escriben por ti.</p>
            <p><strong className="text-amber-300">3. Revisa</strong> que la relación técnica tenga sentido y pasa a preparar tu presentación.</p>
          </div>
          <p className="mt-4 text-sm md:text-base text-slate-300">
            Tus respuestas se guardan en este navegador mientras escribes. El indicador de avance solo
            comprueba que hayas redactado los apartados; <strong>no certifica que la propuesta sea viable</strong>.
          </p>
        </section>

        <section className="max-w-6xl mx-auto biolab-card mb-6" aria-label="Tus selecciones anteriores">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Este es tu punto de partida (ya seleccionado)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <span className="biolab-label block mb-2">Reto Airbus</span>
              <h3 className="text-lg font-semibold">{challenge?.title ?? "Sin reto"}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed">{challenge?.description}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <span className="biolab-label block mb-2">Inspiración natural</span>
              <h3 className="text-lg font-semibold">{organism?.name ?? "Sin modelo"}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed">{organism?.strategy}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <span className="biolab-label block mb-2">Principio observado</span>
              <h3 className="text-lg font-semibold">{organism?.principle ?? "Sin principio"}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed">
                Tu trabajo es justificar <strong>si ese principio sirve para el reto</strong>, no asumir que encaja.
              </p>
            </div>
          </div>
        </section>

        {suspectPair && (
          <section className="max-w-6xl mx-auto rounded-2xl border-2 border-amber-500 bg-amber-50 px-5 py-5 mb-6 text-slate-900" role="status">
            <h2 className="text-lg font-bold mb-2">Atención: esta conexión no está justificada todavía</h2>
            <p className="text-base leading-7 mb-4">
              La piel de tiburón puede inspirar superficies que modifican la fricción o la adhesión.
              Eso <strong>no demuestra por sí mismo que agilice una inspección no destructiva del fuselaje</strong>.
              Para continuar con esta combinación, necesitas explicar un mecanismo concreto y cómo lo comprobarías.
              Si buscas inspiración para detectar defectos, el <strong>murciélago y la ecolocalización</strong>
              podrían ofrecer un punto de partida más relacionado con la detección no invasiva, pero también
              requerirían una justificación y validación técnica.
            </p>
            <button type="button" className="biolab-btn-primary" onClick={() => setScreen(4)}>
              Elegir otro modelo natural
            </button>
          </section>
        )}

        <section className="max-w-6xl mx-auto biolab-card mb-6" aria-label="Editor del lienzo">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
            <div>
              <h2 className="text-xl font-display font-bold">Tu propuesta, apartado {activeIndex + 1} de 6</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                {count} de 6 apartados con texto propio suficiente. Puedes volver y editar cualquiera.
              </p>
            </div>
            <div aria-live="polite" className="text-base font-semibold text-primary">{count}/6 redactados</div>
          </div>
          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-7" aria-label="Apartados del lienzo">
            {GUIDES.map((guide, index) => {
              const ready = isCanvasEntryReady(guide.key, activeTeam.canvas[guide.key]);
              return (
                <button
                  key={guide.key}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-current={index === activeIndex ? "step" : undefined}
                  className={`rounded-xl border p-3 text-left text-sm md:text-base font-semibold transition-colors ${index === activeIndex ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/40 text-foreground"}`}
                >
                  <span className="block text-xs mb-1">{String(index + 1).padStart(2, "0")} · {ready ? "✓ Redactado" : "Pendiente"}</span>
                  {guide.short}
                </button>
              );
            })}
          </nav>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-7">
            <span className="biolab-label block mb-2">Apartado {String(activeIndex + 1).padStart(2, "0")}</span>
            <h3 className="text-2xl font-bold font-display mb-3">{current.title}</h3>
            <p className="text-lg md:text-xl font-semibold mb-3">{current.question}</p>
            <p className="text-base text-muted-foreground leading-7 mb-5">{current.explain}</p>
            <details className="rounded-xl border border-border bg-card p-4 mb-5">
              <summary className="cursor-pointer text-base font-semibold text-primary">Ver pistas para pensar</summary>
              <ul className="mt-3 pl-5 list-disc space-y-2 text-base text-foreground leading-7">
                {current.thinkAbout.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </details>

            <label htmlFor={`canvas-${current.key}`} className="block font-semibold text-base mb-2">
              Tu respuesta (escríbela aquí):
            </label>
            <textarea
              id={`canvas-${current.key}`}
              value={answer}
              onChange={(event) => updateCanvas(current.key, event.target.value)}
              placeholder={current.placeholder}
              rows={7}
              className="biolab-input resize-y text-base md:text-lg leading-relaxed min-h-[180px] bg-white"
            />
            {isLegacy && (
              <p className="mt-3 rounded-lg border border-amber-400 bg-amber-100 px-4 py-3 text-base text-amber-950" role="status">
                Este campo contiene un texto introducido mediante un ejemplo automático de la versión anterior.
                Se ha conservado, pero <strong>debes reformularlo con tu propia explicación</strong> para marcarlo como redactado.
              </p>
            )}
            <div className="flex flex-wrap justify-between gap-3 mt-3 text-sm md:text-base">
              <span className="text-muted-foreground" aria-live="polite">
                {isReady ? "✓ Apartado redactado. Revisa la calidad técnica antes de continuar." : isLegacy
                  ? "Pendiente de reformulación"
                  : `Escribe al menos ${MIN_CANVAS_CHARS} caracteres para registrar este apartado.`}
              </span>
              <span className="text-muted-foreground">{answer.trim().length} caracteres</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
            <button type="button" className="biolab-btn-ghost" disabled={activeIndex === 0} onClick={() => setActiveIndex((n) => Math.max(0, n - 1))}>
              ← Apartado anterior
            </button>
            <button type="button" className="biolab-btn-primary" disabled={activeIndex === GUIDES.length - 1} onClick={() => setActiveIndex((n) => Math.min(GUIDES.length - 1, n + 1))}>
              Siguiente apartado →
            </button>
          </div>
        </section>

        <section className="max-w-6xl mx-auto rounded-2xl border border-border bg-white px-5 py-5 mb-7">
          <h2 className="text-lg font-bold mb-3">Antes de presentarla, comprueba tu propuesta</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base leading-7">
            <p>□ ¿Has definido un problema técnico concreto?</p>
            <p>□ ¿Has explicado <strong>cómo</strong> el mecanismo natural podría ayudar?</p>
            <p>□ ¿Has considerado las restricciones de seguridad y operación?</p>
            <p>□ ¿Has propuesto una prueba que pueda confirmar o descartar la hipótesis?</p>
          </div>
          <p className="text-sm md:text-base text-muted-foreground mt-3">
            Estas son preguntas de revisión personal, no verificaciones automáticas.
          </p>
        </section>

        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4 pb-10">
          <button type="button" onClick={onBack} className="biolab-btn-ghost">← Volver a la conexión</button>
          <button
            type="button"
            onClick={onNext}
            className="biolab-btn-primary"
            disabled={!canContinue}
            title={!canContinue ? "Redacta los seis apartados con tus propias palabras para preparar la presentación." : undefined}
          >
            Ya he redactado los seis apartados · Preparar presentación →
          </button>
          {!canContinue && (
            <p className="w-full text-center text-sm md:text-base text-muted-foreground" role="status">
              Faltan {GUIDES.length - count} apartados por redactar o reformular. No necesitas copiar ningún ejemplo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
