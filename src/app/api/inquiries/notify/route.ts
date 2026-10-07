import { NextResponse } from "next/server";
import { transporter, DEFAULT_SENDER, ADMIN_EMAIL } from "@/lib/mailer";
import { BRIGHTFLOW_LOGO_FULL_DATA_URI } from "@/lib/logoDataUri";

interface NotifyRequestBody {
  inquiryId?: string;
  projectName?: string;
  projectId?: string;
  type?: "bug" | "question" | "feedback" | "feature_request";
  title: string;
  message: string;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
}

export async function POST(req: Request) {
  try {
    const body: NotifyRequestBody = await req.json();

    if (!body.title || !body.message) {
      return NextResponse.json(
        { error: "Title and message are required" },
        { status: 400 }
      );
    }

    const typeLabels: Record<string, { he: string; color: string }> = {
      bug: { he: "דיווח על תקלה (Bug)", color: "#ef4444" },
      question: { he: "שאלה מלקוח", color: "#3b82f6" },
      feedback: { he: "המלצה לשיפור", color: "#10b981" },
      feature_request: { he: "בקשת פיצ׳ר חדש", color: "#8b5cf6" },
    };

    const typeInfo = typeLabels[body.type || "question"] || {
      he: "פנייה מלקוח",
      color: "#2563eb",
    };

    const emailHtml = `
      <div dir="rtl" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
        <!-- Header -->
        <div style="background: #0f172a; padding: 24px; text-align: center;">
          <img src="${BRIGHTFLOW_LOGO_FULL_DATA_URI}" alt="BrightFlow" style="height: 40px; width: auto; margin: 0 auto 10px auto; display: block;" />
          <h2 style="color: #ffffff; margin: 0; font-size: 19px; font-weight: 800;">התראה: פנייה חדשה מלקוח</h2>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px;">BrightFlow Control Center</p>
        </div>

        <div style="padding: 26px;">
          <!-- Badge -->
          <div style="margin-bottom: 20px;">
            <span style="background-color: ${typeInfo.color}15; color: ${typeInfo.color}; border: 1px solid ${typeInfo.color}35; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 800; display: inline-block;">
              ${typeInfo.he}
            </span>
            ${body.projectName ? `<span style="margin-right: 8px; color: #64748b; font-size: 13px; font-weight: 600;">בפרויקט: <strong style="color: #0f172a;">${body.projectName}</strong></span>` : ""}
          </div>

          <!-- Title -->
          <h3 style="margin: 0 0 12px 0; font-size: 17px; font-weight: 900; color: #0f172a;">
            ${body.title}
          </h3>

          <!-- Message Box -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 22px; font-size: 13.5px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
${body.message}
          </div>

          <!-- Sender Details -->
          <div style="background: #f1f5f9; border-radius: 10px; padding: 14px 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">פרטי השולח</p>
            <p style="margin: 0 0 4px 0; font-size: 13px; color: #0f172a;"><strong>שם:</strong> ${body.senderName || "לא צוין"}</p>
            ${body.senderEmail ? `<p style="margin: 0 0 4px 0; font-size: 13px; color: #0f172a;"><strong>אימייל:</strong> <a href="mailto:${body.senderEmail}" style="color: #2563eb;">${body.senderEmail}</a></p>` : ""}
            ${body.senderPhone ? `<p style="margin: 0; font-size: 13px; color: #0f172a;"><strong>טלפון:</strong> ${body.senderPhone}</p>` : ""}
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin-top: 26px;">
            <a href="https://brightflow-pi.vercel.app/" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 11px 26px; border-radius: 12px; font-size: 13px; font-weight: 800; display: inline-block;">
              פתח את מרכז השליטה ב-BrightFlow &larr;
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
          BrightFlow • Custom Software. Smart Automation. Personal Support.
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: DEFAULT_SENDER,
      to: ADMIN_EMAIL,
      subject: `[BrightFlow] ${typeInfo.he}: ${body.projectName ? `[${body.projectName}] ` : ""}${body.title}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (err: any) {
    console.error("Notify admin API error via Gmail SMTP:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
