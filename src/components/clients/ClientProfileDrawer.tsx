"use client";

import * as React from "react";
import {
  X,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  FolderKanban,
  ShoppingBag,
  Receipt,
  Plus,
  ExternalLink,
  Edit,
  DollarSign,
  MessageCircle,
  Copy,
  Check,
  CreditCard,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Client, Project, Order, InvoiceRecord, PaymentRecord, Language } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ClientProfileDrawerProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onEditClient: (client: Client) => void;
  projects: Project[];
  orders: Order[];
  onOpenProjectDetails: (project: Project) => void;
  onNewProjectForClient: (client: Client) => void;
  onNewOrderForClient: (client: Client) => void;
  onNewInvoiceForClient: (client: Client) => void;
  onOpenInvoiceModal?: (invoice: InvoiceRecord) => void;
  lang: Language;
}

export function ClientProfileDrawer({
  client,
  isOpen,
  onClose,
  onEditClient,
  projects,
  orders,
  onOpenProjectDetails,
  onNewProjectForClient,
  onNewOrderForClient,
  onNewInvoiceForClient,
  onOpenInvoiceModal,
  lang,
}: ClientProfileDrawerProps) {
  const isHe = lang === "he";
  const [activeTab, setActiveTab] = React.useState<"overview" | "projects" | "orders" | "finances">("overview");
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  if (!isOpen || !client) return null;

  // Filter connected entities
  const clientProjects = projects.filter(
    (p) =>
      p.ownerName === client.name ||
      p.organization === client.companyName ||
      client.assignedProjectIds?.includes(p.id)
  );

  const clientOrders = orders.filter(
    (o) => o.clientId === client.id || o.clientName === client.name
  );

  // Aggregate invoices & payments from connected projects
  const clientInvoices: InvoiceRecord[] = clientProjects.flatMap(
    (p) => p.invoices || []
  );
  const clientPayments: PaymentRecord[] = clientProjects.flatMap(
    (p) => p.payments || []
  );

  const totalProjectsValue = clientProjects.reduce(
    (sum, p) => sum + (Number(p.estimatedValue) || 0),
    0
  );
  const totalPaid = clientPayments.reduce(
    (sum, pay) => sum + (Number(pay.amount) || 0),
    0
  );
  const remainingBalance = Math.max(0, totalProjectsValue - totalPaid);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getStatusPill = (status: Client["status"]) => {
    switch (status) {
      case "active":
        return {
          label: isHe ? "לקוח פעיל" : "Active",
          style: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          dot: "bg-emerald-500",
        };
      case "vip":
        return {
          label: isHe ? "לקוח VIP" : "VIP",
          style: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          dot: "bg-amber-500",
        };
      case "lead":
        return {
          label: isHe ? "ליד / מתעניין" : "Lead",
          style: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          dot: "bg-blue-500",
        };
      default:
        return {
          label: isHe ? "לא פעיל" : "Inactive",
          style: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
          dot: "bg-slate-400",
        };
    }
  };

  const statusPill = getStatusPill(client.status);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div className="w-full max-w-2xl h-full bg-white dark:bg-[#1a1d2e] border-s border-slate-200/80 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right rtl:slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/40 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-indigo-700 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-indigo-600/25 shrink-0">
              {client.name.charAt(0)}
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border",
                    statusPill.style
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", statusPill.dot)} />
                  {statusPill.label}
                </span>

                {client.companyName && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    • {client.companyName}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                {client.name}
              </h2>

              {/* Quick Communication Actions */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                {client.phone && (
                  <a
                    href={`tel:${client.phone}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Phone className="h-3 w-3" />
                    <span>{client.phone}</span>
                  </a>
                )}
                {client.email && (
                  <a
                    href={`mailto:${client.email}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Mail className="h-3 w-3" />
                    <span className="truncate max-w-[150px]">{client.email}</span>
                  </a>
                )}
                {client.phone && (
                  <a
                    href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"
                    title="WhatsApp"
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditClient(client)}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1"
            >
              <Edit className="h-3.5 w-3.5" />
              <span>{isHe ? "ערוך" : "Edit"}</span>
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Financial KPI Banner */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-white/10 text-center">
          <div className="p-2.5 rounded-2xl bg-white dark:bg-[#1a1d2e] border border-slate-200/60 dark:border-white/5 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
              {isHe ? "שווי פרויקטים" : "Total Value"}
            </span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
              ${totalProjectsValue.toLocaleString()}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white dark:bg-[#1a1d2e] border border-slate-200/60 dark:border-white/5 shadow-2xs">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
              {isHe ? "שולם בפועל" : "Collected"}
            </span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              ${totalPaid.toLocaleString()}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white dark:bg-[#1a1d2e] border border-slate-200/60 dark:border-white/5 shadow-2xs">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
              {isHe ? "יתרה לגבייה" : "Outstanding"}
            </span>
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              ${remainingBalance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-6 border-b border-slate-100 dark:border-white/10 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={cn(
              "py-3 text-xs font-bold border-b-2 transition-all",
              activeTab === "overview"
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            )}
          >
            {isHe ? "סקירה ופרטים" : "Overview"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={cn(
              "py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5",
              activeTab === "projects"
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            )}
          >
            <span>{isHe ? "פרויקטים ומערכות" : "Projects"}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 font-mono">
              {clientProjects.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={cn(
              "py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5",
              activeTab === "orders"
                ? "border-amber-600 text-amber-600 dark:text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            )}
          >
            <span>{isHe ? "הזמנות ועסקאות" : "Orders"}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 font-mono">
              {clientOrders.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("finances")}
            className={cn(
              "py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5",
              activeTab === "finances"
                ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            )}
          >
            <span>{isHe ? "חשבוניות ותשלומים" : "Billing & Invoices"}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 font-mono">
              {clientInvoices.length + clientPayments.length}
            </span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Client Info Grid */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isHe ? "פרטי התקשרות ומיקום" : "Contact & Location"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">{isHe ? "דוא״ל" : "Email"}:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {client.email || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isHe ? "טלפון" : "Phone"}:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {client.phone || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isHe ? "כתובת" : "Address"}:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {client.address || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isHe ? "אתר אינטרנט" : "Website"}:</span>
                    {client.website ? (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-sky-600 dark:text-sky-400 inline-flex items-center gap-1 hover:underline"
                      >
                        {client.website.replace(/^https?:\/\//, "")}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="font-bold text-slate-800 dark:text-slate-200">—</span>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isHe ? "תאריך רישום" : "Created At"}:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                      {client.createdAt ? new Date(client.createdAt).toLocaleDateString("he-IL") : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isHe ? "תגיות" : "Tags"}:</span>
                    <div className="flex gap-1 flex-wrap pt-0.5">
                      {client.tags && client.tags.length > 0 ? (
                        client.tags.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/30"
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {client.notes && (
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-1">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    {isHe ? "הערות ודגשים" : "Notes"}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {client.notes}
                  </p>
                </div>
              )}

              {/* Quick Actions Dock */}
              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <Button
                  onClick={() => onNewProjectForClient(client)}
                  className="rounded-xl text-xs font-bold h-9 bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 shadow-xs"
                >
                  <FolderKanban className="h-4 w-4" />
                  <span>{isHe ? "פתח פרויקט ללקוח" : "New Project"}</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNewOrderForClient(client)}
                  className="rounded-xl text-xs font-bold h-9 gap-1.5 border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 hover:bg-amber-100/60"
                >
                  <ShoppingBag className="h-4 w-4 text-amber-600" />
                  <span>{isHe ? "צור הזמנה" : "New Order"}</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNewInvoiceForClient(client)}
                  className="rounded-xl text-xs font-bold h-9 gap-1.5 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/60"
                >
                  <Receipt className="h-4 w-4 text-emerald-600" />
                  <span>{isHe ? "הפק חשבונית" : "Create Invoice"}</span>
                </Button>
              </div>
            </div>
          )}

          {/* 2. Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  {isHe ? `סה״כ פרויקטים: ${clientProjects.length}` : `Total projects: ${clientProjects.length}`}
                </span>
                <Button
                  size="sm"
                  onClick={() => onNewProjectForClient(client)}
                  className="rounded-xl h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white gap-1 shadow-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{isHe ? "הוסף פרויקט" : "Add Project"}</span>
                </Button>
              </div>

              {clientProjects.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  {isHe ? "אין פרויקטים מקושרים ללקוח זה עדיין." : "No linked projects yet."}
                </div>
              ) : (
                <div className="space-y-3">
                  {clientProjects.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#13151f] border border-slate-200/70 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-xs flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {p.name}
                          </h4>
                          {p.estimatedValue ? (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono">
                              ${p.estimatedValue.toLocaleString()}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {p.description || "—"}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {p.deploymentProvider}
                          </span>
                          <span>•</span>
                          <span>{p.databaseType}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Open Live App"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onOpenProjectDetails(p)}
                          className="rounded-xl h-8 px-3 text-xs font-bold"
                        >
                          {isHe ? "פרטים" : "Details"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  {isHe ? `סה״כ הזמנות: ${clientOrders.length}` : `Total orders: ${clientOrders.length}`}
                </span>
                <Button
                  size="sm"
                  onClick={() => onNewOrderForClient(client)}
                  className="rounded-xl h-8 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{isHe ? "הזמנה חדשה" : "New Order"}</span>
                </Button>
              </div>

              {clientOrders.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  {isHe ? "אין הזמנות פתוחות עבור לקוח זה." : "No orders found."}
                </div>
              ) : (
                <div className="space-y-3">
                  {clientOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#13151f] border border-slate-200/70 dark:border-white/10 shadow-xs flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            {ord.orderNumber}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {ord.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400 pt-0.5">
                          <span className="font-bold text-slate-900 dark:text-white font-mono">
                            ${ord.amount.toLocaleString()}
                          </span>
                          <span>•</span>
                          <span>{ord.orderDate}</span>
                          <span>•</span>
                          <span className="font-semibold text-amber-600">
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Finances Tab */}
          {activeTab === "finances" && (
            <div className="space-y-6">
              {/* Invoices sub-section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isHe ? "חשבוניות ודרישות תשלום" : "Invoices"}
                  </h4>
                  <Button
                    size="sm"
                    onClick={() => onNewInvoiceForClient(client)}
                    className="rounded-xl h-7 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    <span>{isHe ? "הפק חשבונית" : "Create"}</span>
                  </Button>
                </div>

                {clientInvoices.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center">
                    {isHe ? "לא הופקו חשבוניות עדיין." : "No invoices yet."}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {clientInvoices.map((inv) => (
                      <div
                        key={inv.id}
                        onClick={() => onOpenInvoiceModal?.(inv)}
                        className="p-3.5 rounded-2xl bg-white dark:bg-[#13151f] border border-slate-200/70 dark:border-white/10 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {inv.invoiceNumber}
                          </span>
                          <span className="text-slate-400 block text-[11px]">
                            {inv.issueDate}
                          </span>
                        </div>

                        <div className="text-end">
                          <span className="font-bold font-mono text-emerald-600 text-sm">
                            ${inv.amount.toLocaleString()}
                          </span>
                          <span className="text-[10px] block font-semibold text-slate-500 uppercase">
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payments ledger sub-section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isHe ? "תקבולים שנתקבלו בפועל" : "Received Payments"}
                </h4>

                {clientPayments.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center">
                    {isHe ? "טרם נרשמו תקבולים." : "No payments logged."}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {clientPayments.map((pay) => (
                      <div
                        key={pay.id}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {pay.method || "תשלום"}
                            </span>
                            <span className="text-slate-400 block text-[10px]">
                              {pay.date} {pay.reference ? `• ${pay.reference}` : ""}
                            </span>
                          </div>
                        </div>

                        <span className="font-bold font-mono text-emerald-600 text-sm">
                          +${Number(pay.amount).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
