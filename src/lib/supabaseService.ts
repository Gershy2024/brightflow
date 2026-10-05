import { Project, ClientInquiry } from "./types";
import { supabase } from "./supabase";

export function projectToRow(p: Project) {
  return {
    id: p.id,
    name: p.name,
    description: p.description || "",
    status: p.status || "live",
    live_url: p.liveUrl || null,
    github_url: p.githubUrl || null,
    staging_url: p.stagingUrl || null,
    admin_url: p.adminUrl || null,
    deployment_provider: p.deploymentProvider || "Vercel",
    deployment_account: p.deploymentAccount || null,
    database_type: p.databaseType || "None",
    database_name: p.databaseName || null,
    tech_stack: p.techStack || [],
    owner_name: p.ownerName || "כללי",
    organization: p.organization || null,
    estimated_value: p.estimatedValue != null ? Number(p.estimatedValue) : 0,
    paid_amount: p.paidAmount != null ? Number(p.paidAmount) : 0,
    payments: p.payments || [],
    invoices: p.invoices || [],
    contacts: p.contacts || [],
    notes: p.notes || null,
    local_folder_path: p.localFolderPath || null,
    order_index: p.orderIndex ?? 0,
    created_at: p.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function rowToProject(row: any): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description || "",
    status: row.status || "live",
    liveUrl: row.live_url || undefined,
    githubUrl: row.github_url || undefined,
    stagingUrl: row.staging_url || undefined,
    adminUrl: row.admin_url || undefined,
    deploymentProvider: row.deployment_provider || "Vercel",
    deploymentAccount: row.deployment_account || undefined,
    databaseType: row.database_type || "None",
    databaseName: row.database_name || undefined,
    techStack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
    ownerName: row.owner_name || "",
    organization: row.organization || undefined,
    contacts: Array.isArray(row.contacts) ? row.contacts : [],
    estimatedValue: row.estimated_value != null ? Number(row.estimated_value) : undefined,
    paidAmount: row.paid_amount != null ? Number(row.paid_amount) : undefined,
    payments: Array.isArray(row.payments) ? row.payments : [],
    invoices: Array.isArray(row.invoices) ? row.invoices : [],
    notes: row.notes || undefined,
    localFolderPath: row.local_folder_path || undefined,
    orderIndex: row.order_index ?? 0,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

// ---------------- PROJECTS CLOUD SYNC ----------------

export async function fetchProjectsFromCloud(): Promise<Project[] | null> {
  try {
    const { data, error } = await supabase
      .from("brightflow_projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.warn("Supabase fetch projects error:", error.message);
      return null;
    }

    if (!data) return null;
    return data.map(rowToProject);
  } catch (err) {
    console.warn("Failed to fetch projects from Supabase:", err);
    return null;
  }
}

export async function syncProjectsToCloud(projects: Project[]): Promise<boolean> {
  if (!projects || projects.length === 0) return true;
  try {
    const rows = projects.map(projectToRow);
    const { error } = await supabase
      .from("brightflow_projects")
      .upsert(rows, { onConflict: "id" });

    if (error) {
      console.error("Supabase upsert projects error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to sync projects to Supabase:", err);
    return false;
  }
}

export async function deleteProjectFromCloud(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("brightflow_projects")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Supabase delete project error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to delete project from Supabase:", err);
    return false;
  }
}

// ---------------- CLIENT INQUIRIES & FEEDBACK ----------------

export async function fetchInquiriesFromCloud(): Promise<ClientInquiry[]> {
  try {
    const { data, error } = await supabase
      .from("brightflow_inquiries")
      .select("*, brightflow_projects(name)")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch inquiries error:", error.message);
      return [];
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      projectId: row.project_id || undefined,
      projectName: row.brightflow_projects?.name || undefined,
      type: row.type || "question",
      title: row.title,
      message: row.message,
      senderName: row.sender_name || undefined,
      senderEmail: row.sender_email || undefined,
      senderPhone: row.sender_phone || undefined,
      status: row.status || "new",
      createdAt: row.created_at || new Date().toISOString(),
    }));
  } catch (err) {
    console.warn("Failed to fetch inquiries from Supabase:", err);
    return [];
  }
}

export async function submitClientInquiry(inquiry: Omit<ClientInquiry, "id" | "createdAt">): Promise<boolean> {
  try {
    const newId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const { error } = await supabase.from("brightflow_inquiries").insert({
      id: newId,
      project_id: inquiry.projectId || null,
      type: inquiry.type || "question",
      title: inquiry.title,
      message: inquiry.message,
      sender_name: inquiry.senderName || null,
      sender_email: inquiry.senderEmail || null,
      sender_phone: inquiry.senderPhone || null,
      status: inquiry.status || "new",
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase submit inquiry error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to submit client inquiry:", err);
    return false;
  }
}

export async function updateInquiryStatus(id: string, status: "new" | "in_progress" | "resolved"): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("brightflow_inquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Supabase update inquiry error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to update inquiry status:", err);
    return false;
  }
}

export async function deleteInquiryFromCloud(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("brightflow_inquiries")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete inquiry error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to delete inquiry:", err);
    return false;
  }
}
