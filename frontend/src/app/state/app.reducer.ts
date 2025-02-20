import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { taskReducer, TaskState } from './tasks';

export interface AppState {
  tasks: TaskState; 
}

const rootReducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
};

export const appReducer = combineReducers(rootReducers);
