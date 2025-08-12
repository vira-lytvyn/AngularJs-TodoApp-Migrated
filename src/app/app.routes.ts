import { Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/not-found/not-found.component';
import { TodoComponent } from '@features/todo/todo/todo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: 'todo', component: TodoComponent },
  // ...other app routes
  { path: '**', component: NotFoundComponent },
];
