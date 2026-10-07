"use client";

import * as React from "react";
import { X, ShoppingBag, Plus, Trash2, Check, User, FolderKanban, DollarSign, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order, OrderItem, OrderStatus, Client, Project, Language } from "@/lib/types";
import { generateId } from "@/lib/utils";

interface OrderModalProps {
  isOpen: boolean;
  order?: Order | null;
  clients: Client[];
  projects: Project[];
  onClose: () => void;
  onSave: (orderData: Partial<Order>) => void;
  lang: Language;
}

export function OrderModal({
  isOpen,
  order,
  clients,
  projects,
  onClose,
  onSave,
  lang,
}: OrderModalProps) {
  const isHe = lang === "he";

  const [orderNumber, setOrderNumber] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [clientId, setClientId] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [status, setStatus] = React.useState<OrderStatus>("in_progress");
  const [orderDate, setOrderDate] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [items, setItems] = React.useState<OrderItem[]>([]);

  React.useEffect(() => {
    if (order) {
      setOrderNumber(order.orderNumber || "");
      setTitle(order.title || "");
      setClientId(order.clientId || "");
      setProjectId(order.projectId || "");
      setStatus(order.status || "in_progress");
      setOrderDate(order.orderDate || new Date().toISOString().split("T")[0]);
      setDueDate(order.dueDate || "");
      setNotes(order.notes || "");
      setItems(order.items && order.items.length > 0 ? order.items : [
        { id: "item_1", description: "פיתוח מערכת", quantity: 1, unitPrice: order.amount || 0 }
      ]);
    } else {
      const randomNum = Math.floor(100 + Math.random() * 900);
      setOrderNumber(`ORD-${new Date().getFullYear()}-${randomNum}`);
      setTitle("");
      setClientId(clients[0]?.id || "");
      setProjectId("");
      setStatus("in_progress");
      setOrderDate(new Date().toISOString().split("T")[0]);
      setDueDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
      setNotes("");
      setItems([
        { id: "item_1", description: "אפיון, פיתוח ועיצוב מערכת", quantity: 1, unitPrice: 3500 }
      ]);
    }
  }, [order, isOpen, clients]);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    0
  );

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: `item_${Date.now()}`, description: "", quantity: 1, unitPrice: 0 }
    ]);
  };

  const handleUpdateItem = (id: string, field: keyof OrderItem, val: any) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((i) => i.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedClient = clients.find((c) => c.id === clientId);
    const selectedProject = projects.find((p) => p.id === projectId);

    onSave({
      orderNumber,
      title: title.trim(),
      clientId: selectedClient?.id || clientId,
      clientName: selectedClient?.name || "לקוח כללי",
      projectId: selectedProject?.id || undefined,
      projectName: selectedProject?.name || undefined,
      amount: totalAmount,
      status,
      items,
      orderDate,
      dueDate: dueDate || undefined,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1a1d2e] rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {order ? (isHe ? "עריכת פרטי הזמנה / עסקה" : "Edit Order") : (isHe ? "פתיחת הזמנה ועסקה חדשה" : "New Order / Deal")}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {orderNumber}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Order Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "נושא ההזמנה / כותרת העסקה *" : "Order Title *"}
            </label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isHe ? "לדוגמה: פיתוח מערכת לניהול תשלומים והסעות" : "e.g. Website development & deployment"}
              className="rounded-xl h-10"
            />
          </div>

          {/* Client & Project selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-blue-600" />
                <span>{isHe ? "לקוח מקושר *" : "Client *"}</span>
              </label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.companyName ? `(${c.companyName})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <FolderKanban className="h-3.5 w-3.5 text-indigo-600" />
                <span>{isHe ? "שיוך לפרויקט קיים (אופציונלי)" : "Link to Project (Optional)"}</span>
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">{isHe ? "-- ללא שיוך לפרויקט --" : "-- None --"}</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isHe ? "סטטוס הזמנה" : "Status"}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm"
              >
                <option value="draft">{isHe ? "טיוטה" : "Draft"}</option>
                <option value="quote">{isHe ? "הצעת מחיר" : "Quote"}</option>
                <option value="in_progress">{isHe ? "בביצוע" : "In Progress"}</option>
                <option value="completed">{isHe ? "הושלם" : "Completed"}</option>
                <option value="cancelled">{isHe ? "בוטל" : "Cancelled"}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isHe ? "תאריך פתיחה" : "Order Date"}
              </label>
              <Input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="rounded-xl h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isHe ? "יעד אספקה" : "Due Date"}
              </label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isHe ? "פירוט שירותים ופריטי ההזמנה" : "Line Items"}
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddItem}
                className="rounded-xl h-7 px-2.5 text-xs font-bold gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>{isHe ? "הוסף שורה" : "Add Row"}</span>
              </Button>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5"
                >
                  <Input
                    value={item.description}
                    onChange={(e) => handleUpdateItem(item.id, "description", e.target.value)}
                    placeholder={isHe ? "תיאור השירות / מוצר" : "Item description"}
                    className="flex-1 rounded-xl h-9 text-xs"
                  />
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateItem(item.id, "quantity", Number(e.target.value))}
                    className="w-16 rounded-xl h-9 text-xs text-center"
                    title="כמות"
                  />
                  <div className="relative w-28">
                    <span className="absolute start-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      $
                    </span>
                    <Input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleUpdateItem(item.id, "unitPrice", Number(e.target.value))}
                      className="ps-6 rounded-xl h-9 text-xs font-mono font-bold"
                      title="מחיר ליחידה"
                    />
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Total Price Bar */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                {isHe ? "סה״כ סכום ההזמנה:" : "Total Order Amount:"}
              </span>
              <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                ${totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isHe ? "הערות להזמנה" : "Notes"}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isHe ? "תנאי תשלום, הנחיות מיוחדות..." : "Terms, instructions..."}
              className="w-full p-3 rounded-xl border border-input bg-background text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-10 px-4 text-xs font-bold"
            >
              {isHe ? "ביטול" : "Cancel"}
            </Button>
            <Button
              type="submit"
              className="rounded-xl h-10 px-5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/20"
            >
              <Check className="h-4 w-4 me-1.5" />
              {isHe ? "שמור הזמנה" : "Save Order"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
