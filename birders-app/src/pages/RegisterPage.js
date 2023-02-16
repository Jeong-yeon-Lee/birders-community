import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthProvider";
import { db } from "../firebaseConfig";
import styled from "styled-components";
import { doc, FieldValue, getDoc, updateDoc } from "firebase/firestore";
import { useParams, Navigate, Link } from "react-router-dom";
import { Content, PageTitle, Tag, Title } from "../elements/Common";
import Button from "../components/Button";

export default function RegisterPage() {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut, signUp } = context;
  //Email
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    displayName: "",
    photoURL: "",
  });
  const handleChange = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, displayName, photoURL } = userInputs;
    // alert(`${email} and ${password}`);

    signUp(email, password, displayName, photoURL);
  };

  return (
    <Content>
      <LoginContainer>
        <Wrapper>
          <PageTitle>SIGN UP</PageTitle>
          <p>{!isLoggedIn ? "환영합니다!" : ""}</p>
          <form onSubmit={handleSubmit}>
            <label>이메일: </label>
            <Box>
              <LoginInput>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={userInputs.email}
                  placeholder="user@email.com"
                />
              </LoginInput>
              <CheckButton>중복체크</CheckButton>
            </Box>

            <Helper>(필수)중복체크를 해주세요</Helper>
            <label>패스워드: </label>
            <LoginInput>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={userInputs.password}
                placeholder="6자리 이상의 password"
              />
            </LoginInput>
            <Helper>(필수)6자리 이상의 숫자, 문자 혼용해주세요</Helper>
            <label>닉네임: </label>
            <LoginInput>
              <input
                type="text"
                name="displayName"
                onChange={handleChange}
                value={userInputs.displayName}
                placeholder="참참새"
              />
            </LoginInput>
            <Helper>(필수)독특한 닉네임을 지어주세요</Helper>
            <label>프로필사진 URL: </label>
            <LoginInput>
              <input
                type="text"
                name="photoURL"
                onChange={handleChange}
                value={userInputs.photoURL}
                placeholder="예시-https://images.unsplash.com/photo-144446..."
              />
            </LoginInput>
            <Helper>(선택)프로필사진 웹이미지 주소를 입력하세요</Helper>
            <LoginInput>
              <input type="submit" value="회원가입" />
            </LoginInput>
          </form>
        </Wrapper>
      </LoginContainer>
    </Content>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: between;
`;
const CheckButton = styled.button`
  max-width: 80px;
  box-sizing: border-box;
  width: 100%;
  resize: none;
  padding: 0.5rem 0.75rem;
  margin: 0.5rem 0 0.5rem 0.25rem;
  outline: none;
  border: 1px solid #006e5f;
  border-radius: 4px;
  min-height: 2rem;
  font-size: 14px;
  color: #006e5f;
  line-height: 1.75;
  cursor: pointer;
  background-color: white;
`;
const Helper = styled.p`
  font-size: 12px;
  color: #006e5f;
  margin: 0.05rem 0 0.75rem 0;
`;
const Wrapper = styled.div`
  display: flex;
  width: 280px;
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
    border: 1px solid #006e5f;
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
