import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import { ROOT_URL, API_URL } from '../config/config'

const ApiContext = React.createContext()
export const ApiConsumer = ApiContext.Consumer

class ApiProvider extends React.Component {
    state = {
        login_credentials: {
            email: '',
            password: ''
        },
        authenticated: false, 
        current_user: {
            email: '',
            name: '',
            username: '',
            phone_number: ''
        },
        socket: {},

        handleLogin: (email, password) => this.handleLogin(email, password)
    }

    componentDidMount = async () => {
        console.log('api provider mounted')
        const res = await axios.get(`${API_URL}/sanity`)
        console.log('Pinging server: ', res.data)
        const socket = await io(ROOT_URL)
        this.setState({ socket })
        socket.emit('hello', 'moto')
    }

    handleLogin = async (email, password) => {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password })
        if (res.data.success) {
            localStorage.setItem('user', res.data.values.user)
            localStorage.setItem('token', res.data.values.token)
            await this.setState({ 
                authenticated: true,
                current_user: res.data.values.user
            })
        }
        return res
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
