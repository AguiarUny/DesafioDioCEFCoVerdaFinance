import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, PiggyBank } from 'lucide-react';

interface SummaryCardsProps {
  totalSpent: number;
  monthlyGoal: number;
}

export function SummaryCards({ totalSpent, monthlyGoal }: SummaryCardsProps) {
    const dailySuggestion = monthlyGoal / 30;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Gasto (Mês)</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">R$ {totalSpent.toFixed(2).replace('.', ',')}</div>
                    <p className="text-xs text-muted-foreground">
                        -11.5% em relação ao mês passado
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Meta de Economia Mensal</CardTitle>
                    <PiggyBank className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">R$ {monthlyGoal.toFixed(2).replace('.', ',')}</div>
                    <p className="text-xs text-muted-foreground">
                        Sugestão: economize R$ {dailySuggestion.toFixed(2).replace('.', ',')} por dia
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
