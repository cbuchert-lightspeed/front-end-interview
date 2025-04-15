import type { FC } from "react"
import type { Todo } from "../../types/Todo"
import { Checkbox, ListItem, Text } from "@fluentui/react-components"

interface Props {
  todo: Todo
  handleToggleComplete: () => void
}

export const TodoListItem: FC<Props> = ({ todo, handleToggleComplete }) => {
  return (
    <ListItem>
      <Checkbox
        checked={todo.isComplete}
        onChange={handleToggleComplete}
      />
      <Text>{todo.title}</Text>
    </ListItem>
  )
}
