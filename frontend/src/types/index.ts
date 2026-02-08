// ─── Enums ───────────────────────────────────────────────────────────────────

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER',
  ADMIN = 'ADMIN',
}

export enum OrderType {
  RETAIL = 'RETAIL',
  WHOLESALE = 'WHOLESALE',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum ShipmentStatus {
  PREPARING = 'PREPARING',
  SHIPPED = 'SHIPPED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
}

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  basePrice: number;
  wholesalePrice?: number;
  wholesaleMin?: number;
  images: string[];
  featured: boolean;
  active: boolean;
  supplierId: string;
  categoryId: string;
  category?: Category;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  size?: string;
  color?: string;
  material?: string;
  priceOffset: number;
  stock: number;
  active: boolean;
  productId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  total: number;
  notes?: string;
  userId: string;
  addressId: string;
  items?: OrderItem[];
  shipment?: Shipment;
  payment?: Payment;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  orderId: string;
  productId: string;
  variantId?: string;
  product?: Product;
  variant?: ProductVariant;
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  baseCost: number;
  perKgCost: number;
  estimatedDays: number;
}

export interface Shipment {
  id: string;
  status: ShipmentStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDate?: string;
  shippedDate?: string;
  deliveredDate?: string;
  orderId: string;
  shippingZoneId: string;
}

export interface Payment {
  id: string;
  status: PaymentStatus;
  method: string;
  amount: number;
  currency: string;
  transactionId?: string;
  confirmedById?: string;
  orderId: string;
}

// ─── API Response Types ──────────────────────────────────────────────────────

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ─── Client-Side Types ───────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}
