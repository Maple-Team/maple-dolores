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
          <MdiSync
            @click="sync"
            :isLoading="isLoading"
          />
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
              v-focus="todo === editedTodo"
            />
          </li>
        </ul>
      </section>
      <footer
        class="footer"
        v-show="todos.length"
      >
        <span class="todo-count"> <strong v-text="remaining"></strong> {{ pluralize('item', remaining) }} left </span>
        <FilterTab :visibility="visibility" />
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
import { ref, computed, Ref, Directive, watchEffect, unref } from 'vue'
import MdiSync from './MdiSync.vue'
import { uuid } from '@liutsing/utils'
import type { Todo, FilterType } from './type'
import FilterTab from './FilterTab.vue'
import { useTodoMutation } from './api'
import { message } from 'ant-design-vue'

// TODO 1. 路由
type FocusableElement = HTMLInputElement | HTMLTextAreaElement
const vFocus: Directive<FocusableElement, boolean> = {
  updated: (el, binding) => {
    if (binding.value) {
      el.focus()
    }
  },
}
const storageKey = 'maple-todo'
const todoStr = localStorage.getItem(storageKey) || '[]'
const todos: Ref<Todo[]> = ref<Todo[]>(JSON.parse(todoStr))
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
const { mutate, isLoading } = useTodoMutation()
const sync = () => {
  if (isLoading.value) return
  mutate(unref(todos.value), {
    onSuccess: () => {
      message.success('同步成功')
    },
  })
}

watchEffect(() => {
  localStorage.setItem(storageKey, JSON.stringify(todos.value))
  console.log(`write: ${todos.value.length}`)
})
</script>

<style>
@import './index.css';
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
.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  box-sizing: content-box;
  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2),
      0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

  .todo-count {
    float: left;
    text-align: left;
    & strong {
      font-weight: 300;
    }
  }
}
.toggle-all {
  text-align: center;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
  & + label {
    width: 60px;
    height: 34px;
    font-size: 0;
    position: absolute;
    top: -52px;
    left: -13px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    &:before {
      content: '❯';
      font-size: 22px;
      color: #e6e6e6;
      padding: 10px 27px 10px 27px;
    }
  }
  &:checked + label:before {
    color: #737373;
  }
}

.edit-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.new-todo {
  .edit-input();
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
.edit {
  .edit-input();
}
.placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}
.todoapp {
  min-width: 230px;
  max-width: 550px;
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  input::-webkit-input-placeholder {
    .placeholder();
  }
  input::-moz-placeholder {
    .placeholder();
  }
  input::input-placeholder {
    .placeholder();
  }
  h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }
}
</style>
