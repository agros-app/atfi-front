'use client'
import {createContext, useContext, useState} from "react";

import {
    useWeb3ModalAccount,
    useDisconnect,
    createWeb3Modal,
    defaultConfig,
    useWeb3Modal
} from "@web3modal/ethers5/react";

const projectId = 'dbd9c43d66e4c9498e408154729c019f'

const Amoy = {
    chainId: 80002,
    name: 'Amoy',
    currency: 'MATIC',
    explorerUrl: 'https://amoy.polygonscan.com',
    rpcUrl: `https://polygon-amoy.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
};

const Polygon = {
    chainId: 137,
    name: 'Polygon Mainnet',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
};

const metadata = {
    name: 'ATFI',
    description: 'Invest in the agro field',
    url: 'https://atfi.vercel.app',
    icons: ['https://avatars.mywebsite.com/']
};

const featuredWalletIds = [
    '1896aa67ce33d5bde764369c7541a75074baa1b8da97e703c9ee3a4b61e56e65',
    '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4',
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
];

const initialState = {
    connectWallet: () => {},
    disconnectWallet: () => {},
    getCurrentNetwork: () => {},
    isConnected: false,
    chainId: undefined,
    walletAddress: undefined,
    web3Error: ''
};


const Web3Context = createContext(initialState);

// @ts-ignore
export const Web3ContextProvider = ({children}) => {
    const [web3Error, setWeb3Error] = useState('');
    const {address, chainId, isConnected} = useWeb3ModalAccount();
    const {disconnect} = useDisconnect();

    createWeb3Modal({
        ethersConfig: defaultConfig({
            metadata,
            defaultChainId: Amoy.chainId,
            enableEIP6963: true,
            enableInjected: true,
            enableCoinbase: true,
            rpcUrl: Amoy.rpcUrl
        }),
        chains: [Amoy, Polygon],
        projectId: projectId,
        featuredWalletIds,
        enableAnalytics: true,
        themeMode: 'light',
    });

    const { open } = useWeb3Modal();

    const connectWallet = () => {
        try {
            open().then(() => setWeb3Error(''))
        } catch (e) {
            setWeb3Error('Error connecting wallet');
        }
    }

    const disconnectWallet = () => {
        disconnect().then(() => setWeb3Error(''));
    }

    const getCurrentNetwork = () => {
        if (!chainId) return null;
        if (chainId.toString() === Amoy.chainId.toString()) {
            return Amoy;
        } else if (chainId.toString() === Polygon.chainId.toString()) {
            return Polygon;
        }
        return null;
    }

    const value = {
        connectWallet,
        disconnectWallet,
        getCurrentNetwork,
        isConnected,
        chainId,
        walletAddress: address,
        web3Error
    };

    // @ts-ignore
    return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
    return useContext(Web3Context);
}

