import { ethers } from 'ethers';
import axios from 'axios';
import * as dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

const RPC_URL = process.env.CELO_RPC_URL;
const PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY;
const ATTRIBUTION_TAG = process.env.ATTRIBUTION_TAG;
const TEXTILE_API_KEY = process.env.TEXTILE_API_KEY; 

// Default logger just in case
let log: (msg: string) => void = console.log;

if (!PRIVATE_KEY || !ATTRIBUTION_TAG || !TEXTILE_API_KEY) {
    console.error("❌ ERROR: Missing AGENT_PRIVATE_KEY, ATTRIBUTION_TAG, or TEXTILE_API_KEY in .env");
    process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const TEXTILE_API_BASE = "https://api.textilecredit.com/v2";
const WARS_ADDRESS = "0x0dc4f92879b7670e5f4e4e6e3c801d229129d90d";
const TEXTILE_USDT_ADDRESS = "0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e"; 

async function getInflationRate(currency: string): Promise<number> {
    log(`[📡 API] Fetching inflation rate for ${currency}...`);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    if (currency === 'ARS') return 15.0; 
    return 1.0;
}

async function executeSwap(amountIn: string, tokenIn: string, tokenOut: string) {
    log(`\n[⚙️ TEXTILE FX] Requesting quote to swap ${amountIn} tokens...`);
    
    const tagHex = ethers.hexlify(ethers.toUtf8Bytes(ATTRIBUTION_TAG as string));
    log(`[🏷️ ATTRIBUTION] Tag: ${ATTRIBUTION_TAG}`);

    try {
        const payload = {
            chainId: 42220, 
            taker: wallet.address,
            sellToken: tokenIn,
            buyToken: tokenOut,
            sellAmount: amountIn, 
        };

        log("⏳ Requesting firm quote from Textile market makers...");
        
        const response = await axios.post(`${TEXTILE_API_BASE}/rfq/request`, payload, {
            headers: {
                'Authorization': `Bearer ${TEXTILE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 75000 
        });

        const quote = response.data;
        log(`✅ Quote received! ID: ${quote.id}`);
        log(`📊 Expected Output: ${quote.buyAmount || quote.amountOut || 'N/A'} (atomic units)`);
        
        // We stop here for now because the wallet doesn't have wARS yet.
        // If it did, the wallet.sendTransaction code goes here.
        
    } catch (error: any) {
        log("❌ Textile FX Swap Failed!");
        if (error.response) {
            log(`API Error: ${JSON.stringify(error.response.data, null, 2)}`);
        } else {
            log(`Error: ${error.message}`);
        }
    }
}

async function evaluateAndAct() {
    log("\n=====================================");
    log("🤖 Agent Waking Up...");
    
    const userBalanceWARS = ethers.parseUnits("1", 18); 
    
    const inflationRate = await getInflationRate('ARS');
    log(`📈 Current ARS Inflation Rate: ${inflationRate}%`);

    let amountToSwap = 0n;
    if (inflationRate > 10) {
        log("🚨 [DECISION] High Inflation! Swapping 70% to USDT.");
        amountToSwap = (userBalanceWARS * 70n) / 100n;
    } else {
        log("✅ [DECISION] Inflation stable.");
        return; 
    }

    if (amountToSwap > 0n) {
        await executeSwap(amountToSwap.toString(), WARS_ADDRESS, TEXTILE_USDT_ADDRESS);
    }
    log("=====================================\n");
}

// Export this so server.ts can call it and pass the logger
export async function runAgentCycle(customLogger?: (msg: string) => void) {
    if (customLogger) log = customLogger;
    await evaluateAndAct();
}