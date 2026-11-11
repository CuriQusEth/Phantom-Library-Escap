import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';

/**
 * Base Mainnet Web3 Configuration
 * Configured for Base Denim upgrade (canonical 200ms native blocks).
 * Replaced retired Flashblocks with high-performance canonical Base Mainnet RPC endpoints.
 */
export const web3Config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http('https://mainnet.base.org', {
      batch: true,
      retryCount: 3,
      retryDelay: 200,
    }),
  },
});

