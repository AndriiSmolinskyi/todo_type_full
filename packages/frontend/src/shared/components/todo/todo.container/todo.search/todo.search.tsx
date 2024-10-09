import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as styles from './todo.search.style';

interface TodoSearchProps {
  onSearchChange: (searchValue: string) => void;
}

const TodoSearch: React.FC<TodoSearchProps> = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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