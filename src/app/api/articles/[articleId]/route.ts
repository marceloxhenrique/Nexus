import { NextRequest, NextResponse } from "next/server";
import {
  deleteArticle,
  getArticleById,
  getArticleBySlug,
  updateArticle,
} from "../../services/articlesService";
import { auth } from "@/lib/auth";
import { Article } from "@prisma/client";

export async function GET(
  req: NextRequest,
  article: { params: Promise<{ slug: string }> },
) {
  const slug = (await article.params).slug;
  if (!slug) return NextResponse.json("Invalid slug", { status: 400 });

  try {
    const article = await getArticleBySlug(slug);
    if (!article)
      return NextResponse.json("Article not found", { status: 404 });
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("Error while retreiving article: ", error);
    return NextResponse.json(
      { error: "Unable to retrive the article" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  paramsArticleId: { params: Promise<{ articleId: string }> },
) {
  const articleId = (await paramsArticleId.params).articleId;
  if (!articleId)
    return NextResponse.json("Invalid article ID", { status: 400 });

  try {
    const headers = req.headers;
    const session = await auth.api.getSession({ headers });
    if (!session)
      return NextResponse.json(
        { error: "Forbidden: You do not have the riquired privileges." },
        { status: 403 },
      );
    // !!! Check if this article belongs to the owner of this session
    const article = await getArticleById(articleId);
    if (!article)
      return NextResponse.json("Article not found", { status: 404 });

    const articleInput = await req.json();

    await updateArticle(articleInput);
    return NextResponse.json("Article Successfully updated", { status: 200 });
  } catch (error) {
    console.error("Error while updating article: ", error);
    return NextResponse.json(
      { error: "Unable to update the article" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  paramsArticleId: { params: Promise<{ articleId: string }> },
) {
  const articleId = (await paramsArticleId.params).articleId;
  if (!articleId)
    return NextResponse.json("Invalid Article ID", { status: 400 });

  try {
    const headers = req.headers;
    const session = await auth.api.getSession({ headers });
    if (!session)
      return NextResponse.json(
        { error: "Forbidden: You do not have the riquired privileges." },
        { status: 403 },
      );
    const article: Article | null = await getArticleById(articleId);
    if (!article)
      return NextResponse.json("Article not found", { status: 404 });
    // !!! Check if this article belongs to the owner of this session
    await deleteArticle(article.id);
    return NextResponse.json("Article Successfully deleted", { status: 200 });
  } catch (error) {
    console.error("Error while deleting article: ", error);
    return NextResponse.json(
      { error: "Unable to delete the article" },
      { status: 500 },
    );
  }
}
