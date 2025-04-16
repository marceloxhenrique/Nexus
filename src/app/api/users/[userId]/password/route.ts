import { NextRequest, NextResponse } from "next/server";
import { getUserByIdWithArticles } from "@/app/api/services/userService";
import { auth } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  paramsUserId: { params: Promise<{ userId: string }> },
) {
  const userId = await paramsUserId.params;
  if (!userId) return NextResponse.json("User ID is required", { status: 400 });
  try {
    const headers = req.headers;
    const session = await auth.api.getSession({ headers });
    if (!session)
      return NextResponse.json(
        { error: "Forbidden: You do not have the riquired privileges." },
        { status: 403 },
      );

    const user = await getUserByIdWithArticles(session.session.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    const updateData = await req.json();
    auth.api.changePassword({
      headers,
      body: {
        newPassword: updateData.newPassword,
        currentPassword: updateData.currentPassword,
        revokeOtherSessions: true,
      },
    });

    return NextResponse.json("User successfully updated", { status: 200 });
  } catch (error) {
    console.error("Error while trying to update the user", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while updating the user." },
      {
        status: 500,
      },
    );
  }
}
