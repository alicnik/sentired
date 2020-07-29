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
      },
      MuiTypography: {
        body2: {
          fontFamily: styleTheme.font
        }
      },
      MuiCard: {
        root: {
          marginBottom: '2rem'
        }
      },
      MuiCardContent: {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center'
        }
      },
      MuiFormControl: {
        root: {
          backgroundColor: '#fafafa'
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


