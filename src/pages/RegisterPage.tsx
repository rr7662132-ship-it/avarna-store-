import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Mail, Lock, Eye, EyeOff, User, Phone, Leaf, UserPlus, Check } from 'lucide-react';

const getPasswordStrength = (password: string): { level: number; label: string; color: string } => {
  if (!password) return { level: 0, label: '', color: '' };

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-red-500' };
  if (score <= 2) return { level: 2, label: 'Fair', color: 'bg-orange-500' };
  if (score <= 3) return { level: 3, label: 'Good', color: 'bg-yellow-500' };
  if (score <= 4) return { level: 4, label: 'Strong', color: 'bg-green-500' };
  return { level: 5, label: 'Excellent', color: 'bg-emerald-600' };
};

const RegisterPage: React.FC = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setGeneralError('');
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await register(formData.name.trim(), formData.email.trim(), formData.password);
      if (result) {
        setSuccess(true);
        setTimeout(() => navigate('/', { replace: true }), 1500);
      } else {
        setGeneralError('Registration failed. This email may already be in use.');
      }
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (user && !success) return null;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex">
        {/* Left Column - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-md animate-fade-in">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-800 tracking-tight">AVARNA</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500 mb-8">Join the AVARNA community</p>

            {/* Success */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2 animate-slide-up">
                <Check className="w-5 h-5 flex-shrink-0" />
                Account created successfully! Redirecting...
              </div>
            )}

            {/* Error */}
            {generalError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-slide-up">
                {generalError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your full name"
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-900 placeholder-gray-400 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="reg-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-900 placeholder-gray-400 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Minimum 6 characters"
                    className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-900 placeholder-gray-400 ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                {/* Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            i <= passwordStrength.level ? passwordStrength.color : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${
                      passwordStrength.level <= 1 ? 'text-red-600' :
                      passwordStrength.level <= 2 ? 'text-orange-600' :
                      passwordStrength.level <= 3 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {passwordStrength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter your password"
                    className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-900 placeholder-gray-400 ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => { setAcceptTerms(e.target.checked); setErrors((prev) => { const n = { ...prev }; delete n.terms; return n; }); }}
                    className="w-4 h-4 mt-0.5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <span className="text-green-700 hover:underline cursor-pointer font-medium">Terms of Service</span>{' '}
                    and{' '}
                    <span className="text-green-700 hover:underline cursor-pointer font-medium">Privacy Policy</span>
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-700 hover:text-green-800 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80"
            alt="Lush green plants"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-green-800/50 to-teal-900/70" />
          <div className="relative h-full flex flex-col items-center justify-center px-12 text-center">
            <div className="animate-slide-up">
              <Leaf className="w-16 h-16 text-green-300 mx-auto mb-6 opacity-80" />
              <blockquote className="text-2xl font-light text-white leading-relaxed mb-4">
                "The earth laughs in flowers."
              </blockquote>
              <cite className="text-green-200 text-sm font-medium">— Ralph Waldo Emerson</cite>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
