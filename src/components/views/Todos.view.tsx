import type { FC } from "react"
import { List } from "@fluentui/react-components"
import { TodoListItem } from "../molecules/todo-list-item.tsx"
import { useTodos } from "./Todos.view-model.ts"

export const TodosView: FC = () => {
  const { todos, toggleTodo } = useTodos()

  return (
    <List>
      {todos.map(todo => (
        <TodoListItem
          todo={todo}
          handleToggleComplete={() => toggleTodo(todo.id)}
          key={todo.id}
        />
      ))}
    </List>
  )
}
