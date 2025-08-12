import { TodoFilterPipe } from './todo-filter.pipe';
import { Todo } from 'models/todo.model';

describe('TodoFilterPipe', () => {
  let pipe: TodoFilterPipe;

  beforeEach(() => {
    pipe = new TodoFilterPipe();
  });

  const todos: Todo[] = [
    { id: '1', text: 'Todo 1', completed: false },
    { id: '2', text: 'Todo 2', completed: false },
    { id: '3', text: 'Todo 3', completed: true },
  ];

  it('should return all todos when criteria is "all"', () => {
    const result = pipe.transform(todos, 'all');
    expect(result.length).toBe(3);
    expect(result).toEqual(todos);
  });

  it('should return only active todos when criteria is "active"', () => {
    const result = pipe.transform(todos, 'active');
    expect(result.length).toBe(2);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it('should return only completed todos when criteria is "completed"', () => {
    const result = pipe.transform(todos, 'completed');
    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(true);
  });

  it('should return an empty array if input is not an array', () => {
    const result = pipe.transform(null, 'all');
    expect(result).toEqual([]);
  });
});
