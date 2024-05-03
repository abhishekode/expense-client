import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import styles
import './static/css/style.css';
import './static/css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import App from './App';
import { UserProvider } from './context/userContext';
import { ToastContainer } from 'react-toastify';
import { CategoryProvider } from './context/categoryContext';
import { ExpenseProvider } from './context/expenseContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <CategoryProvider>
          <ExpenseProvider>
            <ToastContainer
              progressClassName="toastProgress"
              position="top-center"
            />
            <App />
          </ExpenseProvider>
        </CategoryProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
);
