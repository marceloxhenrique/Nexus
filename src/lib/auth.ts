import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { sendEmail } from "@/utils/sendEmail";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log(
        `sendVerificationEmail: user : ${user.email}, url : ${url}, token : ${token}`,
      );
      await sendEmail({
        to: user.email,
        subject: "Welcome to Nexus – Confirm Your Email",
        text: `
        Hi ${user.name || "there"},

        Thanks for signing up to Nexus!
        To complete your registration and start exploring great content, please confirm your email address by clicking the link below:

        ${url}

        If you didn’t sign up for Nexus, feel free to ignore this message.

        The Nexus Team`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
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
