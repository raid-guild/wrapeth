import React from 'react';

import { Formik, Form } from 'formik';
import {
  Button,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Container,
  InputGroup,
} from '@raidguild/design-system';
import {
  useProvider,
  useAccount,
  useBalance,
  useContract,
  erc20ABI,
} from 'wagmi';

import { ValidAmount } from 'utils/validation';
import { User } from 'types';
import { TokenInfo } from '../TokenInfo';

export interface WrapperFormProps {
  /**
   * Provide the current action selected by the user
   */
  action: string;
}

interface Values {
  amount: string;
}

/**
 * Interface for depositing ETH and receiving wETH
 */
const WrapperForm: React.FC<WrapperFormProps> = ({ action }) => {
  // const { injectedProvider } = useInjectedProvider();
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const contract = useContract({
    addressOrName: 'address',
    contractInterface: erc20ABI,
  });
  const { data, isError, isLoading } = useBalance({ addressOrName: address });

  /*
  const onFormSubmit = async (values: Values) => {
    const weiValue = provider?.utils.toWei('' + values.amount);
    if (isConnected && contract) {
      try {
        if (action === 'deposit') {
          await contract.methods[action]().send({
            value: action === 'deposit' ? weiValue : 0,
            from: address,
          });

          const updatedUser: User = {
            ...address,
            ...{
              wethBalance: (+address?.wethBalance + +values.amount).toString(),
              ethBalance: (+address?.ethBalance - +values.amount).toString(),
            },
          };
        } else {
          await contract.methods[action](weiValue).send({
            value: action === 'deposit' ? weiValue : 0,
            from: address,
          });

          const updatedUser: User = {
            ...address,
            ...{
              wethBalance: (+address?.wethBalance - +values.amount).toString(),
              ethBalance: (+address?.ethBalance + +values.amount).toString(),
            },
          };

          // setCurrentUser(updatedUser);
        }
      } catch (e) {
        console.log('Error: ', e);
      }
    }
  };
  */

  return (
    <Container mt={12}>
      <Formik
        enableReinitialize
        initialValues={{ amount: '' }}
        validationSchema={ValidAmount}
        onSubmit={async (values: Values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            null;
            // onFormSubmit(values);
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => {
          const setMax = () => {
            if (data) {
              setFieldValue(
                'amount',
                action === 'deposit'
                  ? (+data).toPrecision(18)
                  : (+data).toPrecision(18),
              );
            }
          };

          return (
            <Form>
              <FormControl id='depositForm' isRequired>
                <Flex justify='end' my={3}>
                  <TokenInfo deposit={action === 'deposit'} setMax={setMax} />
                </Flex>
                <InputGroup marginBottom='32px'>
                  <NumberInput
                    value={values.amount}
                    color='white'
                    placeholder='Amount to wrap'
                    variant='outline'
                    width='80%'
                    onChange={(e) => {
                      setFieldValue('amount', e);
                    }}
                    onBlur={handleBlur}
                    min={0}
                    max={
                      action === 'deposit'
                        ? data
                          ? +data
                          : 0
                        : data
                        ? +data
                        : 0
                    }
                  >
                    <NumberInputField name='amount' borderRadius='none' />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <Button
                    textStyle='buttonLabel'
                    maxW='120px'
                    variant='outline'
                    // background='transparent'
                    // color='white'
                    // variant='outline'
                    size='lg'
                    h='100%'
                    w='100%'
                    borderRadius='none'
                    onClick={setMax}
                  >
                    Set Max
                  </Button>
                </InputGroup>

                {touched.amount && errors.amount ? (
                  <div className='error-message'>{errors.amount}</div>
                ) : null}
              </FormControl>
              <Button
                variant='solid'
                type='submit'
                isLoading={isSubmitting}
                loadingText='Submitting'
                width='100%'
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default WrapperForm;
