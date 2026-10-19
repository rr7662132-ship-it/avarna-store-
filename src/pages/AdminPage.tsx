import React from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import { Product } from '../types';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductManager from '../components/admin/ProductManager';
import ProductForm from '../components/admin/ProductForm';
import OrderManager from '../components/admin/OrderManager';
import CategoryManager from '../components/admin/CategoryManager';

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
  const { isAuthenticated, user } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // AdminLayout handles the access denied state for non-admin users
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
