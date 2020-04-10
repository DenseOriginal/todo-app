import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../services/board.service';
import { IBoard } from '../shared/interfaces';

@Component({
    selector: 'app-new-task-modal',
    template: `
    <h1 mat-dialog-title>Create a new board</h1>
    <div mat-dialog-content>
        <span class="new-board__title">New board:</span>

        <mat-form-field>
            <mat-label>Board</mat-label>
            <input matInput [(ngModel)]="newBoard.name" autocomplete="off" placeholder="Board name">
        </mat-form-field>
        <mat-slide-toggle 
            [checked]="newBoard.private"
            (change)="newBoard.private = $event.checked"
            labelPosition="before"
        >Private: </mat-slide-toggle>

        <p style="margin-top: 16px;">Board color:</p>
        <mat-button-toggle-group 
            #group="matButtonToggleGroup"
            [(ngModel)]="newBoard.color"
        >
            <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
            <mat-icon [ngClass]="'icon-' + opt">lens</mat-icon>
            </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions class="new-board__actions">
        <button mat-button mat-dialog-close class="">Cancel</button>
        <button mat-raised-button (click)="createNewBoard()">{{ mode == 'create' ? 'Create' : 'Update' }}</button>
    </div>`,
    styles: [
        '.new-board__title { margin-right: 16px; }',
        '.new-board__actions { float: right; }'
    ]
})
export class NewBoardModalComponent implements OnInit {
    labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];
    boardId: string;
    mode: 'create' | 'update' = "create";

    newBoard = <IBoard>{
        name: 'My new board',
        private: true,
        color: 'gray'
    };

    constructor(private dialogRef: MatDialogRef<NewBoardModalComponent>,
        private route: Router,
        private boardService: BoardService,
        @Inject(MAT_DIALOG_DATA) public dataInput) {

        this.boardId = dataInput.boardId
        
        if(dataInput.oldBoardData) {
            this.mode = 'update';
            this.newBoard = JSON.parse(JSON.stringify(dataInput.oldBoardData));
        }
    }

    ngOnInit() { }

    async createNewBoard() {
        if (!this.newBoard.name) return;
        if(this.mode == 'create') {
            const newBoardRef = await this.boardService.createNewBoard(this.newBoard);
            this.route.navigate(['board/' + newBoardRef.id])
        } else {
            const newBoardRef = await this.boardService.updateBoard(this.newBoard);
            this.route.navigate(['board/' + this.newBoard.id])
        }

        this.dialogRef.close();
    }
}
