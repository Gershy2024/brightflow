"use client";

import * as React from "react";
import {
  Filter,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  Kanban,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox";
import { FilterState, Language, ViewMode } from "@/lib/types";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface SearchAndFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  availableDeployments: string[];
  availableDatabases: string[];
  availableOwners: string[];
  lang: Language;
}

export function SearchAndFilters({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  availableDeployments,
  availableDatabases,
  availableOwners,
  lang,
}: SearchAndFiltersProps) {
  const t = translations[lang];

  const statusOptions = [
    { value: "", label: t.allStatuses },
    { value: "live", label: t.status.live },
    { value: "in_development", label: t.status.in_development },
    { value: "maintenance", label: t.status.maintenance },
    { value: "paused", label: t.status.paused },
    { value: "archived", label: t.status.archived },
  ];

  const deploymentOptions = [
    { value: "", label: t.allDeployments },
    ...availableDeployments.map((d) => ({ value: d, label: d })),
  ];

  const databaseOptions = [
    { value: "", label: t.allDatabases },
    ...availableDatabases.map((db) => ({ value: db, label: db })),
  ];

  const ownerOptions = [
    { value: "", label: t.allOwners },
    ...availableOwners.map((o) => ({ value: o, label: o })),
  ];

  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.status) ||
    Boolean(filters.deploymentProvider) ||
    Boolean(filters.databaseType) ||
    Boolean(filters.owner);

  const resetFilters = () => {
    onFilterChange({
      search: "",
      status: "",
      deploymentProvider: "",
      databaseType: "",
      owner: "",
    });
  };

  return (
    <div className="space-y-3.5">
      {/* Top Search bar + Segmented View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={2} />
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            placeholder={t.searchPlaceholder}
            className="w-full h-11 ps-10 pe-10 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#1a1d2e] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all font-medium"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, search: "" })}
              className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* View Mode Segmented Controls */}
        <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-white/5 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={cn(
              "flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-bold transition-all",
              viewMode === "table"
                ? "bg-white dark:bg-[#1a1d2e] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <List className="h-4 w-4" strokeWidth={2} />
            <span>{t.views.table}</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("cards")}
            className={cn(
              "flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-bold transition-all",
              viewMode === "cards"
                ? "bg-white dark:bg-[#1a1d2e] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <LayoutGrid className="h-4 w-4" strokeWidth={2} />
            <span>{t.views.cards}</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("kanban")}
            className={cn(
              "flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-bold transition-all",
              viewMode === "kanban"
                ? "bg-white dark:bg-[#1a1d2e] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Kanban className="h-4 w-4" strokeWidth={2} />
            <span>{t.views.kanban}</span>
          </button>
        </div>
      </div>

      {/* Filter Comboboxes Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 items-center">
        {/* Status Combobox */}
        <Combobox
          options={statusOptions}
          value={filters.status}
          onChange={(val) => onFilterChange({ ...filters, status: val })}
          placeholder={t.allStatuses}
          searchPlaceholder="חפש סטטוס..."
          emptyText={t.noResultsFound}
        />

        {/* Deployment Combobox */}
        <Combobox
          options={deploymentOptions}
          value={filters.deploymentProvider}
          onChange={(val) =>
            onFilterChange({ ...filters, deploymentProvider: val })
          }
          placeholder={t.allDeployments}
          searchPlaceholder="חפש אחסון..."
          emptyText={t.noResultsFound}
        />

        {/* Database Combobox */}
        <Combobox
          options={databaseOptions}
          value={filters.databaseType}
          onChange={(val) =>
            onFilterChange({ ...filters, databaseType: val })
          }
          placeholder={t.allDatabases}
          searchPlaceholder="חפש בסיס נתונים..."
          emptyText={t.noResultsFound}
        />

        {/* Owner Combobox */}
        <Combobox
          options={ownerOptions}
          value={filters.owner}
          onChange={(val) => onFilterChange({ ...filters, owner: val })}
          placeholder={t.allOwners}
          searchPlaceholder="חפש לקוח..."
          emptyText={t.noResultsFound}
        />

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="h-10 text-xs font-semibold gap-1.5 rounded-2xl border-dashed border-slate-300 dark:border-slate-700 col-span-2 sm:col-span-1 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
            <span>{t.clearFilters}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
