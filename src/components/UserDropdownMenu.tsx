"use client";
import { BookA, LogOut, Settings, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";

export function UserDropdownMenu({ user }: { user: User | undefined }) {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  const router = useRouter();
  const handleUserLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer border-[0.01rem] border-neutral-800 dark:border-white">
            {user?.avatar && (
              <AvatarImage
                src={NEXT_PUBLIC_AWS_URL + user?.avatar}
                alt={user?.name}
              />
            )}
            <AvatarFallback className="bg-neutral-300 font-main">
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 shadow-lg dark:bg-custom-background">
          <DropdownMenuLabel className="text-custom-text-light">
            {user?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/profile/account">
              <DropdownMenuItem className="cursor-pointer">
                <Settings />
                <span>Account</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/profile/myarticles">
              <DropdownMenuItem className="cursor-pointer">
                <BookA />
                <span>My Articles</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleUserLogout}
          >
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
