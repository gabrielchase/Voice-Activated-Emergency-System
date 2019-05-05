import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApiConsumer } from '../providers/ApiProvider'

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <ApiConsumer>
        {({ authenticated }) => (
            <Route
                render={
                props =>
                    authenticated
                    ? <Component {...props} /> 
                    : <Redirect to="/login" />
                }
                {...rest}
            />
        )}
    </ApiConsumer>
)

export default ProtectedRoute
