import React, { useContext, useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { Web3SignIn } from "./components/account/Web3SignIn";
import { CurrentUserContext } from "./contexts/Store";
import { DepositForm } from "./components/DepositForm";
import { WithdrawForm } from "./components/WithdrawForm";
import styled from "styled-components";
import RaidLeft from "./assets/raid--left.png";
import RaidRight from "./assets/raid--right.png";

const AppDiv = styled.div`
  background-color: black;
  min-height: 100vh;
  min-width: 100vw;
  position: relative;
`;

const RaidLeftDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  max-width: 25%;
  pointer-events: none;
  z-index: 0;
  img {
    max-width: 100%;
  }
`;

const RaidRightDiv = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  max-width: 25%;
  pointer-events: none;
  z-index: 0;
  img {
    max-width: 100%;
  }
`;

const CenteredRow = styled(Row)`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CenteredCol = styled(Col)`
  align-items: center;
  justify-content: center;
`;

const HeaderRow = styled(Row)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  h1 {
    color: #ff6565;
  }
  p {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const BrandDiv = styled.div`
  max-width: 240px;
`;

const AccountDiv = styled.div`
  max-width: 240px;

  p:nth-child(1) {
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
  p:nth-child(2) {
    max-width: 240px;
    text-overflow: ellipsis;
    text-align: right;
  }
`;

function App() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [wrapEth, setWrapEth] = useState(true);

  return (
    <AppDiv>
      <RaidLeftDiv>
        <img alt="" src={RaidLeft} />
      </RaidLeftDiv>
      <RaidRightDiv>
        <img alt="" src={RaidRight} />
      </RaidRightDiv>
      <Container>
        <HeaderRow>
          <BrandDiv>
            <h1>
              <span className="Outline">WRAP</span>ETH
            </h1>
            <p>No fees, no frills eth wrapper.</p>
          </BrandDiv>

          {currentUser && currentUser.username ? (
            <AccountDiv>
              <p>{currentUser.username}</p>
            </AccountDiv>
          ) : (
            <AccountDiv>
              <Web3SignIn setCurrentUser={setCurrentUser} />
            </AccountDiv>
          )}
        </HeaderRow>
        <CenteredRow>
          <ButtonGroup style={{ marginTop: "50px" }}>
            <Button
              variant="outline-primary"
              onClick={() => setWrapEth(true)}
              style={{
                backgroundColor: wrapEth ? "#ff3864" : "transparent",
                color: wrapEth ? "white" : "#ff3864",
              }}
            >
              Wrap ETH
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => setWrapEth(false)}
              style={{
                backgroundColor: !wrapEth ? "#ff3864" : "transparent",
                color: !wrapEth ? "white" : "#ff3864",
              }}
            >
              Unwrap ETH
            </Button>
          </ButtonGroup>
        </CenteredRow>
        {wrapEth && (
          <CenteredCol>
            {currentUser && currentUser.username ? (
              <DepositForm />
            ) : (
              <p>Connect to Wrap Eth</p>
            )}
          </CenteredCol>
        )}
        {!wrapEth && (
          <CenteredCol>
            {currentUser && currentUser.username ? (
              <WithdrawForm />
            ) : (
              <p>Connect to Unwrap Eth</p>
            )}
          </CenteredCol>
        )}
      </Container>
    </AppDiv>
  );
}

export default App;
