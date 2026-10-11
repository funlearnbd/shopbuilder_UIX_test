import React, { useState } from 'react';
import { Product, CustomerReview } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  allProducts: Product[];
  reviews: CustomerReview[];
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onShowToast: (message: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  allProducts,
  reviews,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onShowToast
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'delivery'>('details');

  const productReviews = reviews.filter(r => r.productId === product.id);

  // Smart Related Products (same category or general companions)
  const related = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.category === 'Tableware'))
    .slice(0, 3);

  const handleShare = (platform: 'copy' | 'whatsapp' | 'twitter') => {
    const url = window.location.href;
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      onShowToast(`Copied product link for ${product.title}`);
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=Look%20at%20this%20${encodeURIComponent(product.title)}:%20${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=Loving%20this%20${encodeURIComponent(product.title)}&url=${url}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 bg-[#eff4ff] dark:bg-[#182230] border-b border-[#bfc9c0]/20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#004328] text-white px-2 py-0.5 rounded">
              SKU: {product.sku}
            </span>
            <span className="text-xs text-[#707971] dark:text-[#9ab0a0]">&bull; {product.category}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Wishlist Heart Button */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isWishlisted
                  ? 'bg-[#ffdad6] text-[#ba1a1a]'
                  : 'bg-white dark:bg-[#223045] text-[#707971] hover:text-[#ba1a1a]'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist (Saved locally)'}
            >
              <span className={`material-symbols-outlined text-[18px] ${isWishlisted ? 'fill-1' : ''}`}>
                favorite
              </span>
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#707971] hover:bg-black/10">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Main Grid: Image + Core Buy Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Image Box */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#eff4ff] dark:bg-[#223045] border border-[#bfc9c0]/30 shadow-xs">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.discountBadge && (
                <span className="absolute top-2 left-2 bg-[#9b4500] text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold">
                  {product.discountBadge}
                </span>
              )}
            </div>

            {/* Product Meta & Actions */}
            <div className="flex flex-col justify-between space-y-3">
              <div>
                <h2 className="text-lg font-bold text-[#121c2a] dark:text-white leading-snug">
                  {product.title}
                </h2>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-2xl font-extrabold text-[#004328] dark:text-[#8ed6aa]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-[#707971] line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Rating snippet */}
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  <span className="text-[#9b4500]">★★★★★</span>
                  <span className="font-bold text-[#121c2a] dark:text-white">5.0</span>
                  <span className="text-[#707971]">({productReviews.length || 1} verified ratings)</span>
                </div>

                <div className="mt-3 p-3 bg-[#eff4ff] dark:bg-[#223045] rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#004328] dark:text-[#8ed6aa]">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Zero-Risk Cash on Delivery</span>
                  </div>
                  <p className="text-[11px] text-[#707971] dark:text-[#9ab0a0]">
                    Inspect item right at your doorstep before handing payment to courier.
                  </p>
                </div>
              </div>

              {/* Quantity Stepper & Add Button */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-[#eff4ff] dark:bg-[#223045] rounded-xl border border-[#bfc9c0]/30 px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 font-bold text-xs">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    disabled={product.stock === 0}
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) {
                        onAddToCart(product);
                      }
                      onClose();
                    }}
                    className="flex-1 h-11 bg-[#004328] dark:bg-[#0d5c3a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-[#0d5c3a] disabled:opacity-40"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>{product.stock === 0 ? 'Sold Out' : `Add ${quantity} to Bag &bull; $${(product.price * quantity).toFixed(2)}`}</span>
                  </button>
                </div>

                {/* Social Share Bar */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-[#707971]">Share with friends:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="text-[#004328] dark:text-[#8ed6aa] font-bold hover:underline"
                    >
                      WhatsApp
                    </button>
                    <span className="text-[#bfc9c0]">&bull;</span>
                    <button
                      onClick={() => handleShare('copy')}
                      className="text-[#004328] dark:text-[#8ed6aa] font-bold hover:underline"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtabs: Details, Reviews, Delivery Policy */}
          <div className="border-t border-[#bfc9c0]/20 pt-3">
            <div className="flex gap-2 border-b border-[#bfc9c0]/20 pb-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  activeTab === 'details' ? 'bg-[#004328] text-white' : 'text-[#707971]'
                }`}
              >
                Artisan Story & Specs
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  activeTab === 'reviews' ? 'bg-[#004328] text-white' : 'text-[#707971]'
                }`}
              >
                Verified Reviews ({productReviews.length})
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  activeTab === 'delivery' ? 'bg-[#004328] text-white' : 'text-[#707971]'
                }`}
              >
                Doorstep Return Guarantee
              </button>
            </div>

            <div className="pt-3 text-xs leading-relaxed text-[#404942] dark:text-[#9ab0a0]">
              {activeTab === 'details' && (
                <div className="space-y-2">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 bg-[#eff4ff] dark:bg-[#223045] rounded-xl">
                      <span className="font-bold block text-[#121c2a] dark:text-white">Studio Craft</span>
                      <span className="text-[11px]">Portland, OR Hand-thrown Ceramic Studio</span>
                    </div>
                    <div className="p-2.5 bg-[#eff4ff] dark:bg-[#223045] rounded-xl">
                      <span className="font-bold block text-[#121c2a] dark:text-white">Care Instructions</span>
                      <span className="text-[11px]">Dishwasher-safe, unglazed tactile exterior</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {productReviews.length === 0 ? (
                    <p className="italic">No customer reviews yet. Be the first to leave feedback after doorstep inspection!</p>
                  ) : (
                    productReviews.map(r => (
                      <div key={r.id} className="p-3 bg-[#eff4ff] dark:bg-[#223045] rounded-xl space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-[#121c2a] dark:text-white">{r.author}</span>
                          <span className="text-[#9b4500]">{'★'.repeat(r.rating)}</span>
                        </div>
                        <h4 className="font-bold text-xs text-[#121c2a] dark:text-white">{r.title}</h4>
                        <p className="text-[11px]">{r.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-2">
                  <p>
                    <strong>7-Day Doorstep Replacement Guarantee:</strong> Open your package directly in front of the local courier. If any item is damaged or does not match expectations, hand it back immediately without paying.
                  </p>
                  <p>
                    Orders placed before 2:00 PM are packaged in 100% biodegradable cornstarch and dispatched locally within 24-48 hours.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products / Frequently Bought Together Section */}
          {related.length > 0 && (
            <div className="border-t border-[#bfc9c0]/20 pt-4 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#707971]">
                Frequently Paired With This Item
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {related.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="p-2 rounded-xl border border-[#bfc9c0]/30 hover:shadow-md cursor-pointer transition-all bg-[#eff4ff]/40 dark:bg-[#223045]/40"
                  >
                    <img src={rel.image} alt={rel.title} className="w-full h-20 object-cover rounded-lg" />
                    <h5 className="font-bold text-[11px] truncate mt-1.5 text-[#121c2a] dark:text-white">{rel.title}</h5>
                    <span className="text-xs font-extrabold text-[#004328] dark:text-[#8ed6aa]">${rel.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
