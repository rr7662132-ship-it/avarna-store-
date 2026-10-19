import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import {
  User, Mail, Phone, MapPin, Edit3, Trash2, Star, Plus,
  Package, Heart, LogOut, Save, X, Check, ChevronRight
} from 'lucide-react';

interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const ADDRESSES_KEY = 'avarna_addresses';

const emptyAddress: Omit<Address, 'id' | 'isDefault'> = {
  name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '',
};

const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' });

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  // Load addresses from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADDRESSES_KEY);
      if (stored) {
        setAddresses(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save addresses to localStorage
  const saveAddresses = useCallback((newAddresses: Address[]) => {
    setAddresses(newAddresses);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(newAddresses));
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleEditProfile = () => {
    setEditForm({ name: user.name, email: user.email, phone: (user as { phone?: string }).phone || '' });
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (editForm.name.trim().length < 2) return;
    if (updateProfile) {
      updateProfile({ name: editForm.name.trim(), email: editForm.email.trim(), phone: editForm.phone.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Address helpers
  const validateAddress = (): boolean => {
    const errs: Record<string, string> = {};
    if (!addressForm.name.trim()) errs.name = 'Name is required';
    if (!addressForm.phone.trim()) errs.phone = 'Phone is required';
    if (!addressForm.line1.trim()) errs.line1 = 'Address line 1 is required';
    if (!addressForm.city.trim()) errs.city = 'City is required';
    if (!addressForm.state.trim()) errs.state = 'State is required';
    if (!addressForm.pincode.trim()) errs.pincode = 'Pincode is required';
    setAddressErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveAddress = () => {
    if (!validateAddress()) return;

    if (editingAddressId) {
      const updated = addresses.map((a) =>
        a.id === editingAddressId ? { ...a, ...addressForm } : a
      );
      saveAddresses(updated);
    } else {
      const newAddr: Address = {
        ...addressForm,
        id: Date.now().toString(),
        isDefault: addresses.length === 0,
      };
      saveAddresses([...addresses, newAddr]);
    }

    setShowAddressForm(false);
    setEditingAddressId(null);
    setAddressForm(emptyAddress);
    setAddressErrors({});
  };

  const handleEditAddress = (addr: Address) => {
    setAddressForm({
      name: addr.name, phone: addr.phone, line1: addr.line1,
      line2: addr.line2, city: addr.city, state: addr.state, pincode: addr.pincode,
    });
    setEditingAddressId(addr.id);
    setShowAddressForm(true);
    setAddressErrors({});
  };

  const handleDeleteAddress = (id: string) => {
    const filtered = addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    saveAddresses(filtered);
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    saveAddresses(updated);
  };

  const handleCancelAddress = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
    setAddressForm(emptyAddress);
    setAddressErrors({});
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 animate-fade-in">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-slide-up">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {initials}
                  </div>
                  {!isEditing && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {user.email}
                      </p>
                      {(user as { phone?: string }).phone && (
                        <p className="text-gray-500 text-sm flex items-center gap-1 mt-0.5">
                          <Phone className="w-3.5 h-3.5" />
                          {(user as { phone?: string }).phone}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {!isEditing && (
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-800 font-medium hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              {/* Inline Edit Form */}
              {isEditing && (
                <div className="space-y-4 animate-slide-up">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Addresses Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-700" />
                  Delivery Addresses
                </h3>
                {!showAddressForm && (
                  <button
                    onClick={() => { setShowAddressForm(true); setEditingAddressId(null); setAddressForm(emptyAddress); }}
                    className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-800 font-medium hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Address
                  </button>
                )}
              </div>

              {/* Address Form */}
              {showAddressForm && (
                <div className="mb-6 p-5 bg-green-50/50 border border-green-100 rounded-xl space-y-4 animate-slide-up">
                  <h4 className="font-semibold text-gray-800">
                    {editingAddressId ? 'Edit Address' : 'Add New Address'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={addressForm.name}
                        onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                        placeholder="Recipient name"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm text-gray-900 ${addressErrors.name ? 'border-red-400' : 'border-gray-300'}`}
                      />
                      {addressErrors.name && <p className="text-xs text-red-600 mt-1">{addressErrors.name}</p>}
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        placeholder="Phone number"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm text-gray-900 ${addressErrors.phone ? 'border-red-400' : 'border-gray-300'}`}
                      />
                      {addressErrors.phone && <p className="text-xs text-red-600 mt-1">{addressErrors.phone}</p>}
                    </div>
                  </div>
                  {/* Line 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                    <input
                      type="text"
                      value={addressForm.line1}
                      onChange={(e) => setAddressForm({ ...addressForm, line1: e.target.value })}
                      placeholder="House/Flat No., Street"
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm text-gray-900 ${addressErrors.line1 ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {addressErrors.line1 && <p className="text-xs text-red-600 mt-1">{addressErrors.line1}</p>}
                  </div>
                  {/* Line 2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                    <input
                      type="text"
                      value={addressForm.line2}
                      onChange={(e) => setAddressForm({ ...addressForm, line2: e.target.value })}
                      placeholder="Landmark, Area (optional)"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        placeholder="City"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm text-gray-900 ${addressErrors.city ? 'border-red-400' : 'border-gray-300'}`}
                      />
                      {addressErrors.city && <p className="text-xs text-red-600 mt-1">{addressErrors.city}</p>}
                    </div>
                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input
                        type="text"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        placeholder="State"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm text-gray-900 ${addressErrors.state ? 'border-red-400' : 'border-gray-300'}`}
                      />
                      {addressErrors.state && <p className="text-xs text-red-600 mt-1">{addressErrors.state}</p>}
                    </div>
                    {/* Pincode */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                      <input
                        type="text"
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        placeholder="Pincode"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm text-gray-900 ${addressErrors.pincode ? 'border-red-400' : 'border-gray-300'}`}
                      />
                      {addressErrors.pincode && <p className="text-xs text-red-600 mt-1">{addressErrors.pincode}</p>}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSaveAddress}
                      className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      {editingAddressId ? 'Update Address' : 'Save Address'}
                    </button>
                    <button
                      onClick={handleCancelAddress}
                      className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Address List */}
              {addresses.length === 0 && !showAddressForm ? (
                <div className="text-center py-8 text-gray-400">
                  <MapPin className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No saved addresses yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-4 rounded-xl border transition-colors ${
                        addr.isDefault
                          ? 'border-green-300 bg-green-50/50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{addr.name}</span>
                            {addr.isDefault && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{addr.line1}</p>
                          {addr.line2 && <p className="text-sm text-gray-600">{addr.line2}</p>}
                          <p className="text-sm text-gray-600">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">📞 {addr.phone}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!addr.isDefault && (
                            <button
                              onClick={() => handleSetDefault(addr.id)}
                              title="Set as default"
                              className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            >
                              <Star className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleEditAddress(addr)}
                            title="Edit address"
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            title="Delete address"
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Quick Links */}
          <div className="space-y-6 animate-slide-up">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Links</h3>
              <nav className="space-y-1">
                <Link
                  to="/orders"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <Package className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    My Orders
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 transition-colors" />
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <Heart className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    My Wishlist
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 transition-colors" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors group"
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                    Logout
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-colors" />
                </button>
              </nav>
            </div>

            {/* Account Info */}
            <div className="bg-gradient-to-br from-green-700 to-emerald-800 rounded-2xl p-5 text-white">
              <h4 className="font-semibold mb-2">🌿 AVARNA Member</h4>
              <p className="text-green-100 text-sm leading-relaxed">
                Thank you for being part of the AVARNA community. We're dedicated to bringing nature closer to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
