import React, { createContext, useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'
import queryString from 'query-string'

export const ApiContext = createContext()

export const ApiProvider = ({ children }) => {

  const { user } = useContext(UserContext)
  const [redditToken, setRedditToken] = useState('')

  function refreshToken() {
    axios.post('https://www.reddit.com/api/v1/access_token', queryString.stringify({ 'grant_type': 'client_credentials' }), {
      auth: {
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PW
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        setRedditToken(res.data.access_token)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    
    if (!user.isLoggedIn) return
    refreshToken()
    setInterval(refreshToken, (55 * 60000))

  }, [user.isLoggedIn])

  return (
    <ApiContext.Provider value={redditToken}>
      {children}
    </ApiContext.Provider>
  )
}


