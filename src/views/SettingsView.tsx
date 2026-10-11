import React, { useState } from 'react';
import { Tenant, UserProfile } from '../types';

interface SettingsViewProps {
  tenant: Tenant;
  onUpdateTenant: (updated: Partial<Tenant>) => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onShowToast: (message: string) => void;
}

// Reusable Settings Card Component
export const SettingsCard: React.FC<{
  title: string;
  description?: string;
  icon?: string;
  badge?: string;
  children: React.ReactNode;
}> = ({ title, description, icon, badge, children }) => (
  <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-5 shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] space-y-4">
    <div className="flex items-start justify-between pb-3 border-b border-[#bfc9c0]/20 dark:border-[#27313f]">
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="material-symbols-outlined text-[#004328] dark:text-[#8ed6aa] text-[22px]">
            {icon}
          </span>
        )}
        <div>
          <h3 className="text-base font-bold text-[#121c2a] dark:text-white">{title}</h3>
          {description && (
            <p className="text-xs text-[#707971] dark:text-[#9ab0a0] mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {badge && (
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#a9f3c5] text-[#002111] dark:bg-[#005232] dark:text-[#a9f3c5]">
          {badge}
        </span>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

// Reusable Settings Input Component
export const SettingsInput: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
}> = ({ label, value, onChange, type = 'text', placeholder, hint }) => (
  <div>
    <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-sm text-[#121c2a] dark:text-white outline-none border border-transparent focus:border-[#004328] transition-all"
    />
    {hint && <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0] mt-1 block">{hint}</span>}
  </div>
);

// Reusable Settings Toggle Component
export const SettingsToggle: React.FC<{
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#eff4ff]/60 dark:bg-[#223045]/60 border border-[#bfc9c0]/20">
    <div className="pr-4">
      <span className="text-xs font-bold text-[#121c2a] dark:text-white block">{label}</span>
      <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0] leading-snug">{description}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-10 h-5.5 bg-[#d9e3f6] dark:bg-[#27313f] peer-checked:bg-[#004328] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all" />
    </label>
  </div>
);

export const SettingsView: React.FC<SettingsViewProps> = ({
  tenant,
  onUpdateTenant,
  user,
  onUpdateUser,
  onShowToast
}) => {
  const [storeName, setStoreName] = useState(tenant.name);
  const [tagline, setTagline] = useState(tenant.tagline);
  const [domain, setDomain] = useState(tenant.domain);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userPhone, setUserPhone] = useState(user.phone);
  const [userLocation, setUserLocation] = useState(user.location);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(user.twoFactorEnabled);

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTenant({ name: storeName, tagline, domain });
    onShowToast('Saved store identity settings');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: userName,
      email: userEmail,
      phone: userPhone,
      location: userLocation,
      twoFactorEnabled: twoFactor
    });
    onShowToast('Saved merchant profile details');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0] mb-0.5">
          <span>Preferences & Security</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#004328] dark:text-[#8ed6aa]">Settings Panel</span>
        </div>
        <h1 className="text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff]">
          Store & Merchant Settings
        </h1>
        <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-0.5">
          Configure multi-tenant storefront profile, notification channels, staff permissions, and security.
        </p>
      </div>

      {/* Section 1: Merchant User Profile Page Card */}
      <SettingsCard
        title="Merchant User Profile"
        description="Your personal login credentials, role, and avatar."
        icon="account_circle"
        badge="Active Admin"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-[#eff4ff] dark:bg-[#223045] rounded-xl">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-[#004328] dark:ring-[#8ed6aa]"
            />
            <div>
              <h4 className="text-sm font-bold text-[#121c2a] dark:text-white">{user.name}</h4>
              <span className="text-xs text-[#004328] dark:text-[#8ed6aa] font-semibold">{user.role}</span>
              <p className="text-[11px] text-[#707971] dark:text-[#9ab0a0] mt-0.5">Joined {user.joinedDate} &bull; {user.store}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SettingsInput
              label="Full Name"
              value={userName}
              onChange={setUserName}
            />
            <SettingsInput
              label="Email Address"
              value={userEmail}
              onChange={setUserEmail}
              type="email"
            />
            <SettingsInput
              label="Contact Phone"
              value={userPhone}
              onChange={setUserPhone}
            />
            <SettingsInput
              label="Operating Location"
              value={userLocation}
              onChange={setUserLocation}
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#004328] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#0d5c3a]"
            >
              Update Profile Details
            </button>
          </div>
        </form>
      </SettingsCard>

      {/* Section 2: Storefront Identity & Domain Settings */}
      <SettingsCard
        title="Storefront Identity & Subdomain"
        description="Public metadata, kiosk domain, and currency rules for this tenant."
        icon="store"
      >
        <form onSubmit={handleSaveStore} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SettingsInput
              label="Storefront Name"
              value={storeName}
              onChange={setStoreName}
            />
            <SettingsInput
              label="Digital Kiosk Domain"
              value={domain}
              onChange={setDomain}
              hint="Where buyers access your mobile-first shop"
            />
          </div>
          <SettingsInput
            label="Tagline & Brand Description"
            value={tagline}
            onChange={setTagline}
          />
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#004328] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#0d5c3a]"
            >
              Save Store Info
            </button>
          </div>
        </form>
      </SettingsCard>

      {/* Section 3: Reusable Notifications & Audio Alerts */}
      <SettingsCard
        title="Operational & Sound Alerts"
        description="Immediate acoustic and messaging alerts for pending COD orders."
        icon="notifications_active"
      >
        <div className="space-y-3">
          <SettingsToggle
            label="Audio Ping on New Order"
            description="Plays pleasant chime when order is placed by customer or courier."
            checked={soundAlerts}
            onChange={(c) => {
              setSoundAlerts(c);
              onShowToast(`Sound notifications ${c ? 'enabled' : 'disabled'}`);
            }}
          />
          <SettingsToggle
            label="Instant WhatsApp Order Forwarding"
            description="Send customer phone number and delivery location directly to merchant WhatsApp."
            checked={whatsappAlerts}
            onChange={(c) => {
              setWhatsappAlerts(c);
              onShowToast(`WhatsApp dispatch routing ${c ? 'enabled' : 'disabled'}`);
            }}
          />
        </div>
      </SettingsCard>

      {/* Section 4: Security & Two-Factor Authentication */}
      <SettingsCard
        title="Security & Account Protection"
        description="Two-factor authentication and courier access control."
        icon="security"
        badge="Protected"
      >
        <div className="space-y-3">
          <SettingsToggle
            label="Two-Factor Authentication (2FA)"
            description="Require authenticator app code on login to protect cash settlement accounts."
            checked={twoFactor}
            onChange={(c) => {
              setTwoFactor(c);
              onShowToast(`Two-factor authentication ${c ? 'enabled' : 'disabled'}`);
            }}
          />
        </div>
      </SettingsCard>
    </div>
  );
};
