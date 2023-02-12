import React, { useContext, useState } from "react";
import AuthContext from "../components/AuthProvider";
import GoogleButton from "react-google-button";
import styled from "styled-components";
import { PageTitle } from "../elements/Common";
import Button from "../components/Button";
import UserProfile from "../components/UserProfile";

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Column = styled.div``;
const LoginPage = () => {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut } = context;
  //console.log(user);
  return (
    <Wrapper>
      <Column>
        <PageTitle>LOGIN</PageTitle>
        <p>{isLoggedIn ? "로그인" : "로그아웃"} 상태입니다.</p>
        {isLoggedIn && <UserProfile userInfo={user} />}
        {isLoggedIn ? (
          <Button _onClick={logOut} margin="0.5rem auto">
            로그아웃
          </Button>
        ) : (
          <GoogleButton onClick={logIn} />
        )}
      </Column>
    </Wrapper>
  );
};

export default LoginPage;
