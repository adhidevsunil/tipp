import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface ErrorScreenProps {
  onRetry: () => void;
  onCancel: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ onRetry, onCancel }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-background text-foreground p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-destructive/5 pointer-events-none" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(239,68,68,0.2)]"
      >
        <AlertCircle className="w-12 h-12 text-destructive" />
      </motion.div>
      
      <h2 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Payment Failed</h2>
      <p className="text-muted-foreground mb-10 max-w-xs mx-auto leading-relaxed">
        Something went wrong while processing. No amount has been deducted from your account.
      </p>
      
      <div className="w-full max-w-xs space-y-4 z-10">
        <Button onClick={onRetry} fullWidth size="lg" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/20">
          Try Again
        </Button>
        <Button onClick={onCancel} fullWidth variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted/50">
          Cancel
        </Button>
      </div>
    </div>
  );
};
