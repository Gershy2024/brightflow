"use client";

import * as React from "react";
import {
  GitBranch,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  PhoneCall,
  Coins,
  ShieldCheck,
  Package,
  Layers,
  ArrowRight,
  Terminal,
} from "lucide-react";

interface PipelineStep {
  id: string;
  name: string;
  actor: string;
  detail: string;
  payload: string;
}

interface WorkflowScenario {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  badgeColor: string;
  steps: PipelineStep[];
}

export function PipelineSimulatorSection() {
  const scenarios: WorkflowScenario[] = [
    {
      id: "lead-to-cash",
      name: "Lead-to-Cash Engine",
      subtitle: "Turn cold inquiries into paid invoices in under 1 minute",
      icon: Coins,
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      steps: [
        {
          id: "step-1",
          name: "Inquiry Ingestion",
          actor: "Public Webhook",
          detail: "Captures lead info from web form & validates phone/email",
          payload: '{ "client": "Apex Corp", "budget": "$4,500", "source": "Landing Page" }',
        },
        {
          id: "step-2",
          name: "AI Enrichment",
          actor: "BrightFlow Engine",
          detail: "Categorizes project scope, assigns priority & detects intent",
          payload: '{ "priority": "high", "scope": "CRM + Invoicing", "score": 98 }',
        },
        {
          id: "step-3",
          name: "CRM Vault Sync",
          actor: "Supabase DB",
          detail: "Creates client profile, project card, and activity audit trail",
          payload: '{ "crm_id": "cli_984", "status": "active", "sync": "realtime" }',
        },
        {
          id: "step-4",
          name: "Instant Invoicing",
          actor: "Financial Service",
          detail: "Generates branded tax invoice PDF with Stripe checkout link",
          payload: '{ "inv_no": "INV-2026-881", "amount": 4500, "status": "issued" }',
        },
        {
          id: "step-5",
          name: "WhatsApp Dispatch",
          actor: "Omnichannel API",
          detail: "Sends mobile payment link & onboarding brief to client",
          payload: '{ "channel": "whatsapp", "status": "delivered", "read": true }',
        },
      ],
    },
    {
      id: "telephony-ivr",
      name: "Smart Telephony & Screening",
      subtitle: "Screen callers, block spam, and transcribe client voicemails",
      icon: PhoneCall,
      badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      steps: [
        {
          id: "step-1",
          name: "Call Ingestion",
          actor: "SignalWire Trunk",
          detail: "Inbound call detected on dedicated business phone number",
          payload: '{ "caller_id": "+1 (929) 555-0192", "time": "14:22:10" }',
        },
        {
          id: "step-2",
          name: "Interactive IVR",
          actor: "Edge Neural TTS",
          detail: "Speaks custom crystal-clear menu greeting at 0 API cost",
          payload: '{ "engine": "edge-tts", "voice": "en-US-Neural", "latency": "12ms" }',
        },
        {
          id: "step-3",
          name: "Call Screening",
          actor: "Anti-Spam Filter",
          detail: "Requires caller to press 1 to connect to Gershy; drops robocalls",
          payload: '{ "dtmf_pressed": "1", "verified_human": true }',
        },
        {
          id: "step-4",
          name: "Audio Transcription",
          actor: "AI Speech-to-Text",
          detail: "Transcribes voicemail audio to clean searchable text",
          payload: '{ "transcript": "Hi Gershy, ready to begin the automation project." }',
        },
        {
          id: "step-5",
          name: "Instant Alert",
          actor: "Mobile Dispatch",
          detail: "Pushes audio playback + transcript directly to Telegram & CRM",
          payload: '{ "destination": "telegram_admin", "pushed": true }',
        },
      ],
    },
    {
      id: "client-vault",
      name: "Client Onboarding Vault",
      subtitle: "Instant project workspace provisioning with zero manual setup",
      icon: Layers,
      badgeColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      steps: [
        {
          id: "step-1",
          name: "Proposal Accepted",
          actor: "Client Signature",
          detail: "Customer approves quotation and confirms project kickoff",
          payload: '{ "quote_id": "QUO-410", "signed_by": "David K.", "accepted": true }',
        },
        {
          id: "step-2",
          name: "Workspace Created",
          actor: "BrightFlow Vault",
          detail: "Provisions isolated client portal drawer, order IDs, and deliverables",
          payload: '{ "workspace": "proj_davidk_vault", "status": "active" }',
        },
        {
          id: "step-3",
          name: "Kanban Provisioning",
          actor: "Task Pipeline",
          detail: "Populates automated tasks and timeline milestones on dashboard",
          payload: '{ "tasks_created": 5, "due_date": "2026-10-26" }',
        },
        {
          id: "step-4",
          name: "Welcome Kit Sent",
          actor: "Mailer Engine",
          detail: "Sends client portal access instructions, schedule link, and guides",
          payload: '{ "email": "david@client.com", "template": "onboarding_v2" }',
        },
        {
          id: "step-5",
          name: "Team Synchronized",
          actor: "Internal Hook",
          detail: "Notifies administrators with one-click access to the new project",
          payload: '{ "alert": "New project active", "owner": "Gershy" }',
        },
      ],
    },
  ];

  const [activeScenarioId, setActiveScenarioId] = React.useState<string>("lead-to-cash");
  const [activeNodeIndex, setActiveNodeIndex] = React.useState<number>(0);
  const [isSimulating, setIsSimulating] = React.useState<boolean>(false);
  const [logs, setLogs] = React.useState<string[]>([]);

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveNodeIndex(0);
    setLogs([`[0.00s] Initializing pipeline "${activeScenario.name}"...`]);

    activeScenario.steps.forEach((st, idx) => {
      setTimeout(() => {
        setActiveNodeIndex(idx);
        setLogs((prev) => [
          ...prev,
          `[+${(idx * 0.18 + 0.08).toFixed(2)}s] ✔ ${st.name} executed by ${st.actor}`,
        ]);
      }, (idx + 1) * 320);
    });

    setTimeout(() => {
      setIsSimulating(false);
      setLogs((prev) => [
        ...prev,
        `[SUCCESS] Full pipeline completed in ${(activeScenario.steps.length * 0.32).toFixed(2)}s with 0 human errors.`,
      ]);
    }, (activeScenario.steps.length + 1) * 320);
  };

  return (
    <section id="pipeline" className="py-24 bg-white dark:bg-[#0B0E17] relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/80 dark:border-cyan-800/40 text-cyan-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <GitBranch className="h-3.5 w-3.5" />
            <span>Interactive Visual Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Watch Real Pipelines{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Execute In Real Time
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300">
            Select a business workflow below and trigger the live pipeline to see how data flows effortlessly through our automated engines.
          </p>
        </div>

        {/* Workflow Scenario Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isSelected = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setActiveScenarioId(sc.id);
                  setActiveNodeIndex(0);
                  setLogs([]);
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold transition-all border ${
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg shadow-indigo-500/10 scale-105"
                    : "bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{sc.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Pipeline Simulator Canvas */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-[#141724] p-6 sm:p-8 space-y-8 shadow-xl">
          {/* Header toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-5">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>{activeScenario.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-semibold ${activeScenario.badgeColor}`}>
                  Active Scenario
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {activeScenario.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Streaming Pulses...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Trigger Pipeline Simulation</span>
                </>
              )}
            </button>
          </div>

          {/* Node Pipeline Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative">
            {activeScenario.steps.map((step, idx) => {
              const isCurrent = activeNodeIndex === idx;
              const isPast = activeNodeIndex > idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveNodeIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative flex flex-col justify-between ${
                    isCurrent
                      ? "bg-white dark:bg-[#1a1d2e] border-indigo-500 dark:border-cyan-400 shadow-lg shadow-indigo-500/10 scale-105 ring-2 ring-indigo-500/20"
                      : isPast
                      ? "bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] border-emerald-500/40"
                      : "bg-white/60 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/5 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Step order indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`h-6 w-6 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold ${
                        isCurrent
                          ? "bg-indigo-600 text-white"
                          : isPast
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {isPast ? "✔" : `0${idx + 1}`}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[80px]">
                      {step.actor}
                    </span>
                  </div>

                  {/* Node details */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {step.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {/* Pulsing glow line */}
                  {isCurrent && (
                    <div className="mt-3 pt-2 border-t border-indigo-100 dark:border-white/5 flex items-center gap-1.5 text-[10px] text-indigo-600 dark:text-cyan-400 font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>Processing Payload</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Inspector / Terminal Output */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-200/80 dark:border-white/10">
            {/* Left: Active Node Payload Inspector */}
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Payload Inspector (Node 0{activeNodeIndex + 1})</span>
                </span>
                <span className="text-[10px] text-slate-400">JSON • Format</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 text-cyan-300 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                <pre>{activeScenario.steps[activeNodeIndex]?.payload}</pre>
              </div>
            </div>

            {/* Right: Live Execution Logs */}
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Event Stream & Audit Trail</span>
                </span>
                <span className="text-[10px] text-emerald-500 font-semibold">Live Socket</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-300 font-mono text-xs h-[104px] overflow-y-auto space-y-1 shadow-inner border border-slate-800">
                {logs.length === 0 ? (
                  <span className="text-slate-500 italic">
                    Press "Trigger Pipeline Simulation" above to stream execution events...
                  </span>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="text-[11px] leading-relaxed">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
