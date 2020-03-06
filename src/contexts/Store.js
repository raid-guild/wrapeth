import React, { useState, useEffect, createContext } from 'react';
import Web3Connect from 'web3connect';
import {
    w3connect,
    providerOptions,
    createWeb3User
} from '../utils/Auth';
import { getChainData } from '../utils/Chains';

import WethAbi from '../contracts/wethAbi.json';

export const LoaderContext = createContext(false);
export const Web3ConnectContext = createContext();
export const CurrentUserContext = createContext();
export const ContractContext = createContext();

const Store = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();
    const [contract, setContract] = useState();
    const [loading, setLoading] = useState(false);
    const [web3Connect, setWeb3Connect] = useState(
        new Web3Connect.Core({
            network: getChainData(+process.env.REACT_APP_CHAIN_ID).network, // optional
            providerOptions, // required
            cacheProvider: true,
        }),
    );

    useEffect(() => {
        const onLoad = async () => {
            try {
                const w3c = await w3connect(
                    web3Connect,
                );
                const [account] = await w3c.web3.eth.getAccounts();
                setWeb3Connect(w3c);
                const user = createWeb3User(account);
                setCurrentUser(user);
            } catch (e) {
                console.error(
                    `Could not log in with web3`,
                );
            }
        };
        if (web3Connect.cachedProvider) {
            onLoad();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const initContract = async () => {
            try {
                const contract = new web3Connect.web3.eth.Contract(WethAbi, process.env.REACT_APP_CONTRACT_ADDR);
                setContract(contract)
            } catch (e) {
                console.error(
                    `Could not init contract`,
                );
            }
        };
        if (web3Connect.web3) {
            initContract();
        }
        // eslint-disable-next-line
    }, [web3Connect.web3]);


    return (
        <LoaderContext.Provider value={[loading, setLoading]}>
            <Web3ConnectContext.Provider value={[web3Connect, setWeb3Connect]}>
                <CurrentUserContext.Provider
                    value={[currentUser, setCurrentUser]}
                >
                    <ContractContext.Provider value={[contract, setContract]}>
                        {children}
                    </ContractContext.Provider>
                </CurrentUserContext.Provider>
            </Web3ConnectContext.Provider>
        </LoaderContext.Provider>
    );
};

export default Store;