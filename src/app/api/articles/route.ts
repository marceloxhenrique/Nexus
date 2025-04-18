import { NextRequest, NextResponse } from "next/server";
import {
  createArticle,
  getAllArticles,
  getArticleBySlug,
} from "../services/articlesService";
import { auth } from "@/lib/auth";
import { getUserById } from "../services/userService";
import { User } from "@prisma/client";

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
  const headers = req.headers;
  const session = await auth.api.getSession({ headers });
  if (!session)
    return NextResponse.json(
      { error: "Forbidden: You do not have the riquired privileges." },
      { status: 403 },
    );
  try {
    const user: User | null = await getUserById(session.session.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    await createArticle(article, user);
    return NextResponse.json(
      { message: "Article Successfully created" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error while creating new article: ", error);
    return NextResponse.json(
      { error: `Unable to create article error: ${error}` },
      { status: 500 },
    );
  }
}
