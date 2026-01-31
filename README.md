# Simple Budget Tracker

A responsive web application that allows users to track income and expenses, categorize transactions, and view real-time summary totals. Data is stored locally using `localStorage` so information persists across page reloads.

---

## Project Overview
This project focuses on building a practical budgeting tool using vanilla JavaScript. It demonstrates state management, DOM manipulation, and data persistence without relying on external frameworks.

---

## Final Features
- Add income and expense transactions
- Transaction form with:
  - Amount input
  - Transaction type (Income / Expense)
  - Category selection (dynamic based on type)
  - Optional description
- Categorized transaction list
- Real-time summary totals:
  - Total Income
  - Total Expenses
  - Current Balance
- Persistent data storage using `localStorage`
- Delete individual transactions
- Responsive layout for desktop and mobile devices

---

## How It Works
1. User enters transaction details in the **Transaction Form**
2. Transaction is added to the list and stored in `localStorage`
3. Totals are recalculated instantly
4. On page reload, stored transactions are restored automatically
5. Users can remove transactions, which updates both UI and storage

---

## Technologies Used
| Technology | Purpose |
|---------|--------|
| HTML | Semantic structure and forms |
| CSS | Styling and responsive layout |
| JavaScript | DOM manipulation, calculations, state handling |
| localStorage | Data persistence |

---

## Data Structure Example
```js
{
  id: 170000001,
  type: "expense",
  category: "Food & Dining",
  amount: 250,
  description: "Lunch"
}
