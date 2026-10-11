import React from 'react';
import { UserProfile, Tenant, ViewMode } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  tenant: Tenant;
  onNavigate: (view: ViewMode) => void;
  onShowToast: (message: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  tenant,
  onNavigate,
  onShowToast
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] overflow-hidden">
        {/* Header Banner */}
        <div className="h-20 bg-gradient-to-r from-[#004328] to-[#0d5c3a] relative p-4 flex justify-between items-start text-white">
          <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded">
            {tenant.plan}
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Profile Details */}
        <div className="px-6 pb-6 pt-0 relative -mt-10 space-y-4">
          <div className="flex items-end justify-between">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white dark:ring-[#1a2535] shadow-md"
            />
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#a9f3c5] text-[#002111] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#004328]"></span>
              Live Admin
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#121c2a] dark:text-white">{user.name}</h3>
            <p className="text-xs text-[#004328] dark:text-[#8ed6aa] font-semibold">{user.role}</p>
            <p className="text-[11px] text-[#707971] dark:text-[#9ab0a0] mt-0.5">{user.email}</p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-[#eff4ff] dark:bg-[#223045] rounded-2xl text-center">
            <div>
              <span className="text-[10px] text-[#707971] dark:text-[#9ab0a0] block uppercase font-bold">
                Products
              </span>
              <span className="text-sm font-extrabold text-[#121c2a] dark:text-white">24</span>
            </div>
            <div>
              <span className="text-[10px] text-[#707971] dark:text-[#9ab0a0] block uppercase font-bold">
                COD Success
              </span>
              <span className="text-sm font-extrabold text-[#004328] dark:text-[#8ed6aa]">92.4%</span>
            </div>
            <div>
              <span className="text-[10px] text-[#707971] dark:text-[#9ab0a0] block uppercase font-bold">
                Rating
              </span>
              <span className="text-sm font-extrabold text-[#9b4500] dark:text-[#ffb68e]">4.9★</span>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => {
                onClose();
                onNavigate('settings');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#eff4ff] dark:hover:bg-[#223045] text-xs font-semibold text-[#121c2a] dark:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#004328] dark:text-[#8ed6aa]">
                  settings
                </span>
                <span>Store Preferences & Profile</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#707971]">chevron_right</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigate('payments');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#eff4ff] dark:hover:bg-[#223045] text-xs font-semibold text-[#121c2a] dark:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#004328] dark:text-[#8ed6aa]">
                  payments
                </span>
                <span>Payment Gateways & COD Rules</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#707971]">chevron_right</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigate('analytics');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#eff4ff] dark:hover:bg-[#223045] text-xs font-semibold text-[#121c2a] dark:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#004328] dark:text-[#8ed6aa]">
                  monitoring
                </span>
                <span>Performance & Cash Intelligence</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#707971]">chevron_right</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#bfc9c0]/20 dark:border-[#27313f]">
            <button
              onClick={() => {
                onClose();
                onShowToast(`Signed in as ${user.name}. Session refreshed.`);
              }}
              className="w-full py-2.5 bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white rounded-xl text-xs font-bold hover:bg-[#dee9fc]"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
