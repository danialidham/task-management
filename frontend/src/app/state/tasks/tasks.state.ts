import { createAction, props } from '@ngrx/store';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: any[] }>());
export const addTask = createAction('[Task] Add Task', props<{ task: any }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: number }>());
