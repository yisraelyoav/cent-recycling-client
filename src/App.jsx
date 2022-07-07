import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useCallback } from "react";

import { AuthContext } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Auth from "./Auth/Auth";
import RandomStuffPage from "./pages/RandomStuff";
import MyStuffPage from "./pages/MyStuff";
import NewItemPage from "./pages/NewItem";

function App() {
  const [token, setToken] = useState(false);
  const [userID, setUserID] = useState(false);
  const login = useCallback((userID, token) => {
    setToken(token);
    console.log(token);
    setUserID(userID);
    console.log(userID);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserID(null);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<RandomStuffPage />} />
        <Route path="/new-item" element={<NewItemPage />} />
        <Route path="/my-stuff" element={<MyStuffPage />} />
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
        isLLoggedIn: !!token,
        token: token,
        userID: userID,
        login: login,
        logout: logout,
      }}
    >
      <Layout>{routes}</Layout>
    </AuthContext.Provider>
  );
}

export default App;
