import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import type { Transaction } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Utensils, Car, Home, Film, ShoppingBag, DollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const categoryDetails: { [key: string]: { icon: LucideIcon; colorVar: string; textColor: string } } = {
  Alimentação: { icon: Utensils, colorVar: 'hsl(var(--chart-1) / 0.1)', textColor: 'hsl(var(--chart-1))' },
  Transporte: { icon: Car, colorVar: 'hsl(var(--chart-2) / 0.1)', textColor: 'hsl(var(--chart-2))' },
  Moradia: { icon: Home, colorVar: 'hsl(var(--chart-3) / 0.1)', textColor: 'hsl(var(--chart-3))' },
  Lazer: { icon: Film, colorVar: 'hsl(var(--chart-4) / 0.1)', textColor: 'hsl(var(--chart-4))' },
  Compras: { icon: ShoppingBag, colorVar: 'hsl(var(--chart-5) / 0.1)', textColor: 'hsl(var(--chart-5))' },
  Default: { icon: DollarSign, colorVar: 'hsl(var(--muted))', textColor: 'hsl(var(--muted-foreground))' },
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
        <CardDescription>Suas últimas movimentações.</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <div className="space-y-6">
            {transactions.map((tx) => {
              const details = categoryDetails[tx.category] || categoryDetails.Default;
              const Icon = details.icon;
              return (
                <div key={tx.transactionId} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: details.colorVar, color: details.textColor }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-sm">{tx.subcategory || tx.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(tx.date, "dd 'de' MMM, yyyy", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="font-semibold text-right text-sm text-red-500 dark:text-red-400">- R$ {tx.amount.toFixed(2).replace('.', ',')}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Nenhuma transação recente.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
