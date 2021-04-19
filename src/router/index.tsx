import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../views/Home/Home'
import Auth from '../views/Auth/Auth'
import ReposList from '../views/ReposList/ReposList'
import NotFound from '../views/NotFound/NotFound'

export default (
  <Switch>
    {/* routes */}
    <Route path='/home' component={Home} />
    <Route path='/auth' component={Auth} />
    <Route path='/repos' component={ReposList} />
    <Route path='/not-found' component={NotFound} />
    {/* redirect */}
    <Redirect exact from='/' to='/home' />
    <Redirect from='/' to='/not-found' />
  </Switch>
)
