<template>
  <section
    class="todoapp"
    v-cloak
  >
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keydown.enter="addTodo"
      />
    </header>
    <section
      class="main"
      v-show="todos.length"
    >
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          class="todo"
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo == editedTodo }"
        >
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              v-model="todo.completed"
            />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button
              class="destroy"
              @click="removeTodo(todo)"
            ></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            v-todo-focus="todo == editedTodo"
            @blur="doneEdit(todo)"
            @keydown.enter="doneEdit(todo)"
            @keydown.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer
      class="footer"
      v-show="todos.length"
    >
      <span class="todo-count"> <strong v-text="remaining"></strong> {{ pluralize('item', remaining) }} left </span>
      <ul class="filters">
        <li>
          <a
            href="#/all"
            :class="{ selected: visibility == 'all' }"
            >All</a
          >
        </li>
        <li>
          <a
            href="#/active"
            :class="{ selected: visibility == 'active' }"
            >Active</a
          >
        </li>
        <li>
          <a
            href="#/completed"
            :class="{ selected: visibility == 'completed' }"
            >Completed</a
          >
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todos.length > remaining"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
type Category = 'all' | 'active' | 'completed'
interface Todo {
  type: Category
  title: string
  completed: boolean
  id: string
}

const todos = ref<Todo[]>([])
const newTodo = ref('')
const editedTodo = ref(null)
const visibility = ref<Category>('all')
const filteredTodos = computed(() => todos.value.filter(({ type }) => type === visibility.value))
const remaining = computed(() => todos.value.filter(({ type }) => type === 'active').length)
const allDone = computed(() => remaining.value === 0)
const removeCompleted = () => {}
const editTodo = (todo: Todo) => {}
const doneEdit = (todo: Todo) => {}
const cancelEdit = (todo: Todo) => {}
const removeTodo = (todo: Todo) => {}

const addTodo = () => {}
const pluralize = (word: string, count: number) => {
  return word + (count === 1 ? '' : 's')
}
</script>

<style>
@import './index.css';
/* @import './base.css'; */
.todoapp {
  min-width: 230px;
  max-width: 550px;
}
</style>
