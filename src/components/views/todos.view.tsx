import type { FC } from "react"
import { makeStyles } from "@fluentui/react-components"
import autoAnimate from "@formkit/auto-animate"
import { useEffect, useRef } from "react"
import { AddTodo } from "../molecules/add-todo.tsx"
import { TodoListItem } from "../molecules/todo-list-item.tsx"
import { useTodos } from "./todos.view-model.ts"

const useStyles = makeStyles({
  container: {
    listStyleType: "none",
    paddingLeft: 0,
  },
})

export const TodosView: FC = () => {
  const { todos, toggleTodo, addTodo } = useTodos()
  const styles = useStyles()
  const animationParent = useRef<HTMLUListElement>(null)

  useEffect(() => {
    animationParent.current && autoAnimate(animationParent.current)
  })

  return (
    <>
      <ul className={styles.container} ref={animationParent}>
        {todos.map(todo => (
          <TodoListItem
            todo={todo}
            handleToggleComplete={() => toggleTodo(todo.id)}
            key={todo.id}
          />
        ))}
      </ul>
      <AddTodo handleAddTodo={addTodo} />
    </>
  )
}
