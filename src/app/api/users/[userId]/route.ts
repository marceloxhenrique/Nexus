import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserById, updateUser } from "../../services/userService";

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

export async function PUT(
  req: NextRequest,
  paramsUserId: { params: Promise<{ userId: string }> },
) {
  const userId = await paramsUserId.params;
  if (!userId) return NextResponse.json("UserId id required", { status: 400 });
  try {
    const headers = req.headers;
    const session = await auth.api.getSession({ headers });
    if (!session)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const user = await getUserById(session.session.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    await updateUser(user);

    return NextResponse.json("User successfully updated", { status: 200 });
  } catch (error) {
    console.error("Error while trying to update the user", error);
    return NextResponse.json(
      { error: "Unable to update the use" },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  paramsUserId: { params: Promise<{ userId: string }> },
) {
  const userId = await paramsUserId.params;
  if (!userId)
    return NextResponse.json({ error: "UserId id required" }, { status: 400 });
  try {
    const headers = req.headers;
    const session = await auth.api.getSession({ headers });
    if (!session)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    await auth.api.deleteUser({ headers, body: {} });
    return NextResponse.json(
      { message: "User successfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error while trying to delete the user", error);
    return NextResponse.json(
      { error: "Unable to delete the use" },
      {
        status: 500,
      },
    );
  }
}
