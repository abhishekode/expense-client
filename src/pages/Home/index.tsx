import React, { useState } from "react";
import { useTodo } from "context/todoTaskContext";
import SingleTodo from "./SingleTodo";
import TodoForm from "components/Todo/AddNewTodo";
import { useExpense } from "context/expenseContext";

const Home = () => {
  const { todoTasks } = useTodo();
  const { expenses } = useExpense();
  const [newTodoAdding, setNewTodoAdding] = useState<boolean>(false);

  const toggleModal = () => {
    setNewTodoAdding(!newTodoAdding);
  };
  console.log("categories", expenses);

  const columns = ["Completed", "Id", "Title", "Actions"];
  return (
    <div>
      {newTodoAdding && (
        <TodoForm
          heading={"Add New task"}
          isOpen={newTodoAdding}
          toggleModel={toggleModal}
        />
      )}
      <div className="max-w-7xl mx-auto px-2">
        <nav className="flex flex-wrap items-center text-base font-bold justify-end">
          <p className="hover:text-gray-900  border px-4 py-2 rounded-md">
            <button onClick={toggleModal}>Add New Task</button>
          </p>
        </nav>
        <div className="mt-12 border max-w-7xl mx-auto overflow-x-scroll rounded-md">
          {todoTasks?.length > 0 ? (
            <table className="w-full table-auto text-sm text-left border">
              <thead className="bg-gray-50 text-gray-700 font-bold border-b text-base">
                <tr>
                  {columns.map((col) => (
                    <th scope="col" className="px-6 py-3" key={col}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {todoTasks.map((todo, index: number) => (
                  <SingleTodo todo={todo} key={index} todoIndex={index} />
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p className="py-5 text-center">No booking found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
