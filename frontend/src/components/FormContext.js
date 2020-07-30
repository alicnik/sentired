import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

export const FormMaterialProvider = ({ children }) => {

  const formTheme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        notchedOutline: {
          borderColor: 'white !important',
          mixBlendMode: 'difference',
          zIndex: 0
        },
        input: {
          color: 'white',
          mixBlendMode: 'difference',
          fontFamily: '"Nanum Myeongjo", serif'
        }
      },
      MuiFormControl: {
        root: {
          borderColor: 'white',
          mixBlendMode: 'difference',
          minWidth: 250,
          fontFamily: '"Nanum Myeongjo", serif'
        }
      },
      MuiFormLabel: {
        root: {
          color: 'white !important',
          mixBlendMode: 'difference',
          fontFamily: '"Nanum Myeongjo", serif'
        }
      },
      MuiInputLabel: {
        shrink: {
          borderColor: 'white !important',
          mixBlendMode: 'difference',
          color: 'white'

        }
      },
      MuiButton: {
        root: {
          color: 'white',
          fontFamily: '"Nanum Myeongjo", serif',
          padding: '1rem'
        },
        outlined: {
          padding: '0.6rem 1.6rem',
          fontSize: '1rem',
          borderColor: 'white'
        }
      }
    }
  })

  return (
    <MuiThemeProvider theme={formTheme}>
      {children}
    </MuiThemeProvider>
  )
}