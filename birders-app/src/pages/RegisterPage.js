import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function RegisterPage() {
  //Email
  const [userInputs, setUserInputs] = useState({
    nickname: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nickname, password } = userInputs;
    alert(`${nickname} and ${password}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>닉네임: </label>
        <input
          type="text"
          name="nickname"
          onChange={handleChange}
          value={userInputs.nickname}
        />
        <br />
        <label>패스워드: </label>
        <input
          type="text"
          name="password"
          onChange={handleChange}
          value={userInputs.password}
        />
        <input type="submit" value="이메일로 로그인" />
      </form>
    </div>
  );
}
