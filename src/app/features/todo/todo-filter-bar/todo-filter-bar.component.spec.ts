import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFilterBarComponent } from './todo-filter-bar.component';
import { By } from '@angular/platform-browser';

describe('TodoFilterBarComponent', () => {
  let component: TodoFilterBarComponent;
  let fixture: ComponentFixture<TodoFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFilterBarComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit criteriaChange when filter is clicked', () => {
    const emitSpy = spyOn(component.criteriaChange, 'emit');
    const links = fixture.debugElement.queryAll(By.css('a'));
    links[1].triggerEventHandler('click');
    expect(emitSpy).toHaveBeenCalledWith('active');
  });
});
