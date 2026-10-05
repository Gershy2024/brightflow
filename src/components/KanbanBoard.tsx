"use client";

import * as React from "react";
import {
  DndContext,
  pointerWithin,
  rectIntersection,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  ExternalLink,
  Edit,
  Database,
  Cloud,
} from "lucide-react";
import { Language, Project, ProjectStatus } from "@/lib/types";
import { getStatusBadgeVariant, translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface KanbanBoardProps {
  projects: Project[];
  onStatusChange: (projectId: string, newStatus: ProjectStatus) => void;
  onEdit: (project: Project) => void;
  onViewDetails: (project: Project) => void;
  lang: Language;
}

const COLUMNS: ProjectStatus[] = [
  "live",
  "in_development",
  "maintenance",
  "paused",
  "archived",
];

function KanbanCard({
  project,
  onEdit,
  onViewDetails,
  lang,
}: {
  project: Project;
  onEdit: (p: Project) => void;
  onViewDetails: (p: Project) => void;
  lang: Language;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.id,
    data: { project, type: "card", status: project.status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#1a1d2e] p-3.5 shadow-sm hover:shadow-md transition-all text-sm select-none",
        isDragging && "opacity-30 ring-2 ring-blue-500 border-blue-500 scale-[0.98]"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        {/* Drag handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 -m-1 rounded-lg touch-none"
          title="גרור כדי להזיז"
        >
          <GripVertical className="h-4 w-4" strokeWidth={2} />
        </button>

        <span
          role="button"
          tabIndex={0}
          onClick={() => onViewDetails(project)}
          className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer flex-1 truncate"
        >
          {project.name}
        </span>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        )}
      </div>

      {project.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2.5">
          {project.description}
        </p>
      )}

      {/* Mini info pills */}
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        {project.estimatedValue ? (
          <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 text-[10px]">
            ${project.estimatedValue.toLocaleString()}
          </span>
        ) : null}
        {project.paidAmount ? (
          <span className="font-mono font-bold text-teal-700 dark:text-teal-300 bg-teal-500/10 px-1.5 py-0.5 rounded-lg border border-teal-500/20 text-[10px]" title="שולם עד כה">
            ✓ ${(project.paidAmount).toLocaleString()}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-lg font-medium text-slate-700 dark:text-slate-300">
          <Cloud className="h-3 w-3 text-blue-500" strokeWidth={2} />
          {project.deploymentProvider}
        </span>
        <span className="inline-flex items-center gap-1 bg-violet-500/10 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-lg font-medium">
          <Database className="h-3 w-3 text-violet-500" strokeWidth={2} />
          {project.databaseType}
        </span>
        <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">
          {project.ownerName}
        </span>
      </div>
    </div>
  );
}

function KanbanColumn({
  colStatus,
  projects,
  onEdit,
  onViewDetails,
  lang,
}: {
  colStatus: ProjectStatus;
  projects: Project[];
  onEdit: (p: Project) => void;
  onViewDetails: (p: Project) => void;
  lang: Language;
}) {
  const t = translations[lang];
  const colProjects = projects.filter((p) => p.status === colStatus);
  const badgeStyle = getStatusBadgeVariant(colStatus);

  const { setNodeRef, isOver } = useDroppable({
    id: colStatus,
    data: { type: "column", status: colStatus },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-3xl border border-slate-200/60 dark:border-white/10 bg-slate-50/70 dark:bg-[#151726] p-3.5 min-h-[500px] transition-colors",
        isOver && "ring-2 ring-blue-500/50 bg-blue-50/30 dark:bg-blue-950/20"
      )}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className={cn("h-2.5 w-2.5 rounded-full", badgeStyle.dot)} />
          <span className="font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200">
            {t.status[colStatus]}
          </span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-[#1a1d2e] border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-400 shadow-sm">
          {colProjects.length}
        </span>
      </div>

      {/* Cards Container */}
      <SortableContext
        items={colProjects.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 space-y-3 overflow-y-auto min-h-[160px] pb-4">
          {colProjects.map((proj) => (
            <KanbanCard
              key={proj.id}
              project={proj}
              onEdit={onEdit}
              onViewDetails={onViewDetails}
              lang={lang}
            />
          ))}
          {colProjects.length === 0 && (
            <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-xs text-slate-400 dark:text-slate-500 font-medium bg-white/40 dark:bg-white/[0.02]">
              <span>גרור פרויקט לכאן</span>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export function KanbanBoard({
  projects,
  onStatusChange,
  onEdit,
  onViewDetails,
  lang,
}: KanbanBoardProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const activeProject = activeId ? projects.find((p) => p.id === activeId) : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeIdStr = String(active.id);
    const activeProj = projects.find((p) => p.id === activeIdStr);
    if (!activeProj) return;

    // Detect target status from column drop or card drop
    let targetStatus: ProjectStatus | null = null;
    const overIdStr = String(over.id);

    if (COLUMNS.includes(overIdStr as ProjectStatus)) {
      targetStatus = overIdStr as ProjectStatus;
    } else {
      const overProj = projects.find((p) => p.id === overIdStr);
      if (overProj) {
        targetStatus = overProj.status;
      }
    }

    if (targetStatus && targetStatus !== activeProj.status) {
      onStatusChange(activeProj.id, targetStatus);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={(args) => {
        // Try pointerWithin first, fallback to rectIntersection or closestCorners
        const pointerCollisions = pointerWithin(args);
        if (pointerCollisions.length > 0) return pointerCollisions;
        const rectCollisions = rectIntersection(args);
        if (rectCollisions.length > 0) return rectCollisions;
        return closestCorners(args);
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start pb-6">
        {COLUMNS.map((colStatus) => (
          <KanbanColumn
            key={colStatus}
            colStatus={colStatus}
            projects={projects}
            onEdit={onEdit}
            onViewDetails={onViewDetails}
            lang={lang}
          />
        ))}
      </div>

      {/* Drag Overlay preview */}
      <DragOverlay dropAnimation={null}>
        {activeProject ? (
          <div className="rounded-2xl border-2 border-blue-500 bg-white dark:bg-[#1a1d2e] p-3.5 shadow-2xl scale-105 rotate-1 text-sm opacity-95 pointer-events-none">
            <span className="font-bold text-slate-900 dark:text-white block truncate">
              {activeProject.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {activeProject.ownerName}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
