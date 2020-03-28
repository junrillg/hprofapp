import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import { About } from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
