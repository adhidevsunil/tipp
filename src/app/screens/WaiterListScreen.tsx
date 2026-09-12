import React from 'react';
import { motion } from 'motion/react';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Waiter } from '../types';
import { getWaiters } from '../data';
import { Search, User } from 'lucide-react';

interface WaiterListScreenProps {
  onSelect: (waiter: Waiter) => void;
}

export const WaiterListScreen: React.FC<WaiterListScreenProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [waitersList, setWaitersList] = React.useState<Waiter[]>([]);

  React.useEffect(() => {
    setWaitersList(getWaiters());
  }, []);

  const filteredWaiters = waitersList.filter(waiter =>
    waiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    waiter.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col h-full bg-background px-4 pt-10 pb-6 overflow-y-auto relative">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="mb-8 flex justify-between items-start z-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Staff</h1>
          <p className="text-muted-foreground text-sm">Select who served you today</p>
        </div>
      </div>

      <div className="relative mb-8 z-10">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          placeholder="Search by name..."
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 pb-24 z-10"
      >
        {filteredWaiters.length > 0 ? (
          filteredWaiters.map((waiter) => (
            <motion.div
              key={waiter.id}
              variants={item}
              onClick={() => onSelect(waiter)}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center p-5 text-center h-full bg-card hover:bg-muted/50 border border-border rounded-2xl transition-colors shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-1 rounded-full border border-primary/20 mb-3 relative z-10">
                  <Avatar className="w-14 h-14">
                    {waiter.imageUrl ? <AvatarImage src={waiter.imageUrl} alt={waiter.name} className="object-cover" /> : null}
                    <AvatarFallback className="bg-slate-200">
                      <User className="w-7 h-7 text-slate-400" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h3 className="font-semibold text-foreground text-base leading-tight mb-2 relative z-10">{waiter.name}</h3>
                <span className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full relative z-10">{waiter.role}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 text-center text-muted-foreground py-10">
            No waiters found
          </div>
        )}
      </motion.div>
    </div>
  );
};
