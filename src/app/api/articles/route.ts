import { NextRequest, NextResponse } from "next/server";

import {
  createArticle,
  getAllArticles,
  getArticleBySlug,
} from "../services/articlesService";
import { getUserById } from "../services/userService";
import { User } from "@prisma/client";
import { getSession } from "@/utils/session";
import { generatePreSignedUrl } from "@/utils/s3Service";
import { sanitizeInput } from "@/utils/sanitize";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const articleSlug = searchParams.get("article");
  try {
    const articles = articleSlug
      ? await getArticleBySlug(articleSlug)
      : await getAllArticles();
    if (!articles || (Array.isArray(articles) && articles.length === 0)) {
      return NextResponse.json(
        { articles: [], message: "No articles available" },
        { status: 200 },
      );
    }
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("Error while fetching articles availables: ", error);
    return NextResponse.json(
      { error: "Unable to fetch articles availables" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const article = await req.json();
  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  try {
    const user: User | null = await getUserById(session.session.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    const sanitizecContent = sanitizeInput(article.content);
    article.content = sanitizecContent;
    if (!article.image) {
      await createArticle(article, user);

      return NextResponse.json(
        { message: "Article created successfully" },
        { status: 201 },
      );
    }
    const fileKey = `uploads/${Date.now()}-${user.slug}-${article.title}`
      .replace(/\s+/g, "-")
      .toLowerCase();
    const { uploadUrl } = await generatePreSignedUrl(fileKey, article.fileType);
    await createArticle(article, user, fileKey);

    return NextResponse.json(uploadUrl, { status: 201 });
  } catch (error) {
    console.error("Error while creating new article: ", error);
    return NextResponse.json(
      { error: `Unable to create article error: ${error}` },
      { status: 500 },
    );
  }
}
