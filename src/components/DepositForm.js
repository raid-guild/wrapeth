import React, { useContext } from 'react';

import { Formik } from 'formik';
import { Form } from 'react-bootstrap';

import { Web3ConnectContext, CurrentUserContext, ContractContext } from '../contexts/Store';

import { DepositSchema } from './Validation';
import { CONTAINER, DEPOSITFORM, BUTTON } from './Form.styled';

export const DepositForm = () => {
    const [web3Connect] = useContext(Web3ConnectContext);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [contract] = useContext(ContractContext);

    return (
        <CONTAINER>
            <h1>Wrap</h1>
            <div>
                <div>
                    <Formik
                        initialValues={{
                            amount: 0,
                        }}
                        validationSchema={DepositSchema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            try {
                                const weiValue = web3Connect.web3.utils.toWei("" + values.amount);
                                await contract.methods
                                    .deposit()
                                    .send({ value: weiValue, from: currentUser.username });
                                setCurrentUser({ ...currentUser, ...{ wethBalance: +currentUser.wethBalance + values.amount } })           
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
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting }) => (
                                <DEPOSITFORM onSubmit={handleSubmit} className="mx-auto">
                                    <Form.Group controlId="depositForm">
                                        <Form.Label>Amount :</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            placeholder="Amount to wrap"
                                            value={values.amount}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={touched.amount && errors.amount ? "error" : null}
                                        />
                                        {touched.amount && errors.amount ? (
                                            <div className="error-message">{errors.amount}</div>
                                        ) : null}
                                    </Form.Group>
                                    <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Loading…' : 'Submit'}
                                    </BUTTON>
                                </DEPOSITFORM>
                            )}
                    </Formik>

                </div>
            </div>
        </CONTAINER>
    );
};
