"use client";
import { authClient } from "@/lib/auth-client";
import { UserWithArticles } from "@/lib/types";

import { api } from "@/utils/api";
import { useQueries, useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

type UserType = {
  user: UserWithArticles | undefined;
  setUser: (e: UserWithArticles | undefined) => void;
};

export const UserContext = createContext<UserType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = authClient.useSession();
  const [user, setUser] = useState<UserWithArticles | undefined>();

  useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<UserWithArticles> => {
      const response = await api.get(`/users/${session?.session.userId}`);
      setUser(response.data);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!session,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
