import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardPage from "./pages/BoardPage";
import PostPage from "./pages/PostPage";
import EditorPage from "./pages/EditorPage";
import MyPage from "./pages/MyPage";
import Layout from "./components/Layout";
//import UserStore from "./store/UserContext";
import { AuthContextProvider } from "./components/AuthProvider";
import AuthContext from "./components/AuthProvider";
import EditorPageTest from "./pages/EditorPageTest"; //임시

function App() {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut, emailLogIn } = context;

  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path={"/"} element={<MainPage />}></Route>
            <Route path={"/login"} element={<LoginPage />}></Route>
            <Route path={"/register"} element={<RegisterPage />}></Route>
            <Route
              path={"/board"}
              element={isLoggedIn ? <BoardPage /> : <LoginPage />}
            ></Route>
            <Route
              path={"/post/:id"}
              element={isLoggedIn ? <PostPage /> : <LoginPage />}
            ></Route>
            <Route
              path={"/editor"}
              element={isLoggedIn ? <EditorPage /> : <LoginPage />}
            ></Route>
            <Route
              path={"/my"}
              element={isLoggedIn ? <MyPage /> : <MainPage />}
            ></Route>
            <Route path={"/test"} element={<EditorPageTest />}></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
