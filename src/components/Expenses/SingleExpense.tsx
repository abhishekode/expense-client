import React from 'react';
import { IExpenses } from '@/common/Interfaces';
import BaseModal from '@/common/model';
import { MdOutlineCurrencyRupee } from 'react-icons/md';

interface ExpenseFormProps {
  isOpen: boolean;
  toggleModal: () => void;
  expenseData?: IExpenses;
}

const SingleExpense: React.FC<ExpenseFormProps> = ({
  isOpen,
  toggleModal,
  expenseData,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      toggleModal={toggleModal}
      heading={`Existing Expense`}
    >
      <div className="">
        <div className="mb-4 px-3 shadow-4 p-2 rounded">
          <div className="relative flex items-center justify-between">
            <img
              src={expenseData?.category.categoryImage}
              alt={expenseData?.category.name}
              className="h-20 w-20 rounded-full flex justify-center items-center object-cover border"
            />
            <p className="capitalize font-semibold">
              {expenseData?.category.name}
            </p>
          </div>
        </div>

        <div className="mb-4 shadow-3 p-2 rounded min-h-40">
          <label className="mb-2.5 block font-medium text-black">
            Description
          </label>
          <div className="relative">
            <pre>{expenseData?.description}</pre>
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2.5 font-medium text-black flex items-center justify-between">
            <h1>Total amount</h1>
            <span className="flex items-center font-extrabold">
              <MdOutlineCurrencyRupee />
              {expenseData?.amount}
            </span>
          </label>
        </div>
      </div>
    </BaseModal>
  );
};

export default SingleExpense;
