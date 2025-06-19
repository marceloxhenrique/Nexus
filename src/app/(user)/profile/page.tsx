"use client";
import type React from "react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Plus, Trash2, Upload, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const profileSchema = z.object({
  name: z.string().min(1, { message: "This field is obligatory" }),
  occupation: z
    .string()
    .max(50, { message: "Occupation must be less than 50 characters" })
    .optional(),
  bio: z
    .string()
    .max(500, { message: "Bio must be less than 500 characters" })
    .optional(),
  socials: z.array(
    z.string().url({ message: "Please enter a valid URL" }).optional(),
  ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const user = useContext(UserContext)?.user;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      name: user?.name || "",
      occupation: user?.occupation || "",
      bio: user?.bio || "",
      socials: user?.socials || [""],
    },
  });

  const updateUserProfileData = async (data: ProfileFormValues) => {
    updateUserProfileDataMutation.mutate(data);
  };

  const updateUserProfileDataMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const response = await api.put(`/users/${user?.id}`, {
        ...data,
        avatar: imageFile?.name,
        fileType: imageFile?.type,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.uploadUrl) {
        axios.put(data.uploadUrl, imageFile, {
          headers: {
            "Content-Type": imageFile?.type,
          },
        });
      }
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Error while updating profile: ", error);
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAvatarChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleAvatarChange(e.target.files[0]);
    }
  };

  const handleAvatarChange = (file: File) => {
    if (file.size > 1024 * 1024) {
      toast.error("Please select an image less than 1MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, GIF).");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
        setAvatarDialogOpen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(updateUserProfileData)}>
        <Card className="border-0 shadow-none sm:border-[0.01rem] sm:shadow-md dark:border-none">
          <CardHeader className="py-2">
            <CardTitle className="text-3xl">Profile</CardTitle>
            <CardDescription className="text-base">
              This information will be displayed publicly so be careful what you
              share.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="User avatar"
                    width={200}
                    height={200}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <>
                    <AvatarImage
                      src={
                        user?.avatar
                          ? NEXT_PUBLIC_AWS_URL + user?.avatar
                          : undefined
                      }
                      alt={user?.name}
                    />
                    <AvatarFallback>
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setAvatarDialogOpen(true)}
                  className="border-[0.01rem]"
                >
                  Change avatar
                </Button>
                <p className="mt-2 text-sm text-custom-text-light">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <section className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                    className="mt-2 mb-0.5"
                    disabled={updateUserProfileDataMutation.isPending}
                  />
                  <span className="h-5 text-sm">
                    {errors.name && (
                      <p className="text-error text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </span>
                </div>
                <div className="grid">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    placeholder="Your email"
                    disabled
                    className="mt-2 mb-0.5 bg-muted"
                  />
                  <span className="h-5 text-sm">
                    <p className="text-xs text-custom-text-light">
                      Your email cannot be changed.
                    </p>
                  </span>
                </div>
              </div>

              <div className="grid">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  {...register("occupation")}
                  placeholder="Your profession"
                  className="mt-2 mb-0.5"
                  disabled={updateUserProfileDataMutation.isPending}
                />
              </div>

              <div className="grid">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Write a few sentences about yourself"
                  className="mt-2 mb-0.5 min-h-[120px]"
                  disabled={updateUserProfileDataMutation.isPending}
                />
                <span className="h-5 text-sm">
                  {errors.bio && (
                    <p className="text-error text-sm text-red-500">
                      {errors.bio.message}
                    </p>
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Social Links</Label>
                  <Controller
                    control={control}
                    name="socials"
                    render={({ field }) => (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          field.onChange([...(field.value || []), ""]);
                        }}
                        className="border-[0.01rem]"
                        disabled={updateUserProfileDataMutation.isPending}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Link
                      </Button>
                    )}
                  />
                </div>

                <Controller
                  control={control}
                  name="socials"
                  render={({ field }) => (
                    <div className="space-y-3">
                      {field.value?.map((social, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={social}
                            onChange={(e) => {
                              const newSocials = [...field.value!];
                              newSocials[index] = e.target.value;
                              field.onChange(newSocials);
                            }}
                            placeholder="https://twitter.com/yourusername"
                            disabled={updateUserProfileDataMutation.isPending}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newSocials = [...field.value!];
                              newSocials.splice(index, 1);
                              field.onChange(newSocials);
                            }}
                            disabled={
                              field.value?.length === 0 ||
                              updateUserProfileDataMutation.isPending
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                      {errors.socials && (
                        <p className="text-sm text-red-500">
                          Please enter valid URLs for all social links
                        </p>
                      )}
                    </div>
                  )}
                />
                <p className="text-xs text-custom-text-light">
                  Add your social media profiles.
                </p>
              </div>
            </section>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              type="button"
              className="border-[0.01rem]"
              disabled={updateUserProfileDataMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-24 bg-green-700 hover:bg-green-600"
              disabled={updateUserProfileDataMutation.isPending}
            >
              {updateUserProfileDataMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
              ) : (
                "Save"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Dialog open={avatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change avatar</DialogTitle>
            <DialogDescription>
              Upload a new avatar for your profile.
            </DialogDescription>
          </DialogHeader>
          <div
            className={`mt-4 flex h-64 w-full flex-col items-center justify-center rounded-md border-2 border-dashed p-4 transition-colors ${
              isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mb-4 h-10 w-10 text-gray-400" />
            <p className="mb-2 text-sm font-medium">
              Drag and drop your image here, or click to select
            </p>
            <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("avatar-upload")?.click()}
              className="mt-4 border-[0.01rem]"
            >
              Select Image
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
