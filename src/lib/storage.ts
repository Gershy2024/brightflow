import { Project } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "prj_amudei_haolam",
    name: "עמודי העולם CRM",
    description: "מערכת CRM וניהול נתונים מתקדמת לארגון עמודי העולם, כולל אינטגרציית דוא״ל ומסד נתונים סופאבייס.",
    status: "live",
    liveUrl: "https://amudei-haolam-crm.vercel.app",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "https://supabase.com/dashboard",
    deploymentProvider: "Vercel",
    deploymentAccount: "Vercel Team (team_EZ5ZwwhXVb1rSDJV6T08tI45)",
    databaseType: "Supabase",
    databaseName: "amudei-haolam-db (PostgreSQL)",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Resend", "ExcelJS"],
    ownerName: "עמודי העולם",
    organization: "מוסדות עמודי העולם",
    estimatedValue: 22000,
    contacts: [
      {
        id: "c_1",
        name: "מנהל עמודי העולם",
        role: "מנהל ראשי",
        phone: "",
        email: "contact@amudeihaolam.org",
        notes: "איש קשר לפיתוח ודרישות מערכת",
      },
    ],
    notes: "פרויקט פעיל. כולל סכמות SQL וטבלאות ניהול. משתמש ב-Resend למשלוח מיילים.",
    localFolderPath: "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop\\תוכן גרשיני\\פראגראמען\\עמודי העולם",
    orderIndex: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_kollel_chavrutot",
    name: "כולל חברותות - ניהול חברותות",
    description: "מערכת לניהול ושיבוץ חברותות בכולל, סנכרון נתוני אברכים, ניתוח באמצעות Google Generative AI והתראות דוא״ל.",
    status: "live",
    liveUrl: "https://kollel-chavrutot-manager-3.vercel.app",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "https://supabase.com/dashboard",
    deploymentProvider: "Vercel",
    deploymentAccount: "Vercel Team (team_EZ5ZwwhXVb1rSDJV6T08tI45)",
    databaseType: "Supabase",
    databaseName: "kollel-chavrutot-db (PostgreSQL)",
    techStack: ["React 18", "Vite", "Supabase", "Google GenAI", "Tailwind CSS", "EmailJS", "PWA"],
    ownerName: "כולל חברותות",
    organization: "מוסדות כולל חברותות",
    estimatedValue: 18500,
    contacts: [
      {
        id: "c_kollel",
        name: "מנהל הכולל",
        role: "הנהלת כולל",
        phone: "",
        email: "",
        notes: "אחראי מערך השיבוצים",
      },
    ],
    notes: "כולל מודול שיבוץ חברותות, ייבוא וייצוא אקסל, וממשק PWA לנייד.",
    localFolderPath: "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop\\kollel-chavrutot-manager (3)",
    orderIndex: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_yashive_transportation",
    name: "הסעות קול יעקב (נייטרא אקספרס)",
    description: "מערכת ניהול הסעות לתלמידים, מסלולים, תחנות, חיובים באמצעות Stripe, ולוח שנה עברי עם Hebcal.",
    status: "live",
    liveUrl: "https://yashive-transportation.vercel.app",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "https://supabase.com/dashboard",
    deploymentProvider: "Vercel",
    deploymentAccount: "Vercel Team (team_EZ5ZwwhXVb1rSDJV6T08tI45)",
    databaseType: "Supabase",
    databaseName: "nitra-transport-db (PostgreSQL)",
    techStack: ["Next.js 14", "React 18", "Supabase SSR", "Stripe Payments", "Tailwind CSS", "Hebcal", "jsPDF"],
    ownerName: "קול יעקב",
    organization: "מוסדות נייטרא - קול יעקב",
    estimatedValue: 2700,
    contacts: [
      {
        id: "c_trans",
        name: "רכז תחבורה והסעות",
        role: "אחראי קווי הסעות",
        phone: "",
        email: "",
        notes: "איש קשר לעדכוני מסלולים ותחנות",
      },
    ],
    notes: "מערכת פעילה באוויר עם סליקת כרטיסי אשראי ב-Stripe ואינטגרציית Supabase Auth & DB.",
    localFolderPath: "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop\\תוכן גרשיני\\Yashive Transportation",
    orderIndex: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_shatnez_lab",
    name: "מעבדת שעטנז (The Shatnez Lab)",
    description: "פורטל מעבדת שעטנז לבדיקות וזיהוי סיבים, מעקב דגימות, שילוב Twilio Voice SDK, ו-MSEdge TTS.",
    status: "live",
    liveUrl: "https://shatnez-lab.vercel.app",
    githubUrl: "https://github.com/shatnez-lab",
    stagingUrl: "https://theshatnezlab.netlify.app",
    adminUrl: "https://console.firebase.google.com",
    deploymentProvider: "Vercel",
    deploymentAccount: "Vercel Team (team_EZ5ZwwhXVb1rSDJV6T08tI45)",
    databaseType: "Firebase",
    databaseName: "shatnez-lab-firebase",
    techStack: ["Next.js 14", "Firebase", "Twilio Voice", "MSEdge TTS", "Framer Motion", "Tailwind CSS"],
    ownerName: "מעבדת שעטנז",
    organization: "The Shatnez Lab",
    estimatedValue: 28000,
    contacts: [
      {
        id: "c_shatnez",
        name: "מנהל המעבדה",
        role: "מומחה בדיקת שעטנז",
        phone: "",
        email: "",
        notes: "איש קשר לדגימות ובדיקות מעבדה",
      },
    ],
    notes: "כולל ממשק שיחות קוליות עם Twilio, הקראת טקסטים קוליים עם Edge TTS, וחיבור ל-Firebase.",
    localFolderPath: "C:\\Users\\Gersh\\CascadeProjects\\shatnez-lab",
    orderIndex: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_send_calls",
    name: "send calls - פורטל שיגור שיחות קוליות",
    description: "פורטל שידור הודעות קוליות המוניות (Voice Broadcast) עם תזמון לפי תאריכים עבריים, עיבוד שמע ב-FFmpeg וחיבור SignalWire.",
    status: "live",
    liveUrl: "",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "https://railway.com/dashboard",
    deploymentProvider: "Railway",
    deploymentAccount: "Railway Service",
    databaseType: "SQLite",
    databaseName: "voice-broadcast-sqlite",
    techStack: ["Express 5", "React", "SignalWire", "FFmpeg", "JWT Auth", "SQLite", "Tailwind CSS"],
    ownerName: "שיגור שיחות",
    organization: "Voice Broadcast Portal",
    estimatedValue: 15000,
    contacts: [
      {
        id: "c_send_calls",
        name: "אחראי שידורים",
        role: "מפעיל קמפיינים קוליים",
        phone: "",
        email: "",
        notes: "איש קשר להוצאת שיחות המוניות",
      },
    ],
    notes: "מוגדר לפריסה ב-Railway באמצעות railway.json ו-Nixpacks. כולל תמיכה בהמרת שמע מתקדמת ב-FFmpeg.",
    localFolderPath: "C:\\Users\\Gersh\\.gemini\\antigravity\\scratch\\bandwidth-voice-portal",
    orderIndex: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_yeshiva_erp",
    name: "yeshiva_erp_v6 - מערכת ניהול ישיבה",
    description: "מערכת ERP מקיפה לניהול תלמידים, בחינות, ציונים, שכר לימוד, מרכזיית טלפוניה IVR וסנכרון לסופאבייס.",
    status: "in_development",
    liveUrl: "",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "http://localhost:8000 / Supabase",
    deploymentProvider: "Local Only",
    deploymentAccount: "שרת מקומי / Desktop Python",
    databaseType: "SQLite",
    databaseName: "yeshiva_erp.db + Supabase Sync",
    techStack: ["Python", "FastAPI", "SQLite", "Supabase", "Alembic", "SignalWire IVR", "PyLuach"],
    ownerName: "הנהלת הישיבה",
    organization: "מוסדות הישיבה",
    estimatedValue: 45000,
    contacts: [
      {
        id: "c_yeshiva",
        name: "מנהל הישיבה",
        role: "מנהל כללי",
        phone: "",
        email: "",
        notes: "איש קשר לניהול תלמידים ובחינות",
      },
    ],
    notes: "מערכת כוללת ממשק שולחני ו-Web, שרת FastAPI, מודול ניהול חובות, תעודות ומעקב ציונים.",
    localFolderPath: "c:\\Users\\meise\\.gemini\\antigravity\\scratch\\yeshiva_erp_v6",
    orderIndex: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_shekel_natzugim",
    name: "שקל הקודש - נציגים ומערכת IVR",
    description: "מערכת ניהול נציגים וממשק IVR טלפוני לשקל הקודש עם שרת Node/Express ומסד נתונים Neon PostgreSQL.",
    status: "live",
    liveUrl: "https://shekel-hakodesh-natzugim.vercel.app",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "https://console.neon.tech",
    deploymentProvider: "Vercel",
    deploymentAccount: "Vercel Team (team_EZ5ZwwhXVb1rSDJV6T08tI45)",
    databaseType: "Neon PostgreSQL",
    databaseName: "shekel-natzugim-prod (Neon)",
    techStack: ["React 19", "Vite", "Express", "Tailwind CSS", "Neon Serverless", "XLSX"],
    ownerName: "שקל הקודש",
    organization: "מפעל שקל הקודש",
    estimatedValue: 25000,
    contacts: [
      {
        id: "c_2",
        name: "רכז מוקד שקל הקודש",
        role: "אחראי נציגים ו-IVR",
        phone: "",
        email: "",
        notes: "איש קשר לעדכוני שאלות ומענה קולי",
      },
    ],
    notes: "מחובר ל-Neon Serverless PostgreSQL. שרת Express רץ באמצעות esbuild על Vercel Serverless.",
    localFolderPath: "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop\\תוכן גרשיני\\פראגראמען\\shekel-hakodesh-rep-&-ivr-manager",
    orderIndex: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_shekel_bachurim",
    name: "מערכת ניהול ומיזוג מגייסי שקל הקודש",
    description: "מערכת ניהול מגייסים, עיבוד ומיזוג נתונים, שילוב בינה מלאכותית של Google GenAI ומסד נתונים Turso/LibSQL.",
    status: "live",
    liveUrl: "https://shekel-hakodesh-bachurim.vercel.app",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "https://turso.tech/app",
    deploymentProvider: "Vercel",
    deploymentAccount: "Vercel Team (team_EZ5ZwwhXVb1rSDJV6T08tI45)",
    databaseType: "Turso / LibSQL",
    databaseName: "turso-bachurim-db",
    techStack: ["React 19", "Vite", "Turso / LibSQL", "Google GenAI", "Hebcal", "Tailwind CSS", "Recharts"],
    ownerName: "שקל הקודש",
    organization: "מפעל שקל הקודש",
    estimatedValue: 30000,
    contacts: [
      {
        id: "c_3",
        name: "מנהל מבצע שקל הקודש",
        role: "מנהל קמפיין ומגייסים",
        phone: "",
        email: "",
        notes: "איש קשר לדוחות ומיזוג קבצים",
      },
    ],
    notes: "כולל ייצוא דוחות PDF, ניתוח באמצעות Google GenAI, וחישובי תאריכים עבריים עם Hebcal.",
    localFolderPath: "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop\\תוכן גרשיני\\פראגראמען\\מערכת-ניהול-ומיזוג-מגייסי-שקל-הקודש",
    orderIndex: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_business_hours",
    name: "business-hours - ניהול שעות פעילות ומרכזיה",
    description: "מערכת לניהול שעות פעילות, מענה קולי מותאם וחסימות עבור Twilio IVR Flow עם אחסון מהיר ב-Redis.",
    status: "live",
    liveUrl: "https://business-hours.vercel.app",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "https://upstash.com / Redis",
    deploymentProvider: "Vercel",
    deploymentAccount: "Vercel Team (team_EZ5ZwwhXVb1rSDJV6T08tI45)",
    databaseType: "Redis",
    databaseName: "ioRedis Cache Store",
    techStack: ["Node.js", "Express", "ioRedis", "Twilio Flow", "Nodemailer"],
    ownerName: "מוקד משרדי",
    organization: "מערך הטלפוניה",
    estimatedValue: 12000,
    contacts: [
      {
        id: "c_bh",
        name: "מנהל מוקד",
        role: "אחראי זמני פעילות",
        phone: "",
        email: "",
        notes: "איש קשר להגדרת שעות פעילות וחגים",
      },
    ],
    notes: "שולט על זרימת השיחות ב-Twilio לפי זמנים, שבתות, חגים ותורנויות.",
    localFolderPath: "C:\\Users\\Gersh\\.gemini\\antigravity\\scratch\\business-hours",
    orderIndex: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_shatnez_telephony",
    name: "בודק שעטנז - מעקב הזמנות ומרכזיה טלפונית",
    description: "ממשק מעקב הזמנות בדיקת שעטנז, תיאום מסירות, שילוב בינה מלאכותית של Google GenAI ומסד נתונים Firebase Admin.",
    status: "live",
    liveUrl: "",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "https://console.firebase.google.com",
    deploymentProvider: "Vercel",
    deploymentAccount: "Vercel / Node Server",
    databaseType: "Firebase",
    databaseName: "Firebase Admin Firestore",
    techStack: ["React 19", "Vite", "Express", "Firebase Admin", "Google GenAI", "Tailwind CSS"],
    ownerName: "מעבדת שעטנז",
    organization: "מוקד שירות שעטנז",
    estimatedValue: 20000,
    contacts: [
      {
        id: "c_tel_shatnez",
        name: "רכז הזמנות",
        role: "שירות לקוחות והזמנות",
        phone: "",
        email: "",
        notes: "איש קשר לקבלת ומסירת בגדים לבדיקה",
      },
    ],
    notes: "מערכת הכוללת שרת Express TS, שילוב Google GenAI לבירור שאלות, וניהול נתונים ב-Firebase.",
    localFolderPath: "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop\\תוכן גרשיני\\עבודה\\teleslusones\\בודק-שעטנז---מעקב-הזמנות-ומרכזיה-טלפונית",
    orderIndex: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_signalwire_ivr",
    name: "signalwire-ivr - מרכזיית IVR",
    description: "שרת מרכזיית IVR מבוסס SignalWire ו-PostgreSQL לניתוב שיחות, מענה קולי והודעות מערכת.",
    status: "live",
    liveUrl: "",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "",
    deploymentProvider: "VPS / Linux",
    deploymentAccount: "SignalWire Cloud",
    databaseType: "PostgreSQL",
    databaseName: "signalwire_ivr_pg",
    techStack: ["Node.js", "Express", "PostgreSQL", "SignalWire API", "Multer"],
    ownerName: "מוקד טלפוני",
    organization: "תשתיות טלפוניה",
    estimatedValue: 16000,
    contacts: [],
    notes: "שרת קבלת Webhooks מ-SignalWire וניהול תורי שיחות.",
    localFolderPath: "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Documents\\New project\\signalwire-ivr",
    orderIndex: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_test_tracker",
    name: "test-tracker - מעקב מבחנים וציונים",
    description: "אפליקציה למעקב בחינות, הפקת תעודות ודוחות, תבניות Word (Docxtemplater), חישוב תאריכים עבריים וגרפים.",
    status: "in_development",
    liveUrl: "",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "",
    deploymentProvider: "Local Only",
    deploymentAccount: "Localhost",
    databaseType: "SQLite",
    databaseName: "test-tracker-local",
    techStack: ["React 19", "Vite", "Docxtemplater", "Recharts", "Hebcal", "jsPDF", "Tailwind CSS"],
    ownerName: "מכון הבחינות",
    organization: "מוסדות חינוך",
    estimatedValue: 14000,
    contacts: [],
    notes: "מפיק דוחות מבחנים מעוצבים, מייצא קבצי Word מותאמים, ומסנכרן ציונים.",
    localFolderPath: "C:\\Users\\Gersh\\.gemini\\antigravity\\scratch\\test-tracker",
    orderIndex: 11,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prj_kind_bardeen",
    name: "kind-bardeen - אוטומציות וסקרייפינג",
    description: "פרויקט אוטומציות וחיבורי סקרייפינג של Bardeen לאיסוף ועיבוד נתונים.",
    status: "paused",
    liveUrl: "",
    githubUrl: "",
    stagingUrl: "",
    adminUrl: "https://bardeen.ai",
    deploymentProvider: "Other",
    deploymentAccount: "Bardeen Account",
    databaseType: "None",
    techStack: ["Bardeen", "Automation", "Webhooks", "JSON"],
    ownerName: "אוטומציות פנימיות",
    organization: "איסוף נתונים",
    estimatedValue: 5000,
    contacts: [],
    notes: "תהליכי עבודה אוטומטיים לאיסוף מידע וסנכרון בין מערכות.",
    localFolderPath: "C:\\Users\\Gersh\\Documents\\antigravity\\kind-bardeen",
    orderIndex: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Clean initial payments and invoices - all start empty until entered by user
