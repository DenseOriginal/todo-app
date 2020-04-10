export interface IBoard {
    id?: string;
    name: string;
    tasks?: ITask[];
    archivedTasks?: ITask[];
    private: boolean;
    color: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export interface ITask {
    name: string;
    isDone: boolean;
}