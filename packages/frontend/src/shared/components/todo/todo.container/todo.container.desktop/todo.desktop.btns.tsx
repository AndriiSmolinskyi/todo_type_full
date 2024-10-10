import React from 'react';
import * as styles from './todo.desktop.style'

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
                    <button className={styles.pagesBtns} key={i} onClick={() => onPageChange(i)} disabled={i === currentPage}>
                        {i}
                    </button>
                );
            }
        } else {
            if (currentPage > 1) {
                pages.push(<button className={styles.pagesBtns} key={currentPage - 1} onClick={() => onPageChange(currentPage - 1)}>{currentPage - 1}</button>);
            }

            pages.push(
                <button className={styles.pagesBtns} key={currentPage} onClick={() => onPageChange(currentPage)} disabled>
                    {currentPage}
                </button>
            );

            if (currentPage < totalPages) {
                pages.push(<button className={styles.pagesBtns} key={currentPage + 1} onClick={() => onPageChange(currentPage + 1)}>{currentPage + 1}</button>);
            }
        }

        if (currentPage > 2) {
            pages.unshift(<span className={styles.pagesBtns} key="ellipsis-start">...</span>);
            pages.unshift(<button className={styles.pagesBtns} key={1} onClick={() => onPageChange(1)}>1</button>);
        }
        
        if (currentPage < totalPages - 1) {
            pages.push(<span className={styles.pagesBtns} key="ellipsis-end">...</span>);
            pages.push(<button key={totalPages} className={styles.pagesBtns} onClick={() => onPageChange(totalPages)}>{totalPages}</button>);
        }

        return pages;
    };

    return (
        <div className={styles.pagesBlockBtns}>
            {currentPage > 1 && <button className={styles.pagesGoBtns} onClick={handlePrev}>{'<'} Prev</button>}
            {renderPageNumbers()}
            {currentPage < totalPages && <button className={styles.pagesGoBtns} onClick={handleNext}>Next {'>'}</button>}
        </div>
    );
};

export default TodoDesktopBtns;