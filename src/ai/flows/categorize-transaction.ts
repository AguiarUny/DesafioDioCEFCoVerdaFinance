// src/ai/flows/categorize-transaction.ts
'use server';

/**
 * @fileOverview A transaction categorization AI agent.
 *
 * - categorizeTransaction - A function that handles the transaction categorization process.
 * - CategorizeTransactionInput - The input type for the categorizeTransaction function.
 * - CategorizeTransactionOutput - The return type for the categorizeTransaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeTransactionInputSchema = z.object({
  transactionText: z
    .string()
    .describe('The text of the transaction to categorize, e.g. \'Bought coffee for $5 at Starbucks\'.'),
});
export type CategorizeTransactionInput = z.infer<typeof CategorizeTransactionInputSchema>;

const CategorizeTransactionOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of the transaction, e.g. \'Food and Drink\', \'Transportation\', \'Entertainment\', etc.'
    ),
  confidence: z
    .number()
    .describe('The confidence level of the categorization, between 0 and 1.'),
});
export type CategorizeTransactionOutput = z.infer<typeof CategorizeTransactionOutputSchema>;

export async function categorizeTransaction(input: CategorizeTransactionInput): Promise<CategorizeTransactionOutput> {
  return categorizeTransactionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeTransactionPrompt',
  input: {schema: CategorizeTransactionInputSchema},
  output: {schema: CategorizeTransactionOutputSchema},
  prompt: `You are a personal finance expert.  Your job is to categorize transactions into categories such as Food and Drink, Transportation, Entertainment, etc.

Transaction text: {{{transactionText}}}

Please respond with ONLY the JSON. Do not include any other text. The confidence score should be high, close to 1, if you are very confident in the categorization.  Otherwise it should be lower.
`,
});

const categorizeTransactionFlow = ai.defineFlow(
  {
    name: 'categorizeTransactionFlow',
    inputSchema: CategorizeTransactionInputSchema,
    outputSchema: CategorizeTransactionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
