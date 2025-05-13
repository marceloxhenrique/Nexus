import { db } from "@/lib/db";

export async function addFollower(followerSlug: string, followingSlug: string) {
  const follow = await db.follow.create({
    data: {
      followerSlug,
      followingSlug,
    },
  });
  return follow;
}
export async function getFollowers(followingSlug: string) {
  const followers = await db.follow.findMany({
    where: {
      followingSlug,
    },
  });
  return followers;
}
export async function deleteFollower(
  followerSlug: string,
  followingSlug: string,
) {
  const follower = await db.follow.delete({
    where: {
      followerSlug_followingSlug: {
        followerSlug,
        followingSlug,
      },
    },
  });
  return follower;
}
