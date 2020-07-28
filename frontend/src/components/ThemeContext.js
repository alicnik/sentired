import React from 'react'
import { ThemeProvider } from 'styled-components'

// While styled-components comes with a ThemeProvider, a custom provider is created to contain all styled-components logic to one file
// and to prevent conflict/confusion with Material UI's ThemeProvider.

export const StylesProvider = ({ children }) => {

  const theme = {

    colors: {
      angry: '#400000',
      sad: '#0071B6',
      neutral: '#EEE9E9',
      happy: '#fff600',
      ecstatic: '#4CBB17'
    },
    fonts: {
      angry:
      sad:
      netural:
      happy:
      ecstatic:
    },
    fontSizes: {
      xsmall: '0.5rem',
      small: '1rem',
      medium: '2rem',
      large: '3rem',
      xlarge: '3.5rem'
    },
    borderRadius: {
      angry: '1px',
      sad: '2px',
      netural: '5px',
      happy: '10px',
      ecstatic: '25px'
    }
  }
  // #400000, #BF0000, #004B90, #0071B6, #EEE9E9, #ffb38a, #fff600, #B6C61A, #4CBB17)
  // const Main = styled.main`
  //   background-color: 'eee9ee';
  // `

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}