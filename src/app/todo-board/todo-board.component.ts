import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskModalComponent } from './new-task-modal.component';
import { IBoard, ITask } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { map, switchMap } from "rxjs/operators";
import { BoardService } from '../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.scss']
})
export class TodoBoardComponent implements OnInit {

  board: IBoard;
  boardId: string;
  errorHappened: boolean = false;
  isNewTaskOpened: boolean = false;

  constructor(private dialog: MatDialog,
    public boardService: BoardService,
    public route: ActivatedRoute,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.newTask();

    this.route.params.subscribe(p => {
      const boardId = p.boardId;
      this.boardId = boardId
      this.boardService.getBoard(boardId)
        .subscribe(board => {
          this.board = board;
          this.errorHappened = false;

          this.loadingService.endTask();
        }, err => {
          this.errorHappened = true;

          this.loadingService.endTask();
        });
    });
  }

  addNewTask() {
    this.boardService.createNewTask(this.boardId, {
      name: Math.random() + '',
      isDone: false
    })
  }

  flipDoneStatus(taskId: number, status: boolean) {
    const newTaskArray = this.board.tasks;
    newTaskArray[taskId].isDone = status;

    this.boardService.flipDoneStatus(this.boardId, newTaskArray);
  }

  openNewTaskModal() {
    this.isNewTaskOpened = true;

    const dialogRef = this.dialog.open(NewTaskModalComponent, {
      width: '315px',
      data: { boardId: this.boardId }
    })

    this.dialog.afterAllClosed.subscribe(() => {
      this.isNewTaskOpened = false
    })
  }
}
