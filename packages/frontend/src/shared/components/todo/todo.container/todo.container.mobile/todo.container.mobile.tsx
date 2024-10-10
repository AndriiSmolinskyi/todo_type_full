import React, { useEffect, useRef } from 'react';
import { TodoItemProps } from '~shared/interface/todo.interface';
import TodoMobileItem from './todo.mobile.item';
import * as styles from './todo.mobile.style';

interface TodoContainerMobileProps {
  todos: TodoItemProps['todo'][];
  handleAction: TodoItemProps['onAction'];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TodoContainerMobile: React.FC<TodoContainerMobileProps> = ({
  todos,
  handleAction,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const bottomObserverRef = useRef<HTMLDivElement | null>(null);
  const topObserverRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false); 

  const handleNextPage = () => {
    if (currentPage < totalPages && !isLoadingRef.current) {
      isLoadingRef.current = true;
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && !isLoadingRef.current) {
      isLoadingRef.current = true;
      onPageChange(currentPage - 1);
    }
  };

  useEffect(() => {
    isLoadingRef.current = false;
  }, [todos]);

  useEffect(() => {
    const bottomObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages && !isLoadingRef.current) {
          handleNextPage();
        }
      },
      { threshold: 0.5 } 
    );

    if (bottomObserverRef.current) {
      bottomObserver.observe(bottomObserverRef.current);
    }

    return () => {
      if (bottomObserverRef.current) {
        bottomObserver.unobserve(bottomObserverRef.current);
      }
    };
  }, [currentPage, totalPages]);

  useEffect(() => {
    const topObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage > 1 && !isLoadingRef.current) {
          handlePrevPage();
        }
      },
      { threshold: 0.5 } 
    );

    if (topObserverRef.current) {
      topObserver.observe(topObserverRef.current);
    }

    return () => {
      if (topObserverRef.current) {
        topObserver.unobserve(topObserverRef.current);
      }
    };
  }, [currentPage]);

  return (
    <div className={styles.ContaineMobileStyles}>
      <div ref={topObserverRef}></div>
      {todos.map((todo) => (
        <TodoMobileItem key={todo.id} todo={todo} onAction={handleAction} />
      ))}
      <div ref={bottomObserverRef}></div>
    </div>
  );
};

export default TodoContainerMobile;

