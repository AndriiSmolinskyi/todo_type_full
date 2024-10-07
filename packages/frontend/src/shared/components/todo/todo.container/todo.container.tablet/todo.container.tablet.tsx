import React from 'react';
import TodoItemTablet from './todo.item.tablet';
import { TodoItemProps } from '~shared/interface/todo.interface';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Підключення стилів Swiper
import * as styles from './todo.tablet.style'

const TodoContainerTablet: React.FC<{
  todos: TodoItemProps['todo'][];
  handleAction: TodoItemProps['onAction'];
}> = ({ todos, handleAction }) => {
  return (
    <div>
      <Swiper
        spaceBetween={48} 
        slidesPerView={'auto'} 
        grabCursor={true} 
        centeredSlides={false} 
        className={styles.Swiper}
      >
        {todos.map((todo) => (
          <SwiperSlide
            key={todo.id}
            className={styles.swiperSlide}
          >
            <TodoItemTablet todo={todo} onAction={handleAction} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TodoContainerTablet;