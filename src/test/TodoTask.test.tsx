/* eslint-disable react/display-name */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import TodoForm from 'components/Todo/AddNewTodo';
import { TodoProvider } from 'context/todoTaskContext';
import Home from 'pages/Home';


describe('TodoForm Component', () => {

  it('should add a task when submitted with a title', () => {
    const titleToSelect = 'Learn React';
    const { getByLabelText, getByText, getByRole, queryByText } = render(<TodoProvider><Home /></TodoProvider>);
    const newTaskButton = getByRole("button", { name: 'Add New Task' })
    fireEvent.click(newTaskButton)

    const input = getByLabelText('Enter title') as HTMLInputElement;
    fireEvent.change(input, { target: { value: titleToSelect } });
    fireEvent.click(getByText('Submit'));

    const todoItem = getByText(titleToSelect);

    expect(todoItem).toBeDefined()

    const checkbox = todoItem?.closest?.('tr')?.querySelector('input[type="checkbox"]') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    const deleteBtn = todoItem?.closest?.('tr')?.querySelector("button") as HTMLButtonElement;
    fireEvent.click(deleteBtn);

    const deleteModal = getByText("Yes, I'm sure");
    fireEvent.click(deleteModal);

    expect(queryByText(titleToSelect)).not.toBeInTheDocument();


  });

});
