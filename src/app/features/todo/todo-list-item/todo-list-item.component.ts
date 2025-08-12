import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'models/todo.model';
import { CheckboxComponent } from '@shared/checkbox/checkbox.component';
import { EditableLabelComponent } from '@shared/editable-label/editable-label.component';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  templateUrl: './todo-list-item.component.html',
  imports: [CheckboxComponent, EditableLabelComponent],
  styleUrls: ['./todo-list-item.component.css'],
})
export class TodoListItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<{ todo: Todo; text: string }>();
  @Output() delete = new EventEmitter<Todo>();

  onToggle() {
    this.toggle.emit(this.todo);
  }

  onEdit(newText: string) {
    this.edit.emit({ todo: this.todo, text: newText });
  }

  onDelete() {
    this.delete.emit(this.todo);
  }
}
