import React from "react";
import Layout from "components/layout";
import { ToastContainer } from "react-toastify";
import { TodoProvider } from "context/todoTaskContext";
import { UserProvider } from "context/userContext";
import { CategoryProvider } from "context/categoryContext";
import { ExpenseProvider } from "context/expenseContext";

const App = () => (
  <TodoProvider>
    <UserProvider>
      <CategoryProvider>
        <ExpenseProvider>
          <ToastContainer
            progressClassName="toastProgress"
            position="top-center"
          />
          <Layout />
        </ExpenseProvider>
      </CategoryProvider>
    </UserProvider>
  </TodoProvider>
);

export default App;
