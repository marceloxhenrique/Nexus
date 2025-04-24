"use client";

import type { Article } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Edit, Loader2, Trash2 } from "lucide-react";
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
                href={
                  article.published
                    ? `/${article.authorSlug}/${article.slug}`
                    : `myarticles/edit/${article.id}`
                }
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
                  <Link href={`myarticles/edit/${article.id}`}>
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
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  className="h-40 w-full rounded-md object-cover"
                  width={400}
                  height={300}
                />
              )}
            </div>
          </div>
        ))
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-500">Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{articleToDelete?.title}" ? This
              action cannot be undone and will permanently delete this article.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex space-y-4 rounded-md bg-red-50 p-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-700">Warning</h3>
              <p className="mt-2 text-sm text-red-700">This will:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700">
                <li>Delete your article permanently</li>
                <li>Delete all likes, comments and interactions</li>
              </ul>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-[0.01rem] text-custom-text-primary"
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
                "Yes, delete article"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
