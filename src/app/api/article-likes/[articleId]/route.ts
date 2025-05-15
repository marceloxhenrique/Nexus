import { getSession } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";
import { removeLike } from "../../services/articleLikesService";

export async function DELETE(
  req: NextRequest,
  paramsArticleId: { params: Promise<{ articleId: string }> },
) {
  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  const { articleId } = await paramsArticleId.params;
  if (!articleId)
    return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
  try {
    await removeLike(articleId, session.user.slug);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error unliking article", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
