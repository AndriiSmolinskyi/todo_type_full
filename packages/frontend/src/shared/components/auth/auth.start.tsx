import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';

const AuthChoice: React.FC = () => {
  return (
    <div>
      <h2>Welcome!</h2>
      <Link to={ROUTER_KEYS.LOGIN}>Login</Link>
      <Link to={ROUTER_KEYS.REGISTER}>Register</Link>
    </div>
  );
};

export default AuthChoice;