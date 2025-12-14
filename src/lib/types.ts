export type User = {
  userId: string;
  name: string;
  monthlyGoal: number;
  currency: 'BRL';
  createdAt: Date;
  notificationTime: string;
  avatarUrl: string;
};

export type Transaction = {
  transactionId: string;
  userId: string;
  amount: number;
  category: string;
  subcategory?: string;
  date: Date;
  originalMessage: string;
  confirmed: boolean;
  createdAt: Date;
  nlpConfidence: number;
};
