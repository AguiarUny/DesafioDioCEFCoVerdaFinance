# **App Name**: ConVersa Finance

## Core Features:

- Transaction Logging via Chat: Users can log transactions by typing them in natural language. The system extracts the amount, category, and date. Relies on the NLP tool to properly interpret the input and categorize the transaction with a degree of confidence.
- Transaction Confirmation/Correction: The system displays the interpreted transaction for confirmation, with options to correct the amount or category.
- Automatic Categorization: The system automatically categorizes transactions (Utilidades, Alimentação, etc.) based on the message content. The confidence level should be high.
- Financial Summary: Provides a summary of total expenses, main categories, and comparison with the previous month.
- Simple Financial Goal Setting: Allows users to set a financial goal, calculates a suggested daily savings amount, and notifies progress weekly.
- Personalized Weekly Tips: Provides personalized weekly financial tips, such as reducing spending in a particular category. Relies on the NLP tool to properly suggest categories based on the spending data.
- Firestore Integration: Store all the financial data into Firestore collections. This data includes users, transactions, and NLP training phrases.

## Style Guidelines:

- Primary color: Deep sky blue (#3498DB) for a clean and trustworthy feel.
- Background color: Very light blue (#EBF5FB) for a calm and airy interface.
- Accent color: Orange (#F39C12) for highlights and calls to action.
- Body and headline font: 'PT Sans', a humanist sans-serif with a little warmth or personality, suitable for headlines or body text
- Use simple and clean icons related to finance, such as money, graphs, and wallets.
- Subtle animations and transitions to enhance user experience when navigating and logging transactions.
- The primary layout will use cards, and lists. Use white space effectively to maintain a modern, uncluttered layout.