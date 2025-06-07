import { getSession } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";
import {
  addFollower,
  getFollowers,
  getFollowing,
} from "../services/followService";
import { getUserById } from "../services/userService";
import { User } from "@prisma/client";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userSlug = searchParams.get("slug");
  if (!userSlug) {
    return NextResponse.json("User slug is required", { status: 400 });
  }
  try {
    const followers = await getFollowers(userSlug);
    const following = await getFollowing(userSlug);
    return NextResponse.json({ followers, following }, { status: 200 });
  } catch (error) {
    console.error("Error while getting followers: ", error);
    return NextResponse.json(
      { error: "Unable to get followers" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const { followingSlug } = await req.json();
  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  try {
    const user: User | null = await getUserById(session.session.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.slug === followingSlug)
      return NextResponse.json(
        { error: "You cannot follow yourself" },
        { status: 400 },
      );
    await addFollower(user?.slug, followingSlug);
    return NextResponse.json("User followed successfully", { status: 200 });
  } catch (error) {
    console.error("Error while following user: ", error);
    return NextResponse.json(
      { error: "Unable to follow user" },
      { status: 500 },
    );
  }
}
