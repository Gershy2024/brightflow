"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrightFlowLogoIcon } from "@/components/BrightFlowLogo";
import { ShieldCheck, ArrowRight, Lock, CheckCircle2, Server, KeyRound } from "lucide-react";

export function PublicFooter() {
  const router = useRouter();
  const [shieldClicks, setShieldClicks] = React.useState(0);

  // Hidden admin shortcut via footer shield: triple click
  const handleShieldClick = () => {
    const next = shieldClicks + 1;
    if (next >= 3) {
      setShieldClicks(0);
      router.push("/admin");
    } else {
      setShieldClicks(next);
      setTimeout(() => setShieldClicks(0), 1200);
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-[#07090F] text-slate-400 text-xs py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <BrightFlowLogoIcon size={36} />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  The Bright Flow
                </span>
                <span className="text-[10px] uppercase font-semibold text-cyan-400 tracking-wider">
                  Automation Infrastructure
                </span>
              </div>
            </Link>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              Engineering bespoke automation pipelines, custom CRM vaults, 1-click quote-to-cash invoicing, and intelligent telephony systems that remove operational friction for growing businesses.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-[11px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Cloud Systems Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview & Live Sandbox
                </a>
              </li>
              <li>
                <a href="#speed-race" className="hover:text-white transition-colors">
                  Speed Race Test
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-white transition-colors">
                  Manual vs. Automated
                </a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-white transition-colors">
                  Live Pipeline Simulator
                </a>
              </li>
              <li>
                <a href="#telephony-demo" className="hover:text-white transition-colors">
                  Voice & IVR Simulator
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  ROI & Time-Saved Calculator
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-white transition-colors">
                  Automation Quiz
                </a>
              </li>
            </ul>
          </div>

          {/* Enterprise Reliability & Data Security */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Security & Architecture
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every system is engineered on zero-trust architectures with Row Level Security (RLS), real-time encrypted database backups, and dedicated cloud instances.
            </p>

            <div className="space-y-2 pt-1 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Isolated Client Data Vaults</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>SOC-2 & GDPR Compatible Cloud Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Zero-Downtime Microservice Pipelines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            {/* Secret Easter egg: triple clicking this shield navigates to /admin */}
            <button
              type="button"
              onClick={handleShieldClick}
              className="text-cyan-400/80 hover:text-cyan-400 transition-colors p-0.5 cursor-default focus:outline-none"
              title="BrightFlow Security"
            >
              <ShieldCheck className="h-4 w-4" />
            </button>
            <span>© {new Date().getFullYear()} The Bright Flow. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-slate-500">v2.4.0 • Release 2026</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-medium">Powered by BrightFlow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
