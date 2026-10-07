"use client";

import * as React from "react";
import { Sidebar } from "@/components/Sidebar";
import { PortalHeader } from "@/components/PortalHeader";
import { DashboardCRMView } from "@/components/dashboard/DashboardCRMView";
import { ClientsView } from "@/components/clients/ClientsView";
import { ClientModal } from "@/components/clients/ClientModal";
import { ClientProfileDrawer } from "@/components/clients/ClientProfileDrawer";
import { OrdersView } from "@/components/orders/OrdersView";
import { OrderModal } from "@/components/orders/OrderModal";
import { FinancesView } from "@/components/finances/FinancesView";
import { PaymentModal } from "@/components/finances/PaymentModal";
import { SettingsView } from "@/components/settings/SettingsView";

// Existing project components
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { ProjectTable } from "@/components/ProjectTable";
import { ProjectCard } from "@/components/ProjectCard";
import { KanbanBoard } from "@/components/KanbanBoard";
import { PaginationControls } from "@/components/PaginationControls";
import { BulkActionBar } from "@/components/BulkActionBar";
import { ProjectModal } from "@/components/ProjectModal";
import { ProjectDetailsSheet } from "@/components/ProjectDetailsSheet";
import { LocalScannerModal } from "@/components/LocalScannerModal";
import { ClientInquiriesModal } from "@/components/ClientInquiriesModal";
import { InvoiceModal } from "@/components/InvoiceModal";
import { LoginPage } from "@/components/LoginPage";

import { useAuth } from "@/lib/authContext";
import {
  FilterState,
  Language,
  PaginationState,
  Project,
  ProjectStatus,
  ViewMode,
  ClientInquiry,
  Client,
  Order,
  OrderStatus,
  InvoiceRecord,
  PaymentRecord,
  BusinessProfile,
  PortalTab,
} from "@/lib/types";
import {
  loadProjectsFromStorage,
  saveProjectsToStorage,
  loadClientsFromStorage,
  saveClientsToStorage,
  loadOrdersFromStorage,
  saveOrdersToStorage,
  loadBusinessProfileFromStorage,
  saveBusinessProfileToStorage,
} from "@/lib/storage";
import {
  fetchProjectsFromCloud,
  syncProjectsToCloud,
  deleteProjectFromCloud,
  fetchInquiriesFromCloud,
} from "@/lib/supabaseService";
import { generateId } from "@/lib/utils";
import { toast } from "sonner";

