export interface Todo {
    id: number;
    title: string;
    body: string;
    completed: boolean;
}

export interface TodoCreate {
    title: string;
    body: string;
}

export interface TodoUpdate {
    title?: string;
    body?: string;
    completed?: boolean;
}