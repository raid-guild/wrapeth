import React, { useContext } from 'react';

import { Web3ConnectContext, CurrentUserContext } from '../../contexts/Store';
import { createWeb3User, w3connect } from '../../utils/Auth';
import { Button } from 'react-bootstrap'

export const Web3SignIn = () => {
    const [web3Connect, setWeb3Connect] = useContext(Web3ConnectContext);
    const [, setCurrentUser] = useContext(CurrentUserContext);


    return (
        <Button
            variant="outline-primary"
            onClick={async () => {

                try {
                    const w3c = await w3connect(web3Connect);
                    const [account] = await w3c.web3.eth.getAccounts();
                    setWeb3Connect(w3c);
                    const user = createWeb3User(account);
                    setCurrentUser(user);
                } catch (err) {
                    console.log('web3Connect error', err);
                }
            }}
        >
            Sign In With Web3
    </Button>
    );
};
