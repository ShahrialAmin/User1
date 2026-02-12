// Global Enums
export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

// Common Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  walletBalance: number;
}

export interface Product {
  id: string;
  title: string; // Changed from name to title to match StorePage usage
  category: string;
  image: string;
  publisher: string;
  rating: number;
  priceStart?: string;
  isHot?: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  title: string;
  products: Product[];
}

export interface OrderFormData {
  productId: string;
  packageId: number;
  paymentMethod: 'wallet' | 'instant';
  playerId: string;
  quantity: number;
}

export interface CartItem {
  id: string; // Unique ID (usually productID + packageID)
  productId: string;
  productTitle: string;
  productImage: string;
  packageId: number;
  packageName: string;
  price: number;
  quantity: number;
  playerId?: string;
}