import { getSession } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";
import { addComment, getCommentsByArticleId } from "../services/commentService";

export async function POST(req: NextRequest) {
  const { content, articleId } = await req.json();
  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  try {
    await addComment(content, articleId, session.session.userId);
    return NextResponse.json(
      { message: "Comment created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error while creating comment: ", error);
    return NextResponse.json(
      { error: "Unable to create comment" },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const articleId = searchParams.get("articleId");
  if (!articleId) {
    return NextResponse.json(
      { message: "Missing required field: articleId" },
      { status: 400 },
    );
  }
  try {
    const comments = await getCommentsByArticleId(articleId);
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error getting comments: ", error);
    return NextResponse.json(
      { message: "Error getting comments" },
      { status: 500 },
    );
  }
}
