import React, { useState } from 'react';
import { Tenant } from '../types';

interface DeveloperApiViewProps {
  tenant: Tenant;
  onShowToast: (message: string) => void;
}

export const DeveloperApiView: React.FC<DeveloperApiViewProps> = ({
  tenant,
  onShowToast
}) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('orders');
  const [apiBaseUrl, setApiBaseUrl] = useState<string>('https://api.yourbackend.com/v1');
  const [copiedCode, setCopiedCode] = useState(false);

  const endpoints = [
    {
      id: 'products',
      name: 'GET /api/v1/products',
      method: 'GET',
      desc: 'Retrieve store catalog with real-time stock levels, SKU, and COD eligibility.',
      request: `// Query parameters: ?category=Ceramics&in_stock=true&search=MUG
GET /api/v1/products?tenant_id=${tenant.id}
Authorization: Bearer <API_SECRET_KEY>`,
      response: `{
  "status": "success",
  "data": [
    {
      "id": "prod-1",
      "title": "Handmade Speckled Ceramic Mug",
      "sku": "MUG-01",
      "price": 28.00,
      "stock": 14,
      "category": "Ceramics",
      "cod_eligible": true,
      "image_url": "https://..."
    }
  ]
}`
    },
    {
      id: 'orders',
      name: 'POST /api/v1/orders',
      method: 'POST',
      desc: 'Submit a customer doorstep Cash on Delivery or card payment order.',
      request: `POST /api/v1/orders
Content-Type: application/json
Authorization: Bearer <API_SECRET_KEY>

{
  "tenant_id": "${tenant.id}",
  "customer_name": "Sofia Ramos",
  "phone": "+15552348901",
  "address": "412 Willow Lane, Apt 3B, Downtown",
  "gate_code": "#0921",
  "items": [
    { "product_id": "prod-1", "qty": 1, "price": 28.00 },
    { "product_id": "prod-2", "qty": 1, "price": 22.00 }
  ],
  "payment_method": "cod",
  "total_amount": 50.00,
  "promo_code": "BOTANICA15"
}`,
      response: `{
  "status": "success",
  "order_number": "1084",
  "tracking_url": "https://${tenant.domain}/track/1084",
  "cod_due_amount": 50.00,
  "assigned_courier": "Apex Urban Couriers"
}`
    },
    {
      id: 'stock-in',
      name: 'POST /api/v1/inventory/stock-in',
      method: 'POST',
      desc: 'Record a supplier purchase receiving event and automatically increment live stock.',
      request: `POST /api/v1/inventory/stock-in
Content-Type: application/json

{
  "po_number": "PO-2026-081",
  "supplier_name": "Willamette Clayworks Co.",
  "items": [
    { "sku": "MUG-01", "received_qty": 50, "unit_cost": 13.00 }
  ],
  "auto_publish_soldout": true
}`,
      response: `{
  "status": "success",
  "sku": "MUG-01",
  "previous_stock": 14,
  "new_stock": 64,
  "status": "Active"
}`
    },
    {
      id: 'coupons',
      name: 'POST /api/v1/coupons/verify',
      method: 'POST',
      desc: 'Verify a promo discount code during buyer checkout with spend thresholds.',
      request: `POST /api/v1/coupons/verify
Content-Type: application/json

{
  "code": "BOTANICA15",
  "basket_total": 50.00,
  "customer_phone": "+15552348901"
}`,
      response: `{
  "valid": true,
  "discount_type": "percentage",
  "discount_amount": 7.50,
  "new_subtotal": 42.50
}`
    },
    {
      id: 'expenses',
      name: 'POST /api/v1/expenses',
      method: 'POST',
      desc: 'Log a merchant operating cost voucher or courier payout receipt.',
      request: `POST /api/v1/expenses
Content-Type: application/json

{
  "title": "Apex Courier Doorstep Settlements",
  "category": "Logistics",
  "amount": 198.00,
  "reconciled": true,
  "receipt_ref": "ApexDispatch_Wk40.pdf"
}`,
      response: `{
  "status": "created",
  "expense_id": "exp-102",
  "monthly_burn_total": 2328.00
}`
    }
  ];

  const current = endpoints.find(e => e.id === selectedEndpoint) || endpoints[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    onShowToast('Copied API contract code snippet to clipboard');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const sampleAdapterCode = `// src/services/api.ts
// Point this front-end directly to your backend by replacing the mock state hooks!

const API_BASE = import.meta.env.VITE_API_BASE_URL || '${apiBaseUrl}';

export const apiClient = {
  // 1. Fetch Catalog Products
  getProducts: async () => {
    const res = await fetch(\`\${API_BASE}/products?tenant_id=${tenant.id}\`);
    return res.json();
  },

  // 2. Submit Doorstep COD Order
  createOrder: async (orderPayload: any) => {
    const res = await fetch(\`\${API_BASE}/orders\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });
    return res.json();
  },

  // 3. Receive Inbound Stock-In
  confirmStockIn: async (poId: string, items: any[]) => {
    const res = await fetch(\`\${API_BASE}/inventory/stock-in\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poId, items }),
    });
    return res.json();
  }
};`;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707971] dark:text-[#9ab0a0] mb-0.5">
          <span>Architecture & Integration</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#004328] dark:text-[#8ed6aa]">Backend API Connector</span>
        </div>
        <h1 className="text-2xl font-bold text-[#121c2a] dark:text-[#f8f9ff]">
          Connect Your Existing Backend
        </h1>
        <p className="text-xs text-[#404942] dark:text-[#9ab0a0] mt-0.5">
          Everything in this front-end is 100% decoupling-ready. Hook into your Express, Nest, Django, Go, or Rails backend using the clean REST contracts below.
        </p>
      </div>

      {/* Integration Step by Step Box */}
      <div className="bg-[#eff4ff] dark:bg-[#182230] rounded-2xl p-5 border border-[#004328]/20 dark:border-[#27313f] space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004328] dark:text-[#8ed6aa] text-[22px]">
            integration_instructions
          </span>
          <h3 className="text-sm font-bold text-[#121c2a] dark:text-white">
            3-Step Integration Guide
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-[#1a2535] rounded-xl border border-[#bfc9c0]/30 space-y-1">
            <span className="font-bold text-[#004328] dark:text-[#8ed6aa] block">Step 1: Set Base URL</span>
            <p className="text-[#707971] text-[11px]">
              Add <code className="font-mono text-[10px] bg-black/5 dark:bg-white/10 px-1 rounded">VITE_API_BASE_URL="http://your-server/api/v1"</code> to your <code className="font-mono text-[10px]">.env</code>.
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-[#1a2535] rounded-xl border border-[#bfc9c0]/30 space-y-1">
            <span className="font-bold text-[#004328] dark:text-[#8ed6aa] block">Step 2: Match JSON Contracts</span>
            <p className="text-[#707971] text-[11px]">
              Use the exact payload schemas documented below for Products, COD Orders, and Inventory.
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-[#1a2535] rounded-xl border border-[#bfc9c0]/30 space-y-1">
            <span className="font-bold text-[#004328] dark:text-[#8ed6aa] block">Step 3: Point State to Fetch</span>
            <p className="text-[#707971] text-[11px]">
              Replace initial mock state in <code className="font-mono text-[10px]">App.tsx</code> with the <code className="font-mono text-[10px]">apiClient</code> service methods.
            </p>
          </div>
        </div>
      </div>

      {/* Target Base URL Tester */}
      <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-4 shadow-xs border border-[#bfc9c0]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707971] mb-1">
            Target Backend Base URL
          </label>
          <input
            type="url"
            value={apiBaseUrl}
            onChange={(e) => setApiBaseUrl(e.target.value)}
            className="w-full h-10 px-3 bg-[#eff4ff] dark:bg-[#223045] rounded-xl font-mono text-xs text-[#121c2a] dark:text-white outline-none"
          />
        </div>
        <button
          onClick={() => onShowToast(`Pinging ${apiBaseUrl}/health... Simulation: 200 OK (Latency: 28ms)`)}
          className="px-4 py-2 bg-[#004328] text-white rounded-xl text-xs font-bold hover:bg-[#0d5c3a] shrink-0 sm:mt-4"
        >
          Test Ping Backend
        </button>
      </div>

      {/* Interactive Endpoint Explorer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Endpoint Selector Column */}
        <div className="md:col-span-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707971] px-1 block">
            API Route Contracts
          </span>
          {endpoints.map(ep => (
            <button
              key={ep.id}
              onClick={() => setSelectedEndpoint(ep.id)}
              className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all ${
                selectedEndpoint === ep.id
                  ? 'bg-[#004328] text-white border-[#004328] shadow-xs'
                  : 'bg-white dark:bg-[#1a2535] text-[#121c2a] dark:text-white border-[#bfc9c0]/30 hover:bg-[#eff4ff]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono">{ep.method}</span>
                <span className="text-[10px] font-normal opacity-80">{ep.id}</span>
              </div>
              <div className="text-[11px] font-mono mt-0.5 truncate">{ep.name}</div>
            </button>
          ))}
        </div>

        {/* Contract Code Viewer Column */}
        <div className="md:col-span-8 bg-white dark:bg-[#1a2535] rounded-2xl shadow-xs border border-[#bfc9c0]/30 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#bfc9c0]/20 pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono text-[#004328] dark:text-[#8ed6aa]">
                {current.name}
              </h3>
              <p className="text-xs text-[#707971] mt-0.5">{current.desc}</p>
            </div>
            <button
              onClick={() => handleCopyCode(current.request)}
              className="px-3 py-1 bg-[#eff4ff] dark:bg-[#223045] rounded-lg text-xs font-bold text-[#004328] dark:text-[#8ed6aa] hover:bg-[#dee9fc]"
            >
              {copiedCode ? 'Copied!' : 'Copy Schema'}
            </button>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#707971] block mb-1">
              Sample Request Contract
            </span>
            <pre className="p-3 bg-[#0d141e] text-[#a9f3c5] rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
              {current.request}
            </pre>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#707971] block mb-1">
              Expected JSON Response
            </span>
            <pre className="p-3 bg-[#0d141e] text-[#8ed6aa] rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
              {current.response}
            </pre>
          </div>
        </div>
      </div>

      {/* Copy-Paste Ready API Client Adapter */}
      <div className="bg-white dark:bg-[#1a2535] rounded-2xl p-5 shadow-xs border border-[#bfc9c0]/30 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#121c2a] dark:text-white">
              Ready-to-use Frontend Service Wrapper (<code className="font-mono text-xs">src/services/api.ts</code>)
            </h4>
            <p className="text-xs text-[#707971]">
              Copy this into your project when ready to make real network calls to your server.
            </p>
          </div>
          <button
            onClick={() => handleCopyCode(sampleAdapterCode)}
            className="px-4 py-2 bg-[#004328] text-white rounded-xl text-xs font-bold hover:bg-[#0d5c3a]"
          >
            Copy Service File
          </button>
        </div>

        <pre className="p-4 bg-[#0d141e] text-[#a9f3c5] rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
          {sampleAdapterCode}
        </pre>
      </div>
    </div>
  );
};
