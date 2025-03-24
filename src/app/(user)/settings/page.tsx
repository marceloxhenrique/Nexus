"use client";
import Image from "next/image";
import { user } from "@/data/User";
export default function Settings() {
  return (
    <section className="grow">
      <h1>Settings</h1>
      <Image
        src={user.avatar!}
        width={100}
        height={100}
        alt="user-avatar"
      ></Image>
    </section>
  );
}
