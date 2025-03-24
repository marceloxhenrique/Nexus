export default function InfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-full grow bg-custom-background">
      <div className="mx-auto w-full max-w-[80rem] grow px-3 py-12">
        {children}
      </div>
    </section>
  );
}
