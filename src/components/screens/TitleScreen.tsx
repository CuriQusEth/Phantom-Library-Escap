import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { BookOpen, Skull, Flame } from 'lucide-react';

export default function TitleScreen() {
  const setScreen = useGameStore(s => s.setScreen);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#120c0a] to-[#0a0a0a] z-0 pointer-events-none" />
      
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-10 flex flex-col items-center"
      >
        <div className="rune-text mb-4 tracking-widest text-center mx-auto opacity-50">PHANTOM_LIBRARY_V.15</div>
        <h1 className="text-6xl md:text-7xl font-bold font-serif text-[var(--color-horror-paper)] tracking-tighter drop-shadow-[0_0_15px_rgba(212,197,161,0.1)] mb-4 uppercase text-balance leading-none">
          Phantom<br/>Library
        </h1>
        <p className="text-xs md:text-sm font-sans tracking-[0.2em] text-[var(--color-horror-paper)]/60 uppercase mb-12 opacity-80">
          Seek the Exit. Manage your light. Follow the whispers.
        </p>

        <div className="flex flex-col gap-6 w-full max-w-xs mt-4">
          <button 
            onClick={() => setScreen('PLAYING')}
            className="action-card text-[var(--color-horror-paper)] tracking-widest uppercase font-serif overflow-hidden transition-all duration-500 hover:border-[var(--color-horror-blood)] hover:shadow-[0_0_20px_rgba(139,0,0,0.3)] flex justify-center items-center"
          >
            <span className="relative z-10 font-bold uppercase tracking-[2px]">Enter Library</span>
            <div className="absolute inset-0 bg-[var(--color-horror-blood)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 opacity-20" />
            <Flame className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-horror-blood)] w-5 h-5 pointer-events-none" />
          </button>
          
          <button 
            onClick={() => setScreen('LEADERBOARD')}
            className="text-[var(--color-horror-paper)]/70 py-3 px-8 tracking-widest uppercase font-serif text-sm transition-colors hover:text-[var(--color-horror-cyan)]"
          >
            Lost Souls
          </button>
        </div>

        <div className="mt-16 text-[10px] text-[var(--color-horror-paper)]/40 font-mono flex flex-col items-center gap-2 border border-[var(--color-horror-paper)]/20 p-4 w-full max-w-xs">
          <div className="uppercase opacity-50 mb-2 tracking-widest">Builder Identity</div>
          {isConnected ? (
             <div className="flex flex-col items-center">
               <span className="font-sans text-[var(--color-horror-cyan)]">{address?.slice(0,6)}...{address?.slice(-4)}</span>
               <button onClick={() => disconnect()} className="mt-4 text-[var(--color-horror-blood)] hover:underline uppercase tracking-widest">Sever Connection</button>
             </div>
          ) : (
            <button 
              onClick={() => connect({ connector: injected() })}
              className="mt-2 text-[var(--color-horror-paper)] hover:text-[var(--color-horror-cyan)] transition-colors uppercase tracking-widest font-bold"
            >
              Sign Pact
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
