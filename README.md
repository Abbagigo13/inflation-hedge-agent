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


### 🗺️ Project Roadmap: Autonomous Inflation Hedge Agent

This roadmap outlines our journey from initial concept to a fully functioning Web3 autonomous agent, detailing what we've achieved during the hackathon and our vision for the future of LatAm wealth preservation.

✅ Achieved (Hackathon Milestones)

We have successfully built the core infrastructure and a stunning user interface that proves the concept end-to-end.

☑ Agent Wallet & Identity: Generated a dedicated agent wallet and successfully registered its ERC-8004 Identity on Celo Mainnet (Agent ID: 9892).
☑ Textile FX Integration: Integrated the Textile FX API v2 (RFQ endpoints). The agent can successfully authenticate, construct payloads with the hackathon attribution tag, and request live quotes for the wARS -> USDT corridor.
☑ Real-Time Backend Streaming: Built an Express.js backend using Server-Sent Events (SSE) to stream the agent's internal thoughts, API calls, and execution logs directly to the frontend in real-time.
☑ Premium React Dashboard: Deployed a production-grade React frontend (built on Vite, Tailwind, and Shadcn UI) featuring a dark-mode Capitalio-inspired layout, skeleton loaders, and dynamic charts.
☑ Live On-Chain Balances: Connected the frontend directly to Celo Mainnet using ethers.js to read and display the real-time wARS and USDT balances of the agent's wallet.
☑ Interactive "Run Agent" Trigger: Wired the frontend UI to trigger the backend agent execution loop with a single click, watching the terminal logs update live.

🛠️ Currently In Progress (v1.0 MVP)

We are actively refining the agent's logic and preparing for the final live demonstration.

☐ Real Inflation Data (x402): Replacing the mocked 15.0% inflation rate with a live external API feed, using Celo's x402 protocol to autonomously pay for the data request in stablecoins.
☐ Live Transaction Broadcast: Upgrading the executeSwap function to sign and broadcast the actual wallet.sendTransaction to the Textile FX LimitOrderReactor contract.
☐ Funding the Agent Wallet: Sending a small amount of real wARS and CELO (for gas) to the agent wallet so it can execute a successful end-to-end swap on Celo Mainnet.

### 🚀 Next Steps (Hackathon Submission)

Features to be completed before the final demo video.

☐ CeloScan Integration: Linking the successful transaction hash in the UI so judges can verify the real on-chain swap on Celoscan.
☐ Dynamic Threshold Settings: Adding a UI slider that allows the user to adjust the agent's guardrails (e.g., "Trigger Hedge if Inflation > 10%").
☐ Empty State Handling: Adding a beautiful "Fund Agent Wallet" prompt with a QR code if the on-chain balance is $0.00.

### Future Vision (Post-Hackathon)

How we scale this from a hackathon winner into a life-changing product for millions in Latin America.

☐ Smart Contract User Vaults: Allowing everyday users to deposit their own wARS into a secure, non-custodial smart contract that the agent is authorized to manage.
☐ MiniPay Integration: Deploying the frontend as a Mini App inside MiniPay (Opera) so gig workers can access the agent directly from their mobile phones without seed phrases.
☐ Multi-Currency Corridors: Expanding the agent's logic to support wBRL (Brazil), wMXN (Mexico), and wCOP (Colombia) using Ripo's expanded wFIAT offerings.
☐ Auto-Compounding Yield: Upgrading the agent to automatically route hedged USDT into low-risk DeFi yield protocols on Celo (like Uniswap or Aave) to earn passive APY while protecting wealth.
