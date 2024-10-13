import { NgClass } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Todo } from './Todo';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, NavbarComponent, TodoListComponent],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  todoList = signal<Todo[]>([
    { id: 1, description: 'Learn Angular', completed: false },
    { id: 2, description: 'Make a Todo List', completed: true }
  ]);

  todoTotal: Signal<number> = computed(() => this.todoList().length);
  todoCompleted: Signal<number> = computed(() => this.todoList().filter(todo => todo.completed).length);
  
  addTodo(input: HTMLInputElement) {
    const newTodo: Todo = {
      id: Date.now(),
      description: input.value,
      completed: false,
    };
    
    this.todoList.update(todos => [...todos, newTodo]);

    input.value = '';
  }

  removeTodo(id: number) {
    this.todoList.update(todos => todos.filter((t) => t.id !== id));
  }
  
  toggleTodo(id: number) {
    this.todoList.update(todos => {
      const index = todos.findIndex(todo => todo.id === id);

      return [
        ...todos.slice(0, index),
        {...todos[index], completed: !todos[index].completed},
        ...todos.slice(index + 1),
      ];
    });
  }
}
