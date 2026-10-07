import { Language, ProjectStatus } from "./types";

export const translations = {
  he: {
    appTitle: "BrightFlow",
    appSubtitle: "Custom Software. Smart Automation. Personal Support.",
    searchPlaceholder: "חיפוש לפי שם פרויקט, לקוח, טכנולוגיה או קישור...",
    allStatuses: "כל הסטטוסים",
    allDeployments: "כל ספקי האחסון",
    allDatabases: "כל מסדי הנתונים",
    allOwners: "כל הבעלים / לקוחות",
    noResultsFound: "לא נמצאו תוצאות",
    noResultsDesc: "נסה לשנות את מילות החיפוש או לנקות את הסינונים.",
    clearFilters: "נקה סינונים",
    
    // Statuses
    status: {
      live: "פעיל באוויר",
      in_development: "בפיתוח",
      maintenance: "בתחזוקה",
      paused: "מושהה",
      archived: "בארכיון",
    },

    // View Modes
    views: {
      table: "טבלה",
      cards: "כרטיסים",
      kanban: "לוח (גרירה)",
    },

    // Stats
    stats: {
      totalProjects: "סה״כ פרויקטים",
      liveProjects: "פרויקטים באוויר",
      activeDatabases: "מסדי נתונים",
      clientsCount: "לקוחות וארגונים",
      totalValuation: "שווי תיק הפרויקטים",
      totalCollected: "סה״כ שולם עד כה",
      totalPending: "יתרה לתשלום",
    },

    // Billing & Payments
    billing: {
      title: "חיובים, תשלומים וחשבוניות",
      totalAgreed: "שווי מוסכם",
      totalPaid: "שולם בפועל",
      remainingBalance: "יתרה לגבייה",
      paymentProgress: "התקדמות תשלום",
      paymentsHistory: "היסטוריית תשלומים שנתקבלו",
      recordPayment: "רישום תשלום שהתקבל",
      addPaymentBtn: "+ הוסף תשלום חדש",
      amount: "סכום ($)",
      date: "תאריך קבלה",
      method: "אמצעי תשלום",
      reference: "אסמכתא / קבלה",
      notes: "הערות",
      noPaymentsYet: "טרם נרשמו תשלומים עבור פרויקט זה.",
      methods: {
        bankTransfer: "העברה בנקאית",
        creditCard: "כרטיס אשראי",
        check: "צ׳ק",
        cash: "מזומן",
        stripe: "Stripe",
        paypal: "PayPal",
        other: "אחר",
      },
      invoicesSection: "חשבוניות ודרישות תשלום",
      addInvoiceBtn: "+ צור חשבונית",
      invoiceNumber: "מספר חשבונית",
      issueDate: "תאריך הנפקה",
      dueDate: "לתשלום עד",
      invoiceStatus: "סטטוס חשבונית",
      statusDraft: "טיוטה",
      statusSent: "נשלחה",
      statusPaid: "שולמה",
      statusOverdue: "באיחור",
      fullyPaid: "שולם במלואו",
      partiallyPaid: "שולם חלקית",
      unpaid: "טרם שולם",
    },

    // Inquiries & Client Feedback
    inquiries: {
      title: "פניות ושאלות לקוחות",
      subtitle: "שאלות, המלצות לשיפור ובקשות מכל הפרויקטים",
      newInquiry: "פנייה חדשה",
      allTypes: "כל הסוגים",
      allStatuses: "כל הסטטוסים",
      types: {
        question: "שאלה",
        feedback: "המלצה לשיפור",
        bug: "דיווח על תקלה",
        feature_request: "בקשת פיצ׳ר חדש",
      },
      statuses: {
        new: "חדש",
        in_progress: "בטיפול",
        resolved: "טופל / הושלם",
      },
      replyEmail: "השב באימייל",
      markAsResolved: "סמן כטופל",
      markInProgress: "העבר לטיפול",
      delete: "מחק פנייה",
      noInquiries: "אין פניות או שאלות להצגה",
      noInquiriesDesc: "כאשר לקוחות ישלחו שאלות או המלצות מהאפליקציות שלהם, הן יופיעו כאן בזמן אמת.",
      embedWidget: "קוד חיבור לאפליקציית לקוח",
      copyWidgetCode: "העתק קוד Widget",
      widgetCopied: "קוד ה-Widget הועתק!",
    },

    // Table Columns
    table: {
      reorder: "סדר",
      projectName: "שם הפרויקט",
      status: "סטטוס",
      estimatedValue: "שווי מוערך",
      billingStatus: "תשלומים / גבייה",
      deployment: "אחסון ופריסה",
      database: "בסיס נתונים",
      owner: "שייך ל- / לקוח",
      contacts: "אנשי קשר",
      techStack: "טכנולוגיות",
      actions: "פעולות",
    },

    // Pagination
    pagination: {
      perPage: "לכל עמוד",
      showing: "מציג",
      to: "עד",
      of: "מתוך",
      projects: "פרויקטים",
      prev: "הקודם",
      next: "הבא",
      page: "עמוד",
    },

    // Bulk Actions
    bulk: {
      selectedCount: "נבחרו {count} פרויקטים",
      selectAll: "בחר הכל בעמוד",
      clearSelection: "בטל בחירה",
      changeStatus: "שנה סטטוס לקבוצה",
      exportJson: "ייצוא נבחרים (JSON)",
      deleteSelected: "מחק נבחרים",
      confirmDeleteTitle: "האם למחוק פרויקטים אלו?",
      confirmDeleteDesc: "פעולה זו תמחק {count} פרויקטים מהמאגר. האם אתה בטוח?",
      confirm: "אישור מחיקה",
      cancel: "ביטול",
    },

    // Action Buttons
    actions: {
      newProject: "הוסף פרויקט חדש",
      scanLocal: "סרוק תיקיות מקומיות",
      edit: "ערוך פרטים",
      delete: "מחק פרויקט",
      duplicate: "שכפל פרויקט",
      viewDetails: "צפה בכרטיס מלא",
      openLive: "פתח אתר חי",
      openRepo: "פתח Repository",
      openAdmin: "פתח פאנל ניהול",
      save: "שמור שינויים",
      create: "צור פרויקט",
      cancel: "ביטול",
      close: "סגור",
      copyLink: "העתק קישור",
      copied: "הועתק ללוח!",
    },

    // Form Fields
    form: {
      editTitle: "עריכת פרויקט",
      createTitle: "הוספת פרויקט חדש",
      generalSection: "מידע בסיסי",
      nameLabel: "שם הפרויקט *",
      namePlaceholder: "למשל: עמודי העולם CRM",
      estimatedValueLabel: "שווי מוערך של התוכנית ($)",
      estimatedValuePlaceholder: "למשל: 15,000",
      descriptionLabel: "תיאור קצר",
      descriptionPlaceholder: "תיאור על מהות הפרויקט והמטרות שלו...",
      statusLabel: "סטטוס הפרויקט",
      
      linksSection: "כתובות וקישורים",
      liveUrlLabel: "כתובת אתר חי (Live URL)",
      liveUrlPlaceholder: "https://my-app.vercel.app",
      githubUrlLabel: "קישור ל-GitHub / קוד",
      githubUrlPlaceholder: "https://github.com/...",
      stagingUrlLabel: "קישור ל-Staging / בדיקות",
      stagingUrlPlaceholder: "https://staging.my-app.com",
      adminUrlLabel: "קישור לפאנל ניהול / דשבורד",
      adminUrlPlaceholder: "https://app.supabase.com / admin",

      infraSection: "תשתית, אחסון ומסד נתונים",
      deploymentProviderLabel: "איפה זה Deployed?",
      deploymentAccountLabel: "חשבון / אימייל המאחסן",
      deploymentAccountPlaceholder: "gersh@example.com / Vercel Team",
      databaseTypeLabel: "סוג בסיס הנתונים (Database)",
      databaseNameLabel: "שם מסד הנתונים / חיבור",
      databaseNamePlaceholder: "neondb-prod / supabase-eu",
      techStackLabel: "תגיות טכנולוגיה (הפרד בפסיק)",
      techStackPlaceholder: "React, Next.js, Tailwind, TypeScript",

      ownershipSection: "בעלות ואנשי קשר",
      ownerNameLabel: "למי שייך הפרויקט / לקוח *",
      ownerNamePlaceholder: "עמודי העולם / שקל הקודש / פנימי",
      organizationLabel: "ארגון / מוסד",
      organizationPlaceholder: "מוסדות...",
      contactsTitle: "אנשי קשר רלוונטיים לפרויקט",
      addContact: "+ הוסף איש קשר",
      contactName: "שם איש הקשר",
      contactRole: "תפקיד",
      contactPhone: "טלפון",
      contactEmail: "אימייל",
      contactNotes: "הערות",
      removeContact: "הסר איש קשר",

      notesSection: "הערות וסביבת פיתוח",
      notesLabel: "הערות פיתוח ודגשים",
      notesPlaceholder: "מידע חשוב על פריסה, מפתחות גישה, סביבות הרצה...",
      localPathLabel: "נתיב מקומי במחשב",
      localPathPlaceholder: "C:\\...\\project-name",
    },

    // Scanner
    scanner: {
      title: "סורק פרויקטים אוטומטי",
      desc: "סורק את התיקיות השכנות במחשב ומזהה פרויקטים עם package.json, Vercel, Supabase ועוד.",
      foundProjects: "פרויקטים שזוהו במחשב:",
      importSelected: "ייבא פרויקטים נבחרים",
      alreadyExists: "כבר קיים במאגר",
      newToImport: "חדש לייבוא",
      scanNow: "סרוק עכשיו",
    },

    // Empty States
    emptyState: {
      title: "אין פרויקטים להצגה",
      desc: "הוסף את הפרויקט הראשון שלך או סרוק את התיקיות המקומיות כדי להתחיל.",
    },

    // Switchers
    theme: {
      light: "מצב יום",
      dark: "מצב לילה",
      system: "לפי מערכת",
    },
    lang: "English",
  },

  en: {
    appTitle: "BrightFlow",
    appSubtitle: "Custom Software. Smart Automation. Personal Support.",
    searchPlaceholder: "Search by project name, client, tech stack, or URL...",
    allStatuses: "All Statuses",
    allDeployments: "All Deployments",
    allDatabases: "All Databases",
    allOwners: "All Owners / Clients",
    noResultsFound: "No results found",
    noResultsDesc: "Try adjusting your search terms or clearing the active filters.",
    clearFilters: "Clear Filters",

    // Statuses
    status: {
      live: "Live in Production",
      in_development: "In Development",
      maintenance: "Maintenance",
      paused: "Paused",
      archived: "Archived",
    },

    // View Modes
    views: {
      table: "Table",
      cards: "Cards",
      kanban: "Board (Drag)",
    },

    // Stats
    stats: {
      totalProjects: "Total Projects",
      liveProjects: "Live Projects",
      activeDatabases: "Databases",
      clientsCount: "Clients & Orgs",
      totalValuation: "Portfolio Valuation",
      totalCollected: "Total Collected",
      totalPending: "Outstanding Balance",
    },

    // Billing & Payments
    billing: {
      title: "Billing, Payments & Invoices",
      totalAgreed: "Agreed Valuation",
      totalPaid: "Total Paid",
      remainingBalance: "Balance Due",
      paymentProgress: "Payment Progress",
      paymentsHistory: "Received Payments History",
      recordPayment: "Record Received Payment",
      addPaymentBtn: "+ Add Payment",
      amount: "Amount ($)",
      date: "Payment Date",
      method: "Method",
      reference: "Ref / Receipt #",
      notes: "Notes",
      noPaymentsYet: "No payments recorded yet for this project.",
      methods: {
        bankTransfer: "Bank Transfer",
        creditCard: "Credit Card",
        check: "Check",
        cash: "Cash",
        stripe: "Stripe",
        paypal: "PayPal",
        other: "Other",
      },
      invoicesSection: "Invoices & Billing Statements",
      addInvoiceBtn: "+ Create Invoice",
      invoiceNumber: "Invoice #",
      issueDate: "Issue Date",
      dueDate: "Due Date",
      invoiceStatus: "Invoice Status",
      statusDraft: "Draft",
      statusSent: "Sent",
      statusPaid: "Paid",
      statusOverdue: "Overdue",
      fullyPaid: "Fully Paid",
      partiallyPaid: "Partially Paid",
      unpaid: "Unpaid",
    },

    // Inquiries & Client Feedback
    inquiries: {
      title: "Client Inquiries & Feedback",
      subtitle: "Questions, feature requests, bugs and feedback across all client apps",
      newInquiry: "New Inquiry",
      allTypes: "All Types",
      allStatuses: "All Statuses",
      types: {
        question: "Question",
        feedback: "Feedback & Idea",
        bug: "Bug Report",
        feature_request: "Feature Request",
      },
      statuses: {
        new: "New",
        in_progress: "In Progress",
        resolved: "Resolved",
      },
      replyEmail: "Reply via Email",
      markAsResolved: "Mark as Resolved",
      markInProgress: "Mark In Progress",
      delete: "Delete",
      noInquiries: "No inquiries yet",
      noInquiriesDesc: "When clients submit feedback or questions from their apps, they will appear here in real-time.",
      embedWidget: "Client App Embed Code",
      copyWidgetCode: "Copy Widget Code",
      widgetCopied: "Widget Code Copied!",
    },

    // Table Columns
    table: {
      reorder: "Order",
      projectName: "Project Name",
      status: "Status",
      estimatedValue: "Estimated Value",
      billingStatus: "Billing & Paid",
      deployment: "Hosting & Deployment",
      database: "Database",
      owner: "Owner / Client",
      contacts: "Contacts",
      techStack: "Tech Stack",
      actions: "Actions",
    },

    // Pagination
    pagination: {
      perPage: "Per Page",
      showing: "Showing",
      to: "to",
      of: "of",
      projects: "projects",
      prev: "Previous",
      next: "Next",
      page: "Page",
    },

    // Bulk Actions
    bulk: {
      selectedCount: "{count} projects selected",
      selectAll: "Select all on page",
      clearSelection: "Clear selection",
      changeStatus: "Change Status",
      exportJson: "Export Selected (JSON)",
      deleteSelected: "Delete Selected",
      confirmDeleteTitle: "Delete selected projects?",
      confirmDeleteDesc: "This will remove {count} projects from the catalog. Are you sure?",
      confirm: "Confirm Delete",
      cancel: "Cancel",
    },

    // Action Buttons
    actions: {
      newProject: "Add New Project",
      scanLocal: "Scan Local Folders",
      edit: "Edit Details",
      delete: "Delete Project",
      duplicate: "Duplicate Project",
      viewDetails: "View Details",
      openLive: "Open Live Site",
      openRepo: "Open Repository",
      openAdmin: "Open Admin Panel",
      save: "Save Changes",
      create: "Create Project",
      cancel: "Cancel",
      close: "Close",
      copyLink: "Copy URL",
      copied: "Copied to clipboard!",
    },

    // Form Fields
    form: {
      editTitle: "Edit Project",
      createTitle: "Add New Project",
      generalSection: "Basic Information",
      nameLabel: "Project Name *",
      namePlaceholder: "e.g., Amudei HaOlam CRM",
      estimatedValueLabel: "Estimated Worth / Value ($)",
      estimatedValuePlaceholder: "e.g. 15,000",
      descriptionLabel: "Short Description",
      descriptionPlaceholder: "What is this app built for, key features...",
      statusLabel: "Project Status",

      linksSection: "URLs & Endpoints",
      liveUrlLabel: "Live URL (Production)",
      liveUrlPlaceholder: "https://my-app.vercel.app",
      githubUrlLabel: "GitHub / Repository Link",
      githubUrlPlaceholder: "https://github.com/...",
      stagingUrlLabel: "Staging / Preview Link",
      stagingUrlPlaceholder: "https://staging.my-app.com",
      adminUrlLabel: "Admin / Dashboard Link",
      adminUrlPlaceholder: "https://app.supabase.com / admin",

      infraSection: "Infrastructure, Hosting & Database",
      deploymentProviderLabel: "Where is it Deployed?",
      deploymentAccountLabel: "Deploying Account / Email",
      deploymentAccountPlaceholder: "gersh@example.com / Vercel Team",
      databaseTypeLabel: "Database Engine",
      databaseNameLabel: "Database Instance / Connection Name",
      databaseNamePlaceholder: "neondb-prod / supabase-eu",
      techStackLabel: "Tech Stack Tags (Comma separated)",
      techStackPlaceholder: "React, Next.js, Tailwind, TypeScript",

      ownershipSection: "Ownership & Contacts",
      ownerNameLabel: "Project Owner / Client *",
      ownerNamePlaceholder: "Amudei HaOlam / Shekel HaKodesh / Internal",
      organizationLabel: "Organization",
      organizationPlaceholder: "Institution...",
      contactsTitle: "Relevant Contacts for this Project",
      addContact: "+ Add Contact",
      contactName: "Contact Name",
      contactRole: "Role",
      contactPhone: "Phone",
      contactEmail: "Email",
      contactNotes: "Notes",
      removeContact: "Remove Contact",

      notesSection: "Developer Notes & Environment",
      notesLabel: "Notes & Deployment Instructions",
      notesPlaceholder: "Key reminders, env variables hints, cron jobs...",
      localPathLabel: "Local Folder Path",
      localPathPlaceholder: "C:\\...\\project-name",
    },

    // Scanner
    scanner: {
      title: "Local Project Scanner",
      desc: "Scans sibling directories on your PC to discover apps, package.json files, Vercel configs, and databases.",
      foundProjects: "Discovered Local Projects:",
      importSelected: "Import Selected Projects",
      alreadyExists: "Already in Vault",
      newToImport: "Ready to Import",
      scanNow: "Scan Now",
    },

    // Empty States
    emptyState: {
      title: "No projects to display",
      desc: "Add your first project or run the local directory scanner to get started.",
    },

    // Switchers
    theme: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    lang: "עברית",
  },
};

