import { Chain, configureChains, createClient } from 'wagmi';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import { metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { enkryptWallet } from './enkrypt-wallet-connector';

const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION';

export const moonriver: Chain = {
  id: 1285,
  name: 'Moonriver',
  network: 'moonriver',
  nativeCurrency: {
    name: 'MOVR',
    symbol: 'MOVR',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://rpc.api.moonriver.moonbeam.network/',
  },
  blockExplorers: {
    moonscan: {
      name: 'Moonscan',
      url: 'https://moonriver.moonscan.io/',
    },
    blockscan: {
      name: 'Blockscan',
      url: 'https://blockscout.moonbeam.network/',
    },
    default: {
      name: 'Moonscan',
      url: 'https://moonriver.moonscan.io/',
    },
  },
};

export const moonbaseAlpha: Chain = {
  id: 1287,
  name: 'Moonbase Alpha',
  network: 'moonbaseAlpha',
  nativeCurrency: {
    name: 'DEV',
    symbol: 'DEV',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://rpc.api.moonbase.moonbeam.network/',
  },
  blockExplorers: {
    default: {
      name: 'Moonscan',
      url: 'https://moonbase.moonscan.io/',
    },
  },
};

export const chain = isProd ? moonriver : moonbaseAlpha;

export const { chains, provider } = configureChains([chain], [publicProvider()]);

const desktopWallets = [
  metaMaskWallet({ chains }),
  walletConnectWallet({ chains }),
  enkryptWallet({ chains }),
];

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: desktopWallets,
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default wagmiClient;
