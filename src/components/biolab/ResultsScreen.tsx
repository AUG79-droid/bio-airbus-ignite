import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clipboard, Printer, RotateCcw, ShieldCheck } from "lucide-react";
import { useBioLab } from "@/contexts/BioLabContext";
import type { TeamData } from "@/data/biolab-data";
import ReferenceComparison from "@/components/biolab/ReferenceComparison";

interface ResultsScreenProps {
  onRestart: () => void;
}

function hasText(value?: string) {
  return Boolean(value?.trim());
}

function proposalTitle(team: TeamData) {
  if (hasText(team.pitchTitle)) return team.pitchTitle.trim();
  if (team.challenge && team.organism) return `${team.challenge.title} con inspiración en ${team.organism.name.toLowerCase()}`;
  return `Concepto de ${team.name}`;
}

function readinessChecks(team: TeamData) {
  return [
    {
      label: "Problema redactado",
      text: "Se ha escrito un texto sobre el problema; su calidad no está evaluada.",
      passed: hasText(team.canvas.problem) && Boolean(team.challenge),
    },
    {
      label: "Principio redactado",
      text: "Hay una explicación del principio pendiente de valoración técnica.",
      passed: Boolean(team.organism) && hasText(team.canvas.principle),
    },
    {
      label: "Solución redactada",
      text: "Se ha escrito una propuesta; falta comprobar si el mecanismo funciona.",
      passed: hasText(team.canvas.solution),
    },
    {
      label: "Primera prueba redactada",
      text: "El texto menciona una validación, pero su suficiencia no está comprobada.",
      passed: hasText(team.canvas.implementation),
    },
  ];
}

function fallback(value: string | undefined, emptyText: string) {
  return hasText(value) ? value!.trim() : emptyText;
}

