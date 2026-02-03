import type { ReactNode } from "react"
import { FluentProvider, webLightTheme } from "@fluentui/react-components"
import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { TodosView } from "./todos.view"
import * as viewModel from "./todos.view-model"

function wrapper({ children }: { children: ReactNode }) {
  return (
    <FluentProvider theme={webLightTheme}>
      {children}
    </FluentProvider>
  )
}

describe("todosView - React 19 Compatibility", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders without crashing in React 19", () => {
    const mockUseTodos = vi.spyOn(viewModel, "useTodos")
    mockUseTodos.mockReturnValue({
      todos: [],
      toggleTodo: vi.fn(),
      addTodo: vi.fn(),
    })

    const { container } = render(<TodosView />, { wrapper })
    expect(container).toBeTruthy()
  })

  it("renders todos list with proper React 19 rendering", () => {
    const mockUseTodos = vi.spyOn(viewModel, "useTodos")
    mockUseTodos.mockReturnValue({
      todos: [
        { id: 1, title: "Test Todo 1", isComplete: false, dateCreated: new Date(), dateModified: new Date() },
        { id: 2, title: "Test Todo 2", isComplete: true, dateCreated: new Date(), dateModified: new Date() },
      ],
      toggleTodo: vi.fn(),
      addTodo: vi.fn(),
    })

    render(<TodosView />, { wrapper })

    expect(screen.getByText("Test Todo 1")).toBeTruthy()
    expect(screen.getByText("Test Todo 2")).toBeTruthy()
  })

  it("uses refs correctly with React 19", () => {
    const mockUseTodos = vi.spyOn(viewModel, "useTodos")
    mockUseTodos.mockReturnValue({
      todos: [],
      toggleTodo: vi.fn(),
      addTodo: vi.fn(),
    })

    const { container } = render(<TodosView />, { wrapper })
    const ulElement = container.querySelector("ul")

    expect(ulElement).toBeTruthy()
  })

  it("handles empty todos array", () => {
    const mockUseTodos = vi.spyOn(viewModel, "useTodos")
    mockUseTodos.mockReturnValue({
      todos: [],
      toggleTodo: vi.fn(),
      addTodo: vi.fn(),
    })

    const { container } = render(<TodosView />, { wrapper })
    const listItems = container.querySelectorAll("li")

    expect(listItems.length).toBe(0)
  })
})
