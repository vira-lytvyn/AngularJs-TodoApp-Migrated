import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `<app-checkbox [(check)]="checked"></app-checkbox>`,
  standalone: true,
  imports: [CheckboxComponent],
})
class TestHostComponent {
  checked = false;
}

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show unchecked icon by default', () => {
    const icon = fixture.debugElement.query(By.css('i'));
    expect(icon.nativeElement.classList.contains('bi-square')).toBe(true);
  });

  it('should toggle check on click', () => {
    const span = fixture.debugElement.query(By.css('span'));
    span.triggerEventHandler('click', {});
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('i'));
    expect(hostComponent.checked).toBe(true);
    expect(icon.nativeElement.classList.contains('bi-check-square')).toBe(true);
  });
});
