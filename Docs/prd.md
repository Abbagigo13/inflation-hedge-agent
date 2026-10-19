# Product Requirements Document (PRD): Inflation Hedge Agent

## 1. Executive Summary

The **Inflation Hedge Agent** is an autonomous AI agent deployed on Celo Mainnet. It acts as a 24/7 financial guardian for users in Latin America, protecting their wealth from local currency devaluation by automatically monitoring inflation data and executing FX swaps via Textile FX.

## 2. The Problem

* **The Silent Wealth Killer:** In countries like Argentina, Brazil, and Venezuela, hyperinflation destroys purchasing power. A user holding 1,000,000 ARS today will have significantly less buying power in 30 days.
* **Manual Panic:** Users must constantly check exchange rates and manually convert to USD or stablecoins, which is stressful and time-consuming.
* **High Fees & Slow Rails:** Traditional FX and remittance services charge exorbitant fees (5-10%) and take days to settle.

## 3. The Solution

An autonomous agent that:

1. **Monitors:** Uses x402 protocol to autonomously pay for real-time inflation data APIs.
2. **Decides:** Applies predefined guardrails (e.g., "If ARS inflation > 10%, swap 70% to USDT").
3. **Executes:** Requests a firm quote from Textile FX and settles the trade on Celo Mainnet using wARS (Ripo wFIAT).
4. **Reports:** Provides transparent on-chain receipts of wealth preservation.

## 4. Target Audience

* **Primary:** LatAm Freelancers and Gig Workers (Uber/Rappi drivers) who earn local currency but need to preserve purchasing power.
* **Secondary:** Small merchants holding daily fiat sales.
* **Tertiary:** Crypto-natives holding wFIAT tokens looking for automated DeFi yield/hedging.

## 5. Key Features (MVP)

* Autonomous decision-making loop (Cron-based execution).
* Textile FX RFQ integration for wARS -> USDT swaps.
* ERC-8004 On-chain Agent Identity.
* Attribution Tagging for hackathon tracking.
* Hardcoded fallback RPCs and DNS resolution.
