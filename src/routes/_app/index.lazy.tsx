import { createLazyFileRoute } from "@tanstack/react-router"
import { Dashboard } from "../../components/pages/dashboard.tsx"

export const Route = createLazyFileRoute("/_app/")({
  component: Dashboard,
})
