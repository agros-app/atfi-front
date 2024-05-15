"use client";
import { createContext } from "react";

type ProviderProps = {
  children: React.ReactNode;
  session: any;
};

const sessionContext = createContext(null);

const SessionProvider = ({ children, session }: ProviderProps) => {
  return (
    <sessionContext.Provider value={session}>
      {children}
    </sessionContext.Provider>
  );
};

export default SessionProvider;
