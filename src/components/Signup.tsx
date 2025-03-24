"use client";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const signupSchema = z.object({
  name: z.string().min(1, { message: "This field is obligatory" }),
  email: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(1, { message: "This field is obligatory" })
    .min(6, { message: "Password must have at list 6 characters" }),
});

export default function SignupForm() {
  const [displayPassword, setDisplayPassword] = useState(false);
  const [disableFields, setDisableFields] = useState(false);
  type SignupFormProps = z.infer<typeof signupSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormProps>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignupform = async (userInfo: SignupFormProps) => {
    reset();
    console.log(userInfo);
  };
  return (
    <main className={"flex flex-col gap-6"}>
      <Card className="border-0 bg-custom-background shadow-none sm:border-[0.01rem] sm:shadow-lg dark:border-none md:dark:bg-zinc-900">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Nexus</CardTitle>
          <CardDescription>
            Sign up with your Google or GitHub account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((userInfo) => handleSignupform(userInfo))}
            noValidate
          >
            <section className="grid gap-3">
              <Button
                variant="outline"
                className="w-full border-[0.01rem]"
                type="button"
                disabled={disableFields}
              >
                <FcGoogle className=""></FcGoogle>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full border-[0.01rem]"
                type="button"
                disabled={disableFields}
              >
                <AiFillGithub></AiFillGithub>
                Continue with GitHub
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-custom-background px-2 text-muted-foreground md:dark:bg-zinc-900">
                  Or continue with
                </span>
              </div>
              <div className="grid">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  {...register("name")}
                  className="mt-2 mb-0.5"
                  disabled={disableFields}
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
                  type="email"
                  {...register("email")}
                  className="mt-2 mb-0.5"
                  disabled={disableFields}
                />
                <span className="h-5 text-sm">
                  {errors.email && (
                    <p className="text-error text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="relative grid">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative mt-2 mb-0.5 flex items-center">
                  <Input
                    id="password"
                    type={displayPassword ? "text" : "password"}
                    {...register("password")}
                    disabled={disableFields}
                  />
                  <button
                    type="button"
                    onClick={() => setDisplayPassword(!displayPassword)}
                    className="absolute right-4 cursor-pointer text-gray-500"
                  >
                    {displayPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <span className="h-5 text-sm">
                  {errors.password && (
                    <p className="text-error text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </span>
              </div>
              <Button
                type="submit"
                className="mt-2 w-full"
                disabled={disableFields}
              >
                {disableFields && (
                  <Loader2 className="h-8 w-8 animate-spin transition duration-1000" />
                )}
                Sign up
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </section>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-balance text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our
        <Link href="/terms"> Terms of Service </Link>
        and <Link href="/privacy"> Privacy Policy</Link>.
      </div>
    </main>
  );
}
