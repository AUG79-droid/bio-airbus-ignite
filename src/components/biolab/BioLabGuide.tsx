import { useEffect, useMemo, useState } from "react";
import { Lightbulb, Volume2, VolumeX, X, MessageCircle, ChevronUp, ChevronDown } from "lucide-react";
import { useBioLab } from "@/contexts/BioLabContext";
import { GUIDE_AVATAR_IMAGE } from "@/data/guide-avatar-image";

type Guidance = { title: string; instruction: string; tip: string };

const canvasSteps: Guidance[] = [
  {
    title: "01 · Define el problema",
    instruction: "Estás en el primer apartado del lienzo. Escribe qué problema técnico quieres resolver, dónde se produce y qué necesitas mejorar. Aquí todavía no tienes que proponer la solución.",
    tip: "Hazte tres preguntas: ¿qué ocurre hoy?, ¿en qué pieza, sistema o proceso?, ¿cómo medirías una mejora? Escribe la respuesta con tus propias palabras.",
  },
  {
    title: "02 · Explica la naturaleza",
    instruction: "Describe el modelo natural elegido. Explica qué función realiza y mediante qué estructura o comportamiento la consigue. No basta con nombrar el organismo.",
    tip: "No confundas la apariencia con el mecanismo. Identifica qué hace el modelo natural y por qué podría ser relevante para el problema seleccionado.",
  },
  {
    title: "03 · Identifica el principio",
    instruction: "Ahora traduce la estrategia natural a un principio técnico. Explica el mecanismo que produce el efecto y qué parte de ese mecanismo podrías estudiar en Airbus.",
    tip: "Pregúntate: si elimino el nombre del organismo, ¿sigo pudiendo explicar cómo funciona la idea? Si la respuesta es no, todavía falta concretar el principio.",
  },
  {
    title: "04 · Diseña la propuesta",
    instruction: "Este es el apartado central. Escribe qué componente o proceso cambiarías, cómo aplicarías el mecanismo natural y qué restricciones aeronáuticas tendrías que respetar.",
    tip: "Una propuesta útil conecta causa y efecto: cambiaríamos este elemento mediante este mecanismo para intentar resolver este problema. Incluye seguridad, mantenimiento y fabricabilidad.",
  },
  {
    title: "05 · Mejora esperada",
    instruction: "Explica qué mejora esperas si la propuesta funciona. Es una hipótesis: todavía no puedes afirmar que el resultado esté demostrado.",
    tip: "Elige una medida concreta, por ejemplo masa, consumo, presión, tiempo o tasa de detección. Compara con una referencia y señala los posibles inconvenientes.",
  },
  {
    title: "06 · Primera prueba",
    instruction: "Para terminar el lienzo, explica cómo probarías la hipótesis: qué compararías, qué variable medirías y qué resultado te haría revisar la propuesta.",
    tip: "Una simulación, una prueba de laboratorio o un análisis comparativo puede ser el primer paso. Lo importante es saber qué datos servirían para confirmar o descartar la idea.",
  },
];

const screenSteps: Guidance[] = [
  {
    title: "Inicio del laboratorio",
    instruction: "Bienvenido al Laboratorio de Innovación Bioinspirada. El objetivo es convertir un problema del contexto Airbus en una propuesta inspirada en un mecanismo natural. Pulsa el botón para comenzar.",
    tip: "No se trata de copiar animales ni plantas. Vas a estudiar cómo funciona una estrategia de la naturaleza y valorar si ese principio puede inspirar ingeniería.",
  },
  {
    title: "Guía · Cómo jugar",
    instruction: "En esta pantalla encontrarás el recorrido completo y un ejemplo trabajado. Lee cómo pasar de un problema a una hipótesis de solución antes de formar tu equipo.",
    tip: "Fíjate especialmente en la diferencia entre observación natural, principio técnico y validación. No se puede dar una mejora por demostrada sin ensayos.",
  },
  {
    title: "Paso 1 · Equipos",
    instruction: "Crea tu equipo o selecciona uno de los equipos existentes. Introduce su nombre y continúa. Si juegas en solitario también puedes trabajar como un único equipo.",
    tip: "Las respuestas se guardan localmente en este navegador para cada equipo. Si hay varios equipos, cada uno preparará su propia propuesta.",
  },
  {
    title: "Paso 2 · Reto Airbus",
    instruction: "En esta etapa recibirás o seleccionarás un reto técnico del contexto Airbus. Lee el problema antes de continuar: será el punto de partida de toda la propuesta.",
    tip: "Asegúrate de entender qué hay que mejorar. No elijas una solución todavía; primero identifica la función o la dificultad concreta.",
  },
  {
    title: "Paso 3 · Naturaleza",
    instruction: "Examina las fichas de los modelos naturales. Lee qué función realiza cada organismo y pulsa «Elegir este modelo» en el que pueda ayudarte con el reto. Después pasa a Conexión.",
    tip: "Elige por el mecanismo, no por la imagen. Si tu reto es detectar defectos, un modelo de detección podría encajar mejor que otro que reduce la fricción.",
  },
  {
    title: "Paso 4 · Conexión",
    instruction: "Revisa la combinación que has elegido: reto Airbus, modelo natural y principio. Comprueba que exista una relación técnica razonable. Si no la encuentras, vuelve a Naturaleza; si encaja, abre el Lienzo.",
    tip: "Una semejanza visual no demuestra viabilidad. Debes poder explicar qué mecanismo natural actuaría sobre el problema técnico y cómo comprobarlo.",
  },
  canvasSteps[0],
  {
    title: "Paso 6 · Presentación",
    instruction: "Tu lienzo ya contiene seis apartados. Ahora escribe un nombre para la propuesta y prepara un resumen que puedas contar en unos sesenta segundos. Después se activará el botón para pasar a Revisión.",
    tip: "Puedes pulsar «Crear borrador editable con mis seis respuestas». Revisa ese borrador y asegúrate de que explica el problema, el mecanismo, la solución y la primera prueba.",
  },
  {
    title: "Paso 7 · Revisión",
    instruction: "Si hay un solo equipo, revisa su propuesta y pasa al resultado final. Si hay varios, comparad las propuestas y votad las más defendibles. Después pulsa el botón para ver los resultados.",
    tip: "No confundas la propuesta más votada con la más viable. La evaluación técnica necesita comprobar el mecanismo, los riesgos y las pruebas propuestas.",
  },
  {
    title: "Resultado · Comparación",
    instruction: "Has llegado al final. Abre la comparación de tu equipo para ver tus seis respuestas junto a una solución técnica orientativa para el mismo reto. Identifica diferencias y revisa los cuatro criterios de aprendizaje.",
    tip: "La referencia no es la única respuesta válida ni una tecnología aprobada. Detecta qué te falta justificar y qué experimento permitiría comprobar tu idea.",
  },
];

