import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  //EmailAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
  logIn: () => {},
  emailLogIn: (email, password) => {},
  logOut: () => {},
  signUp: (email, password, displayName, photoURL) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  //const [isLoggedIn, setIsLoggedIn] = useState({});

  //social logins
  const logIn = (providerName) => {
    let provider;
    if (providerName === "google") {
      provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    }
  };

  //email login
  const emailLogIn = async (email, password) => {
    try {
      let data = await signInWithEmailAndPassword(auth, email, password);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const emailLogIn = () => {
  //   //const provider = new EmailAuthProvider();
  //   //signInWithPopup(auth, provider);
  // };
  const logOut = () => {
    signOut(auth);
  };

  const signUp = async (email, password, displayName, photoURL) => {
    try {
      let data = await createUserWithEmailAndPassword(auth, email, password);
      console.log(data);
      if (data) {
        updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        })
          .then(() => {
            // Profile updated!
            // ...
            console.log("Profile updated!");
          })
          .catch((error) => {
            // An error occurred
            // ...
            console.log("An error occurred");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const authContext = {
    user,
    isLoggedIn: !!user?.accessToken,
    logIn,
    logOut,
    signUp,
    emailLogIn,
  };

  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //setIsLoggedIn(!!user?.accessToken);
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
