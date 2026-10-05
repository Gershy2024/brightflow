"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";
import { Language } from "@/lib/types";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  lang: Language;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export function PaginationControls({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  lang,
}: PaginationControlsProps) {
  const t = translations[lang].pagination;
  const isRtl = lang === "he";

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startItem = totalItems === 0 ? 0 : (validCurrentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(validCurrentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 border-t border-border/80 text-sm">
      {/* Count & Per Page Selector */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Count display: "מציג 1-25 מתוך 350 פרויקטים" */}
        <span className="text-muted-foreground font-medium">
          {t.showing}{" "}
          <span className="font-semibold text-foreground">
            {startItem}-{endItem}
          </span>{" "}
          {t.of}{" "}
          <span className="font-semibold text-foreground">{totalItems}</span>{" "}
          {t.projects}
        </span>

        {/* Per-page selector dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{t.perPage}:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="h-8 rounded-lg border border-input bg-background px-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer hover:border-foreground/30 transition-colors"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation Controls: First, Prev, Page numbers, Next, Last */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg"
          onClick={() => onPageChange(1)}
          disabled={validCurrentPage <= 1}
          title={isRtl ? "לעמוד הראשון" : "First Page"}
        >
          {isRtl ? (
            <ChevronsRight className="h-4 w-4" strokeWidth={2} />
          ) : (
            <ChevronsLeft className="h-4 w-4" strokeWidth={2} />
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 rounded-lg gap-1 text-xs"
          onClick={() => onPageChange(validCurrentPage - 1)}
          disabled={validCurrentPage <= 1}
        >
          {isRtl ? (
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          ) : (
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          )}
          <span>{t.prev}</span>
        </Button>

        <div className="flex items-center gap-1 px-2 text-xs font-semibold text-muted-foreground">
          <span className="text-foreground">{validCurrentPage}</span>
          <span>/</span>
          <span>{totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 rounded-lg gap-1 text-xs"
          onClick={() => onPageChange(validCurrentPage + 1)}
          disabled={validCurrentPage >= totalPages}
        >
          <span>{t.next}</span>
          {isRtl ? (
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          ) : (
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg"
          onClick={() => onPageChange(totalPages)}
          disabled={validCurrentPage >= totalPages}
          title={isRtl ? "לעמוד האחרון" : "Last Page"}
        >
          {isRtl ? (
            <ChevronsLeft className="h-4 w-4" strokeWidth={2} />
          ) : (
            <ChevronsRight className="h-4 w-4" strokeWidth={2} />
          )}
        </Button>
      </div>
    </div>
  );
}
