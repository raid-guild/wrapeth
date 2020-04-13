import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

export const CONTAINER = styled.div`
  @media (min-width: 786px) {
    width: 60%;
    margin: 0 auto;
    margin-top: 50px;
  }

  label {
    color: $primary;
    font-size: 1.2em;
    font-weight: 400;
  }

  .form-group {
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #ff6565;
  }

  .error-message {
    color: #ff6565;
    padding: 0.5em 0.2em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }
`;

export const DEPOSITFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;
`;

export const BUTTON = styled(Button)`
  border: none;
  font-size: 1.2em;
  font-weight: 400;
`;
