import React, { useState } from 'react';
import { Tenant, UserProfile, ViewMode, ViewportMode, ThemeColorPalette } from '../types';

interface TopNavbarProps {
  currentTenant: Tenant;
  tenants: Tenant[];
  onSelectTenant: (tenant: Tenant) => void;
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  viewportMode: ViewportMode;
  onChangeViewport: (mode: ViewportMode) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  user: UserProfile;
  onOpenProfile: () => void;
  pendingOrdersCount: number;
  activePalette?: ThemeColorPalette;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentTenant,
  tenants,
  onSelectTenant,
  currentView,
  onNavigate,
  viewportMode,
  onChangeViewport,
  darkMode,
  onToggleDarkMode,
  user,
  onOpenProfile,
  pendingOrdersCount,
  activePalette
}) => {
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f8f9ff]/90 dark:bg-[#0f1724]/90 backdrop-blur-xl border-b border-[#bfc9c0]/30 dark:border-[#27313f] transition-colors duration-200">
      {/* SaaS Operational Micro Header (Desktop Only) */}
      <div 
        style={{ backgroundColor: activePalette?.primary || '#004328' }}
        className="hidden lg:flex items-center justify-between px-6 py-1.5 text-white text-[12px] font-medium tracking-wide transition-colors duration-300"
      >
        <div className="flex items-center gap-4">
          <span 
            style={{ color: activePalette?.accent || '#a9f3c5' }}
            className="flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>Multi-Tenant Atelier SaaS • Active Cloud Tenant</span>
          </span>
          <span className="opacity-40">|</span>
          <span className="text-white/80">
            Store Domain: <strong className="text-white font-mono">{currentTenant.domain}</strong>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-white/90">
            <span className="w-2 h-2 rounded-full bg-[#a9f3c5] animate-pulse"></span>
            COD Gateways Online
          </span>
          <span className="opacity-40">|</span>
          <span className="text-[#a9f3c5] uppercase tracking-wider font-semibold text-[11px] bg-white/10 px-2 py-0.5 rounded">
            {currentTenant.plan}
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-16 px-4 lg:px-6 flex items-center justify-between gap-3">
        {/* Left: Brand Monogram & Multi-Tenant Switcher */}
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            title="Go to Dashboard"
          >
            <div className="relative w-9 h-9 rounded-xl bg-[#004328] dark:bg-[#0d5c3a] flex items-center justify-center text-white shadow-sm shrink-0 overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
              {currentTenant.logo ? (
                <img 
                  src={currentTenant.logo} 
                  alt={currentTenant.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="font-bold text-sm tracking-tight">{currentTenant.monogram}</span>
              )}
            </div>
          </button>

          {/* Tenant Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 dark:bg-[#1a2535] hover:bg-white dark:hover:bg-[#223045] border border-[#bfc9c0]/40 dark:border-[#27313f] shadow-xs text-left transition-all active:scale-[0.98]"
            >
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#121c2a] dark:text-[#f8f9ff] truncate max-w-[140px] sm:max-w-[180px]">
                    {currentTenant.name}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#707971] dark:text-[#9ab0a0]">
                    unfold_more
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#004328] dark:bg-[#8ed6aa] animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#004328] dark:text-[#8ed6aa]">
                    Accepting COD
                  </span>
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {tenantDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setTenantDropdownOpen(false)} 
                />
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#1a2535] rounded-xl shadow-xl border border-[#bfc9c0]/40 dark:border-[#27313f] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider">
                    Switch Storefront Tenant
                  </div>
                  {tenants.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTenant(t);
                        setTenantDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-[#eff4ff] dark:hover:bg-[#223045] transition-colors ${
                        t.id === currentTenant.id ? 'bg-[#eff4ff]/60 dark:bg-[#223045]/60 font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#004328] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {t.monogram}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm text-[#121c2a] dark:text-[#f8f9ff] truncate flex items-center gap-1">
                            {t.name}
                            {t.verified && (
                              <span className="material-symbols-outlined text-[14px] text-[#9b4500]">verified</span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#707971] dark:text-[#9ab0a0] truncate">
                            {t.domain}
                          </div>
                        </div>
                      </div>
                      {t.id === currentTenant.id && (
                        <span className="material-symbols-outlined text-[18px] text-[#004328] dark:text-[#8ed6aa]">
                          check_circle
                        </span>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-[#bfc9c0]/30 dark:border-[#27313f] mt-1 pt-1 px-2">
                    <button
                      onClick={() => {
                        setTenantDropdownOpen(false);
                        onNavigate('settings');
                      }}
                      className="w-full py-1.5 px-2 text-left text-xs font-semibold text-[#004328] dark:text-[#8ed6aa] hover:bg-[#eff4ff] dark:hover:bg-[#223045] rounded-md flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>Provision New Storefront</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: Device Viewport Switcher Sandbox Controls (Desktop) */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-[#eff4ff] dark:bg-[#182230] rounded-xl border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <button
            onClick={() => onChangeViewport('responsive')}
            title="Auto Responsive View"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewportMode === 'responsive'
                ? 'bg-white dark:bg-[#223045] text-[#004328] dark:text-[#8ed6aa] shadow-xs'
                : 'text-[#707971] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">devices</span>
            <span>Responsive</span>
          </button>
          <button
            onClick={() => onChangeViewport('desktop')}
            title="Force Desktop 1440px Canvas"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewportMode === 'desktop'
                ? 'bg-white dark:bg-[#223045] text-[#004328] dark:text-[#8ed6aa] shadow-xs'
                : 'text-[#707971] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
            <span>Web 1440px</span>
          </button>
          <button
            onClick={() => onChangeViewport('mobile')}
            title="Simulate Mobile 390px View"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewportMode === 'mobile'
                ? 'bg-white dark:bg-[#223045] text-[#004328] dark:text-[#8ed6aa] shadow-xs'
                : 'text-[#707971] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">smartphone</span>
            <span>Phone 390px</span>
          </button>
        </div>

        {/* Right Section: View Storefront CTA + Dark Mode Toggle Switch + Notifications + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Storefront Quick Button */}
          <button
            onClick={() => onNavigate('storefront')}
            style={currentView === 'storefront' ? { backgroundColor: activePalette?.primary || '#004328' } : {}}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'storefront'
                ? 'text-white shadow-xs'
                : 'bg-white dark:bg-[#1a2535] text-[#121c2a] dark:text-[#f8f9ff] hover:bg-[#eff4ff] dark:hover:bg-[#223045] border border-[#bfc9c0]/40 dark:border-[#27313f]'
            }`}
            title="View Live Storefront Kiosk"
          >
            <span className="material-symbols-outlined text-[17px]">open_in_new</span>
            <span>Storefront</span>
          </button>

          {/* Backend API Quick Button */}
          <button
            onClick={() => onNavigate('developer')}
            style={currentView === 'developer' ? { backgroundColor: activePalette?.primary || '#004328' } : {}}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'developer'
                ? 'text-white shadow-xs'
                : 'bg-white dark:bg-[#1a2535] text-[#121c2a] dark:text-[#f8f9ff] hover:bg-[#eff4ff] dark:hover:bg-[#223045] border border-[#bfc9c0]/40 dark:border-[#27313f]'
            }`}
            title="Backend Integration API & Webhooks"
          >
            <span className="material-symbols-outlined text-[17px]">terminal</span>
            <span>Backend API</span>
          </button>

          {/* CUSTOM DARK MODE TOGGLE SWITCH (Specifically requested by user) */}
          <div className="flex items-center" title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <button
              onClick={onToggleDarkMode}
              type="button"
              role="switch"
              aria-checked={darkMode}
              className="relative inline-flex h-8 w-15 shrink-0 cursor-pointer items-center rounded-full bg-[#dee9fc] dark:bg-[#233045] p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#004328] focus:ring-offset-2 dark:focus:ring-offset-[#0f1724]"
            >
              <span className="sr-only">Toggle dark mode</span>
              {/* Sun icon background representation */}
              <span className="absolute left-2 text-[#707971] dark:text-[#707971]/40 text-[13px] material-symbols-outlined pointer-events-none">
                light_mode
              </span>
              {/* Moon icon background representation */}
              <span className="absolute right-2 text-[#707971]/40 dark:text-[#8ed6aa] text-[13px] material-symbols-outlined pointer-events-none">
                dark_mode
              </span>
              {/* Animated Switch Thumb */}
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white dark:bg-[#004328] shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center text-[#121c2a] dark:text-white ${
                  darkMode ? 'translate-x-7' : 'translate-x-0'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {darkMode ? 'dark_mode' : 'light_mode'}
                </span>
              </span>
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#404942] dark:text-[#9ab0a0] hover:bg-[#dee9fc] dark:hover:bg-[#1a2535] hover:text-[#121c2a] dark:hover:text-white transition-colors"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[21px]">notifications</span>
              {pendingOrdersCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#9b4500] ring-2 ring-white dark:ring-[#0f1724]" />
              )}
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a2535] rounded-xl shadow-xl border border-[#bfc9c0]/40 dark:border-[#27313f] p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-[#bfc9c0]/30 dark:border-[#27313f]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#121c2a] dark:text-white">
                      Live Store Notifications
                    </span>
                    <span className="text-[10px] bg-[#004328] text-white px-1.5 py-0.5 rounded font-bold">
                      {pendingOrdersCount} Active
                    </span>
                  </div>
                  <div className="py-2 space-y-2">
                    <div className="p-2 rounded-lg bg-[#eff4ff] dark:bg-[#223045] text-xs">
                      <div className="font-semibold text-[#004328] dark:text-[#8ed6aa] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">local_shipping</span>
                        <span>{pendingOrdersCount} COD Orders Pending Confirmation</span>
                      </div>
                      <p className="text-[#404942] dark:text-[#9ab0a0] mt-0.5 text-[11px]">
                        Customers waiting for doorstep pack confirmation.
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#eff4ff]/60 dark:bg-[#223045]/60 text-xs">
                      <div className="font-semibold text-[#9b4500] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">inventory_2</span>
                        <span>Low Stock Alert</span>
                      </div>
                      <p className="text-[#404942] dark:text-[#9ab0a0] mt-0.5 text-[11px]">
                        Organic Eucalyptus Linen Mist has 3 units left.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setNotifOpen(false);
                      onNavigate('orders');
                    }}
                    className="w-full py-1.5 text-center text-xs font-semibold text-[#004328] dark:text-[#8ed6aa] hover:underline"
                  >
                    View All Orders &rarr;
                  </button>
                </div>
              </>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#004328]/30 transition-all focus:outline-none"
            title="View Elena's Profile & Merchant Settings"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/10"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
