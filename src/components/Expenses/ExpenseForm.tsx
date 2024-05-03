import { IExpenses } from '@/common/Interfaces';
import { CreateExpenseRequest } from '@/common/Interfaces/req.interface';
import BaseModal from '@/common/model';
import { useCategory } from '@/context/categoryContext';
import { ExpenseAPI } from '@/utils/api.method';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiCpu } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface ExpenseFormProps {
  isOpen: boolean;
  toggleModal: () => void;
  fetchExpenses: () => void;
  updateExpenseData?: IExpenses;
}
// CreateExpenseRequest
const ExpenseForm: React.FC<ExpenseFormProps> = ({
  isOpen,
  toggleModal,
  fetchExpenses,
  updateExpenseData,
}) => {
  const expenseId = updateExpenseData?._id;
  const { categories } = useCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateExpenseRequest>({
    defaultValues: updateExpenseData
      ? {
          amount: updateExpenseData.amount,
          category: updateExpenseData.category._id,
          description: updateExpenseData.description,
        }
      : {},
  });

  const onSubmit = async (data: CreateExpenseRequest) => {
    try {
      let res: any;
      console.log('data', data)
      if (expenseId) {
        res = await ExpenseAPI.updateExpense(expenseId, data);
      } else {
        res = await ExpenseAPI.createExpense(data);
      }
      if (res.status) {
        toast.success(`expense ${expenseId ? 'update' : 'add'} successfully`);
        fetchExpenses();
        toggleModal();
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      toggleModal={toggleModal}
      heading={expenseId ? `Update Existing Expense` : 'Add New Expense'}
    >
      <div className="px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black">
              Category
            </label>
            <div className="relative">
              <select
                {...register('category', { required: true })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Category</option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            {errors.category && (
              <div className="text-sm text-red-600">category is required</div>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black">
              Description
            </label>
            <div className="relative">
              <textarea
                cols={40}
                rows={10}
                {...register('description', { required: true })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter your full name"
              />
            </div>
            {errors.description && (
              <div className="text-sm text-red-600">
                Description is required
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black">
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter your full name"
                {...register('amount', { required: true })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              <span className="absolute right-4 top-4">
                <FiCpu className="text-2xl" />
              </span>
            </div>
            {errors.amount && (
              <div className="text-sm text-red-600">Amount is required</div>
            )}
          </div>

          <div className="mb-5">
            <input
              type="submit"
              value="Add New Expense"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ExpenseForm;
