import { NextRequest, NextResponse } from "next/server";
import { deleteExpiredPreSignedUrl } from "../services/preSignedUrlService";

export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await deleteExpiredPreSignedUrl();
  return NextResponse.json({
    message: "Expired preSignedUrl deleted successfully",
  });
}
