import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface ProcessingScreenProps {
  onNext: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-background relative">
       {/* Background glow */}
       <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
       
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full mb-8 shadow-[0_0_30px_rgba(22,163,74,0.3)]"
      />
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-foreground tracking-tight"
      >
        Processing...
      </motion.h2>
      <p className="text-muted-foreground mt-2 text-sm">Connecting securely to payment gateway</p>
    </div>
  );
};
