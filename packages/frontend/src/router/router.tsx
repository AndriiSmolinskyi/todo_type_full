import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoContainer from '~shared/components/todo/todo.container/todo.container';
import TodoDetails from '~shared/components/todo/todo.details/todo.details';

const AppRouter: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoContainer />} /> 
      <Route path="/todos/:id" element={<TodoDetails />} />
    </Routes>
  );
};

export default AppRouter;