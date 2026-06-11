import { motion } from 'framer-motion';
import { useGameStore, GameScreen } from '../../store/gameStore';
import { useAccount, useSignMessage } from 'wagmi';
import { Skull, Eye, Sun } from 'lucide-react';
import { sendGMTransaction } from '../../lib/erc8021/transaction';
import { useState } from 'react';

export default function GameOverScreen({ type }: { type: GameScreen }) {
  const { resetGame, roomLevel, secretsDiscovered } = useGameStore();
  const { isConnected, address } = useAccount();
  const { signMessage, isSuccess } = useSignMessage();
  const [isGMSending, setIsGMSending] = useState(false);

  const isConsumed = type === 'CONSUMED';
  const title = isConsumed ? "Consumed By The Dark" : "You Escaped";
  const desc = isConsumed 
    ? "Your sanity shattered. You are now another whisper in the Phantom Library." 
    : "Light found a way. You survived the horrors of the forgotten archives.";
    
  const handleRecord = () => {
     if(!isConnected || !address) {
         alert("Connect wallet on Title Screen first!");
         return;
     }
     signMessage({
         account: address,
         message: `I reached Floor ${roomLevel} and found ${secretsDiscovered.length} secrets in the Phantom Library.`
     });
  };

  const handleGM = async () => {
    if (!isConnected || !address) return;
    try {
      setIsGMSending(true);
      await sendGMTransaction(address);
      alert("GM sent to the void!");
    } catch (e) {
      console.error(e);
      alert("Failed to send GM.");
    } finally {
      setIsGMSending(false);
    }
  };

  return (
    <div className={`h-full w-full flex flex-col items-center justify-center relative p-6 text-center ${isConsumed ? 'bg-[var(--color-horror-bg)] text-[var(--color-horror-paper)]' : 'bg-[var(--color-horror-paper)] text-[var(--color-horror-wood)]'}`}>
      <div className={`absolute inset-0 bg-noise pointer-events-none ${!isConsumed && 'opacity-20 mix-blend-multiply'} ${isConsumed && 'opacity-50'}`} />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center max-w-sm w-full"
      >
        {isConsumed ? (
            <Skull className="w-24 h-24 text-[var(--color-horror-blood)] mb-6 animate-pulse" strokeWidth={1} />
        ) : (
            <Eye className="w-24 h-24 text-[var(--color-horror-wood)] mb-6" strokeWidth={1} />
        )}
        
        <h1 className={`text-4xl md:text-5xl font-serif uppercase tracking-widest mb-4 ${isConsumed ? 'text-[var(--color-horror-blood)] drop-shadow-[0_0_20px_rgba(139,0,0,0.8)]' : 'text-[var(--color-horror-wood)]'}`}>
          {title}
        </h1>
        
        <p className={`font-serif italic text-lg leading-relaxed mb-8 ${isConsumed ? 'text-[var(--color-horror-paper)]/70' : 'text-[var(--color-horror-wood)]/80'}`}>
           {desc}
        </p>

        <div className={`w-full border-t border-b py-4 mb-8 flex justify-around ${isConsumed ? 'border-[var(--color-horror-wood)] text-[var(--color-horror-paper)]' : 'border-[var(--color-horror-wood)]/30 text-[var(--color-horror-wood)]'}`}>
           <div className="flex flex-col">
              <span className="text-[10px] font-sans uppercase tracking-widest opacity-70">Floor Reached</span>
              <span className="text-2xl font-serif">{roomLevel}</span>
           </div>
           <div className="flex flex-col border-l border-inherit pl-4">
              <span className="text-[10px] font-sans uppercase tracking-widest opacity-70">Secrets</span>
              <span className="text-2xl font-serif">{secretsDiscovered.length}</span>
           </div>
        </div>

        <button 
          onClick={handleRecord}
          disabled={isSuccess}
          className={`w-full py-4 tracking-widest text-xs mb-4 transition-colors font-sans uppercase font-bold text-center border ${
              isConsumed 
                ? 'bg-transparent text-[var(--color-horror-blood)] hover:bg-[var(--color-horror-blood)]/10 border-[var(--color-horror-blood)]/50' 
                : 'bg-[var(--color-horror-wood)] text-[var(--color-horror-paper)] hover:bg-black border-transparent'
          }`}
        >
          {isSuccess ? 'Record Sealed' : 'Record This Nightmare On-Chain'}
        </button>

        {isConnected && (
            <button
                onClick={handleGM}
                disabled={isGMSending}
                className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center justify-center gap-2 font-['Cinzel'] text-xs font-bold w-full mb-4"
            >
                <Sun className="w-4 h-4" />
                {isGMSending ? 'Saying GM...' : 'Say GM'}
            </button>
        )}

        <button 
            onClick={resetGame}
            className={`uppercase tracking-widest text-xs border-b pb-1 font-sans mt-4 transition-colors ${
                isConsumed ? 'text-[var(--color-horror-paper)]/50 border-[var(--color-horror-paper)]/20 hover:text-[var(--color-horror-paper)]' : 'text-[var(--color-horror-wood)]/70 border-[var(--color-horror-wood)]/30 hover:text-[var(--color-horror-wood)]'
            }`}
        >
            Descend Again
        </button>
      </motion.div>
    </div>
  );
}
