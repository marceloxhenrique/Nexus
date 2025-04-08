"use client";
import { MyArticlesList } from "./my-articles-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function MyArticlesPage() {
  const user = useContext(UserContext)?.user;
  return (
    <section className="lg:p-6">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-custom-text-primary">
          My Articles
        </h2>
        <Link href="/articles/new">
          <Button className="bg-green-700 hover:bg-green-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>
      <MyArticlesList articles={user?.articles} />
    </section>
  );
}
