import React, { useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useRoutes,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardPage from "./pages/BoardPage";
import PostPage from "./pages/PostPage";
import EditorPage from "./pages/EditorPage";
import Layout from "./components/Layout";
//import UserStore from "./store/UserContext";
import { AuthContextProvider } from "./components/AuthProvider";
import AuthContext from "./components/AuthProvider";
import EditorPageTest from "./pages/EditorPageTest"; //임시

function App() {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut, emailLogIn } = context;
  // const PrivateRoute = ({ path, ...props }) => {
  //   const context = useContext(AuthContext);
  //   const { user, isLoggedIn, logIn, logOut, emailLogIn } = context;
  //   return user ? <Route path={path} {...props} /> : <Navigate to="/login" />;
  // };
  const routing = useRoutes([
    { path: "/", element: <MainPage /> },
    {
      path: "/board",
      element: <BoardPage />,
      canActivate: () => !!user,
    },
    { path: "/login", element: <LoginPage /> },
  ]);

  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Route>
            {/* <Route path={"/"} element={<MainPage />}></Route>
            <Route path={"/login"} element={<LoginPage />}></Route>
            <Route path={"/register"} element={<RegisterPage />}></Route>
            <Route path={"/board"} element={<BoardPage />}></Route> */}
            {/* <PrivateRoute path="/board" element={<BoardPage />} /> */}
            {/* <Route path={"/post/:id"} element={<PostPage />}></Route>
            <Route path={"/editor"} element={<EditorPage />}></Route>
            <Route path={"/test"} element={<EditorPageTest />}></Route> */}
            {routing}
          </Route>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
