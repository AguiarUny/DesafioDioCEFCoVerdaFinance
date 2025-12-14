'use server';

import { categorizeTransaction } from '@/ai/flows/categorize-transaction';
import { getPersonalizedWeeklyTip } from '@/ai/flows/personalized-weekly-tip';
import { addTransaction as saveTransaction, getSpendingSummary } from '@/lib/data';

export async function processUserMessage(message: string) {
  try {
    if (!message) {
      return { error: 'Mensagem não pode ser vazia.' };
    }

    // Workaround to extract amount, since the provided AI flow doesn't.
    const amountRegex = /(?:R\$\s*|de\s+)?(\d+(?:[.,]\d{1,2})?)/i;
    const amountMatch = message.match(amountRegex);
    const amount = amountMatch ? parseFloat(amountMatch[1].replace(',', '.')) : 0;

    if (amount === 0) {
      return { error: 'Não consegui identificar o valor. Tente incluir "R$ XX" ou "XX reais".' };
    }

    const result = await categorizeTransaction({ transactionText: message });
    
    return {
      amount,
      category: result.category,
      confidence: result.confidence,
    };
  } catch (e) {
    console.error(e);
    return { error: 'Não consegui entender sua mensagem. Tente algo como "Gastei R$50 em almoço".' };
  }
}

export async function getWeeklyTip() {
  try {
    const summaryData = await getSpendingSummary();
    const spendingSummary = summaryData
      .map(item => `${item.category}: R$${item.total.toFixed(2)}`)
      .join(', ');
    
    if (!spendingSummary) {
      return { tip: 'Comece a adicionar suas transações para receber dicas personalizadas!' };
    }

    const result = await getPersonalizedWeeklyTip({ userId: 'mock-user', spendingSummary });
    return { tip: result.tip };
  } catch (e) {
    console.error(e);
    return { error: 'Não foi possível gerar sua dica semanal.' };
  }
}

export async function confirmAndSaveTransaction(transaction: {
  amount: number;
  category: string;
  originalMessage: string;
}) {
  try {
    await saveTransaction(transaction);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: 'Erro ao salvar a transação.' };
  }
}
