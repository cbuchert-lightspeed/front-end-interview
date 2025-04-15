import type { FC } from "react"
import { TodosView } from "../views/todos.view.tsx"

export const Dashboard: FC = () => {
  return (
    <div>
      <TodosView />
    </div>
  )
}
