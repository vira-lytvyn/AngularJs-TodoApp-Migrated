import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFooterComponent } from './todo-footer.component';
import { By } from '@angular/platform-browser';

describe('TodoFooterComponent', () => {
  let component: TodoFooterComponent;
  let fixture: ComponentFixture<TodoFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFooterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display completed count', () => {
    component.completedCount = 5;
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge.nativeElement.textContent).toContain('5');
  });

  it('should emit clearCompleted when button is clicked', () => {
    const emitSpy = spyOn(component.clearCompleted, 'emit');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');
    expect(emitSpy).toHaveBeenCalled();
  });
});
