import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthProvider";
import { db } from "../firebaseConfig";
import styled from "styled-components";
import { doc, FieldValue, getDoc, updateDoc } from "firebase/firestore";
import { useParams, Navigate, Link } from "react-router-dom";
import { Content, Tag, Title } from "../elements/Common";
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
    <div>
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
        <input
          type="text"
          name="displayName"
          onChange={handleChange}
          value={userInputs.displayName}
          placeholder="DisplayName"
        />
        <input
          type="text"
          name="photoURL"
          onChange={handleChange}
          value={userInputs.photoURL}
          placeholder="photoURL"
        />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
}
