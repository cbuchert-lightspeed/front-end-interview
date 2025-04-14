import type { FC } from "react"
import { makeStyles, tokens } from "@fluentui/react-components"
import { Outlet } from "@tanstack/react-router"

const useStyles = makeStyles({
  container: {
    "paddingLeft": tokens.spacingHorizontalL,
    "paddingRight": tokens.spacingHorizontalL,
    "paddingTop": tokens.spacingVerticalL,
    "paddingBottom": tokens.spacingVerticalL,
    "width": "100%",
    "marginRight": tokens.spacingHorizontalL,
    "marginLeft": tokens.spacingHorizontalL,
    "@media (min-width: 600px)": {
      maxWidth: "960px",
      marginRight: "auto",
      marginLeft: "auto",
    },
  },
})

export const StandardLayout: FC = () => {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <h1>Todos</h1>
      <Outlet />
    </div>
  )
}
