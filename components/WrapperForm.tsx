import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useBalances from '@/hooks/useBalances';
import useDeposit from '@/hooks/useDeposit';
import useGasFee from '@/hooks/useGasFee';
import useWithdraw from '@/hooks/useWithdraw';
import TokenInfo from './TokenInfo';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';

export interface WrapperFormProps {
  /**
   * action is either 'deposit' or 'withdraw'
   */
  action: string;
}

const formSchema = z.object({
  amount: z.number().min(0, {
    message: "Amount must be greater than 0.",
  }),
})

/**
 * Interface for depositing ETH or native token and receiving wETH
 */
const WrapperForm: React.FC<WrapperFormProps> = ({ action }) => {
  const { ethBalance, wethBalance } = useBalances();
  const { txFeeEther } = useGasFee();

  const localForm = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      amount: 0,
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    control,
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (action === 'deposit' && writeDeposit) writeDeposit();
    else if (action === 'withdraw' && writeWithdraw) writeWithdraw();
    console.log(data);
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
      <Form {...localForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
            name='amount'
            rules={customValidations}
            render={({ field: { ref, ...restField } }) => (
              <FormItem>
                <FormControl className='text-white'>
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      className='border border-purple-400 rounded-xs'
                      type='number'
                      step={0.1}
                      min={0}
                      max={action === 'deposit' ? +ethBalance : +wethBalance}
                      {...restField}
                    />
                    <Button
                      type='button'
                      className='rounded-xs'
                      variant='outline'
                      onClick={handleSetMax}
                    >
                      Set Max
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant='default'
            type='submit'
            className='w-full rounded-xs bg-purple-600 uppercase'
          >
            Submit
          </Button>
        </form>
      </Form>

      <div className='flex justify-center mt-5 text-white' />
    </div>
  );
};

export default WrapperForm;
