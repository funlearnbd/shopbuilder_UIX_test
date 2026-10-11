import React, { useState, useEffect } from 'react';
import { 
  Product, 
  Tenant, 
  Coupon, 
  Announcement, 
  CustomerReview, 
  SocialPost, 
  DeliveryZone,
  ThemeTemplate,
  ThemeColorPalette
} from '../types';
import { THEME_PALETTES, THEME_SAMPLE_PRODUCTS, DEMO_MEDIA } from '../data/mockData';

interface StorefrontViewProps {
  tenant: Tenant;
  products: Product[];
  coupons?: Coupon[];
  announcements?: Announcement[];
  reviews?: CustomerReview[];
  onUpdateReviews?: (reviews: CustomerReview[]) => void;
  socialPosts?: SocialPost[];
  deliveryZones?: DeliveryZone[];
  wishlist?: string[];
  onToggleWishlist?: (productId: string) => void;
  onOpenProductModal?: (product: Product) => void;
  themes?: ThemeTemplate[];
  activeThemeId?: string;
  onSelectTheme?: (themeId: string) => void;
  onShowToast: (message: string) => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({
  tenant,
  products,
  coupons = [],
  announcements = [],
  reviews = [],
  onUpdateReviews,
  socialPosts = [],
  deliveryZones = [],
  wishlist = [],
  onToggleWishlist,
  onOpenProductModal,
  themes = [],
  activeThemeId = 'theme-modern',
  onSelectTheme,
  onShowToast
}) => {
  // Current active layout ID (from props or local fallback)
  const [currentLayoutId, setCurrentLayoutId] = useState<string>(activeThemeId);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Showcase Demo Catalog vs Live Catalog toggle (defaults to showcase demo so realistic photos are immediately visible)
  const [useShowcaseDemo, setUseShowcaseDemo] = useState<boolean>(true);

  // Cart state
  const initialCatalog = THEME_SAMPLE_PRODUCTS[activeThemeId] || products;
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([
    { product: initialCatalog[0] || products[0], qty: 1 },
    { product: initialCatalog[1] || products[1], qty: 1 }
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [expressPhone, setExpressPhone] = useState('');
  const [expressOrdered, setExpressOrdered] = useState(false);

  // Announcement state
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<string[]>([]);

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Review submission modal state
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewProductId, setReviewProductId] = useState(products[0]?.id || '');

  // Order status lookup state
  const [trackOrderNumber, setTrackOrderNumber] = useState('');
  const [trackedOrderResult, setTrackedOrderResult] = useState<{
    found: boolean;
    orderNumber: string;
    status: string;
    courier: string;
    eta: string;
    codAmount: number;
  } | null>(null);

  // Layout-specific state: Home & Living room tab
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  // Layout-specific state: Beauty ritual step tab
  const [selectedRitual, setSelectedRitual] = useState<string>('all');
  // Layout-specific state: Countdown ticker for Deals
  const [countdownSeconds, setCountdownSeconds] = useState(12845);

  useEffect(() => {
    setCurrentLayoutId(activeThemeId);
  }, [activeThemeId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 14400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}h : ${mins.toString().padStart(2, '0')}m : ${secs.toString().padStart(2, '0')}s`;
  };

  // Cart calculations
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (rawSubtotal * appliedCoupon.discountValue) / 100;
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }
  const cartTotal = Math.max(0, rawSubtotal - discountAmount);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const code = promoInput.trim().toUpperCase();
    const match = coupons.find(c => c.code.toUpperCase() === code && c.active);

    if (match) {
      if (rawSubtotal < match.minSpend) {
        onShowToast(`Coupon requires a minimum order of $${match.minSpend.toFixed(2)}`);
        return;
      }
      setAppliedCoupon(match);
      onShowToast(`Coupon "${match.code}" applied! Discount calculated.`);
    } else if (code === 'FLASH40') {
      // Automatic flash coupon support
      setAppliedCoupon({
        id: 'flash-40',
        code: 'FLASH40',
        discountType: 'percentage',
        discountValue: 40,
        minSpend: 0,
        active: true,
        expiresAt: 'Today',
        usageLimit: 100,
        usedCount: 42,
        description: 'Flash Deal 40% OFF Special'
      });
      onShowToast('Flash coupon "FLASH40" applied! 40% discount deducted.');
    } else {
      onShowToast(`Invalid promo code "${promoInput}". Try BOTANICA15 or FLASH40.`);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setPromoInput('');
    onShowToast('Coupon removed');
  };

  const handleAddToCart = (product: Product, delta = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const nextQty = existing.qty + delta;
        if (nextQty <= 0) return prev.filter(item => item.product.id !== product.id);
        return prev.map(item =>
          item.product.id === product.id ? { ...item, qty: nextQty } : item
        );
      }
      if (delta > 0) return [...prev, { product, qty: delta }];
      return prev;
    });
    if (delta > 0) {
      onShowToast(`Added "${product.title}" to your bag`);
    }
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; qty: number }[];
    });
  };

  const handleExpressOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expressPhone) return;
    setExpressOrdered(true);
    onShowToast(`Express COD Order booked for ${expressPhone}. Courier arriving in 24-48 hrs!`);
    setTimeout(() => {
      setExpressPhone('');
      setExpressOrdered(false);
    }, 4000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const targetProd = products.find(p => p.id === reviewProductId) || products[0];
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      productId: targetProd.id,
      productTitle: targetProd.title,
      author: `${reviewName} (Verified Buyer)`,
      rating: reviewRating,
      title: reviewTitle || 'Excellent Quality',
      comment: reviewComment,
      date: 'Just now',
      verifiedBuyer: true,
      helpfulCount: 1
    };

    if (onUpdateReviews) {
      onUpdateReviews([newRev, ...reviews]);
    }
    setIsWriteReviewOpen(false);
    setReviewName('');
    setReviewComment('');
    setReviewTitle('');
    onShowToast('Thank you! Your feedback has been verified and published.');
  };

  const handleLikeReview = (revId: string) => {
    if (!onUpdateReviews) return;
    const updated = reviews.map(r => {
      if (r.id === revId) {
        return {
          ...r,
          helpfulCount: r.userLiked ? r.helpfulCount - 1 : r.helpfulCount + 1,
          userLiked: !r.userLiked
        };
      }
      return r;
    });
    onUpdateReviews(updated);
    onShowToast('Marked review as helpful');
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackOrderNumber.trim()) return;

    const num = trackOrderNumber.trim();
    if (num === '1084' || num === '1082' || num.length >= 3) {
      setTrackedOrderResult({
        found: true,
        orderNumber: num,
        status: 'Out for Doorstep Delivery',
        courier: 'Apex Urban Couriers (Driver: Alex R.)',
        eta: 'Today before 4:30 PM',
        codAmount: 50.00
      });
      onShowToast(`Order #${num} located: Out for delivery`);
    } else {
      setTrackedOrderResult({
        found: false,
        orderNumber: num,
        status: 'Order Not Found',
        courier: '-',
        eta: '-',
        codAmount: 0
      });
      onShowToast(`Order #${num} not found. Please verify your order ID.`);
    }
  };

  // Switch between the 6 layouts
  const handleSelectLayout = (layoutId: string) => {
    setCurrentLayoutId(layoutId);
    if (onSelectTheme) {
      onSelectTheme(layoutId);
    }
    const themeName = themes.find(t => t.id === layoutId)?.name || layoutId;
    onShowToast(`Switched storefront design to "${themeName}"!`);
  };

  // The 6 layout definitions
  const layoutDefinitions = [
    {
      id: 'theme-modern',
      name: 'Modern Store',
      tag: 'Balanced 4-Col',
      icon: 'grid_view',
      desc: 'Clean 1:1 square grid, split hero & artisanal copy',
      accentColor: '#004328'
    },
    {
      id: 'theme-fashion',
      name: 'Fashion & Lifestyle',
      tag: 'Editorial 3:4',
      icon: 'styler',
      desc: 'Cinematic full-bleed hero & portrait cards',
      accentColor: '#3b1c2b'
    },
    {
      id: 'theme-deals',
      name: 'Products & Deals',
      tag: 'Turbo 5-Col',
      icon: 'local_fire_department',
      desc: 'High-density deal grid, urgent countdown & 1-click COD',
      accentColor: '#b91c1c'
    },
    {
      id: 'theme-beauty',
      name: 'Beauty & Care',
      tag: 'Rituals & Glow',
      icon: 'spa',
      desc: 'Circular routine avatars, clinical chips & amber oils',
      accentColor: '#9a3412'
    },
    {
      id: 'theme-home',
      name: 'Home & Living',
      tag: '16:9 Vignettes',
      icon: 'chair',
      desc: 'Room-by-room staging & interior lookbooks',
      accentColor: '#44403c'
    },
    {
      id: 'theme-essentials',
      name: 'Everyday Essentials',
      tag: 'Fast Reorder',
      icon: 'repeat',
      desc: 'Inline 1-tap quantity steppers & bulk savings',
      accentColor: '#0369a1'
    }
  ];

  const currentTheme = themes.find(t => t.id === currentLayoutId) || {
    id: currentLayoutId,
    name: layoutDefinitions.find(l => l.id === currentLayoutId)?.name || 'Modern Store',
    ratioBadge: 'Responsive',
    tagBadge: 'ACTIVE',
    subtitle: 'Production Design Layout'
  };

  // ACTIVE THEME COLOR COMBINATIONS:
  // Dynamically sourced per template. The entire storefront, hero, product cards, COD badges,
  // bottom delivery, trust badges, cart drawer, and footer adhere to this palette!
  const activePalette: ThemeColorPalette = currentTheme.palette || THEME_PALETTES[currentLayoutId] || THEME_PALETTES['theme-modern'];

  // Select between Showcase Demo catalog (with template-specific realistic photos) vs live merchant catalog
  const catalogSource = useShowcaseDemo 
    ? (THEME_SAMPLE_PRODUCTS[currentLayoutId] || products) 
    : products;

  const filterChips = [
    { id: 'all', label: `All (${catalogSource.length})` },
    { id: 'Electronics', label: 'Tech & Gadgets' },
    { id: 'Ritual Skincare', label: 'Skincare' },
    { id: 'Tableware', label: 'Tableware' },
    { id: 'Aromatics', label: 'Aromatics' },
    { id: 'wishlist', label: `Favourites (${wishlist.length})` }
  ];

  const filtered = catalogSource.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === 'wishlist') {
      return matchesSearch && wishlist.includes(p.id);
    }
    const matchesCat = selectedCategory === 'all' || 
      (selectedCategory === 'Electronics' && (p.category === 'Electronics' || p.title.includes('Bundle') || p.title.includes('Headphones'))) ||
      (selectedCategory === 'Ritual Skincare' && (p.category === 'Ritual Skincare' || p.category === 'Botanicals')) ||
      (selectedCategory === 'Tableware' && (p.category === 'Tableware' || p.category === 'Ceramics')) ||
      (selectedCategory === 'Aromatics' && (p.category === 'Aromatics' || p.category === 'Botanicals'));
    return matchesSearch && matchesCat;
  });

  const activeAnnouncements = announcements.filter(a => a.active && !dismissedAnnouncements.includes(a.id));

  return (
    <div className="w-full space-y-8 pb-32 animate-in fade-in duration-200">
      {/* 1. STORE ANNOUNCEMENTS BANNER (DYNAMIC COLOR COMBINATION) */}
      {activeAnnouncements.length > 0 && (
        <div className="space-y-2">
          {activeAnnouncements.map(item => (
            <div 
              key={item.id}
              style={{ backgroundColor: activePalette.primary }}
              className="w-full text-white px-4 py-2.5 rounded-2xl flex items-center justify-between gap-3 text-xs shadow-sm animate-in slide-in-from-top-1 transition-colors duration-300"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {item.badge && (
                  <span 
                    style={{ backgroundColor: activePalette.accent, color: activePalette.accentText }}
                    className="px-2 py-0.5 rounded-full font-extrabold text-[10px] uppercase tracking-wider shrink-0"
                  >
                    {item.badge}
                  </span>
                )}
                <span className="font-medium truncate">{item.message}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {item.linkText && (
                  <button 
                    onClick={() => {
                      if (item.linkTarget === 'storefront') {
                        setPromoInput(currentLayoutId === 'theme-deals' ? 'FLASH40' : 'BOTANICA15');
                        onShowToast(`Promo code loaded! Open your bag to apply.`);
                      }
                    }}
                    style={{ color: activePalette.accent }}
                    className="underline font-bold hover:text-white transition-colors"
                  >
                    {item.linkText}
                  </button>
                )}
                <button
                  onClick={() => setDismissedAnnouncements(prev => [...prev, item.id])}
                  className="w-5 h-5 rounded-full hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white"
                  title="Dismiss notification"
                >
                  <span className="material-symbols-outlined text-[15px]">close</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. THE 6 LAYOUT SELECTOR TOOLBAR (EXPLICITLY PROVIDES ALL 6 DESIGNS) */}
      <section className="w-full bg-white dark:bg-[#1a2535] p-3.5 sm:p-4 rounded-3xl border border-[#bfc9c0]/40 dark:border-[#27313f] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#bfc9c0]/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div 
              style={{ backgroundColor: activePalette.primary }}
              className="w-8 h-8 rounded-xl text-white flex items-center justify-center shrink-0 shadow-xs transition-colors duration-300"
            >
              <span className="material-symbols-outlined text-[18px]">view_quilt</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#121c2a] dark:text-white">
                  Storefront Design Engine
                </h3>
                <span 
                  style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                  className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase transition-colors duration-300"
                >
                  6 Layouts Active
                </span>
              </div>
              <p className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">
                Active Template: <strong style={{ color: activePalette.primary }}>{currentTheme.name}</strong> &bull; {currentTheme.ratioBadge || 'Custom Cadence'} &bull; Theme Accent: <span className="inline-block w-2.5 h-2.5 rounded-full align-middle ml-1" style={{ backgroundColor: activePalette.primary }} />
              </p>
            </div>
          </div>

          {/* Quick Utility Links (Catalog Toggle, WhatsApp & Wishlist) */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                setUseShowcaseDemo(prev => !prev);
                onShowToast(useShowcaseDemo ? 'Switched to Live Tenant Catalog' : `Switched to ${currentTheme.name} Realistic Showcase Demo`);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-colors"
              style={{
                backgroundColor: useShowcaseDemo ? activePalette.badgeBg : '#eff4ff',
                color: useShowcaseDemo ? activePalette.primary : '#404942',
                borderColor: useShowcaseDemo ? activePalette.primary : 'transparent'
              }}
              title="Toggle between Template Showcase Sample Photos and Tenant Live Catalog"
            >
              <span className="material-symbols-outlined text-[15px]">photo_library</span>
              <span>{useShowcaseDemo ? 'Demo Photos (Active)' : 'Tenant Catalog'}</span>
            </button>

            <a
              href="https://wa.me/18004567890?text=Hi%2C%20I%20have%20an%20inquiry%20about%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#25D366]/10 text-[#128C7E] dark:text-[#25D366] text-xs font-bold hover:bg-[#25D366]/20 transition-colors"
              title="Chat on WhatsApp"
            >
              <span className="material-symbols-outlined text-[15px]">chat</span>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              onClick={() => {
                setSelectedCategory('wishlist');
                onShowToast(`Viewing ${wishlist.length} saved wishlist items`);
              }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white border border-[#bfc9c0]/30 text-xs font-bold hover:bg-white"
              title="View Wishlist"
            >
              <span className="material-symbols-outlined text-[15px] text-[#ba1a1a]">favorite</span>
              <span>Saved ({wishlist.length})</span>
            </button>
          </div>
        </div>

        {/* 6 Layout Switcher Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {layoutDefinitions.map(layout => {
            const isSelected = currentLayoutId === layout.id;
            return (
              <button
                key={layout.id}
                onClick={() => handleSelectLayout(layout.id)}
                style={isSelected ? {
                  borderColor: layout.accentColor,
                  color: layout.accentColor,
                  backgroundColor: `${layout.accentColor}10`
                } : {}}
                className={`flex flex-col text-left p-2.5 rounded-2xl border transition-all text-xs relative ${
                  isSelected
                    ? 'shadow-xs font-bold ring-2'
                    : 'border-[#bfc9c0]/30 dark:border-[#27313f] bg-[#f8f9ff]/50 dark:bg-[#121c2a] hover:bg-white text-[#404942] dark:text-[#bfc9c0]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="material-symbols-outlined text-[18px]">
                    {layout.icon}
                  </span>
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white dark:bg-black/40' : 'bg-black/5 dark:bg-white/10'
                  }`}>
                    {layout.tag}
                  </span>
                </div>
                <span className="font-extrabold text-[11px] truncate block">
                  {layout.name}
                </span>
                <span className="text-[10px] text-[#707971] dark:text-[#9ab0a0] truncate mt-0.5 block">
                  {layout.desc}
                </span>
                {isSelected && (
                  <span 
                    style={{ backgroundColor: layout.accentColor }}
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-black" 
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* LAYOUT 1: MODERN STORE (Balanced 4-Col Split Hero) */}
      {/* ============================================================ */}
      {currentLayoutId === 'theme-modern' && (
        <section className="relative w-full rounded-3xl bg-[#eff4ff] dark:bg-[#182230] p-6 lg:p-10 overflow-hidden border border-[#bfc9c0]/40 dark:border-[#27313f] shadow-xs animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div 
                style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px]">eco</span>
                <span>Layout 1: Modern Store (Balanced 4-Col)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#121c2a] dark:text-[#f8f9ff] leading-tight">
                Artisanal Homewares & Living Essentials for{' '}
                <span style={{ color: activePalette.primary }} className="italic font-serif">
                  Intentional Living
                </span>
              </h1>
              <p className="text-base text-[#404942] dark:text-[#9ab0a0] max-w-xl leading-relaxed">
                Consciously formed ceramic vessels, natural wildcrafted room elixirs, and slow-crafted everyday tools. Ethically produced in Portland, OR with full door-to-door transparency.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#featured-catalog"
                  style={{ backgroundColor: activePalette.primary }}
                  className="inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md active:scale-[0.98] transition-all hover:opacity-90"
                >
                  <span>Shop New Arrivals</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <a
                  href="#reviews-section"
                  className="inline-flex items-center justify-center gap-2 bg-white dark:bg-[#1a2535] text-[#121c2a] dark:text-[#f8f9ff] px-6 py-3 rounded-xl text-sm font-bold border border-[#bfc9c0]/40 dark:border-[#27313f] hover:bg-[#eff4ff] transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#9b4500]">star</span>
                  <span>148 Verified Reviews (4.9/5)</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#27313f] aspect-4/3 sm:aspect-square">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaBw91rc6P7DCRIXLn52uUcpU2NyVkXw69Grl2zkhUyhEhSA_TrfwWlJf4k0NjtiSWHpxcd9Re5F89Qd3sLZpQFrrKGDr2YWq-mH1s05VtAiyR4Gqj4v-rkktxCXJy8BJl-F31kfg4g_J55nPMu6Ltn4QCfwr-Qw0JDMnoHgZoov1zPw0TjQwazX3jvBUOFuG-H6CrgM8h_kL-jCEvC2hnid4tvGPflgxhf_dWovkY7bkoOWZNzxQRvA"
                  alt="Maison Botanica Artisanal Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                  <div className="bg-white/95 dark:bg-[#1a2535]/95 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between w-full shadow-lg">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#707971] dark:text-[#9ab0a0] block">
                        Featured Piece
                      </span>
                      <h4 className="text-xs font-bold text-[#121c2a] dark:text-white">
                        Handmade Speckled Ceramic Mug
                      </h4>
                    </div>
                    <div className="text-right">
                      <span style={{ color: activePalette.primary }} className="text-xs font-extrabold block">
                        $28.00
                      </span>
                      <span style={{ color: activePalette.primary }} className="block text-[10px] font-bold">
                        COD Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* LAYOUT 2: FASHION & LIFESTYLE (Editorial Lookbook 3:4 Portrait) */}
      {/* ============================================================ */}
      {currentLayoutId === 'theme-fashion' && (
        <section className="relative w-full rounded-3xl overflow-hidden min-h-[460px] flex items-end p-6 lg:p-12 shadow-xl border border-[#bfc9c0]/30 animate-in fade-in duration-300"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(15,10,13,0.9) 0%, rgba(15,10,13,0.35) 50%, rgba(15,10,13,0.7) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQs5eUzTau7CgV_aW0GGJLl18VL23QoJs-Ay-QRe1RylRwtOQIPrTtYB5G861D3pSGKYSXzPoxPkkzs9H7GKCgRqFmttTcy17TDcFduauDYGbQAwCOHEQnceSKVdodxjlyt17-nlg3BFSyg2vY1Di7g7DPmzvuIOkFqf8evKQ5P1vX_wL8GA0cNyp4NwU6FptG4I8T5shN1NzX1TtIW6AqFUDUAigL6FlQCVzBqkh6U9xshOfu2NskXQ')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%'
          }}
        >
          <div className="relative z-10 max-w-2xl text-white space-y-4">
            <div 
              style={{ backgroundColor: `${activePalette.accent}30`, color: activePalette.accent }}
              className="inline-flex items-center gap-2 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20"
            >
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>Layout 2: Fashion & Editorial Lookbook</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal italic tracking-tight leading-tight">
              Natural Fibers & Slow Woven Living
            </h1>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
              Generous vertical silhouettes, natural flax and washed muslin linens curated for timeless aesthetic rituals. Inspect garments at doorstep delivery before paying.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#featured-catalog"
                className="bg-white text-[#121c2a] px-6 py-3 rounded-xl text-xs font-bold shadow-lg hover:bg-[#eff4ff] transition-all flex items-center gap-2"
              >
                <span>Browse Lookbook Catalog</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
              <span className="bg-black/40 backdrop-blur-md px-4 py-3 rounded-xl text-xs font-bold border border-white/20 flex items-center gap-2">
                <span style={{ color: activePalette.accent }} className="material-symbols-outlined text-[16px]">verified</span>
                <span>Full Garment Doorstep Inspection</span>
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* LAYOUT 3: PRODUCTS & DEALS (REALISTIC HERO PHOTO & COMMERCIAL FLASH TICKER) */}
      {/* ============================================================ */}
      {currentLayoutId === 'theme-deals' && (
        <section 
          style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 50%, #450a0a 100%)' }}
          className="w-full rounded-3xl text-white p-6 lg:p-8 relative overflow-hidden shadow-2xl animate-in fade-in duration-300 border border-red-500/30"
        >
          <div className="relative z-10 space-y-6">
            {/* Urgent Countdown Ticker Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 backdrop-blur-md p-3 px-4 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-amber-300 animate-bounce">local_fire_department</span>
                <span className="font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                  Layout 3: Flash Drop & High-Conversion Deals
                </span>
                <span className="bg-amber-400 text-black px-2 py-0.5 rounded text-[10px] font-black uppercase">
                  40% OFF ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono font-black text-xs sm:text-sm bg-black/60 px-3.5 py-1 rounded-xl text-amber-300 border border-amber-400/30">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>DEALS END IN {formatCountdown(countdownSeconds)}</span>
              </div>
            </div>

            {/* Split Commercial Deal Showcase Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px] text-amber-300">verified</span>
                  <span>100% Genuine Tech & Home Bundles &bull; Direct Doorstep COD</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
                  Super Deals & Factory Clearance Drops
                </h1>
                <p className="text-sm text-white/90 max-w-xl leading-relaxed">
                  Screen-efficient turbo catalog built for multi-SKU retail. Instant 1-click Cash on Delivery with no advance payment. Free door delivery over $35.
                </p>

                {/* Deal trust badges */}
                <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold">
                  <span className="bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                    <span className="text-amber-300">⚡</span> 1-Click Doorstep COD
                  </span>
                  <span className="bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                    <span className="text-amber-300">📦</span> Free Courier Delivery &gt; $35
                  </span>
                  <span className="bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                    <span className="text-amber-300">🛡️</span> Open Box Before Paying
                  </span>
                </div>

                {/* Instant Action CTA */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#featured-catalog"
                    className="bg-amber-400 hover:bg-amber-300 text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                  >
                    <span>Browse Flash Drops</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                  </a>
                  <button
                    onClick={() => {
                      setPromoInput('FLASH40');
                      setAppliedCoupon({
                        id: 'flash-40',
                        code: 'FLASH40',
                        discountType: 'percentage',
                        discountValue: 40,
                        minSpend: 0,
                        active: true,
                        expiresAt: 'Today',
                        usageLimit: 100,
                        usedCount: 42,
                        description: 'Flash Deal 40% OFF Special'
                      });
                      onShowToast('Coupon FLASH40 activated! 40% off applied in bag.');
                    }}
                    className="bg-black/50 hover:bg-black/70 border border-white/30 text-white px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <span>Apply Coupon FLASH40</span>
                    <span className="material-symbols-outlined text-[16px] text-amber-300">content_copy</span>
                  </button>
                </div>
              </div>

              {/* Realistic Hero Demo Photo Showcase Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 aspect-4/3 sm:aspect-16/10 group">
                  <img
                    src={DEMO_MEDIA.dealsHeroBanner}
                    alt="Realistic Product Deal Commercial Bundle"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Deal Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <div className="bg-black/85 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 w-full flex items-center justify-between shadow-2xl">
                      <div className="min-w-0 pr-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                          🔥 DEAL OF THE DAY
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-white truncate">
                          Sonus Pro Wireless ANC Earbuds & Smart Watch Bundle
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-base font-black text-amber-300">$68.00</span>
                          <span className="text-xs text-white/60 line-through">$114.00</span>
                          <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">SAVE 40%</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const dealItem = catalogSource[0] || products[0];
                          handleAddToCart(dealItem, 1);
                          setCartOpen(true);
                        }}
                        className="bg-amber-400 hover:bg-amber-300 text-black px-3.5 py-2 rounded-xl text-xs font-black shrink-0 shadow-md active:scale-95 transition-all"
                      >
                        Claim Deal &bull; COD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* LAYOUT 4: BEAUTY & CARE (REALISTIC HERO PHOTO & BOTANICAL RITUALS) */}
      {/* ============================================================ */}
      {currentLayoutId === 'theme-beauty' && (
        <section 
          style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)' }}
          className="relative w-full rounded-3xl p-6 lg:p-10 overflow-hidden border border-[#fed7aa] shadow-sm animate-in fade-in duration-300 dark:border-[#7c2d12]"
        >
          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div 
                  style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">spa</span>
                  <span>Layout 4: Clean Beauty & Botanical Care Rituals</span>
                </div>
                <h1 
                  style={{ color: '#431407' }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal leading-tight tracking-tight"
                >
                  Gentle Botanical Formulas For Intentional Rituals
                </h1>
                <p 
                  style={{ color: '#7c2d12' }}
                  className="text-sm leading-relaxed max-w-xl"
                >
                  Cold-pressed wild rosehip, Moroccan argan, and steam-distilled floral elixirs in apothecary amber jars. Certified cruelty-free and dermatologist tested for sensitive dermal barriers.
                </p>

                {/* Circular Ritual Step Selector */}
                <div className="space-y-2 pt-1">
                  <span 
                    style={{ color: activePalette.primary }}
                    className="text-[11px] uppercase tracking-wider font-extrabold block"
                  >
                    Select Your Daily Routine Step:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { step: '01', name: 'Gentle Cleanse', desc: 'Mineral Clay' },
                      { step: '02', name: 'Hydrate Mist', desc: 'Steam Rose' },
                      { step: '03', name: 'Glow Drops', desc: 'Amber Serum' },
                      { step: '04', name: 'Barrier Balm', desc: 'Whipped Shea' }
                    ].map(r => (
                      <button
                        key={r.step}
                        onClick={() => {
                          setSelectedRitual(r.name);
                          onShowToast(`Filtered care routine: ${r.name}`);
                        }}
                        style={selectedRitual === r.name ? {
                          borderColor: activePalette.primary,
                          backgroundColor: '#ffffff'
                        } : {}}
                        className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all ${
                          selectedRitual === r.name
                            ? 'shadow-sm ring-2 ring-orange-900/20'
                            : 'bg-white/80 border-orange-200 hover:bg-white'
                        }`}
                      >
                        <div 
                          style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-extrabold text-xs"
                        >
                          {r.step}
                        </div>
                        <div className="min-w-0">
                          <span style={{ color: '#431407' }} className="font-extrabold text-[11px] block truncate">
                            {r.name}
                          </span>
                          <span style={{ color: '#9a3412' }} className="text-[10px] truncate block">
                            {r.desc}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clinical Proof Chips */}
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  <span className="bg-white/90 text-[#431407] px-3 py-1 rounded-xl border border-orange-200 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#9a3412]">dermatology</span>
                    <span>Dermatologist Tested</span>
                  </span>
                  <span className="bg-white/90 text-[#431407] px-3 py-1 rounded-xl border border-orange-200 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#9a3412]">cruelty_free</span>
                    <span>100% Cruelty Free</span>
                  </span>
                  <span className="bg-white/90 text-[#431407] px-3 py-1 rounded-xl border border-orange-200 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#9a3412]">local_shipping</span>
                    <span>Doorstep Cash on Delivery</span>
                  </span>
                </div>
              </div>

              {/* Realistic Hero Demo Photo Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-16/10 group">
                  <img
                    src={DEMO_MEDIA.beautyHeroBanner}
                    alt="Realistic Beauty & Care Botanical Hero Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                    <div className="bg-white/95 dark:bg-[#1a2535]/95 backdrop-blur-md rounded-2xl p-3.5 flex items-center justify-between w-full shadow-lg border border-orange-100">
                      <div className="min-w-0 pr-2">
                        <span style={{ color: activePalette.primary }} className="text-[10px] uppercase font-bold block">
                          Featured Ritual Routine
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#121c2a] dark:text-white truncate">
                          Apothecary Trio Serum Routine Collection
                        </h4>
                        <span style={{ color: activePalette.primary }} className="text-xs font-extrabold block">
                          $64.00 (was $82.00, 3-Piece Set)
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const beautyItem = catalogSource[1] || products[0];
                          handleAddToCart(beautyItem, 1);
                          setCartOpen(true);
                        }}
                        style={{ backgroundColor: activePalette.primary }}
                        className="text-white px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 shadow-md active:scale-95 transition-all"
                      >
                        Add to Bag &bull; COD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* LAYOUT 5: HOME & LIVING (Spacious 16:9 Vignettes & Room Tabs) */}
      {/* ============================================================ */}
      {currentLayoutId === 'theme-home' && (
        <section className="relative w-full rounded-3xl bg-[#f2ede4] dark:bg-[#1f1e1a] p-6 lg:p-10 overflow-hidden border border-[#d5cbbe]/40 shadow-xs animate-in fade-in duration-300">
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <div 
                  style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined text-[15px]">chair</span>
                  <span>Layout 5: Home & Living (Room Staging)</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2a241c] dark:text-[#f5f1e8] leading-tight">
                  Spacious Vignettes & Crafted Interiors
                </h1>
                <p className="text-sm text-[#5a5247] dark:text-[#beb5a8] leading-relaxed">
                  Curated stoneware and organic textiles designed to bring grounding warmth to your living room, dining nook, and study.
                </p>
              </div>

              {/* Room Browser Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-white/80 dark:bg-black/40 p-1.5 rounded-2xl border border-[#d5cbbe]/30">
                {['All Spaces', 'Living Room', 'Dining Table', 'Bedroom Nook'].map(room => (
                  <button
                    key={room}
                    onClick={() => {
                      setSelectedRoom(room);
                      onShowToast(`Browsing staging for: ${room}`);
                    }}
                    style={selectedRoom === room || (room === 'All Spaces' && selectedRoom === 'all') ? {
                      backgroundColor: activePalette.primary,
                      color: '#ffffff'
                    } : {}}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedRoom === room || (room === 'All Spaces' && selectedRoom === 'all')
                        ? 'shadow-xs'
                        : 'text-[#5a5247] dark:text-[#beb5a8] hover:bg-[#e3dad0]/60'
                    }`}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Vignette Hero Feature */}
            <div className="relative aspect-21/9 sm:aspect-16/7 w-full rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ-ZV-EVEdcaXmXWYRqAO446hOEAJorPgsnsW6IyFtA3cChwLMvtBPm_lszc1o3iwaTMQ2mouWrJtcxAwdcWFskIH0fK4V9tIukf5vF7n80GY5UXCgzOPwXJgQAluwBEwhmNurGh2XcG-deODXMBiZSxmnXws8Xk-LlaeUMUiMU9R0srFB_fGmr4-Q880WYiX74lbkVYBjxRlwdsoK6id2TYBTdrQhqXOMofBB5c35jNYFs2bV8gGcYg"
                alt="Room Staging"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 text-white">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span style={{ color: activePalette.accent }} className="text-[11px] uppercase tracking-wider font-bold block">
                      Featured Vignette
                    </span>
                    <h3 className="text-base sm:text-xl font-bold">
                      The Sunlit Dining Suite & Raw Terracotta Ensemble
                    </h3>
                  </div>
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold border border-white/20">
                    Doorstep Bulky Item Verification Included
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* LAYOUT 6: EVERYDAY ESSENTIALS (Fast Reorder Ribbon & 1-Tap Inline Stepper) */}
      {/* ============================================================ */}
      {currentLayoutId === 'theme-essentials' && (
        <section className="relative w-full rounded-3xl bg-[#e6f1f8] dark:bg-[#121f28] p-6 lg:p-8 overflow-hidden border border-[#b8d4e7]/40 shadow-xs animate-in fade-in duration-300 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div 
                style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[15px]">repeat</span>
                <span>Layout 6: Everyday Essentials (Fast Reorder)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001f33] dark:text-[#def0fc]">
                Fast Reorders & Essential Pantry Refills
              </h1>
              <p className="text-xs sm:text-sm text-[#3b596d] dark:text-[#a0c2d8]">
                Utilitarian speed layout. Use 1-tap inline quantity steppers to stock your kitchen and studio in seconds.
              </p>
            </div>

            {/* Quick Reorder Recall Box */}
            <div className="bg-white dark:bg-[#1b2b36] p-3 rounded-2xl border border-[#b8d4e7]/40 shadow-xs flex items-center gap-2 max-w-sm w-full">
              <span style={{ color: activePalette.primary }} className="material-symbols-outlined text-[20px]">
                history
              </span>
              <input
                type="tel"
                placeholder="Enter phone to repeat order..."
                className="bg-transparent text-xs text-[#121c2a] dark:text-white outline-none flex-1"
              />
              <button
                onClick={() => onShowToast('Loaded previous essentials for rapid checkout!')}
                style={{ backgroundColor: activePalette.primary }}
                className="text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:opacity-90 shrink-0"
              >
                Reorder
              </button>
            </div>
          </div>

          {/* Bulk Tier Discount Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
            <div className="bg-white/80 dark:bg-[#1b2b36]/80 p-2.5 rounded-xl border border-[#b8d4e7]/40 flex items-center gap-2 font-bold" style={{ color: activePalette.primary }}>
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Tier 1: Buy Any 2 &bull; Save $5.00</span>
            </div>
            <div className="bg-white/80 dark:bg-[#1b2b36]/80 p-2.5 rounded-xl border border-[#b8d4e7]/40 flex items-center gap-2 font-bold" style={{ color: activePalette.primary }}>
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              <span>Tier 2: Orders &gt; $40 &bull; Free Express COD</span>
            </div>
            <div className="bg-white/80 dark:bg-[#1b2b36]/80 p-2.5 rounded-xl border border-[#b8d4e7]/40 flex items-center gap-2 font-bold" style={{ color: activePalette.primary }}>
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>Doorstep Reorder &bull; Delivered in &lt;24h</span>
            </div>
          </div>
        </section>
      )}

      {/* 4. PRODUCT CATALOG GRID: MATCHES TEMPLATE PALETTE & ASPECT RATIO */}
      <section id="featured-catalog" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
              Catalog & Available Batches
            </h2>
            <p className="text-xs text-[#707971] dark:text-[#9ab0a0] mt-0.5">
              Template: <strong style={{ color: activePalette.primary }}>{currentTheme.name}</strong> &bull; {useShowcaseDemo ? 'Viewing Template Showcase Demo Items' : 'Viewing Live Merchant Products'}
            </p>
          </div>

          {/* Search bar */}
          <div className="flex items-center bg-white dark:bg-[#1a2535] rounded-xl px-3 py-1.5 border border-[#bfc9c0]/40 shadow-xs max-w-xs w-full">
            <span className="material-symbols-outlined text-[18px] text-[#707971] mr-2">search</span>
            <input
              type="text"
              placeholder="Filter catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-[#121c2a] dark:text-white outline-none flex-1"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-xs text-[#707971]">✕</button>
            )}
          </div>
        </div>

        {/* Category Filter Pills (Active matches activePalette.primary) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterChips.map(chip => {
            const isActive = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedCategory(chip.id)}
                style={isActive ? {
                  backgroundColor: activePalette.primary,
                  color: '#ffffff'
                } : {}}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'shadow-xs'
                    : 'bg-white dark:bg-[#1a2535] text-[#404942] dark:text-[#bfc9c0] border border-[#bfc9c0]/30 hover:bg-[#eff4ff]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid: Adapts column count and aspect ratio to each layout */}
        <div className={`grid gap-4 ${
          currentLayoutId === 'theme-deals'
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' // High density 5-col for deals
            : currentLayoutId === 'theme-fashion'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' // Spacious 3-col for fashion
            : currentLayoutId === 'theme-home'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' // Spacious 3-col for home lookbooks
            : currentLayoutId === 'theme-essentials'
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' // Fast scan 5-col for essentials
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' // Balanced 4-col for modern & beauty
        }`}>
          {filtered.map(product => {
            const isFav = wishlist.includes(product.id);
            const cartItem = cartItems.find(item => item.product.id === product.id);
            const currentItemQty = cartItem ? cartItem.qty : 0;

            return (
              <article
                key={product.id}
                className="group flex flex-col bg-white dark:bg-[#1a2535] rounded-2xl overflow-hidden shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] hover:shadow-md transition-all relative"
              >
                {/* Product Image Area with layout-specific aspect ratio */}
                <div 
                  onClick={() => onOpenProductModal && onOpenProductModal(product)}
                  className={`relative w-full bg-[#eff4ff] dark:bg-[#182230] overflow-hidden cursor-pointer ${
                    currentLayoutId === 'theme-fashion'
                      ? 'aspect-3/4' // Tall 3:4 portrait for Fashion
                      : currentLayoutId === 'theme-home'
                      ? 'aspect-4/3' // Wide 4:3 for Home & Living
                      : 'aspect-square' // Standard 1:1 square for Modern, Deals, Beauty, Essentials
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  {currentLayoutId === 'theme-deals' ? (
                    <span 
                      style={{ backgroundColor: activePalette.primary }}
                      className="absolute top-2 left-2 text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow-md animate-pulse"
                    >
                      {product.discountBadge || 'SAVE 40%'}
                    </span>
                  ) : product.discountBadge ? (
                    <span 
                      style={{ backgroundColor: activePalette.primary }}
                      className="absolute top-2 left-2 text-white px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs"
                    >
                      {product.discountBadge}
                    </span>
                  ) : product.stock === 0 ? (
                    <span className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      Sold Out
                    </span>
                  ) : (
                    <span 
                      style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                      className="absolute top-2 left-2 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shadow-xs"
                    >
                      In Stock
                    </span>
                  )}

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleWishlist) onToggleWishlist(product.id);
                      onShowToast(isFav ? `Removed ${product.title} from wishlist` : `Saved ${product.title} to favourites!`);
                    }}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                      isFav 
                        ? 'bg-red-50 text-red-600 shadow-md' 
                        : 'bg-white/80 dark:bg-black/60 text-[#707971] hover:text-red-500 hover:bg-white'
                    }`}
                    title={isFav ? 'Remove from wishlist' : 'Save to favourites'}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isFav ? 'text-[#ba1a1a]' : ''}`}>
                      {isFav ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 flex flex-col flex-1 justify-between gap-2.5">
                  <div 
                    onClick={() => onOpenProductModal && onOpenProductModal(product)}
                    className="cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#121c2a] dark:text-[#f8f9ff] line-clamp-1 mt-0.5 transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span 
                        style={{ color: activePalette.primary }}
                        className="text-sm font-extrabold"
                      >
                        ${product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-[11px] text-[#707971] line-through">
                          ${product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Controls: If Layout 6 (Essentials), render 1-tap inline stepper */}
                  {currentLayoutId === 'theme-essentials' ? (
                    <div className="flex items-center justify-between bg-[#eff4ff] dark:bg-[#223045] rounded-xl p-1 border border-[#bfc9c0]/30">
                      <button
                        onClick={() => handleAddToCart(product, -1)}
                        disabled={currentItemQty === 0}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-[#1a2535] text-xs font-bold disabled:opacity-30 active:scale-95"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-2">
                        {currentItemQty > 0 ? `${currentItemQty} in bag` : 'Add'}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        style={{ backgroundColor: activePalette.primary }}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-white text-xs font-bold active:scale-95 shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-1.5">
                      <button
                        disabled={product.stock === 0}
                        onClick={() => handleAddToCart(product)}
                        style={{
                          backgroundColor: currentLayoutId === 'theme-deals' ? activePalette.primary : undefined,
                          color: currentLayoutId === 'theme-deals' ? '#ffffff' : undefined
                        }}
                        className={`flex-1 h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs ${
                          currentLayoutId === 'theme-deals'
                            ? 'hover:opacity-90 font-extrabold'
                            : 'bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white hover:bg-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                        <span>{product.stock === 0 ? 'Sold Out' : currentLayoutId === 'theme-deals' ? 'Instant COD' : 'Quick Add'}</span>
                      </button>
                      <button
                        onClick={() => onOpenProductModal && onOpenProductModal(product)}
                        className="w-9 h-9 rounded-xl bg-white dark:bg-[#1a2535] border border-[#bfc9c0]/30 hover:bg-[#eff4ff] flex items-center justify-center text-[#707971] hover:text-[#121c2a]"
                        title="Specs & Reviews"
                      >
                        <span className="material-symbols-outlined text-[17px]">visibility</span>
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. PROMOTIONAL VALUE BANNER: DYNAMICALLY MATCHES EACH TEMPLATE'S PALETTE! */}
      {/* (Crucial fix: previously hardcoded in forest green #004328; now perfectly harmonizes with Red for Deals, Terracotta for Beauty, etc.) */}
      <section 
        style={{ backgroundColor: activePalette.primary }}
        className="w-full rounded-3xl text-white p-6 lg:p-10 relative overflow-hidden shadow-xl transition-colors duration-300"
      >
        <div 
          style={{ backgroundColor: `${activePalette.accent}20` }}
          className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div 
              style={{ backgroundColor: activePalette.accent, color: activePalette.accentText }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Zero-Risk Doorstep Ordering Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Pay Cash on Delivery — Inspect Upon Arrival
            </h2>
            <p className="text-sm text-white/90 max-w-2xl leading-relaxed">
              Zero upfront payment needed. Open your parcel directly in front of the courier before handing over payment. If anything does not meet your standard, 7-day hassle-free replacement is fully covered.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl">
                <span style={{ color: activePalette.accent }} className="material-symbols-outlined text-[22px] mb-1">speed</span>
                <h4 className="text-xs font-bold text-white">30-Second Checkout</h4>
                <p className="text-[11px] text-white/80 mt-0.5">Order via WhatsApp or Web without passwords</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl">
                <span style={{ color: activePalette.accent }} className="material-symbols-outlined text-[22px] mb-1">payments</span>
                <h4 className="text-xs font-bold text-white">No Card Needed</h4>
                <p className="text-[11px] text-white/80 mt-0.5">Cash or QR scan directly upon doorstep arrival</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl">
                <span style={{ color: activePalette.accent }} className="material-symbols-outlined text-[22px] mb-1">recycling</span>
                <h4 className="text-xs font-bold text-white">Eco-Friendly Packs</h4>
                <p className="text-[11px] text-white/80 mt-0.5">100% biodegradable cornstarch and kraft paper</p>
              </div>
            </div>
          </div>

          {/* Quick Express COD Booking Box */}
          <div className="lg:col-span-4 bg-white dark:bg-[#1a2535] rounded-3xl p-5 text-[#121c2a] dark:text-white shadow-xl">
            <div className="flex items-center gap-2.5 mb-3">
              <div 
                style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
              >
                <span className="material-symbols-outlined text-[22px]">bolt</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#121c2a] dark:text-white">Express COD Order</h4>
                <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">Instant courier booking</span>
              </div>
            </div>

            <form onSubmit={handleExpressOrder} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] mb-1 uppercase tracking-wider">
                  Delivery Mobile Number
                </label>
                <div className="flex items-center bg-[#eff4ff] dark:bg-[#223045] rounded-xl px-3 py-2 border border-[#bfc9c0]/30">
                  <span className="material-symbols-outlined text-[#707971] text-[18px] mr-2">phone_iphone</span>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={expressPhone}
                    onChange={(e) => setExpressPhone(e.target.value)}
                    className="bg-transparent text-xs text-[#121c2a] dark:text-white outline-none flex-1 font-mono"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-[11px] text-[#707971] dark:text-[#9ab0a0] space-y-1">
                <div className="flex justify-between">
                  <span>Selected Item:</span>
                  <strong className="text-[#121c2a] dark:text-white truncate max-w-[150px]">{catalogSource[0]?.title || 'Featured Item'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Due Upon Arrival:</span>
                  <strong style={{ color: activePalette.primary }}>${(catalogSource[0]?.price || 28.00).toFixed(2)}</strong>
                </div>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: activePalette.primary }}
                disabled={expressOrdered}
                className="w-full py-3 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>{expressOrdered ? 'Order Booked!' : 'Confirm COD Delivery'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER FEEDBACK & REVIEWS SECTION (MATCHES ACTIVE PALETTE) */}
      <section id="reviews-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div 
              style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2"
            >
              <span className="material-symbols-outlined text-[16px]">reviews</span>
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
              Customer Experiences & Reviews
            </h2>
            <p className="text-xs text-[#707971] dark:text-[#9ab0a0] mt-0.5">
              100% verified doorstep deliveries across all active regional courier routes
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#1a2535] px-3.5 py-2 rounded-2xl border border-[#bfc9c0]/30 shadow-xs">
              <span style={{ color: activePalette.primary }} className="text-lg font-black">4.9</span>
              <div className="flex text-[#9b4500]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                ))}
              </div>
              <span className="text-xs text-[#707971] dark:text-[#9ab0a0] ml-1">({reviews.length} reviews)</span>
            </div>

            <button
              onClick={() => setIsWriteReviewOpen(true)}
              style={{ backgroundColor: activePalette.primary }}
              className="text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">rate_review</span>
              <span>Write Feedback</span>
            </button>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map(rev => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#1a2535] rounded-2xl p-4 border border-[#bfc9c0]/30 dark:border-[#27313f] shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px]">star</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-[#707971] dark:text-[#9ab0a0]">{rev.date}</span>
                </div>

                <h4 className="font-bold text-xs text-[#121c2a] dark:text-white">
                  {rev.title}
                </h4>
                <p className="text-xs text-[#404942] dark:text-[#bfc9c0] leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#bfc9c0]/20 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#121c2a] dark:text-white">{rev.author}</span>
                  {rev.verifiedBuyer && (
                    <span 
                      style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                      className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase"
                    >
                      Verified
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleLikeReview(rev.id)}
                  style={rev.userLiked ? { color: activePalette.primary } : {}}
                  className={`flex items-center gap-1 ${rev.userLiked ? 'font-bold' : 'text-[#707971]'}`}
                >
                  <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                  <span>{rev.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SOCIAL MEDIA BLOCK (INSTAGRAM & FACEBOOK PREVIEWS) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div 
              style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-1"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>Social Media & Community</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
              Tag Us On Instagram @maisonbotanica
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: activePalette.primary }}
            className="text-xs font-bold hover:underline flex items-center gap-1"
          >
            <span>Follow Our Studio</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialPosts.map(post => (
            <div 
              key={post.id}
              className="group bg-white dark:bg-[#1a2535] rounded-2xl overflow-hidden border border-[#bfc9c0]/30 dark:border-[#27313f] shadow-xs flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-[#eff4ff] dark:bg-[#223045]">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">photo_camera</span>
                  <span>Instagram</span>
                </span>
                {post.taggedProductTitle && (
                  <span className="absolute bottom-2 left-2 right-2 bg-white/95 dark:bg-black/85 backdrop-blur-md text-[#121c2a] dark:text-white px-2 py-1 rounded text-[10px] font-bold truncate">
                    🏷️ {post.taggedProductTitle} &bull; ${post.taggedPrice?.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#404942] dark:text-[#bfc9c0] line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#bfc9c0]/20 text-[11px] text-[#707971] dark:text-[#9ab0a0]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-red-500">favorite</span>
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                      <span>{post.comments}</span>
                    </span>
                  </div>
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: activePalette.primary }}
                    className="font-bold hover:underline"
                  >
                    View Post
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. DELIVERY INFORMATION & COVERAGE ZONES + ORDER TRACKING */}
      {/* (Crucial fix: all highlights and badges strictly match the active template's color palette) */}
      <section className="bg-[#eff4ff] dark:bg-[#182230] rounded-3xl p-6 lg:p-8 border border-[#bfc9c0]/30 dark:border-[#27313f] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div 
              style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2"
            >
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              <span>Delivery Information & Areas</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
              Fulfillment Coverage & Estimated Transit Times
            </h2>
            <p className="text-xs text-[#707971] dark:text-[#9ab0a0] mt-0.5">
              Handled by dedicated regional couriers with Cash on Delivery support
            </p>
          </div>

          <form onSubmit={handleTrackOrder} className="flex items-center bg-white dark:bg-[#1a2535] rounded-xl p-1 border border-[#bfc9c0]/40 shadow-xs max-w-sm w-full">
            <span className="material-symbols-outlined text-[18px] text-[#707971] ml-2 mr-1">
              search
            </span>
            <input
              type="text"
              placeholder="Track Order # (try 1084)"
              value={trackOrderNumber}
              onChange={(e) => setTrackOrderNumber(e.target.value)}
              className="bg-transparent text-xs text-[#121c2a] dark:text-white outline-none flex-1 px-1"
            />
            <button
              type="submit"
              style={{ backgroundColor: activePalette.primary }}
              className="text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition-all"
            >
              Track
            </button>
          </form>
        </div>

        {trackedOrderResult && (
          <div 
            style={{ borderColor: activePalette.primary }}
            className="bg-white dark:bg-[#1a2535] rounded-2xl p-4 border shadow-md animate-in fade-in"
          >
            <div className="flex items-center justify-between mb-2">
              <span 
                style={{ color: activePalette.primary }}
                className="text-xs font-bold uppercase tracking-wider flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[17px]">package_2</span>
                Order Status for #{trackedOrderResult.orderNumber}
              </span>
              <button 
                onClick={() => setTrackedOrderResult(null)}
                className="text-xs text-[#707971] hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            {trackedOrderResult.found ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="text-[#707971] block">Current Status</span>
                  <span style={{ color: activePalette.primary }} className="font-extrabold">
                    {trackedOrderResult.status}
                  </span>
                </div>
                <div>
                  <span className="text-[#707971] block">Courier & ETA</span>
                  <span className="font-bold text-[#121c2a] dark:text-white">
                    {trackedOrderResult.courier} ({trackedOrderResult.eta})
                  </span>
                </div>
                <div>
                  <span className="text-[#707971] block">COD Due Amount</span>
                  <span style={{ color: activePalette.primary }} className="font-extrabold">
                    ${trackedOrderResult.codAmount.toFixed(2)} (Cash or QR)
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-red-600">
                Order not found. Please check your order confirmation SMS or contact our WhatsApp desk.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deliveryZones.map(zone => (
            <div
              key={zone.id}
              className="bg-white dark:bg-[#1a2535] rounded-2xl p-4 border border-[#bfc9c0]/30 dark:border-[#27313f] shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-[#121c2a] dark:text-white">
                  {zone.name}
                </h4>
                {zone.codAvailable && (
                  <span 
                    style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                    className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                  >
                    COD Available
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">
                {zone.coverage}
              </p>
              <div className="pt-2 border-t border-[#bfc9c0]/20 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#707971] block text-[10px]">Transit Time</span>
                  <span style={{ color: activePalette.primary }} className="font-bold">
                    {zone.estimatedHours}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#707971] block text-[10px]">Courier Fee</span>
                  <span className="font-bold text-[#121c2a] dark:text-white">
                    ${zone.baseFee.toFixed(2)} (Free &gt; ${zone.freeAbove})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CUSTOMER TRUST, RETURN & EXCHANGE POLICY (MATCHES ACTIVE PALETTE) */}
      <section className="bg-white dark:bg-[#1a2535] rounded-3xl p-6 lg:p-8 border border-[#bfc9c0]/30 dark:border-[#27313f] space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
            Customer Trust & Policies
          </h2>
          <p className="text-xs text-[#707971] dark:text-[#9ab0a0] mt-0.5">
            Transparent terms to make your online and doorstep shopping 100% risk-free
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#eff4ff]/60 dark:bg-[#223045]/60 border border-[#bfc9c0]/30 space-y-1.5">
            <span style={{ color: activePalette.primary }} className="material-symbols-outlined text-[24px]">verified</span>
            <h4 className="font-bold text-[#121c2a] dark:text-white">Doorstep Inspection</h4>
            <p className="text-[#707971] dark:text-[#9ab0a0] leading-snug">
              Every customer is entitled to unbox the item in the presence of the courier before handing over payment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#eff4ff]/60 dark:bg-[#223045]/60 border border-[#bfc9c0]/30 space-y-1.5">
            <span style={{ color: activePalette.primary }} className="material-symbols-outlined text-[24px]">published_with_changes</span>
            <h4 className="font-bold text-[#121c2a] dark:text-white">7-Day Free Exchange</h4>
            <p className="text-[#707971] dark:text-[#9ab0a0] leading-snug">
              If an item or size is not what you expected, request a complimentary courier swap within 7 days.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#eff4ff]/60 dark:bg-[#223045]/60 border border-[#bfc9c0]/30 space-y-1.5">
            <span style={{ color: activePalette.primary }} className="material-symbols-outlined text-[24px]">lock</span>
            <h4 className="font-bold text-[#121c2a] dark:text-white">Zero Account Force</h4>
            <p className="text-[#707971] dark:text-[#9ab0a0] leading-snug">
              Order directly with your mobile number. We never force you to set up passwords or sign up for spam newsletters.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#eff4ff]/60 dark:bg-[#223045]/60 border border-[#bfc9c0]/30 space-y-1.5">
            <span style={{ color: activePalette.primary }} className="material-symbols-outlined text-[24px]">support_agent</span>
            <h4 className="font-bold text-[#121c2a] dark:text-white">Customer Support</h4>
            <p className="text-[#707971] dark:text-[#9ab0a0] leading-snug">
              Direct hotline and WhatsApp desk managed by our studio team: +1 (800) 456-7890.
            </p>
          </div>
        </div>
      </section>

      {/* 10. STOREFRONT FOOTER (MATCHES ACTIVE PALETTE) */}
      <footer className="bg-white dark:bg-[#1a2535] rounded-3xl p-6 lg:p-8 border border-[#bfc9c0]/30 dark:border-[#27313f] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#bfc9c0]/20 pb-6">
          <div className="flex items-center gap-3">
            <div 
              style={{ backgroundColor: activePalette.primary }}
              className="w-10 h-10 rounded-2xl text-white flex items-center justify-center font-bold text-sm shadow-xs"
            >
              {tenant.monogram}
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#121c2a] dark:text-white">{tenant.name}</h3>
              <p className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">{tenant.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span 
              style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
              className="px-3 py-1 rounded-full font-bold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">local_shipping</span>
              <span>Cash on Delivery Supported</span>
            </span>
            <span 
              style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
              className="px-3 py-1 rounded-full font-bold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
              <span>Instant QR Pay</span>
            </span>
            <span className="bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white px-3 py-1 rounded-full font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">credit_card</span>
              <span>Stripe Cards</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#707971] dark:text-[#9ab0a0]">
          <p>© {new Date().getFullYear()} {tenant.name} &bull; Powered by Multi-Tenant Atelier Kiosk Engine</p>
          <div className="flex items-center gap-4 font-semibold">
            <a href="#featured-catalog" className="hover:underline">Catalog</a>
            <a href="#reviews-section" className="hover:underline">Reviews</a>
            <a href="https://wa.me/18004567890" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp Support</a>
          </div>
        </div>
      </footer>

      {/* Floating Checkout Drawer Trigger Button */}
      {cartCount > 0 && (
        <aside className="fixed bottom-20 sm:bottom-6 left-0 right-0 z-40 px-4 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto bg-white/95 dark:bg-[#1a2535]/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 flex items-center justify-between gap-3 border border-[#bfc9c0]/40 dark:border-[#27313f]">
            <div className="flex items-center gap-3 min-w-0">
              <div 
                style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative"
              >
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                <span 
                  style={{ backgroundColor: activePalette.primary }}
                  className="absolute -top-1 -right-1 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-[#121c2a] dark:text-[#f8f9ff] font-bold truncate">
                  {cartCount} items in bag
                </span>
                <span 
                  style={{ color: activePalette.primary }}
                  className="text-sm font-extrabold"
                >
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              style={{ backgroundColor: activePalette.primary }}
              className="h-11 px-5 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shrink-0 active:scale-95 transition-all hover:opacity-95"
            >
              <span>View Cart &bull; COD</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </aside>
      )}

      {/* Cart & Checkout Slide-out Modal with Coupon / Promo Codes (MATCHES ACTIVE PALETTE) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 bg-[#eff4ff] dark:bg-[#182230] border-b border-[#bfc9c0]/20 dark:border-[#27313f]">
              <div className="flex items-center gap-2">
                <span 
                  style={{ color: activePalette.primary }}
                  className="material-symbols-outlined text-[20px]"
                >
                  shopping_bag
                </span>
                <span className="font-bold text-sm text-[#121c2a] dark:text-white">
                  Your Basket ({cartCount} items)
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#707971] hover:text-[#121c2a] dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {cartItems.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#eff4ff]/50 dark:bg-[#223045]/50 border border-[#bfc9c0]/20"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-lg object-cover bg-white shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#121c2a] dark:text-white truncate">
                      {item.product.title}
                    </h4>
                    <span 
                      style={{ color: activePalette.primary }}
                      className="text-xs font-extrabold"
                    >
                      ${(item.product.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center bg-white dark:bg-[#1a2535] rounded-lg border border-[#bfc9c0]/30 px-1 py-0.5">
                    <button
                      onClick={() => handleUpdateQty(item.product.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-2">{item.qty}</span>
                    <button
                      onClick={() => handleUpdateQty(item.product.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {/* Promo code applicator */}
              <div className="p-3 bg-white dark:bg-[#121c2a] rounded-2xl border border-[#bfc9c0]/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#121c2a] dark:text-white flex items-center gap-1">
                    <span 
                      style={{ color: activePalette.primary }}
                      className="material-symbols-outlined text-[16px]"
                    >
                      loyalty
                    </span>
                    Promo Code & Coupons
                  </span>
                  {appliedCoupon && (
                    <button 
                      onClick={handleRemoveCoupon} 
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div 
                    style={{ backgroundColor: activePalette.badgeBg, color: activePalette.primary }}
                    className="flex items-center justify-between p-2 rounded-xl text-xs font-bold"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Code {appliedCoupon.code} active (-{appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}%` : `$${appliedCoupon.discountValue}`})</span>
                    </div>
                    <span className="font-extrabold">-${discountAmount.toFixed(2)}</span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={currentLayoutId === 'theme-deals' ? 'Try code FLASH40' : 'Try code BOTANICA15'}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#eff4ff] dark:bg-[#223045] rounded-xl px-3 py-1.5 text-xs text-[#121c2a] dark:text-white outline-none border border-[#bfc9c0]/30 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      style={{ backgroundColor: activePalette.primary }}
                      className="text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:opacity-90"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* COD Delivery Notice (MATCHES ACTIVE PALETTE, NOT HARDCODED GREEN!) */}
              <div 
                style={{ 
                  backgroundColor: activePalette.badgeBg, 
                  color: activePalette.primary, 
                  borderColor: `${activePalette.primary}30` 
                }}
                className="p-3 rounded-2xl flex items-start gap-2.5 text-xs border"
              >
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">
                  local_shipping
                </span>
                <div>
                  <span className="font-bold block">Cash on Delivery Verified</span>
                  <span>Inspect parcel in front of courier before payment. No advance card needed.</span>
                </div>
              </div>
            </div>

            {/* Total & Place Order Button */}
            <div className="p-4 bg-[#eff4ff] dark:bg-[#182230] border-t border-[#bfc9c0]/20 dark:border-[#27313f] space-y-3">
              <div className="space-y-1 text-xs text-[#707971] dark:text-[#9ab0a0]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#121c2a] dark:text-white">${rawSubtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div style={{ color: activePalette.primary }} className="flex justify-between font-bold">
                    <span>Discount ({appliedCoupon.code}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Courier Shipping:</span>
                  <span style={{ color: activePalette.primary }} className="font-bold">FREE ($0.00)</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-extrabold text-[#121c2a] dark:text-white pt-2 border-t border-[#bfc9c0]/20">
                <span>Total Amount Due:</span>
                <span 
                  style={{ color: activePalette.primary }}
                  className="text-xl"
                >
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => {
                  setCartOpen(false);
                  setCartItems([]);
                  setAppliedCoupon(null);
                  onShowToast(`Doorstep COD Order confirmed for $${cartTotal.toFixed(2)}! Tracking sent to phone.`);
                }}
                style={{ backgroundColor: activePalette.primary }}
                className="w-full py-3.5 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Confirm Doorstep COD Order (${cartTotal.toFixed(2)})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL (MATCHES ACTIVE PALETTE) */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-[#eff4ff] dark:bg-[#182230] border-b border-[#bfc9c0]/20">
              <h3 className="text-sm font-bold text-[#121c2a] dark:text-white flex items-center gap-2">
                <span 
                  style={{ color: activePalette.primary }}
                  className="material-symbols-outlined text-[18px]"
                >
                  edit_square
                </span>
                Write Customer Feedback
              </h3>
              <button 
                onClick={() => setIsWriteReviewOpen(false)}
                className="text-[#707971] hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#707971] block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Hannah Miller"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full bg-[#eff4ff] dark:bg-[#223045] rounded-xl px-3 py-2 text-[#121c2a] dark:text-white outline-none border border-[#bfc9c0]/30"
                />
              </div>

              <div>
                <label className="font-bold text-[#707971] block mb-1">Select Product</label>
                <select
                  value={reviewProductId}
                  onChange={(e) => setReviewProductId(e.target.value)}
                  className="w-full bg-[#eff4ff] dark:bg-[#223045] rounded-xl px-3 py-2 text-[#121c2a] dark:text-white outline-none border border-[#bfc9c0]/30"
                >
                  {catalogSource.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#707971] block mb-1">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`material-symbols-outlined text-[24px] ${
                        star <= reviewRating ? 'text-amber-500' : 'text-gray-300'
                      }`}
                    >
                      star
                    </button>
                  ))}
                  <span className="font-bold ml-2">{reviewRating} Stars</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#707971] block mb-1">Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g., Exceptional quality, fast courier delivery"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full bg-[#eff4ff] dark:bg-[#223045] rounded-xl px-3 py-2 text-[#121c2a] dark:text-white outline-none border border-[#bfc9c0]/30"
                />
              </div>

              <div>
                <label className="font-bold text-[#707971] block mb-1">Your Detailed Feedback</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details on doorstep delivery inspection and product quality..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-[#eff4ff] dark:bg-[#223045] rounded-xl px-3 py-2 text-[#121c2a] dark:text-white outline-none border border-[#bfc9c0]/30 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#bfc9c0]/40 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: activePalette.primary }}
                  className="flex-1 py-2.5 rounded-xl text-white font-bold hover:opacity-90"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
