import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';
import { useOrders } from '../../contexts/OrderContext';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '../../utils/format';
import {
  Package,
  ShoppingCart,
  IndianRupee,
  AlertTriangle,
  Eye,
  Plus,
  ArrowRight,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { products, updateProduct } = useProducts();
  const { orders } = useOrders();

  // Stats calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const revenue = orders
    .filter((order) => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = products.filter((p) => p.stockCount !== undefined && p.stockCount < 5);
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const statsCards = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
      trend: '+12%',
    },
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-emerald-100 text-emerald-600',
      trend: '+8%',
    },
    {
      label: 'Revenue',
      value: formatPrice(revenue),
      icon: IndianRupee,
      color: 'bg-purple-100 text-purple-600',
      trend: '+23%',
    },
    {
      label: 'Low Stock Alert',
      value: lowStockProducts.length,
      icon: AlertTriangle,
      color: 'bg-amber-100 text-amber-600',
      trend: lowStockProducts.length > 0 ? 'Action needed' : 'All good',
    },
  ];

  const handleRestock = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      updateProduct(productId, {
        stockCount: (product.stockCount || 0) + 20,
        inStock: true,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || 'Admin'}! 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            View All Orders
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm text-green-700 hover:text-green-800 font-medium inline-flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="px-6 py-3 font-medium">Order ID</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium hidden md:table-cell">Date</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Total</th>
                    <th className="px-6 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 font-mono text-xs text-gray-600">
                        #{order.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {order.address?.name || order.shippingAddress?.name || 'Customer'}
                      </td>
                      <td className="px-6 py-3 text-gray-500 hidden md:table-cell">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right font-medium text-gray-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Link
                          to={`/admin/orders?view=${order.id}`}
                          className="text-green-700 hover:text-green-800 font-medium"
                        >
                          <Eye className="w-4 h-4 inline" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Low Stock</h2>
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
              {lowStockProducts.length} items
            </span>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">All stocked up!</p>
              <p className="text-sm mt-1">No products running low.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {lowStockProducts.map((product) => (
                <li
                  key={product.id}
                  className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-red-600 font-medium">
                        {product.stockCount ?? 0} left
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRestock(product.id)}
                    className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Restock
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
