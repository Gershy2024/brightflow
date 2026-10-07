"use client";

import * as React from "react";
import {
  Receipt,
  CreditCard,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Clock,
  Printer,
  Mail,
  Edit,
  Trash2,
  ExternalLink,
  User,
  FolderKanban,
  FileText,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvoiceRecord, PaymentRecord, Client, Project, Language } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FinancesViewProps {
  invoices: InvoiceRecord[];
  payments: PaymentRecord[];
  clients: Client[];
  projects: Project[];
  onOpenInvoiceModal: (invoice?: InvoiceRecord) => void;
  onOpenPaymentModal: () => void;
  onDeletePayment: (paymentId: string) => void;
  onRestorePayment?: (payment: PaymentRecord) => void;
  onViewClient?: (client: Client) => void;
  lang: Language;
}

export function FinancesView({
  invoices,
  payments,
  clients,
  projects,
  onOpenInvoiceModal,
  onOpenPaymentModal,
  onDeletePayment,
  onRestorePayment,
  onViewClient,
  lang,
}: FinancesViewProps) {
  const isHe = lang === "he";
  const [activeTab, setActiveTab] = React.useState<"invoices" | "payments" | "balances">("invoices");
  const [search, setSearch] = React.useState("");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = React.useState<string>("all");

  // Calculations
  const totalInvoiced = invoices.reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);
  const totalPayments = payments.reduce((sum, pay) => sum + (Number(pay.amount) || 0), 0);
  const totalOutstanding = Math.max(0, totalInvoiced - totalPayments);
  const overdueInvoices = invoices.filter((i) => i.status === "overdue");

  // Filtered Invoices
  const filteredInvoices = React.useMemo(() => {
    return invoices.filter((inv) => {
      if (invoiceStatusFilter !== "all" && inv.status !== invoiceStatusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesNum = inv.invoiceNumber.toLowerCase().includes(q);
        const matchesClient = (inv.clientName || "").toLowerCase().includes(q);
        const matchesProj = (inv.projectName || "").toLowerCase().includes(q);
        if (!matchesNum && !matchesClient && !matchesProj) return false;
      }
      return true;
    });
  }, [invoices, search, invoiceStatusFilter]);

  // Filtered Payments
  const filteredPayments = React.useMemo(() => {
    return payments.filter((pay) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesRef = (pay.reference || "").toLowerCase().includes(q);
        const matchesMethod = (pay.method || "").toLowerCase().includes(q);
        const matchesClient = (pay.clientName || "").toLowerCase().includes(q);
        const matchesProj = (pay.projectName || "").toLowerCase().includes(q);
        if (!matchesRef && !matchesMethod && !matchesClient && !matchesProj) return false;
      }
      return true;
    });
  }, [payments, search]);

  const handleDeletePaymentWithUndo = (pay: PaymentRecord) => {
    onDeletePayment(pay.id);
    toast.success(isHe ? `התקבול ע״ס $${pay.amount} נמחק` : `Payment of $${pay.amount} deleted`, {
      description: isHe ? "ניתן לבטל פעולה זו ב-5 השניות הקרובות" : "You can undo this within 5 seconds",
      duration: 5000,
      action: {
        label: isHe ? "בטל פעולה (Undo)" : "Undo",
        onClick: () => {
          onRestorePayment?.(pay);
          toast.info(isHe ? "התקבול שוחזר בהצלחה" : "Payment restored successfully");
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & KPI Cards (Rule #2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Billed */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "סה״כ מחזור חשבוניות" : "Total Invoiced"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              ${totalInvoiced.toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
              {invoices.length} {isHe ? "חשבוניות הופקו" : "invoices"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Receipt className="h-6 w-6" />
          </div>
        </div>

        {/* Total Collected */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "סה״כ שולם ונגבה בפועל" : "Total Collected"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight font-mono">
              ${totalPayments.toLocaleString()}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full font-mono">
              {payments.length} {isHe ? "תקבולים נרשמו" : "payments logged"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>

        {/* Outstanding Receivables */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "יתרה פתוחה לגבייה" : "Open Receivables"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 tracking-tight font-mono">
              ${totalOutstanding.toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-amber-600">
              {isHe ? "טרם נפרע" : "Pending collection"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        {/* Overdue */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "חשבוניות באיחור" : "Overdue Invoices"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 tracking-tight font-mono">
              {overdueInvoices.length}
            </div>
            <span className="text-[11px] font-bold text-rose-600">
              ${overdueInvoices.reduce((s, i) => s + (Number(i.amount) || 0), 0).toLocaleString()} {isHe ? "דורש טיפול" : "needs attention"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* 2. Controls & Actions Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Sub-Tabs Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-white/5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab("invoices")}
            className={cn(
              "flex-1 md:flex-none px-4 py-1.5 rounded-xl text-xs font-bold transition-all",
              activeTab === "invoices"
                ? "bg-white dark:bg-[#1a1d2e] shadow-xs text-indigo-600 dark:text-indigo-400"
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {isHe ? "חשבוניות ודרישות תשלום" : "Invoices"} ({invoices.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payments")}
            className={cn(
              "flex-1 md:flex-none px-4 py-1.5 rounded-xl text-xs font-bold transition-all",
              activeTab === "payments"
                ? "bg-white dark:bg-[#1a1d2e] shadow-xs text-emerald-600"
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {isHe ? "ספר תקבולים ותשלומים" : "Payments Ledger"} ({payments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("balances")}
            className={cn(
              "flex-1 md:flex-none px-4 py-1.5 rounded-xl text-xs font-bold transition-all",
              activeTab === "balances"
                ? "bg-white dark:bg-[#1a1d2e] shadow-xs text-indigo-600"
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {isHe ? "יתרות לפי לקוח" : "Client Balances"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isHe ? "חיפוש חשבונית או תקבול..." : "Search..."}
              className="ps-8 rounded-2xl h-9 text-xs"
            />
          </div>

          <Button
            onClick={() => onOpenInvoiceModal()}
            className="rounded-2xl h-9 px-3.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 gap-1.5"
          >
            <Receipt className="h-4 w-4" />
            <span>{isHe ? "הפק חשבונית" : "Create Invoice"}</span>
          </Button>

          <Button
            onClick={onOpenPaymentModal}
            className="rounded-2xl h-9 px-3.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 gap-1.5"
          >
            <CreditCard className="h-4 w-4" />
            <span>{isHe ? "רשום תקבול" : "Record Payment"}</span>
          </Button>
        </div>
      </div>

      {/* 3. Invoices Table */}
      {activeTab === "invoices" && (
        <div className="rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-slate-900/40 text-slate-400 font-bold">
                  <th className="p-4 text-start">{isHe ? "מספר חשבונית" : "Invoice #"}</th>
                  <th className="p-4 text-start">{isHe ? "לקוח" : "Client"}</th>
                  <th className="p-4 text-start">{isHe ? "פרויקט מקושר" : "Project"}</th>
                  <th className="p-4 text-start">{isHe ? "תאריך הנפקה" : "Issue Date"}</th>
                  <th className="p-4 text-start">{isHe ? "סכום לתשלום" : "Amount"}</th>
                  <th className="p-4 text-start">{isHe ? "סטטוס" : "Status"}</th>
                  <th className="p-4 text-end">{isHe ? "פעולות" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400 text-xs">
                      {isHe ? "לא נמצאו חשבוניות." : "No invoices found."}
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      onClick={() => onOpenInvoiceModal(inv)}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                        {inv.invoiceNumber}
                      </td>
                      <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                        {inv.clientName || "—"}
                      </td>
                      <td className="p-4 text-slate-400">
                        {inv.projectName || "—"}
                      </td>
                      <td className="p-4 text-slate-500 font-mono">
                        {inv.issueDate}
                      </td>
                      <td className="p-4 font-mono font-extrabold text-slate-900 dark:text-white text-sm">
                        ${Number(inv.amount).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                            inv.status === "paid"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                              : inv.status === "sent"
                              ? "bg-sky-500/10 text-sky-600 border-sky-500/20"
                              : inv.status === "overdue"
                              ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                              : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              inv.status === "paid"
                                ? "bg-emerald-500"
                                : inv.status === "sent"
                                ? "bg-sky-500"
                                : inv.status === "overdue"
                                ? "bg-rose-500"
                                : "bg-slate-400"
                            )}
                          />
                          {inv.status === "paid"
                            ? isHe ? "שולם" : "Paid"
                            : inv.status === "sent"
                            ? isHe ? "נשלח ללקוח" : "Sent"
                            : inv.status === "overdue"
                            ? isHe ? "באיחור" : "Overdue"
                            : isHe ? "טיוטה" : "Draft"}
                        </span>
                      </td>
                      <td className="p-4 text-end" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenInvoiceModal(inv)}
                          className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          <span>{isHe ? "צפה / הדפס" : "View"}</span>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Payments Ledger Table */}
      {activeTab === "payments" && (
        <div className="rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-slate-900/40 text-slate-400 font-bold">
                  <th className="p-4 text-start">{isHe ? "תאריך" : "Date"}</th>
                  <th className="p-4 text-start">{isHe ? "סכום שהתקבל" : "Amount"}</th>
                  <th className="p-4 text-start">{isHe ? "לקוח משלם" : "Client"}</th>
                  <th className="p-4 text-start">{isHe ? "פרויקט משויך" : "Project"}</th>
                  <th className="p-4 text-start">{isHe ? "אמצעי תשלום" : "Method"}</th>
                  <th className="p-4 text-start">{isHe ? "אסמכתא / קבלה" : "Reference"}</th>
                  <th className="p-4 text-start">{isHe ? "הערות" : "Notes"}</th>
                  <th className="p-4 text-end">{isHe ? "פעולות" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-slate-400 text-xs">
                      {isHe ? "טרם נרשמו תקבולים." : "No payments logged."}
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((pay) => (
                    <tr
                      key={pay.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="p-4 font-mono text-slate-600 dark:text-slate-300">
                        {pay.date}
                      </td>
                      <td className="p-4 font-mono font-extrabold text-emerald-600 text-sm">
                        +${Number(pay.amount).toLocaleString()}
                      </td>
                      <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                        {pay.clientName || "—"}
                      </td>
                      <td className="p-4 text-slate-400">
                        {pay.projectName || "—"}
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {pay.method || "תשלום"}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-400">
                        {pay.reference || "—"}
                      </td>
                      <td className="p-4 text-slate-400 max-w-[200px] truncate">
                        {pay.notes || "—"}
                      </td>
                      <td className="p-4 text-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePaymentWithUndo(pay)}
                          className="h-7 w-7 text-slate-400 hover:text-rose-600"
                          title={isHe ? "מחק תקבול" : "Delete"}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Client Balances Directory */}
      {activeTab === "balances" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => {
            const clientProjects = projects.filter(
              (p) =>
                p.ownerName === client.name ||
                p.organization === client.companyName ||
                client.assignedProjectIds?.includes(p.id)
            );
            const clientBilled = clientProjects.reduce(
              (sum, p) => sum + (Number(p.estimatedValue) || 0),
              0
            );
            const clientPaid = clientProjects.reduce((sum, p) => {
              const pPaid = (p.payments || []).reduce(
                (ps, pay) => ps + (Number(pay.amount) || 0),
                0
              );
              return sum + pPaid;
            }, 0);
            const clientBal = Math.max(0, clientBilled - clientPaid);
            const percent = clientBilled > 0 ? Math.min(100, Math.round((clientPaid / clientBilled) * 100)) : 100;

            return (
              <div
                key={client.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {client.name}
                    </h4>
                    {client.companyName && (
                      <span className="text-xs text-slate-400 block">
                        {client.companyName}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {percent}% {isHe ? "נפרע" : "Paid"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isHe ? "שווי" : "Billed"}</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">
                      ${clientBilled.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-600 block">{isHe ? "שולם" : "Paid"}</span>
                    <span className="font-bold font-mono text-emerald-600">
                      ${clientPaid.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-600 block">{isHe ? "יתרה" : "Due"}</span>
                    <span className="font-bold font-mono text-amber-600">
                      ${clientBal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
