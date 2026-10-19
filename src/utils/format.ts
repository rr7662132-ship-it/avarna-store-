/**
 * Formatting and display utility functions.
 */

import { OrderStatus } from '../types';

/**
 * Format a price in Indian Rupees with Indian numbering system (e.g., ₹1,299).
 */
export function formatPrice(price: number): string {
  return '₹' + price.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}

/**
 * Format a date string as DD MMM YYYY (e.g., 19 Oct 2026).
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Generate a unique ID string.
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Truncate text to a maximum length, appending ellipsis if truncated.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trimEnd() + '…';
}

/**
 * Return Tailwind CSS color classes for a given order status.
 */
export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-indigo-100 text-indigo-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Return a human-readable label for a given order status.
 */
export function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'confirmed':
      return 'Confirmed';
    case 'shipped':
      return 'Shipped';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
}
