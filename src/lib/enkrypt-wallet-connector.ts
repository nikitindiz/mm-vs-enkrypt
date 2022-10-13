import { Chain } from 'wagmi';
import { Wallet } from '@rainbow-me/rainbowkit';
import { EnkryptConnector } from '@enkryptcom/connector-wagmi';

export interface EnkryptWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const enkryptWallet = ({ chains, shimDisconnect }: EnkryptWalletOptions): Wallet => {
  const isEnkryptInjected =
    typeof window !== 'undefined' &&
    Boolean(
      (window.ethereum as typeof window.ethereum & (undefined | { isEnkrypt?: boolean }))
        ?.isEnkrypt,
    );

  return {
    id: 'enkrypt',
    name: 'Enkrypt',
    iconUrl: async () => (await import('./enkrypt-logo.svg')).default,
    iconBackground: '#fff',
    installed: isEnkryptInjected,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh',
    },
    createConnector: () => {
      return {
        connector: new EnkryptConnector({ chains, options: { shimDisconnect } }),
      };
    },
  };
};