export function getStatusBadgeVariant(status: ProjectStatus): {
  color: string;
  bg: string;
  border: string;
  dot: string;
} {
  switch (status) {
    case "live":
      return {
        color: "text-emerald-700 dark:text-emerald-300",
        bg: "bg-emerald-50 dark:bg-emerald-950/60",
        border: "border-emerald-200 dark:border-emerald-800",
        dot: "bg-emerald-500",
      };
    case "in_development":
      return {
        color: "text-amber-700 dark:text-amber-300",
        bg: "bg-amber-50 dark:bg-amber-950/60",
        border: "border-amber-200 dark:border-amber-800",
        dot: "bg-amber-500",
      };
    case "maintenance":
      return {
        color: "text-sky-700 dark:text-sky-300",
        bg: "bg-sky-50 dark:bg-sky-950/60",
        border: "border-sky-200 dark:border-sky-800",
        dot: "bg-sky-500",
      };
    case "paused":
      return {
        color: "text-orange-700 dark:text-orange-300",
        bg: "bg-orange-50 dark:bg-orange-950/60",
        border: "border-orange-200 dark:border-orange-800",
        dot: "bg-orange-500",
      };
    case "archived":
      return {
        color: "text-slate-600 dark:text-slate-400",
        bg: "bg-slate-100 dark:bg-slate-900/60",
        border: "border-slate-300 dark:border-slate-800",
        dot: "bg-slate-400",
      };
  }
}
