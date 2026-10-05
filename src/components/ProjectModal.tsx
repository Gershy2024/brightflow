"use client";

import * as React from "react";
import {
  X,
  Plus,
  Trash2,
  Globe,
  Database,
  Cloud,
  User,
  FileText,
  Phone,
  Mail,
  DollarSign,
  CreditCard,
  Printer,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combobox";
import { InvoiceModal } from "./InvoiceModal";
import {
  Contact,
  PaymentRecord,
  InvoiceRecord,
  DatabaseType,
  DeploymentProvider,
  Language,
  Project,
  ProjectStatus,
} from "@/lib/types";
import { translations } from "@/lib/i18n";
import { generateId } from "@/lib/utils";

interface ProjectModalProps {
  isOpen: boolean;
  project?: Project | null;
  onClose: () => void;
  onSave: (projectData: Partial<Project>) => void;
  lang: Language;
}

const DEPLOYMENT_PROVIDERS: DeploymentProvider[] = [
  "Vercel",
  "Render",
  "Railway",
  "AWS",
  "Cloudflare",
  "Netlify",
  "DigitalOcean",
  "VPS / Linux",
  "Local Only",
  "Other",
];

const DATABASE_TYPES: DatabaseType[] = [
  "Supabase",
  "Neon PostgreSQL",
  "PostgreSQL",
  "Turso / LibSQL",
  "MongoDB",
  "MySQL",
  "Firebase",
  "SQLite",
  "Redis",
  "None",
  "Other",
];

export function ProjectModal({
  isOpen,
  project,
  onClose,
  onSave,
  lang,
}: ProjectModalProps) {
  const t = translations[lang].form;
  const commonT = translations[lang];

  const [name, setName] = React.useState("");
  const [estimatedValue, setEstimatedValue] = React.useState<string>("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState<ProjectStatus>("live");
  const [liveUrl, setLiveUrl] = React.useState("");
  const [githubUrl, setGithubUrl] = React.useState("");
  const [stagingUrl, setStagingUrl] = React.useState("");
  const [adminUrl, setAdminUrl] = React.useState("");
  const [deploymentProvider, setDeploymentProvider] =
    React.useState<DeploymentProvider>("Vercel");
  const [deploymentAccount, setDeploymentAccount] = React.useState("");
  const [databaseType, setDatabaseType] = React.useState<DatabaseType>("Supabase");
  const [databaseName, setDatabaseName] = React.useState("");
  const [techStackStr, setTechStackStr] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [localFolderPath, setLocalFolderPath] = React.useState("");
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [paidAmount, setPaidAmount] = React.useState<string>("");
  const [payments, setPayments] = React.useState<PaymentRecord[]>([]);
  const [invoices, setInvoices] = React.useState<InvoiceRecord[]>([]);
  const [previewInvoice, setPreviewInvoice] = React.useState<InvoiceRecord | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (project) {
      setName(project.name || "");
      setEstimatedValue(project.estimatedValue ? project.estimatedValue.toString() : "");
      setPaidAmount(project.paidAmount !== undefined ? project.paidAmount.toString() : "");
      setPayments(project.payments || []);
      setInvoices(project.invoices || []);
      setDescription(project.description || "");
      setStatus(project.status || "live");
      setLiveUrl(project.liveUrl || "");
      setGithubUrl(project.githubUrl || "");
      setStagingUrl(project.stagingUrl || "");
      setAdminUrl(project.adminUrl || "");
      setDeploymentProvider(project.deploymentProvider || "Vercel");
      setDeploymentAccount(project.deploymentAccount || "");
      setDatabaseType(project.databaseType || "Supabase");
      setDatabaseName(project.databaseName || "");
      setTechStackStr(project.techStack ? project.techStack.join(", ") : "");
      setOwnerName(project.ownerName || "");
      setOrganization(project.organization || "");
      setNotes(project.notes || "");
      setLocalFolderPath(project.localFolderPath || "");
      setContacts(project.contacts || []);
    } else {
      setName("");
      setEstimatedValue("");
      setPaidAmount("");
      setPayments([]);
      setInvoices([]);
      setDescription("");
      setStatus("live");
      setLiveUrl("");
      setGithubUrl("");
      setStagingUrl("");
      setAdminUrl("");
      setDeploymentProvider("Vercel");
      setDeploymentAccount("");
      setDatabaseType("Supabase");
      setDatabaseName("");
      setTechStackStr("React, Next.js, Tailwind");
      setOwnerName("");
      setOrganization("");
      setNotes("");
      setLocalFolderPath("");
      setContacts([]);
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleAddContact = () => {
    setContacts([
      ...contacts,
      {
        id: generateId(),
        name: "",
        role: "",
        phone: "",
        email: "",
        notes: "",
      },
    ]);
  };

  const handleUpdateContact = (index: number, field: keyof Contact, value: string) => {
    const updated = [...contacts];
    updated[index] = { ...updated[index], [field]: value };
    setContacts(updated);
  };

  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleAddPayment = () => {
    setPayments([
      ...payments,
      {
        id: generateId(),
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        method: "Bank Transfer",
        reference: "",
        notes: "",
      },
    ]);
  };

  const handleUpdatePayment = (index: number, field: keyof PaymentRecord, value: any) => {
    const updated = [...payments];
    updated[index] = { ...updated[index], [field]: value };
    setPayments(updated);
  };

  const handleRemovePayment = (index: number) => {
    setPayments(payments.filter((_, i) => i !== index));
  };

  const handleAddInvoice = () => {
    setInvoices([
      ...invoices,
      {
        id: generateId(),
        invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, "0")}`,
        amount: 0,
        issueDate: new Date().toISOString().split("T")[0],
        status: "sent",
        notes: "",
      },
    ]);
  };

  const handleUpdateInvoice = (index: number, field: keyof InvoiceRecord, value: any) => {
    const updated = [...invoices];
    updated[index] = { ...updated[index], [field]: value };
    setInvoices(updated);
  };

  const handlePreviewInvoice = (inv: InvoiceRecord) => {
    setPreviewInvoice(inv);
    setIsPreviewModalOpen(true);
  };

  const handleUpdatePreviewInvoice = (updated: InvoiceRecord) => {
    setInvoices((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setPreviewInvoice(updated);
  };

  const handleRemoveInvoice = (index: number) => {
    setInvoices(invoices.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const techStack = techStackStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const numericPaid = paidAmount.trim() ? parseFloat(paidAmount.replace(/[^0-9.]/g, "")) : undefined;
    const finalPaid = payments.length > 0
      ? payments.reduce((acc, p) => acc + (p.amount || 0), 0)
      : numericPaid;

    onSave({
      name: name.trim(),
      estimatedValue: estimatedValue.trim() ? parseFloat(estimatedValue.replace(/[^0-9.]/g, "")) : undefined,
      paidAmount: finalPaid,
      payments,
      invoices,
      description: description.trim(),
      status,
      liveUrl: liveUrl.trim(),
      githubUrl: githubUrl.trim(),
      stagingUrl: stagingUrl.trim(),
      adminUrl: adminUrl.trim(),
      deploymentProvider,
      deploymentAccount: deploymentAccount.trim(),
      databaseType,
      databaseName: databaseName.trim(),
      techStack,
      ownerName: ownerName.trim() || "כללי",
      organization: organization.trim(),
      notes: notes.trim(),
      localFolderPath: localFolderPath.trim(),
      contacts: contacts.filter((c) => c.name.trim() !== ""),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in-0">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {project ? t.editTitle : t.createTitle}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {project ? project.name : commonT.appSubtitle}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" strokeWidth={2} />
              {t.generalSection}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-semibold text-foreground">
                  {t.nameLabel}
                </label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.estimatedValueLabel}
                </label>
                <div className="relative">
                  <span className="absolute start-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    placeholder={t.estimatedValuePlaceholder}
                    className="ps-7 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.statusLabel}
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                >
                  <option value="live">{commonT.status.live}</option>
                  <option value="in_development">{commonT.status.in_development}</option>
                  <option value="maintenance">{commonT.status.maintenance}</option>
                  <option value="paused">{commonT.status.paused}</option>
                  <option value="archived">{commonT.status.archived}</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                {t.descriptionLabel}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.descriptionPlaceholder}
                rows={2}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Section: Billing, Payments & Invoices */}
          <div className="space-y-4 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                {translations[lang].billing?.title || "חיובים, תשלומים וחשבוניות"}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddPayment}
                  className="h-7 text-xs gap-1 border-dashed"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {translations[lang].billing?.addPaymentBtn || "+ הוסף תשלום"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddInvoice}
                  className="h-7 text-xs gap-1 border-dashed"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {translations[lang].billing?.addInvoiceBtn || "+ צור חשבונית"}
                </Button>
              </div>
            </div>

            {/* Quick Summary Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-muted/50 border border-border/80">
              <div>
                <span className="text-[11px] text-muted-foreground block font-medium">
                  {translations[lang].billing?.totalAgreed || "שווי מוסכם"}:
                </span>
                <span className="text-base font-extrabold text-foreground font-mono">
                  ${estimatedValue ? parseFloat(estimatedValue || "0").toLocaleString() : "0"}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block font-medium">
                  {translations[lang].billing?.totalPaid || "שולם בפועל"}:
                </span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  ${(
                    payments.length > 0
                      ? payments.reduce((acc, p) => acc + (p.amount || 0), 0)
                      : parseFloat(paidAmount || "0")
                  ).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block font-medium">
                  {translations[lang].billing?.remainingBalance || "יתרה לגבייה"}:
                </span>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                  ${Math.max(
                    0,
                    (parseFloat(estimatedValue || "0") || 0) -
                      (payments.length > 0
                        ? payments.reduce((acc, p) => acc + (p.amount || 0), 0)
                        : parseFloat(paidAmount || "0") || 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {/* If no detailed payments yet, offer simple single direct input */}
            {payments.length === 0 && (
              <div className="space-y-1.5 p-3 rounded-xl border border-dashed border-border/80 bg-background/50">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">
                    סכום ששולם עד כה ע״י הלקוח ($)
                  </label>
                  <span className="text-[10px] text-muted-foreground">
                    (או השתמש בכפתור "+ הוסף תשלום" לרישום תשלומים מפורטים)
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute start-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    placeholder="למשל: 10,000"
                    className="ps-7 font-mono font-bold"
                  />
                </div>
              </div>
            )}

            {/* Detailed Payments List */}
            {payments.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-foreground block">
                  {translations[lang].billing?.paymentsHistory || "תשלומים שנתקבלו"}:
                </span>
                {payments.map((pay, pIdx) => (
                  <div
                    key={pay.id}
                    className="p-3 rounded-xl border border-border bg-background space-y-2 shadow-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                      <div>
                        <label className="text-[10px] text-muted-foreground block font-medium mb-1">
                          {translations[lang].billing?.amount || "סכום ($)"}
                        </label>
                        <Input
                          type="number"
                          value={pay.amount || ""}
                          onChange={(e) =>
                            handleUpdatePayment(pIdx, "amount", parseFloat(e.target.value) || 0)
                          }
                          className="h-8 text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground block font-medium mb-1">
                          {translations[lang].billing?.date || "תאריך"}
                        </label>
                        <Input
                          type="date"
                          value={pay.date || ""}
                          onChange={(e) =>
                            handleUpdatePayment(pIdx, "date", e.target.value)
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground block font-medium mb-1">
                          {translations[lang].billing?.method || "אמצעי תשלום"}
                        </label>
                        <select
                          value={pay.method || "Bank Transfer"}
                          onChange={(e) =>
                            handleUpdatePayment(pIdx, "method", e.target.value)
                          }
                          className="flex h-8 w-full rounded-md border border-input bg-background px-2 text-xs"
                        >
                          <option value="Bank Transfer">העברה בנקאית</option>
                          <option value="Credit Card">כרטיס אשראי</option>
                          <option value="Check">צ׳ק</option>
                          <option value="Cash">מזומן</option>
                          <option value="Stripe">Stripe</option>
                          <option value="PayPal">PayPal</option>
                          <option value="Other">אחר</option>
                        </select>
                      </div>
                      <div className="flex items-end gap-1">
                        <div className="flex-1">
                          <label className="text-[10px] text-muted-foreground block font-medium mb-1">
                            {translations[lang].billing?.reference || "אסמכתא / קבלה"}
                          </label>
                          <Input
                            type="text"
                            value={pay.reference || ""}
                            onChange={(e) =>
                              handleUpdatePayment(pIdx, "reference", e.target.value)
                            }
                            placeholder="TX-12345"
                            className="h-8 text-xs"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemovePayment(pIdx)}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Invoices List */}
            {invoices.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-semibold text-foreground block">
                  {translations[lang].billing?.invoicesSection || "חשבוניות ודרישות תשלום"}:
                </span>
                {invoices.map((inv, iIdx) => (
                  <div
                    key={inv.id}
                    className="p-3 rounded-xl border border-border bg-background space-y-2 shadow-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                      <div>
                        <label className="text-[10px] text-muted-foreground block font-medium mb-1">
                          {translations[lang].billing?.invoiceNumber || "מספר חשבונית"}
                        </label>
                        <Input
                          type="text"
                          value={inv.invoiceNumber || ""}
                          onChange={(e) =>
                            handleUpdateInvoice(iIdx, "invoiceNumber", e.target.value)
                          }
                          className="h-8 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground block font-medium mb-1">
                          {translations[lang].billing?.amount || "סכום ($)"}
                        </label>
                        <Input
                          type="number"
                          value={inv.amount || ""}
                          onChange={(e) =>
                            handleUpdateInvoice(iIdx, "amount", parseFloat(e.target.value) || 0)
                          }
                          className="h-8 text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground block font-medium mb-1">
                          {translations[lang].billing?.invoiceStatus || "סטטוס"}
                        </label>
                        <select
                          value={inv.status || "sent"}
                          onChange={(e) =>
                            handleUpdateInvoice(iIdx, "status", e.target.value)
                          }
                          className="flex h-8 w-full rounded-md border border-input bg-background px-2 text-xs"
                        >
                          <option value="draft">טיוטה</option>
                          <option value="sent">נשלחה</option>
                          <option value="paid">שולמה</option>
                          <option value="overdue">באיחור</option>
                        </select>
                      </div>
                      <div className="flex items-end gap-1">
                        <div className="flex-1">
                          <label className="text-[10px] text-muted-foreground block font-medium mb-1">
                            {translations[lang].billing?.dueDate || "לתשלום עד"}
                          </label>
                          <Input
                            type="date"
                            value={inv.dueDate || ""}
                            onChange={(e) =>
                              handleUpdateInvoice(iIdx, "dueDate", e.target.value)
                            }
                            className="h-8 text-xs"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreviewInvoice(inv)}
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg shrink-0"
                          title="הדפס / שלח חשבונית"
                        >
                          <Printer className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveInvoice(iIdx)}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Links */}
          <div className="space-y-4 pt-2 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Globe className="h-4 w-4" strokeWidth={2} />
              {t.linksSection}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.liveUrlLabel}
                </label>
                <Input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder={t.liveUrlPlaceholder}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.adminUrlLabel}
                </label>
                <Input
                  type="url"
                  value={adminUrl}
                  onChange={(e) => setAdminUrl(e.target.value)}
                  placeholder={t.adminUrlPlaceholder}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.githubUrlLabel}
                </label>
                <Input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder={t.githubUrlPlaceholder}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.stagingUrlLabel}
                </label>
                <Input
                  type="url"
                  value={stagingUrl}
                  onChange={(e) => setStagingUrl(e.target.value)}
                  placeholder={t.stagingUrlPlaceholder}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Hosting & Database */}
          <div className="space-y-4 pt-2 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Cloud className="h-4 w-4" strokeWidth={2} />
              {t.infraSection}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.deploymentProviderLabel}
                </label>
                <Combobox
                  options={DEPLOYMENT_PROVIDERS.map((p) => ({ value: p, label: p }))}
                  value={deploymentProvider}
                  onChange={(val) => setDeploymentProvider(val as DeploymentProvider)}
                  placeholder={t.deploymentProviderLabel}
                  searchPlaceholder="חפש ספק..."
                  clearable={false}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.deploymentAccountLabel}
                </label>
                <Input
                  value={deploymentAccount}
                  onChange={(e) => setDeploymentAccount(e.target.value)}
                  placeholder={t.deploymentAccountPlaceholder}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.databaseTypeLabel}
                </label>
                <Combobox
                  options={DATABASE_TYPES.map((d) => ({ value: d, label: d }))}
                  value={databaseType}
                  onChange={(val) => setDatabaseType(val as DatabaseType)}
                  placeholder={t.databaseTypeLabel}
                  searchPlaceholder="חפש סוג מסד..."
                  clearable={false}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.databaseNameLabel}
                </label>
                <Input
                  value={databaseName}
                  onChange={(e) => setDatabaseName(e.target.value)}
                  placeholder={t.databaseNamePlaceholder}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                {t.techStackLabel}
              </label>
              <Input
                value={techStackStr}
                onChange={(e) => setTechStackStr(e.target.value)}
                placeholder={t.techStackPlaceholder}
              />
            </div>
          </div>

          {/* Section 4: Ownership & Contacts */}
          <div className="space-y-4 pt-2 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <User className="h-4 w-4" strokeWidth={2} />
              {t.ownershipSection}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.ownerNameLabel}
                </label>
                <Input
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder={t.ownerNamePlaceholder}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  {t.organizationLabel}
                </label>
                <Input
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder={t.organizationPlaceholder}
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">
                  {t.contactsTitle}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddContact}
                  className="h-8 text-xs gap-1 rounded-xl"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                  <span>{t.addContact}</span>
                </Button>
              </div>

              {contacts.map((contact, index) => (
                <div
                  key={contact.id || index}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-3 rounded-xl border border-border bg-muted/20 items-center"
                >
                  <div className="sm:col-span-3">
                    <Input
                      placeholder={t.contactName}
                      value={contact.name}
                      onChange={(e) =>
                        handleUpdateContact(index, "name", e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <Input
                      placeholder={t.contactRole}
                      value={contact.role}
                      onChange={(e) =>
                        handleUpdateContact(index, "role", e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <Input
                      placeholder={t.contactPhone}
                      value={contact.phone || ""}
                      onChange={(e) =>
                        handleUpdateContact(index, "phone", e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Input
                      placeholder={t.contactEmail}
                      value={contact.email || ""}
                      onChange={(e) =>
                        handleUpdateContact(index, "email", e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveContact(index)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Notes & Local Path */}
          <div className="space-y-4 pt-2 border-t border-border">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                {t.localPathLabel}
              </label>
              <Input
                value={localFolderPath}
                onChange={(e) => setLocalFolderPath(e.target.value)}
                placeholder={t.localPathPlaceholder}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                {t.notesLabel}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                rows={3}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              {commonT.actions.cancel}
            </Button>
            <Button type="submit">
              {project ? commonT.actions.save : commonT.actions.create}
            </Button>
          </div>
        </form>
      </div>

      {/* Invoice Modal for Preview, Printing & Sending */}
      {previewInvoice && (
        <InvoiceModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          project={{
            id: project?.id || "temp",
            name: name || "פרויקט",
            description,
            status,
            ownerName,
            organization,
            estimatedValue: estimatedValue.trim() ? parseFloat(estimatedValue.replace(/[^0-9.]/g, "")) : 0,
            contacts,
            techStack: [],
            deploymentProvider,
            databaseType,
            orderIndex: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }}
          invoice={previewInvoice}
          onUpdateInvoice={handleUpdatePreviewInvoice}
          lang={lang}
        />
      )}
    </div>
  );
}
