import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class TaskFormComponent {
  @Input() taskData: any = {}; 
  @Output() formSubmit = new EventEmitter<any>(); 
  @Output() cancel = new EventEmitter<void>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [this.taskData?.id || null],
      title: [
        this.taskData?.title || '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      description: [this.taskData?.description || '', Validators.required],
      assigned_to: [
        this.taskData?.assigned_to || '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      status: [this.taskData?.status || 'Pending', Validators.required],
    });
  }
  

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.formSubmit.emit(this.taskForm.value); 
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

