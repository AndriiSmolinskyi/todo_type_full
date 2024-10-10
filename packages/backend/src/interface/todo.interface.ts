export interface CreateTodoInput {
	title: string;
	body: string;
	userId: number;
	private?: boolean;
}

export interface UpdateTodoInput {
	title?: string;
	body?: string;
	completed?: boolean;
	private?: boolean;
}

export interface TodoFilter {
	search?: string;
	status?: 'completed' | 'private' | 'public';
	skip?: number;
	take?: number;
}
