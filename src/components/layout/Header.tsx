import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Leaf,
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  UserCircle,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import SearchBar from '../common/SearchBar';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
];

const categories = [
  { label: 'Indoor Plants', path: '/shop?category=indoor' },
  { label: 'Outdoor Plants', path: '/shop?category=outdoor' },
  { label: 'Flowering Plants', path: '/shop?category=flowering' },
  { label: 'Succulents & Cacti', path: '/shop?category=succulents' },
  { label: 'Air-Purifying Plants', path: '/shop?category=air-purifying' },
  { label: 'Low-Maintenance', path: '/shop?category=low-maintenance' },
  { label: 'Pots & Accessories', path: '/shop?category=pots-accessories' },
];

const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount: cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const wishlistCount = wishlistItems.length;

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Click-outside handlers
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-600 transition-colors group-hover:bg-forest-700">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold tracking-wide text-forest-900 lg:text-2xl">
                AVARNA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-gray-600 hover:bg-forest-50 hover:text-forest-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Categories Dropdown */}
              <div ref={categoriesRef} className="relative">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    categoriesOpen
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-gray-600 hover:bg-forest-50 hover:text-forest-700'
                  }`}
                >
                  Categories
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      categoriesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {categoriesOpen && (
                  <div className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg animate-in fade-in slide-in-from-top-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.path}
                        to={cat.path}
                        onClick={() => setCategoriesOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive('/about')
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-gray-600 hover:bg-forest-50 hover:text-forest-700'
                }`}
              >
                About
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="rounded-full p-2 text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-forest-600 text-[10px] font-bold text-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div ref={userMenuRef} className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`rounded-full p-2 transition-colors ${
                    userMenuOpen
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-gray-600 hover:bg-forest-50 hover:text-forest-700'
                  }`}
                  aria-label="User menu"
                >
                  <User className="h-5 w-5" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg animate-in fade-in slide-in-from-top-2">
                    {user ? (
                      <>
                        <div className="border-b border-gray-100 px-4 py-3">
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          to="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                        >
                          <UserCircle className="h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                        >
                          <Package className="h-4 w-4" />
                          Orders
                        </Link>
                        <div className="border-t border-gray-100 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-full p-2 text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search Bar (expandable) */}
          {searchOpen && (
            <div className="border-t border-gray-100 py-3">
              <SearchBar onClose={() => setSearchOpen(false)} />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-600">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-forest-900">AVARNA</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {user && (
              <div className="mb-4 rounded-xl bg-forest-50 px-4 py-3">
                <p className="text-sm font-semibold text-forest-900">{user.name}</p>
                <p className="text-xs text-forest-600">{user.email}</p>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="py-1">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Categories
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    categoriesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {categoriesOpen && (
                <div className="ml-4 space-y-0.5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:bg-forest-50 hover:text-forest-700"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'bg-forest-50 text-forest-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              About
            </Link>

            <div className="my-3 border-t border-gray-100" />

            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Package className="h-4 w-4" />
                  Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
