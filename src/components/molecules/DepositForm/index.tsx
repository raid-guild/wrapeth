import React from 'react';

import { Formik, Form } from 'formik';
import { useInjectedProvider } from '../../../contexts/injectedProviderContext';
import { useCurrentUser } from '../../../contexts/currentUserContext';
import { useContract } from '../../../contexts/contractContext';
import { ValidAmount } from '../../../utils/validation';
import { Button } from '@chakra-ui/button';
import {
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Spacer,
  FormLabel,
  Container,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { User } from '../../../types';
import { TokenInfo } from '../TokenInfo';

export interface DepositFormProps {
  /**
   * Provide the address of the connected user
   */
  children?: any;
}

interface Values {
  amount: string;
}

/**
 * Interface for depositing ETH and receiving wETH
 */
export const DepositForm: React.FC<DepositFormProps> = () => {
  const { injectedProvider } = useInjectedProvider();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { contract } = useContract();

  const onFormSubmit = async (values: Values) => {
    const weiValue = injectedProvider.utils.toWei('' + values.amount);
    if (currentUser && contract) {
      try {
        await contract.methods
          .deposit()
          .send({ value: weiValue, from: currentUser?.username });

        //TODO updating balances and typing
        const updatedUser: User = {
          ...currentUser,
          ...{
            wethBalance: (+currentUser.wethBalance + +values.amount).toString(),
            ethBalance: (+currentUser.ethBalance - +values.amount).toString(),
          },
        };

        setCurrentUser(updatedUser);
      } catch (e) {
        console.log('Error: ', e);
      }
    }
  };

  return (
    <Container>
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
              <HStack>
                <FormLabel>{currentUser?.network?.chain}</FormLabel>
                <Spacer />
                <TokenInfo deposit />
              </HStack>
              <InputGroup marginBottom='5px'>
                <NumberInput
                  value={values.amount}
                  textColor='white'
                  placeholder='Amount to wrap'
                  precision={4}
                  variant='outline'
                  width='80%'
                  onChange={(e) => {
                    console.log(e);
                    setFieldValue('amount', e);
                  }}
                  onBlur={handleBlur}
                  min={0}
                  max={currentUser?.ethBalance ? +currentUser.ethBalance : 0}
                >
                  <NumberInputField name='amount' borderRightRadius='none' />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <InputRightAddon m={0} p={0}>
                  <Button
                    variant='solid'
                    size='lg'
                    h='100%'
                    w='100%'
                    borderLeftRadius='none'
                    onClick={() => {
                      if (currentUser?.ethBalance) {
                        setFieldValue(
                          'amount',
                          (+currentUser.ethBalance).toPrecision(4),
                        );
                      }
                    }}
                  >
                    Set Max
                  </Button>
                </InputRightAddon>
              </InputGroup>

              {touched.amount && errors.amount ? (
                <div className='error-message'>{errors.amount}</div>
              ) : null}
            </FormControl>
            <Button
              variant='solid'
              type='submit'
              size='lg'
              block
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
