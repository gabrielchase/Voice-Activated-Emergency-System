import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import ApiProvider from './providers/ApiProvider'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

let history = createBrowserHistory()

function App() {
    return (
        <ApiProvider>
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </ApiProvider>
    )
}

export default App
