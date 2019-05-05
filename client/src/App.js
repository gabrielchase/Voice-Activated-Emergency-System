import React from 'react';

import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'


import ApiProvider from './providers/ApiProvider'

import Login from './components/Login'
import Dashboard from './components/Dashboard'

let history = createBrowserHistory()

function App() {
    return (
        <ApiProvider>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/dashboard" component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        </ApiProvider>
    )
}

export default App
