"use client";

import * as React from "react";
import {
  ExternalLink,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Database,
  Cloud,
  User,
  Eye,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Language, Project } from "@/lib/types";
import { getStatusBadgeVariant, translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ProjectTableProps {
  projects: Project[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  allSelected: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onDuplicate: (project: Project) => void;
  onViewDetails: (project: Project) => void;
  lang: Language;
}

export function ProjectTable({
  projects,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  allSelected,
  onEdit,
  onDelete,
  onDuplicate,
  onViewDetails,
  lang,
}: ProjectTableProps) {
  const t = translations[lang];

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl border border-dashed border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1d2e]">
        <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-3">
          <Database className="h-8 w-8" strokeWidth={1.75} />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {t.emptyState.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
          {t.emptyState.desc}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#1a1d2e] shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-none transition-all">
      <div className="overflow-x-auto">
        <table className="w-full text-start border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] text-slate-400 dark:text-slate-500 font-semibold text-xs">
              <th className="py-4 px-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={allSelected && projects.length > 0}
                  onChange={onToggleSelectAll}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                  aria-label={t.bulk.selectAll}
                />
              </th>
              <th className="py-4 px-3 text-start font-bold">
                {t.table.projectName}
              </th>
              <th className="py-4 px-3 text-start font-bold">
                {t.table.status}
              </th>
              <th className="py-4 px-3 text-start font-bold">
                {t.table.estimatedValue}
              </th>
              <th className="py-4 px-3 text-start font-bold">
                {t.table.billingStatus || "תשלומים"}
              </th>
              <th className="py-4 px-3 text-start font-bold">
                {t.table.deployment}
              </th>
              <th className="py-4 px-3 text-start font-bold">
                {t.table.database}
              </th>
              <th className="py-4 px-3 text-start font-bold">
                {t.table.owner}
              </th>
              <th className="py-4 px-3 text-start font-bold">
                {t.table.contacts}
              </th>
              <th className="py-4 px-4 text-end font-bold w-24">
                {t.table.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {projects.map((project) => {
              const isSelected = selectedIds.includes(project.id);
              const badgeStyle = getStatusBadgeVariant(project.status);
              const statusLabel = t.status[project.status];

              return (
                <tr
                  key={project.id}
                  className={cn(
                    "group transition-colors hover:bg-slate-50/70 dark:hover:bg-white/[0.02]",
                    isSelected && "bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50/60"
                  )}
                >
                  {/* Row Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(project.id)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    />
                  </td>

                  {/* Project Name + Quick Link */}
                  <td className="py-4 px-3 max-w-xs">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={() => onViewDetails(project)}
                          className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer truncate"
                          title={project.name}
                        >
                          {project.name}
                        </span>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title={t.actions.openLive}
                          >
                            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-sm mt-0.5">
                          {project.description}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                        badgeStyle.bg,
                        badgeStyle.color,
                        badgeStyle.border
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", badgeStyle.dot)} />
                      {statusLabel}
                    </span>
                  </td>

                  {/* Estimated Value */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    {project.estimatedValue ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs border border-emerald-500/20 font-mono shadow-sm">
                        ${project.estimatedValue.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-300 dark:text-slate-600 font-medium">—</span>
                    )}
                  </td>

                  {/* Billing / Paid Status */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    {(() => {
                      const totalVal = project.estimatedValue || 0;
                      const paid = project.paidAmount || 0;
                      if (!totalVal && !paid) {
                        return <span className="text-xs text-slate-400">—</span>;
                      }
                      const isFullyPaid = totalVal > 0 && paid >= totalVal;
                      const isPartiallyPaid = paid > 0 && paid < totalVal;
                      const pct = totalVal > 0 ? Math.min(100, Math.round((paid / totalVal) * 100)) : (paid > 0 ? 100 : 0);

                      return (
                        <div className="flex flex-col gap-1 max-w-[130px]">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className={cn(
                              "font-bold font-mono",
                              isFullyPaid ? "text-emerald-600 dark:text-emerald-400" : isPartiallyPaid ? "text-amber-600 dark:text-amber-400" : "text-slate-500"
                            )}>
                              ${paid.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {pct}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all duration-300",
                                isFullyPaid ? "bg-emerald-500" : isPartiallyPaid ? "bg-amber-500" : "bg-slate-300"
                              )}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </td>

                  {/* Deployment Provider */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-slate-200 font-semibold">
                      <Cloud className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
                      <span>{project.deploymentProvider}</span>
                    </div>
                    {project.deploymentAccount && (
                      <span className="text-[11px] text-slate-400 truncate block max-w-[140px]">
                        {project.deploymentAccount}
                      </span>
                    )}
                  </td>

                  {/* Database */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Database className="h-3.5 w-3.5 text-violet-500" strokeWidth={2} />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {project.databaseType}
                      </span>
                    </div>
                    {project.databaseName && (
                      <span className="text-[11px] text-slate-400 truncate block max-w-[130px]">
                        {project.databaseName}
                      </span>
                    )}
                  </td>

                  {/* Owner / Client */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <User className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
                      <span>{project.ownerName}</span>
                    </div>
                    {project.organization && (
                      <span className="text-[11px] text-slate-400 truncate block max-w-[140px]">
                        {project.organization}
                      </span>
                    )}
                  </td>

                  {/* Contacts */}
                  <td className="py-4 px-3 max-w-[160px]">
                    {project.contacts && project.contacts.length > 0 ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {project.contacts.slice(0, 2).map((c) => (
                          <span
                            key={c.id}
                            className="inline-flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-lg text-slate-800 dark:text-slate-200 font-medium truncate"
                            title={`${c.name} (${c.role}) ${c.phone || ""}`}
                          >
                            {c.name}
                          </span>
                        ))}
                        {project.contacts.length > 2 && (
                          <span className="text-[10px] text-slate-400">
                            +{project.contacts.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>

                  {/* Actions Menu */}
                  <td className="py-4 px-4 text-end whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
                          title={t.table.actions}
                        >
                          <MoreVertical className="h-4 w-4" strokeWidth={2} />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => onViewDetails(project)}>
                          <Eye className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
                          <span>{t.actions.viewDetails}</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => onEdit(project)}>
                          <Edit className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
                          <span>{t.actions.edit}</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => onDuplicate(project)}>
                          <Copy className="h-3.5 w-3.5 text-violet-500" strokeWidth={2} />
                          <span>{t.actions.duplicate}</span>
                        </DropdownMenuItem>

                        {project.liveUrl && (
                          <DropdownMenuItem asChild>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                              <span>{t.actions.openLive}</span>
                            </a>
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => onDelete(project.id)}
                          className="text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/40"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                          <span>{t.actions.delete}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
