import React, { useContext } from "react";

import { Web3ModalContext, CurrentUserContext } from "../../contexts/Store";
import { createWeb3User, w3modal } from "../../utils/Auth";
import { Button } from "react-bootstrap";
import { getChainData } from "../../utils/Chains";

export const Web3SignIn = () => {
  const [web3Modal, setWeb3Modal] = useContext(Web3ModalContext);
  const [, setCurrentUser] = useContext(CurrentUserContext);

  return (
    <Button
      variant="outline-primary"
      onClick={async () => {
        try {
          const w3c = await w3modal(web3Modal);
          const injectedChainId = await w3c.web3.eth.getChainId();
          const [account] = await w3c.web3.eth.getAccounts();
          setWeb3Modal(w3c);
          const user = createWeb3User(account, getChainData(+injectedChainId));
          setCurrentUser(user);
        } catch (err) {
          console.log("web3Modal error", err);
        }
      }}
    >
      Connect
    </Button>
  );
};
