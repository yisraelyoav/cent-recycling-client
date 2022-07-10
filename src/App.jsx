import { useState, useCallback, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Auth from "./Auth/Auth";
import RandomStuffPage from "./pages/RandomStuff";
import MyStuffPage from "./pages/MyStuff";
import NewItemPage from "./pages/NewItem";

function App() {
  const [token, setToken] = useState(false);
  const [userID, setUserID] = useState(false);
  const [fName, setFname] = useState(false);
  const login = useCallback((userID, token, fName) => {
    setToken(token);
    setUserID(userID);
    setFname(fName);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userID: userID, fName: fName, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserID(null);
    setFname(null);
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userID, storedData.token, storedData.fName);
    }
  }, [login]);

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
        fName: fName,
        login: login,
        logout: logout,
      }}
    >
      <Layout>{routes}</Layout>
    </AuthContext.Provider>
  );
}

export default App;
