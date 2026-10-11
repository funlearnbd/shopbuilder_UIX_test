import { useState, useEffect } from 'react';
import { 
  ViewMode, 
  ViewportMode, 
  Tenant, 
  Product, 
  Order, 
  ThemeTemplate, 
  PaymentGateway, 
  CODRules, 
  UserProfile,
  Expense,
  PurchaseOrder,
  Coupon,
  Announcement,
  CustomerReview,
  SocialPost,
  DeliveryZone,
  SEOSettings
} from './types';
import { 
  INITIAL_TENANTS, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_THEMES, 
  INITIAL_PAYMENT_GATEWAYS, 
  INITIAL_COD_RULES, 
  INITIAL_USER,
  INITIAL_EXPENSES,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_COUPONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_REVIEWS,
  INITIAL_SOCIAL_POSTS,
  INITIAL_DELIVERY_ZONES,
  INITIAL_SEO,
  THEME_PALETTES
} from './data/mockData';
import { TopNavbar } from './components/TopNavbar';
import { SidebarNav } from './components/SidebarNav';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AddProductModal } from './components/AddProductModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingChatbot } from './components/FloatingChatbot';
import { DashboardView } from './views/DashboardView';
import { ProductsView } from './views/ProductsView';
import { OrdersView } from './views/OrdersView';
import { StorefrontView } from './views/StorefrontView';
import { ThemesView } from './views/ThemesView';
import { AnalyticsView } from './views/AnalyticsView';
import { PaymentsView } from './views/PaymentsView';
import { SettingsView } from './views/SettingsView';
import { ExpensesView } from './views/ExpensesView';
import { PurchasesView } from './views/PurchasesView';
import { MarketingView } from './views/MarketingView';
import { DeveloperApiView } from './views/DeveloperApiView';

