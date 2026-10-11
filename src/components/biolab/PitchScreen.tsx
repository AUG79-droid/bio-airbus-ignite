import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface PitchScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PitchScreen({ onNext, onBack }: PitchScreenProps) {
  const { activeTeam, activeTeamIndex, teams, updatePitch, setActiveTeam, isPitchComplete } = useBioLab();
  if (!activeTeam) return null;

  const challenge = activeTeam.challenge;
  const organism = activeTeam.organism;
  const canvas = activeTeam.canvas;

  const canvasPreview = [
    { label: "Reto Airbus", value: challenge?.title },
    { label: "Modelo natural", value: organism?.name },
    { label: "Principio", value: organism?.principle },
    { label: "Solución propuesta", value: canvas.solution },
    { label: "Impacto esperado", value: canvas.benefit },
  ];

  const completedItems = canvasPreview.filter((item) => item.value && item.value.trim().length > 0).length;
  const titleReady = activeTeam.pitchTitle.trim().length >= 10;
  const summaryReady = activeTeam.pitchSummary.trim().length >= 120;
  const pitchIsReady = titleReady && summaryReady;
  const nextIncompleteTeamIndex = teams.findIndex((team, index) => index !== activeTeamIndex && !isPitchComplete(team));
  const hasAnotherTeamToComplete = nextIncompleteTeamIndex >= 0;

  const continueRoute = () => {
    if (hasAnotherTeamToComplete) setActiveTeam(nextIncompleteTeamIndex);
    else onNext();
  };

  const suggestedPitch = [
    canvas.problem && `Estamos abordando ${canvas.problem}`,
    organism?.name && organism?.principle && `Nos inspiramos en ${organism.name}, que realiza esta función mediante ${organism.principle.toLowerCase()}`,
    canvas.solution && `Proponemos ${canvas.solution}`,
    canvas.benefit && `Esto permitiría ${canvas.benefit}`,
    canvas.implementation && `El primer paso sería ${canvas.implementation}`,
  ]
    .filter(Boolean)
    .join(". ");

  const draftPitch = () => {
    if (!activeTeam.pitchSummary.trim()) updatePitch(activeTeam.pitchTitle, suggestedPitch);
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
            <span className="biolab-phase mb-4 inline-flex">Etapa 06 — Preparación de la presentación</span>
            <h2 className="biolab-section-title mb-3">Prepara cómo vas a presentar la propuesta</h2>
            <p className="biolab-subtitle max-w-3xl">
              Para continuar a la <strong>revisión del paso 7</strong> debes completar <strong>dos campos</strong>: el nombre de tu propuesta y un guion de al menos 120 caracteres que puedas explicar oralmente en aproximadamente 60 segundos. Cuando estén escritos se activará el botón inferior.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-7 rounded-sm ${i < completedItems ? "bg-success" : "bg-border"}`}
                />
              ))}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Resumen disponible</div>
              <div className="text-sm font-semibold text-foreground">{completedItems}/5 bloques clave</div>
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
                  Convierte el lienzo en un mensaje claro, conciso y defendible
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  El objetivo no es escribir con elegancia. Se trata de que cualquiera comprenda en un minuto <strong>qué problema Airbus elegiste</strong>, <strong>qué te inspiró</strong>, <strong>qué propones</strong> y <strong>por qué merece la pena explorarlo</strong>.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Orden recomendado</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• <strong>1.</strong> Escribe un nombre técnico para la propuesta (al menos 10 caracteres).</li>
                    <li>• <strong>2.</strong> Escribe un resumen con problema, mecanismo natural, solución y prueba inicial (al menos 120 caracteres). Puedes preparar un borrador a partir de tu lienzo y editarlo.</li>
                    <li>• <strong>3.</strong> Cuando los dos campos estén listos, pulsa el botón amarillo <strong>«Ir al paso 7: revisar propuestas»</strong>. Si hay más equipos pendientes, prepara primero sus presentaciones.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 1</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Resume el problema Airbus en una frase: <strong>qué quieres mejorar</strong> y <strong>por qué es importante</strong>.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 2</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Explica la inspiración natural y el principio que tomas prestado, utilizando la teoría necesaria para aclarar el mecanismo causal.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Paso 3</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Termina con la solución, su impacto esperado y el primer paso para validarla.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="biolab-card">
              <h3 className="biolab-label mb-4">Resumen preparado para presentar</h3>
              <div className="space-y-4">
                {canvasPreview.map((item) => (
                  <div key={item.label}>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">{item.label}</span>
                    <p className="text-sm text-foreground mt-1 leading-relaxed">{item.value || "Todavía no completado"}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="biolab-card overflow-hidden p-0">
              {organism?.image ? (
                <img
                  src={organism.image}
                  alt={organism.name}
                  className="w-full h-56 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-56 flex items-center justify-center text-muted-foreground">Sin imagen</div>
              )}
              <div className="p-5 border-t border-border">
                <span className="biolab-label block mb-2">Qué debe quedar claro</span>
                <p className="text-sm text-muted-foreground leading-6">
                  La presentación debe conectar el <strong>reto Airbus</strong>, la <strong>inspiración natural</strong>, el <strong>principio</strong> y la <strong>propuesta concreta</strong> sin resultar abstracta.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="biolab-card">
              <label className="biolab-label block mb-3">Nombre de la propuesta</label>
              <input
                type="text"
                value={activeTeam.pitchTitle}
                onChange={(e) => updatePitch(e.target.value, activeTeam.pitchSummary)}
                placeholder={`Ejemplo: Propuesta para ${challenge?.title?.toLowerCase() ?? "el reto elegido"} inspirada en ${organism?.name?.toLowerCase() ?? "la naturaleza"}`}
                className="biolab-input text-lg font-display font-semibold"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="biolab-card">
              <div className="flex items-center justify-between mb-3 gap-4">
                <label className="biolab-label">Presentación de 60 segundos</label>
                <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">Mensaje claro y no académico</span>
              </div>
              <textarea
                value={activeTeam.pitchSummary}
                onChange={(e) => updatePitch(activeTeam.pitchTitle, e.target.value)}
                placeholder="Resume con tus palabras qué problema resolvéis, qué mecanismo natural os inspira, qué solución proponéis, qué esperáis mejorar y cómo comprobaríais si funciona."
                rows={8}
                className="biolab-input resize-y text-base leading-relaxed"
              />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="biolab-btn-ghost border border-primary/25"
                  disabled={Boolean(activeTeam.pitchSummary.trim())}
                  onClick={draftPitch}
                >
                  Crear borrador editable con mis seis respuestas
                </button>
                <p className="text-sm text-muted-foreground">
                  Este botón solo prepara un borrador con <strong>lo que tu equipo ya escribió</strong>.
                  No sustituye una revisión técnica.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="biolab-card-dark py-5 px-5">
              <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                Estructura recomendada
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-200/85">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">1. Problema Airbus</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">2. Inspiración natural</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">3. Principio transferido</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">4. Solución técnica</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">5. Impacto esperado</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">6. Próximo paso</div>
              </div>
            </motion.div>
          </div>
        </div>

        <section className="max-w-6xl mx-auto mb-5 rounded-2xl border border-primary/20 bg-white p-5" aria-label="Requisitos para avanzar">
          <h3 className="text-lg font-bold mb-2">¿Qué falta para pasar al paso 7?</h3>
          <p className="text-base leading-7">{titleReady ? "✓" : "○"} Título de la propuesta: {titleReady ? "listo" : "escribe al menos 10 caracteres"}.</p>
          <p className="text-base leading-7">{summaryReady ? "✓" : "○"} Presentación de 60 segundos: {summaryReady ? "lista para revisar" : `faltan ${Math.max(0,120-activeTeam.pitchSummary.trim().length)} caracteres para alcanzar el mínimo`}.</p>
          <p className="text-sm text-muted-foreground mt-2">El mínimo de caracteres no comprueba la calidad: revisa que el contenido sea coherente.</p>
        </section>
        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={onBack} className="biolab-btn-ghost">← Volver al lienzo</button>
          <button onClick={continueRoute} className="biolab-btn-accent" disabled={!pitchIsReady} title={!pitchIsReady ? "Faltan el título o el texto de presentación. Revisa el cuadro de requisitos anterior." : undefined}>
            {hasAnotherTeamToComplete ? `Continuar con ${teams[nextIncompleteTeamIndex].name}` : "Ir al paso 7: revisar propuestas"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
          {!pitchIsReady && <p className="w-full text-center text-xs text-muted-foreground">Completa los dos campos señalados arriba para activar el botón. Después accederás a la revisión.</p>}
          {pitchIsReady && hasAnotherTeamToComplete && <p className="w-full text-center text-xs text-muted-foreground">Todos los equipos deben completar la misma ruta antes de desbloquear la revisión conjunta.</p>}
        </div>
      </div>
    </div>
  );
}
