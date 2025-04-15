import type { FC } from "react"
import { TodosView } from "../views/Todos.view.tsx"

export const Dashboard: FC = () => {
  return (
    <div>
      <TodosView />
    </div>
  )
}
