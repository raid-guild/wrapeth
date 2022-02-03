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
import { useInjectedProvider } from 'contexts/injectedProviderContext';
import { useCurrentUser } from 'contexts/currentUserContext';
import { useContract } from 'contexts/contractContext';
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
  const { injectedProvider } = useInjectedProvider();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { contract } = useContract();

  const onFormSubmit = async (values: Values) => {
    const weiValue = injectedProvider.utils.toWei('' + values.amount);
    if (currentUser && contract) {
      try {
        if (action === 'deposit') {
          await contract.methods[action]().send({
            value: action === 'deposit' ? weiValue : 0,
            from: currentUser?.username,
          });

          const updatedUser: User = {
            ...currentUser,
            ...{
              wethBalance: (
                +currentUser.wethBalance + +values.amount
              ).toString(),
              ethBalance: (+currentUser.ethBalance - +values.amount).toString(),
            },
          };

          setCurrentUser(updatedUser);
        } else {
          await contract.methods[action](weiValue).send({
            value: action === 'deposit' ? weiValue : 0,
            from: currentUser?.username,
          });

          const updatedUser: User = {
            ...currentUser,
            ...{
              wethBalance: (
                +currentUser.wethBalance - +values.amount
              ).toString(),
              ethBalance: (+currentUser.ethBalance + +values.amount).toString(),
            },
          };

          setCurrentUser(updatedUser);
        }
      } catch (e) {
        console.log('Error: ', e);
      }
    }
  };

  return (
    <Container mt={12}>
      <Formik
        enableReinitialize
        initialValues={{ amount: '' }}
        validationSchema={ValidAmount}
        onSubmit={async (values: Values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            onFormSubmit(values);
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
        }) => (
          <Form>
            <FormControl id='depositForm' isRequired>
              <Flex justify='end'>
                <TokenInfo deposit={action === 'deposit'} />
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
                      ? currentUser?.ethBalance
                        ? +currentUser.ethBalance
                        : 0
                      : currentUser?.wethBalance
                      ? +currentUser.wethBalance
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
                  onClick={() => {
                    if (currentUser?.ethBalance) {
                      setFieldValue(
                        'amount',
                        action === 'deposit'
                          ? (+currentUser.ethBalance).toPrecision(18)
                          : (+currentUser.wethBalance).toPrecision(18),
                      );
                    }
                  }}
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
        )}
      </Formik>
    </Container>
  );
};

export default WrapperForm;
