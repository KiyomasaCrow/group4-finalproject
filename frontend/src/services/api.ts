import type { Product, User, Order } from '@/types/models';

// Dati di esempio (mock)
const productsMock: Product[] = [
  { id: 1, name: 'Prodotto A', description: 'Descrizione A', price: 10, available: true },
  { id: 2, name: 'Prodotto B', description: 'Descrizione B', price: 20, available: false },
];

const usersMock: User[] = [
  { id: 1, fullName: 'Mario Rossi', email: 'mario.rossi@example.com', phone: '1234567890', address: 'Via Roma 1' },
  { id: 2, fullName: 'Luca Bianchi', email: 'luca.bianchi@example.com', phone: '0987654321', address: 'Via Milano 2' },
];

const ordersMock: Order[] = [
  { id: 1, productId: 1, productName: 'Prodotto A', price: 10, orderDate: '2025-07-01', deliveryDate: '2025-07-05', userId: 1 },
  { id: 2, productId: 2, productName: 'Prodotto B', price: 20, orderDate: '2025-07-10', deliveryDate: '2025-07-15', userId: 1 },
];

// Funzioni async per simulare chiamate API
export async function fetchProducts(): Promise<Product[]> {
  return new Promise(resolve => setTimeout(() => resolve(productsMock), 300));
}

export async function fetchUsers(): Promise<User[]> {
  return new Promise(resolve => setTimeout(() => resolve(usersMock), 300));
}

export async function fetchUserById(id: number): Promise<User | null> {
  return new Promise(resolve => {
    const user = usersMock.find(u => u.id === id) || null;
    setTimeout(() => resolve(user), 300);
  });
}

export async function fetchUserOrders(userId: number): Promise<Order[]> {
  return new Promise(resolve => {
    const orders = ordersMock.filter(o => o.userId === userId);
    setTimeout(() => resolve(orders), 300);
  });
}
