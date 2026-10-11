import { 
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
  CustomerReview, 
  Announcement, 
  SocialPost, 
  DeliveryZone, 
  SEOSettings, 
  ThemeColorPalette 
} from '../types';

import dealsHeroBannerImg from '../assets/images/deals_hero_banner_1791731660845.jpg';
import beautyHeroBannerImg from '../assets/images/beauty_hero_banner_1791731683584.jpg';
import dealsProductSampleImg from '../assets/images/deals_product_sample_1791731721911.jpg';
import beautyProductSampleImg from '../assets/images/beauty_product_sample_1791731746257.jpg';

export const DEMO_MEDIA = {
  dealsHeroBanner: dealsHeroBannerImg,
  beautyHeroBanner: beautyHeroBannerImg,
  dealsProductSample: dealsProductSampleImg,
  beautyProductSample: beautyProductSampleImg,
};

export const THEME_PALETTES: Record<string, ThemeColorPalette> = {
  'theme-modern': {
    id: 'theme-modern',
    name: 'Modern Store',
    primary: '#004328',
    primaryHover: '#0d5c3a',
    primaryLight: '#eff4ff',
    accent: '#a9f3c5',
    accentText: '#002111',
    badgeBg: '#dee9fc',
    bannerGradient: 'from-[#004328] via-[#083822] to-[#012214]',
    bannerAccent: '#a9f3c5'
  },
  'theme-fashion': {
    id: 'theme-fashion',
    name: 'Fashion & Lifestyle',
    primary: '#3b1c2b',
    primaryHover: '#54283d',
    primaryLight: '#fdf2f4',
    accent: '#fbcfe8',
    accentText: '#4c0519',
    badgeBg: '#fce7f3',
    bannerGradient: 'from-[#2d1421] via-[#3d192c] to-[#1f0c16]',
    bannerAccent: '#fbcfe8'
  },
  'theme-deals': {
    id: 'theme-deals',
    name: 'Products & Deals',
    primary: '#b91c1c',
    primaryHover: '#991b1b',
    primaryLight: '#fef2f2',
    accent: '#fde047',
    accentText: '#713f12',
    badgeBg: '#fee2e2',
    bannerGradient: 'from-[#991b1b] via-[#7f1d1d] to-[#450a0a]',
    bannerAccent: '#fde047'
  },
  'theme-beauty': {
    id: 'theme-beauty',
    name: 'Beauty & Care',
    primary: '#9a3412',
    primaryHover: '#7c2d12',
    primaryLight: '#fff7ed',
    accent: '#fed7aa',
    accentText: '#431407',
    badgeBg: '#ffedd5',
    bannerGradient: 'from-[#7c2d12] via-[#63230e] to-[#431407]',
    bannerAccent: '#fed7aa'
  },
  'theme-home': {
    id: 'theme-home',
    name: 'Home & Living',
    primary: '#44403c',
    primaryHover: '#292524',
    primaryLight: '#f5f5f4',
    accent: '#e7e5e4',
    accentText: '#1c1917',
    badgeBg: '#e7e5e4',
    bannerGradient: 'from-[#292524] via-[#1c1917] to-[#0c0a09]',
    bannerAccent: '#f5f5f4'
  },
  'theme-essentials': {
    id: 'theme-essentials',
    name: 'Everyday Essentials',
    primary: '#0369a1',
    primaryHover: '#0284c7',
    primaryLight: '#f0f9ff',
    accent: '#bae6fd',
    accentText: '#082f49',
    badgeBg: '#e0f2fe',
    bannerGradient: 'from-[#0c4a6e] via-[#075985] to-[#082f49]',
    bannerAccent: '#7dd3fc'
  }
};

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Maison Botanica',
    slug: 'maison-botanica',
    category: 'Botanical Living & Artisan Homewares',
    tagline: 'Handcrafted homewares & organic living essentials',
    domain: 'kiosk.shop/maison-botanica',
    currency: 'USD',
    currencySymbol: '$',
    logo: 'https://lh3.googleusercontent.com/aida/AEtjO1W2LHSB_591fmelQ4tLxcn6WBn8Y46n4dV1kIQGggpVcCReFZQmp5_T8hNPSWCX-8jhqURfRb-KHReROz8-TQTUMIO3q4KVypdql5eDQ-_iNexJSbdqIsgzDn_YfTSZmQhWbkceemSQNvNLFCmNJAKLkM40gXkq927SjWTJLLyKh5dtuhTrxegWDGerSEb0oSTt4BbkFZQNvPxY6puitKBLex9wYwEFO3ZTMR7AgjQtgmvU2hpa5vDJehQ',
    monogram: 'MB',
    verified: true,
    plan: 'Pro Tier',
    status: 'online',
    acceptingCod: true,
  },
  {
    id: 'tenant-2',
    name: 'Nordic Woodcraft',
    slug: 'nordic-woodcraft',
    category: 'Solid Oak & Japanese Joinery',
    tagline: 'Sustainable heirloom furniture & studio kitchenware',
    domain: 'kiosk.shop/nordic-woodcraft',
    currency: 'USD',
    currencySymbol: '$',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkQkayGTTlfC9aaNPqHuNSkt1ao2HXWoMMXAXUoRbtd-UYr2dw6jB4WxCtg5RSFVOFVQRrgumv8zrJW7Kean_TV_vpY2cum7pTECyGdpph5cNUL6buMxLQMZAIBqMGglV8mxrtQr0RmLMRDBKtFe9I_hISolrZTZsKHhEhpQ4xuOp4rfT1SMqiw2uFD7mQkxCf546v3ff07XXXbLWbuNhPjQ6HhWUYEjeE8IpMDrYql3XG-zmkBrYi6w',
    monogram: 'NW',
    verified: true,
    plan: 'Pro Tier',
    status: 'online',
    acceptingCod: true,
  },
  {
    id: 'tenant-3',
    name: 'Céleste Atelier',
    slug: 'celeste-atelier',
    category: 'Fine Mineral Perfumery & Candles',
    tagline: 'Hand-poured pure botanical aromatics',
    domain: 'kiosk.shop/celeste-atelier',
    currency: 'USD',
    currencySymbol: '$',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtOIQAefyB3YhpM6YF7s_QaOu_MCJoWF5rYoJ-69_Zy0F6cAbw2BBZ7yRwUL9ul1IPpeesF3HzfZ4zkSfEUSN9Q47IiqiZIkAWx1HWu90Mxt0gcqVs2UM-xXNWy1FfzJrYkDfgV0y17Bnai6JVh3YlXZaMIEmZzP5w2MuiYeMWeCdznkWn85TocfegXpHFEzm1ztb01hbtwQjmmjhYJbioao99aqgC6MBdUiI0JCF-gzkbq0YR4e0CIg',
    monogram: 'CA',
    verified: true,
    plan: 'Starter',
    status: 'online',
    acceptingCod: true,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Handmade Speckled Ceramic Mug',
    category: 'Ceramics',
    price: 28.00,
    sku: 'MUG-01',
    stock: 14,
    active: true,
    codEligible: true,
    badge: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAta6lirhXo2TALJq6Vx9nN1KFsWOmRLRcgzvK84lmu_n1hJqyXYAaWXUS6ZM9dOGb3a4Lc_JuR-bJ1IMKAt1GvcjDBYpJHCWiFU8C_xIPtvlayZ8vyA9HIS2FUbyBG7n8G5vzq8kJOyhdYiOYOxnDUzq5SS-7pCuEJ8YLKqj6msGvyV6_aVmWp4O8Xg1zovlN1EgQNpWWa53R641TNg3mRm34PshrDRLwfN7RwjcLEnGL4bHtiBqRrQw',
    description: '320ml capacity artisanal stoneware coffee mug with raw speckle finish. Dishwasher-safe and spun on kick wheels.',
    inStock: true,
    bestSeller: false,
  },
  {
    id: 'prod-2',
    title: 'Organic Eucalyptus Linen Mist',
    category: 'Botanicals',
    price: 22.00,
    compareAtPrice: 26.00,
    sku: 'MST-04',
    stock: 3,
    active: true,
    codEligible: true,
    badge: 'Low Stock (3 left)',
    discountBadge: '15% OFF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd6EaXbxPs9dM6xdibWuuIsGYUmBN3WJGRl0XgiPVzlkMpKDfoaGgRgwOXS6FWU4t7n6ahxpxhSM4QcYuuvPyGpnw5Uz92lQ21JHWRxpJRJlOI_RSpKE28EGHbwmZRZFCwscMM8JA2KPK170YvWTUxTskaaIUfCa4RoOv9ZFQO2OpfY4G_Qbq05maHUQGSBd0Oy1QzcERvDseZYzksPOSaTbJnDJEyritlmBrz2NLqzlgPVLsZR5psLA',
    description: 'Amber glass spray bottle containing organic steam-distilled eucalyptus room and pillow mist with botanical textured label.',
    inStock: true,
    bestSeller: false,
  },
  {
    id: 'prod-3',
    title: 'Raw Terracotta Plant Pot 6"',
    category: 'Botanicals',
    price: 34.00,
    sku: 'POT-09',
    stock: 0,
    active: false,
    codEligible: true,
    badge: 'Out of Stock (0)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARnYKNT8eXLoMYlwjMx92fCYH7z3Ha6WB5YVmtrS8JUG3NGH6q1-6LjTlM7PGS0QCRGunhAcmCV_nFNxH4WXLYY1l9WSCE_UU-jHiBRvuwsvRHMk5B9zFqS6t80hwi36PzF73kf-Rr6H7jELgKO7h1u2OiUXa1JV2pwcpkRWBWWT_nVl3AwPhRfX9uXvYAK51SO7HmWOOzBxuGolXwbtgEmpOpT8yqX9devjCOFz6lxztFOYFMEgNjkg',
    description: 'Handcrafted porous red clay terracotta planter pot. Designed with natural moisture drainage for succulents and herbs.',
    inStock: false,
    bestSeller: false,
  },
  {
    id: 'prod-4',
    title: 'Soy Wax Candle - Amber & Moss',
    category: 'Botanicals',
    price: 19.50,
    sku: 'CND-02',
    stock: 38,
    active: true,
    codEligible: true,
    badge: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtOIQAefyB3YhpM6YF7s_QaOu_MCJoWF5rYoJ-69_Zy0F6cAbw2BBZ7yRwUL9ul1IPpeesF3HzfZ4zkSfEUSN9Q47IiqiZIkAWx1HWu90Mxt0gcqVs2UM-xXNWy1FfzJrYkDfgV0y17Bnai6JVh3YlXZaMIEmZzP5w2MuiYeMWeCdznkWn85TocfegXpHFEzm1ztb01hbtwQjmmjhYJbioao99aqgC6MBdUiI0JCF-gzkbq0YR4e0CIg',
    description: 'Hand-poured 100% soy wax in an amber apothecary vessel. Cedarwood, oakmoss, and wild fig scent with 45 hours clean burn.',
    inStock: true,
    bestSeller: true,
  },
  {
    id: 'prod-5',
    title: 'Handmade Olive Wood Spoon Set',
    category: 'Ceramics',
    price: 16.00,
    sku: 'WOD-08',
    stock: 22,
    active: true,
    codEligible: true,
    badge: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkQkayGTTlfC9aaNPqHuNSkt1ao2HXWoMMXAXUoRbtd-UYr2dw6jB4WxCtg5RSFVOFVQRrgumv8zrJW7Kean_TV_vpY2cum7pTECyGdpph5cNUL6buMxLQMZAIBqMGglV8mxrtQr0RmLMRDBKtFe9I_hISolrZTZsKHhEhpQ4xuOp4rfT1SMqiw2uFD7mQkxCf546v3ff07XXXbLWbuNhPjQ6HhWUYEjeE8IpMDrYql3XG-zmkBrYi6w',
    description: 'Carved wild olive wood cooking spoon duo tied with raw twine. Finished exclusively with organic food-safe walnut oil.',
    inStock: true,
    bestSeller: false,
  },
  {
    id: 'prod-6',
    title: 'Woven Linen Napkin 4-Pack',
    category: 'Linens',
    price: 24.00,
    sku: 'LNN-12',
    stock: 3,
    active: true,
    codEligible: true,
    badge: 'Low Stock (3 left)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBALhBygUgffJ5S9d115WUPcuTHdUlJW4T1MqP_heXt1z9g_xbGC9FPsdkmu--5n5Xz2ypmJoiy5B8wmWr7sUCRi-xWDigG3psNf156sDAMxoa5w4Y_-l36EqNEKgkEIiUnB5lhKac7IPgCRj98_EQJDUPruhLpGuk8ag9i9vrpau2SKM0pgjkwVLGtcivdle2Ul_E6CCMpvhNg10IyX3siHvNWlxIjUqrVKpOXrzJR93dvKRv_jmbXFA',
    description: 'Set of four stone-washed French flax linen napkins in forest sage and oat. Soft raw edge with durable cross stitching.',
    inStock: true,
    bestSeller: false,
  },
  {
    id: 'prod-7',
    title: 'Match Striker Pot & 40 Matches',
    category: 'Botanicals',
    price: 14.00,
    sku: 'MTH-03',
    stock: 45,
    active: true,
    codEligible: true,
    badge: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMeUHXl3wOcnTP90YFY6PG3rTO2eYIcbO_-yz4Q-FljECmj59nzXWxaMKiFxOVgVpc_fibYGywgEMc2CShpCU1g_tFbKAIaW2_26HPPUXESUhLzkByrJSxjbVkCT-ciDg879TElRTXxzLO3HdsfkjqHwJwxnhjVEwAgorCCcQJ95In71rY1D3gycNwdAXKBBrr13GGiv-Qs56WEzrPc4nUHxLk9D5sInccg_IcqfrHc8wBeRM5iBI37A',
    description: 'Petite unglazed stoneware match striker vessel with grooved friction exterior and forty colored-tip wooden matches.',
    inStock: true,
    bestSeller: false,
  },
  {
    id: 'prod-8',
    title: 'Botanical Himalayan Bath Salts',
    category: 'Botanicals',
    price: 18.00,
    sku: 'SLT-05',
    stock: 19,
    active: true,
    codEligible: true,
    badge: 'Active',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeJavITMZljTg5T0VMmvv1uPC-w8lTu1nwLwa45_TL467-OUMZz_OC7yph6YUgnp6hEmBAl5sHPr6QH7IyY8ogE57M_QoJCMW8s6p1gZvQcBUEFx8XSoNC8_rc9bAVUtcQYaBHCfuuNxXY3ky2HQQgS6nVj3DSZrTXlr7ugIqEzeRzGLuwITzhRHa3i5qQB0ZSWUX_YJ2ejusFSxdoKMBuQKx2UNYo-NKEcN4uOrJ2Jdio2AsA7IJzFg',
    description: 'Dead Sea and pink Himalayan coarse mineral salts infused with organic French lavender petals, rose absolute, and calendula.',
    inStock: true,
    bestSeller: false,
  }
];

