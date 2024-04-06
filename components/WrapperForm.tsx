import {
  Box,
  Button,
  ChakraNumberInput,
  Container,
  Flex,
  FormControl,
  HStack,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  // NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@raidguild/design-system';
import React from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { FiAlertTriangle } from 'react-icons/fi';

import useBalances from '@/hooks/useBalances';
import useDeposit from '@/hooks/useDeposit';
import useGasFee from '@/hooks/useGasFee';
import useWithdraw from '@/hooks/useWithdraw';
import TokenInfo from './TokenInfo';

export interface WrapperFormProps {
  /**
   * action is either 'deposit' or 'withdraw'
   */
  action: string;
}

/**
 * Interface for depositing ETH or native token and receiving wETH
 */
const WrapperForm: React.FC<WrapperFormProps> = ({ action }) => {
  const { ethBalance, wethBalance } = useBalances();
  const { txFeeEther } = useGasFee();

  const localForm = useForm<FieldValues>({
    defaultValues: {
      amount: 0,
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    //
    control,
    //
    formState: { errors },
  } = localForm;

  const { writeDeposit } = useDeposit(watch('amount'));
  const { writeWithdraw } = useWithdraw(watch('amount'));

  const handleSetMax: any = (): void => {
    const eth = +ethBalance;
    const weth = +wethBalance;
    setValue(
      'amount',
      action === 'deposit'
        ? parseFloat(eth.toFixed(4))
        : parseFloat(weth.toFixed(4)),
    );
  };

  const onSubmit = async () => {
    if (action === 'deposit' && writeDeposit) writeDeposit();
    else if (action === 'withdraw' && writeWithdraw) writeWithdraw();
  };

  const customValidations = {
    required: 'Input cannot be blank',
    validate: (value: number) => {
      if (action === 'deposit') {
        return value > 0 && value < +ethBalance - +txFeeEther;
      }
      return value > 0 && value <= +wethBalance;
    },
    max: {
      value: action === 'deposit' ? +ethBalance - +txFeeEther : +wethBalance,
      message: `Input must be less than your full balance, plus transaction fees...`,
    },
    min: {
      value: 0,
      message: 'Value must be greater than 0',
    },
  };

  return (
    <Container mt={6}>
      <Flex justify='end' my={3}>
        <TokenInfo deposit={action === 'deposit'} />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack marginBottom={8}>
          <FormControl color='white'>
            <Controller
              control={control}
              name='amount'
              rules={customValidations}
              render={({ field: { ref, ...restField } }) => (
                <ChakraNumberInput
                  h='100%'
                  step={0.1}
                  width='100%'
                  min={0}
                  max={action === 'deposit' ? +ethBalance : +wethBalance}
                  variant='outline'
                  {...restField}
                >
                  <NumberInputField
                    ref={ref}
                    name={restField.name}
                    border='1px solid'
                    borderColor='purple.400'
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </ChakraNumberInput>
              )}
            />
          </FormControl>
          <Box h='100%'>
            <Button
              maxW='120px'
              variant='outline'
              size='md'
              w='100%'
              onClick={handleSetMax}
            >
              Set Max
            </Button>
          </Box>
        </HStack>
        <Flex color='white' opacity='0.65' mt='-3' mb='5'>
          {errors.amount && (
            <Flex as='span' alignItems='center' gap={4}>
              <Icon as={FiAlertTriangle} mr='0.5' />
              <Text fontFamily='spaceMono' fontWeight='medium' fontSize='sm'>
                {errors.amount.message}
              </Text>
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

      <Flex color='white' justifyContent='center' mt='5' />
    </Container>
  );
};

export default WrapperForm;
