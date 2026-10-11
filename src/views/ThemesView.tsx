import React, { useState } from 'react';
import { ThemeTemplate, Product, Tenant } from '../types';

interface ThemesViewProps {
  themes: ThemeTemplate[];
  onSelectActiveTheme: (themeId: string) => void;
  products: Product[];
  tenant: Tenant;
  onShowToast: (message: string) => void;
}

export const ThemesView: React.FC<ThemesViewProps> = ({
  themes,
  onSelectActiveTheme,
  products,
  tenant,
  onShowToast
}) => {
  const [previewModalTheme, setPreviewModalTheme] = useState<ThemeTemplate | null>(null);
  const [modalViewport, setModalViewport] = useState<'desktop' | 'mobile'>('desktop');

  const handleApply = (theme: ThemeTemplate) => {
    onSelectActiveTheme(theme.id);
    onShowToast(`Applied "${theme.name}" as active storefront design!`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Top Banner / Sandbox Guarantee Notification */}
      <div className="relative overflow-hidden rounded-2xl bg-[#eff4ff] dark:bg-[#182230] p-4 lg:p-5 border border-[#004328]/20 dark:border-[#27313f] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1a2535] text-[#004328] dark:text-[#8ed6aa] flex items-center justify-center shadow-xs shrink-0 border border-[#bfc9c0]/30">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#121c2a] dark:text-[#f8f9ff]">
                  Store Data & Inventory Guarantee
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#a9f3c5] text-[#002111] dark:bg-[#005232] dark:text-[#a9f3c5]">
                  Safe Switch Active
                </span>
              </div>
              <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-0.5 max-w-2xl leading-relaxed">
                Changing your storefront design updates your visual layout, typography, and card presentation. Your product catalog, prices, COD rules, inventory, and orders remain <strong className="text-[#121c2a] dark:text-white">100% untouched</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={() => setPreviewModalTheme(themes.find(t => t.active) || themes[0])}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a2535] text-xs font-bold text-[#004328] dark:text-[#8ed6aa] border border-[#bfc9c0]/30 shadow-xs hover:bg-[#eff4ff] shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">preview</span>
            <span>Launch Sandbox</span>
          </button>
        </div>
      </div>

      {/* Header and Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0] mb-1">
            <span>Storefront Experience</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#004328] dark:text-[#8ed6aa]">Storefront Templates</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121c2a] dark:text-[#f8f9ff] tracking-tight">
            Choose your storefront design
          </h1>
          <p className="text-sm text-[#404942] dark:text-[#9ab0a0] mt-1 max-w-2xl">
            Select from 6 production-grade, responsive templates engineered for seamless doorstep Cash on Delivery, instant catalog inheritance, and fast mobile conversion.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs text-[#707971] dark:text-[#9ab0a0] hidden sm:block">
            Active Store: <strong className="text-[#121c2a] dark:text-white">{tenant.name}</strong>
          </div>
          <button
            onClick={() => onShowToast('Active theme layout published to live kiosk domain.')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004328] dark:bg-[#0d5c3a] text-white text-xs font-bold shadow-md hover:bg-[#0d5c3a] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">publish</span>
            <span>Publish Design</span>
          </button>
        </div>
      </div>

      {/* 6-Theme Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map(theme => {
          return (
            <div
              key={theme.id}
              className={`group relative flex flex-col rounded-2xl bg-white dark:bg-[#1a2535] shadow-xs border transition-all duration-300 hover:shadow-lg ${
                theme.active
                  ? 'border-[#004328] dark:border-[#8ed6aa] ring-2 ring-[#004328]/30 dark:ring-[#8ed6aa]/30'
                  : 'border-[#bfc9c0]/40 dark:border-[#27313f]'
              }`}
            >
              {/* Ribbon Header */}
              <div className="p-4 pb-0 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  theme.active
                    ? 'bg-[#a9f3c5] text-[#002111] dark:bg-[#005232] dark:text-[#a9f3c5]'
                    : 'bg-[#eff4ff] dark:bg-[#223045] text-[#404942] dark:text-[#bfc9c0]'
                }`}>
                  {theme.active && <span className="w-1.5 h-1.5 rounded-full bg-[#004328] dark:bg-[#a9f3c5] animate-ping" />}
                  {theme.tagBadge}
                </span>
                <span className="text-[11px] font-mono text-[#707971] dark:text-[#9ab0a0]">
                  {theme.version}
                </span>
              </div>

              {/* Miniature Preview Render */}
              <div className="p-4">
                <div className="relative w-full h-52 rounded-xl overflow-hidden bg-[#eff4ff] dark:bg-[#182230] border border-[#bfc9c0]/30 shadow-xs flex flex-col">
                  {/* Miniature Top Browser Bar */}
                  <div className="h-5 bg-white dark:bg-[#1a2535] flex items-center justify-between px-2.5 border-b border-[#bfc9c0]/20">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#bfc9c0]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#bfc9c0]" />
                    </div>
                    <div className="w-16 h-1.5 bg-[#eff4ff] dark:bg-[#223045] rounded-full" />
                    <span className="text-[9px] text-[#004328] font-bold">COD</span>
                  </div>

                  {/* Thumbnail Hero Illustration */}
                  <div className="relative h-28 w-full overflow-hidden bg-[#dee9fc]">
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2 text-white">
                      <span className="text-[10px] font-bold truncate">{theme.subtitle}</span>
                    </div>
                  </div>

                  {/* Miniature Product Tiles Strip */}
                  <div className="p-1.5 bg-white dark:bg-[#1a2535] flex-1 grid grid-cols-4 gap-1">
                    {theme.miniatures.slice(0, 4).map((img, i) => (
                      <div key={i} className="bg-[#eff4ff] dark:bg-[#223045] rounded p-0.5 flex flex-col overflow-hidden">
                        <img src={img} alt="mini" className="w-full h-8 object-cover rounded-xs" />
                        <div className="w-6 h-1 bg-black/40 dark:bg-white/40 rounded-full mt-1" />
                      </div>
                    ))}
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreviewModalTheme(theme)}
                      className="px-3 py-1.5 rounded-xl bg-white text-[#121c2a] text-xs font-bold shadow-md hover:bg-[#eff4ff] transition-all"
                    >
                      Quick Live Test
                    </button>
                  </div>
                </div>
              </div>

              {/* Theme Content */}
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-base font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
                    {theme.name}
                  </h3>
                  <span className="text-xs font-bold text-[#004328] dark:text-[#8ed6aa]">
                    {theme.ratioBadge}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#9b4500] dark:text-[#ffb68e] mb-2">
                  {theme.subtitle}
                </div>
                <p className="text-xs text-[#404942] dark:text-[#9ab0a0] leading-relaxed mb-3">
                  {theme.description}
                </p>

                {/* Architecture Bullets */}
                <div className="bg-[#eff4ff] dark:bg-[#223045] rounded-xl p-3 mb-4 space-y-1.5 text-xs text-[#121c2a] dark:text-[#f8f9ff]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0] mb-1">
                    Key Architecture
                  </div>
                  {theme.keyArchitecture.map((arch, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] leading-tight">
                      <span className="material-symbols-outlined text-[14px] text-[#004328] dark:text-[#8ed6aa] shrink-0">
                        check
                      </span>
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Buttons */}
                <div className="mt-auto pt-2">
                  <div className="text-[11px] text-[#707971] dark:text-[#9ab0a0] mb-2 truncate">
                    Best for: {theme.bestFor}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewModalTheme(theme)}
                      className="py-2 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-[#f8f9ff] text-xs font-bold hover:bg-[#dee9fc] transition-colors"
                    >
                      Preview
                    </button>
                    {theme.active ? (
                      <button
                        disabled
                        className="py-2 rounded-xl bg-[#004328] text-white text-xs font-bold flex items-center justify-center gap-1 opacity-90 shadow-xs cursor-default"
                      >
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        <span>Active</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApply(theme)}
                        className="py-2 rounded-xl bg-[#004328] dark:bg-[#0d5c3a] text-white text-xs font-bold hover:bg-[#0d5c3a] transition-all shadow-xs"
                      >
                        Apply Theme
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LOWER SECTION: COMPREHENSIVE 6-TEMPLATE COMPARISON MATRIX */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0]">
              Architecture & Benchmarking
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff]">
              Live 6-Template Comparison Matrix
            </h2>
          </div>
          <span className="text-xs text-[#004328] dark:text-[#8ed6aa] font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#004328] dark:bg-[#8ed6aa]"></span>
            Benchmarked on 2G/3G mobile networks & budget Android devices
          </span>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-[#1a2535] shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f]">
          <table className="w-full text-left text-xs border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#eff4ff] dark:bg-[#182230] text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider font-bold text-[10px]">
                <th className="p-3.5 w-44">Architectural Vector</th>
                {themes.map(t => (
                  <th key={t.id} className="p-3.5">
                    <div className="flex items-center gap-1">
                      <span>{t.name}</span>
                      {t.active && (
                        <span className="px-1.5 py-0.2 rounded bg-[#004328] text-white text-[9px] font-bold normal-case">
                          Active
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bfc9c0]/20 dark:divide-[#27313f] text-[#121c2a] dark:text-[#f8f9ff]">
              <tr className="hover:bg-[#eff4ff]/40">
                <td className="p-3.5 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#707971]">architecture</span>
                  <span>Philosophy</span>
                </td>
                {themes.map(t => (
                  <td key={t.id} className="p-3.5 font-medium leading-snug">
                    {t.philosophy}
                  </td>
                ))}
              </tr>
              <tr className="bg-[#eff4ff]/20 hover:bg-[#eff4ff]/60">
                <td className="p-3.5 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#707971]">grid_view</span>
                  <span>Density</span>
                </td>
                {themes.map(t => (
                  <td key={t.id} className="p-3.5">
                    <span className="px-2 py-0.5 rounded-lg bg-[#eff4ff] dark:bg-[#223045] font-semibold text-[11px]">
                      {t.density}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-[#eff4ff]/40">
                <td className="p-3.5 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#707971]">aspect_ratio</span>
                  <span>Image Crop</span>
                </td>
                {themes.map(t => (
                  <td key={t.id} className="p-3.5 font-medium leading-snug">
                    {t.cropHandling}
                  </td>
                ))}
              </tr>
              <tr className="bg-[#eff4ff]/20 hover:bg-[#eff4ff]/60">
                <td className="p-3.5 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#707971]">speed</span>
                  <span>Android Score</span>
                </td>
                {themes.map(t => (
                  <td key={t.id} className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#004328] dark:text-[#8ed6aa] text-sm">
                        {t.performanceScore}
                      </span>
                      <span className="w-12 h-1.5 bg-[#dee9fc] dark:bg-[#223045] rounded-full overflow-hidden">
                        <span
                          className="block h-full bg-[#004328] dark:bg-[#8ed6aa] rounded-full"
                          style={{ width: `${t.performanceScore}%` }}
                        />
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-[#eff4ff]/40">
                <td className="p-3.5 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#707971]">payments</span>
                  <span>COD Checkout</span>
                </td>
                {themes.map(t => (
                  <td key={t.id} className="p-3.5 font-medium leading-snug">
                    {t.checkoutStyle}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Realistic Image Upload Resilience Engine Card */}
      <div className="rounded-2xl bg-white dark:bg-[#1a2535] p-5 shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] dark:bg-[#223045] text-[#004328] dark:text-[#8ed6aa] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">image_search</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
                Automatic Image Upload Resilience Engine
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#a9f3c5] text-[#002111] text-[10px] font-bold">
                Active on all 6 templates
              </span>
            </div>
            <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-1 max-w-2xl leading-relaxed">
              Supplier product photos with mixed ratios? Botanica automatically normalizes aspect crops, adds neutral background framing for transparent PNGs, and serves compressed next-gen WebP images.
            </p>
          </div>
        </div>
        <button
          onClick={() => onShowToast('Image optimizer rules: WebP compression, 1:1 auto padding, max 200KB asset ceiling')}
          className="px-4 py-2 bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white rounded-xl text-xs font-bold shrink-0 hover:bg-[#dee9fc]"
        >
          Image Rules
        </button>
      </div>

      {/* Live Preview Modal Simulation */}
      {previewModalTheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-5xl bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header with Device Switcher */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#eff4ff] dark:bg-[#182230] border-b border-[#bfc9c0]/20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[22px] text-[#004328] dark:text-[#8ed6aa]">
                  devices
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
                    {previewModalTheme.name} — Live Sandbox
                  </h3>
                  <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">
                    {previewModalTheme.ratioBadge} &bull; {previewModalTheme.density}
                  </span>
                </div>
              </div>

              {/* Viewport Switcher Inside Modal */}
              <div className="flex items-center gap-2">
                <div className="inline-flex p-1 bg-white dark:bg-[#1a2535] rounded-xl border border-[#bfc9c0]/30 shadow-xs">
                  <button
                    onClick={() => setModalViewport('desktop')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      modalViewport === 'desktop'
                        ? 'bg-[#004328] text-white shadow-xs'
                        : 'text-[#707971] hover:text-[#121c2a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
                    <span>1440px</span>
                  </button>
                  <button
                    onClick={() => setModalViewport('mobile')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      modalViewport === 'mobile'
                        ? 'bg-[#004328] text-white shadow-xs'
                        : 'text-[#707971] hover:text-[#121c2a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">smartphone</span>
                    <span>390px</span>
                  </button>
                </div>
                <button
                  onClick={() => setPreviewModalTheme(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#707971] hover:text-[#121c2a]"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Sandbox Canvas */}
            <div className="p-4 sm:p-6 bg-[#dee9fc]/30 dark:bg-black/40 overflow-y-auto flex items-center justify-center min-h-[460px]">
              <div
                className={`w-full bg-white dark:bg-[#111927] rounded-2xl shadow-xl overflow-hidden border border-[#bfc9c0]/30 transition-all duration-300 ${
                  modalViewport === 'mobile' ? 'max-w-[390px]' : 'max-w-4xl'
                }`}
              >
                {/* Store Header Preview */}
                <div className="p-3 bg-white dark:bg-[#1a2535] border-b border-[#bfc9c0]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#004328] text-white flex items-center justify-center font-bold text-xs">
                      MB
                    </div>
                    <span className="text-xs font-bold text-[#121c2a] dark:text-white">
                      Maison Botanica
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#004328] dark:text-[#8ed6aa] font-bold">
                    <span>COD Active</span>
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  </div>
                </div>

                {/* Hero preview */}
                <div className="relative h-44 w-full overflow-hidden bg-black/10">
                  <img
                    src={previewModalTheme.image}
                    alt="Preview hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a9f3c5]">
                      {previewModalTheme.subtitle}
                    </span>
                    <h4 className="text-base font-extrabold leading-tight">
                      Handcrafted Ceramics & Botanical Essentials
                    </h4>
                  </div>
                </div>

                {/* Products sample */}
                <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#f8f9ff] dark:bg-[#0f1724]">
                  {products.slice(0, 4).map(p => (
                    <div
                      key={p.id}
                      className="bg-white dark:bg-[#1a2535] p-2 rounded-xl shadow-xs border border-[#bfc9c0]/20 text-xs"
                    >
                      <img src={p.image} alt={p.title} className="w-full h-20 object-cover rounded-lg" />
                      <div className="font-bold text-[11px] truncate mt-1 text-[#121c2a] dark:text-white">
                        {p.title}
                      </div>
                      <div className="text-xs font-extrabold text-[#004328] dark:text-[#8ed6aa] mt-0.5">
                        ${p.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white dark:bg-[#182230] border-t border-[#bfc9c0]/20 flex items-center justify-between">
              <span className="text-xs text-[#707971] dark:text-[#9ab0a0]">
                Simulating theme for <strong>{tenant.name}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewModalTheme(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    handleApply(previewModalTheme);
                    setPreviewModalTheme(null);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#004328] text-white shadow-xs"
                >
                  Apply This Design
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
