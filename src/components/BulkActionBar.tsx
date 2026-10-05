"use client";

import * as React from "react";
import {
  Archive,
  CheckCircle2,
  Download,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Language, ProjectStatus } from "@/lib/types";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface BulkActionBarProps {
  selectedCount: number;
  totalOnPage: number;
  allSelected: boolean;
  onToggleSelectAll: () => void;
  onClearSelection: () => void;
  onBulkStatusChange: (status: ProjectStatus) => void;
  onBulkDelete: () => void;
  onBulkExport: () => void;
  lang: Language;
}

export function BulkActionBar({
  selectedCount,
  allSelected,
  onToggleSelectAll,
  onClearSelection,
  onBulkStatusChange,
  onBulkDelete,
  onBulkExport,
  lang,
}: BulkActionBarProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const t = translations[lang].bulk;
  const statusT = translations[lang].status;

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 inset-x-0 mx-auto w-fit max-w-[95vw] z-40 animate-in fade-in-50 slide-in-from-bottom-5 duration-200">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-zinc-900/95 dark:bg-zinc-800/95 text-zinc-50 border border-zinc-700/60 shadow-2xl backdrop-blur-md px-4 py-2.5 rounded-2xl">
          {/* Selected Count */}
          <div className="flex items-center gap-2 pr-2 rtl:pl-2 rtl:pr-0 border-r rtl:border-l rtl:border-r-0 border-zinc-700">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {selectedCount}
            </span>
            <span className="text-xs sm:text-sm font-medium">
              {t.selectedCount.replace("{count}", selectedCount.toString())}
            </span>
          </div>

          {/* Select all / Deselect */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSelectAll}
            className="text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 h-8 px-2.5"
          >
            {allSelected ? t.clearSelection : t.selectAll}
          </Button>

          {/* Bulk status changer */}
          <div className="flex items-center gap-1.5">
            <select
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  onBulkStatusChange(e.target.value as ProjectStatus);
                  e.target.value = "";
                }
              }}
              className="h-8 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 text-xs px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="" disabled>
                {t.changeStatus}
              </option>
              <option value="live">{statusT.live}</option>
              <option value="in_development">{statusT.in_development}</option>
              <option value="maintenance">{statusT.maintenance}</option>
              <option value="paused">{statusT.paused}</option>
              <option value="archived">{statusT.archived}</option>
            </select>
          </div>

          {/* Export JSON */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onBulkExport}
            className="h-8 px-2.5 text-xs text-zinc-200 hover:text-white hover:bg-zinc-800 gap-1.5"
            title={t.exportJson}
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="hidden sm:inline">{t.exportJson}</span>
          </Button>

          {/* Delete Button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="h-8 px-3 text-xs gap-1.5 rounded-lg bg-red-600 hover:bg-red-700 font-medium"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{t.deleteSelected}</span>
          </Button>

          {/* Clear button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg ml-1 rtl:mr-1 rtl:ml-0"
            title={t.clearSelection}
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog for Bulk Delete */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-0">
          <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-destructive">
              <div className="p-2.5 rounded-xl bg-destructive/10">
                <AlertTriangle className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {t.confirmDeleteTitle}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.confirmDeleteDesc.replace("{count}", selectedCount.toString())}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                {t.cancel}
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onBulkDelete();
                  setShowDeleteConfirm(false);
                }}
              >
                {t.confirm}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
