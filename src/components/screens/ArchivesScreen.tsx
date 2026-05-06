import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { X, BookOpen } from 'lucide-react';

export default function ArchivesScreen() {
  const { setScreen, secretsDiscovered } = useGameStore();

  return (
    <div className="h-full w-full bg-[var(--color-horror-bg)] flex flex-col relative p-6">
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      
      <header className="status-bar items-center justify-between flex h-[60px] border-b border-[var(--color-horror-paper)]/10 px-5 text-xs tracking-widest uppercase bg-black/50 z-20 mb-6 w-full shrink-0">
         <div className="flex items-center gap-3 font-sans">
            <BookOpen className="w-4 h-4 opacity-70 text-[var(--color-horror-cyan)]" />
            <span>Forgotten Archives</span>
         </div>
         <button onClick={() => setScreen('PLAYING')} className="hover:text-[var(--color-horror-cyan)] transition-colors text-[var(--color-horror-paper)]">
             <X className="w-5 h-5" />
         </button>
      </header>

      <div className="flex-1 overflow-y-auto pr-2 z-10 w-full max-w-2xl mx-auto space-y-6 pb-20">
         {secretsDiscovered.length === 0 ? (
             <div className="text-center mt-20 opacity-50 font-serif italic text-lg text-[var(--color-horror-paper)]">
                 The shelves are empty... for now.
             </div>
         ) : (
             secretsDiscovered.map((secret, i) => (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={secret} 
                    className="action-card"
                 >
                    <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-horror-blood)]" />
                    <div className="rune-text">ARCHIVE_ENTRY_{i+1}</div>
                    <p className="font-serif italic text-[var(--color-horror-paper)]/80 leading-relaxed text-balance">
                        "{secret.includes('book') ? "I found this text bound in something that felt uncomfortably like skin. It whispered secrets of the labyrinth." : "An anomaly in the dark."}"
                    </p>
                 </motion.div>
             ))
         )}
      </div>
    </div>
  );
}
