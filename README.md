# Phantom Library Escape

Welcome to **Phantom Library Escape**, a tense, atmospheric horror-puzzle escape game. You wake up trapped inside an infinite, haunted Phantom Library where the books are alive, the shelves move on their own, and forgotten knowledge tries to consume you. Your goal is to solve the mysteries of the library and find the true exit before you become another lost soul on its shelves.

## Core Features

- **Dark Exploration**: Explore an ever-shifting library with tap-to-interact and drag-to-move mechanics.
- **Resource Management**: Manage limited Lantern Oil. Darkness drains your sanity and invites the Phantom Librarians.
- **Sanity System**: Stay in darkness or read cursed texts, and hallucinations begin, warping reality around you.
- **On-Chain Pacts**: Submit your soul trace securely onto the Base Mainnet! The game utilizes ERC-8021 standards to correctly attribute smart contract interactions to the app. Whisper "GM" on-chain and record your escape times to cement your legacy in the "Lost Souls" Leaderboard.
- **Trustless Agents**: Embedded with ERC-8004 capabilities, allowing for trustless AI orchestration.

## Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Zustand (state management)
- **Animation**: Framer Motion
- **Web3**: Wagmi, Viem, Base Mainnet
- **Backend APIs**: Express Server (MCP protocol, Agent orchestration)

## Agent Capabilities & MCP

This project integrates the **Phantom Library Orchestrator Agent**. This ERC-8004 compatible AI Agent navigates the library, performs knowledge escaping, and acts as an intelligent data orchestrator.

The agent's Model Context Protocol (MCP) and main APIs are active:
- `/.well-known/agent-card.json`: Agent-to-Agent Service registration.
- `/api/mcp`: Model Context Protocol Endpoint for active command execution.
- `/api/agent`: The main agent status and control API.

*(Warning: Never expose mnemonic phrases or private keys within client-facing code or public repositories. This repository follows security best practices.)*

## Playing Locally

If you'd like to build and test locally:

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access it through `http://localhost:3000`.

**Survival Guide**: Keep your lantern lit, trust nothing the books say, and good luck finding the exit!
