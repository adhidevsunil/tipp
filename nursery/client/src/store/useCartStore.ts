import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // Product ID
  name: string;
  price: number;
  image: string;
  qty: number;
  stock: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (item) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((x) => x.id === item.id);
        
        if (existingItem) {
          set({
            cartItems: cartItems.map((x) =>
              x.id === item.id ? { ...x, qty: x.qty + item.qty } : x
            ),
          });
        } else {
          set({ cartItems: [...cartItems, item] });
        }
      },
      
      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((x) => x.id !== id),
        });
      },
      
      updateQuantity: (id, qty) => {
        set({
          cartItems: get().cartItems.map((x) =>
            x.id === id ? { ...x, qty } : x
          ),
        });
      },
      
      clearCart: () => set({ cartItems: [] }),
      
      getCartTotal: () => {
        return get().cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      },
    }),
    {
      name: 'nursery-cart-storage',
    }
  )
);
