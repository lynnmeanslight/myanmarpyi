# Myanmar Pyi (မြန်မာပြည်)

> A decentralized community platform for Myanmar, powered by blockchain technology on Base

## 🌏 Overview

Myanmar Pyi is a culturally-sensitive, bilingual (English/Myanmar) web application that enables users to:

- 📍 **Share regional messages** - Post messages tied to Myanmar's 15 states and regions
- 💬 **Express emotions** - React with 6 different emojis (👍❤️😂😢🔥🙏)
- 🗺️ **Interactive map** - Pan and zoom through Myanmar's regions with mouse controls
- 💰 **Gasless transactions** - Post messages without paying gas fees (Coinbase Paymaster)
- 🔐 **Decentralized** - All data stored on-chain via smart contracts on Base Sepolia
- 🌐 **Bilingual** - Full support for English and Myanmar languages

## 🚀 Features

### Smart Contract Integration
- Message posting with character limits (1-200 chars) and cooldown (60 seconds)
- Emoji reaction system with duplicate prevention
- Region-based message storage (15 regions)
- Real-time event listening for instant UI updates

### User Experience
- **Calm & welcoming** UI optimized for non-technical Myanmar users
- **Real-time updates** via blockchain event watchers
- **Optimistic UI** for immediate feedback on user actions
- **Statistics dashboard** showing total users, messages, and reactions
- **Pan & zoom map** with mouse drag and scroll wheel

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, React 19, TypeScript, Tailwind CSS
- **Blockchain**: Wagmi v2, Viem, Base Sepolia testnet
- **Smart Contracts**: Solidity (MyanmarPyi.sol)
- **Wallet**: Base Account integration with Coinbase paymaster
- **Deployment**: Vercel-ready

## 📦 Getting Started

### Prerequisites

```bash
Node.js 18+ and npm/yarn/pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/myanmar-pyi.git
cd myanmar-pyi

# Install dependencies
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_REGION_NOTES_ADDRESS=your_contract_address
NEXT_PUBLIC_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base-sepolia
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Smart Contract

The MyanmarPyi smart contract includes:

- `post(uint8 region, string memory text)` - Post a message to a region
- `reactEmoji(uint8 region, uint256 messageIndex, Emoji emoji)` - React to a message
- `getMessages(uint8 region, uint256 start, uint256 count)` - Fetch messages
- Event emitters for `MessagePosted` and `EmojiReacted`

Contract located at: `contracts/src/MyanmarPyi.sol`

## 🌍 Regions Supported

All 15 Myanmar states and regions:
- Kachin, Kayah, Kayin, Chin, Sagaing, Tanintharyi, Bago, Magway, Mandalay, Mon, Rakhine, Yangon, Shan, Ayeyarwady, Naypyidaw

## 🎨 Design Philosophy

- **Cultural sensitivity** - Burmese language support and regional awareness
- **Accessibility** - Simple, calm interface for non-technical users
- **Trust** - Transparent on-chain data and decentralized ownership
- **Community** - Connecting Myanmar's diverse regions through shared stories

## 📄 License

MIT License - feel free to use this project for learning and building!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Built with ❤️ for Myanmar 🇲🇲 | Powered by [Base](https://base.org)
