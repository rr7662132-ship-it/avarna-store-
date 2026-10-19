import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  PackageCheck,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useOrders } from '../contexts/OrderContext';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '../utils/format';
import Layout from '../components/layout/Layout';
import EmptyState from '../components/common/EmptyState';

const FREE_SHIPPING_THRESHOLD = 999;

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useOrders();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyState
            icon={AlertCircle}
            title="Order Not Found"
            description="We couldn't find the order you're looking for. It may have been removed or the link is incorrect."
            actionLabel="Back to Orders"
            onAction={() => window.location.assign('/orders')}
          />
        </div>
      </Layout>
    );
  }

  const statusColor = getStatusColor(order.status);

  const getTimelineIcon = (status: string, completed: boolean) => {
    const baseClass = 'w-6 h-6';
    const colorClass = completed ? 'text-white' : 'text-gray-400';
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className={`${baseClass} ${colorClass}`} />;
      case 'processing':
        return <Package className={`${baseClass} ${colorClass}`} />;
      case 'shipped':
        return <Truck className={`${baseClass} ${colorClass}`} />;
      case 'delivered':
        return <PackageCheck className={`${baseClass} ${colorClass}`} />;
      default:
        return <Clock className={`${baseClass} ${colorClass}`} />;
    }
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{order.id.slice(0, 8).toUpperCase()}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <span
              className={`self-start inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold ${statusColor}`}
            >
              {getStatusLabel(order.status)}
            </span>
          </div>

          {order.estimatedDelivery && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-4 py-2.5 rounded-xl">
              <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>
                Estimated delivery:{' '}
                <span className="font-semibold text-gray-900">{order.estimatedDelivery}</span>
              </span>
            </div>
          )}
        </div>

        {/* Status Timeline */}
        {order.timeline && order.timeline.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Status</h2>

            {/* Horizontal Timeline for Desktop */}
            <div className="hidden sm:block">
              <div className="relative flex items-center justify-between">
                {/* Background Line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />

                {/* Progress Line */}
                {(() => {
                  const completedCount = order.timeline.filter((s) => s.completed).length;
                  const totalSteps = order.timeline.length;
                  const progressWidth =
                    completedCount <= 1
                      ? 0
                      : ((completedCount - 1) / (totalSteps - 1)) * 100;
                  return (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full transition-all duration-700"
                      style={{ width: `${progressWidth}%` }}
                    />
                  );
                })()}

                {order.timeline.map((step) => (
                  <div key={step.status} className="relative flex flex-col items-center z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step.completed
                          ? 'bg-green-600 shadow-lg shadow-green-600/30'
                          : 'bg-gray-100 border-2 border-gray-200'
                      }`}
                    >
                      {getTimelineIcon(step.status, step.completed)}
                    </div>
                    <p
                      className={`mt-2 text-xs font-medium text-center ${
                        step.completed ? 'text-green-800' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.timestamp && step.completed && (
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {formatDate(step.timestamp)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Timeline for Mobile */}
            <div className="sm:hidden space-y-0">
              {order.timeline.map((step, index) => (
                <div key={step.status} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed
                          ? 'bg-green-600 shadow-md shadow-green-600/20'
                          : 'bg-gray-100 border-2 border-gray-200'
                      }`}
                    >
                      {getTimelineIcon(step.status, step.completed)}
                    </div>
                    {index < order.timeline!.length - 1 && (
                      <div
                        className={`w-0.5 h-8 ${
                          step.completed ? 'bg-green-400' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="pt-2 pb-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-green-600" />
              Items ({order.items.length})
            </h2>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={item.productId || idx} className="flex items-center gap-3">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-sm font-semibold text-gray-900 hover:text-green-700 transition-colors line-clamp-1"
                    >
                      {item.productName}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment */}
          <div className="space-y-6">
            {/* Delivery Address */}
            {order.address && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Delivery Address
                </h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-900">{order.address.name}</p>
                  <p>
                    {order.address.addressLine1}
                    {order.address.addressLine2 && `, ${order.address.addressLine2}`}
                  </p>
                  <p>
                    {order.address.city}, {order.address.state} - {order.address.pincode}
                  </p>
                  <p className="text-gray-500">Phone: {order.address.phone}</p>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Payment Method
              </h2>
              <p className="text-sm text-gray-700 font-medium">
                {getPaymentMethodLabel(order.paymentMethod)}
              </p>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Price Breakdown</h2>
          <div className="space-y-3 text-sm max-w-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              {order.shipping === 0 ? (
                <span className="font-medium text-green-600">FREE</span>
              ) : (
                <span className="font-medium text-gray-900">{formatPrice(order.shipping)}</span>
              )}
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (5%)</span>
              <span className="font-medium text-gray-900">{formatPrice(order.tax)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-green-800">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6 text-center">
          <p className="text-sm text-gray-600">
            Need help with this order?{' '}
            <Link to="/contact" className="text-green-700 font-semibold hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;
