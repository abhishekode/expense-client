import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

export interface ITodoTask {
    id: number;
    title: string;
    completed: boolean;
}

interface ITodoContext {
    todoTasks: ITodoTask[];
    addTodoTask: (task: ITodoTask) => void;
    updateTodoTask: (id: number, updatedTask: ITodoTask) => void;
    removeTodoTask: (id: number) => void;
}

const TodoContext = createContext<ITodoContext | undefined>(undefined);

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [todoTasks, setTodoTasks] = useState<ITodoTask[]>([]);
    const storageKey = 'todoTasks';

    useEffect(() => {
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (tasksFromLocalStorage.length > 0) {
            setTodoTasks(tasksFromLocalStorage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(todoTasks));
    }, [todoTasks]);

    const updateTodoTask = (id: number, updatedTask: ITodoTask) => {
        setTodoTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task => task.id === id ? { ...task, ...updatedTask } : task);
            return updatedTasks;
        });
    };

    const removeTodoTask = (id: number) => {
        setTodoTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const addTodoTask = (task: ITodoTask) => {
        const taskExists = todoTasks.some(existingTask => existingTask.title === task.title);
        if (taskExists) {
            toast.error(`Task "${task.title}" already exists!`);
            return;
        }
        setTodoTasks(prevTasks => [...prevTasks, task]);
        toast.success(`Task "${task.title}" added successfully!`);
    };

    return (
        <TodoContext.Provider
            value={{
                todoTasks,
                addTodoTask,
                updateTodoTask,
                removeTodoTask,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = (): ITodoContext => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};
