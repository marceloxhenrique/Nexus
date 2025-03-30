import { NextRequest, NextResponse } from "next/server";
import { createArticle, getAllArticles } from "../services/articlesService";

export async function GET() {
  try {
    const articles = await getAllArticles();
    if (!articles || articles.length === 0) {
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
  try {
    const newArtcile = await createArticle(article);
    if (newArtcile)
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
