import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Plus,
  AlertTriangle,
  Truck,
  Package,
  Banknote,
  Smartphone,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';
import { Address } from '../types';
import { formatPrice, generateId } from '../utils/format';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/storage';
import Layout from '../components/layout/Layout';

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;
const TAX_RATE = 0.05;

interface AddressFormData {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const initialAddressForm: AddressFormData = {
  name: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

const steps = [
  { id: 1, label: 'Address', icon: MapPin },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Confirmation', icon: CheckCircle2 },
];

const CheckoutPage: React.FC = () => {
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressFormData>(initialAddressForm);
  const [saveAddress, setSaveAddress] = useState(true);
  const [formErrors, setFormErrors] = useState<Partial<AddressFormData>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [orderId, setOrderId] = useState<string>('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    }
  }, [isAuthenticated, navigate]);

  // Redirect if cart is empty (but not on confirmation step)
  useEffect(() => {
    if (items.length === 0 && currentStep !== 3) {
      navigate('/cart');
    }
  }, [items.length, currentStep, navigate]);

  // Load saved addresses
  useEffect(() => {
    const addresses = loadFromStorage<Address[]>(STORAGE_KEYS.ADDRESSES, []);
    setSavedAddresses(addresses);
    if (addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    } else {
      setShowNewAddressForm(true);
    }
  }, []);

