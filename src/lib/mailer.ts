import nodemailer from "nodemailer";

const gmailUser = process.env.GMAIL_USER || "gershybraun@gmail.com";
const gmailPass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

export const DEFAULT_SENDER = `BrightFlow <${gmailUser}>`;
export const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || gmailUser;
