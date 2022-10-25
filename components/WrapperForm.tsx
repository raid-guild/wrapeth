import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  Flex,
  Container,
  HStack,
  ChakraInput,
} from '@raidguild/design-system';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoMdOpen } from 'react-icons/io';
import { useNetwork } from 'wagmi';
import TokenInfo from './TokenInfo';
import useBalances from 'hooks/useBalances';
import useDeposit from 'hooks/useDeposit';
import useWithdraw from 'hooks/useWithdraw';

export interface WrapperFormProps {
  /**
   * action is either 'deposit' or 'withdraw'
   */
  action: string;
  gasLimit: any;
}

interface IFormInput {
  amount: number;
}

/**
 * Interface for depositinging ETH or native token and receiving wETH
 */
const WrapperForm: React.FC<WrapperFormProps> = ({ action, gasLimit }) => {
  const [inputBalance, setInputBalance] = useState<number>(0);
  const { chain } = useNetwork();

  const { ethBalance, wethBalance } = useBalances();
  const handleSetMax: any = () => {
    setInputBalance(action === 'deposit' ? ethBalance : wethBalance);
  };

  const {
    writeDeposit,
    dataDeposit,
    isErrorDeposit,
    errorDeposit,
    isLoadingDeposit,
    isSuccessDeposit,
  } = useDeposit(inputBalance);

  const {
    writeWithdraw,
    dataWithdraw,
    isErrorWithdraw,
    errorWithdraw,
    isLoadingWithdraw,
    isSuccessWithdraw,
  } = useWithdraw(inputBalance);

  const {
    handleSubmit,
    register,
    formState: { dirtyFields, errors },
  } = useForm<IFormInput>();

  // console.log(dirtyFields, errors);

  const onSubmit = async (data: IFormInput) => {
    console.log(
      writeDeposit,
      dataDeposit,
      isErrorDeposit,
      errorDeposit,
      isLoadingDeposit,
      isSuccessDeposit,
    );
    const amount = data.amount;
    console.log(`${amount} send to contract`);
    if (action === 'deposit') writeDeposit();
    if (action === 'withdraw') writeWithdraw();
    // contract?.();
  };

  const successMessage = (
    <a
      href={`${chain?.blockExplorers?.default.url}/tx/${
        dataDeposit?.hash || dataWithdraw?.hash
      }`}
      target='_'
    >
      <span
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
      >
        Success! Click here to view transaction details{' '}
        <IoMdOpen style={{ marginLeft: '0.5em' }} />
      </span>
    </a>
  );

  useEffect(() => {}, [inputBalance]);

  return (
    <Container mt={12}>
      <Flex justify='end' my={3}>
        <TokenInfo deposit={action === 'deposit'} gasLimit={gasLimit} />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack marginBottom='32px'>
          <FormControl>
            <ChakraInput
              color='white'
              variant='outline'
              width='100%'
              type='number'
              value={inputBalance}
              {...register('amount', {
                required: 'Input cannot be blank',
                valueAsNumber: false,
                validate: (value) => value > 0,
                onChange: (e) => setInputBalance(e.target.value),
                max: {
                  value:
                    action === 'deposit'
                      ? +ethBalance
                        ? +ethBalance - +gasLimit
                        : 0
                      : +wethBalance
                      ? +wethBalance
                      : 0,
                  message: `Value must be less than your balance, plus gas required for transaction`,
                },
                min: {
                  value: 0,
                  message: 'Value must be greater than 0',
                },
              })}
            />
          </FormControl>

          <Button
            textStyle='buttonLabel'
            maxW='120px'
            variant='outline'
            size='lg'
            h='100%'
            w='100%'
            borderRadius='none'
            onClick={handleSetMax}
          >
            Set Max
          </Button>
        </HStack>
        <Flex color='white' opacity='0.65' mt='-3' mb='5'>
          {errors.amount && (
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FiAlertTriangle style={{ marginRight: '0.5rem' }} />
              {errors.amount.message}
            </span>
          )}
        </Flex>

        <Button
          as='button'
          variant='solid'
          type='submit'
          loadingText='Submitting'
          width='100%'
        >
          Submit
        </Button>
      </form>

      <Flex
        color='white'
        justifyContent='center'
        mt={
          isSuccessDeposit ||
          isSuccessWithdraw ||
          isErrorDeposit ||
          isErrorWithdraw ||
          isLoadingDeposit ||
          isLoadingWithdraw
            ? '5'
            : 0
        }
      >
        {isLoadingDeposit || isLoadingWithdraw
          ? 'Please wait while your transaction is being mined.'
          : null}
        {isSuccessDeposit || isSuccessWithdraw ? successMessage : null}
        {isErrorDeposit || isErrorWithdraw
          ? `Error: ${errorDeposit?.code || errorWithdraw?.code}`
          : null}
      </Flex>
    </Container>
  );
};

export default WrapperForm;
