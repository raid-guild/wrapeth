import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from 'react';
import Web3 from 'web3';
import { Network } from '../types';
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';

import { supportedChains } from '../utils/chain';
import {
  deriveChainId,
  deriveSelectedAddress,
  getProviderOptions,
} from '../utils/web3Modal';

//TODO refactor to Ethers
const defaultModal = new SafeAppWeb3Modal({
  providerOptions: getProviderOptions(),
  cacheProvider: true,
  theme: 'dark',
});

export const InjectedProviderContext = createContext<{
  injectedProvider?: any;
  requestWallet?: any;
  disconnectDapp?: any;
  injectedChain?: any;
  address?: any;
  web3Modal?: any;
  state?: any;
  dispatch?: React.Dispatch<any>;
}>({});

interface InjectedProviderProps {
  children: any;
}

export const InjectedProvider: React.FC<InjectedProviderProps> = ({
  children,
}: InjectedProviderProps) => {
  const [injectedProvider, setInjectedProvider]: any = useState(null);
  const [address, setAddress] = useState(null);
  const [injectedChain, setInjectedChain] = useState<Network>();
  const [web3Modal, setWeb3Modal] = useState(defaultModal);
  // const { errorToast } = useContext(OverlayContext);

  const hasListeners: any = useRef(null);

  const connectProvider = async () => {
    const providerOptions = getProviderOptions();

    console.log('providerOption: ', providerOptions);
    if (!providerOptions) {
      setInjectedProvider(null);
      setAddress(null);
      setWeb3Modal(defaultModal);
      window.localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER');
      // errorToast({ title: 'Could not connect to unsupported network' });
      return;
    }

    const localWeb3Modal = new SafeAppWeb3Modal({
      providerOptions,
      cacheProvider: true,
      theme: 'dark',
    });

    const provider = await localWeb3Modal.requestProvider();
    console.log('Provider: ', provider);
    provider.selectedAddress = deriveSelectedAddress(provider);
    const chainId = deriveChainId(provider);

    const chain = {
      ...supportedChains[chainId],
      chainId,
    };
    console.log('connecting provider');
    const web3: any = new Web3(provider);
    console.log('Web3 instance: ', web3);
    if (
      web3?.currentProvider?.selectedAddress ||
      web3?.currentProvider?.safe?.safeAddress
    ) {
      const address = web3?.currentProvider?.selectedAddress
        ? web3?.currentProvider?.selectedAddress
        : web3?.currentProvider?.safe?.safeAddress;
      setInjectedProvider(web3);
      // setPageState('injectedProvider', web3);
      setAddress(address);
      setInjectedChain(chain);
      setWeb3Modal(localWeb3Modal);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')) {
      connectProvider();
    }
  }, []);

  // This useEffect handles the initialization of EIP-1193 listeners
  // https://eips.ethereum.org/EIPS/eip-1193

  useEffect(() => {
    const addListenersToProvider = async () => {
      const safeApp = await web3Modal.isSafeApp();
      if (!safeApp) {
        const handleChainChange = () => {
          console.log('CHAIN CHANGE');
          connectProvider();
        };
        const accountsChanged = () => {
          console.log('ACCOUNT CHANGE');
          connectProvider();
        };

        const unsub = () => {
          if (injectedProvider?.currentProvider) {
            injectedProvider.currentProvider.removeListener(
              'accountsChanged',
              handleChainChange,
            );
            injectedProvider.currentProvider.removeListener(
              'chainChanged',
              accountsChanged,
            );
          }
        };

        if (injectedProvider?.currentProvider && !hasListeners.current) {
          console.log('InjectedProvider: ', injectedProvider);
          injectedProvider.currentProvider
            .on('accountsChanged', accountsChanged)
            .on('chainChanged', handleChainChange);
          hasListeners.current = true;
        }
        return () => unsub();
      }
    };

    addListenersToProvider();
  }, [injectedProvider]);

  const requestWallet = async () => {
    await connectProvider();
  };

  const disconnectDapp = async () => {
    setInjectedProvider(null);
    setAddress(null);
    setWeb3Modal(defaultModal);
    web3Modal.clearCachedProvider();
  };

  return (
    <InjectedProviderContext.Provider
      value={{
        injectedProvider,
        requestWallet,
        disconnectDapp,
        injectedChain,
        address,
        web3Modal,
      }}
    >
      {children}
    </InjectedProviderContext.Provider>
  );
};

export const useInjectedProvider = () => {
  const {
    injectedProvider,
    requestWallet,
    disconnectDapp,
    injectedChain,
    address,
    web3Modal,
  } = useContext(InjectedProviderContext);
  return {
    injectedProvider,
    requestWallet,
    disconnectDapp,
    injectedChain,
    web3Modal,
    address,
  };
};
