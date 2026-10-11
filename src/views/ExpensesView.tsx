import React, { useState } from 'react';
import { Expense, Tenant } from '../types';

interface ExpensesViewProps {
  tenant: Tenant;
  expenses: Expense[];
  onUpdateExpenses: (expenses: Expense[]) => void;
  onShowToast: (message: string) => void;
}

export const ExpensesView: React.FC<ExpensesViewProps> = ({
  tenant,
  expenses,
  onUpdateExpenses,
  onShowToast
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Expense | null>(null);

  // New expense form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Expense['category']>('Packaging');
  const [amount, setAmount] = useState('');
  const [supplier, setSupplier] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Corporate Visa ****4021');

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const reconciledExpenses = expenses.filter(e => e.status === 'Reconciled').reduce((sum, e) => sum + e.amount, 0);

  const categories = ['All', 'Packaging', 'Logistics', 'Raw Materials', 'Studio Rent', 'Software & Tools', 'Marketing'];

  const filtered = expenses.filter(e => {
    const matchesCat = filterCategory === 'All' || e.category === filterCategory;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      title,
      category,
      amount: parseFloat(amount) || 0,
      date: 'Just now',
      supplier: supplier || 'Local Vendor',
      paymentMethod,
      status: 'Reconciled',
      receiptName: `${title.replace(/\s+/g, '_').substring(0, 15)}_receipt.pdf`
    };

    onUpdateExpenses([newExp, ...expenses]);
    setIsAddOpen(false);
    setTitle('');
    setAmount('');
    setSupplier('');
    onShowToast(`Logged expense: ${newExp.title} ($${newExp.amount.toFixed(2)})`);
  };

  const handleToggleStatus = (id: string) => {
    const updated = expenses.map(e => {
      if (e.id === id) {
        const nextStatus: Expense['status'] = e.status === 'Reconciled' ? 'Pending Receipt' : 'Reconciled';
        return { ...e, status: nextStatus };
      }
      return e;
    });
    onUpdateExpenses(updated);
    onShowToast('Expense audit status updated');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0] mb-0.5">
            <span>Operating Operations</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#004328] dark:text-[#8ed6aa]">Expenses & Receipts</span>
          </div>
          <h1 className="text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff]">
            Expenses, Operating Costs & Receipts
          </h1>
          <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-0.5">
            Track workshop supply costs, courier freight, rent, and reconciled tax receipts for {tenant.name}.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#004328] dark:bg-[#0d5c3a] text-white text-xs font-bold shadow-md hover:bg-[#0d5c3a] transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          <span>+ Log Expense</span>
        </button>
      </div>

      {/* KPI Cards: Spend vs Cash Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1a2535] p-5 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Total Operating Burn
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#121c2a] dark:text-white mt-1">
            ${totalExpenses.toFixed(2)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#004328] dark:text-[#8ed6aa] font-bold mt-2">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>${reconciledExpenses.toFixed(2)} Reconciled</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2535] p-5 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Gross Sales Volume
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#004328] dark:text-[#8ed6aa] mt-1">
            $14,820.00
          </div>
          <div className="flex items-center gap-1 text-xs text-[#707971] dark:text-[#9ab0a0] mt-2">
            <span>Operating Margin: 84.3%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2535] p-5 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Net Operating Profit
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#004328] dark:text-[#8ed6aa] mt-1">
            ${(14820 - totalExpenses).toFixed(2)}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#004328] dark:text-[#8ed6aa] font-semibold mt-2">
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
            <span>Healthy Artisan Studio Cashflow</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-3 text-[20px] text-[#707971] dark:text-[#9ab0a0]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-white dark:bg-[#1a2535] text-sm text-[#121c2a] dark:text-white rounded-xl border border-[#bfc9c0]/30 dark:border-[#27313f] outline-none placeholder:text-[#707971]"
            placeholder="Search expenses by title or supplier..."
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-[#004328] text-white shadow-xs'
                  : 'bg-white dark:bg-[#1a2535] text-[#121c2a] dark:text-white border border-[#bfc9c0]/30 hover:bg-[#eff4ff]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white dark:bg-[#1a2535] rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] overflow-hidden">
        <div className="p-4 border-b border-[#bfc9c0]/20 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
            Recorded Ledger ({filtered.length} entries)
          </h3>
          <button
            onClick={() => onShowToast('Exported expense ledger to CSV for tax accounting')}
            className="text-xs font-semibold text-[#004328] dark:text-[#8ed6aa] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            <span>Export Tax Report</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#eff4ff] dark:bg-[#182230] text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider font-bold text-[10px]">
                <th className="p-3.5">Expense Description</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Supplier / Payee</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Receipt Attachment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bfc9c0]/15 text-[#121c2a] dark:text-[#f8f9ff]">
              {filtered.map(exp => (
                <tr key={exp.id} className="hover:bg-[#eff4ff]/40 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold">{exp.title}</div>
                    <div className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">{exp.date} &bull; {exp.paymentMethod}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] dark:bg-[#223045] font-semibold text-[10px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="p-3.5 font-extrabold text-sm text-[#004328] dark:text-[#8ed6aa]">
                    ${exp.amount.toFixed(2)}
                  </td>
                  <td className="p-3.5 text-xs font-medium text-[#707971] dark:text-[#bfc9c0]">
                    {exp.supplier}
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => handleToggleStatus(exp.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                        exp.status === 'Reconciled'
                          ? 'bg-[#a9f3c5] text-[#002111] dark:bg-[#005232] dark:text-[#a9f3c5]'
                          : 'bg-[#ffdad6] text-[#ba1a1a] dark:bg-[#93000a] dark:text-[#ffdad6]'
                      }`}
                    >
                      {exp.status}
                    </button>
                  </td>
                  <td className="p-3.5 text-right">
                    {exp.receiptName ? (
                      <button
                        onClick={() => setSelectedReceipt(exp)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#004328] dark:text-[#8ed6aa] hover:underline"
                      >
                        <span className="material-symbols-outlined text-[15px]">description</span>
                        <span className="truncate max-w-[120px]">{exp.receiptName}</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#707971] italic">No slip</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Expense Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-[#eff4ff] dark:bg-[#182230] border-b border-[#bfc9c0]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004328] dark:text-[#8ed6aa] text-[20px]">
                  receipt_long
                </span>
                <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
                  Log Operating Expense
                </h3>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="w-7 h-7 flex items-center justify-center text-[#707971]">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                  Expense Description *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 500x Biodegradable Cornstarch Mailers"
                  className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                  >
                    <option value="Packaging">Packaging</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Raw Materials">Raw Materials</option>
                    <option value="Studio Rent">Studio Rent</option>
                    <option value="Software & Tools">Software & Tools</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Amount ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="245.50"
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-bold text-[#121c2a] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Supplier / Vendor
                  </label>
                  <input
                    type="text"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    placeholder="e.g. EcoPack Northwest"
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#eff4ff]/60 dark:bg-[#223045]/60 rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#707971]">Attach Receipt Slip</span>
                <span className="font-bold text-[#004328] dark:text-[#8ed6aa] cursor-pointer hover:underline">
                  + Choose PDF/PNG
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#bfc9c0]/20">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#004328] text-white shadow-xs hover:bg-[#0d5c3a]"
                >
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Receipt Preview Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#bfc9c0]/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#004328] dark:text-[#8ed6aa]">
                  verified
                </span>
                <h4 className="text-sm font-bold text-[#121c2a] dark:text-white">
                  Audited Receipt Voucher
                </h4>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="w-7 h-7 flex items-center justify-center text-[#707971]">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-4 bg-[#eff4ff] dark:bg-[#223045] rounded-2xl font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#707971]">Voucher Item:</span>
                <span className="font-bold text-[#121c2a] dark:text-white text-right max-w-[200px] truncate">{selectedReceipt.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707971]">Supplier:</span>
                <span className="font-bold">{selectedReceipt.supplier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707971]">Amount:</span>
                <span className="font-extrabold text-[#004328] dark:text-[#8ed6aa]">${selectedReceipt.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707971]">Status:</span>
                <span className="text-[#005232] font-bold">{selectedReceipt.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707971]">Doc Ref:</span>
                <span className="truncate">{selectedReceipt.receiptName}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 bg-[#004328] text-white rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
