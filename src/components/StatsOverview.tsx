"use client";

import * as React from "react";
import {
  Database,
  Globe2,
  Layers,
  Users,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Language, Project } from "@/lib/types";
import { translations } from "@/lib/i18n";

interface StatsOverviewProps {
  projects: Project[];
  lang: Language;
}

// Mini Sparkline SVG component with smooth curved spline & gradient vertical fill
function MiniSparkline({
  color,
  gradientId,
  data,
}: {
  color: string;
  gradientId: string;
  data: number[];
}) {
  const width = 110;
  const height = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Build smooth bezier curve path
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return { x, y };
  });

  // Calculate SVG curve with smoothing
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  // Area path closing down to bottom
  const areaD = `${d} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="w-[110px] h-[36px] overflow-hidden shrink-0">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#${gradientId})`} />
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function StatsOverview({ projects, lang }: StatsOverviewProps) {
  const isHe = lang === "he";
  const t = translations[lang].stats;

  const total = projects.length;
  const liveCount = projects.filter((p) => p.status === "live").length;
  const totalValuation = projects.reduce(
    (acc, p) => acc + (p.estimatedValue || 0),
    0
  );
  const totalCollected = projects.reduce(
    (acc, p) => acc + (p.paidAmount || 0),
    0
  );
  const totalPending = Math.max(0, totalValuation - totalCollected);
  const collectionPercentage = totalValuation > 0 ? Math.round((totalCollected / totalValuation) * 100) : 0;

  const dbCount = new Set(
    projects
      .filter((p) => p.databaseType && p.databaseType !== "None")
      .map((p) => p.databaseType)
  ).size;
  const clientsCount = new Set(
    projects.map((p) => p.ownerName.trim()).filter(Boolean)
  ).size;

  const statCards = [
    {
      label: t.totalProjects,
      value: total,
      trend: isHe ? "+100% מאורגן" : "+100% cataloged",
      trendPositive: true,
      icon: Layers,
      colorHex: "#3B82F6",
      iconClasses: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      gradientId: "spark-blue",
      sparkData: [4, 6, 8, 9, 11, 13, 14],
    },
    {
      label: t.liveProjects,
      value: liveCount,
      trend: `${Math.round((liveCount / (total || 1)) * 100)}% באוויר`,
      trendPositive: true,
      icon: Globe2,
      colorHex: "#10B981",
      iconClasses: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      gradientId: "spark-green",
      sparkData: [2, 3, 5, 5, 7, 8, 8],
    },
    {
      label: t.totalValuation,
      value: `$${totalValuation.toLocaleString()}`,
      trend: isHe ? "שווי מצטבר" : "Portfolio Worth",
      trendPositive: true,
      icon: TrendingUp,
      colorHex: "#059669",
      iconClasses: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      gradientId: "spark-val",
      sparkData: [50, 85, 120, 160, 210, 250, 285],
    },
    {
      label: t.totalCollected || "שולם בפועל",
      value: `$${totalCollected.toLocaleString()}`,
      trend: `${collectionPercentage}% נגבה`,
      trendPositive: true,
      icon: ShieldCheck,
      colorHex: "#0D9488",
      iconClasses: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
      gradientId: "spark-paid",
      sparkData: [20, 45, 75, 110, 140, 170, 185],
    },
    {
      label: t.totalPending || "יתרה לגבייה",
      value: `$${totalPending.toLocaleString()}`,
      trend: `${100 - collectionPercentage}% נותר`,
      trendPositive: false,
      icon: ArrowUpRight,
      colorHex: "#F59E0B",
      iconClasses: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      gradientId: "spark-pend",
      sparkData: [30, 40, 45, 50, 70, 80, 100],
    },
    {
      label: t.clientsCount,
      value: clientsCount,
      trend: isHe ? "קול יעקב, שקל הקודש" : "Active Orgs",
      trendPositive: true,
      icon: Users,
      colorHex: "#8B5CF6",
      iconClasses: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      gradientId: "spark-violet",
      sparkData: [2, 3, 4, 6, 7, 8, 9],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="group relative flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:border-white/20 transition-all duration-200"
          >
            {/* Top Row: Vector Icon in pastel container + Trend Pill Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-2xl ${card.iconClasses}`}>
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>

              {/* Trend Pill Badge */}
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                <span>{card.trend}</span>
              </div>
            </div>

            {/* Bottom Row: Metric value + Label + Mini Sparkline */}
            <div className="flex items-end justify-between gap-2 mt-2">
              <div>
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white block">
                  {card.value}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 block truncate">
                  {card.label}
                </span>
              </div>

              {/* Mini Sparkline Chart */}
              <MiniSparkline
                color={card.colorHex}
                gradientId={card.gradientId}
                data={card.sparkData}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
