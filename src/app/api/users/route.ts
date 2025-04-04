import { NextRequest, NextResponse } from "next/server";
import { getUserBySlug } from "../services/userService";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userSlug = searchParams.get("userslug");
  if (!userSlug) {
    return NextResponse.json("Invalid user slug", { status: 400 });
  }
  try {
    const user = await getUserBySlug(userSlug);
    if (!user) return NextResponse.json("User not found", { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error while retriving user: ", error);
    return NextResponse.json(
      { error: "Unable to retrieve the  user" },
      { status: 500 },
    );
  }
}
