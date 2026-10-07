export type ProjectStatus = "live" | "in_development" | "maintenance" | "paused" | "archived";

export type DeploymentProvider =
  | "Vercel"
  | "Render"
  | "Railway"
  | "AWS"
  | "Cloudflare"
  | "Netlify"
  | "DigitalOcean"
  | "VPS / Linux"
  | "Local Only"
  | "Other";

export type DatabaseType =
  | "Supabase"
  | "Neon PostgreSQL"
  | "PostgreSQL"
  | "Turso / LibSQL"
  | "MongoDB"
  | "MySQL"
  | "Firebase"
  | "SQLite"
  | "Redis"
  | "None"
  | "Other";

export interface Contact {
  id: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  method?: string; // "Bank Transfer", "Credit Card", "Cash", "Check", "Stripe", "PayPal", "Other"
  reference?: string; // invoice or transaction ref
  notes?: string;
  clientId?: string;
  clientName?: string;
  projectId?: string;
  projectName?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  createdAt?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  dueDate?: string;
  status: "draft" | "sent" | "paid" | "overdue";
  notes?: string;
  items?: InvoiceItem[];
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  projectId?: string;
  projectName?: string;
  paidAmount?: number;
  remainingBalance?: number;
  createdAt?: string;
}

export type ClientStatus = "active" | "lead" | "vip" | "inactive";

export interface Client {
  id: string;
  name: string;
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: ClientStatus;
  notes?: string;
  website?: string;
  tags?: string[];
  assignedProjectIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = "draft" | "quote" | "in_progress" | "completed" | "cancelled";

export interface OrderItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  title: string;
  clientId: string;
  clientName: string;
  projectId?: string;
  projectName?: string;
  amount: number;
  status: OrderStatus;
  items: OrderItem[];
  orderDate: string;
  dueDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type PortalTab =
  | "dashboard"
  | "clients"
  | "projects"
  | "orders"
  | "finances"
  | "inquiries"
  | "settings";

export interface BusinessProfile {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  businessNumber: string; // ח.פ / ע.מ
  currency: string;
  vatRate: number; // e.g. 17 or 18%
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
  stagingUrl?: string;
  adminUrl?: string;
  deploymentProvider: DeploymentProvider;
  deploymentAccount?: string;
  databaseType: DatabaseType;
  databaseName?: string;
  techStack: string[];
  ownerName: string;
  organization?: string;
  clientId?: string;
  contacts: Contact[];
  estimatedValue?: number;
  paidAmount?: number;
  payments?: PaymentRecord[];
  invoices?: InvoiceRecord[];
  currency?: string;
  notes?: string;
  envKeysSummary?: string[];
  localFolderPath?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = "table" | "cards" | "kanban";

export type Language = "he" | "en";

export interface FilterState {
  search: string;
  status: string;
  deploymentProvider: string;
  databaseType: string;
  owner: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export type InquiryType = "question" | "feedback" | "bug" | "feature_request";
export type InquiryStatus = "new" | "in_progress" | "resolved";

export interface ClientInquiry {
  id: string;
  projectId?: string;
  projectName?: string;
  type: InquiryType;
  title: string;
  message: string;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  status: InquiryStatus;
  createdAt: string;
}
