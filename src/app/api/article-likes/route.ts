import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/utils/session";
import { addLike, getLikes } from "../services/articleLikesService";

export async function GET(req: NextRequest) {
  const articleId = req.nextUrl.searchParams.get("articleId");
  if (!articleId)
    return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
  try {
    const likes = await getLikes(articleId);
    return NextResponse.json(likes);
  } catch (error) {
    console.error("Error getting likes: ", error);
    return NextResponse.json({ error: "Error getting likes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const articleId = await req.json();
  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  if (!articleId)
    return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
  try {
    await addLike(articleId.articleId, session.user.slug);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error liking article", error);
    if (error === "P2002") {
      return NextResponse.json(
        { error: "Already liked this article" },
        { status: 409 },
      );
    }
    console.error("Error liking article", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
