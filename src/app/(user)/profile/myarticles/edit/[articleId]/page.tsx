"use client";
import { useEffect, useState } from "react";
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
const articleSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
  tags: z.string().optional(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export default function Editor() {
  const { articleId } = useParams<{ articleId: string }>();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [unpublishDialogOpen, setUnpublishDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [article, setArticle] = useState<Article | null>();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await api.get(`/articles/${articleId}`);
        setArticle(response.data);
        setImagePreview(response.data.image);
      } catch (error) {
        console.error("An error occour: ", error);
      }
    };
    getArticle();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    values: {
      title: article?.title ?? "",
      content: article?.content ?? "",
      tags: article?.tags.join(", ") ?? "",
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
    setIsLoading(true);
    try {
      const data = getValues();
      const inputUser: {
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
      } = {
        ...data,
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
        published: isPublished,
        id: article!.id,
        slug: article!.slug,
        likes: article!.likes,
        views: article!.views,
        readTime: article!.readTime,
        commentsCount: article!.commentsCount,
        createdAt: article!.createdAt,
        updatedAt: article!.updatedAt,
        authorId: article!.authorId,
        authorSlug: article!.authorSlug,
      };
      if (imageFile) {
        inputUser.image = imageFile.name;
        inputUser.fileType = imageFile.type;
      }
      const response = await api.put(`/articles/${articleId}`, inputUser);

      const uploadUrl = await response.data;
      if (uploadUrl) {
        await axios.put(uploadUrl, imageFile, {
          headers: {
            "Content-Type": imageFile?.type,
          },
        });
      }
      reset();
      if (isPublished)
        toast.success("Your article has been published successfully.");
      if (!isPublished) {
        toast.info("Your article has been saved successfully.");
      }
      router.push("/profile/myarticles");
    } catch (error) {
      console.error("Error while publishing article: ", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setPublishDialogOpen(false);
    }
  };

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
    if (!article?.id) return;
    setIsLoading(true);
    try {
      await api.delete(`/articles/${article?.id}`);
      toast.success("Article deleted");
      router.push("/profile/myarticles");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error while deleting article: ", error);
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  };

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
        {getStatusBadge(article!)}
      </h1>
      <form
        onSubmit={handleSubmit(() => {
          onSave(article?.published ?? false);
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
                disabled={isLoading}
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
                isLoading={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
            >
              Cancel
            </Button>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="destructive"
                className="border-[0.01rem]"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
                ) : (
                  <Trash2 />
                )}
                Delete Article
              </Button>

              {article?.published ? (
                <Button
                  type="button"
                  className="bg-amber-400 text-custom-text-primary hover:bg-amber-500"
                  onClick={() => setUnpublishDialogOpen(true)}
                  disabled={isLoading}
                >
                  {isLoading && (
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
                  disabled={isLoading}
                >
                  {isLoading && (
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
                disabled={isLoading}
              >
                {isLoading ? (
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
                    src={imagePreview || "/placeholder.svg"}
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
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onPublish(true);
                }}
                disabled={isLoading}
                className="bg-green-700 hover:bg-green-600"
              >
                {isLoading ? (
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
                "{article?.title}"
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

      <Dialog open={unpublishDialogOpen} onOpenChange={setUnpublishDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-amber-500">
              Unpublish Article
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to unpublish{" "}
              <span className="font-bold text-custom-text-primary">
                "{article?.title}"
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
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() => unPublish(false)}
              disabled={isLoading}
              className="w-full bg-amber-600 hover:bg-amber-500 sm:w-auto"
            >
              {isLoading ? (
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
