import React, { useState } from 'react';
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
 * Interface for depositing ETH or native token and receiving wETH
 */
const WrapperForm: React.FC<WrapperFormProps> = ({ action }) => {
  const [inputBalance, setInputBalance] = useState<number>(0);
  const { ethBalance, wethBalance } = useBalances();
  const { gasLimitEther } = useGasFee();

  const handleSetMax: any = (): void => {
    const eth = +ethBalance;
    const weth = +wethBalance;
    setInputBalance(
      action === 'deposit'
        ? parseFloat(eth.toFixed(4))
        : parseFloat(weth.toFixed(4)),
    );
  };

  const { writeDeposit } = useDeposit(inputBalance);

  const { writeWithdraw } = useWithdraw(inputBalance);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = async (data: IFormInput) => {
    const amount = data.amount;
    console.log(`${amount} send to contract`);
    if (action === 'deposit' && writeDeposit) writeDeposit();
    else if (action === 'withdraw' && writeWithdraw) writeWithdraw();
  };

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
                validate: (value: number) => {
                  if (action === 'deposit') {
                    return value > 0 && value < +ethBalance - +gasLimitEther;
                  }
                  return value > 0 && value <= +wethBalance;
                },
                onChange: (e: any) => setInputBalance(e.target.value),
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
            <Flex as='span' alignItems='center'>
              <FiAlertTriangle style={{ marginRight: '0.5rem' }} />
              {errors.amount.message}
            </Flex>
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

      <Flex color='white' justifyContent='center' mt='5'></Flex>
    </Container>
  );
};

export default WrapperForm;
