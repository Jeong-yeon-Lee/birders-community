import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const authContext = {
    user,
    isLoggedIn: !!user?.accessToken,
    logIn,
    logOut,
  };

  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      stateChange();
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
