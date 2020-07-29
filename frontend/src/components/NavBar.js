import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { ThemeContext as StyleContext } from 'styled-components'
import { UserContext } from './UserContext'
import ProgressBar from './ProgressBar'
import styled from 'styled-components'
import Ufo from '../assets/ufo.svg'

const NavBar = () => {
  
  const styleTheme = useContext(StyleContext)
  const { pathname } = useLocation()
  const history = useHistory()
  const noNavPages = ['/', '/register', '/login']
  const { logout } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    console.log(event.currentTarget)
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

  const Header = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    background-color: #fafafa;
    margin-bottom: 1rem;
    width: calc(100vw - 2rem);
    transform: translate(-2rem, -1rem);
    border-bottom: 5px solid ${styleTheme.borderColour}
  `

  if (noNavPages.includes(pathname)) return null

  return (

    <Header>
      <ProgressBar />
      <div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <img src={Ufo} alt="menu" height="57px"/>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
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
    </Header>

  )
}

export default NavBar