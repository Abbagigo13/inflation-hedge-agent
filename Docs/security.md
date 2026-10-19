# Security Considerations

## 1. Smart Contract Risk

* **Limit Orders:** The agent uses Textile's LimitOrderReactor, which ensures funds are only swapped if the exact requested amount is fulfilled.
* **Token Approvals:** The agent must grant allowance to the Textile contract. (We will implement a strict check to only approve the exact amount needed for the swap, not infinite approvals).

## 2. Key Management

* **Environment Variables:** Private keys are NEVER hardcoded. They are loaded via `.env` and `.gitignore` ensures they are never pushed to GitHub.
* **Least Privilege:** The agent wallet only holds enough wARS to execute the specific hedge and enough CELO for gas. It is not a main treasury wallet.

## 3. API Security

* **Auth:** Textile API keys are stored server-side.
* **Slippage:** Textile RFQ guarantees the `buyAmount`. If the market moves before execution, the tx reverts (saving funds).
