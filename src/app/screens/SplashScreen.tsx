import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onNext: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background relative overflow-hidden">
      {/* Background Gradient - Light and fresh */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-primary rounded-3xl rotate-3 flex items-center justify-center shadow-2xl shadow-primary/30 mb-8 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
          <span className="text-primary-foreground text-5xl font-bold tracking-tighter relative z-10">T</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-3 text-foreground">
          Tipzo<span className="text-primary">.</span>
        </h1>
        <p className="text-muted-foreground text-lg tracking-wide font-light">Gratitude made simple</p>
      </motion.div>

      {/* Decorative elements - Adjusted for light theme */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/20 blur-sm pointer-events-none"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
    </div>
  );
};
