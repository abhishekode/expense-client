import React from 'react';
import { ICategory } from '@/common/Interfaces';
import CategoryTableAction from '@/components/Category/CategoryTableAction';
import { useCategory } from '@/context/categoryContext';
import dayjs from 'dayjs';
import { AgGridReact } from 'ag-grid-react';
import DefaultLayout from '@/common/layout/DefaultLayout';

const CategoryList = () => {
  const { categories } = useCategory();

  const colDefs: any = [
    {
      field: 'categoryImage',
      headerName: 'Image',
      flex: 1,
      sortable: true,
      cellRenderer: (params: { data: ICategory }) => {
        console.log('params', params)
        return (
          <img
            src={params.data.categoryImage}
            alt={params.data.name}
            className="h-20 w-20 object-cover"
          />
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Added On',
      flex: 2,
      sortable: true,
      valueGetter: (params: { data: ICategory }) => {
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
      cellRenderer: (params: { data: ICategory }) => {
        return <CategoryTableAction data={params.data} />;
      },
    },
  ];

  return (
    <DefaultLayout>
      <div>
        <div className="w-full h-full">
          <div className="ag-theme-quartz-dark h-[500px]">
            <AgGridReact
              className="w-full"
              rowData={categories}
              columnDefs={colDefs}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CategoryList;
