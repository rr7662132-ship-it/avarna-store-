import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  ArrowRight,
  CreditCard,
  Shield,
} from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const customerLinks = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Shipping Info', path: '/shipping' },
  { label: 'Returns & Refunds', path: '/returns' },
  { label: 'Plant Care Guide', path: '/care-guide' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-forest-900 text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="group inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-500 transition-colors group-hover:bg-forest-400">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">AVARNA</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Bringing nature closer to you. Premium indoor and outdoor plants, curated with love
              and delivered with care to transform your spaces.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 text-gray-400 transition-all hover:bg-forest-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Customer Service */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-3">
              {customerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-gray-400">
              Subscribe for plant care tips, exclusive offers & new arrivals.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex overflow-hidden rounded-full border border-forest-700 bg-forest-800 focus-within:border-forest-500 focus-within:ring-1 focus-within:ring-forest-500">
                <div className="flex items-center pl-3 text-gray-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center bg-forest-600 px-4 text-white transition-colors hover:bg-forest-500"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs font-medium text-emerald-400">
                ✓ Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-forest-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AVARNA Plant Store. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <CreditCard className="h-4 w-4" />
              <span className="text-xs">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Shield className="h-4 w-4" />
              <span className="text-xs">SSL Encrypted</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-xs text-gray-500 transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-xs text-gray-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
