import React, { useState } from 'react';
import { Product, ThemeColorPalette } from '../types';

interface ProductsViewProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  onOpenAddProduct: () => void;
  onShowToast: (message: string) => void;
  activePalette?: ThemeColorPalette;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onUpdateProducts,
  onOpenAddProduct,
  onShowToast,
  activePalette
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Stock Adjustment with tactile feedback
  const handleStockDelta = (productId: string, delta: number) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const nextStock = Math.max(0, p.stock + delta);
        return {
          ...p,
          stock: nextStock,
          inStock: nextStock > 0,
          badge: nextStock === 0 ? 'Out of Stock (0)' : nextStock <= 3 ? `Low Stock (${nextStock} left)` : 'Active'
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    const prod = products.find(p => p.id === productId);
    if (prod) {
      onShowToast(`Adjusted stock for ${prod.title} (${delta > 0 ? '+' : ''}${delta})`);
    }
  };

  // Toggle Active/Inactive Status
  const handleToggleActive = (productId: string) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const nextActive = !p.active;
        return { ...p, active: nextActive };
      }
      return p;
    });
    onUpdateProducts(updated);
    const prod = products.find(p => p.id === productId);
    onShowToast(`${prod?.title} is now ${prod?.active ? 'Inactive' : 'Active'}`);
  };

  // Quick Restock "+ Receive 10" for sold out
  const handleReceiveStock = (productId: string, amount: number = 10) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          stock: p.stock + amount,
          inStock: true,
          active: true,
          badge: 'Active'
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    const prod = products.find(p => p.id === productId);
    onShowToast(`Received +${amount} inventory units for ${prod?.title}`);
  };

  // Duplicate Product
  const handleDuplicateProduct = (product: Product) => {
    const newProd: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      title: `${product.title} (Copy)`,
      sku: `${product.sku}-CP`,
      stock: 10,
      active: true,
      inStock: true,
      badge: 'Active'
    };
    onUpdateProducts([newProd, ...products]);
    onShowToast(`Duplicated: ${newProd.title}`);
  };

  // Categories count calculation
  const categories = ['All', 'Ceramics', 'Botanicals', 'Linens'];
  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return products.length;
    return products.filter(p => p.category === cat).length;
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 3).length;
  const activeCount = products.filter(p => p.active).length;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Dynamic Operational Stat Banner & Primary Action */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-[#eff4ff] dark:bg-[#182230] px-4 py-1.5 rounded-full border border-[#bfc9c0]/30 dark:border-[#27313f]">
            <span className="w-2 h-2 rounded-full bg-[#004328] dark:bg-[#8ed6aa] animate-pulse"></span>
            <span className="text-xs font-bold text-[#121c2a] dark:text-[#f8f9ff]">
              {activeCount} Active Products
            </span>
            <span className="text-[#bfc9c0] text-xs">•</span>
            <span className="text-xs font-bold text-[#9b4500] dark:text-[#ffb68e]">
              {lowStockCount} Low Stock
            </span>
          </div>
          <button
            onClick={() => onShowToast('Inventory levels verified and synchronized with POS register')}
            className="flex items-center justify-center p-2 rounded-full bg-white dark:bg-[#1a2535] hover:bg-[#dee9fc] dark:hover:bg-[#223045] transition-colors text-[#121c2a] dark:text-[#f8f9ff] border border-[#bfc9c0]/30 dark:border-[#27313f]"
            title="Inventory Sync Status"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">sync</span>
          </button>
        </div>

        {/* Add Product Prominent CTA */}
        <button
          onClick={onOpenAddProduct}
          style={{ backgroundColor: activePalette?.primary || '#004328' }}
          className="flex items-center justify-between w-full h-12 px-4 text-white rounded-xl shadow-md active:scale-[0.98] hover:opacity-90 transition-all"
          type="button"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span className="font-bold text-sm">+ Add Product</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-md">
            F2 SHORTCUT
          </span>
        </button>
      </div>

      {/* Search & Category Filter Area */}
      <div className="space-y-2">
        <div className="relative flex items-center w-full bg-white dark:bg-[#1a2535] rounded-xl shadow-xs border border-[#bfc9c0]/40 dark:border-[#27313f]">
          <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#707971] dark:text-[#9ab0a0]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-11 bg-transparent text-[#121c2a] dark:text-[#f8f9ff] text-sm placeholder:text-[#707971] dark:placeholder:text-[#9ab0a0] focus:outline-none"
            placeholder="Search products, SKU..."
            type="text"
          />
          <button
            onClick={() => onShowToast('Barcode scanner active: Point camera at product tag')}
            className="absolute right-2 p-1.5 text-[#707971] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white transition-colors"
            title="Scan Barcode / QR"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {categories.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#004328] dark:bg-[#0d5c3a] text-white shadow-xs'
                    : 'bg-[#eff4ff] dark:bg-[#182230] text-[#404942] dark:text-[#bfc9c0] hover:bg-[#dee9fc] dark:hover:bg-[#223045]'
                }`}
                type="button"
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/60 dark:bg-black/20 text-[#707971] dark:text-[#9ab0a0]'
                }`}>
                  {getCategoryCount(cat)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product List Cards matching design Image 1 */}
      <div className="space-y-3">
        {filteredProducts.map(product => {
          const isOutOfStock = product.stock === 0;
          const isLowStock = product.stock > 0 && product.stock <= 3;

          return (
            <div
              key={product.id}
              className={`flex flex-col bg-white dark:bg-[#1a2535] rounded-2xl shadow-xs border border-[#bfc9c0]/30 dark:border-[#27313f] p-4 gap-3 relative transition-all ${
                !product.active ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Thumbnail with SKU tag */}
                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#eff4ff] dark:bg-[#182230] border border-[#bfc9c0]/20 dark:border-[#27313f]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale contrast-75' : ''}`}
                  />
                  <span className="absolute top-1 left-1 bg-white/90 dark:bg-black/70 px-1 py-0.5 rounded text-[8px] font-bold tracking-tight text-[#121c2a] dark:text-white">
                    SKU: {product.sku}
                  </span>
                  {isOutOfStock && (
                    <span className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-[#ba1a1a] text-white text-[9px] uppercase font-bold px-1.5 py-0.5 rounded">
                        Sold Out
                      </span>
                    </span>
                  )}
                </div>

                {/* Info & Badges */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#121c2a] dark:text-[#f8f9ff] truncate">
                      {product.title}
                    </h3>
                    {/* Toggle Active */}
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        checked={product.active}
                        onChange={() => handleToggleActive(product.id)}
                        className="sr-only peer"
                        type="checkbox"
                      />
                      <div className="w-9 h-5 bg-[#d9e3f6] dark:bg-[#27313f] peer-checked:bg-[#004328] dark:peer-checked:bg-[#0d5c3a] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>

                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-[#121c2a] dark:text-[#f8f9ff]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-[#707971] line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                    {product.discountBadge && (
                      <span className="text-xs font-bold text-[#9b4500] dark:text-[#ffb68e]">
                        {product.discountBadge}
                      </span>
                    )}
                    {product.codEligible && (
                      <span className="text-[11px] text-[#404942] dark:text-[#9ab0a0]">
                        COD Eligible
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6] dark:bg-[#93000a] text-[#ba1a1a] dark:text-[#ffdad6] text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px]">cancel</span>
                        Out of Stock (0)
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdbca] dark:bg-[#682c00] text-[#9b4500] dark:text-[#ffdbca] text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px]">warning</span>
                        Low Stock ({product.stock} left)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#a9f3c5] dark:bg-[#005232] text-[#002111] dark:text-[#a9f3c5] text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004328] dark:bg-[#a9f3c5]"></span>
                        Active
                      </span>
                    )}
                    <span className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action Deck & Stock Counter */}
              <div className="flex items-center justify-between pt-1 bg-[#eff4ff]/60 dark:bg-[#182230]/60 -mx-4 -mb-4 px-4 py-2 rounded-b-2xl border-t border-[#bfc9c0]/20 dark:border-[#27313f]">
                {/* Stock Incrementor */}
                <div className="flex items-center bg-white dark:bg-[#1a2535] rounded-xl shadow-xs px-1 py-0.5 border border-[#bfc9c0]/30 dark:border-[#27313f]">
                  <button
                    disabled={product.stock <= 0}
                    onClick={() => handleStockDelta(product.id, -1)}
                    className="w-8 h-8 flex items-center justify-center text-[#404942] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                  <span className={`text-xs font-bold px-2 min-w-[28px] text-center ${
                    isOutOfStock ? 'text-[#ba1a1a]' : isLowStock ? 'text-[#9b4500]' : 'text-[#121c2a] dark:text-[#f8f9ff]'
                  }`}>
                    {product.stock}
                  </span>
                  <button
                    onClick={() => handleStockDelta(product.id, 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#404942] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white active:scale-95 transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>

                {/* Quick Icon Actions */}
                <div className="flex items-center gap-1.5">
                  {isOutOfStock ? (
                    <button
                      onClick={() => handleReceiveStock(product.id, 10)}
                      className="flex items-center gap-1 px-3 h-9 rounded-xl bg-[#004328] dark:bg-[#0d5c3a] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">inventory</span>
                      <span>Receive 10</span>
                    </button>
                  ) : null}
                  <button
                    onClick={() => handleDuplicateProduct(product)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-[#1a2535] text-[#404942] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white transition-colors border border-[#bfc9c0]/30 dark:border-[#27313f] shadow-xs"
                    title="Duplicate Item"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  </button>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-[#1a2535] text-[#404942] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white transition-colors border border-[#bfc9c0]/30 dark:border-[#27313f] shadow-xs"
                    title="Edit Product"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => onShowToast(`Analytics for ${product.title}: 142 Views, 18 Orders, $504.00 Gross Sales`)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-[#1a2535] text-[#404942] dark:text-[#9ab0a0] hover:text-[#121c2a] dark:hover:text-white transition-colors border border-[#bfc9c0]/30 dark:border-[#27313f] shadow-xs"
                    title="Product Analytics"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#1a2535] rounded-2xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#bfc9c0]/20 dark:border-[#27313f]">
              <h3 className="text-base font-bold text-[#121c2a] dark:text-[#f8f9ff]">
                Edit Product Details
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#707971] hover:text-[#121c2a] dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
                onUpdateProducts(updated);
                setEditingProduct(null);
                onShowToast(`Updated product: ${editingProduct.title}`);
              }}
              className="p-4 space-y-3"
            >
              <div>
                <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-sm text-[#121c2a] dark:text-[#f8f9ff] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-sm text-[#121c2a] dark:text-[#f8f9ff] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#707971] dark:text-[#9ab0a0] uppercase tracking-wider mb-1">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setEditingProduct({
                        ...editingProduct,
                        stock: val,
                        inStock: val > 0
                      });
                    }}
                    className="w-full h-10 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-sm text-[#121c2a] dark:text-[#f8f9ff] outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="cod-eligible"
                  checked={editingProduct.codEligible}
                  onChange={(e) => setEditingProduct({ ...editingProduct, codEligible: e.target.checked })}
                  className="w-4 h-4 rounded text-[#004328] focus:ring-0"
                />
                <label htmlFor="cod-eligible" className="text-xs font-medium text-[#121c2a] dark:text-[#f8f9ff]">
                  Cash on Delivery (COD) Eligible for Doorstep Inspection
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-[#bfc9c0]/20 dark:border-[#27313f]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-[#f8f9ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#004328] text-white shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POS Sync Toast */}
      <div className="flex items-center justify-between p-3.5 bg-[#eff4ff] dark:bg-[#182230] rounded-xl border border-[#bfc9c0]/30 dark:border-[#27313f]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004328] dark:text-[#8ed6aa] text-[20px]">
            verified
          </span>
          <span className="text-xs font-medium text-[#121c2a] dark:text-[#f8f9ff]">
            Store catalog synced with POS terminal & Barcode Index
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#707971] dark:text-[#9ab0a0]">1m ago</span>
      </div>
    </div>
  );
};
