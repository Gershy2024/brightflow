"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { GreetingBanner } from "@/components/GreetingBanner";
import { StatsOverview } from "@/components/StatsOverview";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
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
import {
  FilterState,
  Language,
  PaginationState,
  Project,
  ProjectStatus,
  ViewMode,
  ClientInquiry,
} from "@/lib/types";
import {
  loadProjectsFromStorage,
  saveProjectsToStorage,
} from "@/lib/storage";
import {
  fetchProjectsFromCloud,
  syncProjectsToCloud,
  deleteProjectFromCloud,
  fetchInquiriesFromCloud,
} from "@/lib/supabaseService";
import { generateId } from "@/lib/utils";

export default function HomePage() {
  const [mounted, setMounted] = React.useState(false);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [lang, setLang] = React.useState<Language>("he");
  const [darkMode, setDarkMode] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<ViewMode>("table");

  // Filters state
  const [filters, setFilters] = React.useState<FilterState>({
    search: "",
    status: "",
    deploymentProvider: "",
    databaseType: "",
    owner: "",
  });

  // Pagination state (default: 25 items per page - Rule #3)
  const [pagination, setPagination] = React.useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 25,
  });

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  // Modals & Panels
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [detailsProject, setDetailsProject] = React.useState<Project | null>(null);
  const [isScannerOpen, setIsScannerOpen] = React.useState(false);
  const [isInquiriesModalOpen, setIsInquiriesModalOpen] = React.useState(false);
  const [inquiries, setInquiries] = React.useState<ClientInquiry[]>([]);
  const [isCloudSyncing, setIsCloudSyncing] = React.useState(false);

  const refreshInquiries = React.useCallback(async () => {
    try {
      const data = await fetchInquiriesFromCloud();
      setInquiries(data);
    } catch (e) {
      console.warn("Failed to refresh inquiries:", e);
    }
  }, []);

  // Initialize from storage on mount & sync with Supabase Cloud
  React.useEffect(() => {
    setMounted(true);
    const loaded = loadProjectsFromStorage();
    setProjects(loaded);

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
        } else if (loaded && loaded.length > 0) {
          // If Supabase table is empty on first run, upload all current projects!
          await syncProjectsToCloud(loaded);
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

  // Save projects to storage whenever updated and sync to Supabase
  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    saveProjectsToStorage(newProjects);
    syncProjectsToCloud(newProjects).catch((err) =>
      console.warn("Background cloud sync error:", err)
    );
  };

  // Language toggle
  const handleToggleLang = () => {
    const nextLang = lang === "he" ? "en" : "he";
    setLang(nextLang);
    localStorage.setItem("preferred_lang", nextLang);
  };

  // Dark mode toggle
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

  // Filtering logic
  const filteredProjects = React.useMemo(() => {
    return projects.filter((p) => {
      // Search text
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = (p.description || "").toLowerCase().includes(query);
        const matchesOwner = p.ownerName.toLowerCase().includes(query);
        const matchesTech = (p.techStack || []).some((t) =>
          t.toLowerCase().includes(query)
        );
        const matchesUrl = (p.liveUrl || "").toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesOwner && !matchesTech && !matchesUrl) {
          return false;
        }
      }

      // Status filter
      if (filters.status && p.status !== filters.status) {
        return false;
      }

      // Deployment filter
      if (
        filters.deploymentProvider &&
        p.deploymentProvider !== filters.deploymentProvider
      ) {
        return false;
      }

      // Database filter
      if (filters.databaseType && p.databaseType !== filters.databaseType) {
        return false;
      }

      // Owner filter
      if (filters.owner && p.ownerName !== filters.owner) {
        return false;
      }

      return true;
    });
  }, [projects, filters]);

  // Pagination slicing (Performance first - Rule #3)
  const paginatedProjects = React.useMemo(() => {
    if (viewMode === "kanban") {
      return filteredProjects;
    }
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + pagination.itemsPerPage);
  }, [filteredProjects, pagination, viewMode]);

  // Derived options for dropdown comboboxes
  const availableDeployments = React.useMemo(() => {
    return Array.from(
      new Set(projects.map((p) => p.deploymentProvider).filter(Boolean))
    );
  }, [projects]);

  const availableDatabases = React.useMemo(() => {
    return Array.from(
      new Set(
        projects
          .map((p) => p.databaseType)
          .filter((db) => db && db !== "None")
      )
    );
  }, [projects]);

  const availableOwners = React.useMemo(() => {
    return Array.from(
      new Set(projects.map((p) => p.ownerName.trim()).filter(Boolean))
    );
  }, [projects]);

  // Multi-select handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const currentPageIds = paginatedProjects.map((p) => p.id);
    const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    }
  };

  const allCurrentPageSelected =
    paginatedProjects.length > 0 &&
    paginatedProjects.every((p) => selectedIds.includes(p.id));

  // CRUD actions
  const handleSaveProject = (formData: Partial<Project>) => {
    if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? ({
              ...p,
              ...formData,
              updatedAt: new Date().toISOString(),
            } as Project)
          : p
      );
      updateProjects(updated);
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
    }
  };

  const handleUpdateProject = (updatedProj: Project) => {
    const next = projects.map((p) => (p.id === updatedProj.id ? updatedProj : p));
    updateProjects(next);
    if (detailsProject && detailsProject.id === updatedProj.id) {
      setDetailsProject(updatedProj);
    }
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    updateProjects(updated);
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    deleteProjectFromCloud(id).catch((err) =>
      console.warn("Cloud delete error:", err)
    );
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
  };

  // Bulk actions
  const handleBulkStatusChange = (status: ProjectStatus) => {
    const updated = projects.map((p) =>
      selectedIds.includes(p.id)
        ? { ...p, status, updatedAt: new Date().toISOString() }
        : p
    );
    updateProjects(updated);
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    const toDelete = [...selectedIds];
    const updated = projects.filter((p) => !selectedIds.includes(p.id));
    updateProjects(updated);
    setSelectedIds([]);
    toDelete.forEach((id) =>
      deleteProjectFromCloud(id).catch((err) => console.warn(err))
    );
  };

  const handleBulkExport = () => {
    const selected = projects.filter((p) => selectedIds.includes(p.id));
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selected, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `projects-export-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportAll = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `all-projects-vault-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          updateProjects(parsed);
        }
      } catch (err) {
        alert("שגיאה בקריאת קובץ הגיבוי");
      }
    };
    reader.readAsText(file);
  };

  const handleImportFromScanner = (newProjects: Project[]) => {
    updateProjects([...newProjects, ...projects]);
  };

  const handleStatusChangeFromKanban = (projectId: string, newStatus: ProjectStatus) => {
    const updated = projects.map((p) =>
      p.id === projectId
        ? { ...p, status: newStatus, updatedAt: new Date().toISOString() }
        : p
    );
    updateProjects(updated);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0f111a]">
        <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  const isRtl = lang === "he";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F8FAFC] dark:bg-[#0f111a] text-foreground transition-colors pb-28 selection:bg-blue-500/20 selection:text-blue-600"
    >
      {/* 1. Header / Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onNewProject={() => {
          setEditingProject(null);
          setIsModalOpen(true);
        }}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenInquiries={() => setIsInquiriesModalOpen(true)}
        inquiriesCount={inquiries.filter((i) => i.status === "new").length}
        onExportAll={handleExportAll}
        onImportBackup={handleImportBackup}
      />

      <main className="w-full max-w-[1750px] mx-auto px-6 sm:px-8 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* 2. Modern Greeting Banner (Teo / GrabStar Style) */}
        <GreetingBanner
          projects={projects}
          onNewProject={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          onOpenScanner={() => setIsScannerOpen(true)}
          lang={lang}
        />

        {/* 3. KPI & Stat Cards with Mini Sparklines & Badges */}
        <StatsOverview projects={projects} lang={lang} />

        {/* 4. Analytics Visualizations (Curved Splines Area Chart & Donut Ring Chart) */}
        <AnalyticsCharts projects={projects} lang={lang} />

        {/* 5. Search Bar, Combobox Filters & View Mode Switcher */}
        <SearchAndFilters
          filters={filters}
          onFilterChange={(f) => {
            setFilters(f);
            setPagination((p) => ({ ...p, currentPage: 1 }));
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          availableDeployments={availableDeployments}
          availableDatabases={availableDatabases}
          availableOwners={availableOwners}
          lang={lang}
        />

        {/* 6. Main Projects Listing (Table / Cards / Kanban) */}
        {viewMode === "table" && (
          <div className="space-y-3">
            <ProjectTable
              projects={paginatedProjects}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              allSelected={allCurrentPageSelected}
              onEdit={(p) => {
                setEditingProject(p);
                setIsModalOpen(true);
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
                  onPageChange={(page) =>
                    setPagination((p) => ({ ...p, currentPage: page }))
                  }
                  onItemsPerPageChange={(itemsPerPage) =>
                    setPagination({ currentPage: 1, itemsPerPage })
                  }
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
                  isSelected={selectedIds.includes(p.id)}
                  onToggleSelect={handleToggleSelect}
                  onEdit={(proj) => {
                    setEditingProject(proj);
                    setIsModalOpen(true);
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
                  onPageChange={(page) =>
                    setPagination((p) => ({ ...p, currentPage: page }))
                  }
                  onItemsPerPageChange={(itemsPerPage) =>
                    setPagination({ currentPage: 1, itemsPerPage })
                  }
                  lang={lang}
                />
              </div>
            )}
          </div>
        )}

        {viewMode === "kanban" && (
          <KanbanBoard
            projects={filteredProjects}
            onStatusChange={handleStatusChangeFromKanban}
            onEdit={(p) => {
              setEditingProject(p);
              setIsModalOpen(true);
            }}
            onViewDetails={setDetailsProject}
            lang={lang}
          />
        )}
      </main>

      {/* Floating Bulk Action Toolbar (Rule #3) */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        totalOnPage={paginatedProjects.length}
        allSelected={allCurrentPageSelected}
        onToggleSelectAll={handleToggleSelectAll}
        onClearSelection={() => setSelectedIds([])}
        onBulkStatusChange={handleBulkStatusChange}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
        lang={lang}
      />

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        project={editingProject}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        lang={lang}
      />

      {/* Project Details Sheet */}
      <ProjectDetailsSheet
        project={detailsProject}
        isOpen={Boolean(detailsProject)}
        onClose={() => setDetailsProject(null)}
        onEdit={(p) => {
          setEditingProject(p);
          setIsModalOpen(true);
        }}
        onUpdateProject={handleUpdateProject}
        onOpenInquiries={() => setIsInquiriesModalOpen(true)}
        inquiriesCount={detailsProject ? inquiries.filter((inq) => inq.projectId === detailsProject.id).length : 0}
        lang={lang}
      />

      {/* Local Folder Scanner Modal */}
      <LocalScannerModal
        isOpen={isScannerOpen}
        existingProjects={projects}
        onClose={() => setIsScannerOpen(false)}
        onImport={handleImportFromScanner}
        lang={lang}
      />

      {/* Client Inquiries & Feedback Modal */}
      <ClientInquiriesModal
        isOpen={isInquiriesModalOpen}
        onClose={() => setIsInquiriesModalOpen(false)}
        inquiries={inquiries}
        onRefreshInquiries={refreshInquiries}
        projects={projects}
        lang={lang}
      />
    </div>
  );
}