export default function ResultsScreen({ onRestart }: ResultsScreenProps) {
  const { teams } = useBioLab();
  const [copied, setCopied] = useState(false);
  const sorted = [...teams].sort((a, b) => b.votes - a.votes);
  const totalVotes = sorted.reduce((sum, team) => sum + team.votes, 0);
  const competitive = sorted.length > 1 && totalVotes > 0;
  const topTeam = sorted[0];

  if (!topTeam) return null;

  const checks = readinessChecks(topTeam);
  const readiness = checks.filter((check) => check.passed).length;
  const title = proposalTitle(topTeam);
  const summary = [
    `LABORATORIO DE INNOVACIÓN BIOINSPIRADA — RESUMEN DEL CONCEPTO`,
    `Equipo: ${topTeam.name}`,
    `Propuesta: ${title}`,
    `Reto: ${fallback(topTeam.challenge?.title, "No definido")}`,
    `Modelo natural: ${fallback(topTeam.organism?.name, "No seleccionado")}`,
    `Principio de diseño: ${fallback(topTeam.organism?.principle, "No definido")}`,
    `Solución propuesta: ${fallback(topTeam.canvas.solution, "No definida")}`,
    `Impacto esperado: ${fallback(topTeam.canvas.benefit, "No definido")}`,
    `Primer paso de validación: ${fallback(topTeam.canvas.implementation, "No definido")}`,
    `Apartados con información: ${readiness}/4 comprobaciones de presencia de texto (no es evaluación técnica)`,
    `Estado: hipótesis de taller; no constituye una afirmación técnica o ambiental validada.`,
  ].join("\n");

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="biolab-stage-header mb-10">
          <div>
            <span className="biolab-phase mb-5 inline-flex">Resultados · comparación final</span>
            <h2 className="biolab-section-title mb-3">Compara tu propuesta y descubre qué mejorar</h2>
            <p className="biolab-subtitle max-w-3xl">
              {competitive
                ? "El grupo ha seleccionado propuestas mediante votación. Abajo podéis compararlas con una solución técnica orientativa para cada reto; los votos no demuestran su viabilidad."
                : "Esta es la revisión final de tu trabajo. Más abajo encontrarás una solución orientativa para el mismo reto, que podrás comparar punto por punto con lo que escribió tu equipo."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 print:hidden">
            <button onClick={copySummary} className="biolab-btn-ghost">
              {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              {copied ? "Copiado" : "Copiar resumen"}
            </button>
            <button onClick={() => window.print()} className="biolab-btn-primary"><Printer className="h-4 w-4" /> Imprimir / guardar PDF</button>
          </div>
        </motion.header>

        <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto mb-7">
          <div className="biolab-card-dark p-0 overflow-hidden">
            <div className="h-1.5" style={{ background: "var(--gradient-accent)" }} />
            <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
              <div className="p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="biolab-evidence-chip">RESULTADO DEL TALLER</span>
                  {competitive && <span className="biolab-evidence-chip">MÁS VOTADA · {topTeam.votes} {topTeam.votes === 1 ? "VOTO" : "VOTOS"}</span>}
                </div>
                <p className="biolab-label mb-2">Equipo {topTeam.name}</p>
                <h3 className="text-3xl md:text-5xl leading-tight font-display font-bold text-white mb-5">{title}</h3>
                <p className="text-base md:text-lg text-slate-300 leading-8 mb-7">
                  {fallback(topTeam.pitchSummary, "El concepto necesita una presentación concisa antes de poder revisarse fuera de este taller.")}
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    ["Reto", fallback(topTeam.challenge?.title, "No definido")],
                    ["Modelo natural", fallback(topTeam.organism?.name, "No seleccionado")],
                    ["Principio", fallback(topTeam.organism?.principle, "No definido")],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-2">{label}</span>
                      <p className="text-sm font-semibold text-slate-100 leading-6">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[320px] border-t lg:border-t-0 lg:border-l border-white/10">
                {topTeam.organism?.image ? (
                  <img src={topTeam.organism.image} alt={topTeam.organism.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-white/5 text-slate-400">Sin imagen del modelo natural</div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/95 to-transparent">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Referencia biológica</p>
                  <p className="text-xl font-display font-bold text-white">{fallback(topTeam.organism?.name, "No seleccionada")}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-7">
          <div className="biolab-card">
            <div className="flex items-start justify-between gap-5 mb-6">
              <div>
                <span className="biolab-label block mb-2">Información registrada</span>
                <h3 className="text-2xl font-display font-bold text-foreground">{readiness}/4 apartados con texto</h3>
              </div>
              <div className="h-14 w-14 rounded-2xl grid place-items-center bg-primary/8 text-primary"><ShieldCheck className="h-7 w-7" /></div>
            </div>
            <div className="space-y-3">
              {checks.map((check) => (
                <div key={check.label} className={`biolab-check-row ${check.passed ? "is-passed" : ""}`}>
                  <span>{check.passed ? <Check className="h-4 w-4" strokeWidth={3} /> : "—"}</span>
                  <div><strong>{check.label}</strong><small>{check.text}</small></div>
                </div>
              ))}
            </div>
          </div>

          <div className="biolab-card">
            <span className="biolab-label block mb-4">Lo que escribió el equipo</span>
            <div className="space-y-4">
              {[
                ["Solución propuesta", fallback(topTeam.canvas.solution, "Concreta más la aplicación propuesta.")],
                ["Impacto esperado", fallback(topTeam.canvas.benefit, "Define la mejora técnica, operativa o ambiental esperada.")],
                ["Primer paso de validación", fallback(topTeam.canvas.implementation, "Especifica una simulación, un prototipo o un análisis comparativo.")],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border bg-muted/35 p-4">
                  <strong className="text-sm font-display text-foreground">{label}</strong>
                  <p className="text-sm text-muted-foreground leading-6 mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {sorted.length > 1 && (
          <section className="max-w-6xl mx-auto biolab-card mb-7">
            <div className="flex flex-wrap justify-between gap-3 mb-5">
              <div><span className="biolab-label block mb-2">Comparación de equipos</span><h3 className="text-xl font-display font-bold text-foreground">Resumen de la votación</h3></div>
              <p className="text-sm text-muted-foreground">Los votos indican una preferencia, no una validación técnica.</p>
            </div>
            <div className="space-y-3">
              {sorted.map((team, index) => (
                <div key={team.id} className="flex items-center gap-4 rounded-2xl border border-border p-4">
                  <span className="font-mono text-sm font-bold text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-8 w-2 rounded-full" style={{ background: team.color }} />
                  <div className="flex-1 min-w-0"><strong className="block truncate text-foreground">{proposalTitle(team)}</strong><small className="text-muted-foreground">Equipo {team.name}</small></div>
                  <strong className="text-xl font-display text-foreground">{team.votes}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        <ReferenceComparison teams={sorted} />

        <section className="max-w-6xl mx-auto biolab-callout mb-8">
          <strong>Interpretación responsable</strong>
          <p>La comparación anterior es orientativa y sirve para detectar fortalezas y carencias. No equivale a una corrección automática de contenido, una aprobación de Airbus ni una demostración de viabilidad o beneficio ambiental. Para validar cualquier propuesta serían necesarios ensayos, revisión de riesgos y evaluación del ciclo de vida.</p>
        </section>

        <div className="text-center print:hidden">
          <p className="text-sm text-muted-foreground mb-5">Laboratorio de Innovación Bioinspirada completado · el progreso permanece guardado en este dispositivo</p>
          <button onClick={onRestart} className="biolab-btn-ghost"><RotateCcw className="h-4 w-4" /> Iniciar una sesión nueva</button>
        </div>
      </div>
    </div>
  );
}
