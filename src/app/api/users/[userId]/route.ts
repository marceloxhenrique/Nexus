import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserById, updateUser } from "../../services/userService";

export async function GET(
  req: NextRequest,
  paramsUserId: { params: Promise<{ userId: string }> },
) {
  const { userId } = await paramsUserId.params;
  if (!userId)
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
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
      { error: "An unexpected error occurred while retrieving the user." },
      { status: 500 },
    );
  }
}

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

    const user = await getUserById(session.session.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    const updateData = await req.json();
    console.log("Update data:", updateData);
    await updateUser(session.session.userId, updateData);

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

export async function DELETE(
  req: NextRequest,
  paramsUserId: { params: Promise<{ userId: string }> },
) {
  const userId = await paramsUserId.params;
  if (!userId)
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  try {
    const headers = req.headers;
    const session = await auth.api.getSession({ headers });
    if (!session)
      return NextResponse.json(
        { error: "Forbidden: Insufficient privileges." },
        { status: 403 },
      );
    await auth.api.deleteUser({ headers, body: {} });
    return NextResponse.json(
      { message: "User successfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error while trying to delete the user", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while updating the user." },
      {
        status: 500,
      },
    );
  }
}
