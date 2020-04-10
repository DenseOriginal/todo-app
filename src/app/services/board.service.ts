import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, first } from 'rxjs/operators';
import { IBoard, ITask } from '../shared/interfaces';
import { LoadingService } from './loading.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private loadingService: LoadingService) { }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async createNewBoard(board: IBoard) {
    const user = await this.isLoggedIn();
    if (!user) return;

    return this.db.collection('todo-boards').add({
      ...board,
      owner: user.uid,
      tasks: [{ name: 'Your first task!', isDone: true }]
    })
  }

  async updateBoard(board: IBoard) {
    const user = await this.isLoggedIn();
    if (!user) return;
    

    return this.db.collection('todo-boards')
      .doc(board.id)
      .update(board)
  }

  removeBoard(boardId: string) {
    return this.db.collection('todo-boards')
      .doc(boardId)
      .delete();
  }

  getUserBoards() {
    this.loadingService.newTask();

    return this.afAuth.authState.pipe(switchMap(user => {
      this.loadingService.endTask();

      if (user) {
        return this.db.collection<IBoard>('todo-boards', ref => ref.where('owner', '==', user.uid))
          .valueChanges({ idField: 'id' });
      } else {
        return [];
      }
    }))
  }

  getBoard(id: string) {
    return this.afAuth.authState.pipe(switchMap(user => {
      return this.db.collection('todo-boards').doc<IBoard>(id).valueChanges();
    }));
  }

  createNewTask(boardId: string, task: ITask) {
    return this.db.collection('todo-boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayUnion({
          ...task
        })
      })
  }

  flipDoneStatus(boardId: string, newTaskArray: ITask[]) {
    return this.db.collection('todo-boards')
      .doc(boardId)
      .update({
        tasks: newTaskArray
      })
  }

  removeTask(boardId: string, task: ITask) {
    return this.db.collection('todo-boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      })
  }

  archiveTask(boardId: string, task: ITask) {
    return this.db.collection('todo-boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
        archivedTasks: firebase.firestore.FieldValue.arrayUnion(task)
      })
  }

}
