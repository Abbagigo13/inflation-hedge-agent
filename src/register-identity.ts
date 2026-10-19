import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();

const RPC_URL = process.env.CELO_RPC_URL;
const PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY;

if (!PRIVATE_KEY) {
    console.error("❌ ERROR: Missing AGENT_PRIVATE_KEY in .env file");
    process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// The official Celo Mainnet ERC-8004 Identity Registry Address
const IDENTITY_REGISTRY_ADDRESS = "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432";

// Minimal ABI for the register function and the Registered event
const IDENTITY_REGISTRY_ABI = [
    "function register(string agentURI) external returns (uint256 agentId)",
    "event Registered(uint256 indexed agentId, string agentURI, address indexed owner)"
];

async function registerAgent() {
    console.log("⏳ Preparing to register Agent Identity on Celo Mainnet...");

    // 1. Create the Agent Metadata (Registration File)
    // We are encoding this as a data URI so we don't need to host a website.
    const agentMetadata = {
        type: "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
        name: "Autonomous Inflation Hedge Agent",
        description: "An autonomous agent that monitors LatAm inflation and hedges wFIAT holdings into stablecoins via Textile FX to protect user wealth.",
        image: "https://example.com/logo.png", // You can replace this later
        services: [
            {
                name: "web",
                endpoint: "https://loops.house/agents-on-open-rails" // Point back to the hackathon
            }
        ],
        x402Support: true, // CRITICAL: We will use x402 for API payments!
        active: true,
        supportedTrust: ["reputation"]
    };

    // Convert JSON to a Base64 data URI
    const jsonString = JSON.stringify(agentMetadata);
    const base64Data = Buffer.from(jsonString).toString('base64');
    const agentURI = `data:application/json;base64,${base64Data}`;

    console.log(`📝 Agent URI generated (Base64 length: ${agentURI.length} chars)`);

    // 2. Connect to the Contract
    const registryContract = new ethers.Contract(
        IDENTITY_REGISTRY_ADDRESS,
        IDENTITY_REGISTRY_ABI,
        wallet
    );

    console.log("🚀 Sending registration transaction to Celo Mainnet...");
    
    try {
        // 3. Send the Transaction
        // Note: We are paying gas in CELO here. If you want to pay in USDC, you need to use the feeCurrency adapter.
        const tx = await registryContract.register(agentURI);
        
        console.log(`⏳ Transaction sent! Hash: ${tx.hash}`);
        console.log("Waiting for confirmation (this may take 5-10 seconds)...");

        // 4. Wait for the receipt
        const receipt = await tx.wait();
        console.log(`✅ Transaction confirmed in block ${receipt.blockNumber}`);

        // 5. Parse the logs to find the Agent ID
        const registeredEvent = receipt.logs.find(
            (log: any) => log.fragment && log.fragment.name === 'Registered'
        );

        if (registeredEvent) {
            const agentId = registeredEvent.args[0];
            console.log("\n=========================================");
            console.log(`🎉 SUCCESS! ERC-8004 IDENTITY REGISTERED!`);
            console.log(`Your Agent ID is: ${agentId.toString()}`);
            console.log("=========================================\n");
            console.log("👉 NEXT STEP: Go back to the Loops House website and click 'Check on Celo' to verify your identity!");
        } else {
            console.log("⚠️ Transaction succeeded, but could not find the Registered event in logs.");
        }

    } catch (error: any) {
        console.error("❌ Registration failed!");
        console.error("Error details:", error.message || error);
        
        if (error.message.includes("insufficient funds")) {
            console.log("\n💡 HINT: Your agent wallet has no CELO. You need to bridge a small amount of CELO to Celo Mainnet to pay for gas.");
        }
    }
}

registerAgent();