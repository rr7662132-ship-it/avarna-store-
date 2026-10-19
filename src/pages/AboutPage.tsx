import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Leaf, Recycle, Award, Heart, ArrowRight, Sprout, Users, ShieldCheck } from 'lucide-react';

const values = [
  {
    icon: Recycle,
    title: 'Sustainability',
    description:
      'Every plant we grow, every pot we craft, and every package we ship is done with the planet in mind. We use eco-friendly packaging and support sustainable farming practices.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Award,
    title: 'Quality',
    description:
      'Each plant is carefully inspected, nurtured, and handpicked by our expert horticulturists before it reaches your doorstep. We guarantee only the healthiest specimens.',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Heart,
    title: 'Care',
    description:
      'Our relationship doesn\'t end at delivery. We provide detailed care guides, 24/7 plant support, and a thriving community to help your green companions flourish.',
    color: 'bg-rose-100 text-rose-700',
  },
];

const team = [
  { name: 'Anika Sharma', role: 'Founder & CEO', initials: 'AS' },
  { name: 'Rohan Mehta', role: 'Head Horticulturist', initials: 'RM' },
  { name: 'Priya Nair', role: 'Design Lead', initials: 'PN' },
  { name: 'Vikram Das', role: 'Operations', initials: 'VD' },
];

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 to-green-900/90" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-green-300" />
              <span className="text-sm text-green-100 font-medium">Est. 2020</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-green-300">AVARNA</span>
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              Bringing the beauty and tranquility of nature into every home, one plant at a time.
            </p>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Born from a love for plants
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  AVARNA was born in 2020, during a time when the world paused and people rediscovered the healing
                  power of nature within their own homes. What started as a small balcony nursery in Bengaluru has
                  blossomed into one of India's most loved online plant stores.
                </p>
                <p>
                  Our founder, a passionate plant enthusiast and environmentalist, envisioned a world where every
                  urban home could have a touch of green — where busy professionals could enjoy the therapeutic
                  benefits of caring for living things, even in the smallest of apartments.
                </p>
                <p>
                  Today, AVARNA curates hundreds of plant varieties — from resilient succulents to majestic
                  tropical foliage — along with handcrafted pots, premium soils, and expert care guidance. Our
                  mission remains unchanged: <strong className="text-green-800">to bring nature home</strong>.
                </p>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&q=80"
                  alt="Beautiful indoor plants"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-green-700 text-white rounded-xl p-4 shadow-lg">
                <Sprout className="w-8 h-8 mb-1" />
                <span className="text-2xl font-bold block">5000+</span>
                <span className="text-green-200 text-sm">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in">
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-14 h-14 rounded-xl ${value.color} flex items-center justify-center mb-5`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-700 to-emerald-800 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 opacity-10">
              <Leaf className="w-64 h-64 -mt-16 -mr-16" />
            </div>
            <div className="relative max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-green-300" />
                <span className="text-sm font-semibold text-green-200 uppercase tracking-wider">Our Promise</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                We promise to nurture your plants as if they were our own
              </h2>
              <ul className="space-y-4 text-green-100">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span>7-day replacement guarantee on all plants</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span>Expert-packed with protective insulation for safe transit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span>Lifetime plant care support from our horticulture team</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <span>100% eco-friendly, biodegradable packaging</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in">
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">The People Behind AVARNA</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-700 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {member.initials}
                </div>
                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to bring nature home?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Explore our curated collection of plants, pots, and gardening essentials. Your green journey starts here.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
