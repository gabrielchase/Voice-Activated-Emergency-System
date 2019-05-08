import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import ApiProvider from './providers/ApiProvider'

import Login from './components/Login'
import IndexPage from './components/IndexPage'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

let history = createBrowserHistory()

class App extends React.Component {
    render () {
        return (
            <ApiProvider>
                <Router history={history}>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/dashboard" component={Dashboard} />
                        {/* <ProtectedRoute path="/dashboard" component={Dashboard} /> */}
                        <Route path="/" component={IndexPage} />
                    </Switch>
                </Router>
            </ApiProvider>
        )
    }
}

export default App
