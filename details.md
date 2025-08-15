# CoreLink

## Project Overview

CoreLink is a revolutionary blockchain application that transforms complex blockchain actions into simple, shareable links. Built on the Core testnet (EVM-compatible Bitcoin L2), it enables creators, businesses, and individuals to monetize their content and services through seamless cryptocurrency transactions.

## What It Does

CoreLink serves as a bridge between traditional web sharing and blockchain transactions, making cryptocurrency payments accessible to everyone. It converts blockchain actions into short, readable URLs that can be shared anywhere - social media, websites, messaging apps, or any digital platform.

### Core Functionality

1. **Link Generation**: Creates short, memorable URLs for blockchain actions
2. **Payment Processing**: Handles cryptocurrency transactions on Core testnet
3. **Action Execution**: Processes tips, NFT sales, and other blockchain interactions
4. **Wallet Integration**: Seamless connection with all EVM-compatible wallets
5. **Real-time Status**: Live transaction tracking and confirmation updates

## Use Cases

### 1. **Content Creator Monetization**
- **Streamers & YouTubers**: Generate tip links for live streams and videos
- **Bloggers & Writers**: Accept cryptocurrency tips for articles and content
- **Artists & Musicians**: Sell digital art and music directly to fans
- **Podcasters**: Receive support from listeners through easy tip links

### 2. **Business Applications**
- **E-commerce**: Create payment links for products and services
- **Freelancers**: Accept payments for completed work
- **Consultants**: Generate invoice links for professional services
- **Event Organizers**: Sell tickets and accept registrations

### 3. **Community & Social**
- **Charity & Donations**: Accept cryptocurrency donations
- **Community Support**: Fund community projects and initiatives
- **Gift Giving**: Send cryptocurrency gifts through shareable links
- **Crowdfunding**: Raise funds for projects and causes

### 4. **NFT & Digital Assets**
- **NFT Sales**: Sell NFTs with instant payment processing
- **Digital Downloads**: Sell software, e-books, and digital content
- **Gaming**: In-game item sales and marketplace transactions
- **Virtual Real Estate**: Land and property sales in virtual worlds

## Core Components

### 1. **Frontend Architecture**

#### **Landing Page** (`app/page.tsx`)
- **Hero Section**: Eye-catching title with pixel font styling and animated background
- **Feature Showcase**: Interactive cards highlighting key capabilities
- **How It Works**: Step-by-step process explanation
- **Call-to-Action**: Direct link to link creation

#### **Link Creation Interface** (`app/create-link/page.tsx`)
- **Action Type Selection**: Choose between tip and NFT sale actions
- **Dynamic Forms**: Context-aware input fields based on action type
- **Validation**: Real-time input validation and error handling
- **Link Generation**: Instant creation of shareable blockchain action links

#### **Action Execution Page** (`app/a/[data]/page.tsx`)
- **Wallet Connection**: Seamless integration with RainbowKit
- **Action Display**: Clear presentation of transaction details
- **Transaction Processing**: Real-time status updates and confirmation
- **Explorer Integration**: Direct links to Core testnet block explorer

### 2. **Backend Infrastructure**

#### **API Endpoints**
- **Create Action** (`/api/create-action`): Generates new blockchain action records
- **Execute Action** (`/api/execute/[id]`): Processes action execution and metadata

#### **Database Schema** (Supabase)
```sql
actions (
  id: UUID (Primary Key)
  short_id: VARCHAR(20) (Unique identifier)
  action_type: VARCHAR(50) (tip/nft_sale)
  recipient_address: VARCHAR(42) (Wallet address)
  tip_amount_eth: DECIMAL(18,6) (Tip amount)
  contract_address: VARCHAR(42) (NFT contract)
  token_id: VARCHAR(255) (NFT identifier)
  price: DECIMAL(18,6) (Sale price)
  description: TEXT (Action description)
  created_at: TIMESTAMP (Creation time)
)
```

### 3. **Blockchain Integration**

#### **Core Testnet Configuration**
- **Chain ID**: 1114
- **RPC URL**: https://rpc.test2.btcs.network
- **Explorer**: https://scan.test2.btcs.network
- **Native Currency**: CORE (Bitcoin-based)

