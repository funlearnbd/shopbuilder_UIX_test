import React, { useState } from 'react';
import { PurchaseOrder, Product, Tenant } from '../types';

interface PurchasesViewProps {
  tenant: Tenant;
  purchaseOrders: PurchaseOrder[];
  onUpdatePurchaseOrders: (orders: PurchaseOrder[]) => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  onShowToast: (message: string) => void;
}

export const PurchasesView: React.FC<PurchasesViewProps> = ({
  tenant,
  purchaseOrders,
  onUpdatePurchaseOrders,
  products,
  onUpdateProducts,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'received'>('all');
  const [selectedPoToReceive, setSelectedPoToReceive] = useState<PurchaseOrder | null>(null);
  const [isCreatePoOpen, setIsCreatePoOpen] = useState(false);

  // New PO State
  const [supplierName, setSupplierName] = useState('');
  const [supplierContact, setSupplierContact] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [orderedQty, setOrderedQty] = useState('50');
  const [unitCost, setUnitCost] = useState('12.00');
  const [notes, setNotes] = useState('Standard batch replenishment');

  const filteredOrders = purchaseOrders.filter(po => {
    if (activeTab === 'pending') return po.status === 'Sent' || po.status === 'Partially Received';
    if (activeTab === 'received') return po.status === 'Received';
    return true;
  });

  // Execute Stock-In & Inventory Increment
  const handleConfirmStockIn = (po: PurchaseOrder) => {
    // 1. Mark PO as Received
    const updatedPoList = purchaseOrders.map(p => {
      if (p.id === po.id) {
        return {
          ...p,
          status: 'Received' as const,
          items: p.items.map(item => ({ ...item, receivedQty: item.orderedQty }))
        };
      }
      return p;
    });
    onUpdatePurchaseOrders(updatedPoList);

    // 2. Increment stock in products catalog
    const updatedProducts = products.map(prod => {
      const match = po.items.find(item => item.productId === prod.id);
      if (match) {
        const addedQty = match.orderedQty - match.receivedQty;
        const newStock = prod.stock + Math.max(0, addedQty);
        return {
          ...prod,
          stock: newStock,
          inStock: true,
          active: true,
          badge: newStock <= 3 ? `Low Stock (${newStock} left)` : 'Active'
        };
      }
      return prod;
    });
    onUpdateProducts(updatedProducts);

    setSelectedPoToReceive(null);
    onShowToast(`Stock-In complete! Received batch for ${po.poNumber}. Live inventory updated.`);
  };

  const handleCreatePo = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === selectedProductId) || products[0];
    const qty = parseInt(orderedQty) || 10;
    const cost = parseFloat(unitCost) || 10;

    const newPo: PurchaseOrder = {
      id: `po-${Date.now()}`,
      poNumber: `PO-2026-${Math.floor(100 + Math.random() * 900)}`,
      supplierName: supplierName || 'Artisan Guild',
      supplierContact: supplierContact || 'orders@supplier.com',
      date: 'Today',
      expectedDelivery: 'In 5 business days',
      status: 'Sent',
      items: [
        {
          productId: prod.id,
          productTitle: prod.title,
          sku: prod.sku,
          orderedQty: qty,
          receivedQty: 0,
          unitCost: cost
        }
      ],
      totalCost: qty * cost,
      notes
    };

    onUpdatePurchaseOrders([newPo, ...purchaseOrders]);
    setIsCreatePoOpen(false);
    setSupplierName('');
    setSupplierContact('');
    onShowToast(`Generated Purchase Order ${newPo.poNumber} for ${prod.title}`);
  };

  const totalPoSpend = purchaseOrders.reduce((sum, po) => sum + po.totalCost, 0);
  const pendingUnitsCount = purchaseOrders
    .filter(po => po.status !== 'Received' && po.status !== 'Cancelled')
    .reduce((sum, po) => sum + po.items.reduce((acc, it) => acc + (it.orderedQty - it.receivedQty), 0), 0);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0] mb-0.5">
            <span>Inventory Supply Chain</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#004328] dark:text-[#8ed6aa]">Purchases & Stock-In</span>
          </div>
          <h1 className="text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff]">
            Purchases & Stock-In Inventory Management
          </h1>
          <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-0.5">
            Issue supplier purchase orders, reconcile batch deliveries, and stock-in received units directly into {tenant.name}.
          </p>
        </div>

        <button
          onClick={() => setIsCreatePoOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#004328] dark:bg-[#0d5c3a] text-white text-xs font-bold shadow-md hover:bg-[#0d5c3a] transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_business</span>
          <span>+ New Purchase Order</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1a2535] p-5 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Inbound Stock Pipeline
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#004328] dark:text-[#8ed6aa] mt-1">
            {pendingUnitsCount} Units
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#707971] dark:text-[#9ab0a0] mt-2">
            <span>Awaiting delivery & inspection</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2535] p-5 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Active Purchase Orders
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#121c2a] dark:text-white mt-1">
            {purchaseOrders.filter(p => p.status !== 'Received').length} Active
          </div>
          <div className="flex items-center gap-1 text-xs text-[#9b4500] dark:text-[#ffb68e] font-bold mt-2">
            <span>3 Artisan Suppliers</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2535] p-5 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Total Supply Investment
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#121c2a] dark:text-white mt-1">
            ${totalPoSpend.toFixed(2)}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#004328] dark:text-[#8ed6aa] font-semibold mt-2">
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
            <span>Average Margin: 54% Markup</span>
          </div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 border-b border-[#bfc9c0]/20 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#004328] text-white shadow-xs'
              : 'text-[#707971] hover:text-[#121c2a]'
          }`}
        >
          All Orders ({purchaseOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pending'
              ? 'bg-[#004328] text-white shadow-xs'
              : 'text-[#707971] hover:text-[#121c2a]'
          }`}
        >
          Inbound & Partial ({purchaseOrders.filter(p => p.status !== 'Received').length})
        </button>
        <button
          onClick={() => setActiveTab('received')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'received'
              ? 'bg-[#004328] text-white shadow-xs'
              : 'text-[#707971] hover:text-[#121c2a]'
          }`}
        >
          Fully Received & Stocked ({purchaseOrders.filter(p => p.status === 'Received').length})
        </button>
      </div>

      {/* PO List Cards */}
      <div className="space-y-4">
        {filteredOrders.map(po => {
          const isReceived = po.status === 'Received';
          const isPartial = po.status === 'Partially Received';

          return (
            <div
              key={po.id}
              className="bg-white dark:bg-[#1a2535] rounded-2xl p-5 shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sm font-extrabold text-[#004328] dark:text-[#8ed6aa]">
                    {po.poNumber}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isReceived
                      ? 'bg-[#a9f3c5] text-[#002111] dark:bg-[#005232] dark:text-[#a9f3c5]'
                      : isPartial
                      ? 'bg-[#ffdbca] text-[#9b4500] dark:bg-[#682c00] dark:text-[#ffdbca]'
                      : 'bg-[#eff4ff] text-[#005232] dark:bg-[#223045] dark:text-[#a9f3c5]'
                  }`}>
                    {po.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#707971] dark:text-[#9ab0a0]">
                  <span>Ordered: {po.date}</span>
                  <span>&bull;</span>
                  <span>Est. Arrival: <strong>{po.expectedDelivery}</strong></span>
                </div>
              </div>

              {/* Supplier Info */}
              <div className="p-3 bg-[#eff4ff]/60 dark:bg-[#223045]/60 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#121c2a] dark:text-white block">{po.supplierName}</span>
                  <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">{po.supplierContact}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#707971] block">PO Total Value</span>
                  <span className="font-extrabold text-[#004328] dark:text-[#8ed6aa] text-sm">
                    ${po.totalCost.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items Breakdown Table */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-[#707971] tracking-wider">
                  Requisitioned Items
                </div>
                {po.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-[#bfc9c0]/20 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#121c2a] dark:text-white">{item.productTitle}</span>
                      <span className="text-[10px] font-mono text-[#707971] ml-2">SKU: {item.sku}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#707971]">
                        Ordered: <strong>{item.orderedQty}</strong> &bull; Received: <strong>{item.receivedQty}</strong>
                      </span>
                      <span className="font-bold text-[#004328] dark:text-[#8ed6aa]">
                        ${(item.unitCost * item.orderedQty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#bfc9c0]/20">
                <p className="text-[11px] text-[#707971] italic truncate max-w-md">
                  {po.notes || 'Requisition logged in central warehouse.'}
                </p>

                {!isReceived ? (
                  <button
                    onClick={() => setSelectedPoToReceive(po)}
                    className="px-4 py-2 bg-[#004328] dark:bg-[#0d5c3a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs hover:bg-[#0d5c3a]"
                  >
                    <span className="material-symbols-outlined text-[16px]">inventory</span>
                    <span>Receive & Stock-In Units</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#004328] dark:text-[#8ed6aa]">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Stock-In Confirmed & Shelved</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stock-In Modal */}
      {selectedPoToReceive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#bfc9c0]/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004328] dark:text-[#8ed6aa] text-[22px]">
                  inventory
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
                    Confirm Stock-In: {selectedPoToReceive.poNumber}
                  </h3>
                  <span className="text-[10px] text-[#707971]">Supplier: {selectedPoToReceive.supplierName}</span>
                </div>
              </div>
              <button onClick={() => setSelectedPoToReceive(null)} className="w-7 h-7 flex items-center justify-center text-[#707971]">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#404942] dark:text-[#9ab0a0]">
                Inspect arriving crates. Confirming stock-in will automatically add these inventory units to your live customer catalog and clear sold-out badges.
              </p>

              {selectedPoToReceive.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#eff4ff] dark:bg-[#223045] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold block">{item.productTitle}</span>
                    <span className="text-[10px] text-[#707971]">SKU: {item.sku} &bull; Unit Cost: ${item.unitCost.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#004328] dark:text-[#8ed6aa]">
                      +{item.orderedQty - item.receivedQty} Units
                    </span>
                    <span className="block text-[10px] text-[#707971]">Ready to shelve</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#bfc9c0]/20">
              <button
                onClick={() => setSelectedPoToReceive(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmStockIn(selectedPoToReceive)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#004328] text-white shadow-xs hover:bg-[#0d5c3a]"
              >
                Confirm Stock-In & Update Inventory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New PO Modal */}
      {isCreatePoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-[#eff4ff] dark:bg-[#182230] border-b border-[#bfc9c0]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004328] dark:text-[#8ed6aa] text-[20px]">
                  add_business
                </span>
                <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
                  Issue Supplier Purchase Order
                </h3>
              </div>
              <button onClick={() => setIsCreatePoOpen(false)} className="w-7 h-7 flex items-center justify-center text-[#707971]">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreatePo} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Supplier Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    placeholder="e.g. Willamette Clayworks"
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Supplier Contact Email
                  </label>
                  <input
                    type="email"
                    value={supplierContact}
                    onChange={(e) => setSupplierContact(e.target.value)}
                    placeholder="orders@supplier.com"
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                  Catalog Product Requisition *
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} (Current Stock: {p.stock} units)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Ordered Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={orderedQty}
                    onChange={(e) => setOrderedQty(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-bold text-[#121c2a] dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Unit Cost ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={unitCost}
                    onChange={(e) => setUnitCost(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-bold text-[#121c2a] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                  Notes / Batch Specifications
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#bfc9c0]/20">
                <button
                  type="button"
                  onClick={() => setIsCreatePoOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#004328] text-white shadow-xs hover:bg-[#0d5c3a]"
                >
                  Dispatch Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
