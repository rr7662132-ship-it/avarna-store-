import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import { Product } from '../types';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductManager from '../components/admin/ProductManager';
import ProductForm from '../components/admin/ProductForm';
import OrderManager from '../components/admin/OrderManager';
import CategoryManager from '../components/admin/CategoryManager';
import { Lock, Mail, KeyRound, Eye, EyeOff, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';

// Dedicated Admin Login Portal for /admin
const AdminLoginPortal: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@avarna.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the administrator password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Incorrect administrator password. Please try again.');
      }
    } catch {
      setError('An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-forest-900 to-green-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-green-800/30 animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-forest-50 text-forest-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-forest-100 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-forest-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">AVARNA Admin Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Enter your password to unlock the store manager</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2 animate-slide-up">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-forest-600 focus:border-forest-600 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
                className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-forest-600 focus:border-forest-600 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-forest-700 hover:bg-forest-800 active:scale-[0.99] text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-forest-700 font-medium transition-colors"
          >
            ← Return to Customer Store
          </Link>
        </div>
      </div>
    </div>
  );
};

// Wrapper for Add Product
const AddProductPage: React.FC = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleSave = (product: Product) => {
    addProduct(product);
    navigate('/admin/products');
  };

  return <ProductForm onSave={handleSave} onCancel={() => navigate('/admin/products')} />;
};

// Wrapper for Edit Product
const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct } = useProducts();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/admin/products')}
          className="text-green-700 hover:text-green-800 font-medium"
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  const handleSave = (updatedProduct: Product) => {
    updateProduct(updatedProduct.id, updatedProduct);
    navigate('/admin/products');
  };

  return (
    <ProductForm
      product={product}
      onSave={handleSave}
      onCancel={() => navigate('/admin/products')}
    />
  );
};

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // If not authenticated or not admin, display the dedicated Admin Portal sign-in
  if (!isAuthenticated || !isAdmin) {
    return <AdminLoginPortal />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductManager />} />
        <Route path="products/new" element={<AddProductPage />} />
        <Route path="products/edit/:id" element={<EditProductPage />} />
        <Route path="orders" element={<OrderManager />} />
        <Route path="categories" element={<CategoryManager />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminPage;
