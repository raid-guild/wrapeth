import React, { useState, useEffect, createContext, useRef } from 'react';
import Web3Modal from "web3modal";
import {
    w3modal,
    providerOptions,
    createWeb3User
} from '../utils/Auth';
import { getChainData } from '../utils/Chains';

import WethAbi from '../contracts/wethAbi.json';

export const LoaderContext = createContext(false);
export const Web3ModalContext = createContext();
export const CurrentUserContext = createContext();
export const ContractContext = createContext();

const wethAddrs = {
    mainnet: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    kovan: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
    xdai: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
    matic: "",
}
const Store = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();
    const [contract, setContract] = useState();
    const [network, setNetwork] = useState();
    const [loading, setLoading] = useState(false);
    const [web3Modal, setWeb3Modal] = useState(
        new Web3Modal({
            // network: getChainData(+process.env.REACT_APP_CHAIN_ID).network, // optional
            providerOptions, // required
            cacheProvider: true,
        }),
    );

    const hasListeners = useRef(null);

    useEffect(() => {
        const onLoad = async () => {
            try {
                const w3c = await w3modal(
                    web3Modal,
                );
                const [account] = await w3c.web3.eth.getAccounts();
                setWeb3Modal(w3c);
                const injectedChainId = await w3c.web3.eth.getChainId();
                console.log('chain id', injectedChainId);
                setNetwork(injectedChainId)
                const user = createWeb3User(account, getChainData(+injectedChainId));
                setCurrentUser(user);
            } catch (e) {
                console.error(
                    `Could not log in with web3`,
                );
            }
        };
        if (web3Modal.cachedProvider) {
            onLoad();
        }
        // eslint-disable-next-line
    }, [web3Modal?.cachedProvider]);

    useEffect(() => {
        const handleChainChange = async () => {
          console.log('CHAIN CHANGE');
          window.location.reload();
        };
        const accountsChanged = async () => {
          console.log('ACCOUNT CHANGE');
          window.location.reload();
        };
    
        // const unsub = () => {
        //   if (web3Modal?.cachedProvider) {
        //     web3Modal?.web3?.currentProvider.removeListener(
        //       'accountsChanged',
        //       handleChainChange,
        //     );
        //     web3Modal?.web3?.currentProvider.removeListener(
        //       'chainChanged',
        //       accountsChanged,
        //     );
        //   }
        // };
    
        if (web3Modal?.web3?.currentProvider && !hasListeners.current) {
            return web3Modal?.web3?.currentProvider.on('accountsChanged', accountsChanged)
            .on('chainChanged', handleChainChange);
        };
        // return () => unsub();
      }, [web3Modal]);

    useEffect(() => {
        const initContract = async () => {

            console.log('name', getChainData(+network).network);
            try {
                const contract = new web3Modal.web3.eth.Contract(WethAbi, wethAddrs[getChainData(+network).network]);
                setContract(contract)
            } catch (e) {
                console.error(
                    `Could not init contract`,
                );
            }
        };
        
        if (web3Modal.web3 && network) {
            initContract();
        }
        
    }, [network, web3Modal.web3]);


    return (
        <LoaderContext.Provider value={[loading, setLoading]}>
            <Web3ModalContext.Provider value={[web3Modal, setWeb3Modal]}>
                <CurrentUserContext.Provider
                    value={[currentUser, setCurrentUser]}
                >
                    <ContractContext.Provider value={[contract, setContract]}>
                        {children}
                    </ContractContext.Provider>
                </CurrentUserContext.Provider>
            </Web3ModalContext.Provider>
        </LoaderContext.Provider>
    );
};

export default Store;