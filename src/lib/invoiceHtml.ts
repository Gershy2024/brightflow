import { InvoiceRecord, Project, InvoiceItem } from "./types";
import { BRIGHTFLOW_LOGO_FULL_DATA_URI } from "./logoDataUri";

interface InvoiceDataOptions {
  project: Project;
  invoice: InvoiceRecord;
  items: InvoiceItem[];
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  notes: string;
  displayTotal: number;
  invoiceLang: "en" | "he";
}

// Generates standalone full HTML page for printing / Save as PDF
export function generatePrintInvoiceHtml(opts: InvoiceDataOptions): string {
  const isHe = opts.invoiceLang === "he";
  const dir = isHe ? "rtl" : "ltr";

  const statusLabel =
    opts.status === "paid"
      ? (isHe ? "שולמה במלואה" : "PAID IN FULL")
      : opts.status === "overdue"
      ? (isHe ? "באיחור תשלום" : "OVERDUE")
      : opts.status === "draft"
      ? (isHe ? "טיוטה" : "DRAFT")
      : (isHe ? "לתשלום" : "PAYMENT DUE");

  const statusColor =
    opts.status === "paid"
      ? "#10B981"
      : opts.status === "overdue"
      ? "#EF4444"
      : "#2563EB";

  const statusBg =
    opts.status === "paid"
      ? "#ECFDF5"
      : opts.status === "overdue"
      ? "#FEF2F2"
      : "#EFF6FF";

  return `<!DOCTYPE html>
<html lang="${opts.invoiceLang}" dir="${dir}">
<head>
  <meta charset="utf-8" />
  <title>Invoice ${opts.invoiceNumber} - BrightFlow</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 18mm 16mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.5;
      font-size: 13px;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .invoice-wrapper {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 24px;
      margin-bottom: 24px;
    }
    .brand-box {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .logo-svg {
      width: 46px;
      height: 46px;
    }
    .brand-name {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #0f172a;
    }
    .brand-name span {
      color: #2563eb;
    }
    .brand-tagline {
      font-size: 11px;
      font-weight: 700;
      color: #2563eb;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .brand-sub {
      font-size: 11px;
      color: #64748b;
      margin-top: 3px;
    }
    .invoice-meta-box {
      text-align: ${isHe ? "left" : "right"};
    }
    .invoice-title {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 1px;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: ${statusColor};
      background-color: ${statusBg};
      border: 1px solid ${statusColor}33;
      margin-bottom: 8px;
    }
    .meta-line {
      font-size: 12px;
      color: #475569;
      margin-bottom: 3px;
    }
    .meta-line strong {
      color: #0f172a;
      font-family: monospace;
      font-size: 13px;
    }
    .parties-grid {
      display: flex;
      gap: 24px;
      margin-bottom: 28px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 20px;
    }
    .party-col {
      flex: 1;
    }
    .party-title {
      font-size: 10px;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.75px;
      margin-bottom: 6px;
    }
    .party-name {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 3px;
    }
    .party-details {
      font-size: 12px;
      color: #475569;
      line-height: 1.5;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .items-table th {
      background: #f1f5f9;
      color: #475569;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 12px;
      border-bottom: 2px solid #cbd5e1;
      text-align: ${isHe ? "right" : "left"};
    }
    .items-table th.num-col, .items-table td.num-col {
      text-align: center;
      width: 80px;
    }
    .items-table th.price-col, .items-table td.price-col {
      text-align: ${isHe ? "left" : "right"};
      width: 130px;
      font-family: monospace;
    }
    .items-table td {
      padding: 12px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 12.5px;
    }
    .items-table tr:nth-child(even) td {
      background: #fafafa;
    }
    .totals-area {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      border-top: 2px solid #e2e8f0;
      padding-top: 20px;
      margin-bottom: 32px;
    }
    .notes-box {
      flex: 1;
      font-size: 12px;
      color: #475569;
      max-width: 420px;
    }
    .notes-title {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .totals-card {
      width: 260px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px 18px;
    }
    .totals-line {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #475569;
      margin-bottom: 6px;
    }
    .totals-final {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2px solid #cbd5e1;
      padding-top: 10px;
      margin-top: 8px;
      font-size: 15px;
      font-weight: 900;
      color: #0f172a;
    }
    .totals-amount {
      font-size: 20px;
      font-weight: 900;
      color: #2563eb;
      font-family: monospace;
    }
    .footer-bar {
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      text-align: center;
      color: #94a3b8;
      font-size: 11px;
    }
    .footer-highlight {
      font-weight: 700;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="invoice-wrapper">
    <!-- Header -->
    <div class="header-row">
      <div class="brand-box">
        <img src="${BRIGHTFLOW_LOGO_FULL_DATA_URI}" alt="TheBrightFlow" style="height: 52px; width: auto; object-fit: contain; display: block;" />
        <div style="margin-left: 12px;">
          <div class="brand-tagline">Custom Software • Smart Automation</div>
          <div class="brand-sub">support@brightflow.io | Personal Support</div>
        </div>
      </div>

      <div class="invoice-meta-box">
        <div class="invoice-title">${isHe ? "חשבונית מס / קבלה" : "INVOICE"}</div>
        <div><span class="status-badge">${statusLabel}</span></div>
        <div class="meta-line">${isHe ? "מספר חשבונית:" : "Invoice No:"} <strong>${opts.invoiceNumber}</strong></div>
        <div class="meta-line">${isHe ? "תאריך הנפקה:" : "Date Issued:"} <strong>${opts.issueDate}</strong></div>
        ${opts.dueDate ? `<div class="meta-line">${isHe ? "לתשלום עד:" : "Due Date:"} <strong style="color: #e11d48;">${opts.dueDate}</strong></div>` : ""}
      </div>
    </div>

    <!-- Parties Section -->
    <div class="parties-grid">
      <div class="party-col">
        <div class="party-title">${isHe ? "פרטי לקוח / Billed To:" : "Billed To:"}</div>
        <div class="party-name">${opts.clientName || opts.project.ownerName}</div>
        <div class="party-details">
          ${opts.clientAddress ? `<div>${opts.clientAddress}</div>` : ""}
          ${opts.clientPhone ? `<div>Tel: ${opts.clientPhone}</div>` : ""}
          ${opts.clientEmail ? `<div>Email: ${opts.clientEmail}</div>` : ""}
        </div>
      </div>

      <div class="party-col">
        <div class="party-title">${isHe ? "פרויקט / Project:" : "Project / Services:"}</div>
        <div class="party-name">${opts.project.name}</div>
        <div class="party-details">
          <div>${opts.project.description || ""}</div>
          ${opts.project.liveUrl ? `<div style="color: #2563eb; text-decoration: underline; margin-top: 4px;">${opts.project.liveUrl}</div>` : ""}
        </div>
      </div>
    </div>

    <!-- Items Table -->
    <table class="items-table">
      <thead>
        <tr>
          <th>${isHe ? "תיאור השירות / Deliverables" : "Description / Deliverables"}</th>
          <th class="num-col">${isHe ? "כמות" : "Qty"}</th>
          <th class="price-col">${isHe ? "מחיר יחידה" : "Rate"}</th>
          <th class="price-col">${isHe ? "סה״כ" : "Amount"}</th>
        </tr>
      </thead>
      <tbody>
        ${opts.items
          .map(
            (item) => `<tr>
          <td><strong>${item.description || (isHe ? "פיתוח והטמעה" : "Custom Software Development")}</strong></td>
          <td class="num-col">${item.quantity || 1}</td>
          <td class="price-col">$${(item.unitPrice || 0).toLocaleString()}</td>
          <td class="price-col"><strong>$${((item.quantity || 1) * (item.unitPrice || 0)).toLocaleString()}</strong></td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <!-- Totals and Payment Instructions -->
    <div class="totals-area">
      <div class="notes-box">
        <div class="notes-title">${isHe ? "הנחיות תשלום ותנאים:" : "Payment Instructions & Terms:"}</div>
        <p style="margin-bottom: 8px;">
          ${isHe
            ? `תשלום יתקבל באמצעות העברה בנקאית, צ׳ק או כרטיס אשראי. אנא ציינו את מספר החשבונית <strong>${opts.invoiceNumber}</strong> בכל תשלום.`
            : `Payment accepted via Bank Transfer, Stripe, Check, or Credit Card. Please include invoice number <strong>${opts.invoiceNumber}</strong> with your remittance.`}
        </p>
        ${opts.notes ? `<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 8px 12px; color: #1e40af; font-size: 11.5px;">${opts.notes}</div>` : ""}
      </div>

      <div class="totals-card">
        <div class="totals-line">
          <span>${isHe ? "סכום ביניים:" : "Subtotal:"}</span>
          <span>$${opts.displayTotal.toLocaleString()}</span>
        </div>
        <div class="totals-line">
          <span>${isHe ? "מס / מע״מ:" : "Tax / VAT:"}</span>
          <span>$0.00</span>
        </div>
        <div class="totals-final">
          <span>${isHe ? "סה״כ לתשלום:" : "Total Due:"}</span>
          <span class="totals-amount">$${opts.displayTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <div class="footer-highlight">BrightFlow • Custom Software. Smart Automation. Personal Support.</div>
      <div>${isHe ? "תודה רבה על שיתוף הפעולה!" : "Thank you for your business!"}</div>
    </div>
  </div>
</body>
</html>`;
}

// Generates rich HTML table formatted specifically for pasting into Gmail / Outlook email compose windows
export function generateEmailRichHtml(opts: InvoiceDataOptions): string {
  const isHe = opts.invoiceLang === "he";
  const dir = isHe ? "rtl" : "ltr";

  return `<div dir="${dir}" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
  <!-- Brand Header -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; padding: 20px 24px; border-bottom: 2px solid #e2e8f0;">
    <tr>
      <td style="vertical-align: middle;">
        <img src="${BRIGHTFLOW_LOGO_FULL_DATA_URI}" alt="TheBrightFlow" style="height: 48px; width: auto; max-width: 240px; display: block;" />
        <p style="margin: 6px 0 0 0; font-size: 11px; font-weight: 700; color: #2563eb; text-transform: uppercase; letter-spacing: 0.5px;">
          Custom Software • Smart Automation • Personal Support
        </p>
      </td>
      <td style="text-align: ${isHe ? "left" : "right"}; vertical-align: middle;">
        <div style="display: inline-block; background: ${opts.status === "paid" ? "#ecfdf5" : "#eff6ff"}; border: 1px solid ${opts.status === "paid" ? "#a7f3d0" : "#bfdbfe"}; padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: 800; color: ${opts.status === "paid" ? "#065f46" : "#1e40af"};">
          ${opts.status === "paid" ? "PAID" : "INVOICE"}
        </div>
      </td>
    </tr>
  </table>

  <div style="padding: 24px;">
    <!-- Meta Summary -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
      <tr>
        <td style="vertical-align: top;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">${isHe ? "לכבוד (הלקוח)" : "BILLED TO"}</p>
          <p style="margin: 0; font-size: 15px; font-weight: 800; color: #0f172a;">${opts.clientName || opts.project.ownerName}</p>
          ${opts.clientAddress ? `<p style="margin: 2px 0 0 0; font-size: 12px; color: #475569;">${opts.clientAddress}</p>` : ""}
          ${opts.clientPhone ? `<p style="margin: 2px 0 0 0; font-size: 12px; color: #475569;">Tel: ${opts.clientPhone}</p>` : ""}
        </td>
        <td style="text-align: ${isHe ? "left" : "right"}; vertical-align: top;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">${isHe ? "פרטי החשבונית" : "INVOICE DETAILS"}</p>
          <p style="margin: 0; font-size: 13px; color: #0f172a;">${isHe ? "חשבונית:" : "Invoice #:"} <strong style="font-family: monospace;">${opts.invoiceNumber}</strong></p>
          <p style="margin: 2px 0 0 0; font-size: 12px; color: #475569;">${isHe ? "תאריך:" : "Date:"} ${opts.issueDate}</p>
          ${opts.dueDate ? `<p style="margin: 2px 0 0 0; font-size: 12px; color: #e11d48; font-weight: 700;">${isHe ? "לתשלום עד:" : "Due Date:"} ${opts.dueDate}</p>` : ""}
        </td>
      </tr>
    </table>

    <!-- Project Box -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px;">
      <p style="margin: 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">${isHe ? "פרויקט" : "PROJECT"}</p>
      <p style="margin: 2px 0 0 0; font-size: 14px; font-weight: 800; color: #0f172a;">${opts.project.name}</p>
      ${opts.project.description ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #475569;">${opts.project.description}</p>` : ""}
    </div>

    <!-- Line Items Table -->
    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px; font-size: 12.5px;">
      <thead>
        <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: ${isHe ? "right" : "left"};">
          <th style="padding: 10px; font-size: 11px; color: #475569; text-transform: uppercase;">${isHe ? "תיאור השירות" : "Description"}</th>
          <th style="padding: 10px; font-size: 11px; color: #475569; text-align: center; width: 60px;">${isHe ? "כמות" : "Qty"}</th>
          <th style="padding: 10px; font-size: 11px; color: #475569; text-align: ${isHe ? "left" : "right"}; width: 100px;">${isHe ? "מחיר" : "Rate"}</th>
          <th style="padding: 10px; font-size: 11px; color: #475569; text-align: ${isHe ? "left" : "right"}; width: 100px;">${isHe ? "סה״כ" : "Amount"}</th>
        </tr>
      </thead>
      <tbody>
        ${opts.items
          .map(
            (it) => `<tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px; color: #0f172a;"><strong>${it.description || "Software Development"}</strong></td>
          <td style="padding: 10px; text-align: center; color: #64748b;">${it.quantity || 1}</td>
          <td style="padding: 10px; text-align: ${isHe ? "left" : "right"}; font-family: monospace;">$${(it.unitPrice || 0).toLocaleString()}</td>
          <td style="padding: 10px; text-align: ${isHe ? "left" : "right"}; font-family: monospace; font-weight: bold; color: #0f172a;">$${((it.quantity || 1) * (it.unitPrice || 0)).toLocaleString()}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <!-- Total Due Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="vertical-align: top; padding-right: 16px;">
          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 700; color: #0f172a;">${isHe ? "הנחיות תשלום:" : "Payment Instructions:"}</p>
          <p style="margin: 0; font-size: 11.5px; color: #64748b; line-height: 1.4;">
            ${isHe
              ? `ניתן לשלם בהעברה בנקאית, כרטיס אשראי, צ׳ק או Stripe. אנא ציינו את מספר החשבונית <strong>${opts.invoiceNumber}</strong> בהעברה.`
              : `Payment accepted via Bank Transfer, Stripe, Check, or Card. Please reference invoice number <strong>${opts.invoiceNumber}</strong> with payment.`}
          </p>
        </td>
        <td style="width: 200px; vertical-align: top;">
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 14px; text-align: ${isHe ? "left" : "right"};">
            <span style="font-size: 11px; font-weight: 700; color: #1e40af; text-transform: uppercase;">${isHe ? "סה״כ לתשלום" : "TOTAL DUE"}</span>
            <div style="font-size: 24px; font-weight: 900; color: #2563eb; font-family: monospace; margin-top: 4px;">
              $${opts.displayTotal.toLocaleString()}
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Footer -->
    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; font-size: 11px; color: #94a3b8;">
      <p style="margin: 0; font-weight: 700; color: #475569;">BrightFlow • Custom Software. Smart Automation. Personal Support.</p>
      <p style="margin: 2px 0 0 0;">support@brightflow.io</p>
    </div>
  </div>
</div>`;
}
