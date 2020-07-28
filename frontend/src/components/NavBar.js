import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { UserContext } from './UserContext'
import ProgressBar from './ProgressBar'
import styled from 'styled-components'
import Ufo from '../assets/ufo.svg'

const NavBar = () => {

  const { pathname } = useLocation()
  const history = useHistory()
  const noNavPages = ['/', '/register', '/login']
  const { logout } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  if (noNavPages.includes(pathname)) return null

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
          <img src={Ufo} alt="menu" height="70px"/>
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

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
`

export default NavBar