"use client";
import { notFound, useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ArticleCard from "@/components/ArticleCard";
import { api } from "@/utils/api";
import { useContext, useEffect, useState } from "react";
import {
  ArticleWithAuthor,
  FollowerWithUser,
  FollowingWithUser,
} from "@/lib/types";
import { User, Article } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/contexts/UserContext";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Followers from "./followers";
import Following from "./following";

export default function PublicProfilePage() {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [followers, setFollowers] = useState<FollowerWithUser[]>([]);
  const [following, setFollowing] = useState<FollowingWithUser[]>([]);
  const [articles, setArticles] = useState<ArticleWithAuthor[]>([]);
  const [notFoundUser, setNotFoundUser] = useState(false);
  const { username } = useParams<{ username: string }>();
  const user = useContext(UserContext)?.user;
  const router = useRouter();

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await api.get(`/follow?slug=${userSlug}`);
        setFollowers(response.data.followers);
        isFollowing(response.data.followers);
        setFollowing(response.data.following);
      } catch (error) {
        console.error("Error while retriving followers: ", error);
      }
    };
    getFollowers();
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
    getUser();
  }, [user]);

  let userSlug = decodeURIComponent(username);
  if (!userSlug.startsWith("@")) return notFound();
  userSlug = userSlug.slice(1);

  const isFollowing = async (listOfFollowers: FollowerWithUser[]) => {
    const isfollowing = listOfFollowers.find(
      (follower: FollowerWithUser) => follower.followerSlug == user?.slug,
    );
    if (isfollowing !== undefined) {
      setIsFollower(true);
    }
  };

  const addFollower = async () => {
    if (!user) {
      router.push("/sign-up");
      return;
    }
    try {
      await api.post(`/follow`, {
        followingSlug: profileUser?.slug,
      });
      toast.success(`You are now following ${profileUser?.name}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error while following user: ", error);
    }
  };

  if (notFoundUser) {
    return notFound();
  }

  const unfollow = async () => {
    try {
      await api.delete(`/follow/${userSlug}`);
      toast.success(`You are no more following ${profileUser?.name}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error while unfollowing user: ", error);
    }
  };
  return (
    <main className="flex w-full grow bg-custom-background">
      <section className="mx-auto flex w-full max-w-[80rem] grow flex-col justify-between gap-4 px-0 py-10 lg:flex-row-reverse">
        <div className="mb-12 flex flex-col gap-2 lg:w-full lg:max-w-[24rem] lg:flex-col">
          <div className="lg:fixed">
            <div className="flex items-center gap-2">
              <Avatar className="size-15 border-[0.01rem] border-neutral-800 dark:border-white">
                <AvatarImage
                  src={
                    profileUser?.avatar
                      ? NEXT_PUBLIC_AWS_URL + profileUser.avatar
                      : undefined
                  }
                  alt={profileUser?.name}
                />
                <AvatarFallback className="text-2xl text-custom-primary">
                  {profileUser?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>
                <p className="text-md flex-wrap font-bold text-custom-text-primary">
                  {profileUser?.name.charAt(0).toUpperCase()}
                  {profileUser?.name.slice(1)}
                </p>
                <p className="break-all text-custom-text-light">
                  @{profileUser?.slug}
                </p>
              </span>
            </div>
            <section className="space-y-4">
              <p className="text-custom-text-light">
                {profileUser?.occupation}
              </p>
              <div className="flex flex-col gap-4 text-custom-text-primary">
                <div className="flex flex-wrap gap-3 font-bold">
                  <span className="flex">
                    {articles.length}
                    <p className="ml-1 text-custom-text-light">Articles</p>
                  </span>
                  <span className="flex">
                    {followers.length}
                    <p className="ml-1 text-custom-text-light">Followers</p>
                  </span>
                  <span className="flex">
                    {following.length}
                    <p className="ml-1 text-custom-text-light">Following</p>
                  </span>
                </div>
                {isFollower ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-full max-w-sm" variant={"outline"}>
                        Following
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 space-y-4 bg-custom-background p-4">
                      <div className="text-sm">
                        Are you sure you want to unfollow
                        <strong> {profileUser?.name}</strong>?
                      </div>
                      <div className="flex justify-between gap-3">
                        <PopoverClose asChild className="flex-1">
                          <Button variant="outline">Cancel</Button>
                        </PopoverClose>
                        <PopoverClose asChild className="flex-1">
                          <Button
                            variant="default"
                            className="flex-1"
                            onClick={unfollow}
                          >
                            Unfollow
                          </Button>
                        </PopoverClose>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Button
                    variant={"default"}
                    onClick={addFollower}
                    className="max-w-sm"
                  >
                    Follow
                  </Button>
                )}
              </div>
              {profileUser?.socials && profileUser.socials.length > 0 && (
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                  {profileUser.socials.map((social) => (
                    <a
                      key={social}
                      href={social}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-custom-text-primary hover:underline"
                    >
                      {new URL(social).hostname.replace("www.", "")}
                    </a>
                  ))}
                </div>
              )}
            </section>
            <Followers followers={followers}></Followers>
            <Following following={following}></Following>
          </div>
        </div>
        <section className="flex flex-col gap-4">
          <h1 className="hidden text-3xl font-bold text-custom-text-primary lg:block">
            {profileUser?.name.charAt(0).toUpperCase()}
            {profileUser?.name.slice(1)}
          </h1>
          <Tabs defaultValue="articles">
            <TabsList>
              <TabsTrigger value="articles" className="cursor-pointer">
                Articles
              </TabsTrigger>
              <TabsTrigger value="about" className="cursor-pointer">
                About
              </TabsTrigger>
            </TabsList>
            <TabsContent value="articles">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleCard key={article.id} article={article}></ArticleCard>
                ))
              ) : (
                <p className="pl-2 text-custom-text-light">No articles yet</p>
              )}
            </TabsContent>
            <TabsContent value="about" className="max-w-3xl">
              {profileUser?.bio ? (
                <p className="py-6 text-custom-primary">{profileUser?.bio}</p>
              ) : (
                <p className="pl-2 text-custom-text-light">No bio yet</p>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </section>
    </main>
  );
}