export const THEME_SAMPLE_PRODUCTS: Record<string, Product[]> = {
  'theme-modern': INITIAL_PRODUCTS,
  'theme-deals': [
    {
      id: 'deal-1',
      title: '[SUPER DEAL 40% OFF] Sonus Pro Wireless ANC Earbuds & Smart Watch Bundle',
      category: 'Electronics',
      price: 68.00,
      compareAtPrice: 114.00,
      discountBadge: '40% OFF',
      sku: 'DL-SON-01',
      stock: 4,
      active: true,
      codEligible: true,
      badge: 'Flash Drop (4 left)',
      image: dealsHeroBannerImg,
      description: 'Commercial deal bundle: matte black wireless noise-canceling earbuds in charging case, companion smartwatch, and boxed gift set on crimson podium.',
      inStock: true,
      bestSeller: true
    },
    {
      id: 'deal-2',
      title: '[50% OFF FLASH] Veloc NC-X1 Wireless Studio Headphones & Magnetic Stand',
      category: 'Electronics',
      price: 49.00,
      compareAtPrice: 99.00,
      discountBadge: '50% OFF',
      sku: 'DL-VLC-02',
      stock: 6,
      active: true,
      codEligible: true,
      badge: 'Save $50',
      image: dealsProductSampleImg,
      description: 'Studio over-ear ANC wireless headphones with fast magnetic desk charger stand. 1-click Doorstep COD express dispatch.',
      inStock: true,
      bestSeller: true
    },
    {
      id: 'deal-3',
      title: '[TWIN DEAL 33% OFF] Amber & Moss Candle Twin Pack',
      category: 'Botanicals',
      price: 32.00,
      compareAtPrice: 48.00,
      discountBadge: '33% OFF',
      sku: 'DL-CND-02',
      stock: 8,
      active: true,
      codEligible: true,
      badge: 'Twin Deal',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVU5SoNKOF6Nd7om5QkPNuzpglZAMzv3RLIRjY2DP5-_Nsvs2Fq_C634Hp5wY_2yknkWRX6mRvJmF-OcQbScsHlzftDNi8GGtuH6Ni3rkxNg0aaiYyAuN1rooEYzG63ZMkEtn1ukUS2XRdjD4aqpirpiATmaaw-BulhCwGAGd7tUtx91HzZgZeeHS5YoJHeNHpNvywZTEXSeugnl0rdl7dmXz06Q6laTWSeQsCOCqH2qajE1hcdhkIkw',
      description: 'Double soy wax amber glass apothecary jars. Hand-poured with crackling wood wick and natural essential oils.',
      inStock: true
    },
    {
      id: 'deal-4',
      title: '[CLEARANCE 38% OFF] Hand-Spun Fluted Terracotta Planter 8"',
      category: 'Botanicals',
      price: 28.00,
      compareAtPrice: 45.00,
      discountBadge: '38% OFF',
      sku: 'DL-POT-08',
      stock: 2,
      active: true,
      codEligible: true,
      badge: 'Last 2 in Batch',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8v5BP7zqEsVEP7PLa3qSBdEevuC7uw2tqsC5Cb2IbZ3vKMSAWQM812tH-TEBjAcR-9T1qXLMVs4YBCly8WFapmH50gw1DogR0pRKTAo9KTR6TORNQP8JaEz8LsENqXoX-Y9RQOWTKo3QVbAmuBmjinYR1tsOBzd7XDeqsYvpxDrzYoil9-x2Pa8oP-t0eA28iS4wNWhkrJmOOTzlIe7x4BTURqNJbRMU5F-1t1neFq7D7sXJNmbuRvA',
      description: 'Porous earthen clay planter with drainage basin saucer. Immediate doorstep courier dispatch.',
      inStock: true
    },
    {
      id: 'deal-5',
      title: '[FLASH DROP] Raw Flax Studio Towel 6-Pack',
      category: 'Linens',
      price: 29.00,
      compareAtPrice: 49.00,
      discountBadge: '41% OFF',
      sku: 'DL-LNN-06',
      stock: 12,
      active: true,
      codEligible: true,
      badge: 'Wholesale Pack',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH3OaDonlCjn29PXHgJkryA-dEaci1_LPvaTFnoY5h2YMP21iqTTocp5y0cW37L2sdxrG0zAy-7L-5lbegLeJ_rpIroKfnvH_fkG_ATWHPRTeXa-j2NCEJm3tMPpMWbTysmZT6ADNXcBnOdwtdDjm3NZZ9RIJlkr8evaHwORP2nM3eCNDyjvFtZWZd6PYqqCtPUe6HK0jGfYExvAODz81kmgjaCHmVF70eeYfUrCaFiEFhNk04HjOKvA',
      description: 'Set of six natural pre-washed flax kitchen and studio drying cloths. Highly absorbent and machine washable.',
      inStock: true
    }
  ],
  'theme-beauty': [
    {
      id: 'bty-1',
      title: 'Botanical Bloom Organic Glow Face Oil Dropper 50ml',
      category: 'Ritual Skincare',
      price: 38.00,
      compareAtPrice: 48.00,
      discountBadge: '100% Organic',
      sku: 'BTY-BLM-01',
      stock: 16,
      active: true,
      codEligible: true,
      badge: 'Dermatologist Tested',
      image: beautyProductSampleImg,
      description: 'Pure cold-pressed organic jojoba, rosehip seed and Moroccan argan face oil. Glass pipette dropper applicator releasing golden glow drops.',
      inStock: true,
      bestSeller: true
    },
    {
      id: 'bty-2',
      title: 'Apothecary Trio Serum Routine Collection (Serum, Lavender & Oil)',
      category: 'Ritual Skincare',
      price: 64.00,
      compareAtPrice: 82.00,
      discountBadge: '3-Piece Set',
      sku: 'BTY-SET-02',
      stock: 9,
      active: true,
      codEligible: true,
      badge: 'Dermal Ritual',
      image: beautyHeroBannerImg,
      description: 'Luxury 3-piece apothecary set: Botanical Serum, Lavender & Rose Elixir, and Hydrating Oil with rosehip cream on marble slab.',
      inStock: true,
      bestSeller: true
    },
    {
      id: 'bty-3',
      title: 'Whipped Shea & Roman Chamomile Barrier Balm 120ml',
      category: 'Ritual Skincare',
      price: 26.00,
      sku: 'BTY-BLM-03',
      stock: 14,
      active: true,
      codEligible: true,
      badge: 'Cruelty Free',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd6EaXbxPs9dM6xdibWuuIsGYUmBN3WJGRl0XgiPVzlkMpKDfoaGgRgwOXS6FWU4t7n6ahxpxhSM4QcYuuvPyGpnw5Uz92lQ21JHWRxpJRJlOI_RSpKE28EGHbwmZRZFCwscMM8JA2KPK170YvWTUxTskaaIUfCa4RoOv9ZFQO2OpfY4G_Qbq05maHUQGSBd0Oy1QzcERvDseZYzksPOSaTbJnDJEyritlmBrz2NLqzlgPVLsZR5psLA',
      description: 'Ultra-rich lipid barrier restoring balm in an amber apothecary tub. Safe for sensitive skin.',
      inStock: true
    },
    {
      id: 'bty-4',
      title: 'Pure Steam Eucalyptus & Rose Facial Tonic 200ml',
      category: 'Ritual Skincare',
      price: 24.00,
      sku: 'BTY-TNC-02',
      stock: 11,
      active: true,
      codEligible: true,
      badge: 'Alcohol Free',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOieR1dsKHOXPB4D1EI5EgNgifmDLCneLVFLb13rJYD24pNdglFMfQgQXtDWY2yyjrn4YjPk3EVJy6jPZcTsxllO5_v4NJs-mQ0v1tpmy2GfLacplfj9oXJdDR_zoMT89PIXCZcCDAx1rYYwd520YZBrg3TyoE6ZciEl4wJ_EnE4gT8n9MqgRdnldLqUgyU15qXjZKOrm9JOAzNw9VmsV7ZPxrmHiZox90lSxZiFPvlWsq9rM6qVVHMg',
      description: 'Steam-distilled floral mist formulated to balance dermal pH and soothe morning skin barriers.',
      inStock: true
    },
    {
      id: 'bty-5',
      title: 'Organic Lavender & Rose Petal Mineral Bath Soak',
      category: 'Ritual Skincare',
      price: 22.00,
      sku: 'BTY-SOK-04',
      stock: 22,
      active: true,
      codEligible: true,
      badge: 'Hand-Harvested',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeJavITMZljTg5T0VMmvv1uPC-w8lTu1nwLwa45_TL467-OUMZz_OC7yph6YUgnp6hEmBAl5sHPr6QH7IyY8ogE57M_QoJCMW8s6p1gZvQcBUEFx8XSoNC8_rc9bAVUtcQYaBHCfuuNxXY3ky2HQQgS6nVj3DSZrTXlr7ugIqEzeRzGLuwITzhRHa3i5qQB0ZSWUX_YJ2ejusFSxdoKMBuQKx2UNYo-NKEcN4uOrJ2Jdio2AsA7IJzFg',
      description: 'Himalayan and Epsom mineral crystals infused with Pacific lavender blossom.',
      inStock: true
    }
  ],
  'theme-fashion': [
    {
      id: 'fsh-1',
      title: 'French Flax Relaxed Linen Studio Kimono',
      category: 'Linens',
      price: 86.00,
      compareAtPrice: 110.00,
      discountBadge: 'Lookbook Edition',
      sku: 'FSH-KMN-01',
      stock: 6,
      active: true,
      codEligible: true,
      badge: 'Hand-Spun Flax',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvLGZUERW2AtjrjbhNsxRa1hRl-0a379pfHRoYUETX7mrcEG_wFL1xWm2By42CcQofsj2W0IL40bzGGaxBlxsSIKki2RuLWEaH4HRLDCdizAAMsIm7l29XrwWWDC3E3WuaF0_4vQ4eMK-kRqHJOkQO0bklhNiOuOHuwtqJ0Q7JkgIGiHo0KmTnn3s8dM9HH-ZolM_OmRoLo6b3T-f3NNisTjKyiiM50AHT5SdxaIQp5mkHpsI3Tdz-Yg',
      description: 'Heavyweight washed French flax loungewear kimono. Draped silhouette with deep waist pockets.',
      inStock: true
    },
    {
      id: 'fsh-2',
      title: 'Hand-Spun Earthen Flax Throw 180cm',
      category: 'Linens',
      price: 54.00,
      sku: 'FSH-THW-02',
      stock: 9,
      active: true,
      codEligible: true,
      badge: 'Natural Oat',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvlMNg6qKQczwbhe6enmn59NyylrMu5LR-SvhsHxd4QQ4wX31ewbAhx36AkBixdt7BOxyNxKlSXkRHFwxfx3X9DJw-DcpczmNhsAMUBB_zm3E8RlCNJMbKzB7ebkLNtfr8m_JEWpn7T08r7Wd9wOII-u8AUwKCi7f-xz7yALpkDk3Ogz96Ir9ndX-jNqLFnqUjUhKzxvXqvQlkaUfiDo6ZJCaeICAPUSsoq4wNxl7TdiNvgDc5qRPS0g',
      description: 'Artisanal loom-woven flax throw with eyelash fringe borders. Softens with every wash.',
      inStock: true
    },
    {
      id: 'fsh-3',
      title: 'Raw Edge Terracotta Muslin Scarves 2-Pack',
      category: 'Linens',
      price: 38.00,
      sku: 'FSH-SCV-03',
      stock: 14,
      active: true,
      codEligible: true,
      badge: 'Duo Pack',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbtQ0SQFT1NNGsypKCpmuHYxIJ6iAr9BNfDyIZqq_D_GU5MMpmwiQsLbPJKCvzJGltilPcqIbnGyErutVOiTkkEmxCmegdTakSsj8YJ2C94gMqqX0NxpVcWLkqjGeIXnHpTTztdCeRzayCXW_znuAoJZBAWJK3pT-CGCRjY0luIwZV2YlqUQjZ6TDdbMfQMniOd5P3KFogb_fWygmn_o6rtyf5r4qZKkQ1kk9ilLtwG096zvGi9u23kw',
      description: 'Breathable organic double-gauze cotton scarves in raw clay and sage green.',
      inStock: true
    }
  ],
  'theme-home': [
    {
      id: 'hom-1',
      title: 'Architectural Terracotta Staging Bowl 12"',
      category: 'Ceramics',
      price: 62.00,
      sku: 'HOM-BWL-01',
      stock: 5,
      active: true,
      codEligible: true,
      badge: 'Living Staging',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsr9XTRFi8YnAU7npW4MsTCkpBZKhR4fIFzDxnDeLZB5Nm4KM8zA54J5MYpJnRqvMKd8gYdleYUaPrUo4gw4WDudBds_n3SZA5G79tCmfiVx9PNZznUswzhQa6ofJbQmRd2apT781KeIIbXb0a6feCqsr9XbSWuwNs_4X9Ky4z59_l5MfeLgH57ZQbCQaOuZT_16ih47vCGug-YokDgq9Ujy7Ohhxgiu-RP7yoQh3CqoL9vfcCvU5kGw',
      description: 'Wheel-thrown pedestal fruit and display bowl. Coarse iron sand clay with matte volcanic glaze.',
      inStock: true
    },
    {
      id: 'hom-2',
      title: 'Hand-Carved Olive Wood Serving Platter',
      category: 'Ceramics',
      price: 44.00,
      sku: 'HOM-PLT-02',
      stock: 8,
      active: true,
      codEligible: true,
      badge: 'Dining Nook',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkQkayGTTlfC9aaNPqHuNSkt1ao2HXWoMMXAXUoRbtd-UYr2dw6jB4WxCtg5RSFVOFVQRrgumv8zrJW7Kean_TV_vpY2cum7pTECyGdpph5cNUL6buMxLQMZAIBqMGglV8mxrtQr0RmLMRDBKtFe9I_hISolrZTZsKHhEhpQ4xuOp4rfT1SMqiw2uFD7mQkxCf546v3ff07XXXbLWbuNhPjQ6HhWUYEjeE8IpMDrYql3XG-zmkBrYi6w',
      description: 'Solid root olive wood serving board with natural grain swirls. Food safe beeswax finish.',
      inStock: true
    }
  ],
  'theme-essentials': [
    {
      id: 'ess-1',
      title: 'Kitchen Olive Wood Cooking Spoon Duo',
      category: 'Ceramics',
      price: 16.00,
      sku: 'ESS-SPN-01',
      stock: 30,
      active: true,
      codEligible: true,
      badge: 'Buy 2 Save $4',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkQkayGTTlfC9aaNPqHuNSkt1ao2HXWoMMXAXUoRbtd-UYr2dw6jB4WxCtg5RSFVOFVQRrgumv8zrJW7Kean_TV_vpY2cum7pTECyGdpph5cNUL6buMxLQMZAIBqMGglV8mxrtQr0RmLMRDBKtFe9I_hISolrZTZsKHhEhpQ4xuOp4rfT1SMqiw2uFD7mQkxCf546v3ff07XXXbLWbuNhPjQ6HhWUYEjeE8IpMDrYql3XG-zmkBrYi6w',
      description: 'Durable culinary spoons for daily high-heat cooking. Reorder in 1-tap.',
      inStock: true
    },
    {
      id: 'ess-2',
      title: 'Everyday Organic Eucalyptus Refill Pouch 500ml',
      category: 'Botanicals',
      price: 28.00,
      sku: 'ESS-RFL-02',
      stock: 45,
      active: true,
      codEligible: true,
      badge: 'Eco Refill',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd6EaXbxPs9dM6xdibWuuIsGYUmBN3WJGRl0XgiPVzlkMpKDfoaGgRgwOXS6FWU4t7n6ahxpxhSM4QcYuuvPyGpnw5Uz92lQ21JHWRxpJRJlOI_RSpKE28EGHbwmZRZFCwscMM8JA2KPK170YvWTUxTskaaIUfCa4RoOv9ZFQO2OpfY4G_Qbq05maHUQGSBd0Oy1QzcERvDseZYzksPOSaTbJnDJEyritlmBrz2NLqzlgPVLsZR5psLA',
      description: 'Biodegradable bulk refill pouch for mist bottles. Save 30% compared to new bottles.',
      inStock: true
    },
    {
      id: 'ess-3',
      title: 'Stone-Washed Linen Napkins Kitchen Bundle 4-Pack',
      category: 'Linens',
      price: 24.00,
      sku: 'ESS-NPK-03',
      stock: 18,
      active: true,
      codEligible: true,
      badge: 'Pantry Bundle',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBALhBygUgffJ5S9d115WUPcuTHdUlJW4T1MqP_heXt1z9g_xbGC9FPsdkmu--5n5Xz2ypmJoiy5B8wmWr7sUCRi-xWDigG3psNf156sDAMxoa5w4Y_-l36EqNEKgkEIiUnB5lhKac7IPgCRj98_EQJDUPruhLpGuk8ag9i9vrpau2SKM0pgjkwVLGtcivdle2Ul_E6CCMpvhNg10IyX3siHvNWlxIjUqrVKpOXrzJR93dvKRv_jmbXFA',
      description: 'Durable everyday table napkins in natural unbleached flax. Machine washable.',
      inStock: true
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1084',
    orderNumber: '1084',
    customerName: 'Sofia Ramos',
    customerInitials: 'SR',
    phone: '+1 (555) 234-8901',
    address: '412 Willow Lane, Apt 3B, Downtown',
    gateCode: '#0921',
    items: [
      { productId: 'prod-1', title: 'Handmade Speckled Ceramic Mug', price: 28.00, qty: 1 },
      { productId: 'prod-2', title: 'Organic Eucalyptus Linen Mist', price: 22.00, qty: 1 }
    ],
    itemsSummary: '1x Speckled Ceramic Mug, 1x Eucalyptus Linen Mist',
    totalAmount: 50.00,
    codStatus: 'COD Due',
    status: 'pending',
    placedTimeAgo: '14 mins ago',
    deliveryType: 'Courier',
    exactChangeNote: 'Exact change required: $50.00',
    courierName: 'Apex Urban Express'
  },
  {
    id: 'ord-1083',
    orderNumber: '1083',
    customerName: 'Marcus Vance',
    customerInitials: 'MV',
    phone: '+1 (555) 789-1234',
    address: '78 Heritage Blvd, Suite 104, Financial District',
    items: [
      { productId: 'prod-3', title: 'Raw Terracotta Plant Pot 6"', price: 34.00, qty: 1 }
    ],
    itemsSummary: '1x Terracotta Planter 6" Pot',
    totalAmount: 34.00,
    codStatus: 'COD Due',
    status: 'processing',
    placedTimeAgo: '1 hour ago',
    deliveryType: 'Courier',
    exactChangeNote: 'Collect $34.00 cash or local QR scan',
    courierName: 'Local Van Dispatch #4'
  },
  {
    id: 'ord-1081',
    orderNumber: '1081',
    customerName: 'Claire Dubois',
    customerInitials: 'CD',
    phone: '+1 (555) 456-7890',
    address: '19 Rue de Rivoli, Garden District',
    gateCode: 'Left with Concierge',
    items: [
      { productId: 'prod-4', title: 'Soy Wax Candle - Amber & Moss', price: 19.50, qty: 1 },
      { productId: 'prod-5', title: 'Handmade Olive Wood Spoon Set', price: 16.00, qty: 1 },
      { productId: 'prod-6', title: 'Woven Linen Napkin 4-Pack', price: 24.00, qty: 1 },
      { productId: 'prod-7', title: 'Match Striker Pot', price: 14.00, qty: 1 }
    ],
    itemsSummary: '1x Soy Wax Candle, 1x Olive Wood Spoon, 1x Linen Napkins, 1x Match Striker',
    totalAmount: 78.50,
    codStatus: 'COD Received',
    status: 'delivered',
    placedTimeAgo: 'Delivered today at 1:40 PM',
    deliveryType: 'Courier',
    courierName: 'Driver Jean Dupont (Ref: DRV-882)'
  },
  {
    id: 'ord-1048',
    orderNumber: '1048',
    customerName: 'Amara Morales',
    customerInitials: 'AM',
    phone: '+1 (555) 902-1847',
    address: '320 Highland Crest, West Hills',
    items: [
      { productId: 'prod-1', title: 'Handmade Speckled Ceramic Mug', price: 28.00, qty: 2 },
      { productId: 'prod-7', title: 'Match Striker Pot', price: 14.00, qty: 1 }
    ],
    itemsSummary: '2x Speckled Mug, 1x Match Striker Pot',
    totalAmount: 68.00,
    codStatus: 'COD Due',
    status: 'pending',
    placedTimeAgo: '28 mins ago',
    deliveryType: 'Courier',
    exactChangeNote: 'Exact change required: $68.00'
  },
  {
    id: 'ord-1047',
    orderNumber: '1047',
    customerName: 'Julien Laurent',
    customerInitials: 'JL',
    phone: '+1 (555) 819-3320',
    address: '15 Maritime Quay, Docklands',
    items: [
      { productId: 'prod-6', title: 'Woven Linen Napkin 4-Pack', price: 24.00, qty: 2 },
      { productId: 'prod-4', title: 'Soy Wax Candle', price: 19.50, qty: 1 }
    ],
    itemsSummary: '2x Linen Napkin 4-Pack, 1x Soy Wax Candle',
    totalAmount: 114.50,
    codStatus: 'COD Due',
    status: 'pending',
    placedTimeAgo: '42 mins ago',
    deliveryType: 'Standard Pickup',
    exactChangeNote: 'Courier Pickup scheduled 4:00 PM'
  },
  {
    id: 'ord-1046',
    orderNumber: '1046',
    customerName: 'Sora Takahashi',
    customerInitials: 'ST',
    phone: '+1 (555) 604-9912',
    address: 'Storefront Pickup - Counter Station 2',
    items: [
      { productId: 'prod-2', title: 'Organic Eucalyptus Linen Mist', price: 24.00, qty: 1 }
    ],
    itemsSummary: '1x Organic Botanical Mist (250ml)',
    totalAmount: 24.00,
    codStatus: 'COD Due',
    status: 'pending',
    placedTimeAgo: '1 hr 10m ago',
    deliveryType: 'Curbside',
    exactChangeNote: 'Curbside Pickup (Today, 4 PM)'
  }
];

export const INITIAL_THEMES: ThemeTemplate[] = [
  {
    id: 'theme-modern',
    name: 'Modern Store',
    version: 'v2.4 LTS',
    ratioBadge: '1:1 Neutral',
    tagBadge: 'CURRENTLY ACTIVE',
    subtitle: 'Balanced & Versatile General Retail',
    description: 'Structured 4-column layout engineered for high catalog diversity, predictable browsing cadence, and rapid cash-on-delivery door pickups.',
    keyArchitecture: [
      'Split hero with contextual catalog banner',
      'Balanced 4-column product grid with 1:1 ratios',
      'Slide-out instant COD drawer checkout'
    ],
    bestFor: 'Mixed inventory, artisanal gifts, lifestyle, home goods',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhbrrPAEMiCvXZrUX5t4JpOaVA_3YDvW0CpCmcLS9ZPIUWe0e16oOTNjhTTvoyjFOW7TX2eEIRgKCpuF0SqNvkIePzNLYwIk9cVsuOdNQ0Z991rvzBNrul3H8Ez0XWgGKsh_bc1jNRGrXfouC1BKibS3Okd8kLfmQbGjJUNHNPUMx3x_PrhXiJqHDdPfmV2Bwew2ABYB7XSbVNgL4amn1jOavq680myCwv0Bqc3VZSLpnLJhNxJxkWJA',
    miniatures: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBs5z66pjaSzU-TIl8Sa4NnQ2ZCf_uC1TZAuUNxDagEWDuoNzaej0aKyfSLBgi_Y9kG7v2VTCsfZFydIHvweW92xUymeyFTDKKsMg_H9jMT3buesqXqVc_skqGdsExqrbnBnO118g0mkVKtTuJqC7Fy4JDTf_uuYypVdqaoAliVu04-wHQWKyrPcVwPdRUHSVZM84NopnBGdlbJomD7P7XY7a6QrZcsFzfqt14Gne9G-F4RPwQGzs-lcg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEC4Alt_MQ60nVstZnsZhfffcKsBvdZd_HhH-DGp7RsuErpci3JkXMiZlEc5Bxb4GPK02ZYaw0PdfWAHDIKS2AWFS-0ZeOYU21-DBnZ6fipwV0HKqmikBc1cKYko6low3z-UtG4RPSxwcLeKsn12nWN4LAF-kAWvzoJW3K2hlDB2IAUfTQkQy8Usq07ItH5EZ5UEqtw9kyoBUzFo1do3fWMMc086T80LI3rhpoL8VgyjeEUgp9idDb6Q',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGs-lSlSTNIjVKrcs8RycwBg_Z-Y1VHi0c-SUaXODtdJgzfr1KjIXvcBMo74g8a9Y4NIyjZAA5561e1iu631EcIXTPQNaupvYJfmkQ1blrClYFhaeOnjLzUtRIhDPZuClHwPYcZetaQqrDgOtvw3-QVOda6leQ_clzaScN0VJDem1-vWb-iMCoKTsm0Z5_pHthDWgHunMhZnst_NIlzMBvxifumhotUh59ZfKdpt1BeRJDcJ4qu3AfGQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAsr9XTRFi8YnAU7npW4MsTCkpBZKhR4fIFzDxnDeLZB5Nm4KM8zA54J5MYpJnRqvMKd8gYdleYUaPrUo4gw4WDudBds_n3SZA5G79tCmfiVx9PNZznUswzhQa6ofJbQmRd2apT781KeIIbXb0a6feCqsr9XbSWuwNs_4X9Ky4z59_l5MfeLgH57ZQbCQaOuZT_16ih47vCGug-YokDgq9Ujy7Ohhxgiu-RP7yoQh3CqoL9vfcCvU5kGw'
    ],
    active: true,
    performanceScore: 98,
    philosophy: 'Split Hero Banner with modular balance for medium inventories',
    density: 'Medium (4-Column)',
    cropHandling: '1:1 Neutral Square (Zero distortion across uneven ratios)',
    heroStyle: 'Split 60/40 text + image card',
    checkoutStyle: 'Sticky Drawer Checkout with change calculator modal',
    palette: THEME_PALETTES['theme-modern']
  },
  {
    id: 'theme-fashion',
    name: 'Fashion & Lifestyle',
    version: 'v3.1 New',
    ratioBadge: '3:4 Portrait',
    tagBadge: 'EDITORIAL LOOKBOOK',
    subtitle: 'Editorial & Visual Storytelling',
    description: 'Generous whitespace and dramatic vertical rhythm suited for lifestyle apparel, luxury crafts, and lookbook-driven high average order values.',
    keyArchitecture: [
      'Full-bleed oversized hero mood photography',
      'Spacious 3-column editorial grid with portrait 3:4 crops',
      'Floating lookbook badges & narrative collection story cards'
    ],
    bestFor: 'Clothing, jewelry, footwear, skincare, luxury goods',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQs5eUzTau7CgV_aW0GGJLl18VL23QoJs-Ay-QRe1RylRwtOQIPrTtYB5G861D3pSGKYSXzPoxPkkzs9H7GKCgRqFmttTcy17TDcFduauDYGbQAwCOHEQnceSKVdodxjlyt17-nlg3BFSyg2vY1Di7g7DPmzvuIOkFqf8evKQ5P1vX_wL8GA0cNyp4NwU6FptG4I8T5shN1NzX1TtIW6AqFUDUAigL6FlQCVzBqkh6U9xshOfu2NskXQ',
    miniatures: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvLGZUERW2AtjrjbhNsxRa1hRl-0a379pfHRoYUETX7mrcEG_wFL1xWm2By42CcQofsj2W0IL40bzGGaxBlxsSIKki2RuLWEaH4HRLDCdizAAMsIm7l29XrwWWDC3E3WuaF0_4vQ4eMK-kRqHJOkQO0bklhNiOuOHuwtqJ0Q7JkgIGiHo0KmTnn3s8dM9HH-ZolM_OmRoLo6b3T-f3NNisTjKyiiM50AHT5SdxaIQp5mkHpsI3Tdz-Yg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvlMNg6qKQczwbhe6enmn59NyylrMu5LR-SvhsHxd4QQ4wX31ewbAhx36AkBixdt7BOxyNxKlSXkRHFwxfx3X9DJw-DcpczmNhsAMUBB_zm3E8RlCNJMbKzB7ebkLNtfr8m_JEWpn7T08r7Wd9wOII-u8AUwKCi7f-xz7yALpkDk3Ogz96Ir9ndX-jNqLFnqUjUhKzxvXqvQlkaUfiDo6ZJCaeICAPUSsoq4wNxl7TdiNvgDc5qRPS0g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbtQ0SQFT1NNGsypKCpmuHYxIJ6iAr9BNfDyIZqq_D_GU5MMpmwiQsLbPJKCvzJGltilPcqIbnGyErutVOiTkkEmxCmegdTakSsj8YJ2C94gMqqX0NxpVcWLkqjGeIXnHpTTztdCeRzayCXW_znuAoJZBAWJK3pT-CGCRjY0luIwZV2YlqUQjZ6TDdbMfQMniOd5P3KFogb_fWygmn_o6rtyf5r4qZKkQ1kk9ilLtwG096zvGi9u23kw'
    ],
    active: false,
    performanceScore: 95,
    philosophy: 'Full-Bleed Editorial with mood lifestyle photography',
    density: 'Airy / High Space (3-Column)',
    cropHandling: '3:4 Portrait Editorial (Full garment and model visibility)',
    heroStyle: 'Full-bleed cinematic mood canvas',
    checkoutStyle: 'Immersive Lookbook Tap with curated bundle sheet',
    palette: THEME_PALETTES['theme-fashion']
  },
  {
    id: 'theme-deals',
    name: 'Products & Deals',
    version: 'v1.9 Turbo',
    ratioBadge: 'High Density',
    tagBadge: 'MAX CONVERSION SPEED',
    subtitle: 'Catalog & Discount-Led Retail',
    description: 'Compact, screen-efficient layout built for multi-SKU retail where impulse purchasing, rapid discount tickers, and 1-click cash checkout thrive.',
    keyArchitecture: [
      'High-density deal ticker & countdown strip',
      'Ultra-compact 5-column grid with discount badges',
      'Instant 1-click Doorstep COD express button on cards'
    ],
    bestFor: 'Electronics, phone accessories, wholesale, fast retail',
    image: dealsHeroBannerImg,
    miniatures: [
      dealsProductSampleImg,
      dealsHeroBannerImg,
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVU5SoNKOF6Nd7om5QkPNuzpglZAMzv3RLIRjY2DP5-_Nsvs2Fq_C634Hp5wY_2yknkWRX6mRvJmF-OcQbScsHlzftDNi8GGtuH6Ni3rkxNg0aaiYyAuN1rooEYzG63ZMkEtn1ukUS2XRdjD4aqpirpiATmaaw-BulhCwGAGd7tUtx91HzZgZeeHS5YoJHeNHpNvywZTEXSeugnl0rdl7dmXz06Q6laTWSeQsCOCqH2qajE1hcdhkIkw'
    ],
    active: false,
    performanceScore: 99,
    philosophy: 'Compact Deal Grid with urgency-first promo tickers',
    density: 'Ultra-Compact (5-Column)',
    cropHandling: '1:1 Tight Contain (Hardware box and accessory focus)',
    heroStyle: 'Dynamic countdown ticker strip',
    checkoutStyle: 'Direct 1-Click Order Form with zero redirect doorstep confirmation',
    palette: THEME_PALETTES['theme-deals']
  },
  {
    id: 'theme-beauty',
    name: 'Beauty & Care',
    version: 'v2.1 Curated',
    ratioBadge: 'Refined Clean',
    tagBadge: 'DERMATOLOGIC & CLEAN',
    subtitle: 'Skincare, Cosmetics & Wellness',
    description: 'Gentle, tactile aesthetic featuring circular routine selectors, dermatological proof points, clinical ritual badges, and ingredient highlight ribbons.',
    keyArchitecture: [
      'Circular ritual category avatars & benefit tabs',
      'Clinical certification & ingredient breakdown chips',
      'Gentle doorstep cash-on-hand auto-calculation'
    ],
    bestFor: 'Cosmetics, essential oils, organic soaps, herbal botanicals',
    image: beautyHeroBannerImg,
    miniatures: [
      beautyProductSampleImg,
      beautyHeroBannerImg,
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOieR1dsKHOXPB4D1EI5EgNgifmDLCneLVFLb13rJYD24pNdglFMfQgQXtDWY2yyjrn4YjPk3EVJy6jPZcTsxllO5_v4NJs-mQ0v1tpmy2GfLacplfj9oXJdDR_zoMT89PIXCZcCDAx1rYYwd520YZBrg3TyoE6ZciEl4wJ_EnE4gT8n9MqgRdnldLqUgyU15qXjZKOrm9JOAzNw9VmsV7ZPxrmHiZox90lSxZiFPvlWsq9rM6qVVHMg'
    ],
    active: false,
    performanceScore: 97,
    philosophy: 'Ritual & Routine with soft pastel framing',
    density: 'Curated (3 to 4 Column)',
    cropHandling: '1:1 Soft Radial Border (Bottle & jar neutral glow padding)',
    heroStyle: 'Organic gradient ritual focus with ingredient badges',
    checkoutStyle: 'Gentle Modal with exact change prompt',
    palette: THEME_PALETTES['theme-beauty']
  },
  {
    id: 'theme-home',
    name: 'Home & Living',
    version: 'v2.8 Prime',
    ratioBadge: '16:9 Vignette',
    tagBadge: 'SPACIOUS VIGNETTES',
    subtitle: 'Interiors, Ceramics & Furniture',
    description: 'Warm, spacious staging layout featuring a room-by-room collection browser (Living, Dining, Bedroom) and tactile artisanal craftsmanship guarantees.',
    keyArchitecture: [
      'Room-by-Room ambient lookbook navigation',
      'Spacious landscape framing with texture zoom',
      'Bulky item COD inspection guarantee banner'
    ],
    bestFor: 'Planters, handcrafted pottery, lighting, beddings, rugs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ-ZV-EVEdcaXmXWYRqAO446hOEAJorPgsnsW6IyFtA3cChwLMvtBPm_lszc1o3iwaTMQ2mouWrJtcxAwdcWFskIH0fK4V9tIukf5vF7n80GY5UXCgzOPwXJgQAluwBEwhmNurGh2XcG-deODXMBiZSxmnXws8Xk-LlaeUMUiMU9R0srFB_fGmr4-Q880WYiX74lbkVYBjxRlwdsoK6id2TYBTdrQhqXOMofBB5c35jNYFs2bV8gGcYg',
    miniatures: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAsr9XTRFi8YnAU7npW4MsTCkpBZKhR4fIFzDxnDeLZB5Nm4KM8zA54J5MYpJnRqvMKd8gYdleYUaPrUo4gw4WDudBds_n3SZA5G79tCmfiVx9PNZznUswzhQa6ofJbQmRd2apT781KeIIbXb0a6feCqsr9XbSWuwNs_4X9Ky4z59_l5MfeLgH57ZQbCQaOuZT_16ih47vCGug-YokDgq9Ujy7Ohhxgiu-RP7yoQh3CqoL9vfcCvU5kGw'
    ],
    active: false,
    performanceScore: 96,
    philosophy: 'Living Vignettes with spacious room staging',
    density: 'Spacious (3-Column)',
    cropHandling: '16:9 / 4:3 Wide Staging (Contextual interior room angles)',
    heroStyle: 'Room scene selector with interactive product pins',
    checkoutStyle: 'Delivery Guarantee with doorstep inspection workflow',
    palette: THEME_PALETTES['theme-home']
  },
  {
    id: 'theme-essentials',
    name: 'Everyday Essentials',
    version: 'v3.4 Fast',
    ratioBadge: 'Utilitarian',
    tagBadge: 'FAST REORDER ENGINE',
    subtitle: 'Fast Reorders & High Scanability',
    description: 'Speed-optimized interface with instant inline cart adders, quantity steppers, bulk tier discount highlights, and repeat buy memory.',
    keyArchitecture: [
      '1-Tap quick increment adders without opening detail page',
      'Tiered bulk savings tags & bundle thresholds',
      'Instant reorder strip remembered by phone number'
    ],
    bestFor: 'Gardening supplies, pantry staples, consumables, roasters',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYMCBbLW37C41w06ogwpAqndXXlwe3EXAe7tkuy2D_sWR1kUblCKdnnTfqL7pWJEZ8RCQSHPVNIcI32nL5P0zmX73iptvzvUayDjQoxYAo4QXVn764wDsvip3z76qD_L1TKOeRFGnKevn27L69qRF9XeBKM_vO0iLr7f24XQoouO42BIlNoSOoBWgzsvR_w_5E7wmvaBSA3wQPMuTZ3VV9L-FSYVNgZum2bAX0LSc1YD99eYkmG1dWcA',
    miniatures: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEC4Alt_MQ60nVstZnsZhfffcKsBvdZd_HhH-DGp7RsuErpci3JkXMiZlEc5Bxb4GPK02ZYaw0PdfWAHDIKS2AWFS-0ZeOYU21-DBnZ6fipwV0HKqmikBc1cKYko6low3z-UtG4RPSxwcLeKsn12nWN4LAF-kAWvzoJW3K2hlDB2IAUfTQkQy8Usq07ItH5EZ5UEqtw9kyoBUzFo1do3fWMMc086T80LI3rhpoL8VgyjeEUgp9idDb6Q'
    ],
    active: false,
    performanceScore: 99,
    philosophy: 'Utilitarian Speed with inline reordering',
    density: 'Dense / Scan-Optimized (4 to 5 Column)',
    cropHandling: '1:1 Micro Thumbnail for rapid identification',
    heroStyle: 'Express reorder ribbon bar with customer memory',
    checkoutStyle: 'Inline Fast Bar with direct phone re-order',
    palette: THEME_PALETTES['theme-essentials']
  }
];

