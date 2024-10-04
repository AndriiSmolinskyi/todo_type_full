import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as styles from './todo.search.style';

const TodoSearch: React.FC = () => {
  return (
    <div className={styles.searchContainer}>
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      <input type="text" className={styles.searchInput} placeholder="Search..." />
    </div>
  );
};

export default TodoSearch;