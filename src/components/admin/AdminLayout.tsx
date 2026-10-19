import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FolderTree,
  Store,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  Leaf,
  ShieldAlert,
  Home,
} from 'lucide-react';

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package, end: false },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart, end: false },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree, end: false },
];

const AdminLayout: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Access denied if not admin
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You do not have permission to access the admin dashboard. Please contact an administrator
            if you believe this is an error.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-green-950 text-white flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-green-800">
          <div className="flex items-center gap-2">
            <Leaf className="w-7 h-7 text-green-400" />
            <div>
              <span className="text-lg font-bold tracking-wide">AVARNA</span>
              <span className="block text-xs text-green-400 -mt-1">Admin Panel</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-green-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-800 text-white shadow-md'
                    : 'text-green-200 hover:bg-green-900 hover:text-white'
                }`
              }
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-green-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-green-200 hover:bg-green-900 hover:text-white transition-colors"
          >
            <Store className="w-5 h-5 flex-shrink-0" />
            Back to Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-green-200 hover:bg-red-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            {/* Left: Hamburger + Breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <nav className="hidden sm:flex items-center gap-1 text-sm text-gray-500">
                <Link to="/admin" className="hover:text-green-700 transition-colors">
                  Admin
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Dashboard</span>
              </nav>
            </div>

            {/* Right: Notification + User */}
            <div className="flex items-center gap-4">
              <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 bg-green-800 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="hidden sm:flex text-gray-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
