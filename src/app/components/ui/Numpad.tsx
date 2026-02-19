import React from 'react';
import { Delete } from 'lucide-react';
import { motion } from 'motion/react';

interface NumpadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  className?: string;
}

export const Numpad: React.FC<NumpadProps> = ({ onKeyPress, onDelete, className = '' }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

  return (
    <div className={`grid grid-cols-3 gap-3 p-3 ${className}`}>
      {keys.map((key) => (
        <motion.button
          key={key}
          whileTap={{ scale: 0.9 }}
          onClick={() => onKeyPress(key)}
          className="h-12 rounded-xl bg-muted/30 hover:bg-muted text-xl font-medium text-foreground flex items-center justify-center transition-colors"
        >
          {key}
        </motion.button>
      ))}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onDelete}
        className="h-12 rounded-xl bg-muted/30 hover:bg-muted text-foreground flex items-center justify-center transition-colors"
      >
        <Delete className="w-5 h-5" />
      </motion.button>
    </div>
  );
};
