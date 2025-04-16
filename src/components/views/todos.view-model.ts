import type { Todo } from "../../types/Todo"
import { useEffect, useMemo, useState } from "react"
import { TodoAdapter } from "../../adapters/todo.adapter.ts"
import { todosDataSource } from "../../data-sources/todos.data-source.ts"
import { TodoModel } from "../../models/todo.model.ts"

export function useTodos() {
  const model = useMemo(() => new TodoModel(new TodoAdapter(todosDataSource)), [])
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    return model.subscribe(setTodos)
  }, [model])

  const toggleTodo = (id?: number) => {
    if (id) {
      model.toggleTodo(id)
    }
  }

  const addTodo = (newTodo: string) => {
    if (newTodo.trim().length) {
      model.addTodo(newTodo)
    }
  }

  return {
    todos,
    toggleTodo,
    addTodo,
  }
}
