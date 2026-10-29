import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Sun,
  Droplets,
  PawPrint,
  Wind,
  CheckCircle2,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  Heart,
  ChevronRight,
  ShieldCheck,
  Compass,
  Zap,
} from 'lucide-react';
import { useProducts } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { Product } from '../../types';
import { formatPrice } from '../../utils/format';

interface QuizState {
  light: 'low' | 'bright-indirect' | 'direct' | 'bathroom' | 'desk';
  experience: 'beginner' | 'moderate' | 'expert';
  petFriendly: 'required' | 'any';
  goal: 'clean-air' | 'statement' | 'flowering' | 'luck';
}

const lightOptions = [
  {
    id: 'low',
    label: 'Low Light / Dim Room',
    desc: 'Bedroom, hallway, or away from windows',
    icon: '🌙',
  },
  {
    id: 'bright-indirect',
    label: 'Bright Indirect Sun',
    desc: 'Living room, near a sunny window with curtain',
    icon: '☀️',
  },
  {
    id: 'direct',
    label: 'Direct Sunlight',
    desc: 'Balcony, terrace, or south-facing windowsill',
    icon: '🌞',
  },
  {
    id: 'bathroom',
    label: 'Humid Space / Bathroom',
    desc: 'High humidity and warm environment',
    icon: '🚿',
  },
  {
    id: 'desk',
    label: 'Work Desk / Office',
    desc: 'Compact desktop plant under indoor fluorescent lights',
    icon: '💻',
  },
];

const experienceOptions = [
  {
    id: 'beginner',
    label: 'Low Maintenance / Busy Lifestyle',
    desc: 'I travel often or forget to water (needs care once every 2 weeks)',
    badge: 'Virtually Unkillable',
  },
  {
    id: 'moderate',
    label: 'Balanced Plant Parent',
    desc: 'Happy to water weekly and check on leaves periodically',
    badge: 'Standard Care',
  },
  {
    id: 'expert',
    label: 'Green Thumb Enthusiast',
    desc: 'Love misting, pruning, fertilizing, and nurturing delicate species',
    badge: 'Hands-on TLC',
  },
];

const petOptions = [
  {
    id: 'required',
    label: 'Non-Toxic & Pet Safe',
    desc: 'Safe for curious dogs and cats who might nibble',
    icon: '🐾',
  },
  {
    id: 'any',
    label: 'Any Plant is Fine',
    desc: 'No pets, or plants will be kept high out of reach',
    icon: '🌿',
  },
];

const goalOptions = [
  {
    id: 'clean-air',
    label: 'Clean Air & Toxin Removal',
    desc: 'Filter formaldehyde, benzene, and freshen indoor air',
    icon: '💨',
  },
  {
    id: 'statement',
    label: 'Lush Statement Foliage',
    desc: 'Dramatic big leaves that transform the room vibe',
    icon: '🌴',
  },
  {
    id: 'flowering',
    label: 'Flowering & Colorful Blooms',
    desc: 'Vibrant blossoms and pleasant floral energy',
    icon: '🌸',
  },
  {
    id: 'luck',
    label: 'Good Luck & Positive Feng Shui',
    desc: 'Attract prosperity, harmony, and tranquil energy',
    icon: '🎋',
  },
];

