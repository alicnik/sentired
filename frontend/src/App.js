import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Account from './components/Account'

import NavBar from './components/NavBar'
import { UserProvider } from './components/UserContext'
import { ApiProvider } from './components/ApiContext'
import Post from './components/Post'
import GlobalStyle from './components/GlobalStyle'
import { StyleProvider } from './components/StyleContext'
import { MaterialProvider } from './components/MaterialContext'

const App = () => {
  return (
    <HashRouter>
      <UserProvider>
        <ApiProvider>
          <StyleProvider>
            <MaterialProvider>
              <GlobalStyle />
              <NavBar />
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/account" component={Account} />
                <Route path="/posts/:redditId" component={Post} />         {/* <Route exact path="/" component={Welcome} /> */}
              </Switch>
            </MaterialProvider>
          </StyleProvider>
        </ApiProvider>
      </UserProvider>
    </HashRouter>
  )
}

export default App

