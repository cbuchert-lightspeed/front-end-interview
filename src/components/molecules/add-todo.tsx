import type { FC, FormEventHandler } from "react"
import { Button, Input, makeStyles, tokens } from "@fluentui/react-components"
import { AddRegular } from "@fluentui/react-icons"
import { useState } from "react"

interface Props {
  handleAddTodo: (newTodo: string) => void
}

const useStyles = makeStyles({
  container: {
    display: "inline-flex",
    gap: tokens.spacingHorizontalS,
  },
})

export const AddTodo: FC<Props> = ({ handleAddTodo }) => {
  const styles = useStyles()
  const [newTodo, setNewTodo] = useState("")

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    handleAddTodo(newTodo.trim())
    setNewTodo("")
  }

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <Input
        value={newTodo}
        onChange={(_, data) => setNewTodo(data.value)}
      />
      <Button
        type="submit"
        icon={<AddRegular />}
        appearance="primary"
      >
        Add
      </Button>
    </form>
  )
}
