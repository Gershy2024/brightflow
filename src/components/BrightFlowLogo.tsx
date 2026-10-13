"use client";

import React from "react";

interface BrightFlowLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  tagline?: boolean;
}

export function BrightFlowLogoIcon({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const rawId = React.useId();
  const uid = rawId.replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Deep Obsidian-Indigo Luxury Squircle Background */}
        <linearGradient id={`bf-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#090D1A" />
          <stop offset="50%" stopColor="#131B38" />
          <stop offset="100%" stopColor="#070A14" />
        </linearGradient>

        {/* Ambient Inner Aurora Mesh */}
        <radialGradient id={`bf-aurora-${uid}`} cx="80%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#6366F1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#090D1A" stopOpacity="0" />
        </radialGradient>

        {/* Luminous Glass Rim */}
        <linearGradient id={`bf-border-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#818CF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.6" />
        </linearGradient>

        {/* Upper Continuous Ribbon of the "B" — Pure White -> Electric Cyan -> Sky */}
        <linearGradient id={`bf-upper-${uid}`} x1="28" y1="22" x2="90" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* Lower Continuous Ribbon of the "B" — Electric Cyan -> Indigo -> Violet */}
        <linearGradient id={`bf-lower-${uid}`} x1="30" y1="50" x2="96" y2="98" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Soft 3D Layer Shadow */}
        <filter
          id={`bf-shadow-${uid}`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#020617" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* 1. Squircle Base */}
      <rect x="4" y="4" width="112" height="112" rx="30" fill={`url(#bf-bg-${uid})`} />
      <rect x="4" y="4" width="112" height="112" rx="30" fill={`url(#bf-aurora-${uid})`} />

      {/* Subtle Top Specular Reflection */}
      <path
        d="M 34 6 H 86 C 101 6 112 17 112 32 V 40 C 90 24 58 18 8 32 C 8 17 19 6 34 6 Z"
        fill="#FFFFFF"
        fillOpacity="0.045"
      />

      {/* Glowing Inner Border */}
      <rect
        x="5"
        y="5"
        width="110"
        height="110"
        rx="29"
        stroke={`url(#bf-border-${uid})`}
        strokeWidth="2"
      />

      {/* === PRECISION 2-RIBBON INTERLOCKING GEOMETRIC "B" === */}
      <g transform="skewX(-5) translate(4, 0)" filter={`url(#bf-shadow-${uid})`}>
        {/* Ribbon 2 (Lower Loop + Lower Spine with diagonal negative-space speed cut) */}
        <path
          d="M 48 50 H 67 C 84.5 50 95 58.8 95 74 C 95 89.2 84.5 98 67 98 H 36 C 32.5 98 30 95.5 30 92 V 67 L 44 59 V 86 H 66 C 75.2 86 81 81.5 81 74 C 81 66.5 75.2 62 66 62 H 48 V 50 Z"
          fill={`url(#bf-lower-${uid})`}
        />

        {/* Ribbon 1 (Upper Spine + Upper Loop wrapping cleanly into the center waist) */}
        <path
          d="M 36 22 H 64 C 80 22 90 29.8 90 42 C 90 54.2 80 62 64 62 H 48 V 50 H 63 C 71.2 50 76 46.8 76 42 C 76 37.2 71.2 34 63 34 H 44 V 53.5 L 30 61.5 V 28 C 30 24.5 32.5 22 36 22 Z"
          fill={`url(#bf-upper-${uid})`}
        />
      </g>

      {/* Luminous AI Spark Node at Top-Right */}
      <path
        d="M 97 19 L 98.8 24.2 L 104 26 L 98.8 27.8 L 97 33 L 95.2 27.8 L 90 26 L 95.2 24.2 Z"
        fill="#67E8F9"
      />
      <circle cx="97" cy="26" r="1.8" fill="#FFFFFF" />
    </svg>
  );
}

export function BrightFlowLogo({
  size = 42,
  className = "",
  showText = true,
  tagline = false,
}: BrightFlowLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3.5 select-none group ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        <BrightFlowLogoIcon
          size={size}
          className="transition-all duration-300 group-hover:scale-105 group-hover:rotate-[-2deg]"
        />
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-cyan-500/25 via-indigo-500/20 to-purple-500/25 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1 leading-none">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mr-0.5">
              The
            </span>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Bright
            </span>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 dark:from-cyan-300 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent font-sans">
              Flow
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] ml-0.5" />
          </div>
          {tagline && (
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-[0.18em] uppercase mt-1">
              Intelligent Automation Systems
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Pure SVG String for Embedding into HTML emails & Printable documents
export const BRIGHTFLOW_SVG_STRING = `<svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ebf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090D1A" />
      <stop offset="50%" stop-color="#131B38" />
      <stop offset="100%" stop-color="#070A14" />
    </linearGradient>
    <linearGradient id="ebf-upper" x1="28" y1="22" x2="90" y2="62" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="45%" stop-color="#67E8F9" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <linearGradient id="ebf-lower" x1="30" y1="50" x2="96" y2="98" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="45%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#A855F7" />
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="112" height="112" rx="30" fill="url(#ebf-bg)" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.45" />
  <g transform="skewX(-5) translate(4, 0)">
    <path d="M 48 50 H 67 C 84.5 50 95 58.8 95 74 C 95 89.2 84.5 98 67 98 H 36 C 32.5 98 30 95.5 30 92 V 67 L 44 59 V 86 H 66 C 75.2 86 81 81.5 81 74 C 81 66.5 75.2 62 66 62 H 48 V 50 Z" fill="url(#ebf-lower)" />
    <path d="M 36 22 H 64 C 80 22 90 29.8 90 42 C 90 54.2 80 62 64 62 H 48 V 50 H 63 C 71.2 50 76 46.8 76 42 C 76 37.2 71.2 34 63 34 H 44 V 53.5 L 30 61.5 V 28 C 30 24.5 32.5 22 36 22 Z" fill="url(#ebf-upper)" />
  </g>
  <path d="M 97 19 L 98.8 24.2 L 104 26 L 98.8 27.8 L 97 33 L 95.2 27.8 L 90 26 L 95.2 24.2 Z" fill="#67E8F9" />
</svg>`;
