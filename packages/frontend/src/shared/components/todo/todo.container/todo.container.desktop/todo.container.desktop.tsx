import React from 'react';
import { TodoItemProps } from '~shared/interface/todo.interface';
import * as styles from './todo.desktop.style';
import TodoItemDesktop from './todo.item.desktop';
import TodoDesktopBtns from './todo.desktop.btns'; 

interface TodoContainerDesktopProps {
    todos: TodoItemProps['todo'][]; 
    handleAction: TodoItemProps['onAction']; 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void; 
}

const TodoContainerDesktop: React.FC<TodoContainerDesktopProps> = ({
    todos,
    handleAction,
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const totalSlots = 8; 
    const emptySlotsCount = totalSlots - todos.length; 

    return (
        <div>
            <div className={styles.todoDesktop}>
                <h3>Todo Title</h3>
                <h3>Todo description</h3>
                <h3>Actions</h3>

                {todos.map((todo) => (
                    <TodoItemDesktop
                        key={todo.id}
                        todo={todo}
                        onAction={handleAction}
                    />
                ))}

                {Array.from({ length: emptySlotsCount }, (_, index) => (
                    <TodoItemDesktop
                        key={`empty-${index}`} 
                        todo={{ id: 0, title: '', body: '', completed: false }} 
                        onAction={() => {}} 
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <TodoDesktopBtns
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default TodoContainerDesktop;