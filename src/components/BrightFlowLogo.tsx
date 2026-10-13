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
        {/* Deep Obsidian-Indigo Luxury Background */}
        <linearGradient id={`bf-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="45%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#090D16" />
        </linearGradient>

        {/* Ambient Inner Aurora Glow */}
        <radialGradient id={`bf-aurora-${uid}`} cx="75%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.38" />
          <stop offset="45%" stopColor="#6366F1" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>

        {/* Luminous Glass Border Gradient */}
        <linearGradient id={`bf-border-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#818CF8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.65" />
        </linearGradient>

        {/* Top Aerodynamic Ribbon — Electric Cyan to Indigo */}
        <linearGradient id={`bf-top-${uid}`} x1="15%" y1="15%" x2="95%" y2="55%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        {/* Middle Kinetic Stream — Cyan to Violet */}
        <linearGradient id={`bf-mid-${uid}`} x1="15%" y1="45%" x2="95%" y2="75%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Lower Flow Wave — Indigo to Bright Cyan */}
        <linearGradient id={`bf-bot-${uid}`} x1="20%" y1="60%" x2="90%" y2="95%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="55%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#ECFEFF" />
        </linearGradient>

        {/* Left Pillar Gradient */}
        <linearGradient id={`bf-pillar-${uid}`} x1="0%" y1="15%" x2="0%" y2="90%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        {/* Soft Neon Drop Glow */}
        <filter
          id={`bf-glow-${uid}`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#06B6D4" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer Squircle Base */}
      <rect
        x="4"
        y="4"
        width="112"
        height="112"
        rx="30"
        fill={`url(#bf-bg-${uid})`}
      />

      {/* Ambient Aurora Mesh Layer */}
      <rect
        x="4"
        y="4"
        width="112"
        height="112"
        rx="30"
        fill={`url(#bf-aurora-${uid})`}
      />

      {/* Subtle Top Glass Specular Highlight */}
      <path
        d="M 34 6 H 86 C 101 6 112 17 112 32 V 42 C 92 26 62 20 8 34 V 32 C 8 17 19 6 34 6 Z"
        fill="#FFFFFF"
        fillOpacity="0.04"
      />

      {/* Glowing Inner Rim */}
      <rect
        x="5"
        y="5"
        width="110"
        height="110"
        rx="29"
        stroke={`url(#bf-border-${uid})`}
        strokeWidth="2"
      />

      {/* === 3D FLUID GEOMETRIC "BF" + AUTOMATION STREAM === */}
      <g filter={`url(#bf-glow-${uid})`}>
        {/* Vertical Structural Spine */}
        <rect
          x="26"
          y="24"
          width="12"
          height="72"
          rx="6"
          fill={`url(#bf-pillar-${uid})`}
        />

        {/* Top Wing / Upper B-F Loop (Sweeps right and curves into center) */}
        <path
          d="M 32 30 H 68 C 81 30, 89 37, 89 46 C 89 55, 81 60, 66 60 H 46"
          stroke={`url(#bf-top-${uid})`}
          strokeWidth="11.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lower B Loop & Forward Flow Wave */}
        <path
          d="M 44 60 H 71 C 85 60, 93 67, 93 77 C 93 87, 84 90, 66 90 H 32"
          stroke={`url(#bf-bot-${uid})`}
          strokeWidth="11.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic Mid-Stream Connector (Creates the interlocking 3D ribbon effect) */}
        <path
          d="M 26 60 H 74"
          stroke={`url(#bf-mid-${uid})`}
          strokeWidth="11.5"
          strokeLinecap="round"
        />

        {/* Radiant AI / Automation Spark Star at Top-Right Apex */}
        <path
          d="M 94 20 L 96.2 26.8 L 103 29 L 96.2 31.2 L 94 38 L 91.8 31.2 L 85 29 L 91.8 26.8 Z"
          fill="#67E8F9"
        />
        <circle cx="94" cy="29" r="2.2" fill="#FFFFFF" />

        {/* Luminous Node Dot on Spine */}
        <circle cx="32" cy="60" r="3.5" fill="#FFFFFF" />
      </g>
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
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="50%" stop-color="#1E1B4B" />
      <stop offset="100%" stop-color="#090D16" />
    </linearGradient>
    <linearGradient id="ebf-top" x1="15%" y1="15%" x2="95%" y2="55%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#67E8F9" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
    <linearGradient id="ebf-mid" x1="15%" y1="45%" x2="95%" y2="75%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="50%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#A855F7" />
    </linearGradient>
    <linearGradient id="ebf-bot" x1="20%" y1="60%" x2="90%" y2="95%">
      <stop offset="0%" stop-color="#818CF8" />
      <stop offset="55%" stop-color="#22D3EE" />
      <stop offset="100%" stop-color="#ECFEFF" />
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="112" height="112" rx="30" fill="url(#ebf-bg)" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.4" />
  <rect x="26" y="24" width="12" height="72" rx="6" fill="#FFFFFF" />
  <path d="M 32 30 H 68 C 81 30, 89 37, 89 46 C 89 55, 81 60, 66 60 H 46" stroke="url(#ebf-top)" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 44 60 H 71 C 85 60, 93 67, 93 77 C 93 87, 84 90, 66 90 H 32" stroke="url(#ebf-bot)" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 26 60 H 74" stroke="url(#ebf-mid)" stroke-width="11.5" stroke-linecap="round" />
  <path d="M 94 20 L 96.2 26.8 L 103 29 L 96.2 31.2 L 94 38 L 91.8 31.2 L 85 29 L 91.8 26.8 Z" fill="#67E8F9" />
  <circle cx="32" cy="60" r="3.5" fill="#FFFFFF" />
</svg>`;
