import React from 'react'
import { withRouter } from 'react-router'

import { ApiConsumer } from '../providers/ApiProvider'

import '../stylesheets/login.css'


class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    componentDidMount = () => {
        console.log('Login mounted')
    }

    handleOnChange = (key, { target: { value } }) => {
        this.setState({ [key]: value })
    }

    handleLoginClick = async () => {
        const { email, password } = this.state 
        const { success, reason } = await this.props.handleLogin(email, password)
        if (success)
            this.props.history.push('/dashboard')
        else
            this.setState({ error: reason })
    }

    render() {
        return (
            <div>
                Login Page
                <input type="text" value={this.state.email} placeholder="Email" onChange={(e) => this.handleOnChange('email', e)} />
                <input type="text" value={this.state.password} placeholder="Password" onChange={(e) => this.handleOnChange('password', e)} />
                <p id="error-message">{this.state.error}</p>
                <button onClick={this.handleLoginClick}>Login</button>
            </div>
        )
    }
}

const ConnectedLogin = props => (
    <ApiConsumer >
        {({ handleLogin }) => (
            <Login 
                {...props}
                handleLogin={handleLogin}
            />
        )}
    </ApiConsumer>
)

export default withRouter(ConnectedLogin)
