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
  const { currentScreen, nextScreen, prevScreen, resetSession } = useBioLab();

  const screens = [
    <WelcomeScreen onNext={nextScreen} />,
    <HowItWorksScreen onNext={nextScreen} onBack={prevScreen} />,
    <TeamsScreen onNext={nextScreen} onBack={prevScreen} />,
    <ChallengeRoulette onNext={nextScreen} onBack={prevScreen} />,
    <NatureLibrary onNext={nextScreen} onBack={prevScreen} />,
    <MatchingScreen onNext={nextScreen} onBack={prevScreen} />,
    <BioCanvasScreen onNext={nextScreen} onBack={prevScreen} />,
    <PitchScreen onNext={nextScreen} onBack={prevScreen} />,
    <VotingScreen onNext={nextScreen} onBack={prevScreen} />,
    <ResultsScreen onRestart={resetSession} />,
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
  return (
    <BioLabProvider>
      <BioLabApp />
    </BioLabProvider>
  );
}
