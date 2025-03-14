import ArticleCard from "@/components/ArticleCard";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <main
        className={`mx-auto max-w-[90rem] bg-background px-4 py-62 md:px-8`}
      >
        <h1 className="font-secondary text-7xl text-text-main md:text-8xl xl:text-9xl">
          Hello world!
        </h1>
        <h2 className="mb-40 font-main text-2xl text-text-main">
          Write and share your thoughts with the world.
        </h2>
        <h3 className="py-6 font-main text-4xl text-text-main md:text-5xl">
          Articles Availabes
        </h3>
        <section className="grid gap-22 xl:grid-cols-2">
          <ArticleCard article={article}></ArticleCard>
          <ArticleCard article={article}></ArticleCard>
          <ArticleCard article={article}></ArticleCard>
          <ArticleCard article={article}></ArticleCard>
          <ArticleCard article={article}></ArticleCard>
          <ArticleCard article={article}></ArticleCard>
          <ArticleCard article={article}></ArticleCard>
        </section>
      </main>
    </>
  );
}
const article: Article = {
  title: "8 Advanced JavaScript Features to Know",
  content:
    "JavaScript (JS) has come a long way since its inception as a simple scripting language. With the release of ECMAScript...",
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: 34,
  image:
    "https://www.squash.io/wp-content/uploads/2023/11/javascript-series.jpg",
};

type Article = {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  image: string;
};
