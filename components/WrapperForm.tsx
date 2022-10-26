import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  Flex,
  Container,
  HStack,
  ChakraInput,
  Toast,
} from '@raidguild/design-system';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoMdOpen } from 'react-icons/io';
import { useNetwork } from 'wagmi';
import TokenInfo from './TokenInfo';
import useBalances from 'hooks/useBalances';
import useDeposit from 'hooks/useDeposit';
import useWithdraw from 'hooks/useWithdraw';
import useGasFee from 'hooks/useGasFee';

export interface WrapperFormProps {
  /**
   * action is either 'deposit' or 'withdraw'
   */
  action: string;
}

interface IFormInput {
  amount: number;
}

/**
 * Interface for depositinging ETH or native token and receiving wETH
 */
const WrapperForm: React.FC<WrapperFormProps> = ({ action }) => {
  const [inputBalance, setInputBalance] = useState<number>(0);
  const { chain } = useNetwork();
  const { ethBalance, wethBalance } = useBalances();
  const { gasLimitEther } = useGasFee();

  const handleSetMax: any = () => {
    const eth = +ethBalance;
    const weth = +wethBalance;
    setInputBalance(
      action === 'deposit'
        ? parseFloat(eth.toFixed(4))
        : parseFloat(weth.toFixed(4)),
    );
  };

  const { writeDeposit, dataDeposit, statusDeposit } = useDeposit(inputBalance);

  const { writeWithdraw, dataWithdraw, statusWithdraw } =
    useWithdraw(inputBalance);

  const {
    handleSubmit,
    register,

    formState: { dirtyFields, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      amount: 0,
    },
  });
  // console.log(dirtyFields, errors);

  const onSubmit = async (data: IFormInput) => {
    const amount = data.amount;
    console.log(`${amount} send to contract`);
    if (action === 'deposit') writeDeposit();
    else writeWithdraw();
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
          fontWeight: 'normal',
        }}
      >
        Transaction success! View on {chain?.blockExplorers.default.name}
        <IoMdOpen style={{ marginLeft: '0.5em' }} />
      </span>
    </a>
  );

  console.log(statusDeposit, statusWithdraw);

  return (
    <Container mt={12}>
      <Flex justify='end' my={3}>
        <TokenInfo deposit={action === 'deposit'} />
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
                validate: (value) => {
                  if (action === 'deposit') {
                    value > 0 && value < +ethBalance - +gasLimitEther;
                  } else {
                    value > 0 && value <= +wethBalance;
                  }
                },
                onChange: (e) => setInputBalance(e.target.value),
                max: {
                  value:
                    action === 'deposit'
                      ? +ethBalance - +gasLimitEther
                      : +wethBalance,
                  message: `Input must be less than your full balance, plus enough to cover transaction fees...`,
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

      <Flex color='white' justifyContent='center'>
        {statusDeposit === 'loading' || statusWithdraw === 'loading' ? (
          <Toast
            title='Pending transaction'
            description='Wait a moment while your transaction is being mined...'
          />
        ) : null}
        {(statusDeposit === 'success' && statusWithdraw !== 'loading') ||
        (statusWithdraw === 'success' && statusDeposit !== 'loading') ? (
          <Toast title='Success!' description={successMessage} type='success' />
        ) : null}
      </Flex>
    </Container>
  );
};

export default WrapperForm;
