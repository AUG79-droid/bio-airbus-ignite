import { RESET_NOTICE, returnToCover, resetBioLab } from "@/data/reset-biolab";
import ResetBioLabButton from "@/components/biolab/ResetBioLabButton";
import { useState, useLayoutEffect, useEffect } from "react";
import { setPreferredTrack, preferredTrack, PilotAssessment } from "@/components/biolab/PilotAssessment";
import { challengeTrack, type Track } from "@/data/resilience-expansion";
import Workshop from "@/components/biolab/Workshop";
import { BioLabProvider, useBioLab, IS_DEMO_MODE } from "@/contexts/BioLabContext";
import BioLabNav from "@/components/biolab/BioLabNav";
import BioLabGuide from "@/components/biolab/BioLabGuide";
import WelcomeScreen from "@/components/biolab/WelcomeScreen";
import HowItWorksScreen from "@/components/biolab/HowItWorksScreen";
import TeamsScreen from "@/components/biolab/TeamsScreen";
import ChallengeRoulette from "@/components/biolab/ChallengeRoulette";
import NatureLibrary from "@/components/biolab/NatureLibrary";
import MatchingScreen from "@/components/biolab/MatchingScreen";
import BioCanvasScreen from "@/components/biolab/BioCanvasScreen";
import PitchScreen from "@/components/biolab/PitchScreen";
import VotingScreen from "@/components/biolab/VotingScreen";
import ResultsScreen from "@/components/biolab/ResultsScreen";
import { AnimatePresence, motion } from "framer-motion";

function BioLabApp() {
  const { currentScreen, nextScreen, prevScreen, resetSession, activeTeam, teams, setScreen } = useBioLab();
  const demo=IS_DEMO_MODE;
  useLayoutEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"});},[currentScreen]);
  const [landing,setLanding]=useState(!demo);
  const startTrack=(track:Track,participation:"single"|"competition")=>{
    if(participation==="competition"){window.location.assign(import.meta.env.BASE_URL+"?workshop=1&track="+track);return;}
    if(!demo&&teams.length>0){
      if(!window.confirm("¿Empezar un nuevo reto? Se sustituirá la sesión individual guardada en este navegador."))return;
      resetSession();
    }
    setPreferredTrack(track);
    setLanding(false);
    setScreen(1);
  };
  const resume=()=>{setLanding(false);if(currentScreen===0)setScreen(1);};
  if(landing||(!demo&&currentScreen===0))return <div className="min-h-screen bg-background"><WelcomeScreen onNext={startTrack} onResume={currentScreen>0||teams.length>0?resume:undefined}/><BioLabGuide stageOverride={0}/></div>;

  const screens = [
    <WelcomeScreen onNext={demo?nextScreen:startTrack} />,
    <HowItWorksScreen onNext={nextScreen} onBack={prevScreen} />,
    <TeamsScreen onNext={nextScreen} onBack={prevScreen} />,
    <ChallengeRoulette lockedTrack={demo?undefined:activeTeam?.challenge?challengeTrack(activeTeam.challenge.id):preferredTrack()} key={activeTeam?.id ?? "none"} onNext={nextScreen} onBack={prevScreen} />,
    <NatureLibrary onNext={nextScreen} onBack={prevScreen} />,
    <MatchingScreen onNext={nextScreen} onBack={prevScreen} />,
    <BioCanvasScreen onNext={nextScreen} onBack={prevScreen} />,
    <PitchScreen onNext={nextScreen} onBack={prevScreen} />,
    <VotingScreen onNext={nextScreen} onBack={prevScreen} />,
    <ResultsScreen onRestart={demo?resetSession:resetBioLab} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <BioLabNav />
      <BioLabGuide />
      {IS_DEMO_MODE && (
        <div
          role="region"
          aria-label="Controles de presentación de la demo"
          className="fixed bottom-4 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-[720px] -translate-x-1/2 flex-wrap items-center justify-between gap-2 rounded-2xl border border-amber-400/50 bg-slate-950/95 px-4 py-3 text-white shadow-2xl backdrop-blur print:hidden"
        >
          <div className="min-w-0">
            <strong className="block text-sm text-amber-300">DEMO · Caso completo</strong>
            <span className="block text-xs text-slate-300">Datos ficticios · Sin rellenar formularios</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={currentScreen === 0}
              onClick={prevScreen}
              className="rounded-lg border border-white/25 px-3 py-2 text-sm font-medium disabled:opacity-40"
            >
              ← Anterior
            </button>
            <span className="min-w-10 text-center text-sm tabular-nums text-slate-200">{currentScreen + 1}/10</span>
            <button
              type="button"
              disabled={currentScreen === 9}
              onClick={nextScreen}
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-40"
            >
              Siguiente →
            </button>
            <button
              type="button"
              onClick={resetSession}
              title="Reiniciar la demo con todos los campos preparados"
              className="rounded-lg border border-white/25 px-3 py-2 text-xs font-medium text-slate-100"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          onAnimationStart={()=>window.scrollTo({top:0,left:0,behavior:"instant"})}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={currentScreen > 0 ? "pt-20" : ""}
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Index() {
  useEffect(()=>{const onReset=(event:StorageEvent)=>{if(event.key===RESET_NOTICE&&event.newValue!==null)returnToCover();};window.addEventListener("storage",onReset);return()=>window.removeEventListener("storage",onReset);},[]);
  const query=new URLSearchParams(window.location.search);
  const phase=query.get("assessment");
  if(phase==="pre"||phase==="post"){
    const requested=query.get("track");
    const track:Track=requested==="general"||requested==="resilience"?requested:"climate";
    return <div className="min-h-screen bg-background biolab-grid-pattern py-8 px-4">
      <header className="max-w-6xl mx-auto biolab-card"><a href={import.meta.env.BASE_URL} className="biolab-btn-ghost">← BioLab</a><h1 className="font-display text-2xl font-bold mt-3">Vista de revisión · evaluaciones</h1><p className="my-3">Acceso directo a las preguntas reales del juego, sin iniciar un taller ni guardar respuestas de prueba.</p>
      <div className="flex flex-wrap gap-2 mb-4">{([["general","Innovación general"],["climate","Adaptación climática"],["resilience","Resiliencia estratégica"]] as const).map(([id,label])=><a key={id} className={track===id?"biolab-btn-primary":"biolab-btn-ghost border"} href={"?assessment="+phase+"&track="+id}>{label}</a>)}</div>
      <div className="flex flex-wrap gap-2"><a className={phase==="pre"?"biolab-btn-accent":"biolab-btn-ghost border"} href={"?assessment=pre&track="+track}>Preguntas iniciales</a><a className={phase==="post"?"biolab-btn-accent":"biolab-btn-ghost border"} href={"?assessment=post&track="+track}>Preguntas finales</a><button className="biolab-btn-ghost border" onClick={()=>window.location.reload()}>Reiniciar preguntas</button><ResetBioLabButton/></div></header>
      <PilotAssessment key={track+phase} teamId="assessment-preview" track={track} phase={phase} preview/>
    </div>;
  }
  if(query.get('workshop')==='1'&&(query.has('code')||['general','climate','resilience'].includes(query.get('track')??'')))return <Workshop/>;
  return (
    <BioLabProvider>
      <BioLabApp />
    </BioLabProvider>
  );
}
