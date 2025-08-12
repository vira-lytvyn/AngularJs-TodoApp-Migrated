import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'models/todo.model';

@Pipe({
  name: 'todoFilter',
  standalone: true,
  pure: true,
})
export class TodoFilterPipe implements PipeTransform {
  transform(
    array: Todo[] | null | undefined,
    criteria: 'all' | 'active' | 'completed'
  ): Todo[] {
    if (!Array.isArray(array)) {
      return [];
    }
    switch (criteria) {
      case 'all':
        return array;
      case 'active':
        return array.filter((item) => item.completed === false);
      case 'completed':
        return array.filter((item) => item.completed === true);
      default:
        return array;
    }
  }
}
