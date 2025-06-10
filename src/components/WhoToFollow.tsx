import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  slug: string;
  avatar: string;
};

export default function WhoToFollow() {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  const [users, setUsers] = useState<User[]>();
  const getUsers = async () => {
    try {
      const res = await api.get("who-to-follow");
      setUsers(res.data.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg mt-18 hidden w-full flex-wrap pl-10 xl:block">
      <h2 className="font-secondary text-2xl font-bold text-custom-text-primary">
        Who to follow
      </h2>
      <ul className="">
        {users &&
          users.map((user) => (
            <li
              key={user?.id}
              className="my-8 flex items-center justify-between gap-4"
            >
              <Link
                href={`/@${user?.slug}`}
                className="flex items-center gap-2"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-custom-text-primary">
                  <Avatar className="flex items-center justify-center bg-zinc-200 text-sm">
                    <AvatarImage
                      src={
                        user?.avatar
                          ? NEXT_PUBLIC_AWS_URL + user?.avatar
                          : undefined
                      }
                      alt="User avatar"
                    />
                    <AvatarFallback>
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </span>
                <p className="max-w-[14em] overflow-hidden text-custom-text-primary">
                  {user?.name}
                </p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
