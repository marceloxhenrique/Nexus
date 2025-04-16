"use client";

import type { Article } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/utils/api";
import { toast } from "sonner";

export function MyArticlesList({
  articles,
}: {
  articles: Article[] | undefined;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = (article: Article) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
  };

  const handleDeleteArticle = async () => {
    if (!articleToDelete?.id) return;
    setIsLoading(true);
    try {
      const response = await api.delete(`/articles/${articleToDelete?.id}`);
      toast.success("Article deleted");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error while deleting article: ", error);
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const getStatusBadge = (article: Article) => {
    if (article.published) {
      return (
        <Badge className="bg-green-600 hover:bg-green-700">Published</Badge>
      );
    } else if (article.id) {
      // If it has an ID but not published, it's unpublished
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          Unpublished
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="border-orange-500 text-orange-500">
          Draft
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-4">
      {!articles || articles.length === 0 ? (
        <div className="rounded-md bg-muted p-8 text-center">
          <p className="text-custom-text-light">
            You haven't written any articles yet.
          </p>
          <Link href="/new-article">
            <Button className="mt-4 bg-green-700 hover:bg-green-600">
              Write your first article
            </Button>
          </Link>
        </div>
      ) : (
        articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col gap-6 border-b border-gray-100 py-6 last:border-0 md:flex-row"
          >
            <div className="order-2 flex-1 md:order-1">
              <Link
                href={`/${article.authorSlug}/${article.slug}`}
                className="group block"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-lg">
                  <h3 className="font-semibold text-custom-text-primary">
                    {article.title}
                  </h3>
                  {getStatusBadge(article)}
                </div>

                <p
                  className="mt-2 line-clamp-2 text-sm text-custom-text-light"
                  dangerouslySetInnerHTML={{
                    __html: article.content.slice(0, 137) + "...",
                  }}
                ></p>
              </Link>

              <div className="mt-2 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-custom-text-light">
                <div className="text-sm">
                  {new Date(article.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • {article.readTime} min read
                </div>

                <div className="flex space-x-1">
                  <Link href={`/articles/edit/${article.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      disabled={isLoading}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">
                        Edit
                      </span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleDeleteClick(article)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only md:not-sr-only md:ml-2">
                      Delete
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 md:w-1/3">
              {/* <Link href={`/articles/${article.slug}`} className="block"> */}

              <Image
                src={article.image || "/placeholder.svg?height=200&width=200"}
                alt={article.title}
                className="h-40 w-full rounded-md object-cover"
                width={400}
                height={300}
              />
              {/* </Link> */}
            </div>
          </div>
        ))
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{articleToDelete?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-[0.01rem]"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteArticle}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
              ) : (
                "Delete Article"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
