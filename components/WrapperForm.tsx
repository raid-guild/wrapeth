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

/**
 * Interface for depositing ETH or native token and receiving wETH
 */
const WrapperForm: React.FC<WrapperFormProps> = ({ action }) => {
  const { ethBalance, wethBalance } = useBalances();
  const { txFeeEther } = useGasFee();

  const formSchema = z.object({
    amount: z.number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
      .min(0, { message: "Amount must be greater than 0" })
      .max(action === 'deposit' ? +ethBalance - +txFeeEther : +wethBalance, { message: "Input must be less than your full balance, plus transaction fees..." })
  });

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
    if (data.amount > 0 && action === 'deposit' && writeDeposit) writeDeposit();
    else if (data.amount > 0 && action === 'withdraw' && writeWithdraw) writeWithdraw();
  };

  // const customValidations = {
  //   required: 'Input cannot be blank',
  //   validate: (value: number) => {
  //     if (action === 'deposit') {
  //       return value > 0 && value < +ethBalance - +txFeeEther;
  //     }
  //     return value > 0 && value <= +wethBalance;
  //   },
  //   max: {
  //     value: action === 'deposit' ? +ethBalance - +txFeeEther : +wethBalance,
  //     message: `Input must be less than your full balance, plus transaction fees...`,
  //   },
  //   min: {
  //     value: 0,
  //     message: 'Value must be greater than 0',
  //   },
  // };

  return (
    <div className='mt-6'>
      <div className='flex justify-center md:justify-end my-3'>
        <TokenInfo deposit={action === 'deposit'} />
      </div>
      <Form {...localForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
            name='amount'
            render={({ field: { ref, ...restField } }) => (
              <FormItem>
                <FormControl className='text-white'>
                  <div className="flex flex-col md:flex-row w-full items-center space-y-2 md:space-y-0 md:space-x-2">
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
