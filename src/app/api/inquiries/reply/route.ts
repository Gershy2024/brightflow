import { NextResponse } from "next/server";
import { transporter, DEFAULT_SENDER } from "@/lib/mailer";
import { BRIGHTFLOW_LOGO_FULL_DATA_URI } from "@/lib/logoDataUri";

interface ReplyRequestBody {
  inquiryId: string;
  recipientEmail: string;
  recipientName?: string;
  projectName?: string;
  inquiryTitle: string;
  replyMessage: string;
  adminName?: string;
}

export async function POST(req: Request) {
  try {
    const body: ReplyRequestBody = await req.json();

    if (!body.recipientEmail || !body.replyMessage) {
      return NextResponse.json(
        { error: "recipientEmail and replyMessage are required" },
        { status: 400 }
      );
    }

    const emailHtml = `
      <div dir="rtl" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
        <!-- Header -->
        <div style="background: #0f172a; padding: 24px; text-align: center;">
          <img src="${BRIGHTFLOW_LOGO_FULL_DATA_URI}" alt="BrightFlow" style="height: 40px; width: auto; margin: 0 auto 10px auto; display: block;" />
          <h2 style="color: #ffffff; margin: 0; font-size: 19px; font-weight: 800;">מענה לפנייתך ב-BrightFlow</h2>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px;">Custom Software • Smart Automation • Personal Support</p>
        </div>

        <div style="padding: 26px;">
          <p style="font-size: 14px; color: #334155; margin-top: 0;">
            שלום ${body.recipientName ? `<strong>${body.recipientName}</strong>` : ""},
          </p>

          <p style="font-size: 13.5px; color: #475569; line-height: 1.5;">
            בהמשך לפנייתך ${body.projectName ? `במערכת <strong>${body.projectName}</strong>` : ""} בנושא:
            <br />
            <strong style="color: #0f172a; font-size: 14px;">"${body.inquiryTitle}"</strong>
          </p>

          <!-- Response Body Box -->
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #14532d; white-space: pre-wrap;">
${body.replyMessage}
          </div>

          <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
            אנו עומדים לשירותך תמיד לכל צורך, שיפור או שאלה נוספת.
          </p>

          <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-weight: 800; font-size: 13px; color: #0f172a;">${body.adminName || "גרשי • BrightFlow"}</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #64748b;">gershybraun@gmail.com</p>
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
      to: body.recipientEmail,
      subject: `תשובה לפנייתך: ${body.inquiryTitle} [BrightFlow]`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (err: any) {
    console.error("Reply API error via Gmail SMTP:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
