import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoBoardComponent } from "./todo-board/todo-board.component";
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    { path: 'board/:boardId', component: TodoBoardComponent },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
