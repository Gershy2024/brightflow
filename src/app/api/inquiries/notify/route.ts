import { NextResponse } from "next/server";
import { transporter, DEFAULT_SENDER, ADMIN_EMAIL } from "@/lib/mailer";
import { BRIGHTFLOW_LOGO_FULL_DATA_URI } from "@/lib/logoDataUri";
import { supabase } from "@/lib/supabase";

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

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "brightflow-inquiry-notifier",
      adminEmail: ADMIN_EMAIL,
      timestamp: new Date().toISOString(),
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(req: Request) {
  try {
    const body: NotifyRequestBody = await req.json();

    if (!body.title || !body.message) {
      return NextResponse.json(
        { error: "Title and message are required" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Resolve project name if missing but projectId is provided
    let projectName = body.projectName;
    if (!projectName && body.projectId) {
      try {
        const { data } = await supabase
          .from("brightflow_projects")
          .select("name")
          .eq("id", body.projectId)
          .single();
        if (data?.name) {
          projectName = data.name;
        }
      } catch (err) {
        console.warn("Could not lookup projectName from Supabase:", err);
      }
    }

    // If no inquiryId provided, ensure it gets stored in brightflow_inquiries
    let inquiryId = body.inquiryId;
    if (!inquiryId) {
      inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      try {
        await supabase.from("brightflow_inquiries").insert({
          id: inquiryId,
          project_id: body.projectId || null,
          type: body.type || "question",
          title: body.title,
          message: body.message,
          sender_name: body.senderName || null,
          sender_email: body.senderEmail || null,
          sender_phone: body.senderPhone || null,
          status: "new",
          created_at: new Date().toISOString(),
        });
      } catch (insertErr) {
        console.warn("Supabase auto-insert warning in notify route:", insertErr);
      }
    }

    const typeLabels: Record<string, { he: string; en: string; color: string; badgeBg: string }> = {
      bug: { he: "דיווח על תקלה (Bug)", en: "Bug Report", color: "#ef4444", badgeBg: "#fef2f2" },
      question: { he: "שאלה מלקוח", en: "Client Question", color: "#2563eb", badgeBg: "#eff6ff" },
      feedback: { he: "המלצה לשיפור", en: "Client Feedback", color: "#10b981", badgeBg: "#ecfdf5" },
      feature_request: { he: "בקשת פיצ׳ר חדש", en: "Feature Request", color: "#8b5cf6", badgeBg: "#f5f3ff" },
    };

    const typeInfo = typeLabels[body.type || "question"] || {
      he: "פנייה מלקוח",
      en: "Client Inquiry",
      color: "#2563eb",
      badgeBg: "#eff6ff",
    };

    // Prepare WhatsApp link if valid phone
    const rawPhone = body.senderPhone || "";
    const cleanPhone = rawPhone.replace(/[^\d]/g, "");
    const waPhone = cleanPhone.startsWith("0") ? "972" + cleanPhone.substring(1) : (cleanPhone.length === 10 ? "1" + cleanPhone : cleanPhone);
    const waUrl = cleanPhone ? `https://wa.me/${waPhone}` : null;

    const emailHtml = `
      <div dir="rtl" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
        <!-- Header -->
        <div style="background: #0f172a; padding: 26px 20px; text-align: center;">
          <img src="${BRIGHTFLOW_LOGO_FULL_DATA_URI}" alt="BrightFlow" style="height: 42px; width: auto; margin: 0 auto 12px auto; display: block;" />
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">התראה: פנייה חדשה מלקוח</h2>
          <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 12px; font-weight: 600;">BrightFlow Central Control Center</p>
        </div>

        <div style="padding: 28px;">
          <!-- Badge Strip -->
          <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="background-color: ${typeInfo.badgeBg}; color: ${typeInfo.color}; border: 1px solid ${typeInfo.color}40; padding: 5px 14px; border-radius: 9999px; font-size: 12px; font-weight: 800; display: inline-block;">
              ● ${typeInfo.he}
            </span>
            ${projectName ? `<span style="background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; padding: 5px 14px; border-radius: 9999px; font-size: 12px; font-weight: 800; display: inline-block;">מערכת: <strong>${projectName}</strong></span>` : ""}
          </div>

          <!-- Subject Title -->
          <div style="background: #f8fafc; border-right: 4px solid ${typeInfo.color}; border-radius: 0 10px 10px 0; padding: 12px 16px; margin-bottom: 16px;">
            <p style="margin: 0 0 3px 0; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">נושא הפנייה</p>
            <h3 style="margin: 0; font-size: 18px; font-weight: 900; color: #0f172a;">
              ${body.title}
            </h3>
          </div>

          <!-- Message Box -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 22px; font-size: 14.5px; line-height: 1.65; color: #1e293b; white-space: pre-wrap; word-break: break-word;">
${body.message}
          </div>

          <!-- Sender Details Card -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
              פרטי איש הקשר
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
              <tr>
                <td style="padding: 4px 0; color: #64748b; width: 80px; font-weight: 600;">שם הלקוח:</td>
                <td style="padding: 4px 0; color: #0f172a; font-weight: 800;">${body.senderName || "לא צוין"}</td>
              </tr>
              ${body.senderEmail ? `
              <tr>
                <td style="padding: 4px 0; color: #64748b; font-weight: 600;">אימייל:</td>
                <td style="padding: 4px 0;">
                  <a href="mailto:${body.senderEmail}" style="color: #2563eb; text-decoration: none; font-weight: 700;">${body.senderEmail}</a>
                  &nbsp;<a href="mailto:${body.senderEmail}?subject=מענה לפנייתך: ${encodeURIComponent(body.title)}" style="display: inline-block; background: #eff6ff; color: #2563eb; padding: 2px 8px; border-radius: 6px; font-size: 11px; text-decoration: none; font-weight: 700;">השב במייל</a>
                </td>
              </tr>` : ""}
              ${body.senderPhone ? `
              <tr>
                <td style="padding: 4px 0; color: #64748b; font-weight: 600;">טלפון:</td>
                <td style="padding: 4px 0; color: #0f172a; font-weight: 700;">
                  <a href="tel:${body.senderPhone}" style="color: #0f172a; text-decoration: none;">${body.senderPhone}</a>
                  ${waUrl ? `&nbsp;<a href="${waUrl}" target="_blank" style="display: inline-block; background: #ecfdf5; color: #059669; padding: 2px 8px; border-radius: 6px; font-size: 11px; text-decoration: none; font-weight: 700;">וואטסאפ</a>` : ""}
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding: 4px 0; color: #64748b; font-weight: 600;">זמן קבלה:</td>
                <td style="padding: 4px 0; color: #64748b; font-size: 12px;">${new Date().toLocaleString("he-IL", { timeZone: "America/New_York" })} (NY Time)</td>
              </tr>
            </table>
          </div>

          <!-- Action Buttons -->
          <div style="text-align: center; margin-top: 24px; display: flex; justify-content: center; gap: 12px;">
            <a href="https://brightflow-pi.vercel.app/admin" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-size: 13.5px; font-weight: 800; display: inline-block; box-shadow: 0 4px 12px rgba(37,99,235,0.25);">
              פתח את מרכז השליטה ב-BrightFlow &larr;
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px; text-align: center; font-size: 11.5px; color: #94a3b8;">
          BrightFlow Control Center • Custom Software. Smart Automation. Personal Support.
        </div>
      </div>
    `;

    const emailSubject = `[BrightFlow] ${typeInfo.he}: ${projectName ? `[${projectName}] ` : ""}${body.title}`;

    let messageId: string | null = null;
    let sendError: any = null;

    // 1. Primary: Send via Nodemailer Gmail SMTP
    try {
      const info = await transporter.sendMail({
        from: DEFAULT_SENDER,
        to: ADMIN_EMAIL,
        subject: emailSubject,
        html: emailHtml,
      });
      messageId = info.messageId;
    } catch (smtpErr: any) {
      console.error("Primary Gmail SMTP failed:", smtpErr?.message);
      sendError = smtpErr;

      // 2. Secondary: Fallback to Resend API if configured
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        try {
          const resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "BrightFlow Notifications <onboarding@resend.dev>",
              to: [ADMIN_EMAIL],
              subject: emailSubject,
              html: emailHtml,
            }),
          });
          const resendData = await resendRes.json();
          if (resendRes.ok && resendData?.id) {
            messageId = resendData.id;
            sendError = null;
          }
        } catch (resendErr) {
          console.error("Resend fallback error:", resendErr);
        }
      }
    }

    if (!messageId && sendError) {
      console.error("Notify admin API error across all transports:", sendError);
      return NextResponse.json(
        { success: false, error: sendError.message || "Failed to deliver email" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      { success: true, messageId, inquiryId },
      { headers: CORS_HEADERS }
    );
  } catch (err: any) {
    console.error("Notify API unhandled error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
