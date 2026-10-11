import React from 'react';
import { ViewMode, ThemeColorPalette } from '../types';

interface SidebarNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  pendingOrdersCount: number;
  lowStockCount: number;
  activePalette?: ThemeColorPalette;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentView,
  onNavigate,
  pendingOrdersCount,
  lowStockCount,
  activePalette
}) => {
  const managementNav = [
    {
      id: 'dashboard' as ViewMode,
      label: 'Overview',
      icon: 'dashboard',
      badge: null
    },
    {
      id: 'orders' as ViewMode,
      label: 'Orders & COD',
      icon: 'local_shipping',
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : null,
      badgeColor: 'bg-[#9b4500] text-white'
    },
    {
      id: 'products' as ViewMode,
      label: 'Catalog & Inventory',
      icon: 'inventory_2',
      badge: lowStockCount > 0 ? `${lowStockCount} Low` : null,
      badgeColor: 'bg-[#ffdad6] text-[#93000a] dark:bg-[#93000a] dark:text-[#ffdad6]'
    },
    {
      id: 'purchases' as ViewMode,
      label: 'Purchases & Stock-In',
      icon: 'move_to_inbox',
      badge: 'Auto Sync'
    },
    {
      id: 'expenses' as ViewMode,
      label: 'Expenses & Receipts',
      icon: 'receipt_long',
      badge: null
    },
    {
      id: 'analytics' as ViewMode,
      label: 'Merchant Analytics',
      icon: 'monitoring',
      badge: 'Live',
      badgeColor: 'bg-[#a9f3c5] text-[#002111] dark:bg-[#005232] dark:text-[#a9f3c5]'
    }
  ];

  const storefrontNav = [
    {
      id: 'storefront' as ViewMode,
      label: 'Live Storefront',
      icon: 'storefront',
      badge: null
    },
    {
      id: 'themes' as ViewMode,
      label: 'Appearance & Themes',
      icon: 'palette',
      badge: '6 Themes'
    },
    {
      id: 'marketing' as ViewMode,
      label: 'Marketing & Reviews',
      icon: 'campaign',
      badge: 'Coupons'
    },
    {
      id: 'payments' as ViewMode,
      label: 'Payment & COD Rules',
      icon: 'payments',
      badge: 'COD Active'
    },
    {
      id: 'developer' as ViewMode,
      label: 'Backend API Integration',
      icon: 'terminal',
      badge: 'REST Docs'
    },
    {
      id: 'settings' as ViewMode,
      label: 'Store Settings',
      icon: 'settings',
      badge: null
    }
  ];

  return (
    <aside className="w-64 xl:w-72 shrink-0 bg-white dark:bg-[#111927] border-r border-[#bfc9c0]/30 dark:border-[#27313f] flex flex-col justify-between py-6 px-4 transition-colors duration-200">
      <div className="space-y-6">
        {/* Brand Console Label */}
        <div className="px-3 flex items-center gap-2.5">
          <div 
            style={{ backgroundColor: activePalette?.primary || '#004328' }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs transition-colors duration-300"
          >
            <span className="material-symbols-outlined text-[20px]">local_florist</span>
          </div>
          <div>
            <div className="font-bold text-sm text-[#121c2a] dark:text-[#f8f9ff]">
              Botanica Console
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#707971] dark:text-[#9ab0a0]">
              Merchant Operations
            </div>
          </div>
        </div>

        {/* Management Navigation Group */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Management
          </div>
          {managementNav.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={isActive ? { backgroundColor: activePalette?.primary || '#004328' } : {}}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-[#404942] dark:text-[#bfc9c0] hover:bg-[#eff4ff] dark:hover:bg-[#1a2535] hover:text-[#121c2a] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span 
                    style={isActive ? { color: activePalette?.accent || '#a9f3c5' } : {}}
                    className="material-symbols-outlined text-[20px]"
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-[#dee9fc] text-[#121c2a] dark:bg-[#223045] dark:text-[#eaf1ff]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Storefront Experience Navigation Group */}
        <div className="space-y-1 pt-2">
          <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Storefront Experience
          </div>
          {storefrontNav.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={isActive ? { backgroundColor: activePalette?.primary || '#004328' } : {}}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-[#404942] dark:text-[#bfc9c0] hover:bg-[#eff4ff] dark:hover:bg-[#1a2535] hover:text-[#121c2a] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span 
                    style={isActive ? { color: activePalette?.accent || '#a9f3c5' } : {}}
                    className="material-symbols-outlined text-[20px]"
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#dee9fc] text-[#121c2a] dark:bg-[#223045] dark:text-[#8ed6aa]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subscription Card */}
      <div className="pt-4">
        <div className="bg-[#eff4ff] dark:bg-[#182230] rounded-2xl p-4 border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
              Subscription
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#a9f3c5] text-[#002111] dark:bg-[#005232] dark:text-[#a9f3c5]">
              Active
            </span>
          </div>
          <div className="font-bold text-sm text-[#121c2a] dark:text-[#f8f9ff]">
            Pro Tier Plan
          </div>
          <p className="text-[11px] text-[#404942] dark:text-[#9ab0a0] mt-1 leading-snug">
            Next settlement cycle runs on 1st of next month.
          </p>
          <div className="mt-3 pt-3 border-t border-[#bfc9c0]/20 dark:border-[#27313f] flex items-center justify-between text-xs font-semibold text-[#004328] dark:text-[#8ed6aa]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">electric_bolt</span>
              <span>100% Doorstep SLA</span>
            </span>
            <span className="text-[#707971] dark:text-[#9ab0a0] text-[11px]">v2.4</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
