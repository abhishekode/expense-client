import { GetAllExpensesResponse, QueryExpenseRequest } from 'Interfaces/auth.api';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getAllExpenses } from 'utils/api.method';

// Define the type for the expense context
interface ExpenseContextType {
  expenses: GetAllExpensesResponse | undefined;
  fetchExpenses: (query: QueryExpenseRequest) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<GetAllExpensesResponse | undefined>({count: 0, expenses: []});

  const fetchExpenses = async (query: QueryExpenseRequest) => {
    try {
      const res = await getAllExpenses(query);
      if (res.status) {
        setExpenses(res.data.result);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // useEffect(() => {
  //   // Fetch expenses when the component mounts
  //   fetchExpenses({
  //     page: 1,
  //     size: 10
  //   });
  // }, []);

  return (
    <ExpenseContext.Provider value={{ expenses, fetchExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
