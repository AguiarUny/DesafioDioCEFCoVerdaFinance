import type { Transaction, User } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-caio');

export const mockUser: User = {
  userId: 'user-caio-123',
  name: 'Caio',
  monthlyGoal: 500,
  currency: 'BRL',
  createdAt: new Date('2023-10-01T09:00:00Z'),
  notificationTime: '09:00',
  avatarUrl: userAvatar?.imageUrl || 'https://picsum.photos/seed/101/100/100',
};

// Mutable array to simulate a database
export let mockTransactions: Transaction[] = [
  {
    transactionId: 't1',
    userId: 'user-caio-123',
    amount: 15.5,
    category: 'Alimentação',
    subcategory: 'Café',
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    originalMessage: 'Comprei um café e pão de queijo por 15.50',
    confirmed: true,
    createdAt: new Date(),
    nlpConfidence: 0.98,
  },
  {
    transactionId: 't2',
    userId: 'user-caio-123',
    amount: 80.0,
    category: 'Transporte',
    subcategory: 'Uber',
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    originalMessage: 'Uber pra casa R$80',
    confirmed: true,
    createdAt: new Date(),
    nlpConfidence: 0.95,
  },
  {
    transactionId: 't3',
    userId: 'user-caio-123',
    amount: 200.0,
    category: 'Moradia',
    subcategory: 'Conta de luz',
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    originalMessage: 'paguei conta de luz de 200 reais',
    confirmed: true,
    createdAt: new Date(),
    nlpConfidence: 0.99,
  },
  {
    transactionId: 't4',
    userId: 'user-caio-123',
    amount: 120.0,
    category: 'Lazer',
    subcategory: 'Restaurante',
    date: new Date(new Date().setDate(new Date().getDate() - 4)),
    originalMessage: 'Jantar com amigos R$120',
    confirmed: true,
    createdAt: new Date(),
    nlpConfidence: 0.92,
  },
    {
    transactionId: 't5',
    userId: 'user-caio-123',
    amount: 55.0,
    category: 'Compras',
    subcategory: 'Supermercado',
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    originalMessage: 'compras no supermercado por 55',
    confirmed: true,
    createdAt: new Date(),
    nlpConfidence: 0.96,
  },
];

export async function getUser(): Promise<User> {
  return Promise.resolve(mockUser);
}

export async function getTransactions(): Promise<Transaction[]> {
  return Promise.resolve(mockTransactions.sort((a, b) => b.date.getTime() - a.date.getTime()));
}

export async function getSpendingSummary(): Promise<{ category: string; total: number }[]> {
  const summary: { [key: string]: number } = {};
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  mockTransactions
    .filter(tx => tx.date.getMonth() === currentMonth && tx.date.getFullYear() === currentYear)
    .forEach(tx => {
        if (summary[tx.category]) {
        summary[tx.category] += tx.amount;
        } else {
        summary[tx.category] = tx.amount;
        }
    });

  return Promise.resolve(
    Object.entries(summary).map(([category, total]) => ({ category, total: parseFloat(total.toFixed(2)) }))
      .sort((a,b) => b.total - a.total)
  );
}

export async function addTransaction(txData: {amount: number, category: string, originalMessage: string, subcategory?: string}): Promise<Transaction> {
  const newTransaction: Transaction = {
    transactionId: `t${Date.now()}`,
    userId: mockUser.userId,
    amount: txData.amount,
    category: txData.category,
    subcategory: txData.subcategory,
    date: new Date(),
    originalMessage: txData.originalMessage,
    confirmed: true,
    createdAt: new Date(),
    nlpConfidence: 0.95, // mock confidence
  };
  
  mockTransactions.unshift(newTransaction);
  return Promise.resolve(newTransaction);
}
