import type { Dispatch, SetStateAction } from "react"
import type { TodoAdapter } from "../adapters/todo.adapter.ts"
import type { Todo } from "../types/Todo"

export class TodoModel {
  constructor(private todoAdapter: TodoAdapter) {
  }

  subscribe = (setViewModelState: Dispatch<SetStateAction<Todo[]>>) => {
    const unsubscribe = this.todoAdapter.subscribe(todos => setViewModelState(todos))

    return unsubscribe
  }

  toggleTodo = (id: number) => {
    this.todoAdapter.getTodo(id).then((todo) => {
      todo.isComplete = !todo.isComplete

      this.todoAdapter.updateTodo(id, todo)
    })
  }
}
