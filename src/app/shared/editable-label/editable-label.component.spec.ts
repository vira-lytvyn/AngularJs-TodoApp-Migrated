import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditableLabelComponent } from './editable-label.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `<app-editable-label [(value)]="testValue"></app-editable-label>`,
  standalone: true,
  imports: [EditableLabelComponent],
})
class TestHostComponent {
  testValue = 'ABC';
}

describe('EditableLabelComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    hostComponent.testValue = 'ABC';
    fixture.detectChanges();
  });

  it('should show text', () => {
    const span = fixture.debugElement.query(By.css('.text-left'));
    expect(span.nativeElement.textContent).toBe('ABC');
  });

  it('should enter edit mode on double click', () => {
    const span = fixture.debugElement.query(By.css('span'));
    span.triggerEventHandler('dblclick', {});
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input).not.toBeNull();
    // expect(input.nativeElement.value).toBe('ABC');
  });

  it('should commit value on enter', () => {
    const span = fixture.debugElement.query(By.css('span'));
    span.triggerEventHandler('dblclick', {});
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'XYZ';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.triggerEventHandler('keyup.enter', {});
    fixture.detectChanges();
    expect(hostComponent.testValue).toBe('XYZ');
  });

  it('should cancel edit on escape', () => {
    const span = fixture.debugElement.query(By.css('span'));
    span.triggerEventHandler('dblclick', {});
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'XYZ';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.triggerEventHandler('keyup.escape', {});
    fixture.detectChanges();
    expect(hostComponent.testValue).toBe('ABC');
  });
});
