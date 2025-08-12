import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  imports: [NgClass],
})
export class CheckboxComponent {
  @Input() check: boolean = false;
  @Output() checkChange = new EventEmitter<boolean>();

  toggle() {
    this.check = !this.check;
    this.checkChange.emit(this.check);
  }
}