export const INITIAL_PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 'gw-cod',
    name: 'Cash on Delivery (COD) Engine',
    type: 'cod',
    enabled: true,
    icon: 'payments',
    badge: 'CORE REVENUE (92% of orders)',
    description: 'Zero friction customer checkout with SMS verification, exact change calculator, and courier cash reconciliation.',
    fee: '0% Platform Fee',
    payoutSchedule: 'Direct Cash to Driver / Same-Day',
    testMode: false,
    settlementAccount: 'Register Cash Box #1'
  },
  {
    id: 'gw-stripe',
    name: 'Stripe Connect (Vendor Direct)',
    type: 'card',
    enabled: true,
    icon: 'credit_card',
    badge: 'LIVE & PCI-DSS CERTIFIED',
    description: 'Process global credit cards, debit cards, Apple Pay, and Google Pay with automatic vendor payout splits.',
    fee: '2.9% + 30¢ per charge',
    payoutSchedule: 'Rolling 2 business days',
    testMode: false,
    settlementAccount: 'acct_1NZ40bBotanica'
  },
  {
    id: 'gw-doorstep-qr',
    name: 'Doorstep QR Terminal Pay',
    type: 'qr',
    enabled: true,
    icon: 'qr_code_2',
    badge: 'POPULAR AT DOORSTEP',
    description: 'Courier shows dynamic QR code on delivery for instant mobile banking, Pix, or UPI transfer upon satisfaction.',
    fee: '0.8% flat',
    payoutSchedule: 'Instant Bank Settlement',
    testMode: false,
    settlementAccount: 'Bank Chase Premier ****8820'
  },
  {
    id: 'gw-razorpay',
    name: 'Razorpay / Local Regional Rails',
    type: 'card',
    enabled: false,
    icon: 'account_balance',
    badge: 'READY TO ACTIVATE',
    description: 'Integrated local payment methods, UPI auto-debits, and digital wallets for non-US regional vendors.',
    fee: '2.0% per transaction',
    payoutSchedule: 'T+1 settlement',
    testMode: true,
    settlementAccount: 'Not configured'
  }
];

