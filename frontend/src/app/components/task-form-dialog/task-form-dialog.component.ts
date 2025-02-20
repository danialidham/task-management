import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    TaskFormComponent 
  ]
})
export class TaskFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onFormSubmit(task: any): void {
    this.dialogRef.close(task);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
