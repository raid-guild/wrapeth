import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInjectedProvider } from './injectedProviderContext';
import { Contract } from 'web3-eth-contract';
import WethAbi from '../contracts/wethAbi.json';

type ContractContextType = {
  contract?: Contract;
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: Contract) => void;
};

export const ContractContext = createContext<ContractContextType>({
  contract: undefined,
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: Contract) => {},
});

interface ContractProps {
  children: any;
}

const wethAddrs: any = {
  mainnet: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  kovan: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  xdai: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  matic: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
};

export const ContractContextProvider: React.FC<ContractProps> = ({
  children,
}: ContractProps) => {
  const [contract, setContract] = useState<Contract>();
  const { injectedChain, web3Modal, injectedProvider } = useInjectedProvider();

  useEffect(() => {
    console.log('Loading contract');
    console.log('web3Modal', web3Modal);
    console.log('injectedChain', injectedChain);

    const initContract = async () => {
      console.log('network name', injectedChain.network);
      try {
        const contract: Contract = await new injectedProvider.eth.Contract(
          WethAbi,
          wethAddrs[injectedChain.network],
        );
        console.log('Contract: ', contract);
        setContract(contract);
      } catch (e) {
        console.error(`Could not init contract`);
      }
    };

    if (injectedProvider?.eth && injectedChain?.network) {
      initContract();
    }
  }, [injectedChain, web3Modal.web3]);

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const { contract, setContract } = useContext(ContractContext);
  return { contract, setContract };
};
