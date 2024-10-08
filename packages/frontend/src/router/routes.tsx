import React from 'react';
import LoginForm from '~shared/components/auth/login/login';
import RegisterForm from '~shared/components/auth/register/register';
import TodoContainer from '~shared/components/todo/todo.container/todo.container';
import TodoDetails from '~shared/components/todo/todo.details/todo.details';
import AuthChoice from '~shared/components/auth/auth.start';
import Verify from '~shared/components/auth/register/verify';
import ResetPassword from '~shared/components/auth/login/reset';
import RestorePassword from '~shared/components/auth/login/restore';
import { Route } from 'react-router-dom';
import { ROUTER_KEYS } from './router.keys';

export const publicRoutes = (
  <>
    <Route path={ROUTER_KEYS.LOGIN} element={<LoginForm />} />
    <Route path={ROUTER_KEYS.REGISTER} element={<RegisterForm />} />
    <Route path={ROUTER_KEYS.VERIFY} element={<Verify />} /> 
    <Route path={ROUTER_KEYS.RESET_PASS} element={<ResetPassword />} /> 
    <Route path={ROUTER_KEYS.RESTORE_PASS} element={<RestorePassword />} /> 
    <Route path={ROUTER_KEYS.HOME} element={<AuthChoice />} /> 
  </>
);

export const privateRoutes = (
  <>
    <Route path={ROUTER_KEYS.HOME} element={<TodoContainer />} />
    <Route path={ROUTER_KEYS.TODOS} element={<TodoDetails />} />
  </>
);