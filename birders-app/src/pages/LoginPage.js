import React, { useContext, useState } from "react";
import AuthContext from "../components/AuthProvider";
import GoogleButton from "react-google-button";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { PageTitle, Content } from "../elements/Common";
import Button from "../components/Button";
import UserProfile from "../components/UserProfile";

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
  if (isLoggedIn) {
    return <Navigate to="/"></Navigate>;
  } else {
    return (
      <Content>
        <LoginContainer>
          <Wrapper>
            <PageTitle>LOGIN</PageTitle>
            <p>{!isLoggedIn ? "로그인 후 서비스를 이용할 수 있어요." : ""}</p>
            <form onSubmit={handleSubmit}>
              <label>이메일: </label>
              <LoginInput>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={userInputs.email}
                  placeholder="Email"
                />
              </LoginInput>

              <br />
              <label>패스워드: </label>
              <LoginInput>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={userInputs.password}
                  placeholder="Password"
                />
              </LoginInput>

              <LoginInput>
                <input type="submit" value="로그인" />
              </LoginInput>
            </form>
            <P> OR</P>
            {isLoggedIn && <UserProfile userInfo={user} />}
            {isLoggedIn ? (
              <Button _onClick={logOut} margin="0.5rem auto">
                로그아웃
              </Button>
            ) : (
              <GoogleButton onClick={() => logIn("google")} name="google" />
            )}
          </Wrapper>
        </LoginContainer>
      </Content>
    );
  }
};

export default LoginPage;
const P = styled.p`
  text-align: center;
`;
const Wrapper = styled.div`
  display: flex;
  width: 240px;
  flex-direction: column;
`;
const LoginContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const LoginInput = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: flex-start;

  & input {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    outline: none;
    margin: 0.5rem 0;
    border-radius: 4px;
    border: 1px solid gray;
    min-height: 2rem;
    font-size: ${(props) => (props.font_size ? props.font_size : "14px")};
    color: rgb(33, 37, 41);
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
  }
  & input[type="submit"] {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    outline: none;
    border: 1px solid gray;
    margin: 0.5rem 0;
    border-radius: 4px;
    border: 0;
    min-height: 2rem;
    font-size: ${(props) => (props.font_size ? props.font_size : "14px")};
    color: white;
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
    cursor: pointer;
    background-color: #006e5f;
  }

  & input[type="button"] {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    outline: none;
    margin: 0.5rem 0;
    border-radius: 4px;
    min-height: 2rem;
    font-size: ${(props) => (props.font_size ? props.font_size : "14px")};
    color: black;
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
    cursor: pointer;
    background-color: #d3dde4;
    border: 0;
  }
`;
