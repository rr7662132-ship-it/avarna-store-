import React, { useState, useEffect, useRef } from 'react';
import { Product, CategoryId } from '../../types';
import { useProducts } from '../../contexts/ProductContext';
import { generateId } from '../../utils/format';
import {
  Save,
  X,
  ImagePlus,
  Trash2,
  Eye,
  Leaf,
  Sun,
  Droplets,
  Gauge,
  PawPrint,
  Wind,
  Star,
  TrendingUp,
  Sparkles,
  Tag,
  Upload,
  Camera,
  Check,
} from 'lucide-react';

interface ProductFormProps {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const sunlightOptions = [
  'Low Light',
  'Indirect Light',
  'Bright Indirect',
  'Direct Sunlight',
  'Partial Shade',
];

const difficultyOptions = ['Easy', 'Moderate', 'Expert'];

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const { categories } = useProducts();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: '',
    category: 'indoor' as CategoryId,
    price: 0,
    originalPrice: 0,
    description: '',
    longDescription: '',
    image: '',
    images: [] as string[],
    stockCount: 10,
    inStock: true,
    sunlight: 'Indirect Light',
    watering: '',
    difficulty: 'Easy',
    size: '',
    petFriendly: false,
    airPurifying: false,
    featured: false,
    bestSeller: false,
    newArrival: false,
    tags: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressAndSetImage = (file: File) => {
    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const maxDimension = 900;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setFormData((prev) => ({ ...prev, image: compressed }));
        } else {
          setFormData((prev) => ({ ...prev, image: e.target?.result as string }));
        }
        setUploadingImage(false);
      };
      img.onerror = () => {
        setUploadingImage(false);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndSetImage(file);
    }
  };

  // Pre-fill form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'indoor-plants',
        price: product.price || 0,
        originalPrice: product.originalPrice || 0,
        description: product.description || '',
        longDescription: product.longDescription || '',
        image: product.image || '',
        images: product.images || [],
        stockCount: product.stockCount ?? 10,
        inStock: product.inStock ?? true,
        sunlight: product.sunlight || 'Indirect Light',
        watering: product.watering || '',
        difficulty: product.difficulty || 'Easy',
        size: product.size || '',
        petFriendly: product.petFriendly || false,
        airPurifying: product.airPurifying || false,
        featured: product.featured || false,
        bestSeller: product.bestSeller || false,
        newArrival: product.newArrival || false,
        tags: product.tags?.join(', ') || '',
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
    }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Main image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const productData: Product = {
      id: product?.id || generateId(),
      name: formData.name.trim(),
      category: formData.category,
      price: formData.price,
      originalPrice: formData.originalPrice || undefined,
      description: formData.description.trim(),
      longDescription: formData.longDescription.trim() || undefined,
      image: formData.image.trim(),
      images: formData.images.length > 0 ? formData.images : undefined,
      stockCount: formData.stockCount,
      inStock: formData.inStock,
      sunlight: formData.sunlight as 'Low Light' | 'Indirect Light' | 'Bright Indirect' | 'Direct Sunlight' | 'Partial Shade',
      watering: formData.watering || 'Water when soil is dry',
      difficulty: formData.difficulty as 'Easy' | 'Moderate' | 'Expert',
      size: formData.size || undefined,
      petFriendly: formData.petFriendly,
      airPurifying: formData.airPurifying,
      featured: formData.featured,
      bestSeller: formData.bestSeller,
      newArrival: formData.newArrival,
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : undefined,
      rating: product?.rating || 4.5,
      reviewCount: product?.reviewCount || 0,
      createdAt: product?.createdAt || new Date().toISOString(),
    };

    onSave(productData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? 'Update the product details below' : 'Fill in the details to add a new product'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Monstera Deliciosa"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Gauge className="w-4 h-4" /> Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm bg-white"
              >
                {difficultyOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                placeholder="499"
                min="0"
                step="1"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm ${
                  errors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price (₹) <span className="text-gray-400 text-xs">Optional, for discount</span>
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice || ''}
                onChange={handleChange}
                placeholder="699"
                min="0"
                step="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Short product description..."
                rows={3}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm resize-none ${
                  errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>

            {/* Long Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Long Description <span className="text-gray-400 text-xs">Optional</span>
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                placeholder="Detailed product description..."
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm resize-none"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-green-600" />
            Images
          </h2>

          {/* Main Image Source */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Product Image <span className="text-red-500">*</span>
            </label>

            {/* Upload or URL Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                {uploadingImage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Compressing & Loading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload from Phone Camera / Device</span>
                  </>
                )}
              </button>

              <span className="text-xs text-gray-400">or enter image web URL below</span>
            </div>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/... or data:image/..."
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm ${
                errors.image ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}

            {/* Quick Presets */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1.5 font-medium">Quick Botanical Presets:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Monstera', url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=80' },
                  { name: 'Snake Plant', url: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=800&auto=format&fit=crop&q=80' },
                  { name: 'Peace Lily', url: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=800&auto=format&fit=crop&q=80' },
                  { name: 'Fiddle Leaf Fig', url: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=80' },
                  { name: 'ZZ Plant', url: 'https://images.unsplash.com/photo-1632307849688-92736173a14e?w=800&auto=format&fit=crop&q=80' },
                  { name: 'Money Plant', url: 'https://images.unsplash.com/photo-1596724817753-3171f1146244?w=800&auto=format&fit=crop&q=80' },
                  { name: 'Areca Palm', url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80' },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, image: preset.url }))}
                    className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-forest-100 hover:text-forest-800 text-gray-700 rounded-lg transition-colors border border-gray-200"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="mb-5 p-3 bg-gray-50 rounded-2xl border border-gray-200 inline-block">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1 font-semibold">
                <Eye className="w-3.5 h-3.5" /> Image Live Preview
              </p>
              <img
                src={formData.image}
                alt="Preview"
                className="w-36 h-36 object-cover rounded-xl border border-gray-300 shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/144?text=Invalid+Image+URL';
                }}
              />
            </div>
          )}

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Add another image URL"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addImage();
                  }
                }}
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2.5 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Add
              </button>
            </div>
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Additional ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/80?text=Error';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Inventory & Care */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-green-600" />
            Inventory & Plant Care
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stock Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Count</label>
              <input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="flex items-center gap-3 pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <span className="text-sm font-medium text-gray-700">In Stock</span>
            </div>

            {/* Sunlight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Sun className="w-4 h-4" /> Sunlight
              </label>
              <select
                name="sunlight"
                value={formData.sunlight}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm bg-white"
              >
                {sunlightOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Watering */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Droplets className="w-4 h-4" /> Watering Instructions
              </label>
              <input
                type="text"
                name="watering"
                value={formData.watering}
                onChange={handleChange}
                placeholder="e.g., Once a week"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g., Medium (30-45cm)"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Tag className="w-4 h-4" /> Tags
                <span className="text-gray-400 text-xs">(comma-separated)</span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., tropical, beginner, air-purifier"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Flags */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-green-600" />
            Product Flags
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'petFriendly', label: 'Pet Friendly', icon: PawPrint },
              { name: 'airPurifying', label: 'Air Purifying', icon: Wind },
              { name: 'featured', label: 'Featured', icon: Star },
              { name: 'bestSeller', label: 'Best Seller', icon: TrendingUp },
              { name: 'newArrival', label: 'New Arrival', icon: Sparkles },
            ].map((flag) => (
              <label
                key={flag.name}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  formData[flag.name as keyof typeof formData]
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  name={flag.name}
                  checked={formData[flag.name as keyof typeof formData] as boolean}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                />
                <flag.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{flag.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pb-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
