import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { plantCareTips } from '../../data/testimonials';

const PlantCareTips: React.FC = () => {
  const tips = plantCareTips.slice(0, 3);

  if (tips.length === 0) return null;

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 rounded-full px-4 py-2 mb-4">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold text-sm">Learn & Grow</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-800 mb-4">
            Plant Care Tips
          </h2>
          <p className="text-forest-600 text-lg max-w-md mx-auto">
            Expert advice to help your plants thrive
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <article
              key={tip.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-cream-100"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Category Tag */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {tip.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-forest-800 mb-3 group-hover:text-forest-600 transition-colors duration-300">
                  {tip.title}
                </h3>
                <p className="text-forest-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {tip.excerpt}
                </p>
                <button className="inline-flex items-center gap-1.5 text-forest-600 hover:text-forest-800 font-semibold text-sm transition-colors duration-300 group/link">
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantCareTips;
