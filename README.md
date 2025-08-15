# CoreLink

CoreLink transforms blockchain actions into shareable links for receiving tips, selling items, and accepting payments on the Core blockchain (supporting both mainnet and testnet).

## 🚀 What It Does

CoreLink allows creators and businesses to:
- **Receive Tips**: Generate shareable links for receiving cryptocurrency tips from your audience
- **Sell Items**: Create payment links for selling digital or physical items with secure transactions
- **Share Anywhere**: Share your blockchain action links on any platform - social media, websites, or messaging apps

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Blockchain**: Core Mainnet + Core Testnet (EVM-compatible Bitcoin L2)
- **Wallet Integration**: RainbowKit + Wagmi for seamless wallet connections
- **State Management**: React hooks with TanStack Query for data fetching
- **Database**: Supabase for action storage and metadata

### Core Components

#### 1. **URL Shortening System**
```
https://yourapp.com/a/{action-type}-{short-id}
```

**Examples:**
- `https://yourapp.com/a/tip-jdahagecew` - Send a tip
- `https://yourapp.com/a/nft_sale-abc123` - Buy an NFT

**Features:**
- **Readable**: Action type is visible in the URL
- **Secure**: Short IDs are cryptographically random (12 characters)
- **No Data Loss**: Full blockchain data stored in database
- **Customizable**: Easy to add new action types


## 🔧 Technical Implementation

### 1. **Core Blockchain Integration**

#### Chain Configuration (`lib/wagmi.ts`)
```typescript
// Core Mainnet
export const coreMainnet: Chain = {
  id: 1116, // Core Mainnet Chain ID
  name: 'Core',
  nativeCurrency: {
    name: 'Bitcoin',
    symbol: 'CORE',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.coredao.org/'] },
  },
  blockExplorers: {
    default: { 
      name: 'Core Explorer', 
      url: 'https://scan.coredao.org' 
    },
  },
  testnet: false,
};

// Core Testnet
export const coreTestnet: Chain = {
  id: 1114, // Core Testnet Chain ID
  name: 'Core Testnet',
  nativeCurrency: {
    name: 'Bitcoin',
    symbol: 'CORE',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.test2.btcs.network'] },
  },
  blockExplorers: {
    default: { 
      name: 'Core Testnet Explorer', 
      url: 'https://scan.test2.btcs.network' 
    },
  },
  testnet: true,
};
```

#### Key Features:
- **EVM Compatibility**: Full Ethereum compatibility on Bitcoin L2
- **Fast Transactions**: Sub-second finality
- **Low Fees**: Cost-effective transactions
- **Bitcoin Native**: Uses CORE as native currency
- **Dual Network**: Support for both mainnet and testnet

### 2. **Action Types**

#### Tip Actions
- **Purpose**: Receive cryptocurrency tips
- **Parameters**: `recipient_address`, `tip_amount_eth`, `description`
- **Transaction**: Direct CORE transfer to recipient

#### NFT Sale Actions
- **Purpose**: Sell NFTs with instant payment
- **Parameters**: `contract_address`, `token_id`, `price`, `description`
- **Transaction**: Contract interaction with payment

### 3. **API Endpoints**

#### Create Action (`/api/create-action`)
```typescript
POST /api/create-action
{
  "action_type": "tip" | "nft_sale",
  "recipient_address": "0x...", // For tips
  "tip_amount_eth": "0.01", // For tips
  "contract_address": "0x...", // For NFT sales
  "token_id": "42", // For NFT sales
  "price": "1.5", // For NFT sales
  "description": "Optional description"
}
```

#### Execute Action (`/api/execute/[id]`)
- **GET**: Retrieve action metadata for frontend
- **POST**: Generate transaction object for wallet
- **PUT**: Legacy metadata endpoint for compatibility

### 4. **Frontend Architecture**

#### Page Structure
```
app/
├── page.tsx                 # Landing page with pixel font styling and animations
├── create-link/
│   └── page.tsx            # Link creation form with dynamic validation
├── a/[data]/
│   └── page.tsx            # Action execution page with wallet integration
├── api/
│   ├── create-action/
│   │   └── route.ts        # Action creation API
│   └── execute/[id]/
│       └── route.ts        # Action execution API
└── components/
    └── Header.tsx          # Navigation component with Core branding
```

#### Key Features:
- **Modern UI**: Dark theme with orange/amber accents and glassmorphism effects
- **Pixel Font Styling**: Eye-catching retro aesthetic for the CoreLink brand
- **QR Code Generation**: Instant QR codes for sharing
- **Real-time Status**: Transaction status updates with live confirmation
- **Responsive Design**: Mobile-first approach with touch optimization
- **Icon Integration**: Lucide React icons instead of static images for better performance

### 5. **Wallet Integration**

#### RainbowKit Configuration
```typescript
// Multi-chain support with Core networks
chains: [coreMainnet, coreTestnet], // Mainnet first, then testnet
```

#### Supported Wallets:
- MetaMask
- WalletConnect
- Coinbase Wallet
- And all other EVM-compatible wallets

### 6. **Transaction Flow**

1. **Link Creation**: User fills form → API creates action → Returns short URL
2. **Link Sharing**: Short URL shared across platforms
3. **Link Execution**: User visits URL → Connects wallet → Confirms transaction
4. **Transaction**: Smart contract interaction or direct transfer
5. **Confirmation**: Real-time status updates and explorer links

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- WalletConnect project ID

### Environment Variables
```bash
# Core Mainnet Configuration
CORE_MAINNET_RPC_URL=https://rpc.coredao.org/
CORE_MAINNET_CHAIN_ID=1116
CORE_MAINNET_EXPLORER_URL=https://scan.coredao.org

# Core Testnet Configuration
CORE_TESTNET_RPC_URL=https://rpc.test2.btcs.network
CORE_TESTNET_CHAIN_ID=1114
CORE_TESTNET_EXPLORER_URL=https://scan.test2.btcs.network

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# WalletConnect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd core4

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```


## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```bash
# Core Mainnet Configuration
CORE_MAINNET_RPC_URL=https://rpc.coredao.org/
CORE_MAINNET_CHAIN_ID=1116
CORE_MAINNET_EXPLORER_URL=https://scan.coredao.org

# Supabase Configuration
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url

# WalletConnect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_production_project_id
```

## 🔒 Security Features

- **Cryptographic Short IDs**: Random 12-character IDs for URL shortening
- **Input Validation**: Server-side validation for all user inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **HTTPS Only**: All production traffic over HTTPS

## 📱 Mobile Support

- **Responsive Design**: Works seamlessly on all device sizes
- **Touch Optimized**: Large touch targets and smooth interactions
- **PWA Ready**: Can be installed as a Progressive Web App
- **QR Code Sharing**: Easy mobile sharing via QR codes

## 🔄 Future Enhancements

- **Advanced NFT Features**: Batch sales, auctions, royalties
- **Analytics Dashboard**: Track link performance and earnings
- **Custom Domains**: White-label solutions for businesses
- **Webhook Integration**: Real-time notifications for transactions
- **Gas Optimization**: Smart gas estimation and optimization
- **Multi-chain Expansion**: Support for additional EVM-compatible networks



**Built with ❤️ for the Core ecosystem**