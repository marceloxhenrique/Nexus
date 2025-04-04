import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserById } from "../../services/userService";

export async function GET(
  req: NextRequest,
  paramsUserId: { params: Promise<{ userId: string }> },
) {
  const { userId } = await paramsUserId.params;
  if (!userId)
    return NextResponse.json({ error: "UserId is required" }, { status: 400 });
  try {
    const headers = req.headers;
    const session = await auth.api.getSession({ headers });
    if (!session)
      return NextResponse.json(
        "Forbidden: You do not have the riquired privileges.",
        { status: 403 },
      );
    const user = await getUserById(session.session.userId);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error while retriving user: ", error);
    return NextResponse.json(
      { error: "Unable to retrieve the  user" },
      { status: 500 },
    );
  }
}
