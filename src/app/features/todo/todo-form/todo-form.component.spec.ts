import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFormComponent } from './todo-form.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFormComponent, FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit add event with trimmed text and clear input', () => {
    const emitSpy = spyOn(component.add, 'emit');
    component.newTodoTextValue = '  test todo  ';
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    expect(emitSpy).toHaveBeenCalledWith('test todo');
    expect(component.newTodoTextValue).toBe('');
  });

  it('should not emit add event if input is empty or whitespace', () => {
    const emitSpy2 = spyOn(component.add, 'emit');
    component.newTodoTextValue = '   ';
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    expect(emitSpy2).not.toHaveBeenCalled();
  });
});
