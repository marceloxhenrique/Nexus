"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Loader2, Save, Send } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import TextEditor from "./TextEditor";
import { ImageUploader } from "./ImageUploader";
import { api } from "@/utils/api";
import axios, { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const articleSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
  tags: z.string().optional(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;
type CreateArticlePayload = {
  tags: string[];
  published: boolean;
  title: string;
  content: string;
  image?: string;
  fileType?: string;
};

export function NewArticleEditor() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
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
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const watchContent = watch("content");
  const watchTitle = watch("title");
  const watchTags = watch("tags");

  const onSaveDraft = async (isPublished: boolean) => {
    createArticle(isPublished);
  };

  const onPublish = async (isPublished: boolean) => {
    createArticle(isPublished);
  };

  const createArticle = async (isPublished: boolean) => {
    const data = getValues();
    const inputUser: CreateArticlePayload = {
      ...data,
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      published: isPublished,
    };
    if (imageFile) {
      inputUser.image = imageFile.name;
      inputUser.fileType = imageFile.type;
    }
    createArticleMutation.mutateAsync(inputUser);
  };

  const createArticleMutation = useMutation({
    mutationFn: async (newArticle: CreateArticlePayload) => {
      const response = await api.post("/articles", newArticle);
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
      reset();
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
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
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

  const parsedTags = watchTags
    ? watchTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    : [];

  return (
    <form
      onSubmit={handleSubmit(() => {
        onSaveDraft(false);
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
              disabled={createArticleMutation.isPending}
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
              isLoading={createArticleMutation.isPending}
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
              disabled={createArticleMutation.isPending}
            />
            <span className="h-5 text-sm">
              <p className="text-xs text-custom-text-light">
                Add tags to help readers discover your article.
              </p>
            </span>
          </section>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between gap-3 py-4 lg:px-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="border-[0.01rem]"
            disabled={createArticleMutation.isPending}
          >
            Cancel
          </Button>

          <div className="flex flex-wrap gap-3">
            <Button
              type="submit"
              variant="outline"
              className="border-[0.01rem]"
              disabled={createArticleMutation.isPending}
            >
              {createArticleMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
              ) : (
                <Save />
              )}
              Save Draft
            </Button>

            <Button
              type="button"
              className="bg-green-700 hover:bg-green-600"
              onClick={validateAndOpenPublishDialog}
              disabled={createArticleMutation.isPending}
            >
              {createArticleMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
              ) : (
                <Send />
              )}
              Publish
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
              Review your article before publishing. Once published, it will be
              visible to all readers.
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
                  width={500}
                  height={300}
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
              disabled={createArticleMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onPublish(true);
              }}
              disabled={createArticleMutation.isPending}
              className="bg-green-700 hover:bg-green-600"
            >
              {createArticleMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
              ) : (
                "Confirm & Publish"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
