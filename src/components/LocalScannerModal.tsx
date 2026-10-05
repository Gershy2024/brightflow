"use client";

import * as React from "react";
import {
  FolderSearch,
  Check,
  X,
  Loader2,
  Database,
  Cloud,
  CheckCircle2,
  FolderCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Language, Project } from "@/lib/types";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LocalScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingProjects: Project[];
  onImport: (newProjects: Project[]) => void;
  lang: Language;
}

export function LocalScannerModal({
  isOpen,
  onClose,
  existingProjects,
  onImport,
  lang,
}: LocalScannerModalProps) {
  const t = translations[lang].scanner;
  const commonT = translations[lang];

  const [loading, setLoading] = React.useState(false);
  const [discovered, setDiscovered] = React.useState<Partial<Project>[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [hasScanned, setHasScanned] = React.useState(false);

  const startScan = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/scan");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setDiscovered(data.projects);
        // By default select those that are not already in existing projects
        const newIds = data.projects
          .filter(
            (p: Partial<Project>) =>
              !existingProjects.some(
                (ep) =>
                  ep.name.toLowerCase() === (p.name || "").toLowerCase() ||
                  (ep.localFolderPath && ep.localFolderPath === p.localFolderPath)
              )
          )
          .map((p: Partial<Project>) => p.id!);
        setSelectedIds(newIds);
      }
    } catch (err) {
      console.error("Scan error:", err);
    } finally {
      setLoading(false);
      setHasScanned(true);
    }
  };

  React.useEffect(() => {
    if (isOpen && !hasScanned) {
      startScan();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleImportSubmit = () => {
    const toImport = discovered.filter((p) =>
      selectedIds.includes(p.id!)
    ) as Project[];
    onImport(toImport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-0">
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl border border-border bg-card p-6 shadow-2xl flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <FolderSearch className="h-6 w-6" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{t.title}</h2>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8 text-muted-foreground"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3 min-h-[220px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" strokeWidth={2} />
              <p className="text-sm font-medium">סורק תיקיות במחשב...</p>
            </div>
          ) : discovered.length === 0 ? (
            <div className="text-center py-12 text-sm text-muted-foreground">
              לא נמצאו תיקיות פרויקטים נוספות בסביבה המקומית.
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {t.foundProjects} ({discovered.length})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const importable = discovered
                        .filter(
                          (p) =>
                            !existingProjects.some(
                              (ep) =>
                                ep.name.toLowerCase() === (p.name || "").toLowerCase() ||
                                (ep.localFolderPath && ep.localFolderPath === p.localFolderPath)
                            )
                        )
                        .map((p) => p.id!);
                      setSelectedIds(importable);
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    בחר הכל
                  </button>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <button
                    type="button"
                    onClick={() => setSelectedIds([])}
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:underline"
                  >
                    נקה בחירה
                  </button>
                </div>
              </div>

              {discovered.map((proj) => {
                const isAlready = existingProjects.some(
                  (ep) =>
                    ep.name.toLowerCase() === (proj.name || "").toLowerCase() ||
                    (ep.localFolderPath && ep.localFolderPath === proj.localFolderPath)
                );
                const isSelected = selectedIds.includes(proj.id!);

                return (
                  <div
                    key={proj.id}
                    onClick={() => {
                      if (!isAlready) toggleSelect(proj.id!);
                    }}
                    className={cn(
                      "p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 select-none",
                      isAlready
                        ? "bg-slate-100/60 dark:bg-white/[0.03] border-slate-200/50 dark:border-white/5 opacity-60 cursor-not-allowed"
                        : "cursor-pointer hover:border-blue-500/50 bg-white dark:bg-[#1a1d2e] border-slate-200/80 dark:border-white/10 shadow-sm",
                      isSelected && !isAlready && "ring-2 ring-blue-500 border-blue-500 bg-blue-50/20 dark:bg-blue-950/20"
                    )}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        disabled={isAlready}
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          if (!isAlready) toggleSelect(proj.id!);
                        }}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {proj.name}
                          </h4>
                          {isAlready ? (
                            <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground font-medium">
                              {t.alreadyExists}
                            </span>
                          ) : (
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                              {t.newToImport}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 font-mono truncate max-w-md">
                          {proj.localFolderPath}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-muted-foreground">
                          {proj.deploymentProvider && (
                            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded-md">
                              <Cloud className="h-3 w-3" />
                              {proj.deploymentProvider}
                            </span>
                          )}
                          {proj.databaseType && proj.databaseType !== "None" && (
                            <span className="inline-flex items-center gap-1 bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-md font-medium">
                              <Database className="h-3 w-3" />
                              {proj.databaseType}
                            </span>
                          )}
                          {proj.techStack?.map((t, idx) => (
                            <span key={idx} className="bg-secondary px-1.5 py-0.5 rounded text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <Button variant="ghost" size="sm" onClick={startScan} disabled={loading} className="text-xs">
            {t.scanNow}
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
              {commonT.actions.cancel}
            </Button>
            <Button
              size="sm"
              disabled={selectedIds.length === 0 || loading}
              onClick={handleImportSubmit}
              className="text-xs gap-1.5"
            >
              <FolderCheck className="h-4 w-4" strokeWidth={2} />
              <span>
                {t.importSelected} ({selectedIds.length})
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
