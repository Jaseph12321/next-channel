// src/app/UserContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: string; name: string }| null;
type UserContextType = {
  user: User | null;
  login: (user: {id: string; name: string}) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    const stored = localStorage.getItem('user');
    if(stored){
        try {
            setUser(JSON.parse(stored));
        } catch (e) {
            console.log(e);
            localStorage.removeItem('user');
        }
    }
  },[]);

  const login = (userData: {id: string; name: string})=>{
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () =>{
    localStorage.removeItem('user');
    setUser(null);
  };


  return (
    <UserContext.Provider value={{user,login,logout}}>
        {children}
    </UserContext.Provider>
  )
};



export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
