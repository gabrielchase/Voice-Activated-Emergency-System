import React from 'react'

import auth_actions from '../actions/auth'

const ApiContext = React.createContext()
export const ApiConsumer = ApiContext.Consumer

class ApiProvider extends React.Component {
    state = {
        login_credentials: {
            email: '',
            password: ''
        },
        authenticated: false, 
        current_user_creds: {
            email: '',
            name: '',
            username: '',
            phone_number: ''
        },
        handleLogin: (email, password) => auth_actions.handleLogin(email, password)
    }

    render () {
        return (
            <ApiContext.Provider value={this.state}>
                {this.props.children}
            </ApiContext.Provider>
        )
    }
}

export default ApiProvider
