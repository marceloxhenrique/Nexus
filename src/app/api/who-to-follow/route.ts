import { NextResponse } from "next/server";
import { whoToFollow } from "../services/whoToFollowService";

export async function GET() {
  try {
    const users = await whoToFollow();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error while retriving users to follow.", error);
    return NextResponse.json(
      { error: "Unable to retrive users" },
      { status: 5000 },
    );
  }
}
