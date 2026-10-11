import React, { useState } from 'react';
import { Order, ThemeColorPalette } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
  onShowToast: (message: string) => void;
  activePalette?: ThemeColorPalette;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onUpdateOrders,
  onShowToast,
  activePalette
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  // Filter tabs
  const tabs = [
    { id: 'all', label: 'All', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length, pulse: true },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ];

  // Calculate pending cash to collect
  const pendingCashToCollect = orders
    .filter(o => o.codStatus === 'COD Due' && (o.status === 'pending' || o.status === 'processing'))
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const activeDispatches = orders.filter(o => o.status === 'processing').length;

  const handleConfirmOrder = (orderId: string) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'processing' as const,
          placedTimeAgo: 'Just confirmed • Packed'
        };
      }
      return o;
    });
    onUpdateOrders(updated);
    const ord = orders.find(o => o.id === orderId);
    onShowToast(`Order #${ord?.orderNumber} confirmed & assigned to dispatch queue`);
  };

  const handleMarkDispatched = (orderId: string) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'delivered' as const,
          codStatus: 'COD Received' as const,
          placedTimeAgo: 'Delivered & Paid doorstep'
        };
      }
      return o;
    });
    onUpdateOrders(updated);
    const ord = orders.find(o => o.id === orderId);
    onShowToast(`Order #${ord?.orderNumber} successfully marked Delivered & Cash Collected!`);
  };

  const filteredOrders = orders.filter(o => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      o.customerName.toLowerCase().includes(query) ||
      o.orderNumber.toLowerCase().includes(query) ||
      o.phone.toLowerCase().includes(query) ||
      o.address.toLowerCase().includes(query);
    const matchesStatus = selectedStatus === 'all' || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Dynamic Operational Stat Summary Banner */}
      <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-4 shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ffdbca] dark:bg-[#682c00] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#9b4500] dark:text-[#ffdbca] text-[20px]">
              payments
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
              Pending Cash to Collect
            </span>
            <span className="text-base sm:text-lg font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
              ${pendingCashToCollect.toFixed(2)}{' '}
              <span className="text-xs text-[#9b4500] dark:text-[#ffb68e] font-semibold ml-1">
                · {activeDispatches} active dispatches
              </span>
            </span>
          </div>
        </div>
        <button
          onClick={() => onShowToast('Synchronized with courier cash receipts & doorstep driver terminals')}
          className="h-9 px-3 bg-[#eff4ff] dark:bg-[#223045] rounded-xl flex items-center gap-1.5 text-[#121c2a] dark:text-[#f8f9ff] hover:bg-[#dee9fc] transition-all text-xs font-semibold"
          type="button"
        >
          <span className="material-symbols-outlined text-[17px] text-[#707971] dark:text-[#9ab0a0]">
            sync
          </span>
          <span>Sync</span>
        </button>
      </div>

      {/* Search & Quick Filter Pills */}
      <div className="space-y-2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#707971] dark:text-[#9ab0a0]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-10 bg-white dark:bg-[#1a2535] text-[#121c2a] dark:text-[#f8f9ff] placeholder:text-[#707971] dark:placeholder:text-[#9ab0a0] text-sm rounded-xl focus:outline-none shadow-xs border border-[#bfc9c0]/40 dark:border-[#27313f]"
            placeholder="Search customer, #ORD, or phone..."
            type="search"
          />
          <button
            onClick={() => onShowToast('Filter options active: Sorted by recent order placements')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#707971] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map(tab => {
            const isActive = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`shrink-0 h-9 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#004328] dark:bg-[#0d5c3a] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1a2535] text-[#121c2a] dark:text-[#f8f9ff] border border-[#bfc9c0]/30 dark:border-[#27313f] hover:bg-[#eff4ff]'
                }`}
                type="button"
              >
                {tab.pulse && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#fd8a42] animate-pulse shrink-0"></span>
                )}
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#eff4ff] dark:bg-[#223045] text-[#707971] dark:text-[#9ab0a0]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Order Cards Feed */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center bg-white dark:bg-[#1a2535] rounded-2xl border border-[#bfc9c0]/30 dark:border-[#27313f] p-6">
            <span className="material-symbols-outlined text-4xl text-[#707971] mb-2">search_off</span>
            <h4 className="text-base font-bold text-[#121c2a] dark:text-[#f8f9ff]">No matching orders found</h4>
            <p className="text-xs text-[#707971] dark:text-[#9ab0a0] mt-1">
              Try searching with a different name, order ID, or clear the status filter.
            </p>
          </div>
        ) : (
          filteredOrders.map(order => {
            return (
              <article
                key={order.id}
                className="bg-white dark:bg-[#1a2535] rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] p-4 flex flex-col gap-3 transition-all"
              >
                {/* Header Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
                        #ORD-{order.orderNumber}
                      </span>
                      {order.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#9b4500] dark:text-[#ffdbca] bg-[#ffdbca] dark:bg-[#682c00] px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9b4500]"></span>
                          Pending Confirmation
                        </span>
                      )}
                      {order.status === 'processing' && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#005232] dark:text-[#a9f3c5] bg-[#a9f3c5] dark:bg-[#005232] px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004328]"></span>
                          Ready to Dispatch
                        </span>
                      )}
                      {order.status === 'delivered' && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#004328] dark:text-[#a9f3c5] bg-[#eff4ff] dark:bg-[#223045] px-2 py-0.5 rounded-full">
                          <span className="material-symbols-outlined text-[13px]">task_alt</span>
                          Delivered & Paid
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0] mt-0.5">
                      {order.placedTimeAgo} · {order.items.length} items ({order.itemsSummary})
                    </span>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-lg font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                    <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mt-1 ${
                      order.codStatus === 'COD Received'
                        ? 'bg-[#eff4ff] dark:bg-[#223045] text-[#004328] dark:text-[#8ed6aa]'
                        : 'bg-[#ffdbca] dark:bg-[#682c00] text-[#9b4500] dark:text-[#ffdbca]'
                    }`}>
                      <span className="material-symbols-outlined text-[12px]">
                        {order.codStatus === 'COD Received' ? 'check' : 'local_atm'}
                      </span>
                      <span>{order.codStatus === 'COD Received' ? 'COD Received' : 'Collect $' + order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Customer & Contact Snippet */}
                <div className="bg-[#eff4ff] dark:bg-[#223045] rounded-xl p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#dee9fc] dark:bg-[#1a2535] text-[#121c2a] dark:text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {order.customerInitials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#121c2a] dark:text-[#f8f9ff] truncate">
                        {order.customerName}
                      </span>
                      <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0] truncate font-mono">
                        {order.phone}
                      </span>
                    </div>
                  </div>
                  {/* Quick Verification CTAs (WhatsApp & Call) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white dark:bg-[#1a2535] flex items-center justify-center text-[#004328] dark:text-[#8ed6aa] hover:bg-[#004328] hover:text-white transition-colors shadow-xs"
                      title={`WhatsApp ${order.customerName}`}
                    >
                      <span className="material-symbols-outlined text-[17px]">chat</span>
                    </a>
                    <a
                      href={`tel:${order.phone}`}
                      className="w-8 h-8 rounded-full bg-white dark:bg-[#1a2535] flex items-center justify-center text-[#004328] dark:text-[#8ed6aa] hover:bg-[#004328] hover:text-white transition-colors shadow-xs"
                      title={`Call ${order.customerName}`}
                    >
                      <span className="material-symbols-outlined text-[17px]">call</span>
                    </a>
                  </div>
                </div>

                {/* Delivery Address Snippet */}
                <div className="flex items-start gap-2 pt-0.5">
                  <span className="material-symbols-outlined text-[17px] text-[#707971] dark:text-[#9ab0a0] shrink-0 mt-0.5">
                    location_on
                  </span>
                  <p className="text-xs text-[#404942] dark:text-[#9ab0a0] leading-snug line-clamp-1">
                    {order.address} {order.gateCode && `· ${order.gateCode}`}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="pt-1 flex items-center gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleConfirmOrder(order.id)}
                      style={{ backgroundColor: activePalette?.primary || '#004328' }}
                      className="flex-1 h-11 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-xs"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Confirm Order & Prepare COD</span>
                    </button>
                  )}

                  {order.status === 'processing' && (
                    <button
                      onClick={() => handleMarkDispatched(order.id)}
                      style={{ backgroundColor: activePalette?.primary || '#004328' }}
                      className="flex-1 h-11 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-xs"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                      <span>Mark Dispatched (With Courier)</span>
                    </button>
                  )}

                  {order.status === 'delivered' && (
                    <button
                      onClick={() => setSelectedReceiptOrder(order)}
                      className="w-full h-11 bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-[#f8f9ff] hover:bg-[#dee9fc] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#004328] dark:text-[#8ed6aa]">
                        receipt
                      </span>
                      <span>View Official COD Receipt & Driver Log</span>
                    </button>
                  )}

                  {order.status !== 'delivered' && (
                    <button
                      onClick={() => setSelectedReceiptOrder(order)}
                      className="w-11 h-11 bg-[#eff4ff] dark:bg-[#223045] text-[#404942] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white rounded-xl flex items-center justify-center transition-colors shadow-xs"
                      title="Print Invoice / Packing Slip"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[19px]">print</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Official Receipt & Driver Log Modal */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#1a2535] rounded-2xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 bg-[#004328] text-white">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                <span className="font-bold text-sm">Official Doorstep COD Invoice & Log</span>
              </div>
              <button
                onClick={() => setSelectedReceiptOrder(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/20 text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs font-mono">
              <div className="text-center pb-3 border-b border-dashed border-[#bfc9c0]/40 dark:border-[#27313f]">
                <div className="text-base font-bold text-[#121c2a] dark:text-white font-sans">
                  MAISON BOTANICA ATELIER
                </div>
                <div className="text-[#707971] text-[11px] mt-0.5">
                  Studio 14, Arts Precinct, Portland OR · Direct Dispatch Kiosk
                </div>
                <div className="mt-2 text-[11px] font-bold bg-[#eff4ff] dark:bg-[#223045] text-[#004328] dark:text-[#8ed6aa] py-1 px-3 rounded-full inline-block">
                  DOORSTEP CASH SETTLEMENT SLIP #{selectedReceiptOrder.orderNumber}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#707971]">Customer:</span>
                  <span className="font-bold text-[#121c2a] dark:text-white">{selectedReceiptOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707971]">Phone:</span>
                  <span className="text-[#121c2a] dark:text-white">{selectedReceiptOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707971]">Address:</span>
                  <span className="text-[#121c2a] dark:text-white text-right max-w-[240px] truncate">{selectedReceiptOrder.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707971]">Assigned Courier:</span>
                  <span className="text-[#121c2a] dark:text-white">{selectedReceiptOrder.courierName || 'Apex Fleet Van #02'}</span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="pt-2 border-t border-dashed border-[#bfc9c0]/40 dark:border-[#27313f] space-y-2">
                <div className="font-bold text-[#707971] uppercase tracking-wider text-[10px]">
                  Order Items
                </div>
                {selectedReceiptOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.qty}x {item.title}</span>
                    <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-[#707971]">
                  <span>Doorstep Fragile Handling</span>
                  <span>$0.00 (Waived)</span>
                </div>
              </div>

              {/* Total & Stamp */}
              <div className="pt-3 border-t-2 border-[#121c2a] dark:border-white space-y-1 text-sm font-bold">
                <div className="flex justify-between">
                  <span>TOTAL CASH DUE ON ARRIVAL:</span>
                  <span className="text-base text-[#004328] dark:text-[#8ed6aa]">
                    ${selectedReceiptOrder.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-normal text-[#707971]">
                  <span>Status:</span>
                  <span className="font-bold uppercase text-[#004328] dark:text-[#8ed6aa]">
                    {selectedReceiptOrder.codStatus}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#eff4ff] dark:bg-[#223045] rounded-xl text-center text-[10px] text-[#404942] dark:text-[#9ab0a0]">
                Customer Inspection Right Guaranteed. If not completely satisfied at doorstep, return with driver without payment.
              </div>
            </div>

            <div className="p-4 bg-[#eff4ff] dark:bg-[#182230] border-t border-[#bfc9c0]/20 dark:border-[#27313f] flex items-center justify-between">
              <button
                onClick={() => {
                  window.print();
                  onShowToast('Printing receipt...');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#004328] text-white shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Packing Slip</span>
              </button>
              <button
                onClick={() => setSelectedReceiptOrder(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#223045] text-[#121c2a] dark:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
