import React, { useState } from 'react';
import { useAuthStore } from '~store/auth.store';
import PasswordChangeModal from '../todo/todo.modal/password.change.modal';

const UserPage: React.FC = () => {
  const { logout } = useAuthStore();
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const handlePasswordModalToggle = () => {
    setPasswordModalOpen(!isPasswordModalOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>User Actions</h2>
      <div>
        <button onClick={handlePasswordModalToggle}>Change Password</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      {isPasswordModalOpen && (
        <PasswordChangeModal isOpen={isPasswordModalOpen} onClose={handlePasswordModalToggle} />
      )}
    </div>
  );
};

export default UserPage;