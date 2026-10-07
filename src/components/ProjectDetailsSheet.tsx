"use client";

import * as React from "react";
import {
  X,
  ExternalLink,
  Edit,
  Database,
  Cloud,
  User,
  Phone,
  Mail,
  Folder,
  FileCode,
  Copy,
  Check,
  Building,
  Calendar,
  CreditCard,
  DollarSign,
  CheckCircle2,
  Receipt,
  Printer,
  Plus,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Language, Project, InvoiceRecord } from "@/lib/types";
import { getStatusBadgeVariant, translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { InvoiceModal } from "./InvoiceModal";

interface ProjectDetailsSheetProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (project: Project) => void;
  onUpdateProject?: (project: Project) => void;
  onOpenInquiries?: () => void;
  inquiriesCount?: number;
  lang: Language;
}

export function ProjectDetailsSheet({
  project,
  isOpen,
  onClose,
  onEdit,
  onUpdateProject,
  onOpenInquiries,
  inquiriesCount = 0,
  lang,
}: ProjectDetailsSheetProps) {
  const t = translations[lang];
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = React.useState<InvoiceRecord | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = React.useState(false);

  if (!isOpen || !project) return null;

  const handleUpdateInvoice = (updatedInv: InvoiceRecord) => {
    if (!project) return;
    const existingIndex = (project.invoices || []).findIndex(
      (inv) => inv.id === updatedInv.id
    );
    let nextInvoices = [...(project.invoices || [])];
    if (existingIndex >= 0) {
      nextInvoices[existingIndex] = updatedInv;
    } else {
      nextInvoices.push(updatedInv);
    }
    const updatedProject: Project = {
      ...project,
      invoices: nextInvoices,
    };
    onUpdateProject?.(updatedProject);
    setSelectedInvoice(updatedInv);
  };

  const handleCreateNewInvoice = () => {
    const newInv: InvoiceRecord = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      amount: project.estimatedValue || 0,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "sent",
      notes: "תודה על שבחרתם ב-BrightFlow. נשמח לעמוד לשירותכם בכל עת.",
      clientName: project.ownerName || "",
      clientAddress: project.organization || "",
      clientPhone: project.contacts?.[0]?.phone || "",
      clientEmail: project.contacts?.[0]?.email || "",
      items: [
        {
          id: `item_1`,
          description: `פיתוח והטמעת מערכת: ${project.name}`,
          quantity: 1,
          unitPrice: project.estimatedValue || 0,
        },
      ],
    };
    setSelectedInvoice(newInv);
    setIsInvoiceModalOpen(true);
  };

  const handleOpenInvoice = (inv: InvoiceRecord) => {
    setSelectedInvoice(inv);
    setIsInvoiceModalOpen(true);
  };

  const badgeStyle = getStatusBadgeVariant(project.status);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div className="w-full max-w-xl h-full bg-card border-s border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right rtl:slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-border flex items-start justify-between gap-4 bg-muted/20">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                  badgeStyle.bg,
                  badgeStyle.color,
                  badgeStyle.border
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", badgeStyle.dot)} />
                {t.status[project.status]}
              </span>

              {project.estimatedValue ? (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-mono">
                  ${project.estimatedValue.toLocaleString()}
                </span>
              ) : null}
            </div>
            <h2 className="text-xl font-bold text-foreground truncate">
              {project.name}
            </h2>
            {project.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenInquiries && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenInquiries();
                }}
                className="h-8 px-2.5 text-xs gap-1.5 rounded-xl border-amber-300 dark:border-amber-700/60 bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40"
              >
                <MessageSquare className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" strokeWidth={2} />
                <span>{lang === "he" ? "שאלות לקוחות" : "Inquiries"}</span>
                {inquiriesCount > 0 && (
                  <span className="ms-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                    {inquiriesCount}
                  </span>
                )}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onEdit(project);
                onClose();
              }}
              className="h-8 px-2.5 text-xs gap-1.5 rounded-xl"
            >
              <Edit className="h-3.5 w-3.5" strokeWidth={2} />
              <span>{t.actions.edit}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section: Billing & Payments Summary */}
          {Boolean(project.estimatedValue || project.paidAmount || (project.payments && project.payments.length > 0)) && (
            <div className="space-y-3 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 dark:from-white/[0.03] dark:to-white/[0.01] border border-slate-200/80 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                  {t.billing?.title || "חיובים, תשלומים וחשבוניות"}
                </span>
                {(() => {
                  const total = project.estimatedValue || 0;
                  const paid = project.paidAmount || 0;
                  const isPaid = total > 0 && paid >= total;
                  return (
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                      isPaid
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                        : paid > 0
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                        : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 border-slate-200 dark:border-white/10"
                    )}>
                      {isPaid ? (t.billing?.fullyPaid || "שולם במלואו") : paid > 0 ? (t.billing?.partiallyPaid || "שולם חלקית") : (t.billing?.unpaid || "טרם שולם")}
                    </span>
                  );
                })()}
              </div>

              {/* 3 Metric Summary Boxes */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-white dark:bg-[#1a1d2e] border border-slate-200/60 dark:border-white/5">
                  <span className="text-[10px] text-slate-400 font-medium block truncate">
                    {t.billing?.totalAgreed || "שווי מוסכם"}
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono block mt-0.5">
                    ${(project.estimatedValue || 0).toLocaleString()}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#1a1d2e] border border-slate-200/60 dark:border-white/5">
                  <span className="text-[10px] text-slate-400 font-medium block truncate">
                    {t.billing?.totalPaid || "שולם בפועל"}
                  </span>
                  <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono block mt-0.5">
                    ${(project.paidAmount || 0).toLocaleString()}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#1a1d2e] border border-slate-200/60 dark:border-white/5">
                  <span className="text-[10px] text-slate-400 font-medium block truncate">
                    {t.billing?.remainingBalance || "יתרה לגבייה"}
                  </span>
                  <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono block mt-0.5">
                    ${Math.max(0, (project.estimatedValue || 0) - (project.paidAmount || 0)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              {project.estimatedValue ? (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">
                      {t.billing?.paymentProgress || "התקדמות תשלום"}:
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">
                      {Math.min(100, Math.round(((project.paidAmount || 0) / project.estimatedValue) * 100))}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.round(((project.paidAmount || 0) / project.estimatedValue) * 100))}%`
                      }}
                    />
                  </div>
                </div>
              ) : null}

              {/* Payments History List */}
              {project.payments && project.payments.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
                    {t.billing?.paymentsHistory || "היסטוריית תשלומים"}:
                  </span>
                  <div className="space-y-1.5">
                    {project.payments.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#1a1d2e] border border-slate-200/60 dark:border-white/5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 block font-mono">
                              ${p.amount.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {p.date} • {p.method || "תשלום"} {p.reference ? `(${p.reference})` : ""}
                            </span>
                          </div>
                        </div>
                        {p.notes && (
                          <span className="text-[11px] text-slate-500 truncate max-w-[140px]">
                            {p.notes}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Invoices List & Quick Actions */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
                    {t.billing?.invoicesSection || "חשבוניות ודרישות תשלום"}:
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCreateNewInvoice}
                    className="h-7 text-xs font-semibold rounded-lg gap-1 border-blue-200 dark:border-blue-900/50 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>הפק חשבונית</span>
                  </Button>
                </div>

                {project.invoices && project.invoices.length > 0 ? (
                  <div className="space-y-1.5">
                    {project.invoices.map((inv) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#1a1d2e] border border-slate-200/60 dark:border-white/5 text-xs shadow-sm hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-blue-500 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 block font-mono">
                              {inv.invoiceNumber} — ${inv.amount.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {inv.issueDate} {inv.dueDate ? `• לתשלום: ${inv.dueDate}` : ""}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
                              inv.status === "paid"
                                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                : inv.status === "overdue"
                                ? "bg-red-500/10 text-red-600 border border-red-500/20"
                                : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                            )}
                          >
                            {inv.status}
                          </span>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenInvoice(inv)}
                            className="h-7 px-2 text-xs rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 gap-1 font-semibold"
                            title="הדפס או שלח חשבונית"
                          >
                            <Printer className="h-3.5 w-3.5" />
                            <span>הדפס / שלח</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl border border-dashed border-slate-200 dark:border-white/10 text-center bg-slate-50/50 dark:bg-slate-900/30 text-xs text-muted-foreground space-y-1.5">
                    <p>טרם הופקו חשבוניות עבור פרויקט זה.</p>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={handleCreateNewInvoice}
                      className="h-6 text-xs text-blue-600 font-semibold p-0"
                    >
                      לחץ כאן להפקת והדפסת חשבונית מותאמת
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Action URLs */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
              {t.form.linksSection}
            </span>

            <div className="space-y-2">
              {project.liveUrl ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  <div className="flex items-center gap-2 truncate">
                    <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={2} />
                    <span className="text-xs font-semibold truncate">
                      {project.liveUrl}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(project.liveUrl!, "live")}
                      className="h-7 w-7 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 rounded-lg"
                      title={t.actions.copyLink}
                    >
                      {copiedKey === "live" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-7 px-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-medium transition-colors"
                    >
                      {t.actions.openLive}
                    </a>
                  </div>
                </div>
              ) : null}

              {project.adminUrl ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted border border-border text-xs">
                  <span className="text-muted-foreground font-medium">
                    {t.form.adminUrlLabel}:
                  </span>
                  <a
                    href={project.adminUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold flex items-center gap-1 truncate max-w-[250px]"
                  >
                    <span>{project.adminUrl}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              ) : null}

              {project.githubUrl ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted border border-border text-xs">
                  <span className="text-muted-foreground font-medium">GitHub:</span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold flex items-center gap-1 truncate max-w-[250px]"
                  >
                    <span>{project.githubUrl}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {/* Infrastructure & Hosting */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
              {t.form.infraSection}
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-card border border-border space-y-1">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Cloud className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
                  {t.table.deployment}
                </span>
                <p className="font-bold text-sm text-foreground">
                  {project.deploymentProvider}
                </p>
                {project.deploymentAccount && (
                  <p className="text-[11px] text-muted-foreground truncate">
                    {project.deploymentAccount}
                  </p>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border space-y-1">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-violet-500" strokeWidth={2} />
                  {t.table.database}
                </span>
                <p className="font-bold text-sm text-foreground">
                  {project.databaseType}
                </p>
                {project.databaseName && (
                  <p className="text-[11px] text-muted-foreground truncate">
                    {project.databaseName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                {t.table.techStack}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-xs font-medium px-2.5 py-1 rounded-lg"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Ownership & Contacts */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
              {t.form.ownershipSection}
            </span>

            <div className="p-3.5 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
                  {t.table.owner}:
                </span>
                <span className="font-bold text-foreground">
                  {project.ownerName}
                </span>
              </div>
              {project.organization && (
                <div className="flex items-center justify-between text-xs border-t border-border/60 pt-2">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
                    {t.form.organizationLabel}:
                  </span>
                  <span className="font-medium text-foreground">
                    {project.organization}
                  </span>
                </div>
              )}
            </div>

            {/* Contacts cards */}
            {project.contacts && project.contacts.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-foreground">
                  {t.form.contactsTitle} ({project.contacts.length})
                </span>
                <div className="space-y-2">
                  {project.contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="p-3 rounded-xl border border-border bg-muted/30 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground">
                          {contact.name}
                        </span>
                        {contact.role && (
                          <span className="text-muted-foreground bg-muted px-2 py-0.5 rounded-md text-[11px]">
                            {contact.role}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                        {contact.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <a
                              href={`tel:${contact.phone}`}
                              className="hover:text-primary transition-colors font-medium"
                            >
                              {contact.phone}
                            </a>
                          </div>
                        )}
                        {contact.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <a
                              href={`mailto:${contact.email}`}
                              className="hover:text-primary transition-colors font-medium truncate max-w-[200px]"
                            >
                              {contact.email}
                            </a>
                          </div>
                        )}
                      </div>

                      {contact.notes && (
                        <p className="text-[11px] text-muted-foreground italic border-t border-border/40 pt-1.5">
                          {contact.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dev Notes & Local Folder */}
          {(project.notes || project.localFolderPath) && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                {t.form.notesSection}
              </span>

              {project.localFolderPath && (
                <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <Folder className="h-4 w-4 text-amber-500 shrink-0" strokeWidth={2} />
                    <span className="font-mono text-muted-foreground truncate" title={project.localFolderPath}>
                      {project.localFolderPath}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(project.localFolderPath!, "path")}
                    className="h-7 w-7 shrink-0 rounded-lg"
                    title={t.actions.copyLink}
                  >
                    {copiedKey === "path" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              )}

              {project.notes && (
                <div className="p-3.5 rounded-xl bg-card border border-border text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                  {project.notes}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Invoice Print & Send Modal */}
      {selectedInvoice && (
        <InvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          project={project}
          invoice={selectedInvoice}
          onUpdateInvoice={handleUpdateInvoice}
          lang={lang}
        />
      )}
    </div>
  );
}
