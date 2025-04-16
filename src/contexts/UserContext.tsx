"use client";
import { authClient } from "@/lib/auth-client";
import { UserWithArticles } from "@/lib/types";

import { api } from "@/utils/api";
import { createContext, ReactNode, useEffect, useState } from "react";

type UserType = {
  user: UserWithArticles | undefined;
  setUser: (e: UserWithArticles) => void;
};

export const UserContext = createContext<UserType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = authClient.useSession();
  const [user, setUser] = useState<UserWithArticles | undefined>();
  const getUser = async () => {
    try {
      const response = await api.get(`/users/${session?.session.userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error while getting user : ", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [session]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
