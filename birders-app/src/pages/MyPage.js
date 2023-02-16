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

const MyPage = () => {
  const context = useContext(AuthContext);
  const { user, isLoggedIn } = context;

  return (
    <Wrapper>
      <Column>
        <PageTitle>My Page...</PageTitle>
        <p>{isLoggedIn ? "로그인" : "로그아웃"} 상태입니다.</p>
        {isLoggedIn && <UserProfile userInfo={user} />}
      </Column>
    </Wrapper>
  );
};

export default MyPage;
