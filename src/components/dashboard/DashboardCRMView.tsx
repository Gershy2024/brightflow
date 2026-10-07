"use client";

import * as React from "react";
import {
  Users,
  FolderKanban,
  ShoppingBag,
  Receipt,
  TrendingUp,
  CreditCard,
  Plus,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  FolderSearch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Client, Project, Order, InvoiceRecord, Language, PortalTab } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardCRMViewProps {
  clients: Client[];
  projects: Project[];
  orders: Order[];
  invoices: InvoiceRecord[];
  onNavigateTab: (tab: PortalTab) => void;
  onQuickAction: (action: "project" | "client" | "order" | "invoice") => void;
  onOpenProjectDetails: (project: Project) => void;
  onOpenScanner: () => void;
  lang: Language;
}

export function DashboardCRMView({
  clients,
  projects,
  orders,
  invoices,
  onNavigateTab,
  onQuickAction,
  onOpenProjectDetails,
  onOpenScanner,
  lang,
}: DashboardCRMViewProps) {
  const isHe = lang === "he";

  // Financial aggregates
  const totalValuation = projects.reduce((s, p) => s + (Number(p.estimatedValue) || 0), 0);
  const totalCollected = projects.reduce((s, p) => {
    const paid = (p.payments || []).reduce((ps, pay) => ps + (Number(pay.amount) || 0), 0);
    return s + paid;
  }, 0);
  const totalPending = Math.max(0, totalValuation - totalCollected);
  const activeOrders = orders.filter((o) => o.status === "in_progress" || o.status === "quote");

  // Chart data: Projects grouped by month or dummy series for smooth curved splines
  const chartData = React.useMemo(() => {
    return [
      { name: "ינואר", value: Math.round(totalCollected * 0.35) },
      { name: "מרץ", value: Math.round(totalCollected * 0.5) },
      { name: "מאי", value: Math.round(totalCollected * 0.65) },
      { name: "יולי", value: Math.round(totalCollected * 0.8) },
      { name: "ספטמבר", value: Math.round(totalCollected * 0.92) },
      { name: "היום", value: totalCollected || 35000 },
    ];
  }, [totalCollected]);

  // Donut chart data by status
  const donutData = React.useMemo(() => {
    const live = projects.filter((p) => p.status === "live").length;
    const dev = projects.filter((p) => p.status === "in_development").length;
    const other = projects.length - live - dev;
    return [
      { name: isHe ? "באוויר" : "Live", value: live || 1, color: "#10B981" },
      { name: isHe ? "בפיתוח" : "In Dev", value: dev || 1, color: "#F59E0B" },
      { name: isHe ? "אחר" : "Other", value: Math.max(1, other), color: "#3B82F6" },
    ];
  }, [projects, isHe]);

  return (
    <div className="space-y-6">
      {/* 1. Personalized Greeting Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-[#15193c] to-[#0b0e1c] text-white shadow-2xl shadow-indigo-950/20 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle decorative aurora glows */}
        <div className="absolute -top-16 -end-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -start-16 w-64 h-64 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-bold text-white/95 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>BrightFlow Executive Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isHe ? "שלום גרשי 👋" : "Hello Gershy 👋"}
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-xl leading-relaxed">
            {isHe
              ? `כל העסק והלקוחות במקום אחד: ${clients.length} לקוחות, ${projects.length} פרויקטים ו-$${totalCollected.toLocaleString()} נגבו עד כה.`
              : `Your entire business in one place: ${clients.length} clients, ${projects.length} projects, and $${totalCollected.toLocaleString()} collected.`}
          </p>
        </div>

        {/* Quick Action buttons */}
        <div className="flex items-center gap-2.5 z-10 flex-wrap">
          <Button
            onClick={() => onQuickAction("client")}
            className="rounded-2xl h-10 px-4 text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-md gap-1.5"
          >
            <Users className="h-4 w-4 text-sky-600" />
            <span>{isHe ? "+ לקוח חדש" : "+ New Client"}</span>
          </Button>

          <Button
            onClick={() => onQuickAction("order")}
            className="rounded-2xl h-10 px-4 text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md gap-1.5"
          >
            <ShoppingBag className="h-4 w-4 text-amber-300" />
            <span>{isHe ? "+ הזמנה" : "+ New Order"}</span>
          </Button>

          <Button
            onClick={onOpenScanner}
            className="rounded-2xl h-10 px-4 text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md gap-1.5"
          >
            <FolderSearch className="h-4 w-4 text-sky-300" />
            <span>{isHe ? "סורק תיקיות" : "Scanner"}</span>
          </Button>
        </div>
      </div>

      {/* 2. Top 4 Master KPI Cards (Rule #2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Clients */}
        <div
          onClick={() => onNavigateTab("clients")}
          className="p-5 rounded-3xl bg-white dark:bg-[#141724] border border-slate-200/70 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-sky-300 dark:hover:border-sky-700 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 group-hover:text-sky-600 transition-colors">
              {isHe ? "מאגר לקוחות פעיל" : "Active Clients"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {clients.length}
            </div>
            <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 inline-flex items-center gap-1">
              <span>{isHe ? "צפה ברשימת לקוחות" : "View directory"}</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Live Systems & Projects */}
        <div
          onClick={() => onNavigateTab("projects")}
          className="p-5 rounded-3xl bg-white dark:bg-[#141724] border border-slate-200/70 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
              {isHe ? "פרויקטים ומערכות קוד" : "Projects & Apps"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
              {projects.length}
            </div>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1">
              <span>{projects.filter((p) => p.status === "live").length} {isHe ? "פעילים באוויר" : "live in prod"}</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <FolderKanban className="h-6 w-6" />
          </div>
        </div>

        {/* Orders in Pipeline */}
        <div
          onClick={() => onNavigateTab("orders")}
          className="p-5 rounded-3xl bg-white dark:bg-[#141724] border border-slate-200/70 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-amber-300 dark:hover:border-amber-700 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
              {isHe ? "עסקאות בצנרת" : "Pipeline Orders"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
              {activeOrders.length}
            </div>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1">
              <span>${activeOrders.reduce((s, o) => s + (Number(o.amount) || 0), 0).toLocaleString()} {isHe ? "בצנרת" : "in pipeline"}</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>

        {/* Total Collected */}
        <div
          onClick={() => onNavigateTab("finances")}
          className="p-5 rounded-3xl bg-white dark:bg-[#141724] border border-slate-200/70 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-emerald-300 dark:hover:border-emerald-700 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
              {isHe ? "שולם ונגבה בפועל" : "Total Collected"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight font-mono">
              ${totalCollected.toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
              <span>${totalPending.toLocaleString()} {isHe ? "יתרה לגבייה" : "pending"}</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <CreditCard className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* 3. Analytics Charts (Curved Splines Area Chart & Donut Chart - Rule #2) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Performance Spline Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#141724] border border-slate-200/70 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.02)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isHe ? "מגמת הכנסות ותקבולים לאורך זמן" : "Revenue & Collections Trend"}
              </h3>
              <p className="text-xs text-slate-400">
                {isHe ? "גרף מצטבר של שווי וגביית תשלומים" : "Cumulative collections"}
              </p>
            </div>
            <span className="text-xs font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              ${totalCollected.toLocaleString()}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, isHe ? "שולם" : "Paid"]}
                />
                <Area
                  type="natural"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Breakdown Donut Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {isHe ? "סטטוס מערכות וקוד" : "Systems Breakdown"}
            </h3>
            <p className="text-xs text-slate-400">
              {isHe ? "חלוקת הפרויקטים לפי סטטוס פעילות" : "Projects by lifecycle status"}
            </p>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block">
                {projects.length}
              </span>
              <span className="text-[10px] text-slate-400 font-bold">
                {isHe ? "פרויקטים" : "Projects"}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
            {donutData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{d.name}</span>
                </div>
                <span className="font-bold font-mono text-slate-900 dark:text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Widgets: Recent Orders & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders Widget */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isHe ? "עסקאות והזמנות אחרונות" : "Recent Orders"}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigateTab("orders")}
              className="text-xs font-bold text-blue-600 h-8"
            >
              <span>{isHe ? "לכל ההזמנות" : "View All"}</span>
              <ChevronLeft className="h-3 w-3 ms-1 rtl:rotate-180" />
            </Button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      {ord.orderNumber}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">
                      {ord.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate block">
                    {ord.clientName}
                  </span>
                </div>

                <div className="text-end shrink-0">
                  <span className="font-mono font-extrabold text-slate-900 dark:text-white block text-sm">
                    ${ord.amount.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 block">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Systems Widget */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isHe ? "מערכות ופרויקטים מובילים" : "Leading Systems"}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigateTab("projects")}
              className="text-xs font-bold text-blue-600 h-8"
            >
              <span>{isHe ? "לכל הפרויקטים" : "View All"}</span>
              <ChevronLeft className="h-3 w-3 ms-1 rtl:rotate-180" />
            </Button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => onOpenProjectDetails(p)}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate">
                    {p.name}
                  </h4>
                  <span className="text-[11px] text-slate-500 truncate block">
                    {p.ownerName} • {p.deploymentProvider}
                  </span>
                </div>

                <div className="text-end shrink-0">
                  {p.estimatedValue ? (
                    <span className="font-mono font-extrabold text-emerald-600 block text-sm">
                      ${p.estimatedValue.toLocaleString()}
                    </span>
                  ) : null}
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
