import { NewArticleEditor } from "@/components/NewArticleEditor";

export default function NewArticlePage() {
  return (
    <>
      <h1 className="mb-8 font-main text-3xl font-bold tracking-tight text-custom-text-primary">
        Create New Article
      </h1>
      <NewArticleEditor />
    </>
  );
}
