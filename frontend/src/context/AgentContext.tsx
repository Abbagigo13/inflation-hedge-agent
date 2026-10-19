import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AgentState = {
  isLoading: boolean;
  isExecuting: boolean;
  balanceUsdt: string;
  balanceWars: string;
  inflationRate: number;
  logs: string[];
  runAgent: () => Promise<void>;
};

const AgentContext = createContext<AgentState | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [balanceUsdt, setBalanceUsdt] = useState("0.00");
  const [balanceWars, setBalanceWars] = useState("0.00");
  const [inflationRate, setInflationRate] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // 1. Initial Load: Simulate fetching on-chain data
  useEffect(() => {
    async function fetchInitialData() {
      // In the future, this will be a real fetch to ethers.js or your backend
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay for skeleton
      setBalanceUsdt("12450.00");
      setBalanceWars("3600.00");
      setInflationRate(15.2);
      setIsLoading(false);
    }
    fetchInitialData();
  }, []);

  // 2. The function to trigger the agent
  const runAgent = async () => {
    setIsExecuting(true);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] 🚀 User triggered manual agent cycle.`]);
    
    try {
      // Call our Node.js backend!
      const res = await fetch('http://localhost:3000/api/run-agent', { method: 'POST' });
      
      // Stream the logs (we'll implement real streaming later, for now just mock it)
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ⏳ Requesting quote from Textile FX...`]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const data = await res.json();
      
      if (data.success) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✅ Swap executed successfully.`]);
      } else {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ❌ Error: ${data.error}`]);
      }
    } catch {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ❌ Backend offline.`]);
    }
    
    setIsExecuting(false);
  };

  return (
    <AgentContext.Provider value={{ 
      isLoading, isExecuting, balanceUsdt, balanceWars, inflationRate, logs, runAgent 
    }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) throw new Error("useAgent must be used within AgentProvider");
  return context;
}