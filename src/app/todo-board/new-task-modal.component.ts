import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../services/board.service';

@Component({
    selector: 'app-new-task-modal',
    template: `
    <h1 mat-dialog-title>Create a new task</h1>
    <div mat-dialog-content>
        <span class="new-task__title">New task:</span>

        <mat-form-field>
            <mat-label>Task</mat-label>
            <input matInput #newTaskInput autocomplete="off" placeholder="A short description">
        </mat-form-field>
    </div>
    <div mat-dialog-actions class="new-task__actions">
        <button mat-button mat-dialog-close class="">Cancel</button>
        <button mat-raised-button (click)="createNewTask(newTaskInput.value)">Create</button>
    </div>`,
    styles: [
        '.new-task { display: flex; justify-content: space-between; }',
        '.new-task__title { margin-right: 16px; }',
        '.new-task__actions { float: right; }'
    ]
})
export class NewTaskModalComponent implements OnInit {
    boardId: string;

    constructor(private dialogRef: MatDialogRef<NewTaskModalComponent>,
        private boardService: BoardService,
        @Inject(MAT_DIALOG_DATA) public dataInput) { this.boardId = dataInput.boardId }

    ngOnInit() { }

    createNewTask(task) {
        if (!task) return;

        this.boardService.createNewTask(this.boardId, {
            name: task,
            isDone: false
        })

        this.dialogRef.close();
    }
}