export const INITIAL_COD_RULES: CODRules = {
  enabled: true,
  maxOrderLimit: 250.00,
  minOrderForFreeDelivery: 40.00,
  deliveryFee: 4.50,
  requirePhoneOtp: true,
  allowDoorstepInspection: true,
  exactChangePrompt: true,
  restrictedPincodes: ['90210-TEMP', '97201-REMOTE'],
  whatsappConfirmation: true
};

export const INITIAL_USER: UserProfile = {
  name: 'Elena Rostova',
  email: 'elena@maisonbotanica.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAduJLk1o5KsLe4VXA4IoxgYFw-n0PCXs_MaeK3A8VCJYpS5RT8jdL5SXG-2MC1cT_TtBOMlpXbPnn1VdsJbOrUTLpmOfwwziHEWmNnjfjoHC3yirsz8H7ME8HLVinCfiSd1UyDIiyUV-zdnGuA6sT5DJaSGZdX83xC2EOXTCC2zX6zdHPjqoRz7pdhyn4T49yp_1UTmUF6clN5qfOV2D8_0o8UCTasLbMt1lf1byZqTp-OJq-ZRIo09Q',
  role: 'Store Founder & Merchant Admin',
  store: 'Maison Botanica',
  phone: '+1 (555) 392-8819',
  location: 'Studio 14, Arts Precinct, Portland OR',
  joinedDate: 'March 2024',
  twoFactorEnabled: true
};

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-101',
    title: '500x Biodegradable Cornstarch Mailers & Cushioning',
    date: 'Oct 8, 2026',
    category: 'Packaging',
    amount: 245.50,
    receiptName: 'EcoPack_INV-8910.pdf',
    status: 'Reconciled',
    paymentMethod: 'Corporate Visa ****4021',
    supplier: 'EcoPack Northwest'
  },
  {
    id: 'exp-102',
    title: 'Apex Urban Fleet - 45 Doorstep COD Dispatches',
    date: 'Oct 6, 2026',
    category: 'Logistics',
    amount: 198.00,
    receiptName: 'ApexDispatch_Wk40.pdf',
    status: 'Reconciled',
    paymentMethod: 'Bank Transfer (ACH)',
    supplier: 'Apex Urban Couriers'
  },
  {
    id: 'exp-103',
    title: 'High-Fire Red Stoneware Clay (12x 25kg Sacks)',
    date: 'Oct 3, 2026',
    category: 'Raw Materials',
    amount: 380.00,
    receiptName: 'CascadeClay_Oct_Inv.pdf',
    status: 'Reconciled',
    paymentMethod: 'Corporate Visa ****4021',
    supplier: 'Cascade Ceramic Supply'
  },
  {
    id: 'exp-104',
    title: 'Studio 14 Lease & Kiln Electricity Allowance',
    date: 'Oct 1, 2026',
    category: 'Studio Rent',
    amount: 1250.00,
    receiptName: 'ArtsPrecinct_Rent_Oct.pdf',
    status: 'Reconciled',
    paymentMethod: 'Automatic Debit',
    supplier: 'Portland Arts District Properties'
  },
  {
    id: 'exp-105',
    title: 'Pure Steam-Distilled Tasmanian Eucalyptus Oil (5L)',
    date: 'Sep 28, 2026',
    category: 'Raw Materials',
    amount: 185.00,
    status: 'Pending Receipt',
    paymentMethod: 'Stripe Vendor Card',
    supplier: 'AromaBotanics Wholesale'
  },
  {
    id: 'exp-106',
    title: 'Botanica SaaS Pro Tier & Domain DNS License',
    date: 'Sep 25, 2026',
    category: 'Software & Tools',
    amount: 49.00,
    receiptName: 'KioskeCommerce_Pro_09.pdf',
    status: 'Reconciled',
    paymentMethod: 'Corporate Visa ****4021',
    supplier: 'Kiosk SaaS Platform'
  }
];

