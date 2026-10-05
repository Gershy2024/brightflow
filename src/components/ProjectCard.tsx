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
  Check,
  Building,
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

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onDuplicate: (project: Project) => void;
  onViewDetails: (project: Project) => void;
  lang: Language;
}

export function ProjectCard({
  project,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onViewDetails,
  lang,
}: ProjectCardProps) {
  const t = translations[lang];
  const [copied, setCopied] = React.useState(false);
  const badgeStyle = getStatusBadgeVariant(project.status);

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl) {
      navigator.clipboard.writeText(project.liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-[#1a1d2e] p-6 border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:hover:border-white/20 transition-all duration-200",
        isSelected && "ring-2 ring-blue-500 border-blue-500/40 bg-blue-50/10 dark:bg-blue-950/20"
      )}
    >
      <div>
        {/* Top Header: Checkbox + Status Pill + Context Menu */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(project.id)}
              className="h-4 w-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
            />
            {/* Status Pill Badge */}
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                badgeStyle.bg,
                badgeStyle.color,
                badgeStyle.border
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", badgeStyle.dot)} />
              {t.status[project.status]}
            </span>

            {/* Estimated Worth Badge */}
            {project.estimatedValue ? (
              <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-mono shadow-sm">
                ${project.estimatedValue.toLocaleString()}
              </span>
            ) : null}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
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
        </div>

        {/* Project Title & Description */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2">
            <h3
              onClick={() => onViewDetails(project)}
              className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer truncate"
              title={project.name}
            >
              {project.name}
            </h3>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                title={t.actions.openLive}
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            )}
          </div>
          {project.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {/* Meta Stats Panel (Hosting, DB, Owner) */}
        <div className="space-y-2.5 py-3.5 border-y border-slate-100 dark:border-white/5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-medium">
              <Cloud className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
              {t.table.deployment}
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
              {project.deploymentProvider}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-medium">
              <Database className="h-3.5 w-3.5 text-violet-500" strokeWidth={2} />
              {t.table.database}
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
              {project.databaseType}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-medium">
              <User className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
              {t.table.owner}
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
              {project.ownerName}
            </span>
          </div>

          {/* Payment Progress Bar */}
          {Boolean(project.estimatedValue || project.paidAmount) && (
            <div className="pt-1.5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">
                  {t.billing?.totalPaid || "שולם"}:
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  ${(project.paidAmount || 0).toLocaleString()}
                  {project.estimatedValue ? ` / $${project.estimatedValue.toLocaleString()}` : ""}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                  style={{
                    width: `${project.estimatedValue ? Math.min(100, Math.round(((project.paidAmount || 0) / project.estimatedValue) * 100)) : 100}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tech Stack Pills */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Quick Action Buttons */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 dark:border-white/5 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(project)}
          className="text-xs h-9 flex-1 rounded-2xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
        >
          {t.actions.viewDetails}
        </Button>

        {project.liveUrl && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyUrl}
              className="h-9 w-9 rounded-2xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
              title={t.actions.copyLink}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs h-9 px-3.5 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all font-semibold"
            >
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              <span>{t.actions.openLive}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
