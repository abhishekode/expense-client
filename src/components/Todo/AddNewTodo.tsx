
import CustomModal from 'components/common/Model';
import { ITodoTask, useTodo } from 'context/todoTaskContext';
import React, { useState } from 'react'


export interface TodoFormProps {
    isOpen: boolean;
    toggleModel: () => void;
    heading: string | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ isOpen, toggleModel, heading }) => {
    const { addTodoTask } = useTodo()


    const [state, setState] = useState<ITodoTask>({
        completed: false,
        id: 0,
        title: '',
    })
    const [errors, setErrors] = useState<Record<keyof ITodoTask, string>>({
        title: '',
        id: '',
        completed: '',
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' });
        setState({ ...state, [name]: value });
    };

    const validateForm = (): boolean => {
        const newErrors: Record<keyof ITodoTask, string> = { ...errors };

        Object.entries(state).forEach(([key, value]) => {
            if (typeof value === 'string' && value.trim() === '') {
                newErrors[key as keyof ITodoTask] = `${key} cannot be empty`;
            }
        });

        setErrors(newErrors);
        return Object.values(newErrors).some(error => error.trim() !== '');
    };

    const handleAddTodo = async (e: { preventDefault: () => void }) => {
        try {
            e.preventDefault()
            const hasErrors = validateForm();
            if (hasErrors) {
                return;
            }
            const randomId = Math.floor(Math.random() * 1000000);

            const newState = { ...state, id: randomId };
            addTodoTask(newState);
            toggleModel()
        } catch (error) {
            console.log('error', error)
        }
    }


    return (
        <div>
            <CustomModal heading={heading || 'Heading'} isOpen={isOpen} toggleModal={toggleModel}>
                <form className="max-w-sm mx-auto text-gray-800 py-10" onSubmit={handleAddTodo}>
                    <div className="mb-5">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium">Enter title</label>
                        <input
                            type="text"
                            id="title"
                            name='title'
                            className="border block w-full p-2.5"
                            placeholder="john"
                            autoComplete='none'
                            value={state.title}
                            onChange={handleInputChange}
                        />
                        {errors?.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-900 px-8 py-3 text-gray-100 rounded w-full">Submit</button>
                </form>
            </CustomModal>
        </div>
    )
}

export default TodoForm