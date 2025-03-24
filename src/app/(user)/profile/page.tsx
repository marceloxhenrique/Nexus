"use client";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { user } from "@/data/User";

import Image from "next/image";
export default function Profile() {
  const [profilePage, setProfilePage] = useState("articles");
  const handleProfilePage = (page: string) => {
    setProfilePage(page === "articles" ? "articles" : "bio");
  };
  return (
    <section className="flex grow flex-col md:flex-row-reverse">
      <div className="items-left flex flex-row gap-4 px-2 py-8 md:flex-1 md:flex-col md:p-8">
        <Image
          src={user.avatar!}
          width={100}
          height={100}
          alt="avatar"
          className="cursor-pointer"
        ></Image>
        <div className="flex flex-col gap-1">
          <h2 className="flex flex-wrap text-2xl text-custom-text-primary md:text-base">
            {user.name}
          </h2>
          <p className="text-sm text-custom-text-light">
            {user.followers} Followers
          </p>
          <p className="hidden text-custom-text-light md:block">
            {user.profession}
          </p>
        </div>
      </div>
      <div className="md:border-r-[0.01rem] md:border-neutral-400"></div>
      <div className="flex flex-col gap-8 py-10 md:flex-2">
        <h1 className="hidden flex-wrap text-4xl text-custom-text-primary md:flex">
          {user.name}
        </h1>
        <div className="flex flex-row gap-4">
          <Button
            onClick={() => {
              handleProfilePage("articles");
            }}
            variant={"link"}
            className={`px-0 ${profilePage === "articles" ? "underline" : ""}`}
          >
            Articles
          </Button>
          <Button
            onClick={() => {
              handleProfilePage("bio");
            }}
            variant={"link"}
            className={`px-0 ${profilePage === "bio" ? "underline" : ""}`}
          >
            Bio
          </Button>
        </div>
        {profilePage === "articles" ? (
          <section className="flex flex-col gap-4 md:mr-6">
            {/* {user.articles.map((article, index) => (
              <ArticleCard key={index} article={article}></ArticleCard>
            ))} */}
          </section>
        ) : (
          <section className="flex flex-col gap-4">
            <p className="pr-24 text-lg text-custom-text-light">{user.bio}</p>
          </section>
        )}
      </div>
    </section>
  );
}
