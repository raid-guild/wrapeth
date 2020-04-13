import React, { useContext } from "react";

import { Formik } from "formik";
import { Form } from "react-bootstrap";

import {
  Web3ConnectContext,
  CurrentUserContext,
  ContractContext,
} from "../contexts/Store";

import { DepositSchema } from "./Validation";
import { CONTAINER, DEPOSITFORM, BUTTON } from "./Form.styled";

export const WithdrawForm = () => {
  const [web3Connect] = useContext(Web3ConnectContext);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [contract] = useContext(ContractContext);

  return (
    <CONTAINER>
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
              .withdraw(weiValue)
              .send({ from: currentUser.username });
            setCurrentUser({
              ...currentUser,
              ...{ wethBalance: +currentUser.wethBalance - values.amount },
            });
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
          isSubmitting,
        }) => (
          <DEPOSITFORM onSubmit={handleSubmit} className="mx-auto">
            <Form.Group controlId="depositForm">
              <Form.Label>Amount of wETH to Unwrap</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Amount to wrap"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                size="lg"
                className={touched.amount && errors.amount ? "error" : null}
              />
              {touched.amount && errors.amount ? (
                <div className="error-message">{errors.amount}</div>
              ) : null}
            </Form.Group>
            <BUTTON
              variant="primary"
              type="submit"
              size="lg"
              block
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading…" : "Submit"}
            </BUTTON>
          </DEPOSITFORM>
        )}
      </Formik>
    </CONTAINER>
  );
};
