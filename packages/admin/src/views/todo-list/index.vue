<template>
  <div class="">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <div class="flex items-center">
          <input
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
            v-model="newTodo"
            @keydown.enter="addTodo"
          />
          <MdiSync />
        </div>
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
            :class="{ completed: todo.completed, editing: todo === editedTodo }"
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
              @blur="doneEdit(todo)"
              @keydown.enter="doneEdit(todo)"
              @keydown.esc="cancelEdit"
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
          <FilterTab
            type="all"
            :visibility="visibility"
          />
          <FilterTab
            type="active"
            :visibility="visibility"
          />
          <FilterTab
            type="completed"
            :visibility="visibility"
          />
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
  </div>
</template>
<script setup lang="ts">
import { ref, computed, Ref } from 'vue'
import MdiSync from './MdiSync.vue'
import { uuid } from '@liutsing/utils'
import type { Todo, FilterType } from './type'
import FilterTab from './FilterTab.vue'

const todos: Ref<Todo[]> = ref<Todo[]>([])
const newTodo = ref('')
const editedTodo = ref<Todo | null>(null)
const visibility = ref<FilterType>('all')

const filteredTodos = computed<Todo[]>(() =>
  visibility.value === 'all'
    ? todos.value
    : todos.value.filter(({ completed }) => (visibility.value === 'active' ? !completed : completed))
)
const remaining = computed(() => todos.value.filter(({ completed }) => !completed).length)

const allDone = computed(() => remaining.value === 0)

const removeCompleted = () => {
  todos.value = todos.value.filter(({ completed }) => !completed)
}
const editTodo = (todo: Todo) => {
  editedTodo.value = todo
}
const doneEdit = (todo: Todo) => {
  const index = todos.value.findIndex((item) => item.id === todo.id)
  todos.value[index] = todo
  editedTodo.value = null
}
const cancelEdit = () => {
  editedTodo.value = null
}
const removeTodo = (todo: Todo) => {
  const index = todos.value.findIndex((item) => item === todo)
  todos.value.splice(index >>> 0, 1)
}

const addTodo = () => {
  todos.value.push({
    title: newTodo.value,
    id: uuid(10),
  })
  newTodo.value = ''
}

const pluralize = (word: string, count: number) => {
  return word + (count === 1 ? '' : 's')
}
</script>

<style>
@import './index.css';
.todoapp {
  min-width: 230px;
  max-width: 550px;
}
</style>
<style lang="less">
.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
  li {
    display: inline;
    a {
      color: inherit;
      margin: 3px;
      padding: 3px 7px;
      text-decoration: none;
      border: 1px solid transparent;
      border-radius: 3px;
      &:hover {
        border-color: rgba(175, 47, 47, 0.1);
      }
      &.selected {
        border-color: rgba(175, 47, 47, 0.2);
      }
    }
  }
}
</style>

<style lang="less" scoped>
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    &:last-child {
      border-bottom: none;
    }
    &.editing {
      border-bottom: none;
      padding: 0;
      .edit {
        display: block;
        width: 506px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
      }
      .view {
        display: none;
      }
      &:last-child {
        margin-bottom: -1px;
      }
    }
    .toggle {
      text-align: center;
      width: 40px;
      /* auto, since non-WebKit browsers doesn't support input styling */
      height: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      border: none; /* Mobile Safari */
      -webkit-appearance: none;
      appearance: none;
      opacity: 0;
      & + label {
        /*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-position: center left;
      }
      &:checked + label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
      }
    }
    label {
      word-break: break-all;
      padding: 15px 15px 15px 60px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
    }
    &.completed label {
      color: #d9d9d9;
      text-decoration: line-through;
    }
    .destroy {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      bottom: 0;
      width: 40px;
      height: 40px;
      margin: auto 0;
      font-size: 30px;
      color: #cc9a9a;
      margin-bottom: 11px;
      transition: color 0.2s ease-out;
      &:hover {
        color: #af5b5e;
      }
      &:after {
        content: '×';
      }
    }
    &:hover .destroy {
      display: block;
    }
    .edit {
      display: none;
    }
  }
}
</style>
