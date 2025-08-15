# CoreApp

CoreApp transforms blockchain actions into shareable links for receiving tips, selling items, and accepting payments on the Core blockchain.

## 🚀 What It Does

CoreApp allows creators and businesses to:
- **Receive Tips**: Generate shareable links for receiving cryptocurrency tips from your audience
- **Sell Items**: Create payment links for selling digital or physical items with secure transactions
- **Share Anywhere**: Share your blockchain action links on any platform - social media, websites, or messaging apps

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Blockchain**: Core Testnet (EVM-compatible Bitcoin L2)
- **Wallet Integration**: RainbowKit + Wagmi for seamless wallet connections
- **Database**: Supabase for action storage and metadata
- **Styling**: Tailwind CSS with custom dark theme and animations
- **State Management**: React hooks with TanStack Query for data fetching

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

#### 2. **Database Schema (Supabase)**
```sql
-- Actions table structure
CREATE TABLE actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  short_id VARCHAR(20) UNIQUE NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  recipient_address VARCHAR(42), -- For tips
  tip_amount_eth DECIMAL(18,6), -- For tips
  contract_address VARCHAR(42), -- For NFT sales
  token_id VARCHAR(255), -- For NFT sales
  price DECIMAL(18,6), -- For NFT sales
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 Technical Implementation

### 1. **Core Integration**

#### Chain Configuration (`lib/wagmi.ts`)
```typescript
export const coreTestnet: Chain = {
  id: 1114, // Core Testnet Chain ID
  name: 'Core Testnet',
  nativeCurrency: {
    name: 'Bitcoin',
    symbol: 'BTC', // Native symbol is BTC
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
- **Bitcoin Native**: Uses BTC as native currency

### 2. **Action Types**

#### Tip Actions
- **Purpose**: Receive cryptocurrency tips
- **Parameters**: `recipient_address`, `tip_amount_eth`, `description`
- **Transaction**: Direct ETH transfer to recipient

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
├── page.tsx                 # Landing page with animations
├── create-link/
│   └── page.tsx            # Link creation form
├── a/[data]/
│   └── page.tsx            # Action execution page
├── api/
│   ├── create-action/
│   │   └── route.ts        # Action creation API
│   └── execute/[id]/
│       └── route.ts        # Action execution API
└── components/
    └── Header.tsx          # Navigation component
```

#### Key Features:
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Consistent dark UI with cyan accents
- **Animations**: Smooth transitions and hover effects
- **QR Code Generation**: Instant QR codes for sharing
- **Real-time Status**: Transaction status updates

### 5. **Wallet Integration**

#### RainbowKit Configuration
```typescript
// Custom dark theme
darkTheme({
  accentColor: '#38bdf8', // Cyan accent
  borderRadius: 'medium',
})
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
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd elinks

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

### Database Setup
1. Create Supabase project
2. Run the database schema:
```sql
-- Create actions table
CREATE TABLE actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  short_id VARCHAR(20) UNIQUE NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  recipient_address VARCHAR(42),
  tip_amount_eth DECIMAL(18,6),
  contract_address VARCHAR(42),
  token_id VARCHAR(255),
  price DECIMAL(18,6),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_actions_short_id ON actions(short_id);
CREATE INDEX idx_actions_type ON actions(action_type);
CREATE INDEX idx_actions_created_at ON actions(created_at);
```

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```bash
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_production_project_id
```

## 🔒 Security Features

- **Cryptographic Short IDs**: Random 12-character IDs for URL shortening
- **Input Validation**: Server-side validation for all user inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **Secure Database**: Supabase with Row Level Security (RLS)
- **HTTPS Only**: All production traffic over HTTPS

## 📱 Mobile Support

- **Responsive Design**: Works seamlessly on all device sizes
- **Touch Optimized**: Large touch targets and smooth interactions
- **PWA Ready**: Can be installed as a Progressive Web App
- **QR Code Sharing**: Easy mobile sharing via QR codes

## 🔄 Future Enhancements

- **Multi-chain Support**: Support for other EVM chains
- **Advanced NFT Features**: Batch sales, auctions, royalties
- **Analytics Dashboard**: Track link performance and earnings
- **Custom Domains**: White-label solutions for businesses
- **Webhook Integration**: Real-time notifications for transactions
- **Gas Optimization**: Smart gas estimation and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the code comments for detailed implementation
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join community discussions for help and ideas

---

**Built with ❤️ for the Core ecosystem**
