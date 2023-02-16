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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  //social logins
  const logIn = async (providerName) => {
    let provider;
    if (providerName === "google") {
      provider = new GoogleAuthProvider();
      try {
        let data = signInWithPopup(auth, provider).then(() => {
          navigate("/");
        });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  //email login
  const emailLogIn = async (email, password) => {
    try {
      let data = await signInWithEmailAndPassword(auth, email, password).then(
        () => {
          navigate("/");
        }
      );
      //console.log(data);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
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
      let data = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        console.log(errorCode);
        if (errorCode === "auth/email-already-in-use") {
          alert("이미 있는 계정이에요, 로그인해주세요.");
        } else {
          alert("오류! 다시 시도해주세요.");
        }
      });
      //console.log(data);
      if (data) {
        updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        })
          .then(() => {
            // Profile updated!
            // ...

            alert("회원가입을 축하합니다.");
            navigate("/");
          })
          .catch((error) => {
            // An error occurred
            // ...
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
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
