import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardPage from "./pages/BoardPage";
import PostPage from "./pages/PostPage";
import EditorPage from "./pages/EditorPage";
import Layout from "./components/Layout";
import UserStore from "./store/UserContext";

function App() {
  return (
    <>
      <UserStore>
        <Layout>
          <Routes>
            <Route path={"/"} element={<MainPage />}></Route>
            <Route path={"/login"} element={<LoginPage />}></Route>
            <Route path={"/register"} element={<RegisterPage />}></Route>
            <Route path={"/board"} element={<BoardPage />}></Route>
            <Route path={"/post"} element={<PostPage />}></Route>
            <Route path={"/editor"} element={<EditorPage />}></Route>
          </Routes>
        </Layout>
      </UserStore>
    </>
  );
}

export default App;
