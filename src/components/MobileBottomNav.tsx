import { useState } from 'react';
import { ViewMode } from '../types';

interface MobileBottomNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  pendingOrdersCount: number;
}

export const MobileBottomNav = ({
  currentView,
  onNavigate,
  pendingOrdersCount
}: MobileBottomNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryTabs = [
    {
      id: 'dashboard' as ViewMode,
      label: 'Dashboard',
      icon: 'space_dashboard'
    },
    {
      id: 'products' as ViewMode,
      label: 'Products',
      icon: 'inventory_2'
    },
    {
      id: 'orders' as ViewMode,
      label: 'Orders',
      icon: 'receipt_long',
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : null
    },
    {
      id: 'storefront' as ViewMode,
      label: 'Storefront',
      icon: 'storefront'
    }
  ];

  const secondaryModules = [
    { id: 'purchases' as ViewMode, label: 'Purchases & Stock-In', icon: 'move_to_inbox', desc: 'Replenish catalog stock' },
    { id: 'expenses' as ViewMode, label: 'Expenses & Receipts', icon: 'receipt', desc: 'Operating costs & receipts' },
    { id: 'analytics' as ViewMode, label: 'Merchant Analytics', icon: 'monitoring', desc: 'Conversion & courier logs' },
    { id: 'marketing' as ViewMode, label: 'Marketing & Reviews', icon: 'campaign', desc: 'Coupons, SEO & feedback' },
    { id: 'payments' as ViewMode, label: 'Payment & COD Rules', icon: 'payments', desc: 'Gateways & COD limits' },
    { id: 'themes' as ViewMode, label: 'Appearance & Themes', icon: 'palette', desc: 'Storefront templates' },
    { id: 'developer' as ViewMode, label: 'Backend API Integration', icon: 'terminal', desc: 'REST endpoints & webhooks' },
    { id: 'settings' as ViewMode, label: 'Store Settings', icon: 'settings', desc: 'Domain, profile & alerts' },
  ];

  return (
    <>
      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#f8f9ff]/95 dark:bg-[#0f1724]/95 backdrop-blur-xl border-t border-[#bfc9c0]/30 dark:border-[#27313f] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex justify-around items-center h-16 px-1">
          {primaryTabs.map(tab => {
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigate(tab.id);
                }}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[3.8rem] min-h-[44px] py-1 transition-all relative ${
                  isActive
                    ? 'text-[#004328] dark:text-[#8ed6aa] font-bold scale-105'
                    : 'text-[#404942] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white'
                }`}
              >
                <div className="relative">
                  <span className={`material-symbols-outlined text-[21px] ${isActive ? 'font-bold' : ''}`}>
                    {tab.icon}
                  </span>
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2.5 bg-[#9b4500] text-white text-[10px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center font-bold">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight">{tab.label}</span>
              </button>
            );
          })}

          {/* 5th Tab: Modules Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[3.8rem] min-h-[44px] py-1 transition-all relative ${
              isMenuOpen || secondaryModules.some(m => m.id === currentView)
                ? 'text-[#004328] dark:text-[#8ed6aa] font-bold scale-105'
                : 'text-[#404942] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white'
            }`}
          >
            <div className="relative">
              <span className="material-symbols-outlined text-[21px]">
                {isMenuOpen ? 'close' : 'grid_view'}
              </span>
            </div>
            <span className="text-[10px] tracking-tight">Modules</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer for More Modules */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="flex-1" 
            onClick={() => setIsMenuOpen(false)} 
          />
          <div className="w-full bg-white dark:bg-[#1a2535] rounded-t-3xl shadow-2xl border-t border-[#bfc9c0]/30 max-h-[80vh] flex flex-col p-4 pb-12 overflow-hidden animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#bfc9c0]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#004328] dark:text-[#8ed6aa]">
                  apps
                </span>
                <span className="font-bold text-sm text-[#121c2a] dark:text-white">
                  All SaaS Modules
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-7 h-7 rounded-full bg-[#eff4ff] dark:bg-[#223045] flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 py-4 overflow-y-auto max-h-[60vh]">
              {secondaryModules.map(item => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all ${
                      isActive
                        ? 'bg-[#004328] text-white border-[#004328]'
                        : 'bg-[#eff4ff]/60 dark:bg-[#223045]/60 border-[#bfc9c0]/30 hover:border-[#004328] text-[#121c2a] dark:text-white'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[20px] mb-1.5 ${
                      isActive ? 'text-[#a9f3c5]' : 'text-[#004328] dark:text-[#8ed6aa]'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="font-bold text-xs block leading-tight">
                      {item.label}
                    </span>
                    <span className={`text-[10px] mt-0.5 line-clamp-1 ${
                      isActive ? 'text-white/80' : 'text-[#707971] dark:text-[#9ab0a0]'
                    }`}>
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
