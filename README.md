<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/redduck-logo-dark.svg">
    <img src=".github/assets/redduck-logo.svg" alt="RedDuck" width="240">
  </picture>
</p>

<h1 align="center"><a href="https://tarotsol.ai/">Tarotsol AI</a></h1>

<p align="center">
  <b>AI-powered tarot readings on Solana — ask the Oracle a question, pay in SOL, USDC or USDT, and receive a personalized three-card reading.</b>
</p>

---

## Built with
| Area | Technology |
| --- | --- |
| Framework | React 18 + TypeScript, Vite 6 |
| Routing | React Router 7 |
| Wallets & auth | Privy, Solana Wallet Adapter |
| Blockchain | `@solana/web3.js`, `@solana/spl-token` |
| Data fetching | TanStack Query |
| State | Zustand |
| Forms & validation | React Hook Form + Zod |
| Styling | Tailwind CSS, Radix UI primitives, `class-variance-authority` |
| Deployment | Cloudflare Workers (Wrangler) |

## How it works

1. **Connect** a wallet via [Privy](https://privy.io/) (embedded wallets, email login) or top up with a card.
2. **Ask** the cards any question — or let the Oracle suggest one.
3. **Pay** a small fee in SOL, USDC or USDT on Solana.
4. **Receive** three tarot cards, drawn deterministically from your transaction hash, and an AI-generated interpretation.
5. Optionally **tip** the Oracle if the forecast resonated.

A free demo reading is available without a wallet.

## Getting started

### Prerequisites

- Node.js 20+
- Yarn 4 (`corepack enable`)

### Install & run

```bash
yarn install
yarn dev
```

The app starts on [http://localhost:5173](http://localhost:5173).

### Environment variables

Create a `.env` file in the project root. All variables are optional — sensible defaults are provided (see [src/env.ts](src/env.ts)).

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend API base URL (tarot reading generation) |
| `VITE_PUBLIC_NETWORKS_MODE` | `testnet` or `mainnet` (default: `testnet`) |
| `VITE_PUBLIC_SOLANA_RPC` | Custom Solana RPC endpoint |
| `VITE_PRIVY_APP_ID` | Privy application ID |
| `VITE_WSOL_MINT` | Wrapped SOL mint address |
| `VITE_USDC_MINT` | USDC mint address |
| `VITE_USDT_MINT` | USDT mint address |
| `VITE_OWNER_ADDRESS_MAINNET` | Payment recipient address (mainnet) |
| `VITE_OWNER_ADDRESS_DEVNET` | Payment recipient address (devnet) |
| `VITE_TWITTER_URL` | Project Twitter/X link |

### Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the dev server |
| `yarn build` | Type-check and build for production |
| `yarn preview` | Preview the production build locally |
| `yarn lint` | Run ESLint |
| `yarn deploy` | Build and deploy to Cloudflare Workers |

## Project structure

```
src/
├── components/
│   ├── common/     # Shared components (header, footer, modals, dialogs…)
│   ├── pages/      # Page-specific sections (home, game)
│   └── ui/         # Reusable UI primitives (button, dialog, select…)
├── constants/      # Addresses, currencies, router paths, Solana config
├── hooks/
│   ├── api/        # Backend API hooks (TanStack Query)
│   ├── contracts/  # On-chain read/write hooks (transfers, predictions)
│   └── privy/      # Privy wallet helpers
├── lib/            # Fetcher, Solana utilities, misc helpers
├── pages/          # Route components (home, game, admin, 404)
├── providers/      # Router, query and Solana providers
├── store/          # Zustand stores (modals)
└── types/          # Shared TypeScript types
```

## Card drawing

The three cards are derived deterministically from the payment transaction hash combined with the wallet address ([src/lib/utils.ts](src/lib/utils.ts)) — the same transaction always yields the same spread, making each reading verifiable.

## License

[MIT](LICENSE) © RedDuck Limited
