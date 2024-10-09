import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import * as styles from './header.style';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';
import { useAuthStore } from '~store/auth.store';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuthStore();

	return (
		<header className={styles.headerCont}>
			<h1 className={styles.headerTitle}>Todo List</h1>
			{isAuthenticated && (
				<FontAwesomeIcon
					className={styles.headerUserBtn}
					icon={faUser}
					onClick={() => navigate(ROUTER_KEYS.USER)}
				/>
			)}
		</header>
	);
};

export default Header;
