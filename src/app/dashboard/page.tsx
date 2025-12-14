import { SummaryCards } from '@/components/dashboard/summary-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { WeeklyTip } from '@/components/dashboard/weekly-tip';
import { TransactionChat } from '@/components/dashboard/transaction-chat';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { getTransactions, getUser, getSpendingSummary } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getUser();
  const transactions = await getTransactions();
  const spendingSummary = await getSpendingSummary();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const totalSpent = transactions
    .filter(tx => tx.date.getMonth() === currentMonth && tx.date.getFullYear() === currentYear)
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Column */}
      <div className="lg:col-span-2 grid gap-6 auto-rows-min">
        <SummaryCards totalSpent={totalSpent} monthlyGoal={user.monthlyGoal} />
        <SpendingChart data={spendingSummary} />
        <RecentTransactions transactions={transactions.slice(0, 5)} />
      </div>

      {/* Side Column */}
      <div className="lg:col-span-1 grid gap-6 auto-rows-min">
        <TransactionChat />
        <WeeklyTip />
      </div>
    </div>
  );
}
