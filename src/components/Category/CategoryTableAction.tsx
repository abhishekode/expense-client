import { ICategory } from '@/common/Interfaces';
import React from 'react';
import { LuClipboardEdit } from 'react-icons/lu';

interface CategoryTableActionProps {
  data: ICategory;
}

const CategoryTableAction: React.FC<CategoryTableActionProps> = ({ data }) => {
  const [goingToUpdate, setGoingToUpdate] = React.useState<boolean>(false);
  return (
    <div>
      <div className="flex p-2 gap-2">
        <button
          className="bg-gray-500 hover:bg-gray-700 font-bold rounded"
        //   onClick={toggleModal}
        >
          <LuClipboardEdit className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CategoryTableAction;
