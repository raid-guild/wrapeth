import React from 'react';
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
// import { ValidAmount } from 'utils/validation';
// import { User } from 'types';
import TokenInfo from './TokenInfo';

export interface WrapperFormProps {
  /**
   * Provide the current action selected by the user
   */
  action: string;
  // change contract to 'actionHandler'
  contract: any;
  wethBalance: number;
  ethBalance: number;
  inputBalance: number;
  setInputBalance: any;
  gasEstimate: string | number;
  transactionData: any;
  txSuccess: boolean;
  isTxError: boolean;
  txError: any;
}

interface IFormInput {
  amount: number;
}

/**
 * Interface for depositinging ETH or native token and receiving wETH
 */
const WrapperForm: React.FC<WrapperFormProps> = ({
  action,
  contract,
  wethBalance,
  ethBalance,
  inputBalance,
  setInputBalance,
  gasEstimate,
  transactionData,
  txSuccess,
  isTxError,
  txError,
}) => {
  const { chain } = useNetwork();
  // form variables
  const {
    handleSubmit,
    register,
    formState: { dirtyFields, errors },
  } = useForm<IFormInput>();

  /**
   * handleSetMax gets passed down to TokenInfo
   */
  const handleSetMax: any = () => {
    setInputBalance(
      action === 'deposit' ? ethBalance.toFixed(6) : wethBalance.toFixed(6),
    );
  };

  // console.log(dirtyFields, errors);

  const onSubmit = async (data: IFormInput) => {
    const amount = data.amount;
    console.log(`${amount} send to contract`);
    contract?.();
  };

  const successMessage = (
    <a
      href={`${chain?.blockExplorers?.default.url}/tx/${transactionData?.hash}`}
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

  return (
    <Container mt={12}>
      <Flex justify='end' my={3}>
        <TokenInfo
          deposit={action === 'deposit'}
          ethBalance={ethBalance}
          wethBalance={wethBalance}
          gasEstimate={gasEstimate}
        />
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
                        ? +ethBalance
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

      <Flex color='white' justifyContent='center' mt={txSuccess ? '5' : 0}>
        {txSuccess ? successMessage : null}
        {/* {isTxError ? txError : null} */}
      </Flex>
    </Container>
  );
};

export default WrapperForm;
