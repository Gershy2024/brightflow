"use client";

import * as React from "react";
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Receipt,
  Edit,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  User,
  FolderKanban,
  FileText,
  DollarSign,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order, OrderStatus, Client, Project, Language } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface OrdersViewProps {
  orders: Order[];
  clients: Client[];
  projects: Project[];
  onAddOrder: () => void;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (id: string) => void;
  onRestoreOrder?: (order: Order) => void;
  onStatusChange: (id: string, status: OrderStatus) => void;
  onConvertToInvoice: (order: Order) => void;
  onViewClient?: (client: Client) => void;
  lang: Language;
}

const PIPELINE_COLUMNS: Array<{ id: OrderStatus; labelHe: string; labelEn: string; color: string; badge: string }> = [
  { id: "quote", labelHe: "הצעת מחיר", labelEn: "Quote", color: "border-sky-400", badge: "bg-sky-500/10 text-sky-600" },
  { id: "in_progress", labelHe: "בביצוע", labelEn: "In Progress", color: "border-amber-400", badge: "bg-amber-500/10 text-amber-600" },
  { id: "completed", labelHe: "הושלם", labelEn: "Completed", color: "border-emerald-400", badge: "bg-emerald-500/10 text-emerald-600" },
  { id: "draft", labelHe: "טיוטה", labelEn: "Draft", color: "border-slate-300", badge: "bg-slate-500/10 text-slate-500" },
  { id: "cancelled", labelHe: "בוטל", labelEn: "Cancelled", color: "border-rose-300", badge: "bg-rose-500/10 text-rose-500" },
];

