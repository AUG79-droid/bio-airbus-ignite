import { motion } from "framer-motion";
import heroImage from "@/assets/hero-biolab.jpg";

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Biomímesis: naturaleza e ingeniería"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 biolab-hero-overlay" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <span className="biolab-badge text-base">Sesión de innovación</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 font-display tracking-tight">
          BioLab{" "}
          <span className="text-gradient-accent">Airbus</span>
        </h1>

        <p className="text-xl md:text-2xl text-primary-foreground/80 font-light mb-4 max-w-2xl mx-auto leading-relaxed">
          Conecta los principios de la naturaleza con los retos de la aeronáutica.
        </p>

        <p className="text-base text-primary-foreground/60 mb-12 max-w-xl mx-auto">
          <strong className="text-primary-foreground/80">Biomímesis</strong>: innovación inspirada en 3.800 millones de años de evolución. Observa, aprende y aplica las estrategias de la naturaleza para resolver retos reales.
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="biolab-btn-accent text-xl px-12 py-5"
        >
          Comenzar experiencia
          <svg className="w-6 h-6 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
