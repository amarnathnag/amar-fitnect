
export interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image_urls: string[];
    stock_quantity: number;
  };
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  loading: boolean;
  cartTotal: number;
  cartCount: number;
}

export interface CartActions {
  addToCart: (product: any) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export type UseCartReturn = CartState & CartActions;
