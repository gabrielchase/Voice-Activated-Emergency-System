import React from 'react'

import config from '../config/config'

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
        }
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
