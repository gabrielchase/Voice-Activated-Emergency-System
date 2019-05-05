import React from 'react'
import axios from 'axios'

import { API_URL } from '../config/config'

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
        handleLogin: (email, password) => this.handleLogin(email, password)
    }

    handleLogin = async (email, password) => {
        console.log('in handleLogin: ', email, password)
        const res = await axios.post(`${API_URL}/auth/login`, { email, password })
        console.log('login res: ', res.data)
        if (res.data.success) {
            localStorage.setItem('user', res.data.values.user)
            localStorage.setItem('token', res.data.values.token)
        }
        return res.data
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
