import React, { useState } from 'react';
import { PaymentGateway, CODRules, Tenant } from '../types';

interface PaymentsViewProps {
  tenant: Tenant;
  gateways: PaymentGateway[];
  codRules: CODRules;
  onUpdateCodRules: (rules: CODRules) => void;
  onToggleGateway: (gatewayId: string) => void;
  onShowToast: (message: string) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  tenant,
  gateways,
  codRules,
  onUpdateCodRules,
  onToggleGateway,
  onShowToast
}) => {
  const [localCod, setLocalCod] = useState<CODRules>(codRules);
  const [simulatingPayment, setSimulatingPayment] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const handleSaveCodRules = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCodRules(localCod);
    onShowToast('Updated Cash on Delivery security rules & thresholds');
  };

  const handleRunSimulator = () => {
    setSimulatingPayment(true);
    setSimulationResult(null);
    setTimeout(() => {
      setSimulatingPayment(false);
      setSimulationResult('SUCCESS: Doorstep verification passed. $50.00 pre-authorization cleared.');
      onShowToast('Payment gateway test transaction simulated successfully!');
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0] mb-0.5">
          <span>Vendor Infrastructure</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#004328] dark:text-[#8ed6aa]">Payment & COD Gateways</span>
        </div>
        <h1 className="text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff]">
          Payment Gateways & Vendor Settlements
        </h1>
        <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-0.5">
          Manage secure doorstep Cash on Delivery rules, Stripe Connect merchant payout rails, and QR terminal payments for {tenant.name}.
        </p>
      </div>

      {/* Gateway Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gateways.map(gw => (
          <div
            key={gw.id}
            className={`p-5 rounded-2xl bg-white dark:bg-[#1a2535] shadow-xs border transition-all ${
              gw.enabled
                ? 'border-[#004328]/50 dark:border-[#8ed6aa]/50'
                : 'border-[#bfc9c0]/30 dark:border-[#27313f] opacity-80'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  gw.enabled
                    ? 'bg-[#004328] text-white dark:bg-[#0d5c3a]'
                    : 'bg-[#eff4ff] text-[#707971] dark:bg-[#223045]'
                }`}>
                  <span className="material-symbols-outlined text-[24px]">{gw.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
                    {gw.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b4500] dark:text-[#ffb68e]">
                    {gw.badge}
                  </span>
                </div>
              </div>

              {/* Toggle Enable */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={gw.enabled}
                  onChange={() => {
                    onToggleGateway(gw.id);
                    onShowToast(`${gw.name} is now ${gw.enabled ? 'Disabled' : 'Enabled'}`);
                  }}
                  className="sr-only peer"
                />
                <div className="w-10 h-5.5 bg-[#d9e3f6] dark:bg-[#27313f] peer-checked:bg-[#004328] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all" />
              </label>
            </div>

            <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-3 leading-relaxed">
              {gw.description}
            </p>

            <div className="mt-4 pt-3 border-t border-[#bfc9c0]/20 dark:border-[#27313f] flex items-center justify-between text-[11px]">
              <span className="text-[#707971] dark:text-[#9ab0a0]">{gw.fee}</span>
              <span className="font-semibold text-[#004328] dark:text-[#8ed6aa]">
                {gw.payoutSchedule}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Cash on Delivery Configuration Panel */}
      <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-5 shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#bfc9c0]/20 dark:border-[#27313f]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#004328] dark:text-[#8ed6aa] text-[22px]">
              tune
            </span>
            <h3 className="text-base font-bold text-[#121c2a] dark:text-white">
              Doorstep COD Risk & Verification Engine
            </h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#a9f3c5] text-[#002111]">
            Active Fleet Shield
          </span>
        </div>

        <form onSubmit={handleSaveCodRules} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] mb-1 uppercase tracking-wider">
                Max COD Order Limit ($)
              </label>
              <input
                type="number"
                value={localCod.maxOrderLimit}
                onChange={(e) => setLocalCod({ ...localCod, maxOrderLimit: parseFloat(e.target.value) || 0 })}
                className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-bold text-[#121c2a] dark:text-white outline-none"
              />
              <span className="text-[10px] text-[#707971] mt-0.5 block">
                Orders above this require prepaid card settlement.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] mb-1 uppercase tracking-wider">
                Free Delivery Threshold ($)
              </label>
              <input
                type="number"
                value={localCod.minOrderForFreeDelivery}
                onChange={(e) => setLocalCod({ ...localCod, minOrderForFreeDelivery: parseFloat(e.target.value) || 0 })}
                className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-bold text-[#121c2a] dark:text-white outline-none"
              />
              <span className="text-[10px] text-[#707971] mt-0.5 block">
                Waives courier delivery surcharge.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] mb-1 uppercase tracking-wider">
                Standard Delivery Surcharge ($)
              </label>
              <input
                type="number"
                step="0.1"
                value={localCod.deliveryFee}
                onChange={(e) => setLocalCod({ ...localCod, deliveryFee: parseFloat(e.target.value) || 0 })}
                className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-bold text-[#121c2a] dark:text-white outline-none"
              />
              <span className="text-[10px] text-[#707971] mt-0.5 block">
                Directly given to courier dispatcher.
              </span>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff]/60 dark:bg-[#223045]/60 border border-[#bfc9c0]/20">
              <div>
                <span className="text-xs font-bold text-[#121c2a] dark:text-white block">
                  Customer Inspection Before Payment
                </span>
                <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">
                  Buyer can open parcel at doorstep to verify condition.
                </span>
              </div>
              <input
                type="checkbox"
                checked={localCod.allowDoorstepInspection}
                onChange={(e) => setLocalCod({ ...localCod, allowDoorstepInspection: e.target.checked })}
                className="w-4 h-4 rounded text-[#004328]"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff]/60 dark:bg-[#223045]/60 border border-[#bfc9c0]/20">
              <div>
                <span className="text-xs font-bold text-[#121c2a] dark:text-white block">
                  SMS / WhatsApp OTP Verification
                </span>
                <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">
                  Send 4-digit code to phone before courier dispatches.
                </span>
              </div>
              <input
                type="checkbox"
                checked={localCod.requirePhoneOtp}
                onChange={(e) => setLocalCod({ ...localCod, requirePhoneOtp: e.target.checked })}
                className="w-4 h-4 rounded text-[#004328]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#004328] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#0d5c3a]"
            >
              Save COD Configuration
            </button>
          </div>
        </form>
      </div>

      {/* Payment Gateway Sandbox Simulator */}
      <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-5 shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b4500] text-[20px]">
              smart_toy
            </span>
            <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
              Gateway Integration Simulator
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#707971]">v2.4 Sandbox</span>
        </div>

        <p className="text-xs text-[#404942] dark:text-[#9ab0a0]">
          Simulate a real-time vendor checkout authorization and verify payment webhooks.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handleRunSimulator}
            disabled={simulatingPayment}
            className="px-4 py-2 bg-[#eff4ff] dark:bg-[#223045] text-[#004328] dark:text-[#8ed6aa] rounded-xl text-xs font-bold border border-[#bfc9c0]/30 hover:bg-[#dee9fc] flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">play_circle</span>
            <span>{simulatingPayment ? 'Testing Webhooks...' : 'Simulate $50.00 Authorization'}</span>
          </button>
        </div>

        {simulationResult && (
          <div className="p-3 bg-[#a9f3c5]/30 dark:bg-[#005232]/30 rounded-xl text-xs font-mono text-[#005232] dark:text-[#a9f3c5]">
            {simulationResult}
          </div>
        )}
      </div>
    </div>
  );
};
