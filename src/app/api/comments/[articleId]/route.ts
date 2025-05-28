import { NextRequest, NextResponse } from "next/server";
import { deleteComment } from "../../services/commentService";

export async function DELETE(
  req: NextRequest,
  paramsCommentId: { params: Promise<{ articleId: string }> },
) {
  const commentId = (await paramsCommentId.params).articleId;
  if (!commentId) {
    return NextResponse.json({ message: "Missing required fields" });
  }
  try {
    await deleteComment(commentId);
    return NextResponse.json("Comment deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting comment: ", error);
    return NextResponse.json(
      { message: "Error deleting comment" },
      { status: 500 },
    );
  }
}
