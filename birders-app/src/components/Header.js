import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";

const SHeader = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #006e5f;
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTitleLink = styled(Link)`
  text-decoration: none;
  font-size: 22px;
  font-weight: bold;
  color: #006e5f;
`;

const StyledNavLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: #757677;
  margin-right: 1rem;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: white;
`;

export default function Header() {
  const login = () => {
    console.log("로그인");
  };
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <StyledTitleLink to="/">Birder's Community</StyledTitleLink>
        </Column>
        <Column>
          <StyledNavLink to="/post">Post</StyledNavLink>
          <StyledNavLink to="/board">Board</StyledNavLink>
        </Column>
        <Column>
          <Button isPrimary={true} _onClick={login} margin="0">
            <ButtonLink to="/login">LOGIN</ButtonLink>
          </Button>
        </Column>
      </Wrapper>
    </SHeader>
  );
}
