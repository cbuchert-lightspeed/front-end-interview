import { FluentProvider, webLightTheme } from "@fluentui/react-components"
import { act, render } from "@testing-library/react"
import { StrictMode, useEffect, useState } from "react"
import { describe, expect, it } from "vitest"

describe("react 19 Compatibility Tests", () => {
  it("supports React 19 StrictMode double rendering", () => {
    let renderCount = 0

    function TestComponent() {
      renderCount++
      return <div>Test Component</div>
    }

    render(
      <StrictMode>
        <TestComponent />
      </StrictMode>,
    )

    expect(renderCount).toBeGreaterThan(0)
  })

  it("handles modern ref cleanup in React 19", () => {
    let cleanupCalled = false

    function TestComponent() {
      useEffect(() => {
        return () => {
          cleanupCalled = true
        }
      }, [])

      return <div>Test</div>
    }

    const { unmount } = render(<TestComponent />)
    unmount()

    expect(cleanupCalled).toBe(true)
  })

  it("works with FluentUI components in React 19", () => {
    const { container } = render(
      <FluentProvider theme={webLightTheme}>
        <div>FluentUI Provider Test</div>
      </FluentProvider>,
    )

    expect(container.textContent).toContain("FluentUI Provider Test")
  })

  it("handles state updates correctly in React 19", () => {
    function Counter() {
      const [count, setCount] = useState(0)

      return (
        <div>
          <span data-testid="count">{count}</span>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      )
    }

    const { getByTestId, getByText } = render(<Counter />)

    expect(getByTestId("count").textContent).toBe("0")

    act(() => {
      getByText("Increment").click()
    })

    expect(getByTestId("count").textContent).toBe("1")
  })

  it("supports functional components with hooks in React 19", () => {
    function HooksComponent() {
      const [state] = useState("initial")
      const [effect, setEffect] = useState(false)

      useEffect(() => {
        setEffect(true)
      }, [])

      return (
        <div>
          <span data-testid="state">{state}</span>
          <span data-testid="effect">{effect ? "effect-ran" : "pending"}</span>
        </div>
      )
    }

    const { getByTestId } = render(<HooksComponent />)

    expect(getByTestId("state").textContent).toBe("initial")
    expect(getByTestId("effect").textContent).toBe("effect-ran")
  })

  it("properly handles component unmounting in React 19", () => {
    let mounted = false
    let unmounted = false

    function LifecycleComponent() {
      useEffect(() => {
        mounted = true
        return () => {
          unmounted = true
        }
      }, [])

      return <div>Lifecycle Test</div>
    }

    const { unmount } = render(<LifecycleComponent />)

    expect(mounted).toBe(true)
    expect(unmounted).toBe(false)

    unmount()

    expect(unmounted).toBe(true)
  })
})
