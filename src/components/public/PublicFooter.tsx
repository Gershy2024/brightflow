"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrightFlowLogoIcon } from "@/components/BrightFlowLogo";
import { ShieldCheck } from "lucide-react";

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
    <footer className="bg-[#0B0E14] text-slate-400 text-xs py-14 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <BrightFlowLogoIcon size={32} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-tight">
                  BrightFlow
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-900/60">
                  Studio
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Bespoke websites & web applications built around your business.
              </p>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#process" className="hover:text-white transition-colors">
              Process
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} BrightFlow Studio. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleShieldClick}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer select-none"
              title="BrightFlow Security Status"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>TLS 1.3 • RLS Security</span>
            </button>
            <span>•</span>
            <span>מופעל ע״י BrightFlow</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
