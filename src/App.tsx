/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import GameContainer from './components/GameContainer';
import { useAccount } from 'wagmi';
import { sendGMTransaction } from './lib/erc8021/transaction';
import { Sun } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const { isConnected, address } = useAccount();
  const [isGMSending, setIsGMSending] = useState(false);

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
    <>
      <GameContainer />
      {isConnected && (
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={handleGM}
            disabled={isGMSending}
            className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
          >
            <Sun className="w-4 h-4" />
            {isGMSending ? 'SAYING GM...' : 'SAY GM'}
          </button>
        </div>
      )}
    </>
  );
}
