"use client";

import React, { useState } from "react";
import {
  X,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Bug,
  Sparkles,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  Mail,
  Phone,
  Copy,
  Check,
  Code,
  Plus,
  Send,
  Building,
  Reply,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  ClientInquiry,
  InquiryStatus,
  InquiryType,
  Language,
  Project,
} from "@/lib/types";
import { translations } from "@/lib/i18n";
import {
  submitClientInquiry,
  updateInquiryStatus,
  deleteInquiryFromCloud,
  replyToClientInquiry,
} from "@/lib/supabaseService";

interface ClientInquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: ClientInquiry[];
  onRefreshInquiries: () => void;
  projects: Project[];
  lang: Language;
}

export function ClientInquiriesModal({
  isOpen,
  onClose,
  inquiries,
  onRefreshInquiries,
  projects,
  lang,
}: ClientInquiriesModalProps) {
  const t = translations[lang];
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterProject, setFilterProject] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"inquiries" | "new" | "embed">("inquiries");

  // New inquiry manual form state
  const [newProjectId, setNewProjectId] = useState<string>("");
  const [newType, setNewType] = useState<InquiryType>("question");
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newSenderName, setNewSenderName] = useState("");
  const [newSenderEmail, setNewSenderEmail] = useState("");
  const [newSenderPhone, setNewSenderPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Reply directly to client modal state
  const [replyingInquiry, setReplyingInquiry] = useState<ClientInquiry | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);

  if (!isOpen) return null;

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterStatus !== "all" && inq.status !== filterStatus) return false;
    if (filterType !== "all" && inq.type !== filterType) return false;
    if (filterProject !== "all" && inq.projectId !== filterProject) return false;
    return true;
  });

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    await updateInquiryStatus(id, status);
    onRefreshInquiries();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(lang === "he" ? "האם למחוק פנייה זו?" : "Delete this inquiry?")) {
      await deleteInquiryFromCloud(id);
      onRefreshInquiries();
    }
  };

  const handleOpenReply = (inq: ClientInquiry) => {
    setReplyingInquiry(inq);
    setReplyText(
      lang === "he"
        ? `שלום ${inq.senderName || ""},\nתודה על פנייתך. הבעיה/בקשה נבדקה וטופלה בהצלחה.\n\nבברכה,\nצוות BrightFlow`
        : `Hi ${inq.senderName || ""},\nThank you for reaching out. The issue has been investigated and resolved successfully.\n\nBest regards,\nBrightFlow Team`
    );
    setReplySuccess(false);
  };

  const handleSendReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingInquiry || !replyText.trim() || !replyingInquiry.senderEmail) return;

    setIsSendingReply(true);
    const success = await replyToClientInquiry({
      inquiryId: replyingInquiry.id,
      recipientEmail: replyingInquiry.senderEmail,
      recipientName: replyingInquiry.senderName,
      projectName: replyingInquiry.projectName,
      inquiryTitle: replyingInquiry.title,
      replyMessage: replyText.trim(),
    });

    setIsSendingReply(false);
    if (success) {
      setReplySuccess(true);
      setTimeout(() => {
        setReplyingInquiry(null);
        setReplySuccess(false);
        onRefreshInquiries();
      }, 1200);
    } else {
      alert(lang === "he" ? "שגיאה בשליחת המייל דרך Resend" : "Failed to send email via Resend");
    }
  };

  const handleCreateInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newMessage.trim()) return;

    setIsSubmitting(true);
    await submitClientInquiry({
      projectId: newProjectId || undefined,
      type: newType,
      title: newTitle,
      message: newMessage,
      senderName: newSenderName || undefined,
      senderEmail: newSenderEmail || undefined,
      senderPhone: newSenderPhone || undefined,
      status: "new",
    });

    setIsSubmitting(false);
    setNewTitle("");
    setNewMessage("");
    setNewSenderName("");
    setNewSenderEmail("");
    setNewSenderPhone("");
    setActiveTab("inquiries");
    onRefreshInquiries();
  };

  const getTypeIcon = (type: InquiryType) => {
    switch (type) {
      case "question":
        return <HelpCircle className="h-4 w-4 text-blue-500" />;
      case "feedback":
        return <Lightbulb className="h-4 w-4 text-amber-500" />;
      case "bug":
        return <Bug className="h-4 w-4 text-rose-500" />;
      case "feature_request":
        return <Sparkles className="h-4 w-4 text-purple-500" />;
    }
  };

  const getTypeBadgeClass = (type: InquiryType) => {
    switch (type) {
      case "question":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "feedback":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "bug":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "feature_request":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    }
  };

  // Sample Embed code snippet for client apps
  const embedCodeSnippet = `// BrightFlow Client Feedback Widget (Embed in any Next.js / React app)
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://piztrhqoihaekujrclyt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // anon key
);

export async function sendFeedbackToBrightFlow({
  projectId = "${newProjectId || "PROJECT_ID"}",
  type = "question", // 'question' | 'feedback' | 'bug' | 'feature_request'
  title,
  message,
  senderName,
  senderEmail,
  senderPhone,
}) {
  return await supabase.from("brightflow_inquiries").insert({
    id: "inq_" + Date.now(),
    project_id: projectId,
    type,
    title,
    message,
    sender_name: senderName,
    sender_email: senderEmail,
    sender_phone: senderPhone,
    status: "new",
  });
}`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {t.inquiries?.title || "פניות ושאלות לקוחות"}
                </h3>
                <Badge className="bg-blue-600 text-white font-mono text-xs px-2 py-0.5 rounded-full">
                  {inquiries.filter((i) => i.status === "new").length} חדשות
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.inquiries?.subtitle || "שאלות, המלצות לשיפור ובקשות מכל הפרויקטים"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View tabs */}
            <div className="flex bg-slate-200/60 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("inquiries")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "inquiries"
                    ? "bg-white dark:bg-slate-900 text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                רשימת פניות ({inquiries.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("new")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "new"
                    ? "bg-white dark:bg-slate-900 text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                + פנייה חדשה
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("embed")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "embed"
                    ? "bg-white dark:bg-slate-900 text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                קוד חיבור (Widget)
              </button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tab 1: Inquiries List */}
        {activeTab === "inquiries" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2.5 px-6 py-3 border-b border-border bg-slate-50/30 dark:bg-slate-900/30 text-xs">
              <span className="text-muted-foreground font-semibold">סינון:</span>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-8 rounded-lg border border-input bg-background px-2.5 text-xs font-medium"
              >
                <option value="all">כל הסטטוסים</option>
                <option value="new">חדש (ממתין לתשובה)</option>
                <option value="in_progress">בטיפול</option>
                <option value="resolved">טופל / הושלם</option>
              </select>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-8 rounded-lg border border-input bg-background px-2.5 text-xs font-medium"
              >
                <option value="all">כל הסוגים</option>
                <option value="question">שאלה</option>
                <option value="feedback">המלצה לשיפור</option>
                <option value="bug">דיווח על תקלה</option>
                <option value="feature_request">בקשת פיצ׳ר</option>
              </select>

              {/* Project Filter */}
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="h-8 rounded-lg border border-input bg-background px-2.5 text-xs font-medium max-w-[200px]"
              >
                <option value="all">כל הפרויקטים</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <span className="ms-auto text-muted-foreground">
                נמצאו {filteredInquiries.length} פניות
              </span>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => {
                  const projectMatch = projects.find((p) => p.id === inq.projectId);
                  const projectName = inq.projectName || projectMatch?.name || "כללי";

                  return (
                    <div
                      key={inq.id}
                      className="p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${getTypeBadgeClass(
                              inq.type
                            )}`}
                          >
                            {getTypeIcon(inq.type)}
                            <span>{t.inquiries?.types[inq.type] || inq.type}</span>
                          </span>

                          <Badge variant="outline" className="text-xs font-medium">
                            <Building className="h-3 w-3 me-1 text-muted-foreground" />
                            {projectName}
                          </Badge>

                          <span className="text-[11px] text-muted-foreground">
                            {new Date(inq.createdAt).toLocaleDateString("he-IL", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Status Toggle buttons */}
                        <div className="flex items-center gap-1.5">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleStatusChange(inq.id, e.target.value as InquiryStatus)
                            }
                            className={`h-7 px-2 rounded-lg text-xs font-bold border ${
                              inq.status === "new"
                                ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                : inq.status === "in_progress"
                                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            }`}
                          >
                            <option value="new">חדש</option>
                            <option value="in_progress">בטיפול</option>
                            <option value="resolved">טופל ✓</option>
                          </select>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(inq.id)}
                            className="h-7 w-7 text-muted-foreground hover:text-destructive rounded-lg"
                            title="מחק פנייה"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {inq.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-wrap leading-relaxed">
                          {inq.message}
                        </p>
                      </div>

                      {/* Sender Details & Quick Reply Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          {inq.senderName && (
                            <span className="font-semibold text-foreground">
                              {inq.senderName}
                            </span>
                          )}
                          {inq.senderEmail && (
                            <span className="font-mono text-[11px]">
                              {inq.senderEmail}
                            </span>
                          )}
                          {inq.senderPhone && (
                            <span className="font-mono text-[11px]">
                              {inq.senderPhone}
                            </span>
                          )}
                        </div>

                        {/* Reply Buttons (No WhatsApp - Email Only) */}
                        <div className="flex items-center gap-2">
                          {inq.senderEmail && (
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => handleOpenReply(inq)}
                              className="h-7 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5 shadow-sm"
                              title="השב ישירות ללקוח במייל מתוך BrightFlow"
                            >
                              <Reply className="h-3.5 w-3.5" />
                              <span>השב ללקוח במייל</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-muted mx-auto flex items-center justify-center text-muted-foreground">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">
                    {t.inquiries?.noInquiries || "אין פניות או שאלות להצגה"}
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    {t.inquiries?.noInquiriesDesc ||
                      "כאשר לקוחות ישלחו שאלות או המלצות מהאפליקציות שלהם, הן יופיעו כאן בזמן אמת."}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Add Manual Inquiry */}
        {activeTab === "new" && (
          <form onSubmit={handleCreateInquiry} className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                רישום פנייה / המלצה מלקוח
              </h4>
              <p className="text-xs text-muted-foreground">
                הזן כאן שאלות או בקשות שקיבלת מלקוח בטלפון או בפגישה כדי לרכז את כל הטיפול במקום אחד.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  פרויקט משויך
                </label>
                <select
                  value={newProjectId}
                  onChange={(e) => setNewProjectId(e.target.value)}
                  className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
                >
                  <option value="">פרויקט כללי / ללא שיוך</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  סוג הפנייה
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as InquiryType)}
                  className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
                >
                  <option value="question">❓ שאלה</option>
                  <option value="feedback">💡 המלצה לשיפור</option>
                  <option value="bug">🐞 דיווח על תקלה (באג)</option>
                  <option value="feature_request">⭐ בקשת פיצ׳ר חדש</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                נושא הפנייה *
              </label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="למשל: שאלה לגבי שינוי מסלול הסעה / המלצה להוסיף ייצוא אקסל"
                required
                className="h-9 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                פירוט הפנייה *
              </label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="כתוב כאן את פרטי השאלה או ההמלצה המלאה..."
                rows={4}
                required
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  שם הלקוח / הפונה
                </label>
                <Input
                  value={newSenderName}
                  onChange={(e) => setNewSenderName(e.target.value)}
                  placeholder="ישראל ישראלי"
                  className="h-9 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  אימייל
                </label>
                <Input
                  type="email"
                  value={newSenderEmail}
                  onChange={(e) => setNewSenderEmail(e.target.value)}
                  placeholder="client@org.com"
                  className="h-9 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  טלפון
                </label>
                <Input
                  value={newSenderPhone}
                  onChange={(e) => setNewSenderPhone(e.target.value)}
                  placeholder="+1 (845)..."
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("inquiries")}
              >
                ביטול
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isSubmitting ? "שומר..." : "שמור פנייה ל-Supabase"}</span>
              </Button>
            </div>
          </form>
        )}

        {/* Tab 3: Embed Code Generator */}
        {activeTab === "embed" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                קוד חיבור להטמעה באפליקציות לקוחות
              </h4>
              <p className="text-xs text-muted-foreground">
                העתק קוד זה לכל אפליקציה של לקוח (React / Next.js / Node). כל פנייה שהמשתמש ישלח תגיע אוטומטית ישירות ללוח הניהול שלך ב-BrightFlow!
              </p>
            </div>

            <div className="relative rounded-2xl bg-slate-950 p-4 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto">
              <pre className="leading-relaxed">{embedCodeSnippet}</pre>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={copyEmbedCode}
                className="absolute top-3 end-3 h-8 gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? "הועתק!" : "העתק קוד"}</span>
              </Button>
            </div>
          </div>
        )}

        {/* Dedicated Reply Dialog Modal */}
        {replyingInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-0">
            <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">מענה במייל ללקוח</h3>
                    <p className="text-xs text-muted-foreground font-mono">{replyingInquiry.senderEmail}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setReplyingInquiry(null)}
                  className="h-8 w-8 rounded-xl"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs space-y-1">
                <div className="flex justify-between text-muted-foreground">
                  <span>פרויקט: <strong className="text-foreground">{replyingInquiry.projectName || "פרויקט כללי"}</strong></span>
                  <span>סוג: <strong className="text-foreground">{replyingInquiry.type}</strong></span>
                </div>
                <p className="font-semibold text-foreground pt-1 truncate">
                  נושא הפנייה: {replyingInquiry.title}
                </p>
              </div>

              <form onSubmit={handleSendReplySubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-foreground">
                    תוכן התשובה והמשוב שיישלח ללקוח במייל:
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={6}
                    required
                    placeholder="כתוב כאן את התשובה ללקוח..."
                    className="w-full rounded-xl border border-input bg-background p-3 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <p className="text-[11px] text-muted-foreground">
                    הסטטוס ישונה אוטומטית ל-<strong>טופל ✓</strong>
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setReplyingInquiry(null)}
                    >
                      ביטול
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isSendingReply || !replyText.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-bold"
                    >
                      {replySuccess ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>נשלח בהצלחה!</span>
                        </>
                      ) : isSendingReply ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>שולח מייל...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>שלח תשובה ללקוח</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
