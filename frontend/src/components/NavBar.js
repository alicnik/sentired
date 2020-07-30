import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import styled, { ThemeContext as StyleContext } from 'styled-components'
import { UserContext } from './UserContext'
import ProgressBar from './ProgressBar'
import UfoSvg from './UfoSvg'
import sentired from '../assets/sentired.svg'

const NavBar = () => {
  
  const styleTheme = useContext(StyleContext)
  const { pathname } = useLocation()
  const history = useHistory()
  const noNavPages = ['/', '/register', '/login']
  const { logout } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    logout()
    setAnchorEl(null)
    history.push('/')
  }

  const styles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#fafafa',
    marginBottom: '1rem',
    width: 'calc(100vw - 2rem)',
    transform: 'translate(-2rem, -1rem)',
    borderBottom: `5px solid ${styleTheme.borderColour}`
  }

  const Logo = styled.img`
    cursor: pointer;
    width: 150px;

    @media screen and (max-width: 900px) {
      display: none;
    }
  `

  if (noNavPages.includes(pathname)) return null

  return (

    <header style={styles}>
      <Logo alt="logo" src={sentired} onClick={() => history.push('/home')} />
      <ProgressBar />
      <div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          height="57px"
        >
          <UfoSvg height="57px"/>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            handleClose()
            history.push('/home')
          }}>Home</MenuItem>
          <MenuItem onClick={() => {
            handleClose()
            history.push('/account')
          }}>My account</MenuItem>
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </Menu>
      </div>
    </header>

  )
}

export default NavBar