import React, { useState } from 'react';
import { useAuthStore } from '~store/auth.store';
import PasswordChangeModal from '../todo/todo.modal/password.change.modal';
import { useNavigate } from "react-router-dom";
import { ROUTER_KEYS } from "~router/router.keys";
import { todoButtons } from '../todo/todo.buttons.style';
import * as styles from "./user.page.style"

const UserPage: React.FC = () => {
  const { logout } = useAuthStore();
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const navigate = useNavigate()

  const handlePasswordModalToggle = () => {
    setPasswordModalOpen(!isPasswordModalOpen);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTER_KEYS.HOME)
  };

  return (
    <div className={styles.userStyle}>
      <h2>User Actions</h2>
      <div className={styles.userBlockBtn}>
        <button className={todoButtons} onClick={handlePasswordModalToggle}>Change Password</button>
        <button className={todoButtons} onClick={handleLogout}>Logout</button>
        <button className={todoButtons} onClick={() => navigate(ROUTER_KEYS.HOME)}>Go back</button>
      </div>
      
      {isPasswordModalOpen && (
        <PasswordChangeModal isOpen={isPasswordModalOpen} onClose={handlePasswordModalToggle} />
      )}
    </div>
  );
};

export default UserPage;