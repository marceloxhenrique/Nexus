"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AlertCircle,
  Loader2,
  NavigationOff,
  Save,
  Send,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { api } from "@/utils/api";
import { ImageUploader } from "@/components/ImageUploader";
import TextEditor from "@/components/TextEditor";
import { Article } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const articleSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
  tags: z.string().optional(),
});
type ArticleUploadPayload = {
  title: string;
  content: string;
  tags?: string[] | undefined;
  image?: string | null;
  fileType?: string;
  published: boolean;
  id: string;
  slug: string;
  likes: number;
  views: number;
  readTime: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  authorSlug: string;
};
type ArticleFormValues = z.infer<typeof articleSchema>;

export default function Editor() {
  const { articleId } = useParams<{ articleId: string }>();

  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [unpublishDialogOpen, setUnpublishDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  const { data } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: async (): Promise<Article> => {
      const response = await api.get(`/articles/${articleId}`);
      setImagePreview(response.data.image);
      return response.data;
    },
    // staleTime: 5 * 60 * 1000,
    enabled: !!articleId,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    values: {
      title: data?.title ?? "",
      content: data?.content ?? "",
      tags: Array.isArray(data?.tags) ? data.tags.join(", ") : "",
    },
  });

  const watchContent = watch("content");
  const watchTitle = watch("title");
  const watchTags = watch("tags");

  const onSave = async (isPublished: boolean) => {
    saveArticle(isPublished);
  };

  const onPublish = async (isPublished: boolean) => {
    saveArticle(isPublished);
  };
  const unPublish = async (isPublished: boolean) => {
    saveArticle(isPublished);
  };

  const saveArticle = async (isPublished: boolean) => {
    const newArticleData = getValues();
    const articleUploadPayload: ArticleUploadPayload = {
      ...newArticleData,
      tags: newArticleData.tags
        ? newArticleData.tags.split(",").map((tag) => tag.trim())
        : [],
      published: isPublished,
      id: data!.id,
      slug: data!.slug,
      likes: data!.likes,
      views: data!.views,
      readTime: data!.readTime,
      commentsCount: data!.commentsCount,
      createdAt: data!.createdAt,
      updatedAt: data!.updatedAt,
      authorId: data!.authorId,
      authorSlug: data!.authorSlug,
    };
    if (imageFile) {
      articleUploadPayload.image = imageFile.name;
      articleUploadPayload.fileType = imageFile.type;
    }
    saveArticleMutation.mutateAsync(articleUploadPayload);
  };

  const saveArticleMutation = useMutation({
    mutationFn: async (newArticle: ArticleUploadPayload) => {
      const response = await api.put(`/articles/${articleId}`, newArticle);
      return response.data;
    },
    onSuccess: (data, newArticle) => {
      if (data.uploadUrl) {
        axios.put(data.uploadUrl, imageFile, {
          headers: {
            "Content-Type": imageFile?.type,
          },
        });
      }
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles", articleId] });
      if (newArticle.published)
        toast.success("Your article has been published successfully.");
      if (!newArticle.published) {
        toast.success("Your article has been saved successfully.");
      }
      setPublishDialogOpen(false);
      router.push("/profile/myarticles");
    },
    onError: (error) => {
      console.error("Error creating article :", error);
      toast.error("Something went wrong. Please try again.");
      setPublishDialogOpen(false);
    },
  });

  const validateAndOpenPublishDialog = () => {
    if (!watchTitle || watchTitle.length < 5) {
      toast.error("Please add a title with at least 5 characters.");
      return;
    }
    if (!watchContent || watchContent.length < 50) {
      toast.error("Please add content with at least 50 characters.");
      return;
    }
    setPublishDialogOpen(true);
  };

  const handleContentChange = (value: string) => {
    setValue("content", value, { shouldValidate: true });
  };
  const getStatusBadge = (article: Article) => {
    if (article?.published) {
      return (
        <Badge className="bg-green-600 text-lg tracking-wide hover:bg-green-700">
          Published
        </Badge>
      );
    } else if (article?.id) {
      // If it has an ID but not published, it's unpublished
      return (
        <Badge
          variant="outline"
          className="border-red-500 text-lg tracking-wide text-red-500"
        >
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
  const handleDeleteArticle = async () => {
    if (!data?.id) return;
    deleteArticleMutation.mutate();
  };

  const deleteArticleMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/articles/${data?.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles", articleId] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setDeleteDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting article :", error);
      toast.error("Something went wrong. Please try again.");
      setDeleteDialogOpen(false);
    },
  });

  const parsedTags = watchTags
    ? watchTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    : [];

  return (
    <section className="">
      <h1 className="mb-8 flex justify-between gap-4 font-main text-3xl font-bold tracking-tight text-custom-text-primary">
        Edit Article
        {getStatusBadge(data!)}
      </h1>
      <form
        onSubmit={handleSubmit(() => {
          onSave(data?.published ?? false);
        })}
      >
        <Card className="border-0 bg-custom-background shadow-none sm:border-[0.01rem] sm:shadow-lg dark:border-none md:dark:bg-zinc-900">
          <CardContent className="space-y-6 sm:p-6">
            <section className="grid">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter your article title"
                className="mt-2 mb-0.5 text-lg"
                disabled={saveArticleMutation.isPending}
              />
              <span className="h-5 text-sm">
                {errors.title && (
                  <p className="text-error text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </span>
            </section>
            <section className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUploader
                onImageChange={(file: File | null) => {
                  setImageFile(file);
                  if (file) {
                    // Create a preview URL for the UI
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      if (e.target?.result) {
                        setImagePreview(e.target.result as string);
                      }
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setImagePreview(null);
                  }
                }}
                imagePreview={imagePreview}
                isLoading={saveArticleMutation.isPending}
              />
            </section>
            <section className="grid">
              <Label htmlFor="content">Content</Label>
              <Tabs defaultValue="write" className="mt-2">
                <TabsContent value="write">
                  <TextEditor
                    value={watchContent}
                    onChange={handleContentChange}
                  />
                  <input type="hidden" {...register("content")} />
                </TabsContent>
              </Tabs>
              <span className="mt-1 h-5 text-sm">
                {errors.content && (
                  <p className="text-error text-sm text-red-500">
                    {errors.content.message}
                  </p>
                )}
              </span>
            </section>
            <section className="grid">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                {...register("tags")}
                placeholder="nextjs, react, webdev (comma separated)"
                className="mt-2 mb-0.5"
                disabled={saveArticleMutation.isPending}
              />
              <span className="h-5 text-sm">
                <p className="text-xs text-custom-text-light">
                  Add tags to help readers discover your article.
                </p>
              </span>
            </section>
          </CardContent>
          <CardFooter className="sm: flex flex-col items-start gap-8 py-4 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-[0.01rem]"
              disabled={saveArticleMutation.isPending}
            >
              Cancel
            </Button>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="destructive"
                className="border-[0.01rem]"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={saveArticleMutation.isPending}
              >
                {saveArticleMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
                ) : (
                  <Trash2 />
                )}
                Delete Article
              </Button>

              {data?.published ? (
                <Button
                  type="button"
                  className="bg-amber-400 text-custom-text-primary hover:bg-amber-500"
                  onClick={() => setUnpublishDialogOpen(true)}
                  disabled={saveArticleMutation.isPending}
                >
                  {saveArticleMutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
                  )}
                  <NavigationOff />
                  Unpublished
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-green-700 hover:bg-green-600"
                  onClick={validateAndOpenPublishDialog}
                  disabled={saveArticleMutation.isPending}
                >
                  {saveArticleMutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
                  )}
                  <Send />
                  Publish
                </Button>
              )}
              <Button
                type="submit"
                variant="outline"
                className="border-[0.01rem]"
                disabled={saveArticleMutation.isPending}
              >
                {saveArticleMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
                ) : (
                  <Save />
                )}
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-custom-text-primary">
                Publish Article
              </DialogTitle>
              <DialogDescription>
                Review your article before publishing. Once published, it will
                be visible to all readers.
              </DialogDescription>
            </DialogHeader>
            <div className="my-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-custom-text-light">
                  Title
                </h3>
                <p className="font-semibold text-custom-text-primary">
                  {watchTitle}
                </p>
              </div>
              {imagePreview && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-custom-text-light">
                    Cover Image
                  </h3>
                  <Image
                    width={500}
                    height={300}
                    src={NEXT_PUBLIC_AWS_URL + imagePreview}
                    alt="Article cover"
                    className="h-32 w-full rounded-md object-cover"
                  />
                </div>
              )}
              {parsedTags.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-custom-text-light">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {parsedTags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setPublishDialogOpen(false)}
                className="border-[0.01rem]"
                disabled={saveArticleMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onPublish(true);
                }}
                disabled={saveArticleMutation.isPending}
                className="bg-green-700 hover:bg-green-600"
              >
                {saveArticleMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
                ) : (
                  "Confirm & Publish"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-500">Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold text-custom-text-primary">
                "{data?.title}"
              </span>{" "}
              ? This action cannot be undone and will permanently delete this
              article.
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
              disabled={deleteArticleMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteArticle}
              disabled={deleteArticleMutation.isPending}
              className="w-full sm:w-auto"
            >
              {deleteArticleMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
              ) : (
                "Yes, delete article"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={unpublishDialogOpen} onOpenChange={setUnpublishDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-amber-500">
              Unpublish Article
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to unpublish{" "}
              <span className="font-bold text-custom-text-primary">
                "{data?.title}"
              </span>{" "}
              ? You can republish it at any time.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex space-y-4 rounded-md bg-amber-50 p-4">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-700">
                Please note:
              </h3>
              <p className="mt-2 text-sm text-amber-700">This will:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-700">
                <li>Hide the article from other users.</li>
                <li>Hide all likes, comments, and interactions.</li>
              </ul>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setUnpublishDialogOpen(false)}
              className="border-[0.01rem] text-custom-text-primary"
              disabled={saveArticleMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={() => unPublish(false)}
              disabled={saveArticleMutation.isPending}
              className="w-full bg-amber-600 hover:bg-amber-500 sm:w-auto"
            >
              {saveArticleMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
              ) : (
                "Yes, unpublish article"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
