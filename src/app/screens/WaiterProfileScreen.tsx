import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MessageSquarePlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Numpad } from '../components/ui/Numpad';
import { Waiter } from '../types';

interface WaiterProfileScreenProps {
  waiter: Waiter;
  initialAmount?: number;
  onBack: () => void;
  onProceed: (amount: number) => void;
}

export const WaiterProfileScreen: React.FC<WaiterProfileScreenProps> = ({ waiter, initialAmount, onBack, onProceed }) => {
  const [amountStr, setAmountStr] = useState<string>(initialAmount ? initialAmount.toString() : '');
  const [note, setNote] = useState<string>('');

  const handleKeyPress = (key: string) => {
    if (key === '.' && amountStr.includes('.')) return;
    if (amountStr.length > 6) return; // Limit length
    setAmountStr(prev => prev + key);
  };

  const handleDelete = () => {
    setAmountStr(prev => prev.slice(0, -1));
  };

  const handleProceed = () => {
    const finalAmount = parseFloat(amountStr);
    if (finalAmount > 0) {
      onProceed(finalAmount);
    }
  };

  const presets = [20, 50, 100];

  return (
    <div className="flex flex-col h-full bg-background text-foreground relative overflow-hidden">
      {/* Decorative gradient blob - Subtle and light */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-48 h-48 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between p-4 z-10">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors text-foreground shadow-sm border border-border/50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Tipping
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col items-center px-6 z-10 pt-4 overflow-y-auto pb-[400px]"> {/* Large padding bottom to avoid overlap with fixed sheet */}

        {/* Waiter Info - Minimal */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground">{waiter.name}</h2>
          <p className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full mt-1">{waiter.role}</p>
        </motion.div>

        {/* Amount Display */}
        <div className="flex flex-col items-center w-full mb-8">
          <motion.div
            key={amountStr}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative flex items-center justify-center"
          >
            <span className="text-4xl text-muted-foreground/50 mr-2 font-light">₹</span>
            <span className={`text-7xl font-bold tracking-tight ${!amountStr ? 'text-muted-foreground/30' : 'text-foreground'}`}>
              {amountStr || '0'}
            </span>
          </motion.div>

          {/* Add Note Button */}
          <button className="mt-4 flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white border border-border shadow-sm text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
            <MessageSquarePlus className="w-4 h-4" />
            <span>{note || "Add a note"}</span>
          </button>
        </div>

        {/* Presets */}
        <div className="flex gap-3 mb-6">
          {presets.map(preset => (
            <button
              key={preset}
              onClick={() => setAmountStr(preset.toString())}
              className="px-5 py-2.5 rounded-full border border-border hover:border-primary/50 bg-white hover:bg-primary/5 text-sm font-medium transition-all shadow-sm"
            >
              ₹{preset}
            </button>
          ))}
        </div>

      </div>

      {/* Numpad & Action - Fixed Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl rounded-t-[32px] border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 pb-10 pt-4">
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6" />

        <div className="px-6 flex flex-col gap-6">
          <Numpad
            onKeyPress={handleKeyPress}
            onDelete={handleDelete}
            className="mb-2"
          />

          <Button
            fullWidth
            size="lg"
            disabled={!amountStr || parseFloat(amountStr) <= 0}
            onClick={handleProceed}
            className="h-16 text-xl font-bold shadow-xl shadow-primary/20 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground transform active:scale-[0.98] transition-all"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
