import { ethers } from 'ethers';

async function generateWallet() {
    console.log("⏳ Generating a brand new Agent Wallet...\n");
    
    const wallet = ethers.Wallet.createRandom();
    
    console.log("=== 🟢 AGENT WALLET GENERATED ===");
    console.log("📍 Public Address (Paste this into Loops House):");
    console.log(`   ${wallet.address}`);
    console.log("\n🔑 Private Key (Keep this secret in your .env file):");
    console.log(`   ${wallet.privateKey}`);
    console.log("=================================\n");
    
    console.log("👉 NEXT STEPS:");
    console.log("1. Copy the Public Address and paste it into the 'Add your agent wallet' box on Loops House.");
    console.log("2. Copy the Private Key and paste it into your .env file next to AGENT_PRIVATE_KEY.");
    console.log("3. Fund this wallet with a small amount of CELO on Celo Mainnet for gas fees.");
}

generateWallet();