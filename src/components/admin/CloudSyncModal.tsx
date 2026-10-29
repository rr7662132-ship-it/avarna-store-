import React, { useState, useEffect } from 'react';
import {
  Cloud,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowRight,
  Download,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Laptop,
  X,
  UploadCloud,
} from 'lucide-react';
import { useProducts } from '../../contexts/ProductContext';
import {
  isSupabaseConfigured,
  getActiveSupabaseCredentials,
  saveSupabaseConfig,
  clearSupabaseConfig,
  testSupabaseConnection,
  syncAllProductsToSupabase,
} from '../../services/supabase';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloudSyncModal: React.FC<CloudSyncModalProps> = ({ isOpen, onClose }) => {
  const { products } = useProducts();
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    if (isOpen) {
      const creds = getActiveSupabaseCredentials();
      setSupabaseUrl(creds.url);
      setSupabaseKey(creds.key);
      setStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in both Supabase URL and Anon Key.' });
      return;
    }

    setTesting(true);
    setStatusMessage(null);

    const testResult = await testSupabaseConnection(supabaseUrl, supabaseKey);
    if (!testResult.success) {
      setStatusMessage({ type: 'error', text: testResult.message });
      setTesting(false);
      return;
    }

    const saved = saveSupabaseConfig(supabaseUrl, supabaseKey);
    if (saved) {
      setStatusMessage({
        type: 'success',
        text: 'Cloud database connected! All changes will now sync live across mobile and desktop.',
      });
    } else {
      setStatusMessage({ type: 'error', text: 'Failed to save configuration.' });
    }
    setTesting(false);
  };

  const handleDisconnect = () => {
    clearSupabaseConfig();
    setSupabaseUrl('');
    setSupabaseKey('');
    setStatusMessage({ type: 'success', text: 'Cloud sync disconnected. Operating in local storage mode.' });
  };

  const handleSyncAllProducts = async () => {
    setSyncing(true);
    try {
      const res = await syncAllProductsToSupabase(products);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: `Successfully synced ${res.count} products & images to cloud!`,
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: 'Failed to push products to cloud. Ensure Supabase credentials and "products" table are ready.',
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Sync failed.' });
    } finally {
      setSyncing(false);
    }
  };

  // Generate complete products.ts file content for 1-click GitHub deployment
  const generateProductsTs = (): string => {
    return `import { Product } from '../types';\n\nexport const products: Product[] = ${JSON.stringify(
      products,
      null,
      2
    )};\n`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateProductsTs());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([generateProductsTs()], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-forest-900 text-white flex items-center justify-between border-b border-forest-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center border border-forest-700">
              <Cloud className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Multi-Device Cloud Sync
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isConfigured
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                  }`}
                >
                  {isConfigured ? '🟢 Live Cloud Active' : '🟡 Local Storage Mode'}
                </span>
              </h3>
              <p className="text-xs text-forest-200">
                Ensure image & product updates reflect instantly across all mobiles and desktops
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-forest-800 hover:bg-forest-700 flex items-center justify-center text-forest-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-4 rounded-xl text-sm flex items-start gap-2.5 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Device Sync Visual Indicator */}
          <div className="bg-cream-50 p-4 rounded-2xl border border-cream-100 flex items-center justify-around text-center">
            <div className="flex flex-col items-center">
              <Laptop className="w-7 h-7 text-forest-700 mb-1" />
              <span className="text-xs font-semibold text-gray-800">Admin Laptop</span>
              <span className="text-[10px] text-gray-500">Edit Images & Prices</span>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="flex items-center gap-1 text-xs font-bold text-forest-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Real-Time Cloud
              </div>
              <div className="w-28 h-0.5 bg-forest-200 relative my-1">
                <div className="absolute inset-0 bg-forest-600 animate-pulse" />
              </div>
              <span className="text-[10px] text-gray-400">Zero Refresh Needed</span>
            </div>

            <div className="flex flex-col items-center">
              <Smartphone className="w-7 h-7 text-forest-700 mb-1" />
              <span className="text-xs font-semibold text-gray-800">Customer Mobile</span>
              <span className="text-[10px] text-gray-500">Instant Live Updates</span>
            </div>
          </div>

          {/* Option 1: Supabase Live Database */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-forest-600" />
                Option A: Connect Supabase Cloud Database (Recommended)
              </h4>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-forest-700 hover:text-forest-900 font-semibold inline-flex items-center gap-1"
              >
                <span>Supabase Dashboard</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              When connected, every product or image edit made here immediately broadcasts to all customers on their mobile phones and computers without needing to rebuild the site.
            </p>

            <form onSubmit={handleTestAndSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-forest-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Supabase Anon (Public) Key
                </label>
                <input
                  type="password"
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-forest-600 outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="submit"
                  disabled={testing}
                  className="px-5 py-2.5 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50 shadow-sm"
                >
                  {testing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Testing Connection...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Test & Connect Cloud Database</span>
                    </>
                  )}
                </button>

                {isConfigured && (
                  <>
                    <button
                      type="button"
                      onClick={handleSyncAllProducts}
                      disabled={syncing}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      {syncing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Pushing Products...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-4 h-4" />
                          <span>Push All ({products.length}) Products to Cloud</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="px-3.5 py-2.5 text-xs text-rose-600 hover:text-rose-800 font-semibold transition-colors ml-auto"
                    >
                      Disconnect
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>

          {/* Option 2: 1-Click GitHub Export */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <h4 className="font-semibold text-gray-900 text-sm mb-1.5 flex items-center gap-2">
              <Download className="w-4 h-4 text-gray-700" />
              Option B: Export Updated Catalog to GitHub (Permanent Zero-Cost)
            </h4>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              If you don't use Supabase, you can export your updated product catalog with all edited images directly into the codebase. When pushed to GitHub, Vercel automatically deploys the updated images to all visitors worldwide!
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied products.ts code!' : 'Copy products.ts Code'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadFile}
                className="px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download products.ts File</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloudSyncModal;