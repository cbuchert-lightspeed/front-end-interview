import type { FC } from "react"
import type { Todo } from "../../types/Todo"
import { Checkbox, makeStyles, Text } from "@fluentui/react-components"

interface Props {
  todo: Todo
  handleToggleComplete: () => void
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    flexGrow: 1,
  },
})

export const TodoListItem: FC<Props> = ({ todo, handleToggleComplete }) => {
  const styles = useStyles()

  return (
    <li className={styles.container}>
      <Checkbox
        checked={todo.isComplete}
        onChange={handleToggleComplete}
      />
      <Text className={styles.text}>{todo.title}</Text>
    </li>
  )
}
