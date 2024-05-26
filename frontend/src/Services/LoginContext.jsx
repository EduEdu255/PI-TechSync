import React, { createContext, useState } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  loggedUser: null,
  setIsLoggedIn: () => {},
  setLoggedUser: () => {},
});

export function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial login state
  const [loggedUser, setLoggedUser] = useState(null);

  const handleLogin = (user) => {
    if (!user) {
      return handleLogout();
    }
    setIsLoggedIn(true); // Example login function
    sessionStorage.setItem("loggedUser", JSON.stringify(user));
    setLoggedUser(user);
  };
  const handleLogout = () => {
    setIsLoggedIn(false); // Example logout function
    setLoggedUser(null);
    sessionStorage.setItem("loggedUser", null);
  };

  // You can add more functions to manage login state as needed

  const contextValue = {
    isLoggedIn,
    loggedUser,
    setIsLoggedIn: handleLogin, // Pass the actual function to update state
    setLoggedUser: handleLogin,
    handleLogout, // Can also provide additional helper functions
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
}
