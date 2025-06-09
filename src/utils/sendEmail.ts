import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.PASSWORD_GMAIL,
  },
});

type Email = {
  to: string;
  subject: string;
  text: string;
};

export const sendEmail = async ({ to, subject, text }: Email) => {
  await transporter.sendMail({
    from: process.env.USER_GMAIL,
    to,
    subject,
    text,
  });
};
