import React, { useContext, useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { Web3SignIn } from "./components/account/Web3SignIn";
import { CurrentUserContext } from "./contexts/Store";
import { DepositForm } from "./components/DepositForm";
import { WithdrawForm } from "./components/WithdrawForm";
import styled from "styled-components";
import RaidLeft from "./assets/raid--left.png";
import RaidRight from "./assets/raid--right.png";
import logo from "./assets/wrapeth__logo.png";
import raidBrand from "./assets/raidguild__mark.png";
import "./custom.scss";

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
  max-width: 15%;
  pointer-events: none;
  z-index: 0;
  img {
    max-width: 100%;
  }
  @media (max-width: 600px) {
    max-width: 15%;
  }
`;

const RaidRightDiv = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  max-width: 15%;
  pointer-events: none;
  z-index: 0;
  img {
    max-width: 100%;
  }
  @media (max-width: 600px) {
    max-width: 15%;
  }
`;

const CenteredRow = styled(Row)`
  align-items: center;
  justify-content: center;
`;

const CenteredCol = styled(Col)`
  align-items: center;
  justify-content: center;
  p {
    margin-top: 25px;
    text-align: center;
  }
`;

const HeaderRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  h1 {
    color: #ff6565;
  }
  p {
    color: rgba(255, 255, 255, 0.85);
  }
  @media (max-width: 600px) {
    justify-content: center;
    text-align: center;
  }
`;

const BrandDiv = styled.div`
  display: block;

  img {
    display: inline-block;
    width: 100%;
    max-width: 240px;
    height: auto;
  }
  p {
    font-size: 0.75em;
    font-weight: bold;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const AccountDiv = styled.div`
  max-width: 120px;
  display: block;
  p:nth-child(1) {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
    border-radius: 50px;
    padding: 5px 10px;
    border: 2px solid #ff3864;
    position: relative;
    padding-left: 30px;
    &::before {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      content: "";
      display: inline;
      left: 10px;
      height: 10px;
      width: 10px;
      background-color: #ff3864;
    }
  }
  p:nth-child(2) {
    max-width: 120px;
    text-overflow: ellipsis;
    text-align: right;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const FooterDiv = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  img {
    display: block;
    max-width: 300px;
    margin: 0 auto;
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
            <img src={logo} alt="wrapeth" />
            <p>
              No fees, no frills <span>{currentUser?.network.chain}</span>{" "}
              wrapper
            </p>
          </BrandDiv>

          {currentUser?.username ? (
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
              Wrap <span>{currentUser?.network.chain}</span>
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => setWrapEth(false)}
              style={{
                backgroundColor: !wrapEth ? "#ff3864" : "transparent",
                color: !wrapEth ? "white" : "#ff3864",
              }}
            >
              Unwrap w<span>{currentUser?.network.chain}</span>
            </Button>
          </ButtonGroup>
        </CenteredRow>
        {wrapEth && (
          <CenteredCol>
            {currentUser?.username ? (
              <DepositForm />
            ) : (
              <p>
                Connect to Wrap <span>{currentUser?.network.chain}</span>
              </p>
            )}
          </CenteredCol>
        )}
        {!wrapEth && (
          <CenteredCol>
            {currentUser?.username ? (
              <WithdrawForm />
            ) : (
              <p>
                Connect to Unwrap <span>{currentUser?.network.chain}</span>
              </p>
            )}
          </CenteredCol>
        )}
        <FooterDiv>
          <a
            href="https://raidguild.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={raidBrand} alt="Raid Guild" />
          </a>
        </FooterDiv>
      </Container>
    </AppDiv>
  );
}

export default App;
