import React from 'react';
import { Star, Quote, MessageCircle } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

const Testimonials: React.FC = () => {
  const displayTestimonials = testimonials.slice(0, 3);

  if (displayTestimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 bg-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white text-forest-700 rounded-full px-4 py-2 mb-4 shadow-sm">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-sm">Reviews</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-forest-500 text-sm">
            Demo testimonials for preview purposes
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-sage-100"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-6">
                <div className="bg-forest-500 rounded-full p-2.5 shadow-md">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-forest-700 leading-relaxed mb-6 text-sm">
                "{testimonial.review || testimonial.text}"
              </p>

              {/* Product Mention */}
              {testimonial.product && (
                <p className="text-xs text-forest-500 mb-4 bg-cream-50 inline-block px-3 py-1 rounded-full">
                  🌱 {testimonial.product}
                </p>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-sage-100">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forest-300 to-sage-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-forest-800 text-sm">
                    {testimonial.name}
                  </p>
                  {testimonial.location && (
                    <p className="text-forest-500 text-xs">
                      {testimonial.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