export function OrdersView({
  orders,
  clients,
  projects,
  onAddOrder,
  onEditOrder,
  onDeleteOrder,
  onRestoreOrder,
  onStatusChange,
  onConvertToInvoice,
  onViewClient,
  lang,
}: OrdersViewProps) {
  const isHe = lang === "he";
  const [search, setSearch] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"board" | "table">("board");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // Filtering
  const filteredOrders = React.useMemo(() => {
    return orders.filter((ord) => {
      if (statusFilter !== "all" && ord.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesNum = ord.orderNumber.toLowerCase().includes(q);
        const matchesTitle = ord.title.toLowerCase().includes(q);
        const matchesClient = ord.clientName.toLowerCase().includes(q);
        const matchesProj = (ord.projectName || "").toLowerCase().includes(q);
        if (!matchesNum && !matchesTitle && !matchesClient && !matchesProj) return false;
      }
      return true;
    });
  }, [orders, search, statusFilter]);

  // Safe delete with Undo
  const handleDeleteWithUndo = (order: Order) => {
    onDeleteOrder(order.id);
    toast.success(isHe ? `ההזמנה "${order.orderNumber}" הוסרה` : `Order "${order.orderNumber}" removed`, {
      description: isHe ? "ניתן לבטל פעולה זו ב-5 השניות הקרובות" : "You can undo this within 5 seconds",
      duration: 5000,
      action: {
        label: isHe ? "בטל פעולה (Undo)" : "Undo",
        onClick: () => {
          onRestoreOrder?.(order);
          toast.info(isHe ? "ההזמנה שוחזרה" : "Order restored");
        },
      },
    });
  };

  // Stats
  const totalValue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  const inProgressOrders = orders.filter((o) => o.status === "in_progress");
  const quoteOrders = orders.filter((o) => o.status === "quote");
  const completedOrders = orders.filter((o) => o.status === "completed");

  return (
    <div className="space-y-6">
      {/* 1. Header & KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "סה״כ שווי צנרת ועסקאות" : "Pipeline Value"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              ${totalValue.toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-amber-600">
              {orders.length} {isHe ? "הזמנות רשומות" : "orders"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>

        {/* In Progress */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "עבודות בביצוע פעיל" : "In Progress"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 tracking-tight font-mono">
              ${inProgressOrders.reduce((s, o) => s + (Number(o.amount) || 0), 0).toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-amber-600">
              {inProgressOrders.length} {isHe ? "הזמנות בעבודה" : "active deals"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        {/* Quotes */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "הצעות מחיר פתוחות" : "Open Quotes"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight font-mono">
              ${quoteOrders.reduce((s, o) => s + (Number(o.amount) || 0), 0).toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">
              {quoteOrders.length} {isHe ? "הצעות ממתינות" : "quotes"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>

        {/* Completed */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "הזמנות שהושלמו" : "Completed Orders"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight font-mono">
              ${completedOrders.reduce((s, o) => s + (Number(o.amount) || 0), 0).toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-emerald-600">
              {completedOrders.length} {isHe ? "סופקו בהצלחה" : "delivered"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* 2. Controls Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isHe ? "חיפוש לפי מספר הזמנה, לקוח, פרויקט..." : "Search orders..."}
            className="ps-9 rounded-2xl h-10 text-xs"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-2xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-[#13151f] text-slate-700 dark:text-slate-200 shadow-2xs"
          >
            <option value="all">{isHe ? "כל הסטטוסים" : "All Statuses"}</option>
            <option value="quote">{isHe ? "הצעת מחיר" : "Quote"}</option>
            <option value="in_progress">{isHe ? "בביצוע" : "In Progress"}</option>
            <option value="completed">{isHe ? "הושלם" : "Completed"}</option>
            <option value="draft">{isHe ? "טיוטה" : "Draft"}</option>
            <option value="cancelled">{isHe ? "בוטל" : "Cancelled"}</option>
          </select>

          {/* View mode toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-white/5">
            <button
              type="button"
              onClick={() => setViewMode("board")}
              className={cn(
                "px-2.5 py-1 rounded-xl text-xs font-bold transition-all",
                viewMode === "board" ? "bg-white dark:bg-[#1a1d2e] shadow-xs text-amber-600" : "text-slate-400"
              )}
            >
              {isHe ? "לוח שלבים" : "Pipeline"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={cn(
                "px-2.5 py-1 rounded-xl text-xs font-bold transition-all",
                viewMode === "table" ? "bg-white dark:bg-[#1a1d2e] shadow-xs text-amber-600" : "text-slate-400"
              )}
            >
              {isHe ? "טבלה" : "Table"}
            </button>
          </div>

          {/* New Order Button */}
          <Button
            onClick={onAddOrder}
            className="rounded-2xl h-10 px-4 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/20 gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>{isHe ? "הזמנה חדשה" : "New Order"}</span>
          </Button>
        </div>
      </div>

      {/* 3. Pipeline Board or Table */}
      {viewMode === "board" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {PIPELINE_COLUMNS.map((col) => {
            const colOrders = filteredOrders.filter((o) => o.status === col.id);
            const colSum = colOrders.reduce((s, o) => s + (Number(o.amount) || 0), 0);

            return (
              <div
                key={col.id}
                className="flex flex-col rounded-3xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 p-3 min-h-[450px]"
              >
                {/* Column Header */}
                <div className="p-2 flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {isHe ? col.labelHe : col.labelEn}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-2xs font-mono">
                      {colOrders.length}
                    </span>
                  </div>

                  <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 font-mono">
                    ${colSum.toLocaleString()}
                  </span>
                </div>

                {/* Orders in column */}
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {colOrders.map((ord) => {
                    return (
                      <div
                        key={ord.id}
                        className="p-4 rounded-2xl bg-white dark:bg-[#1a1d2e] border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-bold font-mono text-slate-400">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">
                            ${ord.amount.toLocaleString()}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                          {ord.title}
                        </h4>

                        <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5">
                          <div className="flex items-center gap-1.5 truncate">
                            <User className="h-3 w-3 text-sky-500 shrink-0" />
                            <span className="truncate font-semibold text-slate-700 dark:text-slate-300">
                              {ord.clientName}
                            </span>
                          </div>
                          {ord.projectName && (
                            <div className="flex items-center gap-1.5 truncate">
                              <FolderKanban className="h-3 w-3 text-indigo-500 shrink-0" />
                              <span className="truncate">{ord.projectName}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <Calendar className="h-3 w-3 shrink-0" />
                            <span>{ord.orderDate}</span>
                          </div>
                        </div>

                        {/* Order Actions */}
                        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                          {/* Quick Convert to Invoice */}
                          <button
                            type="button"
                            onClick={() => onConvertToInvoice(ord)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 bg-emerald-500/10 px-2 py-1 rounded-lg transition-colors"
                            title={isHe ? "הפק חשבונית מהזמנה זו" : "Generate Invoice"}
                          >
                            <Receipt className="h-3 w-3" />
                            <span>{isHe ? "הפק חשבונית" : "Invoice"}</span>
                          </button>

                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEditOrder(ord)}
                              className="h-6 w-6 text-slate-400 hover:text-indigo-600"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteWithUndo(ord)}
                              className="h-6 w-6 text-slate-400 hover:text-rose-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-slate-900/40 text-slate-400 font-bold">
                  <th className="p-4 text-start">{isHe ? "מספר הזמנה" : "Order #"}</th>
                  <th className="p-4 text-start">{isHe ? "נושא העבודה" : "Title"}</th>
                  <th className="p-4 text-start">{isHe ? "לקוח" : "Client"}</th>
                  <th className="p-4 text-start">{isHe ? "פרויקט מקושר" : "Project"}</th>
                  <th className="p-4 text-start">{isHe ? "סכום" : "Amount"}</th>
                  <th className="p-4 text-start">{isHe ? "סטטוס" : "Status"}</th>
                  <th className="p-4 text-start">{isHe ? "תאריך" : "Date"}</th>
                  <th className="p-4 text-end">{isHe ? "פעולות" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-slate-400 text-xs">
                      {isHe ? "לא נמצאו הזמנות." : "No orders found."}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr
                      key={ord.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                        {ord.orderNumber}
                      </td>
                      <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                        {ord.title}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {ord.clientName}
                      </td>
                      <td className="p-4 text-slate-400">
                        {ord.projectName || "—"}
                      </td>
                      <td className="p-4 font-mono font-extrabold text-slate-900 dark:text-white">
                        ${ord.amount.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => onStatusChange(ord.id, e.target.value as OrderStatus)}
                          className="px-2 py-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-[#13151f]"
                        >
                          <option value="draft">{isHe ? "טיוטה" : "Draft"}</option>
                          <option value="quote">{isHe ? "הצעת מחיר" : "Quote"}</option>
                          <option value="in_progress">{isHe ? "בביצוע" : "In Progress"}</option>
                          <option value="completed">{isHe ? "הושלם" : "Completed"}</option>
                          <option value="cancelled">{isHe ? "בוטל" : "Cancelled"}</option>
                        </select>
                      </td>
                      <td className="p-4 text-slate-400 font-mono">
                        {ord.orderDate}
                      </td>
                      <td className="p-4 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onConvertToInvoice(ord)}
                            className="rounded-xl h-7 px-2.5 text-xs text-emerald-600 border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100/60"
                          >
                            <Receipt className="h-3 w-3 me-1" />
                            {isHe ? "חשבונית" : "Invoice"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEditOrder(ord)}
                            className="h-7 w-7 text-slate-400 hover:text-indigo-600"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteWithUndo(ord)}
                            className="h-7 w-7 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
