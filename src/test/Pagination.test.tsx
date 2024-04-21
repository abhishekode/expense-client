import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from 'components/Pagination';

describe('Pagination Component', () => {


    it('should navigate to page 5', () => {
        const { getByText, getByRole } = render(<Pagination itemsPerPage={10} items={Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`)} />);
        const nextButton = getByRole("button", { name: 'Next' })
        fireEvent.click(nextButton)
        fireEvent.click(nextButton)
        const pressFiveButton = getByRole("button", { name: '5' })
        fireEvent.click(pressFiveButton)
        expect(getByText('5')).toHaveProperty("className", 'p-2 mx-1 bg-blue-500 text-white rounded');
    });

    it('should navigate to the Next page', () => {
        const { getByText, getByRole } = render(<Pagination itemsPerPage={10} items={Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`)} />);
        const pressFiveButton = getByRole("button", { name: 'Next' })
        fireEvent.click(pressFiveButton)
        expect(getByText('2')).toHaveProperty("className", 'p-2 mx-1 bg-blue-500 text-white rounded');
    });

    it('should navigate to the Previous page', () => {
        const { getByText, getByRole } = render(<Pagination itemsPerPage={10} items={Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`)} />);
        const pressNextButton = getByRole("button", { name: 'Next' })
        const pressPrevButton = getByRole("button", { name: 'Previous' })
        fireEvent.click(pressNextButton)
        fireEvent.click(pressPrevButton)
        expect(getByText('1')).toHaveProperty("className", 'p-2 mx-1 bg-blue-500 text-white rounded');
    });
});
