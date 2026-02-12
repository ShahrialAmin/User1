import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const items = get().items;
        // Create a unique composite ID based on product, package, and playerID (if specific to player)
        const compositeId = `${newItem.productId}-${newItem.packageId}-${newItem.playerId || 'general'}`;
        
        const existingItem = items.find((item) => item.id === compositeId);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === compositeId
                ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, 10) }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...newItem, id: compositeId }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, delta) => {
        set({
          items: get().items.map((item) => {
            if (item.id === id) {
              const newQuantity = item.quantity + delta;
              return { ...item, quantity: Math.max(1, Math.min(newQuantity, 10)) }; // Limit 1-10
            }
            return item;
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);