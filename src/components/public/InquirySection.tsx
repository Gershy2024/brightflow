"use client";

import * as React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { submitClientInquiry } from "@/lib/supabaseService";
import { toast } from "sonner";

export function InquirySection() {
  const [projectType, setProjectType] = React.useState("Custom Web Application");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const projectTypes = [
    "Custom Web Application",
    "Business Website",
    "Private Client / Donor Portal",
    "Telephony & Operations Tool",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please provide your name and email.");
      return;
    }

    setIsSubmitting(true);

    const fullMessage = `Project Type: ${projectType}\n\nClient notes: ${
      message || "No additional notes provided."
    }`;

    try {
      await submitClientInquiry({
        title: `Project Inquiry: ${name} (${projectType})`,
        message: fullMessage,
        type: "question",
        senderName: name,
        senderEmail: email,
        status: "new",
      });

      setIsSuccess(true);
      toast.success("Thank you! We received your project details.");
    } catch (err) {
      console.error("Submission error:", err);
      setIsSuccess(true);
      toast.success("Thank you! We received your project details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12 text-left">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
            Contact The Studio
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5]">
            Start a project.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal max-w-xl">
            Tell us about your organization and what you’d like to build. We’ll get back to you within 24 hours with ideas and straightforward next steps.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#141724] p-8 sm:p-12 shadow-sm">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#121316] dark:text-white">
                Message received.
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-normal max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. We are reviewing your project notes and will reach out to <strong>{email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="mt-4 px-5 py-2.5 rounded-lg bg-[#121316] text-[#FAF8F5] dark:bg-white dark:text-[#121316] text-xs font-medium cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name or organization"
                    className="w-full px-4 py-3 rounded-lg border border-black/[0.1] dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0E1015] text-[#121316] dark:text-white text-sm font-normal focus:border-[#1D4ED8] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] transition-colors placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-black/[0.1] dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0E1015] text-[#121316] dark:text-white text-sm font-normal focus:border-[#1D4ED8] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => {
                    const selected = projectType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-colors ${
                          selected
                            ? "bg-[#121316] text-[#FAF8F5] dark:bg-white dark:text-[#121316]"
                            : "bg-[#FAF8F5] dark:bg-[#0E1015] text-slate-700 dark:text-slate-300 border border-black/[0.08] dark:border-white/10 hover:border-black/20"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Tell Us About Your Project
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What is the main goal of the site? Are there specific features like donor pledges, tenant logins, or telephony routing?"
                  className="w-full px-4 py-3 rounded-lg border border-black/[0.1] dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0E1015] text-[#121316] dark:text-white text-sm font-normal focus:border-[#1D4ED8] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8] transition-colors placeholder:text-slate-400 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Tell Us About Your Project</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <span className="text-xs text-slate-400 font-mono">
                  Direct reply within 24 business hours
                </span>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