export default function BioLabGuide() {
  const { currentScreen, activeTeam, guideSubstep, teams } = useBioLab();
  const [minimized, setMinimized] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState("");

  const guide = useMemo(() => {
    if (currentScreen === 6) return canvasSteps[Math.min(Math.max(guideSubstep, 0), 5)];
    const base = screenSteps[Math.min(Math.max(currentScreen, 0), screenSteps.length - 1)];
    if (currentScreen === 4 && activeTeam?.challenge && activeTeam?.organism) {
      return { ...base, tip: `Has elegido ${activeTeam.organism.name} para ${activeTeam.challenge.title}. Comprueba si su función natural es realmente aplicable al reto. Si no puedes justificarla, cambia de modelo.` };
    }
    if (currentScreen === 7 && teams.length > 1) {
      return { ...base, tip: `Hay ${teams.length} equipos. Todos deben escribir el título y el resumen de su propuesta antes de desbloquear la revisión conjunta.` };
    }
    return base;
  }, [currentScreen, guideSubstep, activeTeam?.challenge, activeTeam?.organism, teams.length]);
  const message = showTip ? guide.tip : guide.instruction;

  useEffect(() => {
    setShowTip(false);
    setSpeechError("");
    setSpeaking(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, [currentScreen, guideSubstep]);

  useEffect(() => () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const stopAudio = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const speak = () => {
    setSpeechError("");
    if (speaking) { stopAudio(); return; }
    if (!("speechSynthesis" in window)) {
      setSpeechError("La voz no está disponible en este navegador. Puedes leer las instrucciones aquí.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "es-ES";
    utterance.rate = 0.94;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase() === "es-es") ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith("es")) ?? null;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => { setSpeaking(false); setSpeechError("No se ha podido reproducir la voz. Puedes leer la guía."); };
    window.speechSynthesis.speak(utterance);
  };

  const toggleTip = () => {
    stopAudio();
    setSpeechError("");
    setShowTip((previous) => !previous);
  };

  return (
    <aside className={`biolab-guide ${minimized ? "is-minimized" : ""}`} aria-label="Guía interactiva del taller">
      {minimized ? (
        <button type="button" className="biolab-guide-reopen" onClick={() => setMinimized(false)} aria-label="Abrir la guía del taller">
          <img src={GUIDE_AVATAR_IMAGE} alt="" />
          <span><MessageCircle size={16} aria-hidden="true" /> Guía del taller</span>
          <ChevronUp size={18} aria-hidden="true" />
        </button>
      ) : (
        <div className="biolab-guide-card">
          <div className="biolab-guide-top">
            <div>
              <span className="biolab-guide-eyebrow">ASISTENTE DEL TALLER</span>
              <h2>Guía del taller</h2>
            </div>
            <button type="button" className="biolab-guide-minimize" onClick={() => {stopAudio();setMinimized(true);}} title="Minimizar la guía" aria-label="Minimizar la guía">
              <ChevronDown size={19} aria-hidden="true" />
            </button>
          </div>
          <div className="biolab-guide-body">
            <img src={GUIDE_AVATAR_IMAGE} alt="Avatar científico del Laboratorio de Innovación Bioinspirada" className={`biolab-guide-avatar ${speaking ? "is-speaking" : ""}`}/>
            <div className="biolab-guide-content">
              <p className="biolab-guide-stage">{showTip ? "Consejo para esta etapa" : guide.title}</p>
              <p className="biolab-guide-message" aria-live="polite">{message}</p>
            </div>
          </div>
          {speechError && <p role="status" className="biolab-guide-error">{speechError}</p>}
          <div className="biolab-guide-actions">
            <button type="button" onClick={speak} aria-label={speaking ? "Detener la narración" : "Escuchar las instrucciones de esta etapa"}>
              {speaking ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
              {speaking ? "Detener" : "Escuchar"}
            </button>
            <button type="button" onClick={toggleTip} aria-pressed={showTip}>
              {showTip ? <MessageCircle size={17} aria-hidden="true" /> : <Lightbulb size={17} aria-hidden="true" />}
              {showTip ? "Instrucciones" : "Consejo"}
            </button>
          </div>
          <p className="biolab-guide-note">La guía cambia al avanzar por el juego.</p>
        </div>
      )}
    </aside>
  );
}
