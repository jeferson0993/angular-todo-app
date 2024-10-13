import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Todo } from '../Todo';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
  @Output('toggleTodo') toggleEventEmitter = new EventEmitter<number>();
  @Output('removeTodo') removeEventEmitter = new EventEmitter<number>();

  toggle(id: number) {
    this.toggleEventEmitter.emit(id);
  }

  remove(id: number) {
    this.removeEventEmitter.emit(id);
  }
}
