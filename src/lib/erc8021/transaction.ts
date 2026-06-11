import { parseEther } from 'viem';
import { getWalletClient } from '@wagmi/core';
import { web3Config } from '../web3';

export const CONTRACT_ADDRESS = '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3';
export const ATTRIBUTION_CODE = '[ATTRIBUTION_CODE]';
export const BUILDER_CODE = '[BUILDER_CODE]';

/**
 * ERC-8021 Transaction Attribution implementation.
 * Sends a standard transaction while appending ERC-8021 attribution bytes.
 */
export async function sendGMTransaction(account: `0x${string}`) {
    try {
        const walletClient = await getWalletClient(web3Config);
        if (!walletClient) throw new Error("Wallet not connected");

        // Prepare the ERC-8021 metadata
        // A minimal text payload for standard "Say GM" or custom bytes
        // You'd typically encode the attribution details.
        // For simple test, we just send a transaction with text payload holding the attribution.
        const hexData = Buffer.from(`GM - ${ATTRIBUTION_CODE} - ${BUILDER_CODE}`, 'utf8').toString('hex');

        const hash = await walletClient.sendTransaction({
            account,
            to: CONTRACT_ADDRESS,
            value: parseEther('0'), // Sending 0 ETH, just data
            data: `0x${hexData}`,
        });

        console.log("Tx Hash:", hash);
        return hash;
    } catch (e) {
        console.error("sendGMTransaction error:", e);
        throw e;
    }
}
