import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { formatJWTTokenToUser } from "../../utils";
import { USER_BASE_URL } from "../../constants/url.constant";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      return;
    }
    async function fetchUser() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const { userId } = formatJWTTokenToUser(token);
        if (userId) {
          try {
            const response = await axios.get(USER_BASE_URL + userId, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.status !== 200) {
              throw new Error("Failed to fetch user data");
            }
            setLoggedInUser(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
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
