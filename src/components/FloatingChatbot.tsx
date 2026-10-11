import React, { useState } from 'react';
import { Product, Tenant } from '../types';

interface FloatingChatbotProps {
  tenant: Tenant;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onShowToast: (message: string) => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  recommendedProduct?: Product;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({
  tenant,
  products,
  onAddToCart,
  onShowToast
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: `Hello! I am your Maison Botanica digital concierge. How can I assist you with handcrafted living essentials or doorstep Cash on Delivery today?`
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const quickPrompts = [
    { label: '📦 How does Doorstep COD work?', reply: 'With our Cash on Delivery guarantee, you do not pay upfront. When the local courier arrives, you can open and inspect the ceramics or botanicals before handing over cash or scanning a local QR code!' },
    { label: '🚚 Delivery times & costs?', reply: 'We dispatch locally in Portland within 24 hours. Delivery is completely free on all orders over $40 (or standard $4.50 courier fee).' },
    { label: '🎁 Gift under $30?', reply: 'Our Handmade Speckled Ceramic Mug ($28.00) or Amber & Moss Soy Wax Candle ($19.50) are bestsellers and make beautiful, thoughtful gifts!', recommendSku: 'MUG-01' },
    { label: '🌿 Room fragrance advice?', reply: 'Our Organic Eucalyptus Linen Mist ($22.00) is steam-distilled and pairs wonderfully with the Amber & Moss candle.', recommendSku: 'MST-04' }
  ];

  const handleSendPrompt = (prompt: { label: string; reply: string; recommendSku?: string }) => {
    const userMsg: Message = { sender: 'user', text: prompt.label };
    const recProduct = prompt.recommendSku ? products.find(p => p.sku === prompt.recommendSku) : undefined;
    const botMsg: Message = { sender: 'bot', text: prompt.reply, recommendedProduct: recProduct };
    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');

    const matchedProduct = products.find(p => 
      p.title.toLowerCase().includes(userText.toLowerCase()) ||
      p.category.toLowerCase().includes(userText.toLowerCase())
    );

    let reply = `Thank you for asking! For "${userText}", our studio crafts small-batch goods in Portland. Cash on Delivery is supported on all orders!`;
    if (userText.toLowerCase().includes('return') || userText.toLowerCase().includes('exchange')) {
      reply = `We provide a 7-day hassle-free replacement or exchange policy, and you can inspect the package right at your doorstep before paying.`;
    } else if (matchedProduct) {
      reply = `I found a great recommendation for you: ${matchedProduct.title} ($${matchedProduct.price.toFixed(2)}).`;
    }

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'bot', text: reply, recommendedProduct: matchedProduct }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-24 right-5 sm:bottom-8 sm:right-8 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 rounded-full bg-[#004328] dark:bg-[#0d5c3a] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all ring-4 ring-white/50 dark:ring-black/50"
          title="Open AI Concierge & Customer Inquiries"
        >
          <span className="material-symbols-outlined text-[26px]">
            {isOpen ? 'close' : 'smart_toy'}
          </span>
        </button>
      </div>

      {/* Slide-Up Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 sm:bottom-24 right-4 sm:right-8 z-50 w-[360px] max-w-[calc(100vw-32px)] bg-white dark:bg-[#1a2535] rounded-3xl shadow-2xl border border-[#bfc9c0]/40 dark:border-[#27313f] flex flex-col overflow-hidden max-h-[520px] animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#004328] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Botanica Concierge</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a9f3c5] animate-pulse"></span>
                  <span className="text-[10px] text-[#a9f3c5]">Instant AI Store Assistant</span>
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/18004128900"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg flex items-center gap-1"
              title="Chat with Elena on WhatsApp"
            >
              <span className="material-symbols-outlined text-[14px]">chat</span>
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Messages Stream */}
          <div className="p-3.5 overflow-y-auto flex-1 space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#004328] text-white rounded-br-xs'
                      : 'bg-[#eff4ff] dark:bg-[#223045] text-[#121c2a] dark:text-[#f8f9ff] rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>

                {/* Recommended Product Chip */}
                {m.recommendedProduct && (
                  <div className="mt-2 p-2 rounded-xl bg-white dark:bg-[#111927] border border-[#bfc9c0]/30 shadow-xs flex items-center justify-between gap-2 max-w-[90%]">
                    <img
                      src={m.recommendedProduct.image}
                      alt={m.recommendedProduct.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-[11px] truncate block text-[#121c2a] dark:text-white">
                        {m.recommendedProduct.title}
                      </span>
                      <span className="font-extrabold text-xs text-[#004328] dark:text-[#8ed6aa]">
                        ${m.recommendedProduct.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onAddToCart(m.recommendedProduct!);
                        onShowToast(`Added ${m.recommendedProduct!.title} to cart`);
                      }}
                      className="px-2.5 py-1 bg-[#004328] text-white rounded-lg text-[10px] font-bold shrink-0 hover:bg-[#0d5c3a]"
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick FAQ Prompts */}
          <div className="p-2 border-t border-[#bfc9c0]/20 flex gap-1.5 overflow-x-auto no-scrollbar bg-[#eff4ff]/30 dark:bg-[#182230]/30">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendPrompt(p)}
                className="px-2.5 py-1 bg-white dark:bg-[#223045] border border-[#bfc9c0]/30 rounded-full text-[10px] font-bold text-[#404942] dark:text-[#bfc9c0] whitespace-nowrap hover:bg-[#dee9fc] shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleCustomSend} className="p-2.5 bg-white dark:bg-[#1a2535] border-t border-[#bfc9c0]/20 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about scents, returns, or gifts..."
              className="flex-1 h-9 px-3 rounded-xl bg-[#eff4ff] dark:bg-[#223045] text-xs text-[#121c2a] dark:text-white outline-none placeholder:text-[#707971]"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-[#004328] text-white flex items-center justify-center shrink-0 hover:bg-[#0d5c3a]"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
