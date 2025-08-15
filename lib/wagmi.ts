import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Chain } from 'viem/chains';

// Define the Core Testnet as a custom chain
export const coreTestnet: Chain = {
  id: 1114, // Core Testnet Chain ID
  name: 'Core Testnet',
  nativeCurrency: {
    name: 'Bitcoin',
    symbol: 'CORE', // Core uses Bitcoin as native currency
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.test2.btcs.network'] },
  },
  blockExplorers: {
    default: { name: 'Core Testnet Explorer', url: 'https://scan.test2.btcs.network' },
  },
  testnet: true,
};

// Create the wagmi config
export const config = getDefaultConfig({
  appName: 'CoreApp',
  projectId: 'Ycb559b32348089833acd49f8c3c2784b', // Get one from https://cloud.walletconnect.com/
  chains: [coreTestnet],
  ssr: true, // Enable SSR for Next.js
});