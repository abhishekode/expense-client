import React from 'react';
import { IExpenses } from '@/common/Interfaces';
import ExpenseForm from './ExpenseForm';
import { LuClipboardEdit } from 'react-icons/lu';
import SingleExpense from './SingleExpense';
import { MdGridView } from 'react-icons/md';

interface ExpenseTableActionProps {
  data: IExpenses;
  fetchExpenses: () => void;
}

const ExpenseTableAction: React.FC<ExpenseTableActionProps> = ({
  data,
  fetchExpenses,
}) => {
  const [isEditExpense, setIsEditExpense] = React.useState<boolean>(false);
  const [viewDetails, setViewDetails] = React.useState(false);

  const toggleModal = () => {
    setIsEditExpense(!isEditExpense);
  };

  const toggleViewExpense = () => {
    setViewDetails(!viewDetails);
  };

  return (
    <div>
      {isEditExpense && (
        <ExpenseForm
          isOpen={isEditExpense}
          toggleModal={toggleModal}
          fetchExpenses={fetchExpenses}
          updateExpenseData={data}
        />
      )}
      {viewDetails && (
        <SingleExpense
          isOpen={viewDetails}
          toggleModal={toggleViewExpense}
          expenseData={data}
        />
      )}
      <div className="flex p-2 gap-2">
        <button
          className="bg-gray-500 hover:bg-gray-700 font-bold rounded"
          onClick={toggleModal}
        >
          <LuClipboardEdit className="text-xl" />
        </button>
        <button
          className="hover:bg-red-100 font-bold rounded"
          onClick={toggleViewExpense}
        >
          <MdGridView className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ExpenseTableAction;
