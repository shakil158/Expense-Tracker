import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ExpensesContextProvider } from './context/ExpensesContext';
import { AuthContextProvider } from './context/AuthContext';
import { ExpensesSummaryContextProvider } from './context/ExpensesSummaryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <ExpensesSummaryContextProvider>
        <ExpensesContextProvider>
          <App />
        </ExpensesContextProvider>
      </ExpensesSummaryContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);