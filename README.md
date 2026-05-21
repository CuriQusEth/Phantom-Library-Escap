# Phantom Library Escape

Welcome to **Phantom Library Escape**, a tense, atmospheric horror-puzzle escape game. You wake up trapped inside an infinite, haunted Phantom Library where the books are alive, the shelves move on their own, and forgotten knowledge tries to consume you. Your goal is to solve the mysteries of the library and find the true exit before you become another lost soul on its shelves.

## Core Features
- **Dark Exploration**: Explore an ever-shifting library with tap-to-interact and drag-to-move mechanics.
- **Resource Management**: Manage limited Lantern Oil. Darkness drains your sanity and invites the Phantom Librarians.
- **Sanity System**: Stay in darkness or read cursed texts, and hallucinations begin, warping reality around you.
- **Trustless Agents**: Embedded with ERC-8004 capabilities, allowing for trustless AI orchestration.

## Tech Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Zustand (state management)
- **Animation**: Framer Motion
- **Web3**: Wagmi, Viem, Base Mainnet
- **Agent Protocol**: Model Context Protocol (MCP) using Next.js 14 App Router format

## Phantom Library Orchestrator Agent & MCP Guide

This project integrates the **Phantom Library Orchestrator Agent**. This ERC-8004 compatible AI Agent navigates the library, performs knowledge escaping, and acts as an intelligent data orchestrator.

### Agent Registration (Agent Card)
The agent conforms to the EIP-8004 Registration standard and makes itself discoverable via exposing its skills at:
`/.well-known/agent-card.json`

Capabilities include:
* `phantom-exploration`
* `knowledge-escaping`
* `library-orchestration`

### MCP Connection Guide
The application provides a full **Model Context Protocol (MCP)** server via a JSON-RPC 2.0 interface. This connects your agent natively to tools and commands.

- **MCP Endpoint**: `/api/mcp`
- **Agent Info Endpoint**: `/api/agent`

Send standard JSON-RPC 2.0 payloads via POST to the `/api/mcp` endpoint.
Methods supported:
* `initialize`
* `tools/list`
* `tools/call`
* `prompts/list`
* `resources/list`

## Playing Locally

To build and test the interface locally:

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
