import axios from 'axios'

import { API_URL } from '../config/config'

const handleLogin = async (email, password) => {
    console.log('in handleLogin: ', email, password)
    const res = await axios.post(`${API_URL}/auth/login`, { email, password })
    console.log('login res: ', res.data)
    if (res.data.success) {
        localStorage.setItem('user', res.data.values.user)
        localStorage.setItem('token', res.data.values.token)
    }
    return res.data
}

export default { handleLogin }