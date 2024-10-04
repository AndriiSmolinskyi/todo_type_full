import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import * as styles from './header.style'

const Header: React.FC = () => {
    
    return(
        <header className={styles.headerCont}> 
            <h1 className={styles.headerTitle}>Todo List</h1>
            <FontAwesomeIcon className={styles.headerUserBtn} icon={faUser}/>
        </header>
    )
}

export default Header