for (const p of INITIAL_PROJECTS) {
  p.paidAmount = 0;
  p.payments = [];
  p.invoices = [];
}

const STORAGE_KEY = "project_vault_data_v6";

// Known dummy IDs injected during testing that must be scrubbed out
const DUMMY_PAYMENT_IDS = new Set(["pay_1", "pay_2", "pay_3", "pay_4", "pay_5", "pay_6", "pay_7"]);
const DUMMY_INVOICE_IDS = new Set(["inv_1", "inv_2", "inv_3", "inv_4", "inv_5"]);

export function loadProjectsFromStorage(): Project[] {
  if (typeof window === "undefined") {
    return INITIAL_PROJECTS;
  }
  try {
    const rawV6 = localStorage.getItem("project_vault_data_v6");
    const rawV5 = localStorage.getItem("project_vault_data_v5");
    const rawV4 = localStorage.getItem("project_vault_data_v4");
    const rawV3 = localStorage.getItem("project_vault_data_v3");
    const rawV2 = localStorage.getItem("project_vault_data_v2");
    const rawV1 = localStorage.getItem("project_vault_data");

    // Check existing data from most recent to oldest
    const sourceRaw = rawV6 || rawV4 || rawV5 || rawV3 || rawV2 || rawV1;

    if (sourceRaw) {
      try {
        const parsed: Project[] = JSON.parse(sourceRaw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = parsed.map((p) => {
            const initMatch = INITIAL_PROJECTS.find((ip) => ip.id === p.id);

            // Filter out any mock dummy test payments
            const cleanPayments = (p.payments || []).filter(
              (pay) => !DUMMY_PAYMENT_IDS.has(pay.id) && !pay.id.startsWith("dummy_")
            );

            // Filter out any mock dummy test invoices
            const cleanInvoices = (p.invoices || []).filter(
              (inv) => !DUMMY_INVOICE_IDS.has(inv.id) && !inv.id.startsWith("dummy_")
            );

            // Calculate paidAmount strictly from authentic user payment records
            const calculatedPaid = cleanPayments.reduce(
              (sum, pay) => sum + (Number(pay.amount) || 0),
              0
            );

            return {
              ...initMatch,
              ...p,
              // Strictly preserve user's genuine estimatedValue
              estimatedValue: p.estimatedValue !== undefined ? p.estimatedValue : initMatch?.estimatedValue,
              paidAmount: calculatedPaid,
              payments: cleanPayments,
              invoices: cleanInvoices,
            };
          });

          // Also bring in any initial projects not yet in the list
          const existingIds = new Set(merged.map((p) => p.id));
          const missing = INITIAL_PROJECTS.filter((p) => !existingIds.has(p.id));
          const finalProjects = [...merged, ...missing].sort(
            (a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)
          );

          localStorage.setItem(STORAGE_KEY, JSON.stringify(finalProjects));
          return finalProjects;
        }
      } catch (e) {
        console.error("Migration error:", e);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  } catch (err) {
    console.error("Failed to load projects from storage:", err);
    return INITIAL_PROJECTS;
  }
}

export function saveProjectsToStorage(projects: Project[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error("Failed to save projects to storage:", err);
  }
}

// ================= CRM CLIENTS, ORDERS & PROFILE STORAGE =================

export const STORAGE_CLIENTS_KEY = "brightflow_crm_clients_v2";
export const STORAGE_ORDERS_KEY = "brightflow_crm_orders_v2";
export const STORAGE_PROFILE_KEY = "brightflow_crm_profile_v2";

export const DEFAULT_BUSINESS_PROFILE: import("./types").BusinessProfile = {
  name: "BrightFlow",
  tagline: "Custom Software • Smart Automation • Personal Support",
  email: "contact@brightflow.cloud",
  phone: "+1 (845) 300-1234",
  address: "Monsey, NY / Jerusalem",
  businessNumber: "BF-8930412",
  currency: "$",
  vatRate: 0,
};

export function extractClientsFromProjects(projects: import("./types").Project[]): import("./types").Client[] {
  const clientMap = new Map<string, import("./types").Client>();

  projects.forEach((p, idx) => {
    const rawName = (p.ownerName || p.organization || "לקוח כללי").trim();
    if (!rawName) return;

    const existing = clientMap.get(rawName);
    const primaryContact = p.contacts?.[0];

    if (existing) {
      if (!existing.assignedProjectIds?.includes(p.id)) {
        existing.assignedProjectIds = [...(existing.assignedProjectIds || []), p.id];
      }
      if (!existing.email && primaryContact?.email) existing.email = primaryContact.email;
      if (!existing.phone && primaryContact?.phone) existing.phone = primaryContact.phone;
      if (!existing.companyName && p.organization) existing.companyName = p.organization;
    } else {
      const clientId = `client_${idx + 1}_${encodeURIComponent(rawName).slice(0, 10)}`;
      clientMap.set(rawName, {
        id: clientId,
        name: rawName,
        companyName: p.organization || rawName,
        email: primaryContact?.email || "",
        phone: primaryContact?.phone || "",
        address: "",
        status: p.status === "archived" ? "inactive" : "active",
        notes: `לקוח עבור: ${p.name}`,
        website: p.liveUrl || "",
        tags: p.techStack && p.techStack.length > 0 ? p.techStack.slice(0, 2) : ["Web"],
        assignedProjectIds: [p.id],
        createdAt: p.createdAt || new Date().toISOString(),
        updatedAt: p.updatedAt || new Date().toISOString(),
      });
    }
  });

  return Array.from(clientMap.values());
}

export function extractOrdersFromProjects(
  projects: import("./types").Project[],
  clients: import("./types").Client[]
): import("./types").Order[] {
  return projects.map((p, idx) => {
    const matchedClient = clients.find(
      (c) => c.name === p.ownerName || c.assignedProjectIds?.includes(p.id)
    );
    const orderStatus: import("./types").OrderStatus =
      p.status === "live"
        ? "completed"
        : p.status === "in_development"
        ? "in_progress"
        : p.status === "archived"
        ? "cancelled"
        : "quote";

    return {
      id: `ord_${p.id}`,
      orderNumber: `ORD-${new Date().getFullYear()}-${String(101 + idx).padStart(3, "0")}`,
      title: `פיתוח והטמעת מערכת: ${p.name}`,
      clientId: matchedClient?.id || `client_gen_${idx}`,
      clientName: matchedClient?.name || p.ownerName || "לקוח כללי",
      projectId: p.id,
      projectName: p.name,
      amount: p.estimatedValue || 3500,
      status: orderStatus,
      items: [
        {
          id: `item_${idx}_1`,
          description: `אפיון, פיתוח, ממשק משתמש ואירוח ענן - ${p.name}`,
          quantity: 1,
          unitPrice: p.estimatedValue || 3500,
        },
      ],
      orderDate: p.createdAt ? p.createdAt.split("T")[0] : new Date().toISOString().split("T")[0],
      dueDate: p.updatedAt ? p.updatedAt.split("T")[0] : new Date().toISOString().split("T")[0],
      notes: p.notes || "הזמנת שירות ופיתוח תוכנה מותאמת אישית",
      createdAt: p.createdAt || new Date().toISOString(),
      updatedAt: p.updatedAt || new Date().toISOString(),
    };
  });
}

export function loadClientsFromStorage(projects?: import("./types").Project[]): import("./types").Client[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_CLIENTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load clients:", e);
  }

  // Fallback: seed from projects
  const effectiveProjects = projects || INITIAL_PROJECTS;
  const seeded = extractClientsFromProjects(effectiveProjects);
  saveClientsToStorage(seeded);
  return seeded;
}

export function saveClientsToStorage(clients: import("./types").Client[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_CLIENTS_KEY, JSON.stringify(clients));
  } catch (err) {
    console.error("Failed to save clients to storage:", err);
  }
}

export function loadOrdersFromStorage(
  projects?: import("./types").Project[],
  clients?: import("./types").Client[]
): import("./types").Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load orders:", e);
  }

  // Fallback: seed from projects & clients
  const effectiveProjects = projects || INITIAL_PROJECTS;
  const effectiveClients = clients || loadClientsFromStorage(effectiveProjects);
  const seeded = extractOrdersFromProjects(effectiveProjects, effectiveClients);
  saveOrdersToStorage(seeded);
  return seeded;
}

export function saveOrdersToStorage(orders: import("./types").Order[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error("Failed to save orders to storage:", err);
  }
}

export function loadBusinessProfileFromStorage(): import("./types").BusinessProfile {
  if (typeof window === "undefined") return DEFAULT_BUSINESS_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.name) {
        return { ...DEFAULT_BUSINESS_PROFILE, ...parsed };
      }
    }
  } catch (e) {
    console.warn("Failed to load business profile:", e);
  }
  return DEFAULT_BUSINESS_PROFILE;
}

export function saveBusinessProfileToStorage(profile: import("./types").BusinessProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error("Failed to save business profile:", err);
  }
}