export const INITIAL_PURCHASES: PurchaseOrder[] = [
  {
    id: 'po-81',
    poNumber: 'PO-2026-081',
    supplierName: 'Oat & Timber Studios',
    supplierContact: 'claire@oattimber.com',
    date: 'Oct 5, 2026',
    expectedDelivery: 'Oct 12, 2026',
    status: 'Partially Received',
    items: [
      {
        productId: 'prod-5',
        productTitle: 'Handmade Olive Wood Spoon Set',
        sku: 'WOD-08',
        orderedQty: 40,
        receivedQty: 25,
        unitCost: 8.50
      },
      {
        productId: 'prod-6',
        productTitle: 'Woven Linen Napkin 4-Pack',
        sku: 'LNN-12',
        orderedQty: 25,
        receivedQty: 25,
        unitCost: 11.00
      }
    ],
    totalCost: 615.00,
    notes: 'Remaining 15 wood spoons scheduled for final sanding run.'
  },
  {
    id: 'po-82',
    poNumber: 'PO-2026-082',
    supplierName: 'Willamette Clayworks Co.',
    supplierContact: 'orders@willametteclay.com',
    date: 'Oct 2, 2026',
    expectedDelivery: 'Oct 9, 2026',
    status: 'Received',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'Handmade Speckled Ceramic Mug',
        sku: 'MUG-01',
        orderedQty: 50,
        receivedQty: 50,
        unitCost: 13.00
      },
      {
        productId: 'prod-3',
        productTitle: 'Raw Terracotta Plant Pot 6"',
        sku: 'POT-09',
        orderedQty: 30,
        receivedQty: 30,
        unitCost: 15.50
      }
    ],
    totalCost: 1115.00,
    notes: 'All 80 ceramic units inspected and logged into main shelf stock.'
  },
  {
    id: 'po-83',
    poNumber: 'PO-2026-083',
    supplierName: 'Pacific Amber Apothecary',
    supplierContact: 'accounts@pacificapothecary.com',
    date: 'Oct 9, 2026',
    expectedDelivery: 'Oct 16, 2026',
    status: 'Sent',
    items: [
      {
        productId: 'prod-2',
        productTitle: 'Organic Eucalyptus Linen Mist',
        sku: 'MST-04',
        orderedQty: 40,
        receivedQty: 0,
        unitCost: 9.80
      },
      {
        productId: 'prod-4',
        productTitle: 'Soy Wax Candle - Amber & Moss',
        sku: 'CND-02',
        orderedQty: 60,
        receivedQty: 0,
        unitCost: 8.20
      }
    ],
    totalCost: 884.00,
    notes: 'Holiday season restock order. Amber vessels batch 2026-C.'
  }
];

