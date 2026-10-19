import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Address, Order, OrderStatus, OrderItem } from '../types';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/storage';
import { generateId } from '../utils/format';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface OrderContextValue {
  orders: Order[];
  createOrder: (items: CartItem[], address: Address, paymentMethod: string) => Order;
  getOrdersByUser: (userId: string) => Order[];
  getAllOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => Order | undefined;
}

/* ------------------------------------------------------------------ */
/*  Context & Provider                                                 */
/* ------------------------------------------------------------------ */

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []),
  );

  // Persist to localStorage on every change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  /* ---- Actions ---- */

  const createOrder = useCallback(
    (items: CartItem[], address: Address, paymentMethod: string): Order => {
      const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const shipping = subtotal >= 999 ? 0 : 99;
      const tax = Math.round(subtotal * 0.05);
      const total = subtotal + shipping + tax;

      const orderItems: OrderItem[] = items.map((ci) => ({
        productId: ci.product.id,
        productName: ci.product.name,
        productImage: ci.product.image,
        price: ci.product.price,
        quantity: ci.quantity,
      }));

      const newOrder: Order = {
        id: `ORD-${generateId().toUpperCase()}`,
        userId: address.userId ?? '',
        items: orderItems,
        address,
        paymentMethod,
        paymentStatus: 'completed',
        subtotal,
        shipping,
        tax,
        total,
        status: 'confirmed' as OrderStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    },
    [],
  );

  const getOrdersByUser = useCallback(
    (userId: string) => orders.filter((o) => o.userId === userId),
    [orders],
  );

  const getAllOrders = useCallback(() => orders, [orders]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status, updatedAt: new Date().toISOString() }
          : o,
      ),
    );
  }, []);

  const getOrder = useCallback(
    (orderId: string) => orders.find((o) => o.id === orderId),
    [orders],
  );

  const value: OrderContextValue = {
    orders,
    createOrder,
    getOrdersByUser,
    getAllOrders,
    updateOrderStatus,
    getOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

/**
 * Custom hook to access the OrderContext.
 * Throws if used outside of an OrderProvider.
 */
export function useOrders(): OrderContextValue {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
