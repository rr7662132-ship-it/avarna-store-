import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  ShoppingBag,
  LogIn,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';
import { Order } from '../types';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '../utils/format';
import Layout from '../components/layout/Layout';
import EmptyState from '../components/common/EmptyState';

const OrdersPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { orders } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const toggleOrder = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const getPaymentMethodLabel = (method: string): string => {
    switch (method) {
      case 'cod':
        return 'Cash on Delivery';
      case 'upi':
        return 'UPI';
      case 'card':
        return 'Credit/Debit Card';
      default:
        return method;
    }
  };

  const getTimelineIcon = (status: string, completed: boolean) => {
    const iconClass = completed ? 'text-green-600' : 'text-gray-300';
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className={`w-5 h-5 ${iconClass}`} />;
      case 'processing':
        return <Package className={`w-5 h-5 ${iconClass}`} />;
      case 'shipped':
        return <Truck className={`w-5 h-5 ${iconClass}`} />;
      case 'delivered':
        return <PackageCheck className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <Clock className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyState
            icon={LogIn}
            title="Login to view your orders"
            description="Please sign in to your account to view your order history and track your deliveries."
            actionLabel="Login"
            onAction={() => window.location.assign('/login?redirect=/orders')}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-gray-500">
            {sortedOrders.length} {sortedOrders.length === 1 ? 'order' : 'orders'} placed
          </p>
        </div>

        {sortedOrders.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No orders yet"
            description="You haven't placed any orders yet. Start shopping to see your orders here!"
            actionLabel="Browse Plants"
            onAction={() => window.location.assign('/shop')}
          />
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const statusColor = getStatusColor(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  {/* Order Header - Clickable */}
                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="text-sm font-mono font-semibold text-gray-900">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span>{formatDate(order.createdAt)}</span>
                        <span>•</span>
                        <span>
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-5 sm:px-6 py-5 space-y-6 animate-in slide-in-from-top-2">
                      {/* Order Items */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Package className="w-4 h-4 text-green-600" />
                          Ordered Items
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={item.productId || idx} className="flex items-center gap-3">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <Link
                                  to={`/product/${item.productId}`}
                                  className="text-sm font-medium text-gray-900 hover:text-green-700 transition-colors"
                                >
                                  {item.productName}
                                </Link>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Qty: {item.quantity} × {formatPrice(item.price)}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      {order.address && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-600" />
                            Delivery Address
                          </h4>
                          <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            <p className="font-medium text-gray-900">{order.address.name}</p>
                            <p>
                              {order.address.addressLine1}
                              {order.address.addressLine2 && `, ${order.address.addressLine2}`}
                            </p>
                            <p>
                              {order.address.city}, {order.address.state} -{' '}
                              {order.address.pincode}
                            </p>
                            <p className="mt-1 text-gray-500">Phone: {order.address.phone}</p>
                          </div>
                        </div>
                      )}

                      {/* Payment Method */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-green-600" />
                          Payment Method
                        </h4>
                        <p className="text-sm text-gray-600">
                          {getPaymentMethodLabel(order.paymentMethod)}
                        </p>
                      </div>

                      {/* Order Timeline */}
                      {order.timeline && order.timeline.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            Order Status
                          </h4>
                          <div className="relative">
                            {order.timeline.map((step, index) => (
                              <div key={step.status} className="flex items-start gap-3 pb-4 last:pb-0">
                                {/* Connector Line */}
                                <div className="relative flex flex-col items-center">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                      step.completed
                                        ? 'bg-green-100'
                                        : 'bg-gray-100'
                                    }`}
                                  >
                                    {getTimelineIcon(step.status, step.completed)}
                                  </div>
                                  {index < order.timeline!.length - 1 && (
                                    <div
                                      className={`w-0.5 h-6 mt-1 ${
                                        step.completed ? 'bg-green-300' : 'bg-gray-200'
                                      }`}
                                    />
                                  )}
                                </div>
                                <div className="pt-1">
                                  <p
                                    className={`text-sm font-medium ${
                                      step.completed ? 'text-gray-900' : 'text-gray-400'
                                    }`}
                                  >
                                    {step.label}
                                  </p>
                                  {step.timestamp && step.completed && (
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      {formatDate(step.timestamp)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* View Details Link */}
                      <div className="pt-2 border-t border-gray-100">
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                        >
                          View Full Details →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
