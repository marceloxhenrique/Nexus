import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  deleteUser,
  getUserById,
  getUserByIdWithArticles,
  updateUser,
} from "../../services/userService";
import { getSession } from "@/utils/session";
import { deleteFileFromS3, generatePreSignedUrl } from "@/utils/s3Service";
import {
  addPreSignedUrl,
  canGeneratePreSignedUrl,
} from "../../services/preSignedUrlService";

export async function GET(
  req: NextRequest,
  paramsUserId: { params: Promise<{ userId: string }> },
) {
  const { userId } = await paramsUserId.params;
  if (!userId)
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  try {
    const user = await getUserByIdWithArticles(session.session.userId);
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
  const { session, errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  try {
    const user = await getUserByIdWithArticles(session.session.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    const updateData = await req.json();
    if (!updateData.avatar || !updateData.fileType) {
      await updateUser(session.session.userId, updateData);
      return NextResponse.json(
        { message: "User successfully updated" },
        { status: 200 },
      );
    }
    if (!(await canGeneratePreSignedUrl(session.session.userId)))
      return NextResponse.json(
        { error: "You have reached the limit of images uploaded per day" },
        { status: 403 },
      );

    if (user.avatar) deleteFileFromS3(user.avatar);
    const fileKey = `avatar/${Date.now()}-${user.slug}-${updateData.avatar}`
      .replace(/\s+/g, "-")
      .toLowerCase();
    updateData.avatar = fileKey;
    const { uploadUrl } = await generatePreSignedUrl(
      fileKey,
      updateData.fileType,
    );
    await addPreSignedUrl(session.session.userId);
    await updateUser(session.session.userId, updateData);

    return NextResponse.json({ uploadUrl: uploadUrl }, { status: 200 });
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
  const { errorResponse } = await getSession(req.headers);
  if (errorResponse) return errorResponse;
  const user = await getUserById(userId.userId);
  try {
    const headers = req.headers;
    await auth.api.deleteUser({ headers, body: {} });
    if (user?.avatar) {
      await deleteUser(userId.userId, user?.avatar);
    }
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
