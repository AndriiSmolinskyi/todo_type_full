import * as React from 'react';
import TodoModal from '~shared/components/todo/todo.modal/todo.modal';

const App = (): React.ReactNode => {
	const [isModalOpen, setModalOpen] = React.useState(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<>
			<h1>Todo project</h1>
			<button onClick={openModal}>Create Todo</button>
			<TodoModal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
};

export default App;
