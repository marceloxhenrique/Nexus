import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function getSession(headers: Headers) {
  const session = await auth.api.getSession({ headers });
  if (!session) {
    return {
      errorResponse: NextResponse.json(
        { error: "Forbidden: You do not have the riequired privileges." },
        { status: 403 },
      ),
    };
  }

  return { session, errorResponse: null };
}
