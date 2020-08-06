import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import ls from 'local-storage'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      ls.get('user')
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
    )} />
)

export default PrivateRoute