export const INITIAL_PURCHASE_ORDERS = INITIAL_PURCHASES;

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cpn-1',
    code: 'BOTANICA15',
    description: '15% Off all ceramics, linens & organic botanicals',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 35.00,
    maxUses: 500,
    usesCount: 142,
    validUntil: 'Nov 30, 2026',
    active: true
  },
  {
    id: 'cpn-2',
    code: 'DOORSTEP5',
    description: 'Flat $5.00 discount on all doorstep Cash on Delivery orders',
    discountType: 'fixed',
    discountValue: 5.00,
    minSpend: 25.00,
    maxUses: 200,
    usesCount: 89,
    validUntil: 'Dec 31, 2026',
    active: true
  },
  {
    id: 'cpn-3',
    code: 'FREESHIP',
    description: 'Waiver of standard courier delivery fee',
    discountType: 'fixed',
    discountValue: 4.50,
    minSpend: 30.00,
    maxUses: 1000,
    usesCount: 312,
    validUntil: 'Dec 31, 2026',
    active: true
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    productTitle: 'Handmade Speckled Ceramic Mug',
    author: 'Clara S. (Verified Buyer)',
    rating: 5,
    title: 'The tactile texture is stunning in morning light',
    comment: 'The speckled clay feels so grounded in your hands. I inspected it right at my door with the driver before paying cash. Truly frictionless shopping experience!',
    date: '2 days ago',
    verifiedBuyer: true,
    helpfulCount: 24,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJigiuhiqAAhdX03eXckckAeA63tciz-LWUEuHwoZLRd4ZjNY0CcE76duBximuBbMpxFT4ue7yCRBGM9zN2RbNWqKLJGEkjFVWQGcUtCkpHU3WOyN2IzLqRlknueK9gLiM92gj-Y2GuF7wkU7kYqpJ0ZV4xpQUXke-MY9G6E_JAk4ezCwZcVpxHgjpgXy0NohAbRcdL-yDYO3Oo64mi9XHoDnN41ZEAcS_aJxFfYpsjO7Z4aw7JUI6Dg'
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    productTitle: 'Organic Eucalyptus Linen Mist',
    author: 'Marcus Vance (Verified Buyer)',
    rating: 5,
    title: 'Natural, crisp eucalyptus aroma with no chemical undertones',
    comment: 'Spraying this on fresh French linen before bed transforms the entire room. Will be subscribing when bulk refills launch.',
    date: '5 days ago',
    verifiedBuyer: true,
    helpfulCount: 18
  },
  {
    id: 'rev-3',
    productId: 'prod-4',
    productTitle: 'Soy Wax Candle - Amber & Moss',
    author: 'Sophia Chen (Verified Buyer)',
    rating: 5,
    title: 'Even burn and crackling wood wick',
    comment: 'Warm amber glow without sooting. Arrived safely wrapped in 100% biodegradable cornstarch cushioning.',
    date: '1 week ago',
    verifiedBuyer: true,
    helpfulCount: 31
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    productTitle: 'Raw Terracotta Plant Pot 6"',
    author: 'Julian L. (Verified Buyer)',
    rating: 4,
    title: 'Earthy porous clay keeps my pilea thriving',
    comment: 'Very authentic wabi-sabi feel. Natural salt blooms give it so much character over time.',
    date: '2 weeks ago',
    verifiedBuyer: true,
    helpfulCount: 12
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-1',
    message: 'Autumn Drop 04 is live! Enjoy free Cash on Delivery & doorstep inspection on orders over $40.',
    badge: 'NEW ARRIVALS',
    linkText: 'Explore Catalog',
    linkTarget: 'storefront',
    active: true
  },
  {
    id: 'anc-2',
    message: 'Use code BOTANICA15 at checkout for 15% off handcrafted ceramics & wildcrafted aromatics.',
    badge: 'LIMITED OFFER',
    linkText: 'Apply Code',
    linkTarget: 'storefront',
    active: true
  },
  {
    id: 'anc-3',
    message: 'Doorstep Courier Notice: Orders placed before 2:00 PM are dispatched same-day with local courier fleet.',
    badge: 'SLA GUARANTEE',
    active: false
  }
];

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'soc-1',
    platform: 'instagram',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChXeUcfgn8rxZVxLrpwIMMGCOdpeGNA_8bEzaqmn0_NdP8ZLncc69NJ10g8MANRdz1BDULZb4EOpcsmm7MzplQYq4ELVamoHp7fHOjcohaOb0VkRIxZBRDCSGczucW6CWOudCWcvkdzAjopCMq2PxyeeKqyoTAjNjLB0aDgVCT-qokmz_ndYCBCHQnuVZHohhXgWMs1su4efgwJvU-4aIgWG3POeNvMeuWWIkSMxcoVpCH2DQlFmUwiA',
    caption: 'Calm morning rituals with our handmade speckled stoneware and Tasmanian eucalyptus spray. Spun slowly on kick wheels in Portland, OR.',
    likes: 428,
    comments: 32,
    postUrl: 'https://instagram.com/maisonbotanica',
    taggedProductTitle: 'Handmade Speckled Ceramic Mug',
    taggedPrice: 28.00
  },
  {
    id: 'soc-2',
    platform: 'instagram',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaBw91rc6P7DCRIXLn52uUcpU2NyVkXw69Grl2zkhUyhEhSA_TrfwWlJf4k0NjtiSWHpxcd9Re5F89Qd3sLZpQFrrKGDr2YWq-mH1s05VtAiyR4Gqj4v-rkktxCXJy8BJl-F31kfg4g_J55nPMu6Ltn4QCfwr-Qw0JDMnoHgZoov1zPw0TjQwazX3jvBUOFuG-H6CrgM8h_kL-jCEvC2hnid4tvGPflgxhf_dWovkY7bkoOWZNzxQRvA',
    caption: 'Amber & Moss hand-poured soy candle flickering against raw limestone. Inspect your parcel at the doorstep with full zero-risk assurance.',
    likes: 312,
    comments: 19,
    postUrl: 'https://instagram.com/maisonbotanica',
    taggedProductTitle: 'Soy Wax Candle - Amber & Moss',
    taggedPrice: 19.50
  },
  {
    id: 'soc-3',
    platform: 'instagram',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8KNdnZxVEf8nikDTVd9TXoSqXB2UA33A5JOwJq0EYwS6XKMMZSxaFPNvsYaQ6tGPqwc9MRaOZbDEmLsnU0TIoVdtK7Ta-gJ7FbUe5kQe0yKgmOtuFOjth1nJdnv684KWKkcK_HkzfyP1WEK-VKUhhTNm-CREig6BneriRwhdZIcP1txPi9JdWk0l0FuAOMiUzDAySpC6PuHCZYfHCrq0-WGjdH0d1n3Z3Ql4css1-L_NQV9bJoPBf1Q',
    caption: 'Fluted terracotta ribbed planter holding fresh vibrant succulents. Porous earthy textures that breathe naturally with plant root systems.',
    likes: 589,
    comments: 44,
    postUrl: 'https://instagram.com/maisonbotanica',
    taggedProductTitle: 'Raw Terracotta Plant Pot 6"',
    taggedPrice: 34.00
  },
  {
    id: 'soc-4',
    platform: 'instagram',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBALhBygUgffJ5S9d115WUPcuTHdUlJW4T1MqP_heXt1z9g_xbGC9FPsdkmu--5n5Xz2ypmJoiy5B8wmWr7sUCRi-xWDigG3psNf156sDAMxoa5w4Y_-l36EqNEKgkEIiUnB5lhKac7IPgCRj98_EQJDUPruhLpGuk8ag9i9vrpau2SKM0pgjkwVLGtcivdle2Ul_E6CCMpvhNg10IyX3siHvNWlxIjUqrVKpOXrzJR93dvKRv_jmbXFA',
    caption: 'Raw hem French flax napkins neatly tied with jute twine. Pre-washed for soft everyday table setting cadence.',
    likes: 274,
    comments: 15,
    postUrl: 'https://instagram.com/maisonbotanica',
    taggedProductTitle: 'Woven Linen Napkin 4-Pack',
    taggedPrice: 24.00
  }
];

