"use client";

import * as React from "react";
import { X, Building, User, Mail, Phone, MapPin, Globe, Tag, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client, ClientStatus, Language } from "@/lib/types";
import { translations } from "@/lib/i18n";
import { generateId } from "@/lib/utils";

interface ClientModalProps {
  isOpen: boolean;
  client?: Client | null;
  onClose: () => void;
  onSave: (clientData: Partial<Client>) => void;
  lang: Language;
}

export function ClientModal({
  isOpen,
  client,
  onClose,
  onSave,
  lang,
}: ClientModalProps) {
  const isHe = lang === "he";
  const [name, setName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [status, setStatus] = React.useState<ClientStatus>("active");
  const [tagsInput, setTagsInput] = React.useState("");
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (client) {
      setName(client.name || "");
      setCompanyName(client.companyName || "");
      setEmail(client.email || "");
      setPhone(client.phone || "");
      setAddress(client.address || "");
      setWebsite(client.website || "");
      setStatus(client.status || "active");
      setTagsInput(client.tags ? client.tags.join(", ") : "");
      setNotes(client.notes || "");
    } else {
      setName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setWebsite("");
      setStatus("active");
      setTagsInput("");
      setNotes("");
    }
  }, [client, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      name: name.trim(),
      companyName: companyName.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      website: website.trim() || undefined,
      status,
      tags,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-[#1a1d2e] rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {client ? (isHe ? "עריכת פרטי לקוח" : "Edit Client") : (isHe ? "הוספת לקוח חדש ל-CRM" : "Add New Client")}
              </h2>
              <p className="text-xs text-slate-400">
                {isHe ? "ניהול אנשי קשר, ארגון ופרטי התקשרות" : "Manage company, contacts & details"}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Client Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-blue-600" />
              <span>{isHe ? "שם הלקוח / איש קשר עיקרי *" : "Client Name / Primary Contact *"}</span>
            </label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isHe ? "לדוגמה: משה כהן / עמודי העולם" : "e.g. John Doe / Acme Corp"}
              className="rounded-xl h-10"
            />
          </div>

          {/* Company & Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5 text-slate-400" />
                <span>{isHe ? "חברה / מוסד" : "Company / Organization"}</span>
              </label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={isHe ? "שם המוסד או העסק" : "Company name"}
                className="rounded-xl h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isHe ? "סטטוס לקוח" : "Client Status"}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ClientStatus)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="active">{isHe ? "פעיל" : "Active"}</option>
                <option value="lead">{isHe ? "ליד / מתעניין" : "Lead"}</option>
                <option value="vip">{isHe ? "לקוח VIP" : "VIP"}</option>
                <option value="inactive">{isHe ? "לא פעיל" : "Inactive"}</option>
              </select>
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{isHe ? "דוא״ל" : "Email"}</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@example.com"
                className="rounded-xl h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{isHe ? "טלפון" : "Phone"}</span>
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="050-1234567"
                className="rounded-xl h-10"
              />
            </div>
          </div>

          {/* Address & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{isHe ? "כתובת / עיר" : "Address / Location"}</span>
              </label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={isHe ? "ירושלים / ניו יורק" : "City, State"}
                className="rounded-xl h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                <span>{isHe ? "אתר אינטרנט" : "Website"}</span>
              </label>
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
                className="rounded-xl h-10"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-slate-400" />
              <span>{isHe ? "תגיות (מופרדות בפסיקים)" : "Tags (comma separated)"}</span>
            </label>
            <Input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder={isHe ? "מוסדות, ישיבות, ריטיינר, עמותה" : "Corporate, Retail, Non-Profit"}
              className="rounded-xl h-10"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-slate-400" />
              <span>{isHe ? "הערות ופרטים נוספים" : "Notes & Context"}</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isHe ? "דגשים לגבי הלקוח, העדפות תקשורת, היסטוריה..." : "Client context, preferences..."}
              className="w-full p-3 rounded-xl border border-input bg-background text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-end gap-3">
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
              className="rounded-xl h-10 px-5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
            >
              <Check className="h-4 w-4 me-1.5" />
              {isHe ? "שמור לקוח" : "Save Client"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
