import React, { useState } from 'react';
import { Tenant, UserProfile, ViewMode, ThemeColorPalette } from '../types';

interface DashboardViewProps {
  tenant: Tenant;
  user: UserProfile;
  onNavigate: (view: ViewMode) => void;
  onOpenAddProduct: () => void;
  onShowToast: (message: string) => void;
  activePalette?: ThemeColorPalette;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tenant,
  user,
  onNavigate,
  onOpenAddProduct,
  onShowToast,
  activePalette
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [packedOrders, setPackedOrders] = useState<Record<string, boolean>>({});

  const handleCopyLink = () => {
    const url = `https://${tenant.domain}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        onShowToast(`Kiosk URL copied to clipboard: ${tenant.domain}`);
        setTimeout(() => setCopiedLink(false), 2200);
      }).catch(() => {
        onShowToast(`Ready: https://${tenant.domain}`);
      });
    } else {
      onShowToast(`Ready: https://${tenant.domain}`);
    }
  };

  const handleConfirmAndPack = (orderId: string, customerName: string) => {
    setPackedOrders(prev => ({ ...prev, [orderId]: true }));
    onShowToast(`Order packed and marked ready for ${customerName}`);
  };

  const ordersNeedingAction = [
    {
      id: 'ord-1048',
      name: 'Amara Morales',
      initials: 'AM',
      orderNumber: '#1048',
      summary: '1x Monstera Deliciosa, 1x Terracotta Planter',
      amount: '$68.00',
      note: 'Exact change required: $68',
      icon: 'payments'
    },
    {
      id: 'ord-1047',
      name: 'Julien Laurent',
      initials: 'JL',
      orderNumber: '#1047',
      summary: '2x Japanese Secateurs, 1x Canvas Tool Bag',
      amount: '$114.50',
      note: 'Standard Courier Pickup',
      icon: 'local_shipping'
    },
    {
      id: 'ord-1046',
      name: 'Sora Takahashi',
      initials: 'ST',
      orderNumber: '#1046',
      summary: '1x Organic Botanical Mist (250ml)',
      amount: '$24.00',
      note: 'Curbside Pickup (Today, 4 PM)',
      icon: 'storefront'
    }
  ];

  const pendingCount = ordersNeedingAction.filter(o => !packedOrders[o.id]).length;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Merchant Welcome & Status Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff] tracking-tight">
              Good morning, {user.name.split(' ')[0]}
            </h1>
            <span className="text-xl animate-bounce">👋</span>
          </div>
          <p className="text-sm text-[#404942] dark:text-[#9ab0a0] truncate mt-0.5">
            Ready for today's orders & pickups at {tenant.name}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-[#dee9fc] dark:bg-[#1a2535] rounded-full border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="w-2 h-2 rounded-full bg-[#004328] dark:bg-[#8ed6aa] animate-pulse"></span>
          <span className="text-[11px] font-bold text-[#004328] dark:text-[#8ed6aa] uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      {/* Primary Actions Deck */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenAddProduct}
          style={{ backgroundColor: activePalette?.primary || '#004328' }}
          className="flex-1 flex items-center justify-center gap-2 h-12 text-white rounded-xl font-semibold text-sm shadow-md active:scale-[0.98] hover:opacity-90 transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>+ Add New Product</span>
          <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ml-1">
            F2
          </span>
        </button>
        <button
          onClick={() => onNavigate('storefront')}
          className="h-12 w-12 flex items-center justify-center bg-white dark:bg-[#1a2535] text-[#121c2a] dark:text-[#f8f9ff] rounded-xl shadow-xs border border-[#bfc9c0]/40 dark:border-[#27313f] hover:bg-[#eff4ff] dark:hover:bg-[#223045] active:scale-95 transition-all"
          title="View Live Storefront Kiosk"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px] text-[#404942] dark:text-[#9ab0a0]">
            open_in_new
          </span>
        </button>
      </div>

      {/* Quick Shop Link Tactile Banner */}
      <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-4 shadow-sm border border-[#bfc9c0]/30 dark:border-[#27313f] relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] dark:bg-[#223045] flex items-center justify-center text-[#004328] dark:text-[#8ed6aa]">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#707971] dark:text-[#9ab0a0] block uppercase tracking-wider">
                Your Digital Kiosk
              </span>
              <span className="text-sm font-semibold text-[#121c2a] dark:text-[#f8f9ff] font-mono">
                {tenant.domain}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-[#eff4ff] dark:bg-[#223045] text-[#004328] dark:text-[#8ed6aa] px-2.5 py-1 rounded-full">
            QR Ready
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 h-10 px-3 bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-[#f8f9ff] rounded-xl text-xs font-semibold hover:bg-[#dee9fc] dark:hover:bg-[#27313f] active:scale-[0.98] transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">
              {copiedLink ? 'done' : 'content_copy'}
            </span>
            <span>{copiedLink ? 'Copied URL!' : 'Copy Link'}</span>
          </button>
          <a
            href={`https://api.whatsapp.com/send?text=Visit%20${encodeURIComponent(tenant.name)}%20on%20Atelier%20Kiosk:%20https://${tenant.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 h-10 px-3 bg-[#a9f3c5] dark:bg-[#005232] text-[#002111] dark:text-[#a9f3c5] rounded-xl text-xs font-bold active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">share</span>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Essential Daily KPIs Grid (2x2) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-base font-bold text-[#121c2a] dark:text-[#f8f9ff]">Daily Pulse</h2>
          <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0] font-medium">Today vs Yesterday</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Metric 1: Revenue */}
          <div className="bg-white dark:bg-[#1a2535] p-4 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider block">
                Today's Revenue
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#121c2a] dark:text-[#f8f9ff] mt-1 leading-none tracking-tight">
                $420.00
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <span className="material-symbols-outlined text-[16px] text-[#004328] dark:text-[#8ed6aa]">
                trending_up
              </span>
              <span className="text-xs font-bold text-[#004328] dark:text-[#8ed6aa]">+14%</span>
              <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">vs prev.</span>
            </div>
          </div>

          {/* Metric 2: Today's Orders */}
          <div className="bg-white dark:bg-[#1a2535] p-4 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider block">
                Today's Orders
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#121c2a] dark:text-[#f8f9ff] mt-1 leading-none tracking-tight">
                18
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#004328] dark:bg-[#8ed6aa] shrink-0"></span>
              <span className="text-xs text-[#404942] dark:text-[#9ab0a0] font-medium">13 Fulfilled</span>
            </div>
          </div>

          {/* Metric 3: Pending Action */}
          <div className="bg-white dark:bg-[#1a2535] p-4 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider">
                  Pending Action
                </span>
                <span className="w-2 h-2 rounded-full bg-[#9b4500] shrink-0"></span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff] mt-1">
                {pendingCount} Orders
              </div>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdbca] dark:bg-[#682c00] text-[#9b4500] dark:text-[#ffdbca] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[13px]">schedule</span>
                To Pack / Confirm
              </span>
            </div>
          </div>

          {/* Metric 4: Low Stock Alert */}
          <div className="bg-white dark:bg-[#1a2535] p-4 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider">
                  Low Stock
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">warning</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff] mt-1">
                2 Items
              </div>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] dark:bg-[#93000a] text-[#ba1a1a] dark:text-[#ffdad6] text-[11px] font-bold">
                Restock soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Needing Immediate Action (Cash on Delivery Focused) */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#121c2a] dark:text-[#f8f9ff]">
              Orders Needing Action
            </h2>
            <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-[#fd8a42] text-white text-[11px] font-bold flex items-center justify-center">
              {pendingCount}
            </span>
          </div>
          <button
            onClick={() => onNavigate('orders')}
            className="text-xs font-bold text-[#004328] dark:text-[#8ed6aa] hover:underline"
            type="button"
          >
            View All Orders &rarr;
          </button>
        </div>

        {/* Order Cards */}
        <div className="space-y-3">
          {ordersNeedingAction.map(order => {
            const isPacked = packedOrders[order.id];
            return (
              <div
                key={order.id}
                className="bg-white dark:bg-[#1a2535] p-4 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {order.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#121c2a] dark:text-[#f8f9ff] truncate">
                          {order.name}
                        </span>
                        <span className="text-xs text-[#707971] dark:text-[#9ab0a0] font-normal">
                          · {order.orderNumber}
                        </span>
                      </div>
                      <p className="text-xs text-[#404942] dark:text-[#9ab0a0] truncate mt-0.5">
                        {order.summary}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-[#121c2a] dark:text-[#f8f9ff] block">
                      {order.amount}
                    </span>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-[#ffdbca] dark:bg-[#682c00] text-[#9b4500] dark:text-[#ffdbca] text-[10px] font-bold uppercase tracking-wider">
                      COD Due
                    </span>
                  </div>
                </div>

                {/* Action Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-3 pt-3 border-t border-[#bfc9c0]/20 dark:border-[#27313f] bg-[#eff4ff]/40 dark:bg-[#223045]/40 -mx-4 -mb-4 p-3 rounded-b-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-[#404942] dark:text-[#9ab0a0]">
                    <span className="material-symbols-outlined text-[16px] text-[#004328] dark:text-[#8ed6aa]">
                      {order.icon}
                    </span>
                    <span>{order.note}</span>
                  </div>
                  {isPacked ? (
                    <div className="flex items-center gap-1 text-xs font-bold text-[#004328] dark:text-[#8ed6aa]">
                      <span className="material-symbols-outlined text-[18px]">task_alt</span>
                      <span>Packed & Ready</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConfirmAndPack(order.id, order.name)}
                      className="px-4 py-1.5 bg-[#004328] dark:bg-[#0d5c3a] text-white rounded-lg text-xs font-bold active:scale-95 hover:bg-[#0d5c3a] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Confirm & Pack</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Restock Attention Micro Banner */}
      <div className="bg-[#dee9fc] dark:bg-[#1a2535] rounded-2xl p-4 flex items-center justify-between gap-3 border border-[#bfc9c0]/30 dark:border-[#27313f]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#ffdad6] dark:bg-[#93000a] text-[#ba1a1a] dark:text-[#ffdad6] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">inventory</span>
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#121c2a] dark:text-[#f8f9ff] block truncate">
              Low Stock Inventory Alert
            </span>
            <span className="text-xs text-[#404942] dark:text-[#9ab0a0] block truncate">
              Japanese Secateurs (1 left), Eucalyptus Mist (3 left)
            </span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('products')}
          className="shrink-0 text-xs font-bold text-[#004328] dark:text-[#8ed6aa] px-3 py-1.5 rounded-lg bg-white dark:bg-[#223045] shadow-xs hover:bg-[#eff4ff] transition-all"
          type="button"
        >
          Restock Now
        </button>
      </div>

      {/* Micro Operational Toast Note */}
      <div className="flex items-center justify-between p-3.5 bg-[#eff4ff] dark:bg-[#182230] rounded-xl border border-[#bfc9c0]/30 dark:border-[#27313f]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004328] dark:text-[#8ed6aa] text-[20px]">
            verified
          </span>
          <span className="text-xs font-medium text-[#121c2a] dark:text-[#f8f9ff]">
            Store catalog synced with POS terminal & Doorstep Fleet
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#707971] dark:text-[#9ab0a0]">Just now</span>
      </div>
    </div>
  );
};