const PlantRecommendationAI: React.FC = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [step, setStep] = useState<number>(1);
  const [quiz, setQuiz] = useState<QuizState>({
    light: 'bright-indirect',
    experience: 'beginner',
    petFriendly: 'any',
    goal: 'clean-air',
  });
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setQuiz({
      light: 'bright-indirect',
      experience: 'beginner',
      petFriendly: 'any',
      goal: 'clean-air',
    });
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // AI Matching Algorithm
  const recommendations = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products
      .map((product) => {
        let score = 70; // baseline score
        const reasons: string[] = [];

        // 1. Lighting compatibility
        const productSunlight = (product.sunlight || '').toLowerCase();
        if (quiz.light === 'low') {
          if (productSunlight.includes('low') || productSunlight.includes('indirect')) {
            score += 15;
            reasons.push('Thrives in dim and low-light spaces');
          }
        } else if (quiz.light === 'bright-indirect') {
          if (productSunlight.includes('bright') || productSunlight.includes('indirect')) {
            score += 15;
            reasons.push('Loves filtered bright window light');
          }
        } else if (quiz.light === 'direct') {
          if (productSunlight.includes('direct') || productSunlight.includes('sun')) {
            score += 15;
            reasons.push('Basks happily in warm direct sun');
          }
        } else if (quiz.light === 'bathroom') {
          if (
            product.category === 'indoor' ||
            product.tags?.includes('tropical') ||
            productSunlight.includes('indirect')
          ) {
            score += 12;
            reasons.push('Naturally loves warm bathroom humidity');
          }
        } else if (quiz.light === 'desk') {
          if (
            product.category === 'succulents' ||
            product.difficulty === 'Easy' ||
            product.name.toLowerCase().includes('money') ||
            product.name.toLowerCase().includes('bonsai')
          ) {
            score += 12;
            reasons.push('Compact & neat for desk workspaces');
          }
        }

        // 2. Experience / Care compatibility
        if (quiz.experience === 'beginner') {
          if (product.difficulty === 'Easy') {
            score += 15;
            reasons.push('Ultra resilient & very forgiving of missed waterings');
          } else if (product.difficulty === 'Moderate') {
            score += 5;
          }
        } else if (quiz.experience === 'moderate') {
          score += 10;
          reasons.push('Fits a regular weekly watering rhythm');
        } else {
          score += 10;
          reasons.push('Great plant to prune and develop foliage');
        }

        // 3. Pet safety
        if (quiz.petFriendly === 'required') {
          if (product.petFriendly) {
            score += 18;
            reasons.push('100% Non-toxic & certified safe for dogs and cats');
          } else {
            score -= 35; // heavily penalize toxic plants if pet friendly is required
          }
        }

        // 4. Primary goal
        if (quiz.goal === 'clean-air') {
          if (product.airPurifying || product.category === 'air-purifying') {
            score += 15;
            reasons.push('NASA certified air filter for indoor toxins');
          }
        } else if (quiz.goal === 'flowering') {
          if (
            product.category === 'flowering' ||
            product.name.toLowerCase().includes('peace') ||
            product.name.toLowerCase().includes('anthurium') ||
            product.name.toLowerCase().includes('orchid')
          ) {
            score += 15;
            reasons.push('Generates magnificent decorative blossoms');
          }
        } else if (quiz.goal === 'luck') {
          if (
            product.name.toLowerCase().includes('money') ||
            product.name.toLowerCase().includes('jade') ||
            product.name.toLowerCase().includes('bamboo') ||
            product.name.toLowerCase().includes('rubber')
          ) {
            score += 15;
            reasons.push('Revered for auspicious Vastu & Feng Shui harmony');
          }
        } else if (quiz.goal === 'statement') {
          if (
            product.name.toLowerCase().includes('monstera') ||
            product.name.toLowerCase().includes('palm') ||
            product.name.toLowerCase().includes('fig') ||
            product.category === 'indoor'
          ) {
            score += 12;
            reasons.push('Bold architectural silhouette with dramatic leaves');
          }
        }

        // Normalize score between 80% and 99%
        const normalizedScore = Math.min(99, Math.max(82, score));

        return {
          product,
          score: normalizedScore,
          reasons: reasons.slice(0, 2),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [products, quiz]);

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-cream-50 via-sage-50/40 to-cream-50 relative overflow-hidden">
      {/* Decorative botanical background blurs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-forest-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-forest-100 text-forest-800 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-forest-600 animate-pulse" />
            <span>AI Plant Matchmaker</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight mb-4">
            Find Your Perfect Green Match
          </h2>
          <p className="text-forest-700/80 text-base sm:text-lg leading-relaxed">
            Not sure which plant will thrive in your space? Tell Dr. Flora AI a few details about your light and lifestyle to unlock personalized plant recommendations.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-forest-900/5 border border-forest-100/60 p-6 sm:p-10 mb-12">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between max-w-xl mx-auto mb-8 sm:mb-12">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <button
                  onClick={() => setStep(stepNum)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    step === stepNum
                      ? 'bg-forest-700 text-white shadow-lg shadow-forest-700/30 ring-4 ring-forest-100'
                      : step > stepNum
                      ? 'bg-forest-100 text-forest-800'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step > stepNum ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                </button>
                {stepNum < 4 && (
                  <div
                    className={`w-12 sm:w-20 h-1 mx-2 rounded-full transition-colors ${
                      step > stepNum ? 'bg-forest-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* STEP 1: Lighting & Space */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <span className="text-xs font-semibold text-forest-600 uppercase tracking-wider">Step 1 of 4</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  Where will your new plant live?
                </h3>
                <p className="text-gray-500 text-sm mt-1">Select the lighting condition of your room</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {lightOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuiz((prev) => ({ ...prev, light: opt.id as any }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      quiz.light === opt.id
                        ? 'border-forest-600 bg-forest-50/60 ring-2 ring-forest-600/20 shadow-md'
                        : 'border-gray-200 hover:border-forest-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div>
                      <div className="text-3xl mb-3">{opt.icon}</div>
                      <h4 className="font-semibold text-gray-900 text-base">{opt.label}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                    {quiz.light === opt.id && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-forest-700">
                        <CheckCircle2 className="w-4 h-4 text-forest-600" />
                        Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Maintenance & Experience */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <span className="text-xs font-semibold text-forest-600 uppercase tracking-wider">Step 2 of 4</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  What is your plant parenting style?
                </h3>
                <p className="text-gray-500 text-sm mt-1">How much time can you dedicate to plant care?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {experienceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuiz((prev) => ({ ...prev, experience: opt.id as any }))}
                    className={`p-6 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      quiz.experience === opt.id
                        ? 'border-forest-600 bg-forest-50/60 ring-2 ring-forest-600/20 shadow-md'
                        : 'border-gray-200 hover:border-forest-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-full bg-forest-100 text-forest-800 text-[11px] font-semibold mb-3">
                        {opt.badge}
                      </span>
                      <h4 className="font-semibold text-gray-900 text-base">{opt.label}</h4>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{opt.desc}</p>
                    </div>
                    {quiz.experience === opt.id && (
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-forest-700">
                        <CheckCircle2 className="w-4 h-4 text-forest-600" />
                        Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Pet Safety */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <span className="text-xs font-semibold text-forest-600 uppercase tracking-wider">Step 3 of 4</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  Do you have furry friends at home?
                </h3>
                <p className="text-gray-500 text-sm mt-1">Ensure complete peace of mind for cats and dogs</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
                {petOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuiz((prev) => ({ ...prev, petFriendly: opt.id as any }))}
                    className={`p-6 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 ${
                      quiz.petFriendly === opt.id
                        ? 'border-forest-600 bg-forest-50/60 ring-2 ring-forest-600/20 shadow-md'
                        : 'border-gray-200 hover:border-forest-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="text-3xl">{opt.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">{opt.label}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{opt.desc}</p>
                      {quiz.petFriendly === opt.id && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-forest-700">
                          <CheckCircle2 className="w-4 h-4 text-forest-600" />
                          Selected
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Primary Goal */}
          {step === 4 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <span className="text-xs font-semibold text-forest-600 uppercase tracking-wider">Step 4 of 4</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  What is your primary botanical goal?
                </h3>
                <p className="text-gray-500 text-sm mt-1">Choose what vibe you want to bring into your space</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuiz((prev) => ({ ...prev, goal: opt.id as any }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      quiz.goal === opt.id
                        ? 'border-forest-600 bg-forest-50/60 ring-2 ring-forest-600/20 shadow-md'
                        : 'border-gray-200 hover:border-forest-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div>
                      <div className="text-3xl mb-3">{opt.icon}</div>
                      <h4 className="font-semibold text-gray-900 text-base">{opt.label}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                    {quiz.goal === opt.id && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-forest-700">
                        <CheckCircle2 className="w-4 h-4 text-forest-600" />
                        Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Action Bar */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-forest-700 font-medium inline-flex items-center gap-1.5 transition-colors order-2 sm:order-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset questionnaire
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 sm:flex-initial px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-forest-700 text-white rounded-xl text-sm font-semibold hover:bg-forest-800 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href="#ai-results"
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-forest-700 text-white rounded-xl text-sm font-semibold hover:bg-forest-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-forest-800/25 animate-pulse"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  View Top Matches Below
                </a>
              )}
            </div>
          </div>
        </div>

        {/* AI Recommendations Showcase */}
        <div id="ai-results" className="scroll-mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-forest-900">
                  Your Recommended Plants
                </h3>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Custom-matched to your lighting, lifestyle schedule, and environment
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-forest-700 hover:text-forest-900 text-sm font-semibold group"
            >
              Explore Full Catalog
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map(({ product, score, reasons }) => {
              const isAdded = addedIds[product.id];
              const isWished = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container with Match Badge */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=600&fit=crop';
                      }}
                    />

                    {/* AI Match Score Badge */}
                    <div className="absolute top-3 left-3 bg-forest-800/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md border border-forest-600/40">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{score}% Match</span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isWished
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/85 text-gray-600 hover:bg-white hover:text-rose-500 backdrop-blur-sm'
                      }`}
                      aria-label="Toggle wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span className="uppercase tracking-wider font-semibold text-forest-700">
                          {product.category}
                        </span>
                        <span>{product.sunlight}</span>
                      </div>

                      <h4 className="font-display font-bold text-gray-900 text-lg group-hover:text-forest-700 transition-colors line-clamp-1">
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </h4>

                      {product.scientificName && (
                        <p className="text-xs text-gray-400 italic mb-2 line-clamp-1">
                          {product.scientificName}
                        </p>
                      )}

                      {/* AI Reasons */}
                      <div className="mt-2.5 mb-4 space-y-1">
                        {reasons.map((r, idx) => (
                          <div
                            key={idx}
                            className="text-[11px] text-forest-700 bg-forest-50/80 rounded-md px-2 py-1 flex items-center gap-1.5 leading-snug"
                          >
                            <CheckCircle2 className="w-3 h-3 text-forest-600 flex-shrink-0" />
                            <span className="truncate">{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-base font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through ml-1.5">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={!product.inStock}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : product.inStock
                            ? 'bg-forest-700 text-white hover:bg-forest-800'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantRecommendationAI;