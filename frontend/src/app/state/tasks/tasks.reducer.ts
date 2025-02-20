import { createReducer, on } from '@ngrx/store';
import { loadTasksSuccess, addTask, deleteTask } from './tasks.state';

export interface TaskState {
  tasks: any[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,

  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks, 
  })),

  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  on(deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
  }))
);
