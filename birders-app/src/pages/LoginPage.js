import React, { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const value = useContext(UserContext);
  console.log(1, value.name);
  // Google
  const [userData, setUserData] = useState(null);

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
    value.name = nickname;
    console.log(2, value.name);
    alert(`${nickname} and ${password}`);
  };

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console로 들어온 데이터 표시
      })
      .catch((err) => {
        console.log(err);
      });
  }
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

      <button onClick={handleGoogleLogin}>Google Login</button>
      {userData ? userData.displayName : null}
    </div>
  );
}
