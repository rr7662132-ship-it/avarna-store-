import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Product } from '../../types';
import { searchProducts } from '../../data/products';

interface SearchBarProps {
  onClose?: () => void;
}

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fetch suggestions on debounced query change
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const results = searchProducts(debouncedQuery);
    setSuggestions(results.slice(0, 5));
    setShowSuggestions(results.length > 0);
    setSelectedIndex(-1);
  }, [debouncedQuery]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
        setShowSuggestions(false);
        onClose?.();
      }
    },
    [query, navigate, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      onClose?.();
      return;
    }

    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[selectedIndex];
      navigate(`/product/${selected.id}`);
      setShowSuggestions(false);
      onClose?.();
    }
  };

  const handleSuggestionClick = (product: Product) => {
    navigate(`/product/${product.id}`);
    setShowSuggestions(false);
    onClose?.();
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 focus-within:border-forest-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-forest-500/20">
          <div className="flex items-center pl-4 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search plants, pots, accessories..."
            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-1 rounded-full p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="mr-2 rounded-full px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          {suggestions.map((product, index) => (
            <button
              key={product.id}
              onClick={() => handleSuggestionClick(product)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                index === selectedIndex ? 'bg-forest-50' : 'hover:bg-gray-50'
              }`}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{product.name}</p>
                {product.category && (
                  <p className="text-xs text-gray-500">{product.category}</p>
                )}
              </div>
              <span className="text-sm font-semibold text-forest-700">
                ₹{product.price}
              </span>
            </button>
          ))}
          <button
            onClick={handleSubmit as any}
            className="flex w-full items-center justify-center border-t border-gray-100 px-4 py-2.5 text-xs font-medium text-forest-600 transition-colors hover:bg-forest-50"
          >
            View all results for &ldquo;{query}&rdquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
