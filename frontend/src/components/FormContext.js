import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

export const FormProvider = ({ children }) => {

  const formTheme = createMuiTheme({
    overrides: {

    }
  })

  return (
    <ThemeProvider theme={formTheme}>
      {children}
    </ThemeProvider>
  )
}