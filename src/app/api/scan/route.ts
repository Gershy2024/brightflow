import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { DatabaseType, DeploymentProvider, Project } from "@/lib/types";
import { generateId } from "@/lib/utils";

const SCAN_DIRECTORIES = [
  "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop\\תוכן גרשיני\\פראגראמען",
  "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop\\תוכן גרשיני",
  "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop",
  "C:\\Users\\Gersh\\CascadeProjects",
  "C:\\Users\\Gersh\\.gemini\\antigravity\\scratch",
  "C:\\Users\\Gersh\\Documents\\antigravity",
  "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Documents\\New project",
  "C:\\Users\\meise\\.gemini\\antigravity\\scratch",
  "C:\\Users\\Gersh\\OneDrive - Bnei Yosef\\Desktop\\תוכן גרשיני\\עבודה\\teleslusones",
];

export async function GET() {
  try {
    const discoveredProjects: Partial<Project>[] = [];
    const scannedPaths = new Set<string>();

    for (const searchDir of SCAN_DIRECTORIES) {
      if (!fs.existsSync(searchDir)) continue;

      let entries: fs.Dirent[] = [];
      try {
        entries = fs.readdirSync(searchDir, { withFileTypes: true });
      } catch {
        continue;
      }

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (entry.name === "All prajects" || entry.name.startsWith(".")) continue;

        const fullPath = path.join(searchDir, entry.name);
        if (scannedPaths.has(fullPath.toLowerCase())) continue;
        scannedPaths.add(fullPath.toLowerCase());

        const packageJsonPath = path.join(fullPath, "package.json");
        const vercelJsonPath = path.join(fullPath, ".vercel", "project.json");
        const supabaseSchemaPath = path.join(fullPath, "supabase_schema.sql");
        const requirementsTxtPath = path.join(fullPath, "requirements.txt");
        const railwayJsonPath = path.join(fullPath, "railway.json");

        const hasPackage = fs.existsSync(packageJsonPath);
        const hasPython = fs.existsSync(requirementsTxtPath) || fs.existsSync(path.join(fullPath, "main.py"));
        const hasVercel = fs.existsSync(vercelJsonPath);

        // If not a code project, skip
        if (!hasPackage && !hasPython && !hasVercel && !fs.existsSync(railwayJsonPath)) {
          continue;
        }

        let pkgData: any = {};
        if (hasPackage) {
          try {
            pkgData = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
          } catch {
            pkgData = {};
          }
        }

        let vercelData: any = {};
        if (hasVercel) {
          try {
            vercelData = JSON.parse(fs.readFileSync(vercelJsonPath, "utf-8"));
          } catch {
            vercelData = {};
          }
        }

        // Infer tech stack
        const techStack: string[] = [];
        const deps = { ...(pkgData.dependencies || {}), ...(pkgData.devDependencies || {}) };
        if (deps.next) techStack.push("Next.js");
        if (deps.react) techStack.push("React");
        if (deps.vite) techStack.push("Vite");
        if (deps.tailwindcss || deps["@tailwindcss/vite"]) techStack.push("Tailwind CSS");
        if (deps.typescript) techStack.push("TypeScript");
        if (deps.express) techStack.push("Express");
        if (deps["@google/genai"] || deps["@google/generative-ai"]) techStack.push("Google GenAI");
        if (deps.stripe) techStack.push("Stripe");
        if (deps.twilio || deps["@twilio/voice-sdk"]) techStack.push("Twilio Voice");
        if (deps["@hebcal/core"]) techStack.push("Hebcal");
        if (hasPython) techStack.push("Python", "FastAPI / SQLite");

        // Infer Database
        let databaseType: DatabaseType = "None";
        let databaseName = "";
        if (deps["@supabase/supabase-js"] || fs.existsSync(supabaseSchemaPath) || fs.existsSync(path.join(fullPath, "supabase"))) {
          databaseType = "Supabase";
          databaseName = "Supabase PostgreSQL";
        } else if (deps["@neondatabase/serverless"]) {
          databaseType = "Neon PostgreSQL";
          databaseName = "Neon Serverless DB";
        } else if (deps["@libsql/client"]) {
          databaseType = "Turso / LibSQL";
          databaseName = "Turso Embedded Replica";
        } else if (deps.firebase || deps["firebase-admin"]) {
          databaseType = "Firebase";
          databaseName = "Firebase Firestore";
        } else if (deps.ioredis || deps.redis) {
          databaseType = "Redis";
          databaseName = "Redis Store";
        } else if (deps.mongodb || deps.mongoose) {
          databaseType = "MongoDB";
        } else if (deps.pg) {
          databaseType = "PostgreSQL";
        } else if (deps.mysql || deps.mysql2) {
          databaseType = "MySQL";
        } else if (deps.sqlite3 || hasPython) {
          databaseType = "SQLite";
        }

        // Infer Deployment
        let deploymentProvider: DeploymentProvider = "Local Only";
        let liveUrl = "";
        let deploymentAccount = "";

        if (vercelData.projectName) {
          deploymentProvider = "Vercel";
          liveUrl = `https://${vercelData.projectName}.vercel.app`;
          deploymentAccount = vercelData.orgId ? `Vercel (${vercelData.orgId})` : "Vercel Team";
        } else if (fs.existsSync(railwayJsonPath)) {
          deploymentProvider = "Railway";
          deploymentAccount = "Railway Cloud";
        } else if (fs.existsSync(path.join(fullPath, "vercel.json")) || fs.existsSync(path.join(fullPath, ".vercel"))) {
          deploymentProvider = "Vercel";
        }

        // Clean Project Name & Owner mapping
        let cleanName = entry.name.replace(/[-_]/g, " ");
        let owner = "כללי";
        let org = "";

        const lowerName = entry.name.toLowerCase();
        if (lowerName.includes("transportation") || lowerName.includes("programs")) {
          cleanName = "הסעות קול יעקב (נייטרא אקספרס)";
          owner = "קול יעקב";
          org = "מוסדות נייטרא - קול יעקב";
        } else if (lowerName.includes("kollel-chavrutot") || lowerName.includes("kollel")) {
          cleanName = "כולל חברותות - ניהול חברותות";
          owner = "כולל חברותות";
          org = "מוסדות כולל חברותות";
        } else if (lowerName.includes("shatnez-lab")) {
          cleanName = "מעבדת שעטנז (The Shatnez Lab)";
          owner = "מעבדת שעטנז";
          org = "The Shatnez Lab";
        } else if (lowerName.includes("bandwidth-voice") || lowerName.includes("send calls")) {
          cleanName = "send calls - שיגור שיחות קוליות";
          owner = "שיגור שיחות";
          org = "Voice Broadcast Portal";
        } else if (lowerName.includes("yeshiva_erp")) {
          cleanName = "yeshiva_erp_v6 - מערכת ניהול ישיבה";
          owner = "הנהלת הישיבה";
          org = "מוסדות הישיבה";
        } else if (lowerName.includes("business-hours")) {
          cleanName = "business-hours - ניהול שעות פעילות";
          owner = "מוקד משרדי";
        } else if (lowerName.includes("shekel-hakodesh-rep") || lowerName.includes("natzugim")) {
          cleanName = "שקל הקודש - נציגים ו-IVR";
          owner = "שקל הקודש";
          org = "מפעל שקל הקודש";
        } else if (lowerName.includes("שקל") || lowerName.includes("bachurim")) {
          cleanName = "שקל הקודש - מגייסים";
          owner = "שקל הקודש";
          org = "מפעל שקל הקודש";
        } else if (lowerName.includes("עמודי") || lowerName.includes("amudei")) {
          cleanName = "עמודי העולם CRM";
          owner = "עמודי העולם";
          org = "מוסדות עמודי העולם";
        } else if (lowerName.includes("test-tracker")) {
          cleanName = "test-tracker - מעקב מבחנים וציונים";
          owner = "מכון הבחינות";
        } else if (lowerName.includes("signalwire-ivr")) {
          cleanName = "signalwire-ivr - מרכזיית IVR";
          owner = "מוקד טלפוני";
        } else if (lowerName.includes("מרכזיה") || lowerName.includes("בודק-שעטנז")) {
          cleanName = "בודק שעטנז - מעקב הזמנות ומרכזיה";
          owner = "מעבדת שעטנז";
        } else if (lowerName.includes("bardeen")) {
          cleanName = "kind-bardeen - אוטומציות וסקרייפינג";
          owner = "אוטומציות פנימיות";
        }

        discoveredProjects.push({
          id: generateId(),
          name: cleanName,
          description: pkgData.description || `פרויקט שנמצא בתיקייה: ${entry.name}`,
          status: liveUrl ? "live" : "in_development",
          liveUrl,
          adminUrl: databaseType === "Supabase" ? "https://supabase.com/dashboard" : "",
          deploymentProvider,
          deploymentAccount,
          databaseType,
          databaseName,
          techStack: techStack.length > 0 ? techStack : ["JavaScript / TypeScript"],
          ownerName: owner,
          organization: org,
          contacts: [],
          localFolderPath: fullPath,
        });
      }
    }

    return NextResponse.json({
      success: true,
      count: discoveredProjects.length,
      projects: discoveredProjects,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
