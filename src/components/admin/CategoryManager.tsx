import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { Category } from '../../types';
import {
  Package,
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  X,
  ExternalLink,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Bonsai Trees', url: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&h=400&fit=crop' },
  { label: 'Ferns & Foliage', url: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&h=400&fit=crop' },
  { label: 'Herbs & Medicinal', url: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=400&fit=crop' },
  { label: 'Hanging & Climbers', url: 'https://images.unsplash.com/photo-1521505651032-31ccc712e42e?w=600&h=400&fit=crop' },
];

const CategoryManager: React.FC = () => {
  const { products, categories, addCategory, updateCategory, deleteCategory } = useProducts();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setId('');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&h=400&fit=crop');
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setId(cat.id);
    setDescription(cat.description);
    setImage(cat.image);
    setError('');
    setModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!editingCategory) {
      // Auto-suggest slug ID
      const slug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setId(slug);
    }
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a category name.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a short description.');
      return;
    }
    if (!image.trim()) {
      setError('Please provide a valid image URL.');
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: name.trim(),
        description: description.trim(),
        image: image.trim(),
      });
      showNotification(`Category "${name}" updated successfully!`);
    } else {
      addCategory({
        id: id.trim() || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
        name: name.trim(),
        description: description.trim(),
        image: image.trim(),
      });
      showNotification(`Category "${name}" created and added to store!`);
    }

    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteCategory(deleteTarget.id);
      showNotification(`Category "${deleteTarget.name}" deleted.`);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-forest-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-sm font-medium border border-forest-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Manage Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, and organize store departments. Added categories appear across shop filters and the homepage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 rounded-lg text-sm font-medium border border-forest-200">
            <Sparkles className="w-4 h-4 text-forest-600" />
            <span>{categories.length} Categories</span>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const count = products.filter(
            (p) => p.category.toLowerCase() === category.id.toLowerCase()
          ).length;

          return (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-semibold text-lg drop-shadow-sm">{category.name}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full font-medium">
                      <Package className="w-3.5 h-3.5" />
                      {count} plants
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-sm text-gray-600 leading-relaxed min-h-[40px]">
                    {category.description}
                  </p>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span>
                      ID:{' '}
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono">
                        {category.id}
                      </code>
                    </span>
                    <Link
                      to={`/shop?category=${category.id}`}
                      target="_blank"
                      className="text-forest-700 hover:text-forest-800 font-medium inline-flex items-center gap-1"
                    >
                      <span>View in Shop</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(category)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteTarget(category)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-display">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {editingCategory
                  ? 'Update category information and cover photo'
                  : 'Add a new botanical department to your store catalogue'}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Bonsai Trees"
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-forest-600 focus:border-forest-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Category Slug / Identifier
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  disabled={Boolean(editingCategory)}
                  placeholder="e.g. bonsai-trees"
                  className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm font-mono text-gray-700 outline-none disabled:opacity-75"
                />
                <span className="text-[11px] text-gray-400 mt-0.5 block">
                  Used in URL filters: <code>/shop?category={id || '...'}</code>
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Short description shown to shoppers..."
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-forest-600 focus:border-forest-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Cover Photo URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-forest-600 focus:border-forest-600 outline-none"
                />

                {/* Quick Presets */}
                <div className="mt-2">
                  <span className="text-[11px] text-gray-500 block mb-1">Or choose a preset image:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setImage(preset.url)}
                        className="text-[11px] px-2.5 py-1 bg-gray-100 hover:bg-forest-50 hover:text-forest-700 rounded-lg text-gray-600 font-medium transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Live Preview */}
                {image && (
                  <div className="mt-3 relative h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=400&fit=crop';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      <span>Live Preview</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-sm font-semibold shadow-md transition-all"
                >
                  {editingCategory ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete "{deleteTarget.name}"?
            </h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Are you sure you want to remove this category? Products currently in this category will remain in your catalogue.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
