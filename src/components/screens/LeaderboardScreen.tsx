import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { X, Trophy, Skull } from 'lucide-react';

const MOCK_LEADERS = [
    { rank: 1, address: '0x1A4...9e2B', floor: 42, secrets: 15, status: 'CONSUMED' },
    { rank: 2, address: '0x8bF...3341', floor: 35, secrets: 12, status: 'ESCAPED' },
    { rank: 3, address: '0x4cF...77Ac', floor: 28, secrets: 9, status: 'CONSUMED' },
];

export default function LeaderboardScreen() {
  const { setScreen } = useGameStore();

  return (
    <div className="h-full w-full bg-[var(--color-horror-bg)] flex flex-col relative p-6">
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      
      <header className="status-bar items-center justify-between flex h-[60px] border-b border-[var(--color-horror-paper)]/10 px-5 text-xs tracking-widest uppercase bg-black/50 z-20 mb-6 w-full shrink-0">
         <div className="flex items-center gap-3 font-sans">
            <Trophy className="w-4 h-4 opacity-70 text-[var(--color-horror-cyan)]" />
            <span>Lost Souls</span>
         </div>
         <button onClick={() => setScreen('TITLE')} className="hover:text-[var(--color-horror-cyan)] transition-colors text-[var(--color-horror-paper)]">
             <X className="w-5 h-5" />
         </button>
      </header>

      <div className="flex-1 overflow-y-auto z-10 w-full max-w-2xl mx-auto px-4">
          <p className="text-[10px] text-[var(--color-horror-cyan)] font-sans uppercase tracking-widest text-center mb-8 opacity-70">
              Verified by SIWE on Base Mainnet
          </p>

          <div className="flex flex-col flex-grow overflow-hidden">
             {MOCK_LEADERS.map((leader, i) => (
                 <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={leader.rank} 
                    className="border-b border-[var(--color-horror-paper)]/10 py-4 flex items-center justify-between text-sm group hover:bg-white/5 px-2 transition-colors"
                 >
                    <div className="flex items-center gap-4">
                        <span className="opacity-50 italic font-serif">0{leader.rank}.</span>
                        <div>
                            <div className="font-sans text-[var(--color-horror-paper)] group-hover:text-[var(--color-horror-cyan)] transition-colors">{leader.address}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] uppercase tracking-widest text-[var(--color-horror-paper)]/60">Floor {leader.floor}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[var(--color-horror-cyan)] font-bold">{leader.secrets} Pages</span>
                        <div className="flex items-center gap-1 opacity-50 mt-1">
                            {leader.status === 'CONSUMED' ? (
                                <Skull className="w-3 h-3 text-[var(--color-horror-blood)]" />
                            ) : (
                                <div className="w-3 h-3 border border-green-900 rounded-sm bg-green-900/20" />
                            )}
                            <span className={`text-[9px] uppercase tracking-widest ${leader.status === 'CONSUMED' ? 'text-[var(--color-horror-blood)]' : 'text-green-700'}`}>
                                {leader.status}
                            </span>
                        </div>
                    </div>
                 </motion.div>
             ))}
         </div>
      </div>
    </div>
  );
}
