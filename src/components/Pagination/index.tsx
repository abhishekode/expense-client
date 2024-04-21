import React, { useState } from 'react';

interface PaginationProps {
    itemsPerPage: number;
    items: string[];
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, items }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumbers = () => {
        const pageNumbers: number[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const renderPageNumbers = () => {
        const pageNumbers = getPageNumbers();
        const startPage = currentPage <= 2 ? 1 : currentPage - 2;
        const endPage = currentPage >= totalPages - 1 ? totalPages : currentPage;
        const renderedPageNumbers = pageNumbers
            .filter((number) => number >= startPage && number <= endPage)
            .map((number) => (
                <button
                    key={number}
                    className={`p-2 mx-1 text-sm ${currentPage === number ? 'bg-blue-500 text-white rounded' : 'bg-gray-300 text-black hover:bg-blue-500 hover:text-white rounded'
                        }`}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </button>
            ));

        if (currentPage > 1) {
            renderedPageNumbers.unshift(
                <React.Fragment key="ellipsis-start">
                    <button className="p-2 mx-1 text-sm bg-gray-300 text-black rounded" onClick={() => handlePageChange(1)}>
                        1
                    </button>
                    <span className="p-2 mx-1 text-sm">...</span>
                </React.Fragment>
            );
        }

        if (currentPage < totalPages - 1) {
            renderedPageNumbers.push(
                <React.Fragment key="ellipsis-end">
                    <span className="p-2 mx-1 text-sm">...</span>
                    <button
                        className="p-2 mx-1 text-sm bg-gray-300 text-black rounded"
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </React.Fragment>
            );
        }

        return renderedPageNumbers;
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2 border">Number</th>
                        <th className="p-2 border">Item Name</th>
                    </tr>
                </thead>
                <tbody>
                    {items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                        <tr key={index}>
                            <td className="p-2 border">{item}</td>
                            <td className="p-2 border">{`Item number ${item} `}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex mt-4 max-w-7xl mx-auto p-5 ">
                <button
                    className={`p-2 mr-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {renderPageNumbers()}
                <button
                    className={`p-2 ml-2 ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                        } text-white rounded`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
