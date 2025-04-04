import { db } from "@/lib/db";

export async function doesUserExist(user: any) {
  return await db.user.findUnique({
    where: {
      email: user.email,
    },
  });
}

export async function updateUser(input: any) {
  const user = await doesUserExist(input);
  if (!user) throw new Error("User doesn't exist");
  try {
    await db.user.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });
  } catch (error) {}
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
      articles: true,
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
