export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: number;
  productId: number;
  productName: string;
  price: number;
  orderDate: string;      // ISO string o formattata
  deliveryDate: string;   // ISO string o formattata
  userId: number;
}
