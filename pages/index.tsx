import React, { useState, useEffect } from 'react';
import {
  Heading,
  Card,
  Container,
  Flex,
  Spacer,
  ButtonGroup,
  BuiltByRaidGuildComponent,
} from '@raidguild/design-system';
import '@rainbow-me/rainbowkit/styles.css';
import {
  useAccount,
  useBalance,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { utils, BigNumber } from 'ethers';

import { WrapperForm } from 'components';
import { Header } from 'components';
import { ConnectWallet } from 'components';
import { wethAddrs } from 'utils/contracts';
import WethAbi from 'contracts/wethAbi.json';
import '@fontsource/uncial-antiqua';

export interface AppProps {
  /**
   * The components to render within the app container
   */
  children?: any;
}

/**
 * Primary UI component for user interaction
 */
const App: React.FC<AppProps> = ({ children }) => {
  /**
   * pass input balance to WrapperForm and TokenInfo to handle form input. This is used with handleSetMax to let use input max balance
   */
  const [inputBalance, setInputBalance] = useState<number>(0);
  const [deposit, setDeposit] = useState<boolean>(true);
  const [network, setNetwork] = useState<any | null>(null);
  const [contractAddress, setContractAddress] = useState<string>();
  const [userAddress, setUserAddress] = useState<string>();
  const [ethBalanceFormatted, setEthBalanceFormatted] = useState<any>(0);
  const [wethBalanceFormatted, setWethBalanceFormatted] = useState<any>(0);
  const [gasEstimate, setGasEstimate] = useState<any>();

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const abi = WethAbi;

  const ethBalance = useBalance({
    addressOrName: userAddress,
    enabled: contractAddress?.length !== 0,
  });

  const wethBalance = useBalance({
    addressOrName: userAddress,
    enabled: contractAddress?.length !== 0,
    token: contractAddress,
  });

  /**
   * wagmi deposit functionality
   */
  const {
    data: dataPrepareDeposit,
    config: configDeposit,
    error: txErrorDeposit,
    isError: isErrorDeposit,
  } = usePrepareContractWrite({
    addressOrName: contractAddress || '',
    contractInterface: abi,
    functionName: 'deposit',
    enabled: inputBalance !== undefined,
    overrides: {
      from: userAddress,
      value: BigNumber.from(utils.parseEther(inputBalance.toString() || '0')),
    },
    onSuccess(data) {
      console.log(data);
      return data;
    },
    onError(error) {
      return error;
    },
  });

  const { write: writeDeposit, data: dataDeposit } = useContractWrite({
    ...configDeposit,
    request: configDeposit.request,
  });

  const { isSuccess: isSuccessDeposit } = useWaitForTransaction({
    hash: dataDeposit?.hash,
    onSuccess(data) {
      return data;
    },
    onError(error) {
      return error;
    },
  });

  /**
   * wagmi withdraw functionality
   */
  const {
    data: dataPrepareWithdraw,
    config: configWithdraw,
    error: txErrorWithdraw,
    isError: isErrorWithdraw,
  } = usePrepareContractWrite({
    addressOrName: contractAddress || '',
    contractInterface: abi,
    functionName: 'withdraw',
    enabled: !!inputBalance,
    args: [BigNumber.from(utils.parseEther(inputBalance.toString() || '0'))],
    onSuccess(data) {
      return data;
    },
    onError(error) {
      return error;
    },
  });

  const { write: writeWithdraw, data: dataWithdraw } = useContractWrite({
    ...configWithdraw,
    request: configWithdraw.request,
  });

  const { isSuccess: isSuccessWithdraw } = useWaitForTransaction({
    hash: dataWithdraw?.hash,
    onSuccess(data) {
      console.log('Success', data);
    },
    onError(error) {
      console.log('Error', error);
    },
  });

  const onButtonSelection = (index: number) => {
    switch (index) {
      case 0:
        setDeposit(true);
        !deposit ? setInputBalance(0) : null;
        break;
      case 1:
        setDeposit(false);
        deposit ? setInputBalance(0) : null;
        break;
      default:
        console.log(`Invalid input: ${index}`);
    }
  };

  useEffect(() => {
    if (chain?.network) setNetwork(chain?.network);

    if (isConnected && network) setContractAddress(wethAddrs[network]);

    if (isConnected && network) {
      setEthBalanceFormatted(ethBalance.data?.formatted);
      setWethBalanceFormatted(wethBalance.data?.formatted);
    }

    if (address) setUserAddress(address);

    /*
    // set gas estimate for wrap
    if (dataPrepareDeposit) {
      const gas: any = dataPrepareDeposit?.request.gasLimit?._hex.toString();
      setGasEstimate(gasFormatted);
    }
    // set gas estimate for unwrap
    if (dataPrepareWithdraw) {
      const gas: any = dataPrepareWithdraw?.request.gasLimit?._hex.toString();
      setGasEstimate(gasFormatted);
    }
    */
  }, [
    chain,
    network,
    isConnected,
    address,
    ethBalance,
    wethBalance,
    dataPrepareDeposit,
    dataPrepareWithdraw,
  ]);

  return (
    <>
      <Flex h='100vh' w='100vw' maxW='100%'>
        <Container centerContent maxW='80ch'>
          <Header>
            <Spacer />
            <ConnectWallet />
          </Header>
          <Flex align='center' mt='10px'>
            <Heading as='h1' size='4xl' variant='shadow' content='Wrap Eth' />
          </Flex>
          <Container centerContent maxW='80ch'>
            <Card mt='24px' p='64px' w='100%' background='gray.800'>
              <ButtonGroup
                buttons={[
                  `Wrap ${chain?.nativeCurrency?.symbol || 'ETH'}`,
                  `Unwrap w${chain?.nativeCurrency?.symbol || 'ETH'}`,
                ]}
                defaultSelected={deposit ? 0 : 1}
                isAttached
                onSelect={onButtonSelection}
              />

              {isConnected ? (
                <WrapperForm
                  action={deposit ? 'deposit' : 'withdraw'}
                  contract={deposit ? writeDeposit : writeWithdraw}
                  wethBalance={+wethBalanceFormatted}
                  ethBalance={+ethBalanceFormatted}
                  inputBalance={inputBalance}
                  setInputBalance={setInputBalance}
                  gasEstimate={gasEstimate}
                  transactionData={deposit ? dataDeposit : dataWithdraw}
                  txSuccess={deposit ? isSuccessDeposit : isSuccessWithdraw}
                  isTxError={deposit ? isErrorDeposit : isErrorWithdraw}
                  txError={deposit ? txErrorDeposit : txErrorWithdraw}
                />
              ) : (
                <Heading
                  color='whiteAlpha.900'
                  variant='noShadow'
                  mt={5}
                  size='lg'
                >
                  Connect to {deposit ? 'wrap' : 'unwrap'}{' '}
                  {network || deposit ? 'ETH' : 'WETH'}
                </Heading>
              )}
            </Card>
          </Container>

          <Flex justify='flex-end' width='100%' my='6' mr='48px'>
            <BuiltByRaidGuildComponent />
          </Flex>
        </Container>
        {children}
      </Flex>
    </>
  );
};

export default App;
