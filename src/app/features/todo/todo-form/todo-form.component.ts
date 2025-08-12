import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  templateUrl: './todo-form.component.html',
  imports: [FormsModule],
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  newTodoTextValue = '';

  @Output() add = new EventEmitter<string>();

  onSubmit() {
    const text = this.newTodoTextValue.trim();
    if (text) {
      this.add.emit(text);
      this.newTodoTextValue = '';
    }
  }
}
