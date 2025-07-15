"use client";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import { api } from "@/utils/api";
import { useContext, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ArticleWithAuthor } from "@/lib/types";
import Link from "next/link";
import Loading from "./loading";
import { toast } from "sonner";
import { UserContext } from "@/contexts/UserContext";
import { CommentsSection } from "@/components/CommentsSection";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArticleLikes } from "@prisma/client";

function ArticlePage() {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  const { articleslug } = useParams<{ articleslug: string }>();
  const commentSectionRef = useRef<{ focusInput: () => void }>(null);
  const user = useContext(UserContext)?.user;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["articles", articleslug],
    queryFn: async (): Promise<ArticleWithAuthor> => {
      const response = await api.get(`/articles?article=${articleslug}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const addLike = async () => {
    if (!user) {
      router.push("/sign-up");
      return;
    }
    likeMutation.mutate();
  };

  const likeMutation = useMutation({
    mutationFn: async () => {
      await api.post("/article-likes", {
        articleId: data?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles", articleslug] });
    },
    onError: (error) => {
      console.error("Error liking article", error);
      toast.error("Something went wrong. Please try again.");
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/article-likes/${data?.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles", articleslug] });
    },
    onError: (error) => {
      console.error("Error liking article", error);
      toast.error("Something went wrong. Please try again.");
    },
  });

  if (isLoading || !data) {
    return <Loading></Loading>;
  }
  return (
    <main className="mx-auto max-w-3xl py-20">
      <h1 className="text-4xl font-bold text-custom-text-primary">
        {data.title}
      </h1>
      <section className="flex items-center gap-3 py-8 text-sm text-custom-text-light">
        <Link href={`/@${data.authorSlug}`} className="flex items-center gap-2">
          <Avatar className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-[0.01rem] border-neutral-800 bg-zinc-200 text-sm hover:opacity-80 dark:border-white">
            <AvatarImage
              src={
                data.author?.avatar
                  ? NEXT_PUBLIC_AWS_URL + data.author.avatar
                  : undefined
              }
              alt={"Author avatar"}
            />
            <AvatarFallback className="flex w-full items-center justify-center">
              {data.author?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium text-custom-text-primary hover:underline">
            {data.author?.name}
          </p>
        </Link>
        <span className="flex items-center gap-1">
          {new Date(data.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </section>
      <section className="mb-8 flex flex-wrap gap-3 text-sm text-custom-text-light sm:gap-4">
        <span className="flex items-center gap-1">
          {data.readTime} min read
        </span>
        <span className="flex items-center gap-1">
          {data.articleLikes.find(
            (like: ArticleLikes) => like.userSlug === user?.slug,
          ) ? (
            <button
              onClick={() => unlikeMutation.mutate()}
              className="flex cursor-pointer items-center gap-1"
            >
              <Heart
                className={`h-4 w-4 fill-red-500 text-red-500 hover:fill-red-400 hover:text-red-400`}
              />
              {data.likes}
            </button>
          ) : (
            <button
              onClick={addLike}
              className="flex cursor-pointer items-center gap-1"
            >
              <Heart className={`h-4 w-4 hover:text-red-500`} />
              {data.likes}
            </button>
          )}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          {data.commentsCount}
        </span>
      </section>
      <div className="mb-8 w-full max-w-3xl border-b-[0.01rem] border-neutral-400"></div>
      {data.image && (
        <Image
          src={NEXT_PUBLIC_AWS_URL + data.image}
          width={500}
          height={300}
          alt={data.title}
          className="mt-6 rounded-lg"
        />
      )}
      <article className="wrap mt-6 space-y-4 text-lg text-custom-text-light">
        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </article>
      <section className="mt-12 flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-full px-4 py-2 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </section>
      <div className="my-16 w-full max-w-3xl border-b-[0.01rem] border-neutral-400"></div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-custom-text-light">
        {data.articleLikes.find(
          (like: ArticleLikes) => like.userSlug === user?.slug,
        ) ? (
          <Button
            onClick={() => unlikeMutation.mutate()}
            variant="outline"
            className="flex items-center gap-2 border-neutral-400"
          >
            <Heart className="mr-2 h-4 w-4 fill-red-500 text-red-500 hover:fill-red-400 hover:text-red-400" />
            Like ({data.likes})
          </Button>
        ) : (
          <Button
            onClick={addLike}
            variant="outline"
            className="group flex items-center gap-2 border-neutral-400"
          >
            <Heart className="mr-2 h-4 w-4 group-hover:text-red-500" />
            Like ({data.likes})
          </Button>
        )}
        <Button
          onClick={() => commentSectionRef.current?.focusInput()}
          variant="outline"
          className="flex items-center gap-2 border-neutral-400"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Comment ({data.commentsCount})
        </Button>
      </div>
      <CommentsSection
        articleId={data.id}
        ref={commentSectionRef}
      ></CommentsSection>
    </main>
  );
}
export default ArticlePage;
