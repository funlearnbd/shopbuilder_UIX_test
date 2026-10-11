import React, { useState } from 'react';
import { Tenant } from '../types';

interface AnalyticsViewProps {
  tenant: Tenant;
  onShowToast: (message: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ tenant, onShowToast }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'ytd'>('30d');

  const topProducts = [
    { title: 'Handmade Speckled Ceramic Mug', sku: 'MUG-01', units: 142, revenue: '$3,976.00', returnRate: '1.2%' },
    { title: 'Organic Eucalyptus Linen Mist', sku: 'MST-04', units: 118, revenue: '$2,596.00', returnRate: '2.1%' },
    { title: 'Soy Wax Candle - Amber & Moss', sku: 'CND-02', units: 98, revenue: '$1,911.00', returnRate: '0.8%' },
    { title: 'Woven Linen Napkin 4-Pack', sku: 'LNN-12', units: 76, revenue: '$1,824.00', returnRate: '1.5%' },
    { title: 'Raw Terracotta Plant Pot 6"', sku: 'POT-09', units: 64, revenue: '$2,176.00', returnRate: '3.4%' }
  ];

  const courierPerformance = [
    { name: 'Apex Urban Courier Van #02', dispatches: 184, successRate: '96.2%', cashSettled: '$6,420.00' },
    { name: 'Metro Bike Messenger Team', dispatches: 92, successRate: '94.8%', cashSettled: '$2,850.00' },
    { name: 'Storefront Curbside Station', dispatches: 48, successRate: '99.4%', cashSettled: '$1,290.00' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0] mb-0.5">
            <span>Merchant Intelligence</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#004328] dark:text-[#8ed6aa]">Performance Monitoring</span>
          </div>
          <h1 className="text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff]">
            Analytics Dashboard
          </h1>
          <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-0.5">
            Real-time cash flow, doorstep COD settlement rate, and funnel conversion for {tenant.name}.
          </p>
        </div>

        {/* Range Selector & Export */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-white dark:bg-[#1a2535] rounded-xl border border-[#bfc9c0]/30 shadow-xs">
            {(['7d', '30d', '90d', 'ytd'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                  timeRange === range
                    ? 'bg-[#004328] text-white shadow-xs'
                    : 'text-[#707971] dark:text-[#9ab0a0] hover:text-[#121c2a]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button
            onClick={() => onShowToast('Exported CSV sales report for Maison Botanica')}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#eff4ff] dark:bg-[#223045] rounded-xl text-xs font-bold text-[#121c2a] dark:text-white border border-[#bfc9c0]/30 hover:bg-[#dee9fc]"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI 4-Card Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-[#1a2535] p-4 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Gross Volume
          </span>
          <div className="text-2xl font-extrabold text-[#121c2a] dark:text-white mt-1">
            $14,820.00
          </div>
          <div className="flex items-center gap-1 text-xs text-[#004328] dark:text-[#8ed6aa] font-bold mt-2">
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
            <span>+18.4% vs prev. 30d</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2535] p-4 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Doorstep COD Success
          </span>
          <div className="text-2xl font-extrabold text-[#004328] dark:text-[#8ed6aa] mt-1">
            92.4%
          </div>
          <div className="flex items-center gap-1 text-xs text-[#707971] dark:text-[#9ab0a0] mt-2">
            <span>7.6% refusal / returns</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2535] p-4 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Cash in Transit
          </span>
          <div className="text-2xl font-extrabold text-[#9b4500] dark:text-[#ffb68e] mt-1">
            $3,420.00
          </div>
          <div className="flex items-center gap-1 text-xs text-[#707971] dark:text-[#9ab0a0] mt-2">
            <span>Held with 3 active couriers</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2535] p-4 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
            Average Order Value
          </span>
          <div className="text-2xl font-extrabold text-[#121c2a] dark:text-white mt-1">
            $48.60
          </div>
          <div className="flex items-center gap-1 text-xs text-[#004328] dark:text-[#8ed6aa] font-bold mt-2">
            <span className="material-symbols-outlined text-[15px]">add_circle</span>
            <span>+2.3 items per basket</span>
          </div>
        </div>
      </div>

      {/* Visual Conversion Funnel */}
      <div className="bg-white dark:bg-[#1a2535] p-5 rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
            Doorstep Conversion Funnel
          </h3>
          <span className="text-xs text-[#707971] dark:text-[#9ab0a0]">
            Last 30 Days (8,420 unique visits)
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#121c2a] dark:text-white">Storefront Visitors</span>
              <span className="font-bold">8,420 (100%)</span>
            </div>
            <div className="h-3 bg-[#eff4ff] dark:bg-[#223045] rounded-full overflow-hidden">
              <div className="h-full bg-[#004328] dark:bg-[#8ed6aa] rounded-full w-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#121c2a] dark:text-white">Product Spec Viewed</span>
              <span className="font-bold">4,110 (48.8%)</span>
            </div>
            <div className="h-3 bg-[#eff4ff] dark:bg-[#223045] rounded-full overflow-hidden">
              <div className="h-full bg-[#0d5c3a] dark:bg-[#4edea3] rounded-full w-[48.8%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#121c2a] dark:text-white">Added to Basket</span>
              <span className="font-bold">1,280 (15.2%)</span>
            </div>
            <div className="h-3 bg-[#eff4ff] dark:bg-[#223045] rounded-full overflow-hidden">
              <div className="h-full bg-[#fd8a42] rounded-full w-[15.2%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#121c2a] dark:text-white">COD Doorstep Confirmed & Paid</span>
              <span className="font-bold text-[#004328] dark:text-[#8ed6aa]">620 (7.4%)</span>
            </div>
            <div className="h-3 bg-[#eff4ff] dark:bg-[#223045] rounded-full overflow-hidden">
              <div className="h-full bg-[#004328] rounded-full w-[7.4%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products Table */}
      <div className="bg-white dark:bg-[#1a2535] rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] p-5 space-y-4">
        <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
          Top Performing Catalog SKUs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#bfc9c0]/20 text-[#707971] dark:text-[#9ab0a0] font-bold uppercase text-[10px]">
                <th className="pb-2.5">Product</th>
                <th className="pb-2.5">SKU</th>
                <th className="pb-2.5">Units Sold</th>
                <th className="pb-2.5">Gross Sales</th>
                <th className="pb-2.5">Return Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bfc9c0]/10 text-[#121c2a] dark:text-white">
              {topProducts.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#eff4ff]/40">
                  <td className="py-2.5 font-bold">{p.title}</td>
                  <td className="py-2.5 font-mono text-[#707971]">{p.sku}</td>
                  <td className="py-2.5">{p.units}</td>
                  <td className="py-2.5 font-extrabold text-[#004328] dark:text-[#8ed6aa]">{p.revenue}</td>
                  <td className="py-2.5 text-[#005232] font-semibold">{p.returnRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Courier Fleet Cash Settlement */}
      <div className="bg-white dark:bg-[#1a2535] rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] p-5 space-y-3">
        <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
          Active Courier Cash Collection Logs
        </h3>
        <div className="space-y-2">
          {courierPerformance.map((c, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] gap-2">
              <div>
                <span className="font-bold text-xs text-[#121c2a] dark:text-white block">
                  {c.name}
                </span>
                <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">
                  {c.dispatches} packages dispatched &bull; Success rate: {c.successRate}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#004328] dark:text-[#8ed6aa]">
                  {c.cashSettled} reconciled
                </span>
                <button
                  onClick={() => onShowToast(`Verified courier cash log: ${c.name}`)}
                  className="px-2.5 py-1 bg-white dark:bg-[#1a2535] rounded-lg text-[11px] font-bold shadow-xs hover:bg-[#dee9fc]"
                >
                  Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
