import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    DragDropModule
  ],
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['title','description','assigned_to', 'status','created_at', 'actions'];
  dataSource = new MatTableDataSource<Task>();
  filterValue: string = ''; 
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.dataSource.data = tasks;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = 'Error fetching tasks.';
      },
    });
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTask(result);
      }
    });
  }

  addTask(newTask: Task): void {
    this.taskService.createTask(newTask).subscribe((createdTask) => {
      this.dataSource.data = [...this.dataSource.data, createdTask];
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '400px',
      data: task,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateTask(result);
      }
    });
  }

  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask.id!, updatedTask).subscribe({
      next: (task) => {
        console.log('Updated task received:', task);
        const updatedData = this.dataSource.data.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
        this.dataSource.data = updatedData;
      },
      error: (err) => {
        console.error('Error updating task:', err);
      }
    });
  }
  
  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((task) => task.id !== taskId);
          console.log(`Task with ID ${taskId} deleted successfully.`);
        },
        error: (error) => {
          console.error(`Error deleting task with ID ${taskId}:`, error);
        }
      });
    }
  }

  applyFilter(): void {
    console.log('applyFilter');
    this.taskService.getFilteredTasks(this.filterValue).subscribe({
      next: (tasks) => {
        this.dataSource.data = tasks;
      },
      error: (error) => {
        this.errorMessage = 'Error filtering tasks. Please try again later.';
        console.error('Error filtering tasks:', error);
      },
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
      this.dataSource.data = [...this.dataSource.data]; 
    }
  }

}
