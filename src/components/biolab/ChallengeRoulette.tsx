import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCw, Sparkles } from "lucide-react";
import { useBioLab } from "@/contexts/BioLabContext";
import { CHALLENGES } from "@/data/biolab-data";
import { CLIMATE_CHALLENGES } from "@/data/climate-challenges";
import { STRATEGIC_CHALLENGES, challengeTrack, type Track } from "@/data/resilience-expansion";
import { PilotAssessment, preferredTrack, hasBaseline } from "@/components/biolab/PilotAssessment";

interface ChallengeRouletteProps {
  onNext: () => void;
  onBack: () => void;
  lockedTrack?: Track;
}

const CHALLENGE_CODES = ["STR", "AERO", "OPS", "ACOU", "MAT", "LOG", "NDT", "AIR"];

export default function ChallengeRoulette({ onNext, onBack, lockedTrack }: ChallengeRouletteProps) {
  const { setTeamChallenge, activeTeam } = useBioLab();
  const [mode, setMode] = useState<Track>(() => lockedTrack ?? (activeTeam?.challenge ? challengeTrack(activeTeam.challenge.id) : preferredTrack()));
  const pool = mode === "climate" ? CLIMATE_CHALLENGES : mode === "resilience" ? STRATEGIC_CHALLENGES : CHALLENGES;
  const codes = mode === "climate" ? ["HEAT","DUST","HAIL","SUN","EROS","HUM","COLD"] : mode === "resilience" ? ["NET","REPR","COOR","LIFE"] : CHALLENGE_CODES;
  const angleStep = 360 / pool.length;
  const savedIndex = pool.findIndex((challenge) => challenge.id === activeTeam?.challenge?.id);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(savedIndex >= 0 ? savedIndex : 0);
  const [selected, setSelected] = useState(savedIndex >= 0);
  const [rotation, setRotation] = useState(-(savedIndex >= 0 ? savedIndex : 0) * angleStep);
  const timerRef = useRef<number | null>(null);
  const challenge = pool[currentIndex];
  const chooseMode = (next: Track) => {
    if (isSpinning || next === mode) return;
    setMode(next); setCurrentIndex(0); setRotation(0); setSelected(false);
  };

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const spin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelected(false);

    const totalSteps = 22 + Math.floor(Math.random() * 10);
    let completedSteps = 0;

    const tick = () => {
      completedSteps += 1;
      setCurrentIndex((index) => (index + 1) % pool.length);
      setRotation((angle) => angle - angleStep);

      if (completedSteps >= totalSteps) {
        setIsSpinning(false);
        setSelected(true);
        return;
      }

      const progress = completedSteps / totalSteps;
      timerRef.current = window.setTimeout(tick, 55 + Math.pow(progress, 2.4) * 260);
    };

    timerRef.current = window.setTimeout(tick, 70);
  }, [isSpinning, pool, angleStep]);

  const handleConfirm = () => {
    if (activeTeam && !hasBaseline(activeTeam.id, mode, challenge.id)) {window.alert("Completa primero la evaluación inicial.");return;}
    if (activeTeam?.challenge && activeTeam.challenge.id !== challenge.id && !window.confirm("Cambiar de reto borrará el modelo, el lienzo y la presentación del equipo activo. ¿Quieres continuar?")) return;
    if (activeTeam && !hasBaseline(activeTeam.id, mode, challenge.id)) return;
    setTeamChallenge(challenge);
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="biolab-stage-header">
          <div>
            <span className="biolab-phase mb-5 inline-flex">Etapa 02 — Asignación del reto</span>
            <h2 className="biolab-section-title mb-3">Gira la ruleta de retos de innovación aeronáutica</h2>
            <p className="biolab-subtitle max-w-3xl">
              La ruleta asigna un problema funcional. Después, tu equipo buscará en la naturaleza una estrategia —no una forma— capaz de abordarlo.
            </p>
          </div>
          {activeTeam && (
            <div className="biolab-team-ticket">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: activeTeam.color }} />
              <div><small>EQUIPO ACTIVO</small><strong>{activeTeam.name}</strong></div>
            </div>
          )}
        </motion.header>

        <section className="max-w-5xl mx-auto biolab-card mb-6" aria-label="Modalidad del taller">
          {lockedTrack?<div data-testid="locked-track" className="font-bold text-lg">Temática elegida: {mode==="general"?"Innovación general":mode==="climate"?"Adaptación climática":"Resiliencia estratégica"} ({pool.length} retos)</div>:<div className="flex flex-wrap gap-3">
            <button type="button" aria-pressed={mode === "general"} disabled={isSpinning} onClick={() => chooseMode("general")} className={mode === "general" ? "biolab-btn-primary" : "biolab-btn-ghost"}>Innovación general (8 retos)</button>
            <button type="button" aria-pressed={mode === "climate"} disabled={isSpinning} onClick={() => chooseMode("climate")} className={mode === "climate" ? "biolab-btn-primary" : "biolab-btn-ghost"}>Laboratorio de resiliencia climática (7 retos)</button>
            <button type="button" aria-pressed={mode === "resilience"} disabled={isSpinning} onClick={() => chooseMode("resilience")} className={mode === "resilience" ? "biolab-btn-primary" : "biolab-btn-ghost"}>Laboratorio de resiliencia estratégica (4 retos)</button>
          </div>}
          {mode !== "general" && <><p className="text-sm text-muted-foreground mt-4 leading-6">{mode === "climate" ? "Aprende a conectar amenazas físicas futuras con vulnerabilidades de producto y soporte. Calor, radiación, polvo, granizo, humedad y frío. No calcula prestaciones ni cubre toda la adaptación aeronáutica." : "Aprende cómo Compras, Ingeniería, Operaciones y Mantenimiento pueden reducir dependencias, preservar funciones y facilitar la recuperación. Los resultados son hipótesis de aprendizaje."}</p><div className="flex flex-wrap gap-2 mt-3">{pool.map((item,i)=><button key={item.id} type="button" disabled={isSpinning} aria-pressed={selected && currentIndex===i} className="biolab-btn-ghost" onClick={()=>{setCurrentIndex(i);setRotation(-i*angleStep);setSelected(true);}}>{item.title}</button>)}</div></>}
        </section>
        {activeTeam && <PilotAssessment key={activeTeam.id+mode} teamId={activeTeam.id} track={mode} phase="pre" />}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[390px_1fr] gap-7 items-stretch">
          <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="biolab-card-dark biolab-wheel-panel">
            <div className="biolab-wheel-marker" aria-hidden="true" />
            <div className="biolab-wheel" style={mode === "climate" ? { background: "conic-gradient(from -60deg, #143c51 0deg 120deg, #25576a 120deg 240deg, #1a4558 240deg 360deg)" } : undefined} aria-label={`Reto actual: ${challenge.title}`}>
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: rotation }}
                transition={{ duration: isSpinning ? 0.12 : 0.5, ease: isSpinning ? "linear" : "easeOut" }}
              >
                {pool.map((item, index) => {
                  const angle = index * angleStep;
                  const isCurrent = index === currentIndex;
                  return (
                    <div
                      key={item.id}
                      className={`biolab-wheel-node ${isCurrent ? "is-current" : ""}`}
                      style={{ transform: `rotate(${angle}deg) translateY(-132px) rotate(${-angle}deg)` }}
                    >
                      <span style={{ transform: `rotate(${currentIndex * angleStep}deg)` }}>{codes[index]}</span>
                    </div>
                  );
                })}
              </motion.div>
              <div className="biolab-wheel-core">
                <Sparkles className="h-5 w-5" />
                <span>REF-{challenge.id.toUpperCase()}</span>
                <strong>{codes[currentIndex]}</strong>
              </div>
            </div>

            <div className="text-center mt-5">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45 mb-2">Área de innovación</p>
              <p className="font-display font-semibold text-white">{challenge.area}</p>
            </div>
          </motion.section>

          <AnimatePresence mode="wait">
            <motion.section
              key={currentIndex}
              initial={{ opacity: 0, y: isSpinning ? -8 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: isSpinning ? 0.09 : 0.28 }}
              className={`biolab-card flex flex-col justify-between ${selected ? "ring-2 ring-accent border-accent/40" : ""}`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="biolab-badge">{challenge.area}</span>
                  <span className="biolab-evidence-chip">FUNCIÓN ANTES QUE FORMA</span>
                </div>
                <span className="biolab-label block mb-3">Problema asignado</span>
                <h3 className="text-3xl md:text-4xl font-bold font-display text-foreground leading-tight mb-5">
                  {challenge.title}
                </h3>
                <p className="text-base text-muted-foreground leading-7 mb-8">
                  {challenge.description}
                </p>

                <div className="biolab-callout">
                  <strong>Pregunta de diseño</strong>
                  <p>¿Cómo realiza la naturaleza esta función con eficiencia y qué mecanismo subyacente podría traducirse respetando las restricciones aeronáuticas?</p>
                </div>
              </div>

              <div className="pt-7 mt-7 border-t border-border">
                {selected ? (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-success">
                      <Check className="h-4 w-4" strokeWidth={3} /> Reto preparado para confirmar
                    </span>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={spin} className="biolab-btn-ghost"><RotateCw className="h-4 w-4" /> Girar de nuevo</button>
                      <button onClick={handleConfirm} className="biolab-btn-primary">Confirmar reto <ArrowRight className="h-4 w-4" /></button>
                    </div>
                  </div>
                ) : (
                  <button onClick={spin} disabled={isSpinning} className="biolab-btn-accent w-full justify-center text-base py-4">
                    <RotateCw className={`h-5 w-5 ${isSpinning ? "animate-spin" : ""}`} />
                    {isSpinning ? "Asignando reto…" : "Girar la ruleta de innovación"}
                  </button>
                )}
              </div>
            </motion.section>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-10">
          <button onClick={onBack} className="biolab-btn-ghost"><ArrowLeft className="h-4 w-4" /> Volver</button>
        </div>
      </div>
    </div>
  );
}
