import React, { createContext, useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'


export const UserContext = createContext()
// We're creating a wrapper that will wrap around our components. The way we refer to these components is via children which is a property
// on props - Here we are destructing children from props. 
export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    isLoggedIn: !!localStorage.getItem('token'),
    // Optional chaining (? before .sub) stops the code below from error-ing out if there is no token present.
    id: jwt.decode(localStorage.getItem('token'))?.sub

  })

  // Will be called any time the user's logged in status changes.

  useEffect(() => {
    console.log('I am the user context call')
    if (!user.isLoggedIn) return
    axios.get(`/api/users/${user.id}`)
      .then(res => {
        setUser({
          ...res.data,
          isLoggedIn: true
        })
      })
      .catch(err => console.log(err))
  }, [user.isLoggedIn])

  // This data parameter will be the response from when a user posts to the login endpoint.

  function login(data) {
    localStorage.setItem('token', data.token)
    setUser({
      ...data,
      isLoggedIn: true
    })
  }

  function logout() {
    localStorage.removeItem('token')
    setUser({
      ...user,
      isLoggedIn: false
    })
  }

  function updateUser() {
    if (!user.isLoggedIn) return
    axios.get(`/api/users/${user.id}`)
      .then(res => {
        setUser({
          ...res.data,
          isLoggedIn: true
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

