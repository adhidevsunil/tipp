import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

interface SuccessScreenProps {
  onDone: () => void;
  waiterName: string;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onDone, waiterName }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const particles = React.useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['#16a34a', '#eab308', '#3b82f6', '#ef4444'][i % 4], // Using theme colors
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      x: (Math.random() - 0.5) * 200,
    }));
  }, []);

  return (
    <div className="flex flex-col h-full items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 pointer-events-none" />

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{
                  top: '-10%',
                  left: `${p.left}%`,
                  backgroundColor: p.color,
                }}
                animate={{
                  y: ['0vh', '100vh'],
                  x: [0, p.x],
                  rotate: [0, 360],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: p.duration,
                  ease: "easeOut",
                  delay: p.delay,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-card rounded-3xl p-8 shadow-2xl border border-border flex flex-col items-center max-w-xs w-full z-10 relative"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(22,163,74,0.3)]"
        >
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </motion.div>

        <h2 className="text-3xl font-bold text-foreground text-center mb-2 tracking-tight">Sent!</h2>
        <p className="text-muted-foreground text-center mb-8 text-sm leading-relaxed">
          Your appreciation has been shared with <span className="text-primary font-semibold block mt-1 text-lg">{waiterName}</span>
        </p>

        <Button onClick={onDone} fullWidth size="lg" className="shadow-lg shadow-primary/20">
          Done
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-muted-foreground/50 text-xs font-mono tracking-widest uppercase"
      >
        ID: #TIP-{Math.floor(Math.random() * 1000000)}
      </motion.p>
    </div>
  );
};
