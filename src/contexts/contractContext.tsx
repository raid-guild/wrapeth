import React, { createContext, useEffect, useState } from 'react';
import {
  useAccount,
  useNetwork,
  useContract,
  useProvider,
  useSigner,
} from 'wagmi';
import WethAbi from 'contracts/wethAbi.json';

type ContractContextType = {
  contract?: any;
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: any) => void;
};

export const ContractContext = createContext<ContractContextType>({
  contract: undefined,
  // eslint-disable-next-line no-unused-vars
  setContract: (contract: any) => {},
});

interface ContractProps {
  children: any;
}

const wethAddrs: any = {
  // Ethereum mainnet = homestead
  homestead: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  rinkeby: '0xdf032bc4b9dc2782bb09352007d4c57b75160b15',
  kovan: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  gnosis: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  matic: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  arbitrum: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  'arbitrum-testnet': '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
  optimism: '0x4200000000000000000000000000000000000006',
  'optimism-kovan': '0x4200000000000000000000000000000000000006',
};

export const ContractContextProvider: React.FC<ContractProps> = ({
  children,
}: ContractProps) => {
  const [contract, setContract] = useState<any>();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const network: any = chain?.network;
  const chainAddress: any = isConnected ? wethAddrs[network] : null;
  const abi: any = WethAbi;

  console.log(signer);

  const initContract = async () => {
    console.log(chain?.network);
    try {
      let contract: any = await useContract({
        addressOrName: chainAddress,
        contractInterface: abi,
        signerOrProvider: signer,
      });
      setContract(contract);
    } catch (error) {
      console.log(error);
    }
  };
  isConnected ? initContract() : null;
  console.log(isConnected, contract);

  //   useEffect(() => {
  //     const initContract = async () => {
  //       console.log('network name', injectedChain.network);
  //       try {
  //         const contract: any = await new injectedProvider.eth.Contract(
  //           WethAbi,
  //           wethAddrs[injectedChain.network],
  //         );
  //         console.log('Contract: ', contract);
  //         setContract(contract);
  //       } catch (e) {
  //         console.error(`Could not init contract`);
  //       }
  //     };

  //     if (injectedProvider?.eth && injectedChain?.network) {
  //       initContract();
  //     }
  //   }, [chain]);

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};
