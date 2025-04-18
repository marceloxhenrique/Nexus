export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-full grow bg-custom-background">
      <div className="mx-auto w-full max-w-[80rem] grow px-4 sm:px-6">
        {children}
      </div>
    </section>
  );
}
