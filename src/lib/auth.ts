import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      slug: {
        type: "string",
        required: true,
        defaultValue: Math.random().toString(36).substring(2, 15),
        input: false,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSlug =
          ctx.body.email.split("@")[0] +
          Math.random().toString(36).substring(2, 15);
        await db.user.update({
          where: {
            email: ctx.body.email,
          },
          data: {
            slug: newSlug,
          },
        });
      }
    }),
  },
});