export default function App() {
  // App state
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Entities state
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [currentTenant, setCurrentTenant] = useState<Tenant>(INITIAL_TENANTS[0]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [themes, setThemes] = useState<ThemeTemplate[]>(INITIAL_THEMES);
  const [gateways, setGateways] = useState<PaymentGateway[]>(INITIAL_PAYMENT_GATEWAYS);
  const [codRules, setCodRules] = useState<CODRules>(INITIAL_COD_RULES);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Enterprise & Marketing entities state
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [socialPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [deliveryZones] = useState<DeliveryZone[]>(INITIAL_DELIVERY_ZONES);
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(INITIAL_SEO);

  // Wishlist & interaction state
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-4']);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Synchronize dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global F2 keyboard shortcut for "+ Add Product"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        setIsAddProductOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast feedback trigger
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => prev === message ? null : prev);
    }, 2800);
  };

  // Handlers
  const handleSelectActiveTheme = (themeId: string) => {
    setThemes(prev => prev.map(t => ({ ...t, active: t.id === themeId })));
  };

  const handleToggleGateway = (gatewayId: string) => {
    setGateways(prev => prev.map(gw => gw.id === gatewayId ? { ...gw, enabled: !gw.enabled } : gw));
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 3).length;

  const activeTheme = themes.find(t => t.active) || themes[0];
  const activePalette = activeTheme.palette || THEME_PALETTES[activeTheme.id] || THEME_PALETTES['theme-modern'];

  // View renderer helper function
  const renderViewContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            tenant={currentTenant}
            user={user}
            onNavigate={setCurrentView}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
            onShowToast={showToast}
            activePalette={activePalette}
          />
        );
      case 'products':
        return (
          <ProductsView
            products={products}
            onUpdateProducts={setProducts}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
            onShowToast={showToast}
            activePalette={activePalette}
          />
        );
      case 'orders':
        return (
          <OrdersView
            orders={orders}
            onUpdateOrders={setOrders}
            onShowToast={showToast}
            activePalette={activePalette}
          />
        );
      case 'storefront':
        return (
          <StorefrontView
            tenant={currentTenant}
            products={products}
            coupons={coupons}
            announcements={announcements}
            reviews={reviews}
            onUpdateReviews={setReviews}
            socialPosts={socialPosts}
            deliveryZones={deliveryZones}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenProductModal={(p) => setSelectedDetailProduct(p)}
            themes={themes}
            activeThemeId={themes.find(t => t.active)?.id || 'theme-modern'}
            onSelectTheme={handleSelectActiveTheme}
            onShowToast={showToast}
          />
        );
      case 'themes':
        return (
          <ThemesView
            themes={themes}
            onSelectActiveTheme={handleSelectActiveTheme}
            products={products}
            tenant={currentTenant}
            onShowToast={showToast}
          />
        );
      case 'analytics':
        return (
          <AnalyticsView
            tenant={currentTenant}
            onShowToast={showToast}
          />
        );
      case 'payments':
        return (
          <PaymentsView
            tenant={currentTenant}
            gateways={gateways}
            codRules={codRules}
            onUpdateCodRules={setCodRules}
            onToggleGateway={handleToggleGateway}
            onShowToast={showToast}
          />
        );
      case 'purchases':
        return (
          <PurchasesView
            tenant={currentTenant}
            purchaseOrders={purchaseOrders}
            onUpdatePurchaseOrders={setPurchaseOrders}
            products={products}
            onUpdateProducts={setProducts}
            onShowToast={showToast}
          />
        );
      case 'expenses':
        return (
          <ExpensesView
            tenant={currentTenant}
            expenses={expenses}
            onUpdateExpenses={setExpenses}
            onShowToast={showToast}
          />
        );
      case 'marketing':
        return (
          <MarketingView
            tenant={currentTenant}
            coupons={coupons}
            onUpdateCoupons={setCoupons}
            announcements={announcements}
            onUpdateAnnouncements={setAnnouncements}
            reviews={reviews}
            onUpdateReviews={setReviews}
            socialPosts={socialPosts}
            deliveryZones={deliveryZones}
            seoSettings={seoSettings}
            onUpdateSeoSettings={setSeoSettings}
            onShowToast={showToast}
          />
        );
      case 'developer':
        return (
          <DeveloperApiView
            tenant={currentTenant}
            onShowToast={showToast}
          />
        );
      case 'settings':
        return (
          <SettingsView
            tenant={currentTenant}
            onUpdateTenant={(up) => {
              setCurrentTenant(prev => ({ ...prev, ...up }));
              setTenants(prev => prev.map(t => t.id === currentTenant.id ? { ...t, ...up } : t));
            }}
            user={user}
            onUpdateUser={(up) => setUser(prev => ({ ...prev, ...up }))}
            onShowToast={showToast}
          />
        );
      default:
        return (
          <DashboardView
            tenant={currentTenant}
            user={user}
            onNavigate={setCurrentView}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
            onShowToast={showToast}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0d141e] text-[#121c2a] dark:text-[#eaf1ff] transition-colors duration-200 flex flex-col font-sans">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-[#121c2a] text-white dark:bg-white dark:text-[#121c2a] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold">
            <span className="material-symbols-outlined text-[17px] text-[#8ed6aa]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Top Navbar with custom Dark Mode toggle */}
      <TopNavbar
        currentTenant={currentTenant}
        tenants={tenants}
        onSelectTenant={(t) => {
          setCurrentTenant(t);
          showToast(`Switched active store tenant to ${t.name}`);
        }}
        currentView={currentView}
        onNavigate={setCurrentView}
        viewportMode={viewportMode}
        onChangeViewport={(mode) => {
          setViewportMode(mode);
          showToast(`Switched viewport preview mode to ${mode}`);
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => {
          setDarkMode(prev => !prev);
          showToast(`Theme switched to ${!darkMode ? 'Dark' : 'Light'} Mode`);
        }}
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
        pendingOrdersCount={pendingOrdersCount}
        activePalette={activePalette}
      />

      {/* App Body Container: Checks if we are simulating mobile frame or full desktop */}
      <div className="flex-1 flex w-full">
        {viewportMode === 'mobile' ? (
          /* Simulated Mobile 390px Viewport Frame */
          <div className="w-full py-6 flex justify-center bg-[#dee9fc]/40 dark:bg-black/40 overflow-x-auto px-4">
            <div className="w-[390px] min-h-[820px] bg-[#f8f9ff] dark:bg-[#0f1724] rounded-[44px] shadow-2xl border-8 border-[#27313f] dark:border-[#1a2535] flex flex-col overflow-hidden relative">
              {/* Simulated Phone Speaker / Notch */}
              <div className="h-6 bg-[#27313f] dark:bg-[#1a2535] flex items-center justify-center shrink-0">
                <div className="w-24 h-4 bg-black rounded-full" />
              </div>

              {/* Mobile View Content Body */}
              <div className="flex-1 p-4 pb-24 overflow-y-auto">
                {renderViewContent()}
              </div>

              {/* Mobile Bottom Bar Inside Phone Frame */}
              <MobileBottomNav
                currentView={currentView}
                onNavigate={setCurrentView}
                pendingOrdersCount={pendingOrdersCount}
              />
            </div>
          </div>
        ) : (
          /* Responsive or Full Web 1440px Mode */
          <div className="flex-1 flex w-full">
            {/* Desktop Left Sidebar (Visible on Desktop for all views) */}
            <div className="hidden lg:block">
              <SidebarNav
                currentView={currentView}
                onNavigate={setCurrentView}
                pendingOrdersCount={pendingOrdersCount}
                lowStockCount={lowStockCount}
                activePalette={activePalette}
              />
            </div>

            {/* Main Content Workspace */}
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full pb-24 lg:pb-12">
              {renderViewContent()}
            </main>

            {/* Mobile Bottom Bar for handheld screens when in responsive mode */}
            <div className="lg:hidden">
              <MobileBottomNav
                currentView={currentView}
                onNavigate={setCurrentView}
                pendingOrdersCount={pendingOrdersCount}
              />
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal (Triggered by F2 or + Add buttons) */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
        onShowToast={showToast}
      />

      {/* User Profile & Merchant Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        tenant={currentTenant}
        onNavigate={setCurrentView}
        onShowToast={showToast}
      />

      {/* Product Detail Modal (Shows high-res, verified reviews, related products, link sharing, and instant add-to-bag) */}
      <ProductDetailModal
        product={selectedDetailProduct}
        onClose={() => setSelectedDetailProduct(null)}
        allProducts={products}
        reviews={reviews}
        isWishlisted={selectedDetailProduct ? wishlist.includes(selectedDetailProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(p) => {
          showToast(`Added ${p.title} to bag`);
        }}
        onSelectProduct={(p) => setSelectedDetailProduct(p)}
        onShowToast={showToast}
      />

      {/* Floating AI Digital Concierge Chatbot */}
      <FloatingChatbot
        tenant={currentTenant}
        products={products}
        onAddToCart={(p) => {
          showToast(`Added ${p.title} to bag`);
        }}
        onShowToast={showToast}
      />
    </div>
  );
}
