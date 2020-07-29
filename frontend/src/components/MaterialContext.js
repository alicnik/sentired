import React, { useContext } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { ThemeContext as StylesContext } from 'styled-components'

export const MaterialProvider = ({ children }) => {

  const styleTheme = useContext(StylesContext)

  const muiTheme = createMuiTheme({
    overrides: {
      MuiPaper: {
        root: {
          color: styleTheme.color
        }
      }
    }
  })

  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  )
}


