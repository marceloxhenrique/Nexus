import { getSession } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "../../services/userService";
import { User } from "@prisma/client";
import { deleteFollower } from "../../services/followService";

export async function DELETE(
  req: NextRequest,
  paramsUserSlug: { params: Promise<{ userSlug: string }> },
) {
  const followingSlug = (await paramsUserSlug.params).userSlug;
  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  try {
    const user: User | null = await getUserById(session.session.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    await deleteFollower(user?.slug, followingSlug);
    return NextResponse.json("User unfollowed successfully", { status: 200 });
  } catch (error) {
    console.error("Error while following user: ", error);
    return NextResponse.json(
      { error: "Unable to follow user" },
      { status: 500 },
    );
  }
}
