import { createContext } from "react";

export const AuthContext = createContext({
  isLLoggedIn: false,
  login: () => {},
  logout: () => {},
});