#### **Smart Contract Support**
- **ERC-20**: Native CORE token transactions
- **ERC-721**: NFT sales and transfers
- **Custom Contracts**: Extensible for additional functionality

#### **Wallet Integration**
- **RainbowKit**: Professional wallet connection interface
- **Multi-wallet Support**: MetaMask, WalletConnect, Coinbase Wallet
- **Transaction Signing**: Secure transaction confirmation
- **Balance Display**: Real-time wallet balance updates

### 4. **User Experience Features**

#### **Design System**
- **Dark Theme**: Modern, professional appearance
- **Orange/Amber Accents**: Consistent color scheme throughout
- **Glassmorphism**: Contemporary UI with backdrop blur effects
- **Responsive Design**: Mobile-first approach with desktop optimization

#### **Animation & Interactions**
- **Hover Effects**: Interactive elements with smooth transitions
- **Loading States**: Clear feedback during transaction processing
- **Success/Error Handling**: Comprehensive user feedback system
- **QR Code Generation**: Easy mobile sharing and scanning

#### **Accessibility**
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Optimized for various visual needs
- **Mobile Optimization**: Touch-friendly interface design

### 5. **Security & Performance**

#### **Security Features**
- **Input Validation**: Server-side validation for all user inputs
- **Rate Limiting**: API protection against abuse
- **Secure Database**: Supabase with Row Level Security (RLS)
- **HTTPS Enforcement**: All production traffic encrypted

#### **Performance Optimizations**
- **Next.js 14**: Latest React framework with App Router
- **Image Optimization**: Efficient image loading and processing
- **Code Splitting**: Automatic bundle optimization
- **Caching**: Strategic caching for improved response times

### 6. **Deployment & Infrastructure**

#### **Hosting Platform**
- **Vercel**: Optimized for Next.js applications
- **Automatic Deployments**: CI/CD pipeline integration
- **Global CDN**: Fast loading worldwide
- **Environment Management**: Secure configuration handling

#### **Database Hosting**
- **Supabase**: PostgreSQL-based backend as a service
- **Real-time Features**: Live data synchronization
- **Backup & Recovery**: Automated data protection
- **Scalability**: Handles growth and traffic spikes

## Technical Stack

### **Frontend**
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + TanStack Query
- **UI Components**: Custom components with Lucide React icons

### **Backend**
- **Runtime**: Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Next.js API Routes

### **Blockchain**
- **Network**: Core Testnet
- **EVM Compatibility**: Full Ethereum compatibility
- **Wallet Integration**: RainbowKit + Wagmi
- **Transaction Handling**: Viem for blockchain interactions

### **Development Tools**
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **Version Control**: Git with conventional commits

## Future Enhancements

### **Planned Features**
- **Multi-chain Support**: Integration with additional blockchain networks
- **Advanced Analytics**: Transaction tracking and performance metrics
- **Custom Domains**: White-label solutions for businesses
- **Webhook Integration**: Real-time notifications for transactions
- **Gas Optimization**: Smart gas estimation and optimization

### **Scalability Improvements**
- **Microservices Architecture**: Modular backend services
- **Load Balancing**: Distributed system architecture
- **Caching Layer**: Redis integration for performance
- **Monitoring**: Comprehensive logging and alerting

## Getting Started

### **Prerequisites**
- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- WalletConnect project ID

### **Installation**
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

### **Environment Variables**
```bash
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

## Conclusion

CoreLink represents a significant step forward in making blockchain technology accessible to mainstream users. By abstracting complex blockchain operations into simple, shareable links, it opens up new possibilities for monetization, payments, and digital asset management.

The project demonstrates modern web development best practices while leveraging the power of blockchain technology. Its modular architecture, comprehensive security features, and user-friendly interface make it an excellent foundation for building blockchain-powered applications.

Whether you're a content creator looking to monetize your work, a business seeking to accept cryptocurrency payments, or a developer interested in blockchain integration, CoreLink provides the tools and infrastructure needed to succeed in the decentralized economy.
