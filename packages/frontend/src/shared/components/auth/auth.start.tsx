import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';
import * as styles from './auth.style'

const AuthChoice: React.FC = () => {
	return (
		<div className={styles.starBlock}>
			<h2 className={styles.secondTitle}>Welcome!</h2>
			<div className={styles.startBtnBlock}>
				<Link className={styles.authBtn} to={ROUTER_KEYS.LOGIN}>Login</Link>
				<Link className={styles.authBtn} to={ROUTER_KEYS.REGISTER}>Register</Link>
			</div>
		</div>
	);
};

export default AuthChoice;
