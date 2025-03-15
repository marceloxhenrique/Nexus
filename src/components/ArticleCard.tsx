import React from "react";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className="">
      <div className="my-8 flex max-w-3xl cursor-pointer flex-col items-start justify-between gap-2 rounded-md sm:flex-row">
        <section className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-black text-primary">{article.title}</h2>
          <p className="text-text-light">{article.content}</p>
          <span className="py-2 text-text-light">
            {article.createdAt.toDateString()}
          </span>
        </section>
        <img
          className="max-h-70 object-contain sm:w-40"
          src={article.image}
          alt={article.title}
        />
      </div>
      <div className="max-w-3xl border-b-[0.01rem] border-primary"></div>
    </div>
  );
};

export default ArticleCard;

type Article = {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  image: string;
};
