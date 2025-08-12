import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo } from 'models/todo.model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should start with an empty list', () => {
    expect(service.todos.length).toBe(0);
  });

  it('should add an item with a string id (ISO date)', () => {
    expect(service.todos.length).toBe(0);
    service.addTodo({ text: 'Todo1', completed: false });
    expect(service.todos.length).toBe(1);
    const todo = service.todos[0];
    expect(typeof todo.id).toBe('string');
    expect(() => new Date(todo.id)).not.toThrow();
    expect(todo.id).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
    service.addTodo({ text: 'Todo2', completed: false });
    expect(service.todos.length).toBe(2);
  });

  it('should delete an item', () => {
    service.addTodo({ text: 'Todo1', completed: false });
    service.addTodo({ text: 'Todo2', completed: false });
    expect(service.todos.length).toBe(2);
    const todoToDelete = service.todos[0];
    service.delete(todoToDelete);
    expect(service.todos.length).toBe(1);
    // The remaining todo should not be the deleted object
    expect(service.todos.includes(todoToDelete)).toEqual(false);
    service.delete(service.todos[0]);
    expect(service.todos.length).toBe(0);
  });

  it('should clear completed items', () => {
    service.addTodo({ text: 'Todo1', completed: false });
    service.addTodo({ text: 'Todo2', completed: false });
    // Mark the first todo as completed
    service.toggleCompleted(service.todos[0]);
    expect(service.todos[0].completed).toEqual(true);
    service.clearCompleted();
    expect(service.todos.length).toBe(0);
    // Mark the remaining todo as completed if it exists
    if (service.todos.length > 0) {
      service.toggleCompleted(service.todos[0]);
      expect(service.todos[0].completed).toEqual(true);
      service.clearCompleted();
      expect(service.todos.length).toEqual(0);
    }
  });

  it('should toggle completed state immutably', () => {
    service.addTodo({ text: 'Todo1', completed: false });
    const todo = service.todos[0];
    service.toggleCompleted(todo);
    const updatedTodo = service.todos.find((t) => t.id === todo.id);
    expect(updatedTodo).not.toBeUndefined();
    expect(updatedTodo?.completed).toEqual(true);
    // Should not mutate the original object
    expect(todo.completed).toEqual(false);
  });
});
