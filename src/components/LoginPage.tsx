"use client";

import * as React from "react";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/authContext";
import { Language } from "@/lib/types";

interface LoginPageProps {
  lang?: Language;
  onSuccess?: () => void;
}

export function LoginPage({ lang = "he", onSuccess }: LoginPageProps) {
  const isHe = lang === "he";
  const { login } = useAuth();
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const ok = login(password, rememberMe);
      if (ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onSuccess?.();
        }, 400);
      } else {
        setError(isHe ? "סיסמה שגויה. אנא נסה שוב." : "Invalid password. Please try again.");
        setIsSubmitting(false);
      }
    }, 300);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-[#0f111a] dark:via-[#13151f] dark:to-[#1a1d2e] relative overflow-hidden"
      dir={isHe ? "rtl" : "ltr"}
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 end-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md bg-white/95 dark:bg-[#1a1d2e]/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-8 sm:p-10 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <div className="p-3 rounded-2xl bg-white dark:bg-white/95 shadow-sm border border-slate-200/80 dark:border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brightflow-logo.png"
              alt="TheBrightFlow"
              className="h-10 w-auto object-contain"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <ShieldCheck className="h-3 w-3" />
              <span>{isHe ? "גישה מאובטחת" : "Secure Access"}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isHe ? "כניסה ל-BrightFlow" : "Login to BrightFlow"}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isHe
                ? "מרכז שליטה, פרויקטים וסנכרון ענן"
                : "Central Control Hub, Projects & Cloud"}
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in-0">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              {isHe ? "סיסמת מנהל ראשית (Master Password)" : "Master Admin Password"}
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoFocus
                className="h-11 px-4 pe-10 text-sm rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 font-mono tracking-wider focus:bg-white dark:focus:bg-slate-900 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me toggle */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span>{isHe ? "זכור אותי במכשיר זה" : "Remember me"}</span>
            </label>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold cursor-default">
              גרשי • BrightFlow
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-white" />
                <span>{isHe ? "כניסה מאושרת..." : "Success..."}</span>
              </>
            ) : isSubmitting ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isHe ? "התחבר למערכת" : "Sign In"}</span>
                {isHe ? (
                  <ArrowLeft className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </>
            )}
          </Button>
        </form>

        {/* Footer Brand Signature */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 text-center text-[11px] text-slate-400">
          <p className="font-semibold text-slate-600 dark:text-slate-400">
            Powered by BrightFlow
          </p>
          <p className="mt-0.5 text-[10px]">Custom Software • Smart Automation</p>
        </div>
      </div>
    </div>
  );
}
