import * as Yup from 'yup';

export const TodoEditSchema = Yup.object().shape({
	title: Yup.string().min(5, 'Min 5 characters').max(20, 'Max 20 characters'),
	body: Yup.string()
		.min(10, 'Min 10 characters')
		.max(200, 'Max 200 characters'),
});