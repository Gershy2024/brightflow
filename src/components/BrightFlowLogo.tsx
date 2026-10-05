"use client";

import React from "react";

interface BrightFlowLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  tagline?: boolean;
}

export function BrightFlowLogoIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bf-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        <linearGradient id="bf-ribbon-grad" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>

        <linearGradient id="bf-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>

        <filter id="bf-shadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1E3A8A" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Rounded squircle background */}
      <rect
        width="100"
        height="100"
        rx="24"
        fill="url(#bf-bg-grad)"
        filter="url(#bf-shadow)"
      />

      {/* Futuristic fluid "B" & flow waves */}
      {/* Top loop wave */}
      <path
        d="M 28 26 H 55 C 67 26, 75 32, 75 42 C 75 51, 67 55, 55 55 H 28 Z"
        fill="none"
        stroke="url(#bf-ribbon-grad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom loop wave with dynamic forward flow */}
      <path
        d="M 28 51 H 58 C 72 51, 80 58, 80 69 C 80 80, 70 86, 56 86 H 28 Z"
        fill="none"
        stroke="url(#bf-ribbon-grad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central spine flow */}
      <path
        d="M 33 24 V 88"
        stroke="#FFFFFF"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Luminous dynamic spark dot */}
      <circle cx="56" cy="51" r="5" fill="#38BDF8" />
      <circle cx="56" cy="51" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

export function BrightFlowLogo({
  size = 40,
  className = "",
  showText = true,
  tagline = false,
}: BrightFlowLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <BrightFlowLogoIcon size={size} />
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Bright
            </span>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent font-sans">
              Flow
            </span>
          </div>
          {tagline && (
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">
              Custom Software • Smart Automation
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Pure SVG String for Embedding into HTML emails & Printable documents
export const BRIGHTFLOW_SVG_STRING = `<svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ebf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="50%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="24" fill="url(#ebf-bg)" />
  <path d="M 28 26 H 55 C 67 26, 75 32, 75 42 C 75 51, 67 55, 55 55 H 28 Z" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 28 51 H 58 C 72 51, 80 58, 80 69 C 80 80, 70 86, 56 86 H 28 Z" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 33 24 V 88" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" />
  <circle cx="56" cy="51" r="4.5" fill="#38BDF8" />
</svg>`;
