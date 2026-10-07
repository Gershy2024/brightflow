"use client";

import * as React from "react";
import {
  Settings,
  Building,
  ShieldCheck,
  Download,
  Upload,
  Database,
  Check,
  RefreshCw,
  Sparkles,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessProfile, Language } from "@/lib/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SettingsViewProps {
  profile: BusinessProfile;
  onSaveProfile: (profile: BusinessProfile) => void;
  onExportAll: () => void;
  onImportBackup: (file: File) => void;
  onSyncCloud: () => void;
  isCloudSyncing: boolean;
  lang: Language;
}

export function SettingsView({
  profile,
  onSaveProfile,
  onExportAll,
  onImportBackup,
  onSyncCloud,
  isCloudSyncing,
  lang,
}: SettingsViewProps) {
  const isHe = lang === "he";
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [form, setForm] = React.useState<BusinessProfile>(profile);

  React.useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(form);
    toast.success(isHe ? "הגדרות הפורטל נשמרו בהצלחה!" : "Settings saved successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isHe ? "הגדרות פורטל עסקי ופרופיל חברה" : "Business Portal Settings"}
            </h2>
            <p className="text-xs text-slate-400">
              {isHe ? "ניהול פרטי העסק שיופיעו בחשבוניות, גיבויי ענן ואבטחה" : "Manage company info on invoices & cloud backup"}
            </p>
          </div>
        </div>

        {/* Cloud Status */}
        <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Supabase Cloud Sync Active</span>
        </div>
      </div>

      {/* 2. Business Profile Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
          <Building className="h-4 w-4 text-blue-600" />
          <span>{isHe ? "פרטי העסק לחשבוניות והצעות מחיר" : "Business Identity for Invoices"}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "שם העסק / חברה *" : "Company Name *"}
            </label>
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "סלוגן / תיאור שירות" : "Tagline"}
            </label>
            <Input
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "דוא״ל העסק" : "Business Email"}
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "טלפון העסק" : "Business Phone"}
            </label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "כתובת העסק" : "Address"}
            </label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "מספר עוסק / ח.פ / Tax ID" : "Business Tax ID"}
            </label>
            <Input
              value={form.businessNumber}
              onChange={(e) => setForm({ ...form, businessNumber: e.target.value })}
              className="rounded-xl h-10 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "סמל מטבע עיקרי" : "Default Currency"}
            </label>
            <select
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm"
            >
              <option value="$">$ (USD)</option>
              <option value="₪">₪ (ILS)</option>
              <option value="€">€ (EUR)</option>
              <option value="£">£ (GBP)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "מע״מ (%)" : "VAT Rate (%)"}
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              value={form.vatRate}
              onChange={(e) => setForm({ ...form, vatRate: Number(e.target.value) })}
              className="rounded-xl h-10"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            className="rounded-2xl h-10 px-5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
          >
            <Check className="h-4 w-4 me-1.5" />
            {isHe ? "שמור הגדרות עסק" : "Save Settings"}
          </Button>
        </div>
      </form>

      {/* 3. Data & Disaster Recovery (Rule #7) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
          <Database className="h-4 w-4 text-emerald-600" />
          <span>{isHe ? "גיבוי, שחזור מידע ומניעת אובדן (Disaster Recovery)" : "Data Backup & Recovery"}</span>
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {isHe
            ? "גיבוי מלא כולל את כל הפרויקטים, לקוחות ה-CRM, ההזמנות, החשבוניות והתשלומים. שמור קובץ JSON זה במקום מאובטח כדי לשחזר את הנתונים בכל עת."
            : "Complete backup of all projects, clients, orders, invoices and payment records. Keep this JSON safe to restore anytime."}
        </p>

        <div className="flex items-center gap-3 flex-wrap pt-2">
          {/* Export JSON */}
          <Button
            type="button"
            onClick={onExportAll}
            className="rounded-2xl h-10 px-4 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md gap-2"
          >
            <Download className="h-4 w-4" />
            <span>{isHe ? "הורד גיבוי מלא (JSON)" : "Export All (JSON)"}</span>
          </Button>

          {/* Import JSON */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-2xl h-10 px-4 text-xs font-bold gap-2"
          >
            <Upload className="h-4 w-4 text-blue-600" />
            <span>{isHe ? "שחזר מגיבוי (JSON)" : "Restore Backup"}</span>
          </Button>

          {/* Sync Cloud */}
          <Button
            type="button"
            variant="outline"
            disabled={isCloudSyncing}
            onClick={onSyncCloud}
            className="rounded-2xl h-10 px-4 text-xs font-bold gap-2"
          >
            <RefreshCw className={cn("h-4 w-4 text-emerald-600", isCloudSyncing && "animate-spin")} />
            <span>{isHe ? "סנכרן עכשיו עם Supabase" : "Sync with Supabase"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
