import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth/';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { BoardService } from '../services/board.service';
import { IBoard } from '../shared/interfaces';
import { NewBoardModalComponent } from './new-board.component';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  userBoards$: Observable<IBoard[]>;
  isLoading$: Observable<boolean>

  constructor(private breakpointObserver: BreakpointObserver, 
    public afAuth: AngularFireAuth, 
    public dialog: MatDialog,
    public boardService: BoardService,
    public loadingService: LoadingService) { }


  ngOnInit() {
    this.userBoards$ = this.boardService.getUserBoards();
    this.isLoading$ = this.loadingService.isLoading();

    this.loadingService.newTask()
    this.afAuth.authState.subscribe(user => {
      this.loadingService.endTask()

      if(!user) {
        this.openLoginModal();
      }
    });
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '400px',
      disableClose: true,
      data: {}
    });
  }

  newBoard() {
    const dialogRef = this.dialog.open(NewBoardModalComponent, {
      width: '400px',
      data: {}
    })
  }

  updateBoard(board: IBoard) {
    const dialogRef = this.dialog.open(NewBoardModalComponent, {
      width: '400px',
      data: {
        oldBoardData: board
      }
    })
  }

  removeBoard(board: IBoard) {
    this.boardService.removeBoard(board.id);
  }

  logout() {
    this.afAuth.signOut()
  }
}
