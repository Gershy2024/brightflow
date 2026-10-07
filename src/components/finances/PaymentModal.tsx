"use client";

import * as React from "react";
import { X, CreditCard, DollarSign, Calendar, FileText, Check, User, FolderKanban, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentRecord, Client, Project, Language } from "@/lib/types";
import { generateId } from "@/lib/utils";

interface PaymentModalProps {
  isOpen: boolean;
  clients: Client[];
  projects: Project[];
  onClose: () => void;
  onSavePayment: (payment: PaymentRecord, targetProjectId?: string) => void;
  defaultClientId?: string;
  defaultProjectId?: string;
  lang: Language;
}

const PAYMENT_METHODS = [
  "Bank Transfer (העברה בנקאית)",
  "Credit Card (כרטיס אשראי)",
  "Check (צ'ק)",
  "Cash (מזומן)",
  "Stripe",
  "PayPal",
  "Other (אחר)",
];

export function PaymentModal({
  isOpen,
  clients,
  projects,
  onClose,
  onSavePayment,
  defaultClientId,
  defaultProjectId,
  lang,
}: PaymentModalProps) {
  const isHe = lang === "he";

  const [amount, setAmount] = React.useState<number | "">("");
  const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [method, setMethod] = React.useState("Bank Transfer (העברה בנקאית)");
  const [reference, setReference] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [clientId, setClientId] = React.useState(defaultClientId || "");
  const [projectId, setProjectId] = React.useState(defaultProjectId || "");

  React.useEffect(() => {
    if (isOpen) {
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
      setMethod("Bank Transfer (העברה בנקאית)");
      setReference("");
      setNotes("");
      setClientId(defaultClientId || clients[0]?.id || "");
      setProjectId(defaultProjectId || "");
    }
  }, [isOpen, defaultClientId, defaultProjectId, clients]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    const selectedClient = clients.find((c) => c.id === clientId);
    const selectedProject = projects.find((p) => p.id === projectId);

    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      amount: Number(amount),
      date,
      method,
      reference: reference.trim() || undefined,
      notes: notes.trim() || undefined,
      clientId: selectedClient?.id || clientId,
      clientName: selectedClient?.name || undefined,
      projectId: selectedProject?.id || projectId || undefined,
      projectName: selectedProject?.name || undefined,
      createdAt: new Date().toISOString(),
    };

    onSavePayment(newPayment, selectedProject?.id || projectId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1d2e] rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isHe ? "רישום תקבול / תשלום שהתקבל" : "Record Payment"}
              </h2>
              <p className="text-xs text-slate-400">
                {isHe ? "עדכון תזרים וחיוב חשבון לקוח" : "Log received cash flow"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isHe ? "סכום התשלום ($) *" : "Payment Amount ($) *"}</span>
            </label>
            <Input
              type="number"
              step="any"
              min="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="0.00"
              className="rounded-xl h-11 text-base font-extrabold font-mono text-emerald-600"
            />
          </div>

          {/* Client & Project */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-blue-600" />
                <span>{isHe ? "לקוח משלם *" : "Client *"}</span>
              </label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.companyName ? `(${c.companyName})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <FolderKanban className="h-3.5 w-3.5 text-indigo-600" />
                <span>{isHe ? "שיוך לפרויקט (אופציונלי)" : "Project (Optional)"}</span>
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm"
              >
                <option value="">{isHe ? "-- ללא שיוך לפרויקט --" : "-- None --"}</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isHe ? "תאריך קבלה" : "Date"}
              </label>
              <Input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isHe ? "אמצעי תשלום" : "Method"}
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs"
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reference */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Hash className="h-3.5 w-3.5 text-slate-400" />
              <span>{isHe ? "מספר אסמכתא / קבלה / צ'ק" : "Reference / Check / Transaction ID"}</span>
            </label>
            <Input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. TX-984321 / Check 402"
              className="rounded-xl h-10 text-xs font-mono"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "הערות" : "Notes"}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isHe ? "הערות נוספות על התשלום..." : "Payment notes..."}
              className="w-full p-2.5 rounded-xl border border-input bg-background text-xs resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-10 px-4 text-xs font-bold"
            >
              {isHe ? "ביטול" : "Cancel"}
            </Button>
            <Button
              type="submit"
              className="rounded-xl h-10 px-5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20"
            >
              <Check className="h-4 w-4 me-1.5" />
              {isHe ? "רשום תקבול" : "Save Payment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
