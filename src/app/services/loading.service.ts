import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingState = new BehaviorSubject<boolean>(false);
  ongoingTasks = 0;

  constructor() { }

  isLoading(): Observable<boolean> {
    return this.loadingState;
  }

  newTask(): void {
    this.ongoingTasks += 1;
    this.loadingState.next(true);
  }

  endTask(): void {
    this.ongoingTasks = Math.max(this.ongoingTasks - 1, 0);

    if(this.ongoingTasks == 0) {
      this.loadingState.next(false);
    }
  }
}
