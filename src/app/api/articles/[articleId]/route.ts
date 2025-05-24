import { NextRequest, NextResponse } from "next/server";
import {
  deleteArticle,
  getArticleById,
  updateArticle,
} from "../../services/articlesService";
import { getUserById } from "../../services/userService";
import { Article, User } from "@prisma/client";
import { getSession } from "@/utils/session";
import { generatePreSignedUrl } from "@/utils/s3Service";

export async function GET(
  req: NextRequest,
  article: { params: Promise<{ articleId: string }> },
) {
  const articleId = (await article.params).articleId;
  if (!articleId) return NextResponse.json("Invalid slug", { status: 400 });

  try {
    const article = await getArticleById(articleId);
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
  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  try {
    const user: User | null = await getUserById(session.session.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    // !!! Check if this article belongs to the owner of this session
    const article = await getArticleById(articleId);
    if (!article)
      return NextResponse.json("Article not found", { status: 404 });
    const articleInput = await req.json();
    if (!articleInput.image) {
      await updateArticle(articleInput);
      return NextResponse.json(
        { message: "Article created successfully" },
        { status: 201 },
      );
    }
    const fileKey = `uploads/${Date.now()}-${user.slug}-${article.title}`
      .replace(/\s+/g, "-")
      .toLowerCase();

    const { uploadUrl } = await generatePreSignedUrl(
      fileKey,
      articleInput.fileType,
    );
    await updateArticle(article, fileKey);

    return NextResponse.json(uploadUrl, { status: 200 });
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

  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  try {
    const headers = req.headers;

    const article: Article | null = await getArticleById(articleId);
    if (!article)
      return NextResponse.json("Article not found", { status: 404 });
    // !!! Check if this article belongs to the owner of this session
    await deleteArticle(article);
    return NextResponse.json("Article Successfully deleted", { status: 200 });
  } catch (error) {
    console.error("Error while deleting article: ", error);
    return NextResponse.json(
      { error: "Unable to delete the article" },
      { status: 500 },
    );
  }
}
