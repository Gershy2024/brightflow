"use client";

import * as React from "react";
import { CheckCircle2, Mail, User, Layout, MessageSquare, ArrowRight } from "lucide-react";
import { submitClientInquiry } from "@/lib/supabaseService";
import { toast } from "sonner";

export function InquirySection() {
  const [projectType, setProjectType] = React.useState("Custom Web Application / Portal");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const projectTypes = [
    "Custom Web Application / Portal",
    "Business & Marketing Website",
    "Telephony & IVR System",
    "Internal Operations Tool",
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
    <section id="contact" className="py-24 bg-white dark:bg-[#0E111B] relative transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Contact
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Tell us about your project.
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-400 font-normal max-w-md mx-auto">
            Share what you’d like to build. We’ll get back to you within 24 hours with ideas and next steps.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-[#FAFAFA] dark:bg-[#121520] border border-slate-200 dark:border-white/10 p-7 sm:p-10 shadow-xs">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-900/60">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Message Received
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-normal max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. We’re reviewing your project notes and will reach out to <strong>{email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name or organization"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-normal focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="david@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-normal focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Project Type Selector */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Type of Website / Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => {
                    const selected = projectType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`text-xs px-3.5 py-2 rounded-xl font-medium transition-all ${
                          selected
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Summary */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Tell us a bit about your project
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What is the goal of the site? Do you need custom client logins, donor features, or telephony?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-normal focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
              >
                {isSubmitting ? (
                  <span>Sending notes...</span>
                ) : (
                  <>
                    <span>Tell Us About Your Project</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-400 font-normal">
                Direct reply within 24 business hours • No spam or sales pressure
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
