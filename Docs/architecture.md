# Architecture: Autonomous Inflation Hedge Agent

## 1. High-Level Flow

1. **Trigger:** Node.js `setInterval` cron job wakes the agent.
2. **Data Fetch:** Agent queries inflation API (mocked for MVP, to be x402-enabled).
3. **Logic Engine:** Evaluates inflation rate against predefined thresholds.
4. **Quoting:** Calls Textile FX API (`/v2/rfq/request`) with `chainId: 42220`, `sellToken: wARS`, `buyToken: USDT`.
5. **Execution:** Signs the returned transaction payload (injecting the hackathon attribution tag) and broadcasts it to Celo Mainnet.
6. **Confirmation:** Waits for receipt, parses block number, and submits txHash back to Textile API.

## 2. Tech Stack

* **Runtime:** Node.js v20+
* **Language:** TypeScript
* **Blockchain Interaction:** `ethers.js` v6
* **HTTP Client:** `axios`
* **Environment Management:** `dotenv`

## 3. On-Chain Components

* **Agent Wallet:** `0x558e3A2B9355B7341FB4d93fF30eAC52f5679Af5` (Registered via ERC-8004).
* **Target Contract:** Textile FX LimitOrderReactor (`0xa9AA0a64769cBed4d3B1Ceb4Df01CdE915C235b3`).
* **Tokens:** wARS (`0x0dc4f...`) <-> USDT (`0x48065f...`).
