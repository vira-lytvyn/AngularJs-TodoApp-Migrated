import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-filter-bar',
  standalone: true,
  templateUrl: './todo-filter-bar.component.html',
  imports: [NgClass],
})
export class TodoFilterBarComponent {
  @Input() criteria: 'all' | 'active' | 'completed' = 'all';
  @Output() criteriaChange = new EventEmitter<'all' | 'active' | 'completed'>();

  setCriteria(criteria: 'all' | 'active' | 'completed') {
    this.criteriaChange.emit(criteria);
  }
}
