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
    include: {
      follower: true,
    },
  });
  return followers;
}

export async function getFollowing(followerSlug: string) {
  const following = await db.follow.findMany({
    where: {
      followerSlug,
    },
    include: {
      following: true,
    },
  });
  return following;
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
