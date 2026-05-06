import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { X, Flame, Hexagon, HandMetal } from 'lucide-react';
import { useAccount, useSendTransaction, useSignMessage } from 'wagmi';
import { parseEther } from 'viem';
import { getAttributionData } from '../../lib/erc8021/attribution';

export default function WorkshopScreen() {
  const { setScreen, ink, refillOil, useInk } = useGameStore();
  const { isConnected, address } = useAccount();
  const { sendTransaction, isPending, isSuccess } = useSendTransaction();
  const { signMessage } = useSignMessage();

  const handleBrewOil = () => {
    if(useInk(1)) refillOil(50);
  };

  const handleGM = async () => {
    if (!isConnected || !address) {
        alert("You must sign the pact (Connect Wallet) first.");
        return;
    }
    // "Say GM" via on-chain tx or sign
    signMessage({ account: address, message: 'GM Phantom Library' }, {
        onSuccess: (data) => alert("GM confirmed: " + data),
        onError: (err) => alert("Failed to speak: " + err.message)
    });
  };

  const handleRealTransaction = () => {
      // Dummy transaction attributing exactly to builder
      if (!isConnected) return;
      const txData = getAttributionData('0x1234'); // example payload
      sendTransaction({
          account: address,
          to: '0x0000000000000000000000000000000000000000',
          value: parseEther('0.0001'),
          data: txData,
      });
  };

  return (
    <div className="h-full w-full bg-[var(--color-horror-bg)] flex flex-col relative p-6">
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      
      <header className="status-bar items-center justify-between flex h-[60px] border-b border-[var(--color-horror-paper)]/10 px-5 text-xs tracking-widest uppercase bg-black/50 z-20 mb-6 w-full shrink-0">
         <div className="flex items-center gap-3 font-sans">
            <Hexagon className="w-4 h-4 opacity-70 text-[var(--color-horror-cyan)]" />
            <span>Ink Workshop</span>
         </div>
         <button onClick={() => setScreen('PLAYING')} className="hover:text-[var(--color-horror-cyan)] transition-colors text-[var(--color-horror-paper)]">
             <X className="w-5 h-5" />
         </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 z-10 w-full max-w-2xl mx-auto space-y-6 pb-20">
         <div className="action-card">
            <div className="rune-text text-white">RITUAL_01</div>
            <h2 className="text-2xl font-black text-[var(--color-horror-paper)] font-serif uppercase tracking-tighter mb-2 pb-2">Dark Rituals</h2>
            <div className="flex justify-between items-center mt-4 border border-[var(--color-horror-paper)]/10 p-3 bg-black/40">
                <span className="text-[var(--color-horror-paper)] font-sans text-xs uppercase tracking-widest">Convert Ink to Oil</span>
                <button 
                  onClick={handleBrewOil}
                  disabled={ink < 1}
                  className="px-4 py-2 border border-[var(--color-horror-paper)] hover:bg-[var(--color-horror-paper)]/10 disabled:opacity-30 transition-colors uppercase tracking-widest text-[10px] flex items-center gap-2 text-[var(--color-horror-paper)] font-bold"
                >
                    <Flame className="w-4 h-4 text-[var(--color-horror-blood)]" /> 1 INK
                </button>
            </div>
         </div>

         <div className="action-card overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-horror-cyan)]/10 border border-[var(--color-horror-cyan)] rotate-12 opacity-30 transform translate-x-8 -translate-y-8 pointer-events-none" />
            
            <div className="rune-text text-[var(--color-horror-cyan)]">ONCHAIN_PACT</div>
            <h2 className="text-lg text-[var(--color-horror-cyan)] font-sans uppercase tracking-[0.2em] mb-4">Network Rituals</h2>
            
            <div className="flex flex-col gap-3 relative z-10">
                <button 
                  onClick={handleGM}
                  className="w-full text-left p-4 border border-[var(--color-horror-cyan)]/20 bg-black/60 hover:bg-[var(--color-horror-cyan)]/10 transition-colors flex justify-between items-center group font-serif"
                >
                    <span className="text-sm tracking-widest uppercase text-[var(--color-horror-cyan)]/80 group-hover:text-[var(--color-horror-cyan)] font-bold">Whisper "GM" <span className="opacity-50 text-[10px] font-sans ml-2">(Sign Msg)</span></span>
                    <HandMetal className="w-4 h-4 text-[var(--color-horror-cyan)]/50 group-hover:text-[var(--color-horror-cyan)]" />
                </button>

                <button 
                  onClick={handleRealTransaction}
                  className="w-full text-left p-4 border border-[var(--color-horror-cyan)]/20 bg-black/60 hover:bg-[var(--color-horror-cyan)]/10 transition-colors flex justify-between items-center group font-serif"
                >
                    <span className="text-sm tracking-widest uppercase text-[var(--color-horror-cyan)]/80 group-hover:text-[var(--color-horror-cyan)] font-bold">Submit Soul Trace <span className="opacity-50 text-[10px] font-sans ml-2">(0.0001 ETH)</span></span>
                    <span className="text-[10px] border border-[var(--color-horror-cyan)]/30 px-2 py-1 uppercase tracking-widest text-[var(--color-horror-cyan)] font-sans">ERC-8021</span>
                </button>
                {isPending && <span className="text-xs text-[var(--color-horror-cyan)] animate-pulse uppercase tracking-widest text-center mt-2 font-sans">Ritual in progress...</span>}
            </div>
         </div>
      </div>
    </div>
  );
}
