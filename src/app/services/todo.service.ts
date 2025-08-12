import { Injectable, signal } from '@angular/core';
import { Todo } from 'models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  // Use Angular signals for reactive state
  private readonly todosSignal = signal<Todo[]>([]);

  get todos(): Todo[] {
    return this.todosSignal();
  }

  addTodo(todo: Omit<Todo, 'id'>): void {
    const newTodo: Todo = { ...todo, id: new Date().toJSON() };
    this.todosSignal.update((todos) => [...todos, newTodo]);
  }

  delete(todo: Todo): void {
    this.todosSignal.update((todos) => todos.filter((t) => t !== todo));
  }

  clearCompleted(): void {
    this.todosSignal.update((todos) => todos.filter((t) => !t.completed));
  }

  toggleCompleted(todo: Todo): void {
    this.todosSignal.update((todos) =>
      todos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  }
}
