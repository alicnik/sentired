import React, { useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { UserContext } from './UserContext'

// While styled-components comes with a ThemeProvider, a custom provider is created to contain all styled-components logic to one file
// and to prevent conflict/confusion with Material UI's ThemeProvider.

export const StyleProvider = ({ children }) => {

  const { user } = useContext(UserContext)
  
  const colors = {
    angry: '#400000',
    sad: '#225b7c',
    neutral: '#626665',
    happy: '#ffae42',
    ecstatic: '#4CBB17'
  }

  const fonts = {
    angry: '"Comic Sans", sans-serif',
    sad: '"Gloria Hallelujah", cursive',
    netural: 'Arial',
    happy: '"Poppins", sans-serif',
    ecstatic: '"Spicy Rice", cursive'

  }

  // const backgrounds = {
  //   angry: '#400000',
  //   sad: '#728496',
  //   neutral: '#eee9e9',
  //   happy: '#fceea7',
  //   ecstatic: '#cae3c6'
  // }

  // borderRadius: {
  //   angry: '1px',
  //   sad: '2px',
  //   netural: '5px',
  //   happy: '10px',
  //   ecstatic: '25px'
  // }

  const theme = {
    color: colors[user.emotion],
    font: fonts[user.emotion],
    background: colors[user.emotion]
  }

  // fontSizes: {
  //   xsmall: '0.5rem',
  //   small: '1rem',
  //   medium: '2rem',
  //   large: '3rem',
  //   xlarge: '3.5rem'
  // },
 
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