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
  const { user, isLoggedIn, logIn, logOut, emailLogIn } = context;

  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userInputs;
    // alert(`${email} and ${password}`);
    emailLogIn(email, password);
  };

  return (
    <Wrapper>
      <Column>
        <PageTitle>LOGIN</PageTitle>
        <p>{isLoggedIn ? "로그인" : "로그아웃"} 상태입니다.</p>
        <p>
          {!isLoggedIn
            ? "로그인하시고 Birder's Community 에서 더 즐겁게 탐조해요!"
            : ""}
        </p>
        <form onSubmit={handleSubmit}>
          <label>이메일: </label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={userInputs.email}
            placeholder="Email"
          />
          <br />
          <label>패스워드: </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userInputs.password}
            placeholder="Password"
          />

          <input type="submit" value="로그인" />
        </form>
        {isLoggedIn && <UserProfile userInfo={user} />}
        {isLoggedIn ? (
          <Button _onClick={logOut} margin="0.5rem auto">
            로그아웃
          </Button>
        ) : (
          <GoogleButton onClick={() => logIn("google")} name="google" />
        )}
      </Column>
    </Wrapper>
  );
};

export default LoginPage;
