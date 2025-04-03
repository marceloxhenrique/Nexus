"use client";
import { notFound, useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ArticleCard from "@/components/ArticleCard";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { ArticleWithAuthor, User, Article } from "@/lib/types";

export default function PublicProfilePage() {
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [articles, setArticles] = useState<ArticleWithAuthor[]>([]);
  const [notFoundUser, setNotFoundUser] = useState(false);
  const { username } = useParams<{ username: string }>();

  let userSlug = decodeURIComponent(username);
  if (!userSlug.startsWith("@")) return notFound();
  userSlug = userSlug.slice(1);
  const getUser = async () => {
    try {
      const response = await api.get(`/users?userslug=${userSlug}`);
      setProfileUser(response.data);
      const formatedArticles = response.data.articles.map(
        (article: Article) => ({
          ...article,
          author: {
            name: response.data.name,
            avatar: response.data.avatar,
          },
        }),
      );
      setArticles(formatedArticles);
    } catch (error) {
      console.error("Error while retriving user: ", error);
      setNotFoundUser(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  if (notFoundUser) {
    return notFound();
  }
  return (
    <section className="flex w-full grow bg-custom-background">
      <div className="mx-auto flex w-full max-w-[80rem] grow flex-col px-4 py-10">
        <div className="mb-12 flex flex-col items-start gap-8 md:flex-row">
          <Avatar className="h-32 w-32">
            <AvatarImage src={profileUser?.avatar} alt={profileUser?.name} />
            <AvatarFallback>
              {profileUser?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <section className="flex-1 space-y-4">
            <div className="flex flex-col justify-between">
              <h1 className="text-3xl font-bold text-custom-text-primary">
                {profileUser?.name.charAt(0).toUpperCase()}
                {profileUser?.name.slice(1)}
              </h1>
              <p className="text-custom-text-light">@{profileUser?.slug}</p>
            </div>
            <p className="text-custom-text-primary">{profileUser?.bio}</p>
            <div className="flex flex-wrap gap-4 text-custom-text-primary">
              <span className="flex font-bold">
                {profileUser?.followers}{" "}
                <p className="ml-1 text-custom-text-light">Followers</p>
              </span>
              <span className="flex font-bold">
                {articles.length}{" "}
                <p className="ml-1 text-custom-text-light">Articles</p>
              </span>
              {profileUser?.occupation && (
                <Badge variant="outline" className="border-[0.01rem]">
                  {profileUser.occupation}
                </Badge>
              )}
            </div>
            {profileUser?.socials && profileUser.socials.length > 0 && (
              <div className="flex gap-2">
                {profileUser.socials.map((social) => (
                  <a
                    key={social}
                    href={social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {new URL(social).hostname.replace("www.", "")}
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>
        <h2 className="py-6 text-2xl font-bold text-custom-text-light">
          Articles
        </h2>
        {articles &&
          articles.map((article) => (
            <ArticleCard key={article.id} article={article}></ArticleCard>
          ))}
      </div>
    </section>
  );
}
