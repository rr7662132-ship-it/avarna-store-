import React, { useState, useMemo } from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { useProducts } from '../../contexts/ProductContext';
import { Order, OrderStatus } from '../../types';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '../../utils/format';
import {
  Filter,
  Eye,
  X,
  ShoppingCart,
  MapPin,
  CreditCard,
  Package,
  ChevronDown,
  ChevronUp,
  Save,
  Truck,
} from 'lucide-react';

const orderStatuses: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'out-for-delivery',
  'delivered',
  'cancelled',
];

const OrderManager: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { products } = useProducts();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [statusUpdates, setStatusUpdates] = useState<Record<string, OrderStatus>>({});

  // Filter orders
  const filteredOrders = useMemo(() => {
    const sorted = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (statusFilter === 'all') return sorted;
    return sorted.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleStatusSave = (orderId: string) => {
    const newStatus = statusUpdates[orderId];
    if (newStatus) {
      updateOrderStatus(orderId, newStatus);
      setStatusUpdates((prev) => {
        const next = { ...prev };
        delete next[orderId];
        return next;
      });
    }
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getProductById = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>
          <p className="text-sm text-gray-500 mt-1">{filteredOrders.length} orders</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm appearance-none bg-white min-w-[200px]"
          >
            <option value="all">All Statuses</option>
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {getStatusLabel(status)}
              </option>
            ))}
          </select>
        </div>

        {/* Status summary badges */}
        <div className="flex flex-wrap gap-2">
          {orderStatuses.map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            if (count === 0) return null;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status === statusFilter ? 'all' : status)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  status === statusFilter
                    ? 'ring-2 ring-green-500 ring-offset-1'
                    : ''
                } ${getStatusColor(status)}`}
              >
                {getStatusLabel(status)}
                <span className="bg-white/50 px-1.5 py-0.5 rounded-full text-[10px]">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {statusFilter === 'all'
              ? 'No orders have been placed yet.'
              : `No orders with status "${getStatusLabel(statusFilter as OrderStatus)}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 font-medium">Order ID</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Items</th>
                    <th className="px-6 py-3 font-medium text-right">Total</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Payment</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredOrders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-gray-600">
                          #{order.id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {order.address?.name || order.shippingAddress?.name || 'Customer'}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                          {formatPrice(order.total)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={statusUpdates[order.id] || order.status}
                              onChange={(e) =>
                                handleStatusChange(order.id, e.target.value as OrderStatus)
                              }
                              className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
                            >
                              {orderStatuses.map((status) => (
                                <option key={status} value={status}>
                                  {getStatusLabel(status)}
                                </option>
                              ))}
                            </select>
                            {statusUpdates[order.id] && statusUpdates[order.id] !== order.status && (
                              <button
                                onClick={() => handleStatusSave(order.id)}
                                className="text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 p-1 rounded transition-colors"
                                title="Save status"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.paymentStatus === 'completed' || order.paymentStatus === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : order.paymentStatus === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.paymentStatus || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => toggleExpand(order.id)}
                            className="inline-flex items-center gap-1 text-green-700 hover:text-green-800 text-xs font-medium bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            {expandedOrder === order.id ? 'Hide' : 'View'}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Detail Row */}
                      {expandedOrder === order.id && (
                        <tr>
                          <td colSpan={8} className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <OrderDetail
                              order={order}
                              getProductById={getProductById}
                              onClose={() => setExpandedOrder(null)}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-mono text-xs text-gray-500">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
                      <p className="font-medium text-gray-900 mt-1">
                        {order.address?.name || order.shippingAddress?.name || 'Customer'}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{formatDate(order.createdAt)}</span>
                    <span className="font-semibold text-gray-900">{formatPrice(order.total)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-gray-500">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span
                      className={`text-xs font-medium ${
                        order.paymentStatus === 'completed' || order.paymentStatus === 'paid'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {order.paymentStatus || 'pending'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <select
                      value={statusUpdates[order.id] || order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className="flex-1 text-xs border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-green-500 outline-none bg-white"
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {getStatusLabel(status)}
                        </option>
                      ))}
                    </select>
                    {statusUpdates[order.id] && statusUpdates[order.id] !== order.status && (
                      <button
                        onClick={() => handleStatusSave(order.id)}
                        className="text-green-700 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors text-xs font-medium"
                      >
                        Save
                      </button>
                    )}
                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="text-green-700 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors text-xs font-medium"
                    >
                      {expandedOrder === order.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Mobile expanded details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-gray-100 bg-gray-50 p-4">
                    <OrderDetail
                      order={order}
                      getProductById={getProductById}
                      onClose={() => setExpandedOrder(null)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Order Detail Component
interface OrderDetailProps {
  order: Order;
  getProductById: (id: string) => any;
  onClose: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, getProductById, onClose }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Package className="w-4 h-4" />
          Order Details
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Items */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Items</h4>
        <div className="space-y-2">
          {order.items.map((item, index) => {
            const product = getProductById(item.productId);
            return (
              <div
                key={index}
                className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100"
              >
                <img
                  src={product?.image || item.productImage || item.image || 'https://via.placeholder.com/48'}
                  alt={item.productName || item.name || 'Plant'}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.productName || item.name || 'Plant'}
                  </p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shipping Address */}
        {(order.address || order.shippingAddress) && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Shipping Address
            </h4>
            <div className="bg-white p-3 rounded-lg border border-gray-100 text-sm text-gray-600">
              <p className="font-medium text-gray-900">
                {order.address?.name || order.shippingAddress?.name}
              </p>
              <p>{order.address?.addressLine1 || order.shippingAddress?.addressLine1}</p>
              {(order.address?.addressLine2 || order.shippingAddress?.addressLine2) && (
                <p>{order.address?.addressLine2 || order.shippingAddress?.addressLine2}</p>
              )}
              <p>
                {order.address?.city || order.shippingAddress?.city},{' '}
                {order.address?.state || order.shippingAddress?.state}{' '}
                {order.address?.pincode || order.shippingAddress?.pincode}
              </p>
              {(order.address?.phone || order.shippingAddress?.phone) && (
                <p>Phone: {order.address?.phone || order.shippingAddress?.phone}</p>
              )}
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <CreditCard className="w-4 h-4" /> Price Breakdown
          </h4>
          <div className="bg-white p-3 rounded-lg border border-gray-100 text-sm space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal || order.total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>
                {(order.shippingCost ?? order.shipping) === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  formatPrice(order.shippingCost ?? order.shipping ?? 0)
                )}
              </span>
            </div>
            {order.discount !== undefined && order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Truck className="w-4 h-4" />
        <span>
          Order placed on {formatDate(order.createdAt)}
          {order.updatedAt && ` • Last updated ${formatDate(order.updatedAt)}`}
        </span>
      </div>
    </div>
  );
};

export default OrderManager;
