import React, { useContext, useEffect } from 'react';

import { Web3ConnectContext, CurrentUserContext, ContractContext } from '../contexts/Store.js';

import { Container } from 'react-bootstrap'

export const TokenInfo = () => {
    const [web3Connect] = useContext(Web3ConnectContext);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [contract] = useContext(ContractContext);

    useEffect(() => {
        const getInfo = async () => {
            const wethBalanceInWei = await contract.methods
                .balanceOf(currentUser.username)
                .call();
            const wethBalance = web3Connect.web3.utils.fromWei("" + wethBalanceInWei);
            setCurrentUser({ ...currentUser, ...{ wethBalance } })
        }
        if (contract) {
            getInfo();
        }
        // eslint-disable-next-line
    }, [contract])

    const forDisplay = (number) => {

        return number ? (+number).toFixed(4) : 0;
    }

    return (
        <Container>
            <p>WETH Balance: {currentUser && forDisplay(currentUser.wethBalance)}</p>
        </Container>
    );
};
