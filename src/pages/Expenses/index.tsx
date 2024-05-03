import { IExpenses } from '@/common/Interfaces';
import {
  GetAllExpensesResponse,
  QueryExpenseRequest,
} from '@/common/Interfaces/req.interface';
import DefaultLayout from '@/common/layout/DefaultLayout';
import { ExpenseAPI } from '@/utils/api.method';
import React from 'react';
import { toast } from 'react-toastify';
import { AgGridReact } from 'ag-grid-react';
import ExpenseForm from '@/components/Expenses/ExpenseForm';
import ExpenseTableAction from '@/components/Expenses/ExpenseTableAction';
import { FaPlus } from 'react-icons/fa6';
import dayjs from 'dayjs'

const Expenses = () => {
  const [data, setData] = React.useState<GetAllExpensesResponse>({
    count: 0,
    expenses: [],
    totalPrice: 0,
  });
  const [openExpenseForm, setOpenExpenseForm] = React.useState(false);

  const fetchUserExpenses = async (query?: QueryExpenseRequest) => {
    try {
      const res = await ExpenseAPI.getAllExpenses(query);
      if (res.status) {
        setData(res.result);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    fetchUserExpenses();
  }, []);

  const colDefs: any = [
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      sortable: true,
      valueGetter: (params: { data: IExpenses }) =>
        `${params.data.category.name}`,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Added On',
      flex: 2,
      sortable: true,
      valueGetter: (params: { data: IExpenses }) => {
        const createdAt = params.data.createdAt;
        if (createdAt) {
          return dayjs(createdAt).format('DD-MM-YYYY HH:mm:ss A');
        }
        return '';
      },
    },
    {
      field: 'buttons',
      flex: 1,
      filter: true,
      cellRenderer: (params: { data: IExpenses }) => {
        return (
          <ExpenseTableAction
            data={params.data}
            fetchExpenses={fetchUserExpenses}
          />
        );
      },
    },
  ];

  const toggleModal = () => {
    setOpenExpenseForm(!openExpenseForm);
  };

  return (
    <DefaultLayout>
      <div className="">
        {openExpenseForm && (
          <ExpenseForm
            isOpen={openExpenseForm}
            toggleModal={toggleModal}
            fetchExpenses={fetchUserExpenses}
          />
        )}
        <div className="flex justify-end">
          <button
            onClick={toggleModal}
            className="flex items-center gap-2 mb-6 text-xl font-semibold text-black dark:text-white text-right border px-2 py-1 rounded"
          >
            <FaPlus /> expense
          </button>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="ag-theme-quartz-dark h-[500px]">
          <AgGridReact
            className="w-full"
            rowData={data.expenses}
            columnDefs={colDefs}
          />
        </div>
        <div className="flex justify-between items-center border py-4 px-2 rounded-md mt-1">
          <span className='text-xl font-semibold'>Total Price: {data.totalPrice}</span>
          {/* Add pagination controls */}
          <div className="flex gap-5 items-center">
            <button>Prev</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Expenses;