export default function BusinessPortalHomePage() {
  const { isAuthenticated, isLoading: isAuthLoading, logout } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  // Active Tab & View settings
  const [activeTab, setActiveTab] = React.useState<PortalTab>("dashboard");
  const [lang, setLang] = React.useState<Language>("he");
  const [darkMode, setDarkMode] = React.useState(false);
  const [globalSearch, setGlobalSearch] = React.useState("");

  // CRM & Business Data
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [clients, setClients] = React.useState<Client[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [businessProfile, setBusinessProfile] = React.useState<BusinessProfile>(
    loadBusinessProfileFromStorage()
  );
  const [inquiries, setInquiries] = React.useState<ClientInquiry[]>([]);
  const [isCloudSyncing, setIsCloudSyncing] = React.useState(false);

  // Projects View filters & pagination
  const [viewMode, setViewMode] = React.useState<ViewMode>("table");
  const [filters, setFilters] = React.useState<FilterState>({
    search: "",
    status: "",
    deploymentProvider: "",
    databaseType: "",
    owner: "",
  });
  const [pagination, setPagination] = React.useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 25,
  });
  const [selectedProjectIds, setSelectedProjectIds] = React.useState<string[]>([]);

  // Modals & Drawers state
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = React.useState(false);
  const [detailsProject, setDetailsProject] = React.useState<Project | null>(null);

  const [editingClient, setEditingClient] = React.useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = React.useState(false);
  const [selectedClientProfile, setSelectedClientProfile] = React.useState<Client | null>(null);

  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  const [activeInvoice, setActiveInvoice] = React.useState<InvoiceRecord | null>(null);
  const [invoiceProject, setInvoiceProject] = React.useState<Project | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = React.useState(false);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [paymentDefaultClientId, setPaymentDefaultClientId] = React.useState<string | undefined>();
  const [paymentDefaultProjectId, setPaymentDefaultProjectId] = React.useState<string | undefined>();

  const [isScannerOpen, setIsScannerOpen] = React.useState(false);
  const [isInquiriesModalOpen, setIsInquiriesModalOpen] = React.useState(false);

  // Initialize data on mount
  React.useEffect(() => {
    setMounted(true);

    const loadedProjects = loadProjectsFromStorage();
    setProjects(loadedProjects);

    const loadedClients = loadClientsFromStorage(loadedProjects);
    setClients(loadedClients);

    const loadedOrders = loadOrdersFromStorage(loadedProjects, loadedClients);
    setOrders(loadedOrders);

    const loadedProfile = loadBusinessProfileFromStorage();
    setBusinessProfile(loadedProfile);

    // Read language & theme preference
    const savedLang = localStorage.getItem("preferred_lang") as Language;
    if (savedLang) setLang(savedLang);

    const savedTheme = localStorage.getItem("preferred_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Connect & sync with Supabase
    const initCloud = async () => {
      setIsCloudSyncing(true);
      try {
        const cloudProjects = await fetchProjectsFromCloud();
        if (cloudProjects && cloudProjects.length > 0) {
          setProjects(cloudProjects);
          saveProjectsToStorage(cloudProjects);
        } else if (loadedProjects && loadedProjects.length > 0) {
          await syncProjectsToCloud(loadedProjects);
        }

        const cloudInquiries = await fetchInquiriesFromCloud();
        setInquiries(cloudInquiries);
      } catch (err) {
        console.warn("Supabase initial sync warning:", err);
      } finally {
        setIsCloudSyncing(false);
      }
    };

    initCloud();
  }, []);

  // Update handlers
  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    saveProjectsToStorage(newProjects);
    syncProjectsToCloud(newProjects).catch((err) =>
      console.warn("Cloud sync error:", err)
    );
  };

  const updateClients = (newClients: Client[]) => {
    setClients(newClients);
    saveClientsToStorage(newClients);
  };

  const updateOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    saveOrdersToStorage(newOrders);
  };

  const updateBusinessProfile = (profile: BusinessProfile) => {
    setBusinessProfile(profile);
    saveBusinessProfileToStorage(profile);
  };

  // Language & Theme
  const handleToggleLang = () => {
    const nextLang = lang === "he" ? "en" : "he";
    setLang(nextLang);
    localStorage.setItem("preferred_lang", nextLang);
  };

  const handleToggleDarkMode = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("preferred_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("preferred_theme", "light");
    }
  };

  // Quick Action Hub
  const handleQuickAction = (action: "project" | "client" | "order" | "invoice") => {
    switch (action) {
      case "project":
        setEditingProject(null);
        setIsProjectModalOpen(true);
        break;
      case "client":
        setEditingClient(null);
        setIsClientModalOpen(true);
        break;
      case "order":
        setEditingOrder(null);
        setIsOrderModalOpen(true);
        break;
      case "invoice":
        const newInv: InvoiceRecord = {
          id: `inv_${Date.now()}`,
          invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
          amount: 3500,
          issueDate: new Date().toISOString().split("T")[0],
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          status: "sent",
          notes: "Thank you for choosing BrightFlow.",
          clientName: clients[0]?.name || "Client",
          clientAddress: clients[0]?.companyName || "",
          clientEmail: clients[0]?.email || "",
          clientPhone: clients[0]?.phone || "",
          items: [
            {
              id: "item_1",
              description: "Custom Software Development & Implementation",
              quantity: 1,
              unitPrice: 3500,
            },
          ],
        };
        setActiveInvoice(newInv);
        setInvoiceProject(projects[0] || null);
        setIsInvoiceModalOpen(true);
        break;
    }
  };

  // All Invoices across projects + standalone
  const allInvoices: InvoiceRecord[] = React.useMemo(() => {
    const invMap = new Map<string, InvoiceRecord>();
    projects.forEach((p) => {
      (p.invoices || []).forEach((inv) => {
        invMap.set(inv.id, {
          ...inv,
          projectId: p.id,
          projectName: p.name,
          clientName: inv.clientName || p.ownerName,
        });
      });
    });
    return Array.from(invMap.values());
  }, [projects]);

  // All Payments across projects
  const allPayments: PaymentRecord[] = React.useMemo(() => {
    const payList: PaymentRecord[] = [];
    projects.forEach((p) => {
      (p.payments || []).forEach((pay) => {
        payList.push({
          ...pay,
          projectId: p.id,
          projectName: p.name,
          clientName: pay.clientName || p.ownerName,
        });
      });
    });
    return payList.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }, [projects]);

  // Handle Save Payment
  const handleSavePayment = (payment: PaymentRecord, targetProjectId?: string) => {
    if (targetProjectId) {
      const updated = projects.map((p) => {
        if (p.id === targetProjectId) {
          const nextPayments = [payment, ...(p.payments || [])];
          const newPaidAmount = nextPayments.reduce((s, pay) => s + (Number(pay.amount) || 0), 0);
          return {
            ...p,
            paidAmount: newPaidAmount,
            payments: nextPayments,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      updateProjects(updated);
    } else {
      // Find matching project by client or pick first
      const matched = projects.find((p) => p.ownerName === payment.clientName) || projects[0];
      if (matched) {
        const nextPayments = [payment, ...(matched.payments || [])];
        const newPaidAmount = nextPayments.reduce((s, pay) => s + (Number(pay.amount) || 0), 0);
        const updated = projects.map((p) =>
          p.id === matched.id
            ? { ...p, paidAmount: newPaidAmount, payments: nextPayments }
            : p
        );
        updateProjects(updated);
      }
    }
    toast.success(lang === "he" ? "תקבול נרשם בהצלחה!" : "Payment recorded successfully!");
  };

  // Handle Delete Payment with Undo
  const handleDeletePayment = (paymentId: string) => {
    const updated = projects.map((p) => {
      const nextPayments = (p.payments || []).filter((pay) => pay.id !== paymentId);
      const newPaidAmount = nextPayments.reduce((s, pay) => s + (Number(pay.amount) || 0), 0);
      return {
        ...p,
        paidAmount: newPaidAmount,
        payments: nextPayments,
      };
    });
    updateProjects(updated);
  };

  // Convert Order to Invoice
  const handleConvertOrderToInvoice = (order: Order) => {
    const targetProject = projects.find((p) => p.id === order.projectId) || projects[0] || null;
    const newInv: InvoiceRecord = {
      id: `inv_ord_${order.id}_${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      amount: order.amount,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: order.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "sent",
      notes: order.notes || "חשבונית מס עבור הזמנת עבודה",
      clientName: order.clientName,
      items: order.items && order.items.length > 0 ? order.items : [
        {
          id: "item_1",
          description: order.title,
          quantity: 1,
          unitPrice: order.amount,
        },
      ],
    };
    setActiveInvoice(newInv);
    setInvoiceProject(targetProject);
    setIsInvoiceModalOpen(true);
    toast.info(lang === "he" ? "נפתחה הפקת חשבונית מההזמנה" : "Generating invoice from order");
  };

  // Handle Invoice Save / Update
  const handleUpdateInvoice = (updatedInv: InvoiceRecord) => {
    if (invoiceProject) {
      const existingIdx = (invoiceProject.invoices || []).findIndex((i) => i.id === updatedInv.id);
      let nextInvoices = [...(invoiceProject.invoices || [])];
      if (existingIdx >= 0) {
        nextInvoices[existingIdx] = updatedInv;
      } else {
        nextInvoices.push(updatedInv);
      }
      const updatedProj: Project = {
        ...invoiceProject,
        invoices: nextInvoices,
      };
      updateProjects(projects.map((p) => (p.id === updatedProj.id ? updatedProj : p)));
    }
    setActiveInvoice(updatedInv);
    toast.success(lang === "he" ? "החשבונית עודכנה בהצלחה" : "Invoice saved successfully");
  };

  // Global Export & Backup (Rule #7)
  const handleExportAll = () => {
    const fullBackup = {
      version: 2,
      portalName: "BrightFlow CRM & Business Vault",
      exportedAt: new Date().toISOString(),
      profile: businessProfile,
      clients,
      orders,
      projects,
      inquiries,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `brightflow-business-portal-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success(lang === "he" ? "קובץ הגיבוי הורד בהצלחה" : "Backup downloaded successfully");
  };

  // Global Import & Restore
  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.version === 2) {
          if (Array.isArray(parsed.projects)) updateProjects(parsed.projects);
          if (Array.isArray(parsed.clients)) updateClients(parsed.clients);
          if (Array.isArray(parsed.orders)) updateOrders(parsed.orders);
          if (parsed.profile) updateBusinessProfile(parsed.profile);
          toast.success(lang === "he" ? "הפורטל שוחזר בהצלחה מגיבוי!" : "Portal restored successfully!");
        } else if (Array.isArray(parsed)) {
          // Legacy projects backup
          updateProjects(parsed);
          toast.success(lang === "he" ? "פרויקטים שוחזרו בהצלחה!" : "Projects restored!");
        }
      } catch (err) {
        toast.error(lang === "he" ? "שגיאה בקריאת קובץ הגיבוי" : "Error reading backup file");
      }
    };
    reader.readAsText(file);
  };

  // Filtered Projects for Projects Tab
  const filteredProjects = React.useMemo(() => {
    return projects.filter((p) => {
      const q = (globalSearch || filters.search).toLowerCase().trim();
      if (q) {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = (p.description || "").toLowerCase().includes(q);
        const matchesOwner = p.ownerName.toLowerCase().includes(q);
        const matchesTech = (p.techStack || []).some((t) => t.toLowerCase().includes(q));
        const matchesUrl = (p.liveUrl || "").toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesOwner && !matchesTech && !matchesUrl) {
          return false;
        }
      }
      if (filters.status && p.status !== filters.status) return false;
      if (filters.deploymentProvider && p.deploymentProvider !== filters.deploymentProvider) return false;
      if (filters.databaseType && p.databaseType !== filters.databaseType) return false;
      if (filters.owner && p.ownerName !== filters.owner) return false;
      return true;
    });
  }, [projects, globalSearch, filters]);

  // Paginated Projects
  const paginatedProjects = React.useMemo(() => {
    if (viewMode === "kanban") return filteredProjects;
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + pagination.itemsPerPage);
  }, [filteredProjects, pagination, viewMode]);

  // Project multi-select
  const handleToggleSelectProject = (id: string) => {
    setSelectedProjectIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllProjects = () => {
    const pageIds = paginatedProjects.map((p) => p.id);
    const allSelected = pageIds.every((id) => selectedProjectIds.includes(id));
    if (allSelected) {
      setSelectedProjectIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedProjectIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  // CRUD for Projects
  const handleSaveProject = (formData: Partial<Project>) => {
    if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? ({ ...p, ...formData, updatedAt: new Date().toISOString() } as Project)
          : p
      );
      updateProjects(updated);
      toast.success(lang === "he" ? "הפרויקט עודכן" : "Project updated");
    } else {
      const newProj: Project = {
        id: generateId(),
        name: formData.name || "פרויקט חדש",
        description: formData.description || "",
        status: formData.status || "live",
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        stagingUrl: formData.stagingUrl,
        adminUrl: formData.adminUrl,
        deploymentProvider: formData.deploymentProvider || "Vercel",
        deploymentAccount: formData.deploymentAccount,
        databaseType: formData.databaseType || "None",
        databaseName: formData.databaseName,
        techStack: formData.techStack || [],
        ownerName: formData.ownerName || "כללי",
        organization: formData.organization,
        contacts: formData.contacts || [],
        estimatedValue: formData.estimatedValue,
        paidAmount: formData.paidAmount,
        payments: formData.payments || [],
        invoices: formData.invoices || [],
        notes: formData.notes,
        localFolderPath: formData.localFolderPath,
        orderIndex: projects.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateProjects([newProj, ...projects]);
      toast.success(lang === "he" ? "הפרויקט נוצר בהצלחה" : "Project created");
    }
  };

  const handleDeleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    const updated = projects.filter((p) => p.id !== id);
    updateProjects(updated);
    setSelectedProjectIds((prev) => prev.filter((i) => i !== id));
    deleteProjectFromCloud(id).catch((e) => console.warn(e));

    toast.success(lang === "he" ? "הפרויקט נמחק" : "Project deleted", {
      description: lang === "he" ? "ניתן לבטל פעולה זו ב-5 השניות הקרובות" : "Undo available for 5s",
      duration: 5000,
      action: {
        label: lang === "he" ? "בטל (Undo)" : "Undo",
        onClick: () => {
          if (target) updateProjects([target, ...updated]);
        },
      },
    });
  };

  const handleDuplicateProject = (proj: Project) => {
    const duplicate: Project = {
      ...proj,
      id: generateId(),
      name: `${proj.name} (העתק)`,
      orderIndex: projects.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    updateProjects([duplicate, ...projects]);
    toast.success(lang === "he" ? "הפרויקט שוכפל" : "Project duplicated");
  };

  if (!mounted || isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0f111a]">
        <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage lang={lang} />;
  }

  const isRtl = lang === "he";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0f111a] text-foreground transition-colors selection:bg-blue-500/20 selection:text-blue-600 font-sans"
    >
      {/* 1. Sidebar Navigation (תצוגה צדדית) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        lang={lang}
        onToggleLang={handleToggleLang}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        counts={{
          clients: clients.length,
          projects: projects.length,
          orders: orders.filter((o) => o.status === "in_progress" || o.status === "quote").length,
          unpaidInvoices: allInvoices.filter((i) => i.status !== "paid").length,
          inquiries: inquiries.filter((i) => i.status === "new").length,
        }}
        onQuickAction={handleQuickAction}
        onLogout={logout}
      />

      {/* 2. Main Portal Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <PortalHeader
          activeTab={activeTab}
          lang={lang}
          onQuickAction={handleQuickAction}
          onOpenScanner={() => setIsScannerOpen(true)}
          onOpenInquiries={() => setIsInquiriesModalOpen(true)}
          inquiriesCount={inquiries.filter((i) => i.status === "new").length}
          onExportAll={handleExportAll}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
        />

        {/* Content View Container */}
        <main className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <DashboardCRMView
              clients={clients}
              projects={projects}
              orders={orders}
              invoices={allInvoices}
              onNavigateTab={setActiveTab}
              onQuickAction={handleQuickAction}
              onOpenProjectDetails={setDetailsProject}
              onOpenScanner={() => setIsScannerOpen(true)}
              lang={lang}
            />
          )}

          {/* TAB 2: CLIENTS CRM */}
          {activeTab === "clients" && (
            <ClientsView
              clients={clients}
              projects={projects}
              orders={orders}
              onAddClient={() => {
                setEditingClient(null);
                setIsClientModalOpen(true);
              }}
              onEditClient={(client) => {
                setEditingClient(client);
                setIsClientModalOpen(true);
              }}
              onDeleteClient={(id) => {
                const updated = clients.filter((c) => c.id !== id);
                updateClients(updated);
              }}
              onRestoreClient={(client) => {
                updateClients([client, ...clients]);
              }}
              onViewClientProfile={setSelectedClientProfile}
              lang={lang}
            />
          )}

          {/* TAB 3: PROJECTS & REPOSITORIES */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Search, Filters & View Mode Switcher */}
              <SearchAndFilters
                filters={filters}
                onFilterChange={(f) => {
                  setFilters(f);
                  setPagination((p) => ({ ...p, currentPage: 1 }));
                }}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                availableDeployments={Array.from(new Set(projects.map((p) => p.deploymentProvider).filter(Boolean)))}
                availableDatabases={Array.from(new Set(projects.map((p) => p.databaseType).filter((d) => d && d !== "None")))}
                availableOwners={Array.from(new Set(projects.map((p) => p.ownerName.trim()).filter(Boolean)))}
                lang={lang}
              />

              {/* Table / Cards / Kanban */}
              {viewMode === "table" && (
                <div className="space-y-3">
                  <ProjectTable
                    projects={paginatedProjects}
                    selectedIds={selectedProjectIds}
                    onToggleSelect={handleToggleSelectProject}
                    onToggleSelectAll={handleToggleSelectAllProjects}
                    allSelected={
                      paginatedProjects.length > 0 &&
                      paginatedProjects.every((p) => selectedProjectIds.includes(p.id))
                    }
                    onEdit={(p) => {
                      setEditingProject(p);
                      setIsProjectModalOpen(true);
                    }}
                    onDelete={handleDeleteProject}
                    onDuplicate={handleDuplicateProject}
                    onViewDetails={setDetailsProject}
                    lang={lang}
                  />

                  {filteredProjects.length > 0 && (
                    <div className="bg-white dark:bg-[#1a1d2e] rounded-3xl border border-slate-100 dark:border-white/10 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                      <PaginationControls
                        totalItems={filteredProjects.length}
                        currentPage={pagination.currentPage}
                        itemsPerPage={pagination.itemsPerPage}
                        onPageChange={(page) => setPagination((p) => ({ ...p, currentPage: page }))}
                        onItemsPerPageChange={(itemsPerPage) => setPagination({ currentPage: 1, itemsPerPage })}
                        lang={lang}
                      />
                    </div>
                  )}
                </div>
              )}

              {viewMode === "cards" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {paginatedProjects.map((p) => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        isSelected={selectedProjectIds.includes(p.id)}
                        onToggleSelect={handleToggleSelectProject}
                        onEdit={(proj) => {
                          setEditingProject(proj);
                          setIsProjectModalOpen(true);
                        }}
                        onDelete={handleDeleteProject}
                        onDuplicate={handleDuplicateProject}
                        onViewDetails={setDetailsProject}
                        lang={lang}
                      />
                    ))}
                  </div>

                  {filteredProjects.length > 0 && (
                    <div className="bg-white dark:bg-[#1a1d2e] rounded-3xl border border-slate-100 dark:border-white/10 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                      <PaginationControls
                        totalItems={filteredProjects.length}
                        currentPage={pagination.currentPage}
                        itemsPerPage={pagination.itemsPerPage}
                        onPageChange={(page) => setPagination((p) => ({ ...p, currentPage: page }))}
                        onItemsPerPageChange={(itemsPerPage) => setPagination({ currentPage: 1, itemsPerPage })}
                        lang={lang}
                      />
                    </div>
                  )}
                </div>
              )}

              {viewMode === "kanban" && (
                <KanbanBoard
                  projects={filteredProjects}
                  onStatusChange={(projId, nextStatus) => {
                    const updated = projects.map((p) =>
                      p.id === projId ? { ...p, status: nextStatus, updatedAt: new Date().toISOString() } : p
                    );
                    updateProjects(updated);
                  }}
                  onEdit={(p) => {
                    setEditingProject(p);
                    setIsProjectModalOpen(true);
                  }}
                  onViewDetails={setDetailsProject}
                  lang={lang}
                />
              )}

              {/* Floating Bulk Action Bar */}
              <BulkActionBar
                selectedCount={selectedProjectIds.length}
                totalOnPage={paginatedProjects.length}
                allSelected={
                  paginatedProjects.length > 0 &&
                  paginatedProjects.every((p) => selectedProjectIds.includes(p.id))
                }
                onToggleSelectAll={handleToggleSelectAllProjects}
                onClearSelection={() => setSelectedProjectIds([])}
                onBulkStatusChange={(status) => {
                  const updated = projects.map((p) =>
                    selectedProjectIds.includes(p.id) ? { ...p, status } : p
                  );
                  updateProjects(updated);
                  setSelectedProjectIds([]);
                }}
                onBulkDelete={() => {
                  const toDelete = [...selectedProjectIds];
                  const updated = projects.filter((p) => !selectedProjectIds.includes(p.id));
                  updateProjects(updated);
                  setSelectedProjectIds([]);
                  toDelete.forEach((id) => deleteProjectFromCloud(id).catch(console.warn));
                }}
                onBulkExport={() => {
                  const selected = projects.filter((p) => selectedProjectIds.includes(p.id));
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selected, null, 2));
                  const downloadAnchor = document.createElement("a");
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", `projects-export-${Date.now()}.json`);
                  downloadAnchor.click();
                }}
                lang={lang}
              />
            </div>
          )}

          {/* TAB 4: ORDERS & DEALS */}
          {activeTab === "orders" && (
            <OrdersView
              orders={orders}
              clients={clients}
              projects={projects}
              onAddOrder={() => {
                setEditingOrder(null);
                setIsOrderModalOpen(true);
              }}
              onEditOrder={(order) => {
                setEditingOrder(order);
                setIsOrderModalOpen(true);
              }}
              onDeleteOrder={(id) => {
                const updated = orders.filter((o) => o.id !== id);
                updateOrders(updated);
              }}
              onRestoreOrder={(order) => {
                updateOrders([order, ...orders]);
              }}
              onStatusChange={(id, status) => {
                const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
                updateOrders(updated);
              }}
              onConvertToInvoice={handleConvertOrderToInvoice}
              onViewClient={(client) => setSelectedClientProfile(client)}
              lang={lang}
            />
          )}

          {/* TAB 5: FINANCES & INVOICING */}
          {activeTab === "finances" && (
            <FinancesView
              invoices={allInvoices}
              payments={allPayments}
              clients={clients}
              projects={projects}
              onOpenInvoiceModal={(inv) => {
                setActiveInvoice(
                  inv || {
                    id: `inv_${Date.now()}`,
                    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
                    amount: 3500,
                    issueDate: new Date().toISOString().split("T")[0],
                    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                    status: "sent",
                    notes: "Thank you for your business.",
                    clientName: clients[0]?.name || "Client",
                    items: [
                      {
                        id: "item_1",
                        description: "Custom Software Development & Implementation",
                        quantity: 1,
                        unitPrice: 3500,
                      },
                    ],
                  }
                );
                setInvoiceProject(projects[0] || null);
                setIsInvoiceModalOpen(true);
              }}
              onOpenPaymentModal={() => {
                setPaymentDefaultClientId(undefined);
                setPaymentDefaultProjectId(undefined);
                setIsPaymentModalOpen(true);
              }}
              onDeletePayment={handleDeletePayment}
              onRestorePayment={(pay) => {
                handleSavePayment(pay, pay.projectId);
              }}
              onViewClient={(client) => setSelectedClientProfile(client)}
              lang={lang}
            />
          )}

          {/* TAB 6: INQUIRIES & SUPPORT */}
          {activeTab === "inquiries" && (
            <div className="space-y-4">
              <ClientInquiriesModal
                isOpen={true}
                onClose={() => setActiveTab("dashboard")}
                inquiries={inquiries}
                onRefreshInquiries={async () => {
                  const cloud = await fetchInquiriesFromCloud();
                  setInquiries(cloud);
                }}
                projects={projects}
                lang={lang}
              />
            </div>
          )}

          {/* TAB 7: SETTINGS & BACKUP */}
          {activeTab === "settings" && (
            <SettingsView
              profile={businessProfile}
              onSaveProfile={updateBusinessProfile}
              onExportAll={handleExportAll}
              onImportBackup={handleImportBackup}
              onSyncCloud={async () => {
                setIsCloudSyncing(true);
                try {
                  await syncProjectsToCloud(projects);
                  toast.success(lang === "he" ? "סנכרון ענן בוצע בהצלחה!" : "Cloud sync complete!");
                } catch (e) {
                  toast.error("Sync error");
                } finally {
                  setIsCloudSyncing(false);
                }
              }}
              isCloudSyncing={isCloudSyncing}
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* ================= MODALS & DRAWERS ================= */}

      {/* 1. Client Modal */}
      <ClientModal
        isOpen={isClientModalOpen}
        client={editingClient}
        onClose={() => {
          setIsClientModalOpen(false);
          setEditingClient(null);
        }}
        onSave={(data) => {
          if (editingClient) {
            const updated = clients.map((c) =>
              c.id === editingClient.id
                ? ({ ...c, ...data, updatedAt: new Date().toISOString() } as Client)
                : c
            );
            updateClients(updated);
            toast.success(lang === "he" ? "פרטי הלקוח עודכנו" : "Client updated");
          } else {
            const newClient: Client = {
              id: `client_${Date.now()}`,
              name: data.name || "לקוח חדש",
              companyName: data.companyName,
              email: data.email,
              phone: data.phone,
              address: data.address,
              website: data.website,
              status: data.status || "active",
              tags: data.tags || [],
              notes: data.notes,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            updateClients([newClient, ...clients]);
            toast.success(lang === "he" ? "לקוח חדש נוסף ל-CRM" : "New client added");
          }
        }}
        lang={lang}
      />

      {/* 2. Client Profile Drawer (360° View) */}
      <ClientProfileDrawer
        client={selectedClientProfile}
        isOpen={Boolean(selectedClientProfile)}
        onClose={() => setSelectedClientProfile(null)}
        onEditClient={(client) => {
          setEditingClient(client);
          setIsClientModalOpen(true);
        }}
        projects={projects}
        orders={orders}
        onOpenProjectDetails={setDetailsProject}
        onNewProjectForClient={(client) => {
          setEditingProject({
            id: generateId(),
            name: `פרויקט עבור ${client.name}`,
            description: "",
            status: "in_development",
            deploymentProvider: "Vercel",
            databaseType: "Supabase",
            techStack: ["Next.js", "Tailwind CSS"],
            ownerName: client.name,
            organization: client.companyName,
            contacts: [
              {
                id: "c_1",
                name: client.name,
                role: "איש קשר",
                phone: client.phone,
                email: client.email,
              },
            ],
            orderIndex: projects.length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          setIsProjectModalOpen(true);
        }}
        onNewOrderForClient={(client) => {
          setEditingOrder({
            id: `ord_${Date.now()}`,
            orderNumber: `ORD-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
            title: `עבודה חדשה - ${client.name}`,
            clientId: client.id,
            clientName: client.name,
            amount: 3500,
            status: "quote",
            items: [{ id: "item_1", description: "פיתוח מערכת", quantity: 1, unitPrice: 3500 }],
            orderDate: new Date().toISOString().split("T")[0],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          setIsOrderModalOpen(true);
        }}
        onNewInvoiceForClient={(client) => {
          const newInv: InvoiceRecord = {
            id: `inv_${Date.now()}`,
            invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
            amount: 3500,
            issueDate: new Date().toISOString().split("T")[0],
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            status: "sent",
            clientName: client.name,
            clientEmail: client.email,
            clientPhone: client.phone,
            clientAddress: client.companyName || client.address,
            items: [
              {
                id: "item_1",
                description: "Custom Software Development & Implementation",
                quantity: 1,
                unitPrice: 3500,
              },
            ],
          };
          setActiveInvoice(newInv);
          setInvoiceProject(projects[0] || null);
          setIsInvoiceModalOpen(true);
        }}
        onOpenInvoiceModal={(inv) => {
          setActiveInvoice(inv);
          setInvoiceProject(projects[0] || null);
          setIsInvoiceModalOpen(true);
        }}
        lang={lang}
      />

      {/* 3. Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        order={editingOrder}
        clients={clients}
        projects={projects}
        onClose={() => {
          setIsOrderModalOpen(false);
          setEditingOrder(null);
        }}
        onSave={(data) => {
          if (editingOrder) {
            const updated = orders.map((o) =>
              o.id === editingOrder.id
                ? ({ ...o, ...data, updatedAt: new Date().toISOString() } as Order)
                : o
            );
            updateOrders(updated);
            toast.success(lang === "he" ? "ההזמנה עודכנה" : "Order updated");
          } else {
            const newOrd: Order = {
              id: `ord_${Date.now()}`,
              orderNumber: data.orderNumber || `ORD-${new Date().getFullYear()}-001`,
              title: data.title || "הזמנת עבודה",
              clientId: data.clientId || clients[0]?.id || "",
              clientName: data.clientName || "לקוח",
              projectId: data.projectId,
              projectName: data.projectName,
              amount: data.amount || 0,
              status: data.status || "in_progress",
              items: data.items || [],
              orderDate: data.orderDate || new Date().toISOString().split("T")[0],
              dueDate: data.dueDate,
              notes: data.notes,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            updateOrders([newOrd, ...orders]);
            toast.success(lang === "he" ? "הזמנה חדשה נפתחה" : "New order opened");
          }
        }}
        lang={lang}
      />

      {/* 4. Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        clients={clients}
        projects={projects}
        defaultClientId={paymentDefaultClientId}
        defaultProjectId={paymentDefaultProjectId}
        onClose={() => setIsPaymentModalOpen(false)}
        onSavePayment={handleSavePayment}
        lang={lang}
      />

      {/* 5. Invoice Modal (Existing) */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        invoice={activeInvoice}
        project={invoiceProject}
        onClose={() => {
          setIsInvoiceModalOpen(false);
          setActiveInvoice(null);
        }}
        onUpdateInvoice={handleUpdateInvoice}
        lang={lang}
      />

      {/* 6. Project Modal (Existing) */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        project={editingProject}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        lang={lang}
      />

      {/* 7. Project Details Sheet (Existing) */}
      <ProjectDetailsSheet
        project={detailsProject}
        isOpen={Boolean(detailsProject)}
        onClose={() => setDetailsProject(null)}
        onEdit={(p) => {
          setEditingProject(p);
          setIsProjectModalOpen(true);
        }}
        onUpdateProject={(updated) => {
          updateProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
          setDetailsProject(updated);
        }}
        onOpenInquiries={() => setIsInquiriesModalOpen(true)}
        inquiriesCount={detailsProject ? inquiries.filter((inq) => inq.projectId === detailsProject.id).length : 0}
        lang={lang}
      />

      {/* 8. Local Folder Scanner Modal */}
      <LocalScannerModal
        isOpen={isScannerOpen}
        existingProjects={projects}
        onClose={() => setIsScannerOpen(false)}
        onImport={(imported) => {
          updateProjects([...imported, ...projects]);
          toast.success(lang === "he" ? `${imported.length} פרויקטים יובאו בהצלחה` : "Projects imported");
        }}
        lang={lang}
      />

      {/* 9. Client Inquiries Modal */}
      <ClientInquiriesModal
        isOpen={isInquiriesModalOpen}
        onClose={() => setIsInquiriesModalOpen(false)}
        inquiries={inquiries}
        onRefreshInquiries={async () => {
          const cloud = await fetchInquiriesFromCloud();
          setInquiries(cloud);
        }}
        projects={projects}
        lang={lang}
      />
    </div>
  );
}
