import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent {
  @Input() completedCount = 0;
  @Output() clearCompleted = new EventEmitter<void>();

  onClearCompleted() {
    this.clearCompleted.emit();
  }
}
