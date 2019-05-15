import React from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components';

import { ApiConsumer } from '../providers/ApiProvider'

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: black;
    color: white;
`;

const LoginPanel = styled.div`
    flex: 0 0 auto;
    width: 320px;

    h1 {
        font-family: 'Gilroy', sans-serif;
        font-weight: 700;
        text-align: center;
        margin: 0 1.5rem 2rem;
        text-shadow: 0 2px 5px rgba(0,0,0,0.25);
    }

    button {
        display: block;
        width: 100%;
        border-radius: 100px;
        padding: 0.75rem 1.5rem;
        margin: 0;
        font-family: 'Gilroy', sans-serif;
        font-weight: 700;
        font-size: 1.25rem;
        text-align: center;
        background: #ffc107;
        border: none;
        appearance: none;
        color: white;
        outline: none;
        box-shadow: 0 2px 5px rgba(0,0,0,0.25);
    }
`;

const LoginInputs = styled.div`
    background: white;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.25);

    input {
        display: block;
        width: calc(100% - 3rem);
        padding: 1rem 1.5rem;
        font-family: 'Gilroy', sans-serif;
        font-size: 1rem;
        background: none;
        border: none;
        appearance: none;
        color: black;
        outline: none;

        &:first-child {
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
    }
`;

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
        const res = await this.props.handleLogin(email, password)
        if (res.data.success)
            this.props.history.push('/dashboard')
        else
            this.setState({ error: res.data.reason })
    }

    render() {
        return (
            <LoginWrapper>
                <LoginPanel>
                    <h1>Watchmen</h1>
                    <LoginInputs>
                        <input type="text" value={this.state.email} placeholder="Email" onChange={(e) => this.handleOnChange('email', e)} />
                        <input type="password" value={this.state.password} placeholder="Password" onChange={(e) => this.handleOnChange('password', e)} />
                    </LoginInputs>
                    <p id="error-message">{this.state.error}</p>
                    <button onClick={this.handleLoginClick}>Login</button>
                </LoginPanel>
            </LoginWrapper>
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
