import React, { useState } from 'react';
import { Mail, Send, Leaf, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Demo only — show success toast
    setIsSubmitted(true);
    setEmail('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-700 via-forest-800 to-forest-900" />

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">🌿</div>
        <div className="absolute top-20 right-20 text-6xl">🍃</div>
        <div className="absolute bottom-10 left-1/4 text-7xl">🌱</div>
        <div className="absolute bottom-20 right-1/3 text-5xl">🪴</div>
        <div className="absolute top-1/2 left-1/2 text-9xl -translate-x-1/2 -translate-y-1/2">🌿</div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
          <Leaf className="w-8 h-8 text-forest-300" />
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Join the Green Community
        </h2>

        {/* Subtitle */}
        <p className="text-cream-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Get plant care tips, exclusive offers, and new arrival updates delivered
          straight to your inbox.
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/95 text-forest-800 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:ring-offset-2 focus:ring-offset-forest-800 transition-all duration-300 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-forest-400 hover:bg-forest-300 text-forest-900 font-semibold rounded-full px-8 py-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </div>
        </form>

        {/* Privacy Note */}
        <p className="text-cream-300/60 text-xs">
          We respect your privacy. Unsubscribe at any time. No spam, ever.
        </p>

        {/* Toast Notification */}
        {isSubmitted && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
            <div className="flex items-center gap-3 bg-white rounded-xl px-6 py-4 shadow-2xl border border-forest-100">
              <CheckCircle className="w-6 h-6 text-forest-500 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-forest-800 text-sm">
                  Welcome to the community! 🌱
                </p>
                <p className="text-forest-600 text-xs">
                  Demo only — no email was actually sent.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
