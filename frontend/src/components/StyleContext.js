import React, { useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { UserContext } from './UserContext'

// While styled-components comes with a ThemeProvider, a custom provider is created to contain all styled-components logic to one file
// and to prevent conflict/confusion with Material UI's ThemeProvider.

export const StyleProvider = ({ children }) => {

  const { user } = useContext(UserContext)

  const colors = {
    angry: '#ca2613',
    sad: '#225b7c',
    neutral: '#626665',
    happy: '#e1ad01',
    ecstatic: '#5aa15c'
  }

  const fonts = {
    angry: '"Comic Sans", sans-serif',
    sad: '"Grenze Gotisch", cursive',
    neutral: 'Arial',
    happy: '"Poppins", sans-serif',
    ecstatic: '"Concert One", cursive'

  }

  const borderRadii = {
    angry: '1px',
    sad: '2px',
    neutral: '5px',
    happy: '10px',
    ecstatic: '25px'
  }
  
  const borderColours = {
    angry: '#6E0A1E',
    sad: '#003366',
    neutral: '#8f877c',
    happy: '#eed971ff',
    ecstatic: 'green'
  }

  const backgrounds = {
    angry: '#ca2613',
    sad: '#225b7c',
    neutral: '#626665',
    happy: '#fef248',
    ecstatic: '#5aa15c'
  }

  const headerColours = {
    angry: '#F98B88',
    sad: '#aec6cf',
    neutral: 'lightgrey',
    happy: '#ffffbf',
    ecstatic: '#defde0'
  }

  const theme = {
    color: colors[user.emotion],
    font: fonts[user.emotion],
    background: backgrounds[user.emotion],
    borderRadius: borderRadii[user.emotion],
    borderColour: borderColours[user.emotion],
    header: headerColours[user.emotion]
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