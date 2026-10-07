"use client";

import React, { useState } from "react";
import {
  X,
  Printer,
  Mail,
  Copy,
  Check,
  Plus,
  Trash2,
  FileText,
  Calendar,
  Building,
  User,
  DollarSign,
  Share2,
  Languages,
  Code,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { InvoiceRecord, InvoiceItem, Project, Language } from "@/lib/types";
import { translations } from "@/lib/i18n";
import { BrightFlowLogoIcon } from "./BrightFlowLogo";
import { generatePrintInvoiceHtml, generateEmailRichHtml } from "@/lib/invoiceHtml";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  invoice: InvoiceRecord | null;
  onUpdateInvoice?: (updatedInvoice: InvoiceRecord) => void;
  lang?: Language;
}

export function InvoiceModal({
  isOpen,
  onClose,
  project: propProject,
  invoice,
  onUpdateInvoice,
  lang = "he",
}: InvoiceModalProps) {
  const project: Project = React.useMemo(() => {
    if (propProject) return propProject;
    return {
      id: "prj_general",
      name: "שירותי תוכנה ופיתוח",
      description: "פיתוח מערכת והטמעה",
      status: "live",
      deploymentProvider: "Vercel",
      databaseType: "Supabase",
      techStack: [],
      ownerName: invoice?.clientName || "לקוח",
      contacts: [],
      orderIndex: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }, [propProject, invoice]);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  // Default to English as explicitly requested: "גם יהא באנגלית"
  const [invoiceLang, setInvoiceLang] = useState<"en" | "he">("en");

  // Editable local state
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"draft" | "sent" | "paid" | "overdue">("sent");
  const [notes, setNotes] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [paidAmount, setPaidAmount] = useState<number | undefined>(undefined);
  const [items, setItems] = useState<InvoiceItem[]>([]);

  // Sync state when invoice opens
  React.useEffect(() => {
    if (invoice) {
      setInvoiceNumber(
        invoice.invoiceNumber ||
          `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
      );
      setIssueDate(invoice.issueDate || new Date().toISOString().split("T")[0]);
      setDueDate(invoice.dueDate || "");
      setStatus(invoice.status || "sent");
      setNotes(
        invoice.notes ||
          (invoiceLang === "he"
            ? "תודה על שבחרתם ב-BrightFlow. נשמח לעמוד לשירותכם בכל עת."
            : "Thank you for your business. Please remit payment via Bank Transfer, Stripe, Check, or Card.")
      );
      setClientName(invoice.clientName || project?.ownerName || "");
      setClientEmail(invoice.clientEmail || project?.contacts?.[0]?.email || "");
      setClientPhone(invoice.clientPhone || project?.contacts?.[0]?.phone || "");
      setClientAddress(invoice.clientAddress || project?.organization || "");
      // Default paid amount from invoice or fallback to project payments if available
      const initPaid = invoice.paidAmount !== undefined
        ? invoice.paidAmount
        : (project?.paidAmount && project.paidAmount > 0 ? project.paidAmount : undefined);
      setPaidAmount(initPaid);

      if (invoice.items && invoice.items.length > 0) {
        setItems(invoice.items);
      } else {
        const projectName = project?.name || "שירותי תוכנה ופיתוח";
        setItems([
          {
            id: "item_1",
            description:
              invoiceLang === "he"
                ? `פיתוח והטמעת מערכת: ${projectName}`
                : `Custom Software Development & Implementation: ${projectName}`,
            quantity: 1,
            unitPrice: invoice.amount || project?.estimatedValue || 0,
          },
        ]);
      }
      setIsEditing(false);
    }
  }, [invoice, project, invoiceLang]);

  if (!isOpen || !invoice) return null;

  const totalCalculated = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    0
  );

  const displayTotal = items.length > 0 ? totalCalculated : invoice.amount;
  const currentPaid = paidAmount !== undefined ? paidAmount : 0;
  const remainingBalance = Math.max(0, displayTotal - currentPaid);

  const invoiceDataOptions = {
    project,
    invoice,
    items,
    invoiceNumber,
    issueDate,
    dueDate,
    status,
    clientName,
    clientEmail,
    clientPhone,
    clientAddress,
    notes,
    displayTotal,
    paidAmount: currentPaid,
    remainingBalance,
    invoiceLang,
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `item_${Date.now()}`,
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const handleRemoveItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleUpdateItem = (
    idx: number,
    field: keyof InvoiceItem,
    val: string | number
  ) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: val };
    setItems(next);
  };

  const handleSave = () => {
    const updated: InvoiceRecord = {
      ...invoice,
      invoiceNumber,
      amount: displayTotal,
      paidAmount: currentPaid,
      remainingBalance,
      issueDate,
      dueDate,
      status,
      notes,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      items,
    };
    onUpdateInvoice?.(updated);
    setIsEditing(false);
  };

  // 100% Reliable Print & Save as PDF Handler
  // Opens dedicated clean print window to eliminate Chromium modal clipping bugs
  const handlePrint = () => {
    const html = generatePrintInvoiceHtml(invoiceDataOptions);
    const printWindow = window.open("", "_blank", "width=900,height=1000");

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();

      // Trigger print once rendered
      setTimeout(() => {
        printWindow.print();
      }, 350);
    } else {
      // Fallback via hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          setTimeout(() => document.body.removeChild(iframe), 2000);
        }, 500);
      }
    }
  };

  // Copy Rich Styled HTML directly into Clipboard for Gmail / Outlook paste
  const handleCopyRichEmail = async () => {
    const richHtml = generateEmailRichHtml(invoiceDataOptions);
    const plainText = `BrightFlow | Invoice ${invoiceNumber}
Project: ${project.name}
Client: ${clientName || project.ownerName}
Total Due: $${displayTotal.toLocaleString()}
Due Date: ${dueDate || "Upon Receipt"}
`;

    try {
      if (typeof window !== "undefined" && window.ClipboardItem) {
        const htmlBlob = new Blob([richHtml], { type: "text/html" });
        const textBlob = new Blob([plainText], { type: "text/plain" });
        const item = new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": textBlob,
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(richHtml);
      }
      setCopiedType("rich");
      setTimeout(() => setCopiedType(null), 3000);
    } catch (err) {
      // Fallback to text copy
      navigator.clipboard.writeText(richHtml);
      setCopiedType("rich");
      setTimeout(() => setCopiedType(null), 3000);
    }
  };

  // Copy raw HTML source code
  const handleCopyRawHtml = () => {
    const richHtml = generateEmailRichHtml(invoiceDataOptions);
    navigator.clipboard.writeText(richHtml);
    setCopiedType("html");
    setTimeout(() => setCopiedType(null), 3000);
  };

  // Email mailto handler
  const handleSendEmail = () => {
    const isHe = invoiceLang === "he";
    const subject = encodeURIComponent(
      isHe
        ? `חשבונית מספר ${invoiceNumber} מ-BrightFlow - ${project.name}`
        : `Invoice ${invoiceNumber} from BrightFlow - ${project.name}`
    );
    const body = encodeURIComponent(
      isHe
        ? `שלום ${clientName || "לקוח יקר"},

מצורפת דרישת תשלום / חשבונית מספר: ${invoiceNumber}
עבור פרויקט: ${project.name}

סכום לתשלום: $${displayTotal.toLocaleString()}
תאריך הנפקה: ${issueDate}
${dueDate ? `לתשלום עד: ${dueDate}\n` : ""}
פירוט סעיפים:
${items.map((it) => `- ${it.description} (כמות: ${it.quantity}): $${((it.quantity || 1) * (it.unitPrice || 0)).toLocaleString()}`).join("\n")}

${notes ? `הערות:\n${notes}\n\n` : ""}בברכה,
BrightFlow - Custom Software. Smart Automation. Personal Support.
`
        : `Dear ${clientName || "Valued Client"},

Please find invoice ${invoiceNumber} for project "${project.name}".

Total Amount Due: $${displayTotal.toLocaleString()}
Date Issued: ${issueDate}
${dueDate ? `Payment Due: ${dueDate}\n` : ""}
Services Breakdown:
${items.map((it) => `- ${it.description} (Qty: ${it.quantity}): $${((it.quantity || 1) * (it.unitPrice || 0)).toLocaleString()}`).join("\n")}

${notes ? `Notes:\n${notes}\n\n` : ""}Sincerely,
BrightFlow - Custom Software. Smart Automation. Personal Support.
`
    );
    window.location.href = `mailto:${clientEmail || ""}?subject=${subject}&body=${body}`;
  };

  const isHe = invoiceLang === "he";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-100 dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 my-6 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brightflow-mark.png" alt="TheBrightFlow" className="h-9 w-9 object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white font-sans">
                  {invoiceNumber}
                </h3>
                <Badge
                  className={
                    status === "paid"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold"
                      : status === "overdue"
                      ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-bold"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold"
                  }
                >
                  {status === "paid"
                    ? "PAID"
                    : status === "overdue"
                    ? "OVERDUE"
                    : "DUE"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate max-w-xs">
                {project.name} • {clientName || project.ownerName}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Language Switcher */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInvoiceLang(invoiceLang === "en" ? "he" : "en")}
              className="h-8 gap-1.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10"
              title="שנה שפת חשבונית"
            >
              <Languages className="h-3.5 w-3.5 text-blue-600" />
              <span>{invoiceLang === "en" ? "🇺🇸 English" : "🇮🇱 עברית"}</span>
            </Button>

            {/* Edit Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="h-8 gap-1.5 text-xs font-semibold rounded-xl"
            >
              {isEditing ? "תצוגת מסמך" : "ערוך פרטים"}
            </Button>

            {/* Copy Styled HTML for Email Paste */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyRichEmail}
              className="h-8 gap-1.5 text-xs font-semibold rounded-xl text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50"
              title="מעתיק תוכן מעוצב שניתן להדביק ישירות ב-Gmail / Outlook"
            >
              {copiedType === "rich" ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Mail className="h-3.5 w-3.5" />
              )}
              <span>{copiedType === "rich" ? "הועתק למייל!" : "העתק למייל"}</span>
            </Button>

            {/* Copy HTML Source Code */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyRawHtml}
              className="h-8 gap-1.5 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900"
              title="העתק קוד HTML מלא"
            >
              {copiedType === "html" ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Code className="h-3.5 w-3.5" />
              )}
              <span>{copiedType === "html" ? "הועתק קוד!" : "קוד HTML"}</span>
            </Button>

            {/* Print / Save as PDF Button */}
            <Button
              variant="default"
              size="sm"
              onClick={handlePrint}
              className="h-8 gap-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              title="פתח חלון הדפסה ושמירה כ-PDF ללא שיבושים"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>הדפס / שמור כ-PDF</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Feedback Alert Banner when Copied */}
        {copiedType === "rich" && (
          <div className="bg-emerald-500 text-white text-xs font-semibold py-2 px-6 text-center animate-in fade-in duration-200 flex items-center justify-center gap-2">
            <Check className="h-4 w-4" />
            <span>
              התוכן המעוצב הועתק ללוח! פתח כעת את תוכנת המייל שלך (Gmail / Outlook) ובצע הדבק (Ctrl+V) לקבלת הודעה מעוצבת.
            </span>
          </div>
        )}

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {/* Live Edit Mode Form */}
          {isEditing && (
            <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4 text-slate-900 dark:text-slate-100">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h4 className="text-sm font-bold text-foreground">
                  עריכת פרטי חשבונית וסעיפי חיוב
                </h4>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="h-8 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  שמור שינויים לחשבונית
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Invoice Number</label>
                  <Input
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="h-8 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Issue Date</label>
                  <Input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Due Date</label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="flex h-8 w-full rounded-md border border-input bg-background px-2 text-xs"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Payment Due / Sent</option>
                    <option value="paid">Paid in Full</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Client / Contact Name</label>
                  <Input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Organization / Address</label>
                  <Input
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Client Phone</label>
                  <Input
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (845)..."
                    className="h-8"
                  />
                </div>
                <div>
                  <label className="block text-emerald-600 dark:text-emerald-400 mb-1 font-bold">
                    {isHe ? "שולם ע״ח ($)" : "Amount Paid ($)"}
                  </label>
                  <Input
                    type="number"
                    value={paidAmount !== undefined ? paidAmount : ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPaidAmount(v === "" ? undefined : parseFloat(v) || 0);
                    }}
                    placeholder="0"
                    className="h-8 font-mono font-bold text-emerald-600"
                  />
                </div>
              </div>

              {/* Items Editor */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">סעיפי חיוב (Line Items):</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleAddItem}
                    className="h-7 text-xs text-primary gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    הוסף סעיף
                  </Button>
                </div>

                {items.map((it, idx) => (
                  <div key={it.id || idx} className="flex items-center gap-2">
                    <Input
                      value={it.description}
                      onChange={(e) => handleUpdateItem(idx, "description", e.target.value)}
                      placeholder="Service / Product Description..."
                      className="h-8 text-xs flex-1"
                    />
                    <Input
                      type="number"
                      value={it.quantity}
                      onChange={(e) => handleUpdateItem(idx, "quantity", parseFloat(e.target.value) || 1)}
                      placeholder="Qty"
                      className="h-8 text-xs w-16 text-center font-mono"
                    />
                    <Input
                      type="number"
                      value={it.unitPrice}
                      onChange={(e) => handleUpdateItem(idx, "unitPrice", parseFloat(e.target.value) || 0)}
                      placeholder="Rate ($)"
                      className="h-8 text-xs w-24 text-right font-mono"
                    />
                    <div className="w-24 text-right font-mono font-bold text-xs text-foreground" dir="ltr">
                      ${((it.quantity || 1) * (it.unitPrice || 0)).toLocaleString()}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(idx)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Document View Card */}
          <div
            className="bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-200/90 p-8 sm:p-12 mx-auto max-w-3xl"
            dir={isHe ? "rtl" : "ltr"}
          >
            {/* Header: Brand & Invoice Meta */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-slate-100 pb-8">
              {/* Brand Logo & Details */}
              <div className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brightflow-logo.png"
                  alt="TheBrightFlow"
                  className="h-12 w-auto object-contain"
                />
                <div className="text-xs text-slate-500 space-y-0.5 pt-1">
                  <p className="font-semibold text-blue-600 tracking-wide uppercase text-[10.5px]">
                    Custom Software • Smart Automation • Personal Support
                  </p>
                  <p>support@brightflow.io</p>
                  <p>Web Applications, Cloud Architecture & Automation</p>
                </div>
              </div>

              {/* Invoice Meta */}
              <div
                className={`space-y-2 self-stretch sm:self-auto ${
                  isHe ? "text-left" : "text-right"
                }`}
              >
                <div className={`flex items-center gap-2 ${isHe ? "justify-start" : "justify-end"}`}>
                  <Badge
                    className={
                      status === "paid"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold"
                        : status === "overdue"
                        ? "bg-red-100 text-red-800 border border-red-300 font-bold"
                        : "bg-blue-100 text-blue-800 border border-blue-300 font-bold"
                    }
                  >
                    {status === "paid"
                      ? isHe
                        ? "שולמה במלואה"
                        : "PAID IN FULL"
                      : status === "overdue"
                      ? isHe
                        ? "באיחור תשלום"
                        : "OVERDUE"
                      : isHe
                      ? "לתשלום"
                      : "PAYMENT DUE"}
                  </Badge>
                </div>
                <h2 className="text-2xl font-black font-mono tracking-tight text-slate-950">
                  {invoiceNumber}
                </h2>
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      {isHe ? "תאריך הנפקה:" : "Date Issued:"}
                    </span>
                    <span className="font-semibold font-mono">{issueDate}</span>
                  </div>
                  {dueDate && (
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">
                        {isHe ? "לתשלום עד:" : "Due Date:"}
                      </span>
                      <span className="font-semibold font-mono text-rose-600">
                        {dueDate}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Client & Project Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {isHe ? "פרטי לקוח / Billed To:" : "Billed To:"}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {clientName || project.ownerName}
                </h3>
                {clientAddress && (
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {clientAddress}
                  </p>
                )}
                {clientPhone && (
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Tel: {clientPhone}
                  </p>
                )}
                {clientEmail && (
                  <p className="text-xs text-slate-500 font-mono">
                    Email: {clientEmail}
                  </p>
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {isHe ? "פרויקט / Services:" : "Project / Services:"}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                  {project.description}
                </p>
                {project.liveUrl && (
                  <p className="text-xs text-blue-600 font-mono mt-1 underline">
                    {project.liveUrl}
                  </p>
                )}
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-8 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className={`py-3 px-4 ${isHe ? "text-right" : "text-left"}`}>
                      {isHe ? "תיאור השירות / Deliverables" : "Description / Deliverables"}
                    </th>
                    <th className="py-3 px-3 text-center w-20">
                      {isHe ? "כמות" : "Qty"}
                    </th>
                    <th className={`py-3 px-4 w-32 ${isHe ? "text-left" : "text-right"}`}>
                      {isHe ? "מחיר יחידה" : "Rate"}
                    </th>
                    <th className={`py-3 px-4 w-32 ${isHe ? "text-left" : "text-right"}`}>
                      {isHe ? "סה״כ" : "Amount"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {item.description || (isHe ? "פיתוח והטמעה" : "Custom Software Development")}
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono text-slate-600">
                        {item.quantity || 1}
                      </td>
                      <td
                        className={`py-3.5 px-4 font-mono text-slate-600 ${
                          isHe ? "text-left" : "text-right"
                        }`}
                        dir="ltr"
                      >
                        ${(item.unitPrice || 0).toLocaleString()}
                      </td>
                      <td
                        className={`py-3.5 px-4 font-mono font-bold text-slate-950 ${
                          isHe ? "text-left" : "text-right"
                        }`}
                        dir="ltr"
                      >
                        ${((item.quantity || 1) * (item.unitPrice || 0)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t-2 border-slate-100 pt-6">
              <div className="space-y-2 text-xs text-slate-600 max-w-sm">
                <h4 className="font-bold text-slate-900">
                  {isHe ? "הנחיות תשלום ותנאים:" : "Payment Instructions & Terms:"}
                </h4>
                <p className="text-slate-500 leading-relaxed">
                  {isHe
                    ? `תשלום יתקבל באמצעות העברה בנקאית, כרטיס אשראי, צ׳ק או Stripe. אנא ציינו את מספר החשבונית ${invoiceNumber} בכל תשלום.`
                    : `Payment accepted via Bank Transfer, Stripe, Check, or Card. Please include invoice number ${invoiceNumber} with payment.`}
                </p>
                {notes && (
                  <p className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 text-blue-900 text-[11.5px] leading-relaxed">
                    {notes}
                  </p>
                )}
              </div>

              <div className="w-full sm:w-72 space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between text-slate-600">
                  <span>{isHe ? "סכום החשבונית:" : "Invoice Subtotal:"}</span>
                  <span className="font-mono font-bold" dir="ltr">
                    ${displayTotal.toLocaleString()}
                  </span>
                </div>
                {currentPaid > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>{isHe ? "שולם על החשבון:" : "Amount Paid:"}</span>
                    <span className="font-mono font-bold" dir="ltr">
                      -${currentPaid.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>{isHe ? "מס / מע״מ:" : "Tax / VAT:"}</span>
                  <span className="font-mono" dir="ltr">
                    $0.00
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-2.5 flex justify-between items-center text-sm font-bold text-slate-950">
                  <span>{isHe ? "יתרה לגבייה:" : "Balance Due:"}</span>
                  <span className="text-xl font-black font-mono text-blue-600" dir="ltr">
                    ${remainingBalance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-12 pt-6 border-t border-slate-200 text-center text-slate-400 text-[11px]">
              <p className="font-bold text-slate-600">
                BrightFlow • Custom Software. Smart Automation. Personal Support.
              </p>
              <p className="mt-1">
                {isHe ? "תודה רבה על שיתוף הפעולה!" : "Thank you for your business!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