  const validateAddressForm = (): boolean => {
    const errors: Partial<AddressFormData> = {};
    if (!addressForm.name.trim()) errors.name = 'Name is required';
    if (!addressForm.phone.trim()) errors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(addressForm.phone.trim())) errors.phone = 'Enter valid 10-digit phone';
    if (!addressForm.addressLine1.trim()) errors.addressLine1 = 'Address is required';
    if (!addressForm.city.trim()) errors.city = 'City is required';
    if (!addressForm.state.trim()) errors.state = 'State is required';
    if (!addressForm.pincode.trim()) errors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(addressForm.pincode.trim())) errors.pincode = 'Enter valid 6-digit pincode';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressFormChange = (field: keyof AddressFormData, value: string) => {
    setAddressForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddNewAddress = () => {
    if (!validateAddressForm()) return;

    const newAddress: Address = {
      id: generateId(),
      userId: user?.id || 'guest',
      ...addressForm,
      isDefault: savedAddresses.length === 0,
    };

    const updatedAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(updatedAddresses);
    setSelectedAddressId(newAddress.id);
    setShowNewAddressForm(false);
    setAddressForm(initialAddressForm);

    if (saveAddress) {
      saveToStorage(STORAGE_KEYS.ADDRESSES, updatedAddresses);
    }
  };

  const handleNextFromAddress = () => {
    if (showNewAddressForm) {
      if (!validateAddressForm()) return;
      handleAddNewAddress();
    }
    if (!selectedAddressId && !showNewAddressForm) {
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId);
    const newOrderId = generateId();

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const created = createOrder(items, selectedAddress!, paymentMethod);
    setOrderId(created.id);
    clearCart();
    setIsPlacingOrder(false);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getEstimatedDelivery = (): string => {
    const today = new Date();
    const deliveryStart = new Date(today);
    const deliveryEnd = new Date(today);
    let businessDaysAdded = 0;

    while (businessDaysAdded < 5) {
      deliveryStart.setDate(deliveryStart.getDate() + 1);
      if (deliveryStart.getDay() !== 0 && deliveryStart.getDay() !== 6) {
        businessDaysAdded++;
      }
    }
    businessDaysAdded = 0;
    while (businessDaysAdded < 7) {
      deliveryEnd.setDate(deliveryEnd.getDate() + 1);
      if (deliveryEnd.getDay() !== 0 && deliveryEnd.getDay() !== 6) {
        businessDaysAdded++;
      }
    }

    const formatDate = (d: Date) =>
      d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

    return `${formatDate(deliveryStart)} - ${formatDate(deliveryEnd)}`;
  };

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep > step.id
                        ? 'bg-green-700 border-green-700 text-white'
                        : currentStep === step.id
                        ? 'bg-green-50 border-green-700 text-green-700'
                        : 'bg-gray-50 border-gray-300 text-gray-400'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium hidden sm:block ${
                      currentStep >= step.id ? 'text-green-800' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-green-700' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className={`${currentStep === 3 ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>

                {/* Saved Addresses */}
                {savedAddresses.length > 0 && !showNewAddressForm && (
                  <div className="space-y-3">
                    {savedAddresses.map((address) => (
                      <label
                        key={address.id}
                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedAddressId === address.id
                            ? 'border-green-600 bg-green-50/50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressId === address.id}
                            onChange={() => setSelectedAddressId(address.id)}
                            className="mt-1 w-4 h-4 text-green-700 focus:ring-green-600"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{address.name}</p>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {address.addressLine1}
                              {address.addressLine2 && `, ${address.addressLine2}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Phone: {address.phone}</p>
                          </div>
                        </div>
                      </label>
                    ))}

                    <button
                      onClick={() => setShowNewAddressForm(true)}
                      className="flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors mt-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Address
                    </button>
                  </div>
                )}

                {/* New Address Form */}
                {showNewAddressForm && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-5">
                      {savedAddresses.length > 0 ? 'Add New Address' : 'Enter Delivery Address'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={addressForm.name}
                          onChange={(e) => handleAddressFormChange('name', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          } focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
                          placeholder="John Doe"
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={addressForm.phone}
                          onChange={(e) => handleAddressFormChange('phone', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          } focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
                          placeholder="9876543210"
                          maxLength={10}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>
                        )}
                      </div>

                      {/* Address Line 1 */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={addressForm.addressLine1}
                          onChange={(e) => handleAddressFormChange('addressLine1', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            formErrors.addressLine1 ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          } focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
                          placeholder="House no., Building, Street"
                        />
                        {formErrors.addressLine1 && (
                          <p className="mt-1 text-xs text-red-500">{formErrors.addressLine1}</p>
                        )}
                      </div>

                      {/* Address Line 2 */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          value={addressForm.addressLine2}
                          onChange={(e) => handleAddressFormChange('addressLine2', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                          placeholder="Landmark, Area (optional)"
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) => handleAddressFormChange('city', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            formErrors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          } focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
                          placeholder="Mumbai"
                        />
                        {formErrors.city && (
                          <p className="mt-1 text-xs text-red-500">{formErrors.city}</p>
                        )}
                      </div>

                      {/* State */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={addressForm.state}
                          onChange={(e) => handleAddressFormChange('state', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            formErrors.state ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          } focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
                          placeholder="Maharashtra"
                        />
                        {formErrors.state && (
                          <p className="mt-1 text-xs text-red-500">{formErrors.state}</p>
                        )}
                      </div>

                      {/* Pincode */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={addressForm.pincode}
                          onChange={(e) => handleAddressFormChange('pincode', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            formErrors.pincode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          } focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
                          placeholder="400001"
                          maxLength={6}
                        />
                        {formErrors.pincode && (
                          <p className="mt-1 text-xs text-red-500">{formErrors.pincode}</p>
                        )}
                      </div>

                      {/* Save Address Checkbox */}
                      <div className="sm:col-span-2">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={saveAddress}
                            onChange={(e) => setSaveAddress(e.target.checked)}
                            className="w-4 h-4 rounded text-green-700 focus:ring-green-600"
                          />
                          <span className="text-sm text-gray-600">
                            Save this address for future orders
                          </span>
                        </label>
                      </div>
                    </div>

                    {savedAddresses.length > 0 && (
                      <button
                        onClick={() => {
                          setShowNewAddressForm(false);
                          setFormErrors({});
                        }}
                        className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        ← Back to saved addresses
                      </button>
                    )}
                  </div>
                )}

                {/* Next Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleNextFromAddress}
                    className="bg-green-800 hover:bg-green-900 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-green-800/20 flex items-center gap-2"
                  >
                    Continue to Payment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                </div>

                {/* Demo Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Demo Checkout</p>
                    <p className="text-sm text-amber-700 mt-0.5">
                      This is a demo checkout. No real payment will be processed. Select any payment
                      method to simulate an order.
                    </p>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'cod'
                        ? 'border-green-600 bg-green-50/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-green-700 focus:ring-green-600"
                      />
                      <Banknote className="w-5 h-5 text-green-700" />
                      <div>
                        <p className="font-semibold text-gray-900">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                    </div>
                  </label>

                  {/* UPI */}
                  <label
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'upi'
                        ? 'border-green-600 bg-green-50/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-green-700 focus:ring-green-600"
                      />
                      <Smartphone className="w-5 h-5 text-purple-600" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">UPI</p>
                        <p className="text-sm text-gray-500">
                          Google Pay, PhonePe, Paytm & more
                        </p>
                      </div>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="mt-3 ml-7 p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <p className="text-sm text-purple-700 italic">
                          🔜 Payment gateway integration coming soon. Order will be placed as COD.
                        </p>
                      </div>
                    )}
                  </label>

                  {/* Card */}
                  <label
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'card'
                        ? 'border-green-600 bg-green-50/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-green-700 focus:ring-green-600"
                      />
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Credit / Debit Card</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="mt-3 ml-7 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-700 italic">
                          🔜 Payment gateway integration coming soon. Order will be placed as COD.
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Place Order */}
                <div className="flex justify-end">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="bg-green-800 hover:bg-green-900 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-green-800/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isPlacingOrder ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        Place Order • {formatPrice(total)}
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="max-w-2xl mx-auto text-center py-8">
                {/* Success Animation */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 animate-bounce">
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-10 h-10 text-white" strokeWidth={3} />
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Order Placed Successfully! 🎉
                </h2>
                <p className="text-gray-500 mb-6">
                  Thank you for shopping with Avarna Plant Store
                </p>

                {/* Order Info Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </p>
                      <p className="mt-1 text-sm font-mono font-semibold text-gray-900">
                        #{orderId.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Date
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {new Date().toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Method
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {paymentMethod === 'cod'
                          ? 'Cash on Delivery'
                          : paymentMethod === 'upi'
                          ? 'UPI'
                          : 'Card'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Amount
                      </p>
                      <p className="mt-1 text-sm font-bold text-green-700">{formatPrice(total)}</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4 text-green-600" />
                      <span>
                        Estimated delivery:{' '}
                        <span className="font-semibold text-gray-900">5-7 business days</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/orders"
                    className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-green-800/20"
                  >
                    <Package className="w-4 h-4" />
                    Track Order
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-200 transition-all duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar (Steps 1 & 2) */}
          {currentStep < 3 && (
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

                {/* Items Preview */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => {
                    const itemId = item.id || item.productId || item.product?.id || '';
                    const itemName = item.name || item.product?.name || 'Plant';
                    const itemImage = item.image || item.product?.image || '';
                    const itemPrice = item.price ?? item.product?.price ?? 0;

                    return (
                      <div key={itemId} className="flex items-center gap-3">
                        <img
                          src={itemImage}
                          alt={itemName}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900 truncate">{itemName}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} × {formatPrice(itemPrice)}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-gray-900 flex-shrink-0">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="font-medium text-green-600">FREE</span>
                    ) : (
                      <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-green-800 text-lg">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
