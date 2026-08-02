import { config } from "@/data/config";
import nodemailer from "nodemailer";
import { z } from "zod";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});

function buildEmailHTML(fullName: string, email: string, message: string): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #0a0a0a; border-radius: 16px; border: 1px solid #1a1a1a;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #f59e0b; font-size: 22px; margin: 0;">📬 New Portfolio Contact Form Message</h1>
        <p style="color: #666; font-size: 14px; margin-top: 8px;">Someone reached out through your portfolio</p>
      </div>
      <div style="background-color: #111; border-radius: 12px; padding: 24px; margin-bottom: 16px; border: 1px solid #222;">
        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Name</p>
        <p style="color: #fff; font-size: 16px; margin: 0;">${fullName}</p>
      </div>
      <div style="background-color: #111; border-radius: 12px; padding: 24px; margin-bottom: 16px; border: 1px solid #222;">
        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Email</p>
        <a href="mailto:${email}" style="color: #f59e0b; font-size: 16px; text-decoration: none;">${email}</a>
      </div>
      <div style="background-color: #111; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #222;">
        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Message</p>
        <p style="color: #fff; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
      <div style="text-align: center; padding-top: 16px; border-top: 1px solid #1a1a1a;">
        <p style="color: #555; font-size: 12px; margin: 0;">Sent from Dhruvin Patel's Portfolio</p>
      </div>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: config.email,
      replyTo: zodData.email,
      subject: "New Portfolio Contact Form Message",
      html: buildEmailHTML(zodData.fullName, zodData.email, zodData.message),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
