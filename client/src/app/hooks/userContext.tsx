"use client"
// UserContext.js

import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface UserContextType {
    user: any,
    login:  Dispatch<SetStateAction<any>>,
    logout: Dispatch<SetStateAction<any>>,
}

interface userProviderProps {
    children: ReactNode;
  }

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }:userProviderProps) => {
  const [user, setUser] = useState(null);

  const login = (userData:any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};