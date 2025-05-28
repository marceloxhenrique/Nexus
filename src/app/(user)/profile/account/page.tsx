"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AlertCircle, Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { api } from "@/utils/api";
import { toast } from "sonner";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { UserWithArticles } from "@/lib/types";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "This field is obligatory" }),
    newPassword: z
      .string()
      .min(1, { message: "This field is obligatory" })
      .min(6, { message: "Password must have at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "This field is obligatory" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function AccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const user: UserWithArticles | undefined = useContext(UserContext)?.user;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);
    try {
      await api.put(`/users/${user?.id}/password`, data);
      toast.success("Your password has been updated successfully.");
      reset();
    } catch (error) {
      console.error("Error while updating password: ", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/users/${user?.id}`);
      toast.success(`Account deleted`);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <section className="space-y-6 text-base">
      <Card className="border-0 bg-custom-background text-base shadow-none sm:border-[0.01rem] sm:shadow-md dark:border-none md:dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-2xl">Account Security</CardTitle>
          <CardDescription className="text-base">
            Update your password and manage your account security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              value={user?.email ?? ""}
              disabled
              className="mt-2 mb-0.5 bg-muted"
            />
            <span className="h-5 text-sm">
              <p className="text-xs text-custom-text-light">
                Your email is used for login and notifications.
              </p>
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-custom-background shadow-none sm:border-[0.01rem] sm:shadow-lg dark:border-none md:dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-2xl">Change Password</CardTitle>
          <CardDescription className="text-base">
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <section className="grid">
              <Label htmlFor="currentPassword">Current password</Label>
              <div className="relative mt-2 mb-0.5 flex items-center">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  {...register("currentPassword")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 cursor-pointer text-gray-500"
                >
                  {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <span className="h-5 text-sm">
                {errors.currentPassword && (
                  <p className="text-error text-sm text-red-500">
                    {errors.currentPassword.message}
                  </p>
                )}
              </span>
            </section>
            <section className="grid">
              <Label htmlFor="newPassword">New password</Label>
              <div className="relative mt-2 mb-0.5 flex items-center">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 cursor-pointer text-gray-500"
                >
                  {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <span className="h-5 text-sm">
                {errors.newPassword && (
                  <p className="text-error text-sm text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </span>
            </section>
            <section className="grid">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <div className="relative mt-2 mb-0.5 flex items-center">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <span className="h-5 text-sm">
                {errors.confirmPassword && (
                  <p className="text-error text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </span>
            </section>
            <Button
              type="submit"
              className="mt-2 w-full bg-green-700 text-white hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
              ) : (
                "Update password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-0 border-red-200 bg-custom-background shadow-none sm:border-[0.01rem] sm:shadow-lg dark:border-none md:dark:bg-zinc-900">
        <CardHeader className="text-red-500">
          <CardTitle className="text-2xl">Danger Zone </CardTitle>
          <CardDescription className="text-base text-red-400">
            Permanently delete your account and all of your content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col space-x-2 rounded-md border border-red-200 p-4 sm:flex-row sm:items-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm leading-none font-medium">Delete account</p>
              <p className="text-sm text-custom-text-light">
                Once you delete your account, there is no going back. This
                action cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isLoading}
            >
              Delete Account
            </Button>
          </section>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-500">Delete Account</DialogTitle>
            <DialogDescription>
              Are you absolutely sure you want to delete your account ? This
              action cannot be undone and will permanently delete your account
              and all your content.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex space-y-4 rounded-md bg-red-50 p-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-700">Warning</h3>
              <p className="mt-2 text-sm text-red-700">This will:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700">
                <li>Delete your profile and personal data</li>
                <li>Delete all your articles and comments</li>
                <li>Remove you from all conversations</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
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
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
              ) : (
                "Yes, delete my account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
