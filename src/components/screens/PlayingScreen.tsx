import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { Book, Flame, Key, Settings, Skull, Sparkles } from 'lucide-react';
import LibraryCanvas from '../canvas/LibraryCanvas';

export default function PlayingScreen() {
  const { sanity, oil, roomLevel, keys, isHallucinating, setScreen, reduceSanity } = useGameStore();

  // Sanity logic simulation
  useEffect(() => {
    const drainInterval = setInterval(() => {
      // In darkness, sanity drops faster
      const sanityDrain = oil < 20 ? 3 : 1;
      reduceSanity(sanityDrain);
    }, 4000);
    return () => clearInterval(drainInterval);
  }, [oil, reduceSanity]);

  return (
    <div className={`h-full w-full flex flex-col relative transition-colors duration-1000 ${isHallucinating ? 'sepia-[0.3] hue-rotate-15' : ''}`}>
      {isHallucinating && (
        <div className="absolute inset-0 bg-red-900/10 pointer-events-none mix-blend-overlay z-10 animate-pulse mix-blend-multiply" />
      )}
      
      {/* STATUS BAR (TOP) */}
      <header className="z-20 h-[60px] border-b border-[var(--color-horror-paper)]/10 flex items-center justify-between px-5 text-xs tracking-[0.1em] uppercase bg-black/50 text-[var(--color-horror-paper)] font-sans">
        <div className="flex items-center gap-2">
           <span>Floor: {roomLevel}</span>
        </div>
        
        <div className="flex gap-4 items-center opacity-80">
          <div className="flex items-center gap-1 text-[var(--color-horror-cyan)]">
            <Key className="w-3 h-3" /> 
            <span>{keys}</span>
          </div>
        </div>
      </header>

      {/* GAME CANVAS */}
      <div className="flex-1 relative w-full overflow-hidden bg-[#0a0505]">
          <LibraryCanvas />
      </div>

      {/* HUD OVERLAY (BOTTOM) */}
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 z-20 pointer-events-none">
         {/* OIL */}
         <div className="action-card pointer-events-auto flex flex-col justify-center items-center p-2 cursor-pointer hover:border-[var(--color-horror-paper)]/50" onClick={() => setScreen('WORKSHOP')}>
            <div className="rune-text text-[8px] sm:text-[10px]">LANTERN_OIL</div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-[var(--color-horror-paper)] rounded-full flex items-center justify-center relative overflow-hidden mb-1">
               <div className="absolute bottom-0 w-full bg-[rgba(242,125,38,0.3)] transition-all duration-300" style={{ height: `${oil}%` }} />
               <span className="z-10 font-bold font-serif text-[var(--color-horror-paper)] text-xs sm:text-base">{Math.ceil(oil)}%</span>
            </div>
            <span className="text-[8px] sm:text-[10px] opacity-50 italic text-center text-balance font-serif">Light is fragile</span>
         </div>

         {/* SANITY */}
         <div className="action-card pointer-events-auto flex flex-col justify-center items-center p-2 cursor-pointer hover:border-[var(--color-horror-paper)]/50" onClick={() => setScreen('ARCHIVES')}>
            <div className="rune-text text-[8px] sm:text-[10px] !text-[var(--color-horror-blood)]">SANITY</div>
            <div className="w-full px-2 mt-4 mb-2">
               <div className="h-2 bg-[#222] rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-[var(--color-horror-blood)] shadow-[0_0_10px_var(--color-horror-blood)] transition-all duration-300" style={{ width: `${sanity}%` }} />
               </div>
            </div>
            <span className="text-[8px] sm:text-[10px] opacity-60 italic text-center text-balance font-serif mt-auto">
               {sanity < 30 ? "Disturbed" : "Stable"}
            </span>
         </div>

         {/* ACTION */}
         <div className="action-card pointer-events-auto flex flex-col justify-center items-center p-2 border-[var(--color-horror-cyan)]/30">
            <div className="rune-text text-[8px] sm:text-[10px] text-white">INTERACT</div>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-horror-paper)] opacity-50 hover:opacity-100 transition-opacity mt-2" />
         </div>
      </div>
    </div>
  );
}
