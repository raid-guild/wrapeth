import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import {
  Web3ModalContext,
  CurrentUserContext,
  ContractContext,
} from "../contexts/Store.js";

const TokenLink = styled.button`
  text-align: right;
  max-width: 100%;
  float: right;
  margin-top: 0px;
  color: #ff3864;
  background-color: transparent;
  appearance: none;
  outline: none;
  border: none;
`;

export const TokenInfo = (props) => {
  const [web3Modal] = useContext(Web3ModalContext);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [contract] = useContext(ContractContext);

  useEffect(() => {
    const getInfo = async () => {
      // set wETH balance
      const wethBalanceInWei = await contract.methods
        .balanceOf(currentUser.username)
        .call();
      const wethBalance = web3Modal.web3.utils.fromWei("" + wethBalanceInWei);
      // get Eth Balance
      const ethBalanceInWei = await web3Modal.web3.eth.getBalance(
        currentUser.username
      );
      const ethBalance = web3Modal.web3.utils.fromWei("" + ethBalanceInWei);

      setCurrentUser({ ...currentUser, ...{ wethBalance, ethBalance } });
    };
    if (contract) {
      getInfo();
    }
    // eslint-disable-next-line
  }, [contract]);

  const forDisplay = (number) => {
    return number ? (+number).toFixed(4) : 0;
  };

  return currentUser && props.Eth ? (
    <TokenLink max={forDisplay(currentUser.ethBalance)}>
      <span>{currentUser?.network.chain}</span> Balance:{" "}
      {forDisplay(currentUser.ethBalance)}
    </TokenLink>
  ) : (
    <TokenLink max={forDisplay(currentUser.wethBalance)}>
      w<span>{currentUser?.network.chain}</span> Balance:{" "}
      {forDisplay(currentUser.wethBalance)}
    </TokenLink>
  );
};
