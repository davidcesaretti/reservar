import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

function App() {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Switch>
  );
}

export default App;