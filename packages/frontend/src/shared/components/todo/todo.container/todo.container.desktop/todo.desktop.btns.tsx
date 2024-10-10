import React from 'react';

interface TodoDesktopBtnsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const TodoDesktopBtns: React.FC<TodoDesktopBtnsProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button key={i} onClick={() => onPageChange(i)} disabled={i === currentPage}>
                        {i}
                    </button>
                );
            }
        } else {
            // Show buttons based on the current page
            if (currentPage > 1) {
                pages.push(<button key={currentPage - 1} onClick={() => onPageChange(currentPage - 1)}>{currentPage - 1}</button>);
            }

            pages.push(
                <button key={currentPage} onClick={() => onPageChange(currentPage)} disabled>
                    {currentPage}
                </button>
            );

            if (currentPage < totalPages) {
                pages.push(<button key={currentPage + 1} onClick={() => onPageChange(currentPage + 1)}>{currentPage + 1}</button>);
            }
        }

        // Add ellipsis if needed
        if (currentPage > 2) {
            pages.unshift(<span key="ellipsis-start">...</span>);
            pages.unshift(<button key={1} onClick={() => onPageChange(1)}>1</button>);
        }
        
        if (currentPage < totalPages - 1) {
            pages.push(<span key="ellipsis-end">...</span>);
            pages.push(<button key={totalPages} onClick={() => onPageChange(totalPages)}>{totalPages}</button>);
        }

        return pages;
    };

    return (
        <div>
            {currentPage > 1 && <button onClick={handlePrev}>{'<'} Prev</button>}
            {renderPageNumbers()}
            {currentPage < totalPages && <button onClick={handleNext}>Next {'>'}</button>}
        </div>
    );
};

export default TodoDesktopBtns;