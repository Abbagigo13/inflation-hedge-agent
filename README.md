# 🛡️ Autonomous Inflation Hedge Agent

**Submission for the "Agents on Open Rails" Hackathon on Celo.**

## 🎯 The Problem: "The Silent Wealth Killer"

In Latin America, local currencies (like the Argentine Peso) lose value daily due to hyperinflation. Everyday people—freelancers, gig workers, and small merchants—watch their hard-earned savings evaporate. Manually converting to stablecoins is stressful, time-consuming, and requires financial literacy that many don't have.

## 💡 The Solution: A 24/7 Autonomous Treasury

We built an AI agent that acts as a self-driving financial guardian. It monitors inflation rates and automatically hedges the user's local wFIAT (wARS) into USDT (via Textile FX) on Celo Mainnet when inflation crosses a danger threshold.

The user sets it and forgets it. The agent protects their wealth while they sleep.

## 🧠 How It Works

1. **Autonomy:** A Node.js cron job wakes the agent.
2. **Intelligence:** Evaluates inflation data (simulated for MVP, designed for x402 API payments).
3. **Execution:** Queries the **Textile FX RFQ API v2** for a firm quote to swap wARS to USDT on Celo.
4. **Trust:** Signs the transaction, injects the hackathon attribution tag, and broadcasts it to Celo Mainnet.
5. **Identity:** Registered on-chain via **ERC-8004** (Agent ID: 9892).

## 🛠️ Tech Stack & Integrations

* **Blockchain:** Celo Mainnet
* **FX & Settlement:** Textile FX (RFQ API v2 & LimitOrderReactor)
* **Tokens:** Ripo wARS, Celo USDT
* **Identity:** ERC-8004 Identity Registry
* **Infrastructure:** Node.js, TypeScript, Ethers.js v6

## 🚀 How to Run Locally

1. Clone the repo and run `npm install`.
2. Create a `.env` file with your `CELO_RPC_URL`, `AGENT_PRIVATE_KEY`, `ATTRIBUTION_TAG`, and `TEXTILE_API_KEY`.
3. Run `npm run generate-wallet` to create a new agent wallet.
4. Fund the wallet with a small amount of CELO (for gas) and wARS (to test the hedge).
5. Run `npm start` to wake the agent!

## 🏆 Hackathon Tracks Targeted

* **Stable Agents: LatAm | Ripo x Celo Core Co:** For using Ripo's wARS and solving a LatAm financial problem.
* **Stable Agents: Open Corridors | Textile FX:** For integrating Textile's RFQ API for on-chain FX settlement.
