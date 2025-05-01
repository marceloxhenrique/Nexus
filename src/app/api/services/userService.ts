import { db } from "@/lib/db";
import { deleteFileFromS3 } from "@/utils/s3Service";
import { User } from "@prisma/client";

export async function doesUserExist(user: User) {
  return await db.user.findUnique({
    where: {
      email: user.email,
    },
  });
}

export async function updateUser(userId: string, updateData: User) {
  const user = {
    name: updateData.name,
    email: updateData.email,
    slug: updateData.slug,
    avatar: updateData.avatar,
    occupation: updateData.occupation,
    bio: updateData.bio,
    bioMarkdown: updateData.bioMarkdown,
    socials: updateData.socials,
  };
  return await db.user.update({
    where: {
      id: userId,
    },
    data: user,
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

export async function getUserByIdWithArticles(userId: string) {
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

export async function getUserById(userId: string) {
  const user: User | null = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

export async function deleteUser(userId: string, userAvatar: string) {
  const user = await db.user.delete({
    where: {
      id: userId,
    },
  });
  if (userAvatar) {
    await deleteFileFromS3(userAvatar);
  }
  return user;
}
