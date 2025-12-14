'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized weekly financial tips to users based on their spending habits.
 *
 * The flow analyzes the user's spending data and identifies areas where they can potentially reduce expenses.
 * It exports:
 * - `getPersonalizedWeeklyTip`: A function to trigger the flow and retrieve a personalized tip.
 * - `PersonalizedWeeklyTipInput`: The input type for the `getPersonalizedWeeklyTip` function.
 * - `PersonalizedWeeklyTipOutput`: The output type for the `getPersonalizedWeeklyTip` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedWeeklyTipInputSchema = z.object({
  userId: z.string().describe('The ID of the user to generate a tip for.'),
  spendingSummary: z
    .string()
    .describe(
      'A summary of the user\'s spending habits, including categories and amounts spent.'
    ),
});
export type PersonalizedWeeklyTipInput = z.infer<typeof PersonalizedWeeklyTipInputSchema>;

const PersonalizedWeeklyTipOutputSchema = z.object({
  tip: z.string().describe('A personalized financial tip for the user.'),
});
export type PersonalizedWeeklyTipOutput = z.infer<typeof PersonalizedWeeklyTipOutputSchema>;

export async function getPersonalizedWeeklyTip(
  input: PersonalizedWeeklyTipInput
): Promise<PersonalizedWeeklyTipOutput> {
  return personalizedWeeklyTipFlow(input);
}

const personalizedWeeklyTipPrompt = ai.definePrompt({
  name: 'personalizedWeeklyTipPrompt',
  input: {schema: PersonalizedWeeklyTipInputSchema},
  output: {schema: PersonalizedWeeklyTipOutputSchema},
  prompt: `You are a financial advisor providing personalized weekly tips to users based on their spending habits.

  Analyze the user's spending summary and identify areas where they can potentially reduce expenses.
  Provide a concise and actionable tip that the user can implement in the upcoming week.

  Spending Summary: {{{spendingSummary}}}

  Tip: `,
});

const personalizedWeeklyTipFlow = ai.defineFlow(
  {
    name: 'personalizedWeeklyTipFlow',
    inputSchema: PersonalizedWeeklyTipInputSchema,
    outputSchema: PersonalizedWeeklyTipOutputSchema,
  },
  async input => {
    const {output} = await personalizedWeeklyTipPrompt(input);
    return output!;
  }
);
