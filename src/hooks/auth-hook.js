import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userID, setUserID] = useState(false);
  const [fName, setFname] = useState(false);
  const login = useCallback((userID, token, fName, expirationDate) => {
    setToken(token);
    setUserID(userID);
    setFname(fName);
    const tokenExpirationDuration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 30);
    setTokenExpirationDate(tokenExpirationDuration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userID: userID,
        fName: fName,
        token: token,
        expiration: tokenExpirationDuration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserID(null);
    setFname(null);
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userID,
        storedData.token,
        storedData.fName,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const tokenRemainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, tokenRemainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userID, fName};
};
