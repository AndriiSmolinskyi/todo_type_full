import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoContainer from '~shared/components/todo/todo.container/todo.container';
import TodoDetails from '~shared/components/todo/todo.details/todo.details';
import { WrapperStyles } from './wrapper.styles';
import Header from '~shared/components/header/header';

const AppRouter: React.FunctionComponent = () => {

	return (
		<div className={WrapperStyles}>
			<Header></Header>
			<Routes>
				<Route path="/" element={<TodoContainer />} />
				<Route path="/todos/:id" element={<TodoDetails />} />
			</Routes>
		</div>
	);
};

export default AppRouter;
