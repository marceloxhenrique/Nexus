import { ArticleWithAuthor } from "@/lib/types";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
export default function MostRead({
  articles,
}: {
  articles: ArticleWithAuthor[];
}) {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  return (
    <div className="bg mt-18 hidden w-full max-w-[26em] pl-10 xl:block">
      <h2 className="font-secondary text-2xl font-bold text-custom-text-primary">
        Most Read
      </h2>
      <ul className="">
        {articles.map((article) => (
          <li key={article.id} className="my-8">
            <Link href={`/articles/${article.slug}`}>
              <span className="flex items-center gap-2 text-sm font-medium text-custom-text-light">
                <Avatar className="flex h-6 w-6 items-center justify-center bg-zinc-200 text-sm">
                  <AvatarImage
                    src={NEXT_PUBLIC_AWS_URL + article.author.avatar!}
                    alt="User avatar"
                  />
                  <AvatarFallback>
                    {article.author.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {article.author.name}
              </span>
              <p className="text-md pt-1 font-semibold text-custom-text-primary">
                {article.title}
              </p>
              <p className="text-sm text-custom-text-light">
                {new Date(article.createdAt).toLocaleDateString("en-IN", {
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
