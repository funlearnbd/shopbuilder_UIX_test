import React, { useState } from 'react';
import { 
  Coupon, 
  Announcement, 
  CustomerReview, 
  SocialPost, 
  DeliveryZone, 
  SEOSettings, 
  Tenant 
} from '../types';

interface MarketingViewProps {
  tenant: Tenant;
  coupons: Coupon[];
  onUpdateCoupons: (coupons: Coupon[]) => void;
  announcements: Announcement[];
  onUpdateAnnouncements: (announcements: Announcement[]) => void;
  reviews: CustomerReview[];
  onUpdateReviews: (reviews: CustomerReview[]) => void;
  socialPosts: SocialPost[];
  deliveryZones: DeliveryZone[];
  seoSettings: SEOSettings;
  onUpdateSeoSettings: (seo: SEOSettings) => void;
  onShowToast: (message: string) => void;
}

export const MarketingView: React.FC<MarketingViewProps> = ({
  tenant,
  coupons,
  onUpdateCoupons,
  announcements,
  onUpdateAnnouncements,
  reviews,
  onUpdateReviews,
  socialPosts,
  deliveryZones,
  seoSettings,
  onUpdateSeoSettings,
  onShowToast
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'coupons' | 'announcements' | 'reviews' | 'social' | 'delivery' | 'seo'>('coupons');
  
  // New coupon modal state
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDesc, setCouponDesc] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('15');
  const [minSpend, setMinSpend] = useState('35.00');

  // SEO Form State
  const [metaTitle, setMetaTitle] = useState(seoSettings.metaTitle);
  const [metaDescription, setMetaDescription] = useState(seoSettings.metaDescription);
  const [canonicalUrl, setCanonicalUrl] = useState(seoSettings.canonicalUrl);

  const handleToggleCoupon = (id: string) => {
    const updated = coupons.map(c => c.id === id ? { ...c, active: !c.active } : c);
    onUpdateCoupons(updated);
    onShowToast('Updated coupon active state');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;

    const newCpn: Coupon = {
      id: `cpn-${Date.now()}`,
      code: couponCode.trim().toUpperCase(),
      description: couponDesc || 'Special promotion',
      discountType,
      discountValue: parseFloat(discountValue) || 10,
      minSpend: parseFloat(minSpend) || 0,
      maxUses: 200,
      usesCount: 0,
      validUntil: 'Dec 31, 2026',
      active: true
    };

    onUpdateCoupons([newCpn, ...coupons]);
    setIsAddCouponOpen(false);
    setCouponCode('');
    setCouponDesc('');
    onShowToast(`Created coupon code: ${newCpn.code}`);
  };

  const handleToggleAnnouncement = (id: string) => {
    const updated = announcements.map(a => a.id === id ? { ...a, active: !a.active } : a);
    onUpdateAnnouncements(updated);
    onShowToast('Storefront announcement bar updated');
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSeoSettings({
      ...seoSettings,
      metaTitle,
      metaDescription,
      canonicalUrl
    });
    onShowToast('Saved SEO & OpenGraph social sharing meta tags');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0] mb-0.5">
          <span>Customer Acquisition & Reach</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#004328] dark:text-[#8ed6aa]">Marketing & Engagement</span>
        </div>
        <h1 className="text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff]">
          Marketing, Engagement & Growth
        </h1>
        <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-0.5">
          Manage promotional coupons, storefront announcement banners, social lookbook feeds, customer reviews, delivery zones, and SEO for {tenant.name}.
        </p>
      </div>

      {/* Subtab Navigator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-[#bfc9c0]/20">
        {[
          { id: 'coupons', label: 'Coupons & Promo Codes', icon: 'sell', count: coupons.length },
          { id: 'announcements', label: 'Store Announcements', icon: 'campaign', count: announcements.filter(a => a.active).length },
          { id: 'reviews', label: 'Customer Reviews', icon: 'reviews', count: reviews.length },
          { id: 'social', label: 'Social Media Feed', icon: 'share', count: socialPosts.length },
          { id: 'delivery', label: 'Delivery Zones & SLA', icon: 'local_shipping', count: deliveryZones.length },
          { id: 'seo', label: 'SEO & Social Cards', icon: 'search', count: null }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeSubTab === tab.id
                ? 'bg-[#004328] dark:bg-[#0d5c3a] text-white shadow-xs'
                : 'text-[#404942] dark:text-[#bfc9c0] hover:bg-[#eff4ff] dark:hover:bg-[#1a2535]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeSubTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#eff4ff] dark:bg-[#223045] text-[#707971]'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: COUPONS & PROMO CODES */}
      {activeSubTab === 'coupons' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
              Active Promo Discounts & Vouchers
            </h3>
            <button
              onClick={() => setIsAddCouponOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#004328] dark:bg-[#0d5c3a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>+ Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coupons.map(cpn => (
              <div
                key={cpn.id}
                className={`p-4 rounded-2xl bg-white dark:bg-[#1a2535] shadow-xs border transition-all ${
                  cpn.active ? 'border-[#004328]/40 dark:border-[#8ed6aa]/40' : 'border-[#bfc9c0]/30 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-mono text-base font-extrabold text-[#004328] dark:text-[#8ed6aa] tracking-wider bg-[#eff4ff] dark:bg-[#223045] px-2.5 py-1 rounded-lg">
                    {cpn.code}
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cpn.active}
                      onChange={() => handleToggleCoupon(cpn.id)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4.5 bg-[#d9e3f6] dark:bg-[#27313f] peer-checked:bg-[#004328] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all" />
                  </label>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-extrabold text-[#121c2a] dark:text-white">
                    {cpn.discountType === 'percentage' ? `${cpn.discountValue}% OFF` : `$${cpn.discountValue.toFixed(2)} OFF`}
                  </div>
                  <p className="text-xs text-[#707971] dark:text-[#9ab0a0] mt-0.5 leading-snug">
                    {cpn.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#bfc9c0]/20 flex items-center justify-between text-[11px] text-[#707971]">
                  <span>Min Spend: ${cpn.minSpend.toFixed(2)}</span>
                  <span>Used: <strong>{cpn.usesCount}</strong>/{cpn.maxUses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STORE ANNOUNCEMENTS */}
      {activeSubTab === 'announcements' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-5 shadow-xs border border-[#bfc9c0]/30 space-y-4">
            <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
              Storefront Top Header Announcement Strip
            </h3>
            <p className="text-xs text-[#707971] dark:text-[#9ab0a0]">
              Active announcements automatically render in a prominent top ticker on both desktop and mobile buyer storefronts.
            </p>

            <div className="space-y-3">
              {announcements.map(anc => (
                <div
                  key={anc.id}
                  className="p-3.5 rounded-xl border border-[#bfc9c0]/30 bg-[#eff4ff]/50 dark:bg-[#223045]/50 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-[#004328] dark:text-[#8ed6aa] text-[20px] shrink-0">
                      campaign
                    </span>
                    <div className="min-w-0">
                      {anc.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-[#004328] text-white px-1.5 py-0.2 rounded mr-2">
                          {anc.badge}
                        </span>
                      )}
                      <span className="text-xs font-medium text-[#121c2a] dark:text-white">
                        {anc.message}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleToggleAnnouncement(anc.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        anc.active
                          ? 'bg-[#a9f3c5] text-[#002111] dark:bg-[#005232] dark:text-[#a9f3c5]'
                          : 'bg-white dark:bg-[#1a2535] text-[#707971] border border-[#bfc9c0]/30'
                      }`}
                    >
                      {anc.active ? 'Broadcasting Live' : 'Hidden'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER REVIEWS & ENGAGEMENT */}
      {activeSubTab === 'reviews' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
                Customer Ratings & Feedback
              </h3>
              <p className="text-xs text-[#707971] dark:text-[#9ab0a0]">
                Verified buyer reviews automatically build trust for doorstep Cash on Delivery shoppers.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-[#004328] dark:text-[#8ed6aa]">4.9</span>
              <span className="text-sm text-[#9b4500]">★★★★★</span>
              <span className="text-xs text-[#707971]">(86 verified reviews)</span>
            </div>
          </div>

          <div className="space-y-3">
            {reviews.map(rev => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1a2535] shadow-xs border border-[#bfc9c0]/30 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#121c2a] dark:text-white">{rev.author}</span>
                      <span className="text-xs text-[#9b4500]">{'★'.repeat(rev.rating)}</span>
                      <span className="text-[10px] text-[#707971]">{rev.date}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#004328] dark:text-[#8ed6aa] mt-0.5">
                      Review for: {rev.productTitle}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#707971]">
                    👍 {rev.helpfulCount} found helpful
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#121c2a] dark:text-white">{rev.title}</h4>
                <p className="text-xs text-[#404942] dark:text-[#9ab0a0] leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SOCIAL MEDIA LOOKBOOK */}
      {activeSubTab === 'social' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
                Instagram & Facebook Shoppable Feed
              </h3>
              <p className="text-xs text-[#707971] dark:text-[#9ab0a0]">
                Embed real social posts on your storefront with links and direct product purchase tags.
              </p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#004328] dark:text-[#8ed6aa] hover:underline"
            >
              @maisonbotanica on Instagram &rarr;
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialPosts.map(post => (
              <div
                key={post.id}
                className="group rounded-2xl overflow-hidden bg-white dark:bg-[#1a2535] shadow-xs border border-[#bfc9c0]/30 flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-black/10">
                  <img
                    src={post.imageUrl}
                    alt="Social feed"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <span>❤️ {post.likes}</span>
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between text-xs space-y-2">
                  <p className="text-[11px] text-[#404942] dark:text-[#9ab0a0] line-clamp-2 leading-snug">
                    {post.caption}
                  </p>
                  {post.taggedProductTitle && (
                    <div className="pt-2 border-t border-[#bfc9c0]/20 flex items-center justify-between font-bold">
                      <span className="text-[11px] text-[#004328] dark:text-[#8ed6aa] truncate max-w-[120px]">
                        {post.taggedProductTitle}
                      </span>
                      <span className="text-xs">${post.taggedPrice?.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: DELIVERY ZONES & SLA */}
      {activeSubTab === 'delivery' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-5 shadow-xs border border-[#bfc9c0]/30 space-y-4">
            <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
              Doorstep Delivery Coverage & Courier SLAs
            </h3>
            <p className="text-xs text-[#707971] dark:text-[#9ab0a0]">
              Customers can check delivery time and courier fee calculation by entering their postcode directly on the storefront.
            </p>

            <div className="space-y-3">
              {deliveryZones.map(zone => (
                <div
                  key={zone.id}
                  className="p-4 rounded-xl border border-[#bfc9c0]/30 bg-[#eff4ff]/40 dark:bg-[#223045]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#121c2a] dark:text-white">{zone.name}</h4>
                    <p className="text-[11px] text-[#707971] dark:text-[#9ab0a0] mt-0.5">{zone.coverage}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px]">
                      <span className="text-[#004328] dark:text-[#8ed6aa] font-bold">⏱️ {zone.estimatedHours}</span>
                      <span className="text-[#005232]">✓ COD Cash On Delivery Active</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-[#121c2a] dark:text-white">
                      ${zone.baseFee.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[#707971] block">
                      Free over ${zone.freeAbove.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SEO & SOCIAL SHARING CARDS */}
      {activeSubTab === 'seo' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Form */}
          <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-5 shadow-xs border border-[#bfc9c0]/30 space-y-4">
            <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
              Search Engine & Social Preview Configuration
            </h3>

            <form onSubmit={handleSaveSeo} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                  Meta Title (Browser Tab & Google Header)
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-semibold text-[#121c2a] dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                  Meta Description (Google Snippet & Social Share)
                </label>
                <textarea
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-mono text-[#121c2a] dark:text-white outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#004328] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#0d5c3a]"
                >
                  Save Meta Settings
                </button>
              </div>
            </form>
          </div>

          {/* Social OpenGraph Visual Card Preview */}
          <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-5 shadow-xs border border-[#bfc9c0]/30 space-y-3">
            <h4 className="text-xs font-bold text-[#707971] uppercase tracking-wider">
              Live Social Share Card Preview (WhatsApp, Facebook, Twitter, iMessage)
            </h4>
            <div className="max-w-md rounded-2xl overflow-hidden border border-[#bfc9c0]/30 bg-[#eff4ff] dark:bg-[#182230] shadow-sm">
              <img
                src={seoSettings.ogImage}
                alt="OG Preview"
                className="w-full h-44 object-cover"
              />
              <div className="p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-[#707971] uppercase">kiosk.shop/maison-botanica</span>
                <h4 className="text-xs font-bold text-[#121c2a] dark:text-white leading-snug">
                  {metaTitle}
                </h4>
                <p className="text-[11px] text-[#404942] dark:text-[#9ab0a0] line-clamp-2">
                  {metaDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Coupon Modal */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#bfc9c0]/20 pb-3">
              <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
                Create Promotional Coupon
              </h3>
              <button onClick={() => setIsAddCouponOpen(false)} className="w-7 h-7 flex items-center justify-center text-[#707971]">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#707971] uppercase mb-1">
                  Coupon Promo Code *
                </label>
                <input
                  type="text"
                  required
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FLASH20"
                  className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] font-mono font-bold text-sm text-[#004328] dark:text-[#8ed6aa] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#707971] uppercase mb-1">
                  Offer Description
                </label>
                <input
                  type="text"
                  value={couponDesc}
                  onChange={(e) => setCouponDesc(e.target.value)}
                  placeholder="e.g. 20% off all artisan tableware"
                  className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#707971] uppercase mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Cash ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#707971] uppercase mb-1">
                    Value *
                  </label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] font-bold text-xs text-[#121c2a] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#707971] uppercase mb-1">
                  Minimum Basket Spend ($)
                </label>
                <input
                  type="number"
                  value={minSpend}
                  onChange={(e) => setMinSpend(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-medium text-[#121c2a] dark:text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#bfc9c0]/20">
                <button
                  type="button"
                  onClick={() => setIsAddCouponOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#004328] text-white shadow-xs hover:bg-[#0d5c3a]"
                >
                  Save & Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
