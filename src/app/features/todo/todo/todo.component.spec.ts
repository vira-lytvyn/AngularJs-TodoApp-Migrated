import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodoService } from 'services/todo.service';
import { Todo } from 'models/todo.model';
import { FormsModule } from '@angular/forms';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TodoFilterBarComponent } from '../todo-filter-bar/todo-filter-bar.component';
import { TodoFooterComponent } from '../todo-footer/todo-footer.component';
import { TodoFilterPipe } from 'pipes/todo-filter.pipe';
import { By } from '@angular/platform-browser';

describe('TodoComponent (refactored)', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let service: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoComponent,
        FormsModule,
        TodoListItemComponent,
        TodoFilterBarComponent,
        TodoFooterComponent,
        TodoFilterPipe,
      ],
      providers: [TodoService],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should start with an empty list', () => {
    expect(component.todos.length).toBe(0);
  });

  it('should add an item', () => {
    component.addTodo('Todo1');
    expect(component.todos.length).toBe(1);
    component.addTodo('Todo2');
    expect(component.todos.length).toBe(2);
  });

  it('should delete an item', () => {
    component.addTodo('Todo1');
    component.addTodo('Todo2');
    expect(component.todos.length).toBe(2);
    component.delete(component.todos[0]);
    expect(component.todos.length).toBe(1);
    component.delete(component.todos[0]);
    expect(component.todos.length).toBe(0);
  });

  it('should clear completed items', () => {
    component.addTodo('Todo1');
    component.addTodo('Todo2');
    component.todos[0].completed = true;
    component.clearCompleted();
    expect(component.todos.length).toBe(1);
    component.todos[0].completed = true;
    component.clearCompleted();
    expect(component.todos.length).toBe(0);
  });

  it('should toggle completed on todo-list-item event', () => {
    component.addTodo('Todo1');
    const todo = component.todos[0];
    expect(todo.completed).toEqual(false);
    component.toggleCompleted(todo);
    // Find the updated todo by id
    const updatedTodo = component.todos.find((t) => t.id === todo.id);
    expect(updatedTodo?.completed).toEqual(true);
    component.toggleCompleted(updatedTodo!);
    const toggledBackTodo = component.todos.find((t) => t.id === todo.id);
    expect(toggledBackTodo?.completed).toEqual(false);
  });

  it('should edit todo text on todo-list-item event', () => {
    component.addTodo('Todo1');
    const todo = component.todos[0];
    component.editTodo({ todo, text: 'Updated' });
    expect(todo.text).toBe('Updated');
  });
});
