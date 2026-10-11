import React, { useState } from 'react';
import { Product } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  onShowToast: (message: string) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  onShowToast
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Product['category']>('Ceramics');
  const [price, setPrice] = useState('28.00');
  const [comparePrice, setComparePrice] = useState('');
  const [sku, setSku] = useState(`SKU-${Math.floor(100 + Math.random() * 900)}`);
  const [stock, setStock] = useState('15');
  const [codEligible, setCodEligible] = useState(true);
  const [imageUrl, setImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAta6lirhXo2TALJq6Vx9nN1KFsWOmRLRcgzvK84lmu_n1hJqyXYAaWXUS6ZM9dOGb3a4Lc_JuR-bJ1IMKAt1GvcjDBYpJHCWiFU8C_xIPtvlayZ8vyA9HIS2FUbyBG7n8G5vzq8kJOyhdYiOYOxnDUzq5SS-7pCuEJ8YLKqj6msGvyV6_aVmWp4O8Xg1zovlN1EgQNpWWa53R641TNg3mRm34PshrDRLwfN7RwjcLEnGL4bHtiBqRrQw'
  );
  const [description, setDescription] = useState('Handcrafted botanical living ware spun from high-fire stoneware.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedPrice = parseFloat(price) || 0;
    const parsedStock = parseInt(stock) || 0;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title,
      category,
      price: parsedPrice,
      compareAtPrice: comparePrice ? parseFloat(comparePrice) : undefined,
      sku: sku.trim().toUpperCase(),
      stock: parsedStock,
      active: true,
      codEligible,
      image: imageUrl,
      description,
      inStock: parsedStock > 0,
      badge: parsedStock === 0 ? 'Out of Stock (0)' : parsedStock <= 3 ? `Low Stock (${parsedStock} left)` : 'Active'
    };

    onAddProduct(newProduct);
    onShowToast(`Created new product: ${newProduct.title} (SKU: ${newProduct.sku})`);
    onClose();
  };

  const sampleImages = [
    { label: 'Ceramic Mug', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAta6lirhXo2TALJq6Vx9nN1KFsWOmRLRcgzvK84lmu_n1hJqyXYAaWXUS6ZM9dOGb3a4Lc_JuR-bJ1IMKAt1GvcjDBYpJHCWiFU8C_xIPtvlayZ8vyA9HIS2FUbyBG7n8G5vzq8kJOyhdYiOYOxnDUzq5SS-7pCuEJ8YLKqj6msGvyV6_aVmWp4O8Xg1zovlN1EgQNpWWa53R641TNg3mRm34PshrDRLwfN7RwjcLEnGL4bHtiBqRrQw' },
    { label: 'Amber Mist', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd6EaXbxPs9dM6xdibWuuIsGYUmBN3WJGRl0XgiPVzlkMpKDfoaGgRgwOXS6FWU4t7n6ahxpxhSM4QcYuuvPyGpnw5Uz92lQ21JHWRxpJRJlOI_RSpKE28EGHbwmZRZFCwscMM8JA2KPK170YvWTUxTskaaIUfCa4RoOv9ZFQO2OpfY4G_Qbq05maHUQGSBd0Oy1QzcERvDseZYzksPOSaTbJnDJEyritlmBrz2NLqzlgPVLsZR5psLA' },
    { label: 'Soy Candle', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtOIQAefyB3YhpM6YF7s_QaOu_MCJoWF5rYoJ-69_Zy0F6cAbw2BBZ7yRwUL9ul1IPpeesF3HzfZ4zkSfEUSN9Q47IiqiZIkAWx1HWu90Mxt0gcqVs2UM-xXNWy1FfzJrYkDfgV0y17Bnai6JVh3YlXZaMIEmZzP5w2MuiYeMWeCdznkWn85TocfegXpHFEzm1ztb01hbtwQjmmjhYJbioao99aqgC6MBdUiI0JCF-gzkbq0YR4e0CIg' },
    { label: 'Terracotta', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARnYKNT8eXLoMYlwjMx92fCYH7z3Ha6WB5YVmtrS8JUG3NGH6q1-6LjTlM7PGS0QCRGunhAcmCV_nFNxH4WXLYY1l9WSCE_UU-jHiBRvuwsvRHMk5B9zFqS6t80hwi36PzF73kf-Rr6H7jELgKO7h1u2OiUXa1JV2pwcpkRWBWWT_nVl3AwPhRfX9uXvYAK51SO7HmWOOzBxuGolXwbtgEmpOpT8yqX9devjCOFz6lxztFOYFMEgNjkg' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#eff4ff] dark:bg-[#182230] border-b border-[#bfc9c0]/20 dark:border-[#27313f]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#004328] dark:text-[#8ed6aa]">
              add_circle
            </span>
            <div>
              <h3 className="text-base font-bold text-[#121c2a] dark:text-white">
                Add New Product to Catalog
              </h3>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#707971]">
                Doorstep COD Enabled by Default
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#707971] hover:text-[#121c2a] dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Handmade Speckled Ceramic Mug"
              className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-sm text-[#121c2a] dark:text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-bold text-[#121c2a] dark:text-white outline-none"
              >
                <option value="Ceramics">Ceramics</option>
                <option value="Botanicals">Botanicals</option>
                <option value="Linens">Linens</option>
                <option value="Tableware">Tableware</option>
                <option value="Aromatics">Aromatics</option>
                <option value="Plants">Plants</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                SKU Tag
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs font-mono text-[#121c2a] dark:text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-sm font-bold text-[#121c2a] dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                Compare ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={comparePrice}
                onChange={(e) => setComparePrice(e.target.value)}
                placeholder="Optional"
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-sm text-[#121c2a] dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                Stock Qty *
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-sm font-bold text-[#121c2a] dark:text-white outline-none"
              />
            </div>
          </div>

          {/* Quick Image Presets */}
          <div>
            <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
              Product Photo Preview
            </label>
            <div className="flex items-center gap-3 mb-2">
              <img
                src={imageUrl}
                alt="preview"
                className="w-16 h-16 rounded-xl object-cover bg-[#eff4ff] border border-[#bfc9c0]/30 shrink-0"
              />
              <div className="flex-1">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-[#eff4ff] dark:bg-[#223045] text-xs text-[#121c2a] dark:text-white outline-none"
                  placeholder="Paste image URL..."
                />
                <div className="flex gap-1.5 mt-1.5">
                  {sampleImages.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(s.url)}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#dee9fc] dark:bg-[#223045] text-[#121c2a] dark:text-white hover:bg-[#a9f3c5]"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs text-[#121c2a] dark:text-white outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-[#eff4ff]/60 dark:bg-[#223045]/60 rounded-xl">
            <input
              type="checkbox"
              id="new-cod-eligible"
              checked={codEligible}
              onChange={(e) => setCodEligible(e.target.checked)}
              className="w-4 h-4 rounded text-[#004328]"
            />
            <label htmlFor="new-cod-eligible" className="text-xs font-semibold text-[#121c2a] dark:text-white">
              Eligible for Doorstep Cash on Delivery (COD) & inspection
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#bfc9c0]/20 dark:border-[#27313f]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#004328] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#0d5c3a]"
            >
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
