import { onAuthStateChanged, getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
//current 유저 가져오기

const currentAuthUser = auth.currentUser;
console.log(currentAuthUser);
// if (currentAuthUser !== null) {

//     const displayName = currentAuthUser.displayName;
//     const email = currentAuthUser.email;

//     const uid = currentAuthUser.uid;
//   }

//로그인 정보 전역 관리
export const AuthStateContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    state: "loading",
    isAuthentication: false,
    user: null,
  });

  const onChange = (user) => {
    if (user) {
      setAuthState({
        state: "loaded",
        isAuthentication: true,
        currentAuthUser,
      });
    } else {
      setAuthState({ state: "loaded", isAuthentication: false, user });
    }
  };
  const setError = (error) =>
    setAuthState({ state: "error", isAuthentication: false, user: null });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onChange, setError);
    return () => unsubscribe();
  }, []);

  return (
    <AuthStateContext.Provider value={authState}>
      {children}
    </AuthStateContext.Provider>
  );
};
