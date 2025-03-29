// import {
//   Box,
//   Button,
//   ChakraNumberInput,
//   Container,
//   Flex,
//   FormControl,
//   HStack,
//   Icon,
//   NumberDecrementStepper,
//   NumberIncrementStepper,
//   // NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   Text,
// } from '@raidguild/design-system';
import React from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { FiAlertTriangle } from 'react-icons/fi';

import useBalances from '@/hooks/useBalances';
import useDeposit from '@/hooks/useDeposit';
import useGasFee from '@/hooks/useGasFee';
import useWithdraw from '@/hooks/useWithdraw';
import TokenInfo from './TokenInfo';
import { FormControl } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
    control,
    formState: { errors },
  } = localForm;

  const { writeDeposit } = useDeposit(watch('amount'));
  const { writeWithdraw } = useWithdraw(watch('amount'));

  const handleSetMax: any = (): void => {
    const eth = +ethBalance - +txFeeEther;
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
    <div className='mt-6'>
      <div className='flex justify-end my-3'>
        <TokenInfo deposit={action === 'deposit'} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex mb-8'>
          <FormControl className='text-white'>
            <Controller
              control={control}
              name='amount'
              rules={customValidations}
              render={({ field: { ref, ...restField } }) => (
                <Input
                  className='h-full w-full border border-purple-400 rounded-md'
                  type='number'
                  step={0.1}
                  min={0}
                  max={action === 'deposit' ? +ethBalance : +wethBalance}
                  {...restField}
                >
                  {/* <NumberInputField
                    ref={ref}
                    name={restField.name}
                    border='1px solid'
                    borderColor='purple.400'
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper> */}
                </Input>
              )}
            />
          </FormControl>
          <div className='h-full'>
            <Button
              className='w-full max-w-30'
              variant='outline'
              size='sm'
              onClick={handleSetMax}
            >
              Set Max
            </Button>
          </div>
        </div>
        <div className='text-white opacity-65 mt-[-3px] mb-5'>
          {errors.amount && (
            <div className='flex items-center gap-4'>
              <FiAlertTriangle className='mr-1' />
              <p className='font-medium text-sm'>{String(errors.amount.message || '')}</p>
            </div>
          )}
        </div>

        <Button
          variant='default'
          type='submit'
          className='w-full'
        >
          Submit
        </Button>
      </form>

      <div className='flex justify-center mt-5 text-white' />
    </div>
  );
};

export default WrapperForm;
