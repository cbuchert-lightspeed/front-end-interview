import type { ReactNode } from "react"
import { FluentProvider, webLightTheme } from "@fluentui/react-components"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { AddTodo } from "./add-todo"

function wrapper({ children }: { children: ReactNode }) {
  return (
    <FluentProvider theme={webLightTheme}>
      {children}
    </FluentProvider>
  )
}

describe("addTodo - React 19 Compatibility", () => {
  it("renders form elements correctly in React 19", () => {
    const mockHandler = vi.fn()
    render(<AddTodo handleAddTodo={mockHandler} />, { wrapper })

    expect(screen.getByRole("textbox")).toBeTruthy()
    expect(screen.getByRole("button", { name: /add/i })).toBeTruthy()
  })

  it("handles form submission with React 19 event system", async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<AddTodo handleAddTodo={mockHandler} />, { wrapper })

    const input = screen.getByRole("textbox")
    const button = screen.getByRole("button", { name: /add/i })

    await user.type(input, "New Todo Item")
    await user.click(button)

    expect(mockHandler).toHaveBeenCalledWith("New Todo Item")
  })

  it("clears input after submission", async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<AddTodo handleAddTodo={mockHandler} />, { wrapper })

    const input = screen.getByRole("textbox") as HTMLInputElement
    const button = screen.getByRole("button", { name: /add/i })

    await user.type(input, "Test Todo")
    await user.click(button)

    expect(input.value).toBe("")
  })

  it("handles controlled input state with React 19", async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<AddTodo handleAddTodo={mockHandler} />, { wrapper })

    const input = screen.getByRole("textbox") as HTMLInputElement

    await user.type(input, "Testing")

    expect(input.value).toBe("Testing")
  })
})
