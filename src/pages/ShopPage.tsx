import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Search,
  LayoutGrid,
  List,
} from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { Product, CategoryId } from '../types';
import ProductCard from '../components/common/ProductCard';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

type SortOption =
  | 'popularity'
  | 'price-low'
  | 'price-high'
  | 'newest'
  | 'rating';

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

const PRICE_RANGES: PriceRange[] = [
  { label: 'Under ₹300', min: 0, max: 300 },
  { label: '₹300 - ₹600', min: 300, max: 600 },
  { label: '₹600 - ₹1000', min: 600, max: 1000 },
  { label: 'Over ₹1000', min: 1000, max: Infinity },
];

const DIFFICULTY_OPTIONS = ['Easy', 'Moderate', 'Expert'] as const;
const SUNLIGHT_OPTIONS = ['Low Light', 'Indirect Light', 'Bright Indirect', 'Direct Sunlight'] as const;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Rating' },
];

const PRODUCTS_PER_PAGE = 12;

/* ------------------------------------------------------------------ */
/*  Collapsible filter section                                        */
/* ------------------------------------------------------------------ */
const FilterSection: React.FC<{
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 hover:text-forest-600 transition-colors"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
const ShopPage: React.FC = () => {
  const { products, categories, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Filter state ------------------------------------------------
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedSunlight, setSelectedSunlight] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Read URL params whenever searchParams changes
  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('search');
    if (cat) {
      setSelectedCategories([cat as CategoryId]);
    } else {
      setSelectedCategories([]);
    }
    if (q) {
      setSearchQuery(q);
    } else {
      setSearchQuery('');
    }
    setCurrentPage(1);
  }, [searchParams]);

  const updateFiltersAndUrl = useCallback(
    (cats: CategoryId[], query: string) => {
      const params: Record<string, string> = {};
      if (cats.length === 1) params.category = cats[0];
      if (query.trim()) params.search = query.trim();
      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  // --- Toggle helpers -----------------------------------------------
  const toggle = <T,>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const toggleCategory = (id: CategoryId) => {
    setSelectedCategories((prev) => {
      const next = toggle(prev, id);
      updateFiltersAndUrl(next, searchQuery);
      return next;
    });
    setCurrentPage(1);
  };

  const togglePriceRange = (idx: number) => {
    setSelectedPriceRanges((prev) => toggle(prev, idx));
    setCurrentPage(1);
  };

  const toggleDifficulty = (d: string) => {
    setSelectedDifficulties((prev) => toggle(prev, d));
    setCurrentPage(1);
  };

  const toggleSunlight = (s: string) => {
    setSelectedSunlight((prev) => toggle(prev, s));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedDifficulties([]);
    setSelectedSunlight([]);
    setInStockOnly(false);
    setSearchQuery('');
    setSearchParams({}, { replace: true });
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPriceRanges.length > 0 ||
    selectedDifficulties.length > 0 ||
    selectedSunlight.length > 0 ||
    inStockOnly ||
    searchQuery.length > 0;

  // --- Filtering & sorting -----------------------------------------
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category as CategoryId)
      );
    }

    // Price
    if (selectedPriceRanges.length > 0) {
      const ranges = selectedPriceRanges.map((i) => PRICE_RANGES[i]);
      result = result.filter((p) => {
        const price = p.salePrice ?? p.price;
        return ranges.some((r) => price >= r.min && price < r.max);
      });
    }

    // Difficulty
    if (selectedDifficulties.length > 0) {
      result = result.filter((p) =>
        selectedDifficulties.includes(p.difficulty ?? '')
      );
    }

    // Sunlight
    if (selectedSunlight.length > 0) {
      result = result.filter((p) =>
        selectedSunlight.includes(p.sunlight ?? '')
      );
    }

    // In-stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock !== false);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
        );
        break;
      case 'rating':
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'popularity':
      default:
        result.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
        break;
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategories,
    selectedPriceRanges,
    selectedDifficulties,
    selectedSunlight,
    inStockOnly,
    sortBy,
  ]);

  // --- Pagination ---------------------------------------------------
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // --- Filter sidebar content (shared between desktop & mobile) -----
  const filterContent = (
    <div className="space-y-1">
      {/* Search within filters */}
      <div className="relative pb-4 border-b border-gray-200">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 -mt-2"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search plants..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-forest-500 focus:ring-1 focus:ring-forest-500 outline-none transition-colors"
        />
      </div>

      {/* Category */}
      <FilterSection title="Category">
        {categories.map((cat) => (
          <label
            key={cat.id}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-forest-700 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.id as CategoryId)}
              onChange={() => toggleCategory(cat.id as CategoryId)}
              className="h-4 w-4 rounded border-gray-300 text-forest-600 focus:ring-forest-500"
            />
            <span>{cat.name}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        {PRICE_RANGES.map((range, idx) => (
          <label
            key={idx}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-forest-700 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedPriceRanges.includes(idx)}
              onChange={() => togglePriceRange(idx)}
              className="h-4 w-4 rounded border-gray-300 text-forest-600 focus:ring-forest-500"
            />
            <span>{range.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Difficulty */}
      <FilterSection title="Difficulty Level">
        {DIFFICULTY_OPTIONS.map((d) => (
          <label
            key={d}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-forest-700 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedDifficulties.includes(d)}
              onChange={() => toggleDifficulty(d)}
              className="h-4 w-4 rounded border-gray-300 text-forest-600 focus:ring-forest-500"
            />
            <span>{d}</span>
          </label>
        ))}
      </FilterSection>

      {/* Sunlight */}
      <FilterSection title="Sunlight Requirement">
        {SUNLIGHT_OPTIONS.map((s) => (
          <label
            key={s}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-forest-700 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedSunlight.includes(s)}
              onChange={() => toggleSunlight(s)}
              className="h-4 w-4 rounded border-gray-300 text-forest-600 focus:ring-forest-500"
            />
            <span>{s}</span>
          </label>
        ))}
      </FilterSection>

      {/* In-stock toggle */}
      <div className="border-b border-gray-200 py-4">
        <label className="flex items-center justify-between text-sm font-semibold text-gray-800 cursor-pointer">
          <span>In Stock Only</span>
          <div
            className={`relative w-10 h-5 rounded-full transition-colors ${
              inStockOnly ? 'bg-forest-600' : 'bg-gray-300'
            }`}
            onClick={() => {
              setInStockOnly(!inStockOnly);
              setCurrentPage(1);
            }}
          >
            <div
              className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                inStockOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </label>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="mt-4 w-full rounded-lg border border-red-300 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  // --- Render -------------------------------------------------------
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ---- Mobile filter drawer overlay ---- */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-5 py-4">{filterContent}</div>
          </div>
        </div>
      )}

      <div className="bg-sage-50 min-h-screen">
        {/* ---- Breadcrumbs ---- */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-forest-600 transition-colors">
                Home
              </Link>
              <ChevronRight size={14} />
              <span className="text-gray-900 font-medium">Shop</span>
            </nav>
            <h1 className="mt-2 font-display text-3xl font-bold text-gray-900">
              Our Plant Collection
            </h1>
            <p className="mt-1 text-gray-500">
              Discover the perfect green companion for your space
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* ---- Desktop sidebar ---- */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Filters
                </h2>
                {filterContent}
              </div>
            </aside>

            {/* ---- Main content ---- */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white px-5 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <SlidersHorizontal size={16} />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-forest-600 text-[10px] text-white">
                        !
                      </span>
                    )}
                  </button>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-800">
                      {filteredProducts.length}
                    </span>{' '}
                    {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-select"
                    className="text-sm text-gray-500 whitespace-nowrap"
                  >
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-forest-500 focus:ring-1 focus:ring-forest-500 outline-none transition-colors"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filter Pills */}
              {hasActiveFilters && (
                <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl bg-white p-3 shadow-sm border border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">
                    Active:
                  </span>
                  {selectedCategories.map((catId) => {
                    const catName = categories.find((c) => c.id === catId)?.name || catId;
                    return (
                      <button
                        key={catId}
                        onClick={() => toggleCategory(catId)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700 hover:bg-forest-100 transition-colors"
                      >
                        {catName}
                        <X size={12} className="text-forest-500" />
                      </button>
                    );
                  })}
                  {selectedPriceRanges.map((idx) => (
                    <button
                      key={idx}
                      onClick={() => togglePriceRange(idx)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700 hover:bg-forest-100 transition-colors"
                    >
                      {PRICE_RANGES[idx].label}
                      <X size={12} className="text-forest-500" />
                    </button>
                  ))}
                  {selectedDifficulties.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => toggleDifficulty(diff)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700 hover:bg-forest-100 transition-colors"
                    >
                      {diff}
                      <X size={12} className="text-forest-500" />
                    </button>
                  ))}
                  {selectedSunlight.map((sun) => (
                    <button
                      key={sun}
                      onClick={() => toggleSunlight(sun)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700 hover:bg-forest-100 transition-colors"
                    >
                      {sun}
                      <X size={12} className="text-forest-500" />
                    </button>
                  ))}
                  {inStockOnly && (
                    <button
                      onClick={() => setInStockOnly(false)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700 hover:bg-forest-100 transition-colors"
                    >
                      In Stock Only
                      <X size={12} className="text-forest-500" />
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700 hover:bg-forest-100 transition-colors"
                    >
                      "{searchQuery}"
                      <X size={12} className="text-forest-500" />
                    </button>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="ml-auto text-xs font-semibold text-red-600 hover:text-red-700 underline"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Product grid */}
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((p) => p - 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                              page === currentPage
                                ? 'bg-forest-600 text-white shadow-sm'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <span className="sm:hidden text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((p) => p + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState
                  icon={Search}
                  title="No plants found"
                  description="Try adjusting your filters or search query to find what you're looking for."
                  actionLabel="Clear Filters"
                  onAction={clearAllFilters}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
