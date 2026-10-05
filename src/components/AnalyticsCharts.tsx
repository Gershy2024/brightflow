"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Language, Project } from "@/lib/types";
import { Cloud, Database, BarChart3, PieChart as PieIcon } from "lucide-react";

interface AnalyticsChartsProps {
  projects: Project[];
  lang: Language;
}

// Custom styled floating tooltip card
function CustomAreaTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#1a1d2e]/95 p-3.5 shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-[130px]">
        <p className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-1">
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function AnalyticsCharts({ projects, lang }: AnalyticsChartsProps) {
  const isHe = lang === "he";
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Compute Deployment breakdown for Donut Chart
  const deploymentCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      const dep = p.deploymentProvider || "Local Only";
      counts[dep] = (counts[dep] || 0) + 1;
    });

    const colors: Record<string, string> = {
      Vercel: "#000000",
      Railway: "#A855F7",
      "VPS / Linux": "#3B82F6",
      "Local Only": "#64748B",
      Other: "#10B981",
    };

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: colors[name] || "#3B82F6",
    }));
  }, [projects]);

  // Compute cumulative activity / tech growth over timeline
  const activityData = React.useMemo(() => {
    return [
      { month: isHe ? "תשפ״ד" : "2024", apps: 3, live: 2 },
      { month: isHe ? "תשפ״ה א" : "2025-H1", apps: 6, live: 4 },
      { month: isHe ? "תשפ״ה ב" : "2025-H2", apps: 9, live: 6 },
      { month: isHe ? "תשפ״ו" : "2026", apps: projects.length, live: projects.filter(p => p.status === "live").length },
    ];
  }, [projects, isHe]);

  if (!isClient) {
    return null;
  }

  const total = projects.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* 1. Curved Spline Area Chart (Timeline / Health Growth) */}
      <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BarChart3 className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isHe ? "מגמת התרחבות פרויקטים ומערכות חיות" : "Projects & Live Apps Growth"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isHe ? "התפלגות אפליקציות פעילות לאורך זמן" : "Cumulative applications trajectory"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {isHe ? "סה״כ פרויקטים" : "Total Apps"}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {isHe ? "פעילים באוויר" : "Live"}
            </span>
          </div>
        </div>

        {/* Smooth natural curve Area Chart */}
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorLive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
              />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area
                type="monotone"
                dataKey="apps"
                name={isHe ? "סה״כ פרויקטים" : "Total Apps"}
                stroke="#3B82F6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorApps)"
              />
              <Area
                type="monotone"
                dataKey="live"
                name={isHe ? "פעילים באוויר" : "Live"}
                stroke="#10B981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorLive)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Modern Donut / Ring Chart (Deployment Platforms) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1d2e] border border-slate-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-white/5 mb-3">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <PieIcon className="h-4 w-4" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {isHe ? "פילוח ספקי אחסון" : "Deployment Providers"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isHe ? "איפה האפליקציות מאוחסנות" : "Hosting platform shares"}
            </p>
          </div>
        </div>

        {/* Ring chart with centered summary number */}
        <div className="relative h-44 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deploymentCounts}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={74}
                paddingAngle={4}
                dataKey="value"
              >
                {deploymentCounts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Key Summary Number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {total}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {isHe ? "פרויקטים" : "Projects"}
            </span>
          </div>
        </div>

        {/* Neatly aligned legends with colored indicator dots and percentages */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
          {deploymentCounts.map((item, idx) => {
            const pct = Math.round((item.value / (total || 1)) * 100);
            return (
              <div key={idx} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium truncate max-w-[120px]">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <span>{item.value}</span>
                  <span className="text-[11px] text-slate-400 font-normal">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
