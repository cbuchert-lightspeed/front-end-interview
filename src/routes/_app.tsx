import { createFileRoute } from "@tanstack/react-router"
import { StandardLayout } from "../components/layouts/standard-layout.tsx"

export const Route = createFileRoute("/_app")({
  component: StandardLayout,
})
