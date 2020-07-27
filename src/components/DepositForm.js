import React, { useContext } from "react";

import { Formik } from "formik";
import { Form, InputGroup } from "react-bootstrap";

import {
  Web3ConnectContext,
  CurrentUserContext,
  ContractContext,
} from "../contexts/Store";

import { DepositSchema } from "./Validation";
import { CONTAINER, DEPOSITFORM, BUTTON } from "./Form.styled";
import { TokenInfo } from "./TokenInfo";

export const DepositForm = () => {
  const [web3Connect] = useContext(Web3ConnectContext);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [contract] = useContext(ContractContext);

  return (
    <CONTAINER>
      <Formik
        initialValues={{
          amount: "",
        }}
        validationSchema={DepositSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const weiValue = web3Connect.web3.utils.toWei("" + values.amount);
            await contract.methods
              .deposit()
              .send({ value: weiValue, from: currentUser.username });
            setCurrentUser({
              ...currentUser,
              ...{
                wethBalance: +currentUser.wethBalance + values.amount,
                ethBalance: +currentUser.ethBalance - values.amount,
              },
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
          setFieldValue,
        }) => (
          <DEPOSITFORM onSubmit={handleSubmit} className="mx-auto">
            <Form.Group controlId="depositForm">
              <Form.Label><span>{currentUser && currentUser.network.chain}</span></Form.Label>
              <TokenInfo Eth />
              <InputGroup>
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
                <InputGroup.Append>
                  <BUTTON
                    variant="primary"
                    onClick={() =>
                      setFieldValue(
                        "amount",
                        (+currentUser.ethBalance).toPrecision(4)
                      )
                    }
                  >
                    Set Max
                  </BUTTON>
                </InputGroup.Append>
              </InputGroup>
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