export const INITIAL_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone-1',
    name: 'Portland Central & Arts Precinct',
    coverage: 'Postcodes 97201–97239 (Urban Core)',
    estimatedHours: '24 Hours (Next Day Doorstep)',
    baseFee: 3.50,
    freeAbove: 35.00,
    codAvailable: true
  },
  {
    id: 'zone-2',
    name: 'Greater Portland Metro & Suburbs',
    coverage: 'Postcodes 97001–97199 (Metro & Beaverton)',
    estimatedHours: '24–48 Hours',
    baseFee: 4.50,
    freeAbove: 40.00,
    codAvailable: true
  },
  {
    id: 'zone-3',
    name: 'Pacific Northwest Regional Express',
    coverage: 'Oregon & Washington Regional Depots',
    estimatedHours: '48–72 Hours via Apex Express',
    baseFee: 6.00,
    freeAbove: 60.00,
    codAvailable: true
  }
];

export const INITIAL_SEO: SEOSettings = {
  metaTitle: 'Maison Botanica — Handcrafted Homewares & Organic Botanical Living',
  metaDescription: 'Consciously formed ceramic vessels, natural wildcrafted room elixirs, and slow-crafted everyday tools. Cash on Delivery guaranteed with 7-day doorstep inspection.',
  keywords: ['artisan ceramics', 'organic room mist', 'terracotta planters', 'cash on delivery homewares', 'portland pottery', 'botanical living'],
  ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChXeUcfgn8rxZVxLrpwIMMGCOdpeGNA_8bEzaqmn0_NdP8ZLncc69NJ10g8MANRdz1BDULZb4EOpcsmm7MzplQYq4ELVamoHp7fHOjcohaOb0VkRIxZBRDCSGczucW6CWOudCWcvkdzAjopCMq2PxyeeKqyoTAjNjLB0aDgVCT-qokmz_ndYCBCHQnuVZHohhXgWMs1su4efgwJvU-4aIgWG3POeNvMeuWWIkSMxcoVpCH2DQlFmUwiA',
  canonicalUrl: 'https://kiosk.shop/maison-botanica',
  storeNotice: 'Accepting doorstep Cash on Delivery (COD) across all urban delivery routes.'
};

