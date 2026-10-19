# Testing Strategy

## 1. Unit Tests (Local)

* **Mocking:** Mock the `axios` calls to Textile API to ensure the payload is formatted correctly (ChainId, Token addresses).
* **Logic Testing:** Verify the `evaluateAndAct` function correctly calculates the 70% swap amount based on the mock inflation rate.

## 2. Integration Tests (Testnet)

* **Textile Testnet:** Use the Textile test key to request quotes on Base Sepolia or BNB Testnet to ensure the full RFQ flow works without risking real funds.

## 3. End-to-End Tests (Mainnet)

* **Real Swap:** Fund the agent wallet with 10 wARS and execute a real quote and swap on Celo Mainnet.
* **Verification:** Check Celoscan to ensure the transaction succeeded and includes the attribution tag.
