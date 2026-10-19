# AVARNA Plant Store 🌿

> **"Bring Nature Home"**  
> A modern, premium botanical e-commerce web application crafted with React 18, TypeScript, and Tailwind CSS. Built with clean modular architecture and ready to connect with persistent backends (Firebase / Supabase) and a future native Android application.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher) & **npm** (or yarn / pnpm)

### 2. Installation
Open your terminal in the project directory:
```bash
cd "C:\Users\Rakshitha C M\.gemini\antigravity\scratch\avarna-plant-store"
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🔐 Credentials & Access

### Admin Dashboard
- **URL**: `/admin` (or click "Admin Dashboard" in the user dropdown menu)
- **Email**: `admin@avarna.com`
- **Password**: `admin123`
*(Pre-seeded in local authentication state; you can change this at any time in `src/contexts/AuthContext.tsx` or swap for production Firebase/Supabase Auth).*

### Customer Accounts
- You can register any new customer account directly via `/register`.
- Instant session login, profile management, and address book saved across page reloads via `localStorage`.

---

## 🌟 Key Features Implemented

### 1. Design & Branding
- **Botanical Color Palette**: Forest Green (`#224722`), Sage (`#788b65`), and warm Cream tones (`#fefdf8`).
- **Typography**: Editorial serif headings with *Playfair Display* paired with clean *Inter* UI body typography.
- **Botanical Leaf Logo**: Vector SVG brand leaf emblem in navbar, footer, and favicon.

### 2. Customer Experience & Homepage
- **Hero Banner**: "Bring Nature Home" with call-to-actions, plant photography, and responsive badges.
- **Featured Plants & Bestsellers**: Live curated catalogues with rating stars, sale discounts, and stock status.
- **Shop by Category**: 7 botanical categories:
  - Indoor Plants
  - Outdoor Plants
  - Flowering Plants
  - Succulents & Cacti
  - Air-Purifying Plants
  - Low-Maintenance Plants
  - Pots & Accessories
- **Plant Care Tips**: Horticultural guides on light, moisture, and pet safety.
- **Customer Reviews**: Testimonial showcase with demo disclaimer.
- **Newsletter Subscription**: Instant newsletter subscription with confirmation alerts.

### 3. Shopping Catalogue & Filters (`/shop`)
- **Live Search**: Debounced instant query suggestions with thumbnails and product titles.
- **Multi-faceted Filtering**:
  - Filter by Category
  - Filter by Price Bracket (Under ₹300, ₹300–₹600, ₹600–₹1000, Over ₹1000)
  - Filter by Care Difficulty (Easy, Moderate, Expert)
  - Filter by Sunlight requirements
  - In-stock only filter
- **Dynamic Sorting**: By Popularity, Price (Low to High, High to Low), Newest, and Rating.
- **Indian Rupee (₹) Pricing**: Formatted according to the Indian numerical system (e.g. `₹1,299`).
- **Plant Care Attributes**: Direct Sunlight, Bright Indirect, Watering frequency, Pet-friendly, Air-purifying badges.

### 4. Cart, Wishlist & Checkout
- **Cart Management**: Add, remove, update quantities, real-time calculations.
- **Free Shipping Threshold**: Free delivery on orders over ₹999 (otherwise flat ₹99) with live progress bar.
- **Tax Calculation**: 5% GST calculation.
- **Wishlist**: Toggle products, move items directly into cart, state persistence.
- **Interactive Checkout Flow**:
  1. Delivery Address Selection & New Address Form
  2. Demo Payment (Cash on Delivery, UPI, Cards) with transparent demo disclaimer banner
  3. Order Confirmation with Order ID and tracking redirect
- **Order Tracking & History (`/orders`)**: Complete order timeline with statuses (`confirmed`, `processing`, `shipped`, `delivered`).

### 5. Dedicated Admin Dashboard (`/admin`)
- **Dashboard Overview**: Metrics for Total Products, Total Orders, Total Revenue (₹), and Low Stock alerts.
- **Product Management (`/admin/products`)**:
  - Add new plants with comprehensive botanical metadata.
  - Edit existing plants, change prices, update plant photographs, adjust stock quantities.
  - Delete products with safe confirmation modal.
  - Filter by category and instant search within inventory.
- **Order Management (`/admin/orders`)**:
  - View all customer orders.
  - Change and update order fulfillment statuses.
- **Category Overview (`/admin/categories`)**:
  - Live category registry with active inventory counts.

---

## 📱 Mobile App (Android) & Backend Architecture

The application is structured with clean repository boundaries so a native **Android (Kotlin/Jetpack Compose)** or **Flutter/React Native** application can connect to the exact same database:

```
                    ┌───────────────────────────┐
                    │      AVARNA DATABASE      │
                    │   (Firebase / Supabase)   │
                    └─────────────┬─────────────┘
                                  │
                 ┌────────────────┴────────────────┐
                 │                                 │
                 ▼                                 ▼
       ┌────────────────────┐            ┌────────────────────┐
       │   React Web App    │            │ Native Android App │
       │ (Customer & Admin) │            │  (Jetpack Compose) │
       └────────────────────┘            └────────────────────┘
```

### Schema & Entity Contracts
All interfaces in [`src/types/index.ts`](./src/types/index.ts) define strict models:
- `Product`: Authoritative product attributes, pricing (in ₹), stock count, care requirements, and image URLs.
- `Order` & `OrderItem`: Order items, calculated taxes, delivery addresses, and fulfillment timeline.
- `User` & `Address`: Customer profiles and delivery addresses.

### Steps to Connect Firebase or Supabase:
1. **Firebase**:
   - Create a Firebase project.
   - Replace the `loadFromStorage`/`saveToStorage` calls in `src/contexts/ProductContext.tsx` and `OrderContext.tsx` with Firestore `collection('products')` and `collection('orders')`.
2. **Supabase**:
   - Create tables `products`, `orders`, `profiles` matching the TypeScript schema.
   - Use the Supabase JS SDK (`@supabase/supabase-js`) in the contexts.
3. **Android Client**:
   - Connect the Android app using the standard Firebase Android SDK or Supabase Kotlin SDK to the identical collections/tables.
