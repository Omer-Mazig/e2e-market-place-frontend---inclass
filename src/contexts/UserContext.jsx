import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api.service";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(undefined);

  useEffect(() => {
    if (loggedInUser) {
      return;
    }
    const token = localStorage.getItem("jwt");
    if (!token) return;

    async function fetchUser() {
      try {
        const response = await api.get("/user/loggedInUser");
        setLoggedInUser(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          console.error("Invalid token, logging out");
          localStorage.removeItem("jwt");
          setLoggedInUser(null);
        } else if (error.response.status === 404) {
          console.error("User not found, logging out");
          localStorage.removeItem("jwt");
          setLoggedInUser(null);
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [loggedInUser]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
