import SureDeleteTodo from 'components/alert/SureDeleteTodo';
import { ITodoTask, useTodo } from 'context/todoTaskContext';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

interface SingleTodoProps {
    todo: ITodoTask;
    todoIndex: number;
}
const SingleTodo: React.FC<SingleTodoProps> = ({ todo }) => {
    const [deleteTodo, setDeleteTodo] = useState<boolean>(false)
    const { updateTodoTask } = useTodo()

    const { completed, id, title } = todo;

    const toggleDeleteModal = () => {
        setDeleteTodo(!deleteTodo)
    }

    const handleCheckboxChange = (isChecked: boolean) => {
        const updatedTask = {
            completed: isChecked,
            id: id,
            title: title,
        };
    
        updateTodoTask(id, updatedTask);
    
        if (isChecked) {
            toast.success(`Task "${title}" completed :)`);
        } else {
            toast.warning(`Task "${title}" marked as incomplete.`);
        }
    };
    

    return (
        <>

            {deleteTodo && (
                <SureDeleteTodo
                    isOpen={deleteTodo}
                    toggleModel={toggleDeleteModal}
                    todoIndex={id}
                />
            )}
            <tr>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap capitalize">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => handleCheckboxChange(e.target.checked)}
                    />
                    {completed ? 'Completed' : 'Pending'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <button
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={toggleDeleteModal}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    )
}

export default SingleTodo