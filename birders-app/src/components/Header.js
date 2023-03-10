import React, { useContext } from "react";
import AuthContext from "../components/AuthProvider";

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
  color: ${(props) => (props.color ? props.color : "white")};
`;

export default function Header() {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut, signUp } = context;
  //   console.log(isLoggedIn);
  //console.log(user);
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <StyledTitleLink to="/">Birder's Community</StyledTitleLink>
        </Column>
        <Column>
          {/* <StyledNavLink to="/post">Post</StyledNavLink> */}
          <StyledNavLink to="/board">커뮤니티</StyledNavLink>
        </Column>
        <Column>
          {isLoggedIn && (
            <StyledNavLink to="/my">
              {user?.displayName} 님의 마이페이지
            </StyledNavLink>
          )}
        </Column>
        <Column>
          {isLoggedIn && (
            <div>
              <Button margin="0 0.5rem">
                <ButtonLink to="/editor" color={"#006e5f"}>
                  글쓰기
                </ButtonLink>
              </Button>
              <Button isPrimary={true} _onClick={logOut} margin="0">
                <ButtonLink to="/">LOGOUT</ButtonLink>
              </Button>
            </div>
          )}
          {!isLoggedIn && (
            <div>
              <Button isPrimary={true} margin="0 0.5rem 0 0">
                <ButtonLink to="/login">LOGIN</ButtonLink>
              </Button>
              <Button margin="0">
                <ButtonLink to="/register" color={"#006e5f"}>
                  SIGNUP
                </ButtonLink>
              </Button>
            </div>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
