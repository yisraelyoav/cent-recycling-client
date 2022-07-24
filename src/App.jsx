import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
// import Auth from "./Auth/Auth";
import RandomStuffPage from "./pages/RandomStuff";
// import MyStuffPage from "./pages/MyStuff";
// import NewItemPage from "./pages/NewItem";
// import UpdateItemPage from "./pages/UpdateItem";
import { useAuth } from "./hooks/auth-hook";
import Loader from "./ui/Loader/Loader";

const Auth = React.lazy(() => import("./Auth/Auth"));
const MyStuffPage = React.lazy(() => import("./pages/MyStuff"));
const NewItemPage = React.lazy(() => import("./pages/NewItem"));
const UpdateItemPage = React.lazy(() => import("./pages/UpdateItem"));

function App() {
  const { token, userID, fName, login, logout } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<RandomStuffPage />} />
        <Route path="/my-stuff" element={<MyStuffPage />} />
        <Route path="/new-item" element={<NewItemPage />} />
        <Route path="/update-item/:itemID" element={<UpdateItemPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<RandomStuffPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userID: userID,
        fName: fName,
        login: login,
        logout: logout,
      }}
    >
      <Layout>
        <Suspense
          fallback={
            <div className="center">
              <Loader />
            </div>
          }
        >
          {routes}
        </Suspense>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
