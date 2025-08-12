import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListItemComponent } from './todo-list-item.component';
import { Todo } from 'models/todo.model';
import { CheckboxComponent } from '@shared/checkbox/checkbox.component';
import { EditableLabelComponent } from '@shared/editable-label/editable-label.component';
import { By } from '@angular/platform-browser';

describe('TodoListItemComponent', () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;
  const todo: Todo = { id: '1', text: 'Test', completed: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoListItemComponent,
        CheckboxComponent,
        EditableLabelComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoListItemComponent);
    component = fixture.componentInstance;
    component.todo = { ...todo };
    fixture.detectChanges();
  });

  it('should emit toggle event', () => {
    // @ts-ignore
    const toggleSpy = spyOn(component.toggle, 'emit');
    // Simulate toggling the checkbox
    component.todo = { ...todo, completed: false };
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('app-checkbox'));
    // Simulate the checkChange event with the toggled value
    checkbox.triggerEventHandler('checkChange', !component.todo.completed);
    expect(toggleSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ id: '1', text: 'Test', completed: false })
    );
  });

  it('should emit edit event', () => {
    // @ts-ignore
    const editSpy = spyOn(component.edit, 'emit');
    const newText = 'Updated';
    component.onEdit(newText);
    expect(editSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        todo: jasmine.objectContaining({ text: 'Test', completed: false }),
        text: newText,
      })
    );
  });

  it('should emit delete event', () => {
    // @ts-ignore
    const deleteSpy = spyOn(component.delete, 'emit');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');
    expect(deleteSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ text: 'Test', completed: false })
    );
  });
});
