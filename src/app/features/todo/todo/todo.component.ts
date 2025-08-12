import { Component, inject, signal } from '@angular/core';
import { TodoService } from 'services/todo.service';
import { Todo } from 'models/todo.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TodoFilterBarComponent } from '../todo-filter-bar/todo-filter-bar.component';
import { TodoFooterComponent } from '../todo-footer/todo-footer.component';
import { TodoFilterPipe } from 'pipes/todo-filter.pipe';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    TodoListItemComponent,
    TodoFilterBarComponent,
    TodoFooterComponent,
    TodoFilterPipe,
    TodoFormComponent,
  ],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  get todos(): Todo[] {
    return this.todoService.todos;
  }

  criteria = signal<'all' | 'active' | 'completed'>('all');

  setCriteria(criteria: 'all' | 'active' | 'completed') {
    this.criteria.set(criteria);
  }

  addTodo(text: string) {
    if (text) {
      this.todoService.addTodo({ text, completed: false });
    }
  }

  delete(todo: Todo) {
    this.todoService.delete(todo);
  }

  toggleCompleted(todo: Todo) {
    this.todoService.toggleCompleted(todo);
  }

  editTodo({ todo, text }: { todo: Todo; text: string }) {
    todo.text = text;
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }
}
