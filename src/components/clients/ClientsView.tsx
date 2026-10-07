"use client";

import * as React from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Building,
  Mail,
  Phone,
  Globe,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  FolderKanban,
  Receipt,
  ShoppingBag,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Download,
  CheckSquare,
  Square,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client, Project, Order, ClientStatus, Language } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ClientsViewProps {
  clients: Client[];
  projects: Project[];
  orders: Order[];
  onAddClient: () => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
  onRestoreClient?: (client: Client) => void;
  onViewClientProfile: (client: Client) => void;
  lang: Language;
}

export function ClientsView({
  clients,
  projects,
  orders,
  onAddClient,
  onEditClient,
  onDeleteClient,
  onRestoreClient,
  onViewClientProfile,
  lang,
}: ClientsViewProps) {
  const isHe = lang === "he";
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(25);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [viewMode, setViewMode] = React.useState<"cards" | "table">("table");

  // Filtering
  const filteredClients = React.useMemo(() => {
    return clients.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesCompany = (c.companyName || "").toLowerCase().includes(q);
        const matchesEmail = (c.email || "").toLowerCase().includes(q);
        const matchesPhone = (c.phone || "").toLowerCase().includes(q);
        const matchesTags = (c.tags || []).some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCompany && !matchesEmail && !matchesPhone && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [clients, search, statusFilter]);

  // Pagination (Rule #4)
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage) || 1;
  const paginatedClients = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(start, start + itemsPerPage);
  }, [filteredClients, currentPage, itemsPerPage]);

  // Bulk actions selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const pageIds = paginatedClients.map((c) => c.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const allPageSelected =
    paginatedClients.length > 0 &&
    paginatedClients.every((c) => selectedIds.includes(c.id));

  // Safe Deletion with Instant Undo (~5s) - Rule #14
  const handleDeleteWithUndo = (client: Client) => {
    onDeleteClient(client.id);
    toast.success(isHe ? `הלקוח "${client.name}" הוסר` : `Client "${client.name}" removed`, {
      description: isHe ? "ניתן לבטל פעולה זו ב-5 השניות הקרובות" : "You can undo this within 5 seconds",
      duration: 5000,
      action: {
        label: isHe ? "בטל פעולה (Undo)" : "Undo",
        onClick: () => {
          onRestoreClient?.(client);
          toast.info(isHe ? `הלקוח "${client.name}" שוחזר בהצלחה` : `Client restored successfully`);
        },
      },
    });
  };

  // Stats
  const activeCount = clients.filter((c) => c.status === "active").length;
  const vipCount = clients.filter((c) => c.status === "vip").length;
  const leadCount = clients.filter((c) => c.status === "lead").length;

  return (
    <div className="space-y-6">
      {/* 1. Header & KPI Cards (Rule #2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Clients */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "סה״כ לקוחות במאגר" : "Total Clients"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {clients.length}
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400">
              <Users className="h-3 w-3" />
              {isHe ? "ספר כתובות פעיל" : "CRM Directory"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Building className="h-6 w-6" />
          </div>
        </div>

        {/* Active Clients */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "לקוחות פעילים" : "Active Clients"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
              {activeCount}
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              {Math.round((activeCount / (clients.length || 1)) * 100)}% {isHe ? "פעילים" : "Active"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>

        {/* VIP Clients */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "לקוחות VIP ומוסדות" : "VIP Accounts"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
              {vipCount}
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
              <Sparkles className="h-3 w-3" />
              {isHe ? "ארגונים מובילים" : "High Value"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>

        {/* Leads */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">
              {isHe ? "לידים ומתעניינים" : "Pipeline Leads"}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
              {leadCount}
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full">
              <TrendingUp className="h-3 w-3" />
              {isHe ? "בהצעת מחיר" : "In Pipeline"}
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* 2. Controls & Filter Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={isHe ? "חיפוש לקוח לפי שם, ארגון, מייל..." : "Search client by name, company, email..."}
            className="ps-9 rounded-2xl h-10 text-xs border-slate-200 dark:border-white/10"
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 px-3 rounded-2xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-[#13151f] text-slate-700 dark:text-slate-200 shadow-2xs focus:outline-hidden"
          >
            <option value="all">{isHe ? "כל הסטטוסים" : "All Statuses"}</option>
            <option value="active">{isHe ? "פעיל" : "Active"}</option>
            <option value="vip">{isHe ? "VIP" : "VIP"}</option>
            <option value="lead">{isHe ? "ליד / מתעניין" : "Lead"}</option>
            <option value="inactive">{isHe ? "לא פעיל" : "Inactive"}</option>
          </select>

          {/* View toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-white/5">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={cn(
                "px-2.5 py-1 rounded-xl text-xs font-bold transition-all",
                viewMode === "table" ? "bg-white dark:bg-[#1a1d2e] shadow-xs text-indigo-600 dark:text-indigo-400" : "text-slate-400"
              )}
            >
              {isHe ? "טבלה" : "Table"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={cn(
                "px-2.5 py-1 rounded-xl text-xs font-bold transition-all",
                viewMode === "cards" ? "bg-white dark:bg-[#1a1d2e] shadow-xs text-indigo-600 dark:text-indigo-400" : "text-slate-400"
              )}
            >
              {isHe ? "כרטיסים" : "Cards"}
            </button>
          </div>

          {/* Add Client Button */}
          <Button
            onClick={onAddClient}
            className="rounded-2xl h-10 px-4 text-xs font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:from-sky-700 hover:to-indigo-800 text-white shadow-md shadow-indigo-600/20 gap-1.5"
          >
            <UserPlus className="h-4 w-4" />
            <span>{isHe ? "הוסף לקוח" : "New Client"}</span>
          </Button>
        </div>
      </div>

      {/* 3. Bulk Action Bar (Rule #4) */}
      {selectedIds.length > 0 && (
        <div className="sticky top-20 z-20 p-3 rounded-2xl bg-slate-900 text-white shadow-xl flex items-center justify-between gap-3 animate-in fade-in-0 duration-200">
          <div className="flex items-center gap-2 ps-2 text-xs font-bold">
            <CheckSquare className="h-4 w-4 text-sky-400" />
            <span>
              {isHe ? `${selectedIds.length} לקוחות נבחרו` : `${selectedIds.length} clients selected`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const toExport = clients.filter((c) => selectedIds.includes(c.id));
                const blob = new Blob([JSON.stringify(toExport, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `clients-export-${Date.now()}.json`;
                a.click();
              }}
              className="h-8 rounded-xl text-xs text-white border-white/20 hover:bg-white/10"
            >
              <Download className="h-3.5 w-3.5 me-1" />
              {isHe ? "ייצא נבחרים" : "Export"}
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                selectedIds.forEach((id) => onDeleteClient(id));
                setSelectedIds([]);
                toast.success(isHe ? `${selectedIds.length} לקוחות הוסרו` : `Clients removed`);
              }}
              className="h-8 rounded-xl text-xs bg-rose-600 hover:bg-rose-700"
            >
              <Trash2 className="h-3.5 w-3.5 me-1" />
              {isHe ? "מחק נבחרים" : "Delete Selected"}
            </Button>
          </div>
        </div>
      )}

      {/* 4. Directory Listing */}
      {viewMode === "table" ? (
        <div className="rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-slate-900/40 text-slate-400 font-bold">
                  <th className="p-4 w-10 text-center">
                    <button
                      type="button"
                      onClick={handleToggleSelectAll}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      {allPageSelected ? (
                        <CheckSquare className="h-4 w-4 text-indigo-600" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-start">{isHe ? "שם הלקוח / מוסד" : "Client / Org"}</th>
                  <th className="p-4 text-start">{isHe ? "פרטי התקשרות" : "Contact"}</th>
                  <th className="p-4 text-start">{isHe ? "סטטוס" : "Status"}</th>
                  <th className="p-4 text-start">{isHe ? "פרויקטים מקושרים" : "Linked Projects"}</th>
                  <th className="p-4 text-start">{isHe ? "תאריך רישום" : "Joined Date"}</th>
                  <th className="p-4 text-end">{isHe ? "פעולות" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {paginatedClients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400 text-xs">
                      {isHe ? "לא נמצאו לקוחות מתאימים לחיפוש." : "No clients match search criteria."}
                    </td>
                  </tr>
                ) : (
                  paginatedClients.map((client) => {
                    const clientProjects = projects.filter(
                      (p) =>
                        p.ownerName === client.name ||
                        p.organization === client.companyName ||
                        client.assignedProjectIds?.includes(p.id)
                    );
                    const isSelected = selectedIds.includes(client.id);

                    return (
                      <tr
                        key={client.id}
                        className={cn(
                          "hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer",
                          isSelected && "bg-indigo-50/40 dark:bg-indigo-950/20"
                        )}
                        onClick={() => onViewClientProfile(client)}
                      >
                        {/* Select checkbox */}
                        <td
                          className="p-4 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => handleToggleSelect(client.id)}
                            className="text-slate-400 hover:text-indigo-600"
                          >
                            {isSelected ? (
                              <CheckSquare className="h-4 w-4 text-indigo-600" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </button>
                        </td>

                        {/* Name & Org */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                              {client.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-slate-900 dark:text-white block truncate">
                                {client.name}
                              </span>
                              {client.companyName && (
                                <span className="text-[11px] text-slate-400 truncate block">
                                  {client.companyName}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Contact info */}
                        <td className="p-4">
                          <div className="space-y-0.5 text-[11px]">
                            {client.email && (
                              <span className="text-slate-600 dark:text-slate-300 block">
                                {client.email}
                              </span>
                            )}
                            {client.phone && (
                              <span className="text-slate-400 block font-mono">
                                {client.phone}
                              </span>
                            )}
                            {!client.email && !client.phone && (
                              <span className="text-slate-400">—</span>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                              client.status === "active"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : client.status === "vip"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                : client.status === "lead"
                                ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                                : "bg-slate-500/10 text-slate-600 border-slate-500/20"
                            )}
                          >
                            <span
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                client.status === "active"
                                  ? "bg-emerald-500"
                                  : client.status === "vip"
                                  ? "bg-amber-500"
                                  : client.status === "lead"
                                  ? "bg-sky-500"
                                  : "bg-slate-400"
                              )}
                            />
                            {client.status === "active"
                              ? isHe ? "פעיל" : "Active"
                              : client.status === "vip"
                              ? isHe ? "VIP" : "VIP"
                              : client.status === "lead"
                              ? isHe ? "ליד" : "Lead"
                              : isHe ? "לא פעיל" : "Inactive"}
                          </span>
                        </td>

                        {/* Linked Projects */}
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {clientProjects.length > 0 ? (
                              clientProjects.slice(0, 2).map((p) => (
                                <span
                                  key={p.id}
                                  className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 max-w-[120px] truncate"
                                >
                                  {p.name}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400 text-[11px]">—</span>
                            )}
                            {clientProjects.length > 2 && (
                              <span className="text-[10px] text-slate-400 font-mono">
                                +{clientProjects.length - 2}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Creation Date (Rule #16) */}
                        <td className="p-4 text-[11px] text-slate-400 font-mono">
                          {client.createdAt
                            ? new Date(client.createdAt).toLocaleDateString("he-IL")
                            : "—"}
                        </td>

                        {/* Actions */}
                        <td
                          className="p-4 text-end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEditClient(client)}
                              className="h-7 w-7 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                              title={isHe ? "ערוך" : "Edit"}
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteWithUndo(client)}
                              className="h-7 w-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                              title={isHe ? "מחק" : "Delete"}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedClients.map((client) => {
            const clientProjects = projects.filter(
              (p) =>
                p.ownerName === client.name ||
                p.organization === client.companyName ||
                client.assignedProjectIds?.includes(p.id)
            );

            return (
              <div
                key={client.id}
                onClick={() => onViewClientProfile(client)}
                className="p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-xs hover:shadow-md cursor-pointer space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-extrabold flex items-center justify-center shadow-xs">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {client.name}
                      </h4>
                      {client.companyName && (
                        <span className="text-xs text-slate-400 block truncate">
                          {client.companyName}
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                      client.status === "active"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : client.status === "vip"
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        : "bg-sky-500/10 text-sky-600 border-sky-500/20"
                    )}
                  >
                    {client.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {client.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-mono">{client.phone}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {isHe ? `${clientProjects.length} פרויקטים` : `${clientProjects.length} projects`}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {client.createdAt ? new Date(client.createdAt).toLocaleDateString("he-IL") : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Pagination Controls (Rule #4) */}
      {filteredClients.length > 0 && (
        <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Per Page Selector */}
          <div className="flex items-center gap-2 text-slate-500">
            <span>{isHe ? "הצג בעמוד:" : "Per page:"}</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-8 px-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#13151f] font-bold text-slate-700 dark:text-slate-200"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <span className="ms-2">
              {isHe
                ? `מציג ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredClients.length)} מתוך ${filteredClients.length}`
                : `Showing ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredClients.length)} of ${filteredClients.length}`}
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-xl h-8 px-3 text-xs"
            >
              {isHe ? "הקודם" : "Previous"}
            </Button>
            <span className="px-3 font-bold text-slate-700 dark:text-slate-200">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-xl h-8 px-3 text-xs"
            >
              {isHe ? "הבא" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
