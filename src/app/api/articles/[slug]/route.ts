import { NextRequest, NextResponse } from "next/server";
import {
  deleteArticle,
  getArticleById,
  getArticleBySlug,
  updateArticle,
} from "../../services/articlesService";

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
  article: { params: Promise<{ slug: string }> },
) {
  const slug = (await article.params).slug;
  if (!slug) return NextResponse.json("Invalid slug", { status: 400 });

  try {
    const article = await getArticleBySlug(slug);
    if (!article)
      return NextResponse.json("Article not found", { status: 404 });

    const newArticle = await req.json();

    await updateArticle(newArticle);
    return NextResponse.json("Article Successfully updated", { status: 200 });
  } catch (error) {
    console.error("Error while updating article: ", error);
    return NextResponse.json(
      { error: "Unable to update the article" },
      { status: 500 },
    );
  }
}

export async function DELETE(article: { params: Promise<{ slug: string }> }) {
  const slug = (await article.params).slug;
  if (!slug) return NextResponse.json("Invalid slug", { status: 400 });

  try {
    const article = await getArticleById(slug);
    if (!article)
      return NextResponse.json("Article not found", { status: 404 });

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
