import React from 'react'
import { useLocation } from 'react-router-dom'

const NavBar = () => {
  const { pathname } = useLocation()
  const paths = ['/', '/register', '/login']
  if (paths.includes(pathname)) return null
  
  return <h1>
    Navigation
  </h1>
}

export default NavBar