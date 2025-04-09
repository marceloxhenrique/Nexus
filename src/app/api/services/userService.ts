import { db } from "@/lib/db";
import { User } from "@/lib/types";

export async function doesUserExist(user: User) {
  return await db.user.findUnique({
    where: {
      email: user.email,
    },
  });
}

export async function updateUser(userId: string, updateData: User) {
  return await db.user.update({
    where: {
      id: userId,
    },
    data: updateData,
  });
}

export async function getUserByName(name: string) {
  const user = await db.user.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
      name: true,
      bio: true,
      avatar: true,
      socials: true,
      followers: true,
      occupation: true,
      bioMarkdown: true,
    },
  });
  return user;
}

export async function getUserBySlug(slug: string) {
  const user = await db.user.findUnique({
    where: {
      slug: slug,
    },
    include: {
      articles: {
        where: {
          published: true,
        },
      },
    },
  });
  return user;
}

export async function getUserById(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      articles: true,
    },
  });
  return user;
}
