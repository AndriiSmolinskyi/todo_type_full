import React, { useState, useEffect } from 'react';
import TodoItemTablet from './todo.item.tablet';
import { TodoItemProps } from '~shared/interface/todo.interface';
import { Swiper as SwiperClass, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper';
import 'swiper/swiper-bundle.css';
import * as styles from './todo.tablet.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const TodoContainerTablet: React.FC<{
	todos: TodoItemProps['todo'][];
	handleAction: TodoItemProps['onAction'];
	currentPage: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
}> = ({ todos, handleAction, currentPage, totalPages, onPageChange }) => {
	const itemsPerPage = 8;
	const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(
		null,
	);

	const [showNextButton, setShowNextButton] = useState(false);
	const [showPrevButton, setShowPrevButton] = useState(false);

	const handleNextPage = () => {
		if (currentPage < totalPages && swiperInstance) {
			onPageChange(currentPage + 1);
			swiperInstance.slideTo(0, 0);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1 && swiperInstance) {
			onPageChange(currentPage - 1);
			swiperInstance.slideTo(itemsPerPage - 1, 0);
		}
	};

	useEffect(() => {
		if (swiperInstance && totalPages > 1) {
			swiperInstance.on('slideChange', () => {
				const isAtEnd = swiperInstance.isEnd;
				const isAtBeginning = swiperInstance.isBeginning;

				setShowPrevButton(isAtBeginning);
				setShowNextButton(isAtEnd);
			});
		} else {
			setShowNextButton(false);
			setShowPrevButton(false);
		}
	}, [swiperInstance, totalPages]);

	return (
		<div>
			{totalPages > 1 && showPrevButton && (
				<button onClick={handlePrevPage} className={styles.prevButton}>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
			)}
			<SwiperClass
				onSwiper={setSwiperInstance}
				spaceBetween={48}
				slidesPerView={'auto'}
				grabCursor={true}
				centeredSlides={false}
			>
				{todos.map((todo) => (
					<SwiperSlide key={todo.id} className={styles.swiperSlide}>
						<TodoItemTablet todo={todo} onAction={handleAction} />
					</SwiperSlide>
				))}
			</SwiperClass>
			{totalPages > 1 && showNextButton && (
				<button onClick={handleNextPage} className={styles.nextButton}>
					<FontAwesomeIcon icon={faArrowRight} />
				</button>
			)}
		</div>
	);
};

export default TodoContainerTablet;
