import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../views/Home/Home'
import Auth from '../views/Auth/Auth'
import Repos from '../views/Repos/Repos'

export default (
  <Switch>
    <Route path='/home' component={Home} />
    <Route path='/auth' component={Auth} />
    <Route path='/repos' component={Repos} />
    <Redirect from='/' to='/home' />
  </Switch>
)
