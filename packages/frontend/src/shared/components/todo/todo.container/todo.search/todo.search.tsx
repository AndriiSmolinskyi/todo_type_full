import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as styles from './todo.search.style';

interface TodoSearchProps {
	onSearchChange: (searchValue: string) => void;
	initialValue?: string;
}

const TodoSearch: React.FC<TodoSearchProps> = ({
	onSearchChange,
	initialValue = '',
}) => {
	const [searchValue, setSearchValue] = useState<string>(initialValue);
  
	useEffect(() => {
		setSearchValue(initialValue);
	}, [initialValue]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setSearchValue(e.target.value);
		onSearchChange(e.target.value);
	};

	return (
		<div className={styles.searchContainer}>
			<FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
			<input
				type="text"
				className={styles.searchInput}
				placeholder="Search..."
				value={searchValue}
				onChange={handleInputChange}
			/>
		</div>
	);
};

export default TodoSearch;
