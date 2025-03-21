import { SignIn, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex w-full flex-1 items-center justify-center bg-custom-background">
      <SignIn />
      {/* <div>
        <SignInButton />
        <SignUpButton />
      </div> */}
    </section>
  );
}
