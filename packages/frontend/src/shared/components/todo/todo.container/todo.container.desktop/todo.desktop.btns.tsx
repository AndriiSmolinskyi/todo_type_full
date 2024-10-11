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
    
        // Якщо загальна кількість сторінок 3 або менше, відображаємо всі сторінки
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button className={styles.pagesBtns} key={i} onClick={() => onPageChange(i)} disabled={i === currentPage}>
                        {i}
                    </button>
                );
            }
            return pages;
        }
    
        // Якщо ми на першій сторінці
        if (currentPage === 1) {
            pages.push(
                <button className={styles.pagesBtns} key={1} onClick={() => onPageChange(1)} disabled>
                    1
                </button>,
                <button className={styles.pagesBtns} key={2} onClick={() => onPageChange(2)}>
                    2
                </button>,
                <button className={styles.pagesBtns} key={3} onClick={() => onPageChange(3)}>
                    3
                </button>
            );
        }
        // Якщо ми на останній сторінці
        else if (currentPage === totalPages) {
            pages.push(
                <button className={styles.pagesBtns} key={totalPages - 2} onClick={() => onPageChange(totalPages - 2)}>
                    {totalPages - 2}
                </button>,
                <button className={styles.pagesBtns} key={totalPages - 1} onClick={() => onPageChange(totalPages - 1)}>
                    {totalPages - 1}
                </button>,
                <button className={styles.pagesBtns} key={totalPages} onClick={() => onPageChange(totalPages)} disabled>
                    {totalPages}
                </button>
            );
        }
        // Якщо ми на будь-якій іншій сторінці
        else {
            pages.push(
                <button className={styles.pagesBtns} key={currentPage - 1} onClick={() => onPageChange(currentPage - 1)}>
                    {currentPage - 1}
                </button>,
                <button className={styles.pagesBtns} key={currentPage} onClick={() => onPageChange(currentPage)} disabled>
                    {currentPage}
                </button>,
                <button className={styles.pagesBtns} key={currentPage + 1} onClick={() => onPageChange(currentPage + 1)}>
                    {currentPage + 1}
                </button>
            );
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