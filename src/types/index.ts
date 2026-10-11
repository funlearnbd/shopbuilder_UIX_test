export type ViewMode = 
  | 'dashboard' 
  | 'products' 
  | 'orders' 
  | 'storefront' 
  | 'themes' 
  | 'analytics' 
  | 'payments' 
  | 'expenses'
  | 'purchases'
  | 'marketing'
  | 'developer'
  | 'settings';

export type ViewportMode = 'responsive' | 'desktop' | 'mobile';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  domain: string;
  currency: string;
  currencySymbol: string;
  logo: string;
  monogram: string;
  verified: boolean;
  plan: 'Starter' | 'Pro Tier' | 'Enterprise';
  status: 'online' | 'offline';
  acceptingCod: boolean;
  socials?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export interface Product {
  id: string;
  title: string;
  category: 'Ceramics' | 'Botanicals' | 'Linens' | 'Tableware' | 'Aromatics' | 'Plants' | 'Tools' | 'Electronics' | 'Ritual Skincare';
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  active: boolean;
  codEligible: boolean;
  badge?: string;
  discountBadge?: string;
  image: string;
  description: string;
  tags?: string[];
  inStock: boolean;
  bestSeller?: boolean;
  rating?: number;
  reviewCount?: number;
  relatedProductIds?: string[];
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerInitials: string;
  phone: string;
  address: string;
  gateCode?: string;
  items: OrderItem[];
  itemsSummary: string;
  totalAmount: number;
  codStatus: 'COD Due' | 'COD Received' | 'Prepaid';
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  placedTimeAgo: string;
  deliveryType: 'Courier' | 'Curbside' | 'Standard Pickup';
  exactChangeNote?: string;
  courierName?: string;
  trackingNumber?: string;
  estimatedDeliveryTime?: string;
}

export interface ThemeColorPalette {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  accent: string;
  accentText: string;
  badgeBg: string;
  bannerGradient: string;
  bannerAccent: string;
}

export interface ThemeTemplate {
  id: string;
  name: string;
  version: string;
  ratioBadge: string;
  tagBadge: string;
  subtitle: string;
  description: string;
  keyArchitecture: string[];
  bestFor: string;
  image: string;
  miniatures: string[];
  active?: boolean;
  performanceScore: number;
  philosophy: string;
  density: string;
  cropHandling: string;
  heroStyle: string;
  checkoutStyle: string;
  palette?: ThemeColorPalette;
}

export interface PaymentGateway {
  id: string;
  name: string;
  type: 'cod' | 'card' | 'wallet' | 'qr';
  enabled: boolean;
  icon: string;
  badge: string;
  description: string;
  fee: string;
  payoutSchedule: string;
  testMode: boolean;
  settlementAccount?: string;
}

export interface CODRules {
  enabled: boolean;
  maxOrderLimit: number;
  minOrderForFreeDelivery: number;
  deliveryFee: number;
  requirePhoneOtp: boolean;
  allowDoorstepInspection: boolean;
  exactChangePrompt: boolean;
  restrictedPincodes: string[];
  whatsappConfirmation: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  store: string;
  phone: string;
  location: string;
  joinedDate: string;
  twoFactorEnabled: boolean;
}

// ======================== NEW MULTI-TENANT ENTERPRISE TYPES ========================

export interface Expense {
  id: string;
  title: string;
  date: string;
  category: 'Packaging' | 'Logistics' | 'Raw Materials' | 'Studio Rent' | 'Software & Tools' | 'Marketing';
  amount: number;
  receiptName?: string;
  status: 'Reconciled' | 'Pending Receipt' | 'Audit Flagged';
  paymentMethod: string;
  supplier: string;
}

export interface PurchaseOrderItem {
  productId: string;
  productTitle: string;
  sku: string;
  orderedQty: number;
  receivedQty: number;
  unitCost: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  supplierContact: string;
  date: string;
  expectedDelivery: string;
  status: 'Draft' | 'Sent' | 'Partially Received' | 'Received' | 'Cancelled';
  items: PurchaseOrderItem[];
  totalCost: number;
  notes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  maxUses: number;
  usesCount: number;
  validUntil: string;
  active: boolean;
}

export interface CustomerReview {
  id: string;
  productId: string;
  productTitle: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  userLiked?: boolean;
  image?: string;
}

export interface Announcement {
  id: string;
  message: string;
  badge?: string;
  linkText?: string;
  linkTarget?: string;
  active: boolean;
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'facebook';
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  postUrl: string;
  taggedProductTitle?: string;
  taggedPrice?: number;
}

export interface DeliveryZone {
  id: string;
  name: string;
  coverage: string;
  estimatedHours: string;
  baseFee: number;
  freeAbove: number;
  codAvailable: boolean;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  storeNotice: string;
}
