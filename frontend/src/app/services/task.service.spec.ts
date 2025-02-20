import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { environment } from '../../environments/environment';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  // The base API URL as used in TaskService; note that TaskService adds "/tasks" to it.
  const apiUrl = `${environment.apiUrl}/tasks/`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks', () => {
    const dummyTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1', assigned_to: 'Alice', status: 'Pending', created_at: '2025-02-19T18:35:37Z' },
      { id: 2, title: 'Task 2', description: 'Desc 2', assigned_to: 'Bob', status: 'Completed', created_at: '2025-02-19T18:35:37Z' }
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    // Expect a GET request to the proper URL.
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should create a new task', () => {
    const newTask: Partial<Task> = {
      title: 'New Task',
      description: 'New Desc',
      assigned_to: 'Charlie',
      status: 'Pending'
    };

    // The API is expected to return the created task, including id and created_at.
    const createdTask: Task = { ...newTask, id: 3, created_at: '2025-02-20T12:00:00Z' } as Task;

    service.createTask(newTask as Task).subscribe((task) => {
      expect(task.id).toBe(3);
      expect(task.title).toBe('New Task');
      expect(task.created_at).toBeTruthy();
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(createdTask);
  });

  it('should update a task', () => {
    const taskId = 2;
    const updatedData: Partial<Task> = {
      title: 'Updated Task',
      description: 'Updated Desc',
      assigned_to: 'Alice',
      status: 'In Progress'
    };

    const updatedTask: Task = { id: taskId, created_at: '2025-02-19T18:35:37Z', ...updatedData } as Task;

    service.updateTask(taskId, updatedData as Task).subscribe((task) => {
      expect(task.id).toBe(taskId);
      expect(task.title).toBe('Updated Task');
    });

    const req = httpMock.expectOne(`${apiUrl}${taskId}/`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    const taskId = 2;
    service.deleteTask(taskId).subscribe(() => {
      // Expect no content on successful deletion.
    });

    const req = httpMock.expectOne(`${apiUrl}${taskId}/`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simulate no response content.
  });
});